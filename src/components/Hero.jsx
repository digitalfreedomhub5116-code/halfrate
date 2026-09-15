import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Zap, Star, Sparkles, Truck, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore, GENRES, MOCK_PRODUCTS } from '../store/cartStore'

// ── Hero Banner Slides ──
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'HALF RATE SALE · LIVE NOW',
    badgeColor: 'bg-[#991B33]',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
    discount: '50-80% OFF',
    heading: 'FEATURED BRANDS',
    brands: 'Kundan Jewellery • Teakwood Art • Leather Craft • Premium Audio • Mobile Essentials',
    bankOffer: 'Get 10% Instant Discount*',
    bankLogos: ['HDFC', 'ICICI'],
  },
  {
    id: 2,
    badge: 'ELECTRONICS FEST · LIMITED',
    badgeColor: 'bg-[#059669]',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    discount: 'FLAT 50% OFF',
    heading: 'AUDIO & TECH',
    brands: 'Studio Headphones • ANC Earbuds • Dolby Soundbars • GaN Chargers • Smartwatches',
    bankOffer: 'Extra ₹100 off on Prepaid UPI',
    bankLogos: ['UPI', 'GPay'],
  },
  {
    id: 3,
    badge: 'ARTISAN WEEK · HANDPICKED',
    badgeColor: 'bg-[#B45309]',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
    discount: 'UNDER ₹999',
    heading: 'JEWELLERY & CRAFTS',
    brands: 'Royal Kundan Sets • Silver Bracelets • Dhokra Art • Ceramic Pottery • Vintage Frames',
    bankOffer: 'Free Express Delivery on ₹999+',
    bankLogos: ['FREE', 'SHIP'],
  },
  {
    id: 4,
    badge: 'MEGA DEAL DAYS · 48HRS',
    badgeColor: 'bg-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&q=80',
    discount: '40-70% OFF',
    heading: 'HOME & LIFESTYLE',
    brands: 'Teakwood Sculptures • Photo Frames • Leather Keychains • Phone Cases • Wall Art',
    bankOffer: 'Use code SABSE100 for ₹100 OFF',
    bankLogos: ['CODE', 'SAVE'],
  },
]

// ── Powered-By Partner Names ──
const PARTNER_BRANDS = ['HALFRATE', 'SABSE SASTA', 'DELHIVERY', 'SHIPROCKET']

