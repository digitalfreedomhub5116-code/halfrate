import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Zap, Star, Sparkles, Truck, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore, GENRES, MOCK_PRODUCTS } from '../store/cartStore'

// ── Hero Banner Slides ──
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'NEW ARRIVAL · FITGEAR FG-M4',
    badgeColor: 'bg-[#991B33]',
    image: '/images/products/fitgear-fg-m4/fitgear-fg-m4-2.jpg',
    discount: 'FLAT 50% OFF',
    heading: 'FITGEAR FG-M4 1.8M STICK',
    brands: '1.8M Ultra Reach • 7-Section Aluminum • Detachable Bluetooth Remote • Anti-Slip Tripod',
    bankOffer: 'Instant Free Delivery on Prepaid UPI Orders',
    bankLogos: ['FITGEAR', '1.8M'],
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

// ── Glowing Marquee Items with Vibrant Neon Accents ──
const GLOW_MARQUEE_ITEMS = [
  { text: 'SABSE SASTA', color: 'from-[#FFE600] via-[#FF8A00] to-[#FF0055]', glow: 'rgba(255,230,0,0.9)', arrowColor: '#FFE600' },
  { text: 'SABSE SASTA', color: 'from-[#FF007A] via-[#FF1E56] to-[#FF9E00]', glow: 'rgba(255,0,122,0.95)', arrowColor: '#FF007A' },
  { text: 'SABSE SASTA', color: 'from-[#00F5FF] via-[#00B4D8] to-[#9B5DE5]', glow: 'rgba(0,245,255,0.9)', arrowColor: '#00F5FF' },
  { text: 'SABSE SASTA', color: 'from-[#00FF87] via-[#60EFFF] to-[#00B4D8]', glow: 'rgba(0,255,135,0.9)', arrowColor: '#00FF87' },
  { text: 'SABSE SASTA', color: 'from-[#FF6B00] via-[#FFA800] to-[#FF0055]', glow: 'rgba(255,107,0,0.95)', arrowColor: '#FF6B00' },
  { text: 'SABSE SASTA', color: 'from-[#FF3366] via-[#FF0066] to-[#FFE600]', glow: 'rgba(255,51,102,0.95)', arrowColor: '#FF3366' },
]

