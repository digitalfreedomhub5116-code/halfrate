import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Zap, Star, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore, GENRES } from '../store/cartStore'

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

// ── Quick Deal Cards ──
const QUICK_DEALS = [
  { label: 'Under ₹499', image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=400&q=80', filter: 'UNDER_999', color: 'bg-orange-500' },
  { label: 'Flat 50% Off', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', filter: 'HALF_RATE', color: 'bg-blue-600' },
  { label: 'New Arrivals', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80', filter: 'ALL', color: 'bg-emerald-600' },
  { label: 'Top Rated', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80', filter: 'RATED_48', color: 'bg-purple-600' },
  { label: 'Best Sellers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80', filter: 'ALL', color: 'bg-rose-600' },
]

// ── Powered-By Partner Names ──
const PARTNER_BRANDS = ['HALFRATE', 'SABSE SASTA', 'DELHIVERY', 'SHIPROCKET', 'SUPABASE']

export default function Hero() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const timerRef = useRef(null)
  const setPriceFilter = useCartStore((s) => s.setPriceFilter)

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

  const handleDealClick = (filter) => {
    setPriceFilter(filter)
    const el = document.querySelector('#products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToProducts = () => {
    const el = document.querySelector('#products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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

  const slide = HERO_SLIDES[currentSlide]

  return (
    <section className="bg-[#FAF8F5] pt-16 sm:pt-18">

      {/* ═══════════════════════════════════════════════════
          1. CATEGORY CIRCLES ROW (Myntra-style)
          ═══════════════════════════════════════════════════ */}
      <div className="border-b border-[#E7E2D9] bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none px-2 sm:px-4 py-3 sm:py-4 lg:justify-center lg:gap-2">
            {GENRES.map((genre, i) => (
              <button
                key={genre.id}
                onClick={() => handleCategoryClick(genre)}
                className="group flex flex-col items-center gap-1.5 px-2.5 sm:px-4 lg:px-5 flex-shrink-0 cursor-pointer"
              >
                {/* Circle thumbnail */}
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px] rounded-full overflow-hidden border-2 border-[#E7E2D9] group-hover:border-[#991B33] transition-colors duration-300 shadow-sm">
                  <img
                    src={genre.image}
                    alt={genre.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                {/* Label */}
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-[#44403C] group-hover:text-[#991B33] transition-colors duration-200 text-center leading-tight max-w-[72px] line-clamp-1 whitespace-nowrap">
                  {genre.label.length > 14 ? genre.label.slice(0, 13) + '…' : genre.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          2. FEE INFO STRIP (Myntra-style value bar)
          ═══════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#FFF7ED] via-[#FFFBEB] to-[#FFF7ED] border-b border-[#FDE68A]/50">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 sm:gap-6 px-4 py-2 sm:py-2.5 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] sm:text-xs font-semibold text-[#44403C]">Platform Fee</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#78716C] line-through">₹23</span>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#991B33]">₹0</span>
          </div>
          <span className="text-[#D6D3D1] text-xs">|</span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[11px] sm:text-xs font-semibold text-[#44403C]">COD Fee</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#78716C] line-through">₹10</span>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#059669]">₹0</span>
          </div>
          <span className="text-[#D6D3D1] text-xs">|</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#991B33]">Sabse Sasta</span>
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
          {/* Background Image with crossfade */}
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
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ))}

          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            {/* Top: Badge */}
            <div className="flex items-start">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white ${slide.badgeColor} shadow-lg backdrop-blur-sm`}
              >
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {slide.badge}
              </span>
            </div>

            {/* Bottom: Discount + Brands + Bank offer */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
              {/* Left: Discount badge */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="inline-flex w-fit">
                  <span className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-[#991B33] text-white text-xl sm:text-3xl lg:text-4xl font-black tracking-tight shadow-lg shadow-[#991B33]/30">
                    {slide.discount}
                  </span>
                </div>
              </div>

              {/* Right: Featured brands card */}
              <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-sm shadow-lg border border-white/50">
                <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#991B33] mb-1">
                  {slide.heading}
                </p>
                <p className="text-[11px] sm:text-xs text-[#44403C] font-medium leading-relaxed line-clamp-2">
                  {slide.brands}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Left/Right arrows */}
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

        {/* Bank offer bar under the banner */}
        <div className="mt-1.5 flex items-center justify-between rounded-xl sm:rounded-2xl bg-white border border-[#E7E2D9] px-3 sm:px-5 py-2 sm:py-2.5 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
            {slide.bankLogos.map((logo, i) => (
              <span key={i} className="text-[11px] sm:text-xs font-extrabold text-[#1C1917] tracking-wide flex-shrink-0">
                {logo}
              </span>
            ))}
            <span className="text-[#D6D3D1]">|</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#991B33] flex-shrink-0">
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
      <div className="border-y border-[#E7E2D9] mt-3 sm:mt-4 bg-white/80">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-4 py-2.5 sm:py-3 overflow-x-auto scrollbar-none">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#A8A29E] flex-shrink-0">
            Powered by
          </span>
          {PARTNER_BRANDS.map((name) => (
            <span
              key={name}
              className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#57534E] hover:text-[#991B33] transition-colors cursor-default flex-shrink-0 flex items-center gap-1"
            >
              {name}
              <ChevronRight className="h-3 w-3 text-[#A8A29E]" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          5. QUICK DEAL CARDS ROW (Myntra-style)
          ═══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
        <div className="flex gap-2.5 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-none pb-1 lg:justify-center">
          {QUICK_DEALS.map((deal, i) => (
            <button
              key={i}
              onClick={() => handleDealClick(deal.filter)}
              className="group relative flex-shrink-0 w-[120px] sm:w-[140px] lg:w-[160px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E7E2D9] shadow-sm hover:shadow-lg hover:border-[#991B33]/40 transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Image */}
              <div className="h-[90px] sm:h-[100px] lg:h-[110px] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Badge label */}
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md ${deal.color} shadow-sm`}>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide text-white">
                  {deal.label}
                </span>
              </div>
              {/* Bottom label */}
              <div className="px-2.5 py-2 text-center">
                <span className="text-[11px] sm:text-xs font-bold text-[#1C1917] group-hover:text-[#991B33] transition-colors">
                  {deal.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          6. TRUST BADGES ROW (Desktop only enhancement)
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