export default function Hero() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const timerRef = useRef(null)
  const carouselRef = useRef(null)
  const singleSetWidthRef = useRef(0)

  const rawProducts = useCartStore((s) => s.products) || MOCK_PRODUCTS
  const allProducts = rawProducts.filter((p) => !p.isHidden)
  const productList = allProducts.length > 0 ? allProducts : MOCK_PRODUCTS
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  // Auto-advance carousel
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    timerRef.current = setInterval(nextSlide, 4500)
    return () => clearInterval(timerRef.current)
  }, [isAutoPlaying, nextSlide])

  const goToSlide = (idx) => {
    setCurrentSlide(idx)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const handleCategoryClick = (genre) => {
    navigate(`/${genre.slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollToProducts = () => {
    const el = document.querySelector('#products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuickAdd = (product, e) => {
    if (e) e.stopPropagation()
    const fullProduct = productList.find((p) => p.id === product.id) || product
    addItem(fullProduct)
    openCart()
  }

  // Touch swipe for mobile
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 8000)
    }
    setTouchStart(null)
  }

  // ── Bento Carousel Modules ──
  const bentoModules = useMemo(() => {
    if (!productList || productList.length === 0) return []
    const mods = []
    let i = 0
    while (i < productList.length) {
      const patternIdx = mods.length % 4
      if (patternIdx === 0) {
        mods.push({ id: `mod-${mods.length}`, type: 'single-tall', width: 'w-[70vw] max-w-[280px]', product: productList[i] })
        i += 1
      } else if (patternIdx === 1) {
        const p1 = productList[i]
        const p2 = productList[i + 1] || productList[0]
        mods.push({ id: `mod-${mods.length}`, type: 'stacked-pair-1', width: 'w-[64vw] max-w-[250px]', topProduct: p1, bottomProduct: p2 })
        i += 2
      } else if (patternIdx === 2) {
        mods.push({ id: `mod-${mods.length}`, type: 'single-wide', width: 'w-[76vw] max-w-[310px]', product: productList[i] })
        i += 1
      } else {
        const p1 = productList[i]
        const p2 = productList[i + 1] || productList[0]
        mods.push({ id: `mod-${mods.length}`, type: 'stacked-pair-2', width: 'w-[64vw] max-w-[250px]', topProduct: p1, bottomProduct: p2 })
        i += 2
      }
    }
    return mods
  }, [productList])

  const infiniteModules = useMemo(() => {
    if (bentoModules.length === 0) return []
    return [...bentoModules, ...bentoModules, ...bentoModules]
  }, [bentoModules])

  // Measure single set width & position initial scroll at the middle duplicate
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselRef.current && bentoModules.length > 0) {
        const el = carouselRef.current
        const moduleEls = el.querySelectorAll('[data-bento-module]')
        if (moduleEls.length >= bentoModules.length) {
          let setWidth = 0
          for (let i = 0; i < bentoModules.length; i++) {
            if (moduleEls[i]) setWidth += moduleEls[i].offsetWidth + 12
          }
          singleSetWidthRef.current = setWidth
          el.scrollLeft = setWidth
        }
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [bentoModules])

  // 60FPS ambient auto-scroll
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    let animId
    const scrollSpeed = 0.8
    const step = () => {
      if (el) {
        el.scrollLeft += scrollSpeed
        const setWidth = singleSetWidthRef.current
        if (setWidth > 0) {
          if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth
          else if (el.scrollLeft <= 5) el.scrollLeft += setWidth
        }
      }
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <section className="bg-[#FAF8F5] pt-16 sm:pt-18 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          1. CATEGORY CIRCLES ROW (Myntra-style)
          ═══════════════════════════════════════════════════ */}
      <div className="border-b border-[#E7E2D9] bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none px-2 sm:px-4 py-3 sm:py-4 lg:justify-center lg:gap-2">
            {GENRES.map((genre, i) => (
              <button
                key={genre.id}
                onClick={() => handleCategoryClick(genre)}
                className="group flex flex-col items-center gap-1.5 px-2.5 sm:px-4 lg:px-5 flex-shrink-0 cursor-pointer"
              >
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px] rounded-full overflow-hidden border-2 border-[#E7E2D9] group-hover:border-[#991B33] transition-colors duration-300 shadow-sm">
                  <img
                    src={genre.image}
                    alt={genre.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-[#44403C] group-hover:text-[#991B33] transition-colors duration-200 text-center leading-tight max-w-[72px] truncate">
                  {genre.label.length > 14 ? genre.label.slice(0, 13) + '…' : genre.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          2. FEE INFO STRIP
          ═══════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#FFF7ED] via-[#FFFBEB] to-[#FFF7ED] border-b border-[#FDE68A]/50 overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 sm:gap-6 px-3 sm:px-4 py-2 sm:py-2.5 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <span className="text-[10px] sm:text-xs font-semibold text-[#44403C]">Platform Fee</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#78716C] line-through">₹23</span>
            <span className="text-[10px] sm:text-xs font-extrabold text-[#991B33]">₹0</span>
          </div>
          <span className="text-[#D6D3D1] text-[10px] sm:text-xs">|</span>
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <span className="text-[10px] sm:text-xs font-semibold text-[#44403C]">COD Fee</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#78716C] line-through">₹10</span>
            <span className="text-[10px] sm:text-xs font-extrabold text-[#059669]">₹0</span>
          </div>
          <span className="text-[#D6D3D1] text-[10px] sm:text-xs">|</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#991B33]">Sabse Sasta</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          3. HERO BANNER CAROUSEL
          ═══════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-stone-900/10 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleScrollToProducts}
        >
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={s.image}
                alt={s.heading}
                className="h-full w-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ))}

          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            <div className="flex items-start">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white ${slide.badgeColor} shadow-lg backdrop-blur-sm`}
              >
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {slide.badge}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="inline-flex w-fit">
                  <span className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-[#991B33] text-white text-xl sm:text-3xl lg:text-4xl font-black tracking-tight shadow-lg shadow-[#991B33]/30">
                    {slide.discount}
                  </span>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-[280px] sm:max-w-sm shadow-lg border border-white/50">
                <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#991B33] mb-1">
                  {slide.heading}
                </p>
                <p className="text-[11px] sm:text-xs text-[#44403C] font-medium leading-relaxed line-clamp-2">
                  {slide.brands}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 8000) }}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] shadow-md hover:bg-white transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 8000) }}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] shadow-md hover:bg-white transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bank offer bar */}
        <div className="mt-1.5 flex items-center justify-between rounded-xl sm:rounded-2xl bg-white border border-[#E7E2D9] px-3 sm:px-5 py-2 sm:py-2.5 shadow-xs overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden">
            {slide.bankLogos.map((logo, i) => (
              <span key={i} className="text-[11px] sm:text-xs font-extrabold text-[#1C1917] tracking-wide flex-shrink-0">
                {logo}
              </span>
            ))}
            <span className="text-[#D6D3D1] flex-shrink-0">|</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#991B33] truncate">
              {slide.bankOffer}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-[#A8A29E] font-semibold flex-shrink-0 ml-2">
            T&C Apply*
          </span>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 pb-1">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-[#991B33]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#D6D3D1] hover:bg-[#A8A29E]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          4. POWERED BY STRIP
          ═══════════════════════════════════════════════════ */}
      <div className="border-y border-[#E7E2D9] mt-3 sm:mt-4 bg-white/80 overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 px-3 sm:px-4 py-2.5 sm:py-3 overflow-x-auto scrollbar-none">
          <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A8A29E] flex-shrink-0">
            Powered by
          </span>
          {PARTNER_BRANDS.map((name) => (
            <span
              key={name}
              className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#57534E] hover:text-[#991B33] transition-colors cursor-default flex-shrink-0 flex items-center gap-0.5"
            >
              {name}
              <ChevronRight className="h-3 w-3 text-[#A8A29E]" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          5. BENTO PRODUCT CAROUSEL (Auto-scrolling)
          ═══════════════════════════════════════════════════ */}
      <div className="py-4 sm:py-6 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-hidden no-scrollbar pb-2 pt-1 h-[340px] items-stretch px-3"
        >
          {infiniteModules.map((mod, idx) => {
            // Single tall / wide card
            if (mod.type === 'single-tall' || mod.type === 'single-wide') {
              return (
                <div
                  key={`mod-${idx}`}
                  data-bento-module="true"
                  className={`${mod.width} flex-shrink-0 h-full`}
                >
                  <div
                    onClick={() => handleQuickAdd(mod.product)}
                    className="relative h-full w-full rounded-3xl overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-100 cursor-pointer active:scale-98 transition-all duration-300 group"
                  >
                    <img
                      src={mod.product.image}
                      alt={mod.product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={idx < 6 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                      <h3 className="font-serif text-base font-bold text-white leading-tight line-clamp-1">
                        {mod.product.name}
                      </h3>
                      <p className="text-[11px] text-white/80 mt-0.5 line-clamp-1 font-sans">
                        {mod.product.chipset || mod.product.anc || mod.product.material || mod.product.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-lg font-bold text-white">
                            ₹{mod.product.price}
                          </span>
                          {mod.product.originalPrice && (
                            <span className="text-xs text-white/60 line-through">
                              ₹{mod.product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickAdd(mod.product, e)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#1C1917] hover:bg-stone-100 text-xs font-bold tracking-wide shadow-sm cursor-pointer active:scale-95 transition-all"
                        >
                          <ShoppingBag className="h-3 w-3 text-[#991B33]" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            // Stacked pair cards
            const isPair1 = mod.type === 'stacked-pair-1'
            const topHeight = isPair1 ? 'h-[185px]' : 'h-[145px]'
            const bottomHeight = isPair1 ? 'h-[145px]' : 'h-[185px]'

            return (
              <div
                key={`mod-${idx}`}
                data-bento-module="true"
                className={`${mod.width} flex-shrink-0 h-full flex flex-col justify-between gap-2.5`}
              >
                {/* Top Card */}
                <div
                  onClick={() => handleQuickAdd(mod.topProduct)}
                  className={`relative ${topHeight} w-full rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-xs bg-stone-100 cursor-pointer active:scale-98 transition-all group`}
                >
                  <img
                    src={mod.topProduct.image}
                    alt={mod.topProduct.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={idx < 6 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-end justify-between">
                    <div className="max-w-[70%]">
                      <h4 className="font-serif text-xs font-bold text-white line-clamp-1">
                        {mod.topProduct.name}
                      </h4>
                      <span className="text-xs font-bold text-amber-300">
                        ₹{mod.topProduct.price}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(mod.topProduct, e)}
                      className="p-1.5 rounded-full bg-white text-[#1C1917] hover:bg-stone-100 shadow-xs cursor-pointer active:scale-95"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="h-3 w-3 text-[#991B33]" />
                    </button>
                  </div>
                </div>

                {/* Bottom Card */}
                <div
                  onClick={() => handleQuickAdd(mod.bottomProduct)}
                  className={`relative ${bottomHeight} w-full rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-xs bg-stone-100 cursor-pointer active:scale-98 transition-all group`}
                >
                  <img
                    src={mod.bottomProduct.image}
                    alt={mod.bottomProduct.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={idx < 6 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="absolute bottom-2 left-2 right-2 z-10 flex items-end justify-between">
                    <div className="max-w-[70%]">
                      <h4 className="font-serif text-[11px] font-bold text-white line-clamp-1">
                        {mod.bottomProduct.name}
                      </h4>
                      <span className="text-xs font-bold text-amber-300">
                        ₹{mod.bottomProduct.price}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(mod.bottomProduct, e)}
                      className="p-1.5 rounded-full bg-white text-[#1C1917] hover:bg-stone-100 shadow-xs cursor-pointer active:scale-95"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="h-3 w-3 text-[#991B33]" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          6. TRUST BADGES ROW (Desktop only)
          ═══════════════════════════════════════════════════ */}
      <div className="hidden lg:block border-t border-[#E7E2D9] bg-white/60">
        <div className="mx-auto max-w-7xl grid grid-cols-4 divide-x divide-[#E7E2D9] py-4">
          {[
            { icon: Truck, text: 'Free Delivery on ₹999+', sub: 'Express 24-48hr dispatch' },
            { icon: ShieldCheck, text: '100% Quality Tested', sub: 'Every unit verified' },
            { icon: Star, text: '4.9★ Customer Rating', sub: '15,000+ happy buyers' },
            { icon: Zap, text: 'Sabse Sasta Guarantee', sub: 'Up to 70% off retail' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 px-4">
              <item.icon className="h-6 w-6 text-[#991B33] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#1C1917]">{item.text}</p>
                <p className="text-[10px] text-[#78716C] font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