export default function Hero() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const timerRef = useRef(null)

  const rawProducts = useCartStore((s) => s.products) || MOCK_PRODUCTS
  const allProducts = rawProducts.filter((p) => !p.isHidden)
  const productList = allProducts.length > 0 ? allProducts : MOCK_PRODUCTS
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  // Auto-advance banner carousel
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

  // Banner touch swipe for mobile
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


  // ── Bento Carousel Modules (Curated, responsive, lag-free) ──
  const bentoModules = useMemo(() => {
    if (!productList || productList.length === 0) return []
    const mods = []
    let i = 0
    while (i < productList.length) {
      const patternIdx = mods.length % 4
      if (patternIdx === 0) {
        mods.push({ id: `mod-${mods.length}`, type: 'single-tall', width: 'w-[72vw] max-w-[270px]', product: productList[i] })
        i += 1
      } else if (patternIdx === 1) {
        const p1 = productList[i]
        const p2 = productList[i + 1] || productList[0]
        mods.push({ id: `mod-${mods.length}`, type: 'stacked-pair-1', width: 'w-[64vw] max-w-[245px]', topProduct: p1, bottomProduct: p2 })
        i += 2
      } else if (patternIdx === 2) {
        mods.push({ id: `mod-${mods.length}`, type: 'single-wide', width: 'w-[78vw] max-w-[310px]', product: productList[i] })
        i += 1
      } else {
        const p1 = productList[i]
        const p2 = productList[i + 1] || productList[0]
        mods.push({ id: `mod-${mods.length}`, type: 'stacked-pair-2', width: 'w-[64vw] max-w-[245px]', topProduct: p1, bottomProduct: p2 })
        i += 2
      }
    }
    return mods
  }, [productList])

  // Duplicated set for seamless infinite wrap-around
  const displayModules = useMemo(() => {
    if (bentoModules.length === 0) return []
    return [...bentoModules, ...bentoModules]
  }, [bentoModules])


  const slide = HERO_SLIDES[currentSlide]

  return (
    <section className="bg-[#FAF8F5] pt-[124px] sm:pt-[130px] md:pt-20 lg:pt-22 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          1. CATEGORY CIRCLES ROW (Myntra-style, cleared below search bar)
          ═══════════════════════════════════════════════════ */}
      <div className="border-b border-[#E7E2D9] bg-white overflow-hidden shadow-xs">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none px-3 sm:px-4 py-3 sm:py-3.5 lg:justify-center lg:gap-3 touch-pan-x">
            {GENRES.map((genre, i) => (
              <button
                key={genre.id}
                onClick={() => handleCategoryClick(genre)}
                className="group flex flex-col items-center gap-1.5 px-2.5 sm:px-3.5 lg:px-4 flex-shrink-0 cursor-pointer transition-transform active:scale-95"
              >
                {/* Circle thumbnail */}
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-[70px] lg:w-[70px] rounded-full overflow-hidden border-2 border-[#E7E2D9] group-hover:border-[#991B33] transition-all duration-300 shadow-xs ring-2 ring-transparent group-hover:ring-[#991B33]/20">
                  <img
                    src={genre.image}
                    alt={genre.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                {/* Label */}
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-[#44403C] group-hover:text-[#991B33] transition-colors duration-200 text-center leading-tight max-w-[74px] truncate">
                  {genre.label.length > 14 ? genre.label.slice(0, 13) + '…' : genre.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          2. FEE INFO STRIP (Value Guarantee Bar)
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
          3. HERO BANNER CAROUSEL (Myntra-style)
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
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 8000) }}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] shadow-md hover:bg-white transition-all hover:scale-110 cursor-pointer"
            aria-label="Next Slide"
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
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          4. GLOWING "SABSE SASTA > SABSE SASTA" MARQUEE (Right to Left)
          ═══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden py-3 sm:py-3.5 my-3 sm:my-4 bg-gradient-to-r from-[#120307] via-[#22040D] to-[#120307] border-y border-[#FF0055]/30 shadow-[0_0_25px_rgba(255,0,85,0.22)]">
        <div className="flex animate-[sabseGlowMarquee_16s_linear_infinite] whitespace-nowrap will-change-transform select-none">
          {[...GLOW_MARQUEE_ITEMS, ...GLOW_MARQUEE_ITEMS, ...GLOW_MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-3 sm:gap-4 mx-3 sm:mx-4 flex-shrink-0">
              <span
                className={`font-heading font-black text-sm sm:text-base tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}
                style={{
                  filter: `drop-shadow(0 0 10px ${item.glow}) drop-shadow(0 0 20px ${item.glow})`,
                }}
              >
                {item.text}
              </span>
              <span
                className="font-black text-base sm:text-lg animate-pulse"
                style={{
                  color: item.arrowColor,
                  filter: `drop-shadow(0 0 10px ${item.arrowColor})`,
                }}
              >
                &gt;
              </span>
            </div>
          ))}
        </div>
        {/* Glowing edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#120307] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#120307] to-transparent z-10" />

        <style>{`
          @keyframes sabseGlowMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* ═══════════════════════════════════════════════════
          5. BENTO PRODUCT CAROUSEL (Ambient Auto-scroll + Instant Touch Stop)
          ═══════════════════════════════════════════════════ */}
      <div className="py-2 sm:py-4 overflow-hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 mb-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] tracking-tight">
            Curated Bento Deals
          </h3>
        </div>

        {/* Continuous GPU-accelerated auto-scroll track - touchAction: pan-y allows full vertical page scroll */}
          <div
            className="relative overflow-hidden w-full select-none"
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="flex gap-3 w-max animate-[bentoTicker_42s_linear_infinite] will-change-transform pb-3 pt-1 h-[340px] items-stretch px-1 hover:[animation-play-state:paused]"
              style={{ touchAction: 'pan-y' }}
            >
            {displayModules.map((mod, idx) => {
              // 1. Single Tall / Wide Card
              if (mod.type === 'single-tall' || mod.type === 'single-wide') {
                return (
                  <div
                    key={`bento-${mod.id}-${idx}`}
                    className={`${mod.width} flex-shrink-0 h-full select-none`}
                  >
                    <div
                      onClick={() => handleQuickAdd(mod.product)}
                      className="relative h-full w-full rounded-3xl overflow-hidden border border-[#E7E2D9] shadow-md bg-stone-100 cursor-pointer active:scale-98 transition-all duration-300 group"
                    >
                      <img
                        src={mod.product.image}
                        alt={mod.product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        loading={idx < 4 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />
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

              // 2. Stacked Pair Cards
              const isPair1 = mod.type === 'stacked-pair-1'
              const topHeight = isPair1 ? 'h-[185px]' : 'h-[145px]'
              const bottomHeight = isPair1 ? 'h-[145px]' : 'h-[185px]'

              return (
                <div
                  key={`bento-${mod.id}-${idx}`}
                  className={`${mod.width} flex-shrink-0 h-full flex flex-col justify-between gap-2.5 select-none`}
                >
                  {/* Top Card */}
                  <div
                    onClick={() => handleQuickAdd(mod.topProduct)}
                    className={`relative ${topHeight} w-full rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-xs bg-stone-100 cursor-pointer active:scale-98 transition-all group`}
                  >
                    <img
                      src={mod.topProduct.image}
                      alt={mod.topProduct.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
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
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
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

          <style>{`
            @keyframes bentoTicker {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
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
