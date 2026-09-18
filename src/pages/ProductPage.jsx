import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  Heart,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Minus,
  Plus
} from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import WishlistDrawer from '../components/WishlistDrawer'
import OptimizedImage from '../components/OptimizedImage'
import { GENRES } from '../data/productsData'

export default function ProductPage() {
  const { productIdOrSlug } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const toggleWishlist = useCartStore((s) => s.toggleWishlist)

  const allProducts = useCartStore((s) => s.products)

  // Find product by id or slug
  const product = allProducts.find(
    (p) => String(p.id) === productIdOrSlug || p.slug === productIdOrSlug
  )

  const isWishlisted = useCartStore((s) => (product ? s.isWishlisted(product.id) : false))

  const addReview = useCartStore((s) => s.addReview)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('image')
  const [isCopied, setIsCopied] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)

  // Pincode Delivery Estimator State
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState(null)
  const [pincodeChecking, setPincodeChecking] = useState(false)

  // Customer Review Submission State
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerRating, setReviewerRating] = useState(5)
  const [reviewerText, setReviewerText] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const imageSectionRef = useRef(null)
  const descSectionRef = useRef(null)
  const reviewsSectionRef = useRef(null)
  const lastScrollY = useRef(0)

  // Carousel scroll ref and handlers
  const carouselRef = useRef(null)
  const isProgrammaticScroll = useRef(false)
  const scrollTimeoutRef = useRef(null)

  const scrollToImage = (index) => {
    const total = product?.gallery?.length || 1
    const nextIndex = Math.max(0, Math.min(index, total - 1))
    setActiveImageIndex(nextIndex)
    if (carouselRef.current) {
      isProgrammaticScroll.current = true
      clearTimeout(scrollTimeoutRef.current)
      const width = carouselRef.current.clientWidth
      carouselRef.current.scrollTo({
        left: nextIndex * width,
        behavior: 'smooth',
      })
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 400)
    }
  }

  const handleNextImage = () => {
    if (!product?.gallery?.length) return
    const nextIndex = (activeImageIndex + 1) % product.gallery.length
    scrollToImage(nextIndex)
  }

  const handlePrevImage = () => {
    if (!product?.gallery?.length) return
    const prevIndex = (activeImageIndex - 1 + product.gallery.length) % product.gallery.length
    scrollToImage(prevIndex)
  }

  const handleCarouselScroll = (e) => {
    if (isProgrammaticScroll.current) return
    const el = e.currentTarget
    if (!el || !el.clientWidth) return
    const newIndex = Math.round(el.scrollLeft / el.clientWidth)
    if (newIndex !== activeImageIndex && newIndex >= 0 && newIndex < (product?.gallery?.length || 0)) {
      setActiveImageIndex(newIndex)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setActiveImageIndex(0)
    setShowAllReviews(false)
    setShowNavbar(true)
    lastScrollY.current = 0
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'instant' })
    }
  }, [productIdOrSlug])

  // Combined scroll handler: Scroll-spy + Smart auto-hide top Navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)

      // 1. Auto-hide Navbar on scroll down, reappear on scroll up
      if (currentScrollY <= 30) {
        setShowNavbar(true)
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling DOWN -> hide top bar
        setShowNavbar(false)
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling UP -> reveal top bar
        setShowNavbar(true)
      }
      lastScrollY.current = currentScrollY

      // 2. Active sticky tab Scroll-Spy
      const scrollPos = currentScrollY + 140
      const revTop = reviewsSectionRef.current?.offsetTop || Infinity
      const descTop = descSectionRef.current?.offsetTop || Infinity

      if (scrollPos >= revTop) {
        setActiveTab('reviews')
      } else if (scrollPos >= descTop) {
        setActiveTab('description')
      } else {
        setActiveTab('image')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product || product.isHidden) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
        <Navbar />
        <div className="mx-auto max-w-xl text-center px-4 py-36">
          <h1 className="font-heading text-4xl font-bold text-[#1C1917]">Product Unavailable</h1>
          <p className="mt-3 text-[#78716C]">
            {product?.isHidden
              ? 'This product is currently hidden from the public catalog.'
              : 'The requested electronic hardware product could not be located.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest bg-[#991B33] text-white hover:bg-[#7E1227] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Link>
        </div>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
      </div>
    )
  }

  const isOutOfStock = product.inStock === false
  const genreData = GENRES.find((g) => g.id === product.genre)

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addItem(product, quantity)
    openCart()
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return
    addItem(product, quantity)
    navigate('/checkout')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const scrollToSection = (section) => {
    setActiveTab(section)
    if (section === 'image') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'description') {
      descSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (section === 'reviews') {
      reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.fullName,
        text: `Check out ${product.fullName} on halfrate.co — Sabse Sasta Guaranteed!`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && !p.isHidden
  ).slice(0, 4)

  const handleCheckPincode = (e) => {
    if (e) e.preventDefault()
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' })
      return
    }
    setPincodeChecking(true)
    setTimeout(() => {
      setPincodeChecking(false)
      const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      const dateStr = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
      setPincodeResult({
        valid: true,
        message: `Express Delivery by ${dateStr} to PIN ${pincode.trim()} • Cash on Delivery Eligible`,
      })
    }, 400)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!reviewerName.trim() || !reviewerText.trim()) return
    const newRev = {
      id: 'rev-' + Date.now(),
      name: reviewerName.trim(),
      rating: reviewerRating,
      text: reviewerText.trim(),
      date: 'Verified Buyer · Today',
      verified: true,
    }
    if (addReview) {
      addReview(product.id, newRev)
    }
    setReviewSubmitted(true)
    setTimeout(() => {
      setIsWritingReview(false)
      setReviewSubmitted(false)
      setReviewerName('')
      setReviewerText('')
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#991B33] selection:text-white pb-20 sm:pb-0">
      <Navbar visible={showNavbar} />

      {/* Amazon-style Sticky Sub-Header Tabs (Image, Description, Reviews) */}
      <div
        className={`sticky z-40 border-b border-[#E7E2D9] bg-white/95 backdrop-blur-md transition-all duration-300 ease-out ${
          showNavbar ? 'top-16 sm:top-18' : 'top-0 shadow-md shadow-stone-900/5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            {/* Nav Tabs */}
            <div className="flex items-center gap-1 sm:gap-4 py-2 flex-shrink-0">
              {[
                { id: 'image', label: 'Image' },
                { id: 'description', label: 'Specifications & Description' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`relative px-2.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'text-[#991B33]'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[#991B33]" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Quick Back link */}
            <Link
              to={genreData ? `/${genreData.slug}` : '/'}
              className="text-xs text-[#78716C] hover:text-[#991B33] transition-colors flex items-center gap-1 whitespace-nowrap flex-shrink-0 pl-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to</span> {genreData ? genreData.label : 'Catalog'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#78716C] mb-6">
          <Link to="/" className="hover:text-[#991B33] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          {genreData && (
            <>
              <Link to={`/${genreData.slug}`} className="hover:text-[#991B33] transition-colors">
                {genreData.label}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="text-[#1C1917] font-medium truncate max-w-[200px] sm:max-w-none">{product.fullName}</span>
        </div>

        {/* Top Product Section: Image Gallery (Left) + Purchase Details (Right) */}
        <div ref={imageSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none">
              {product.gallery.map((imgUrl, index) => {
                const isSelected = activeImageIndex === index
                const isCert = imgUrl.includes('certificate')
                return (
                  <button
                    key={index}
                    onClick={() => scrollToImage(index)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 aspect-square flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-stone-50 cursor-pointer ${
                      isSelected
                        ? (isCert ? 'border-amber-500 shadow-md shadow-amber-500/30 scale-105' : 'border-[#991B33] shadow-md shadow-[#991B33]/20 scale-105')
                        : (isCert ? 'border-amber-300/80 hover:border-amber-500 opacity-90 hover:opacity-100 ring-1 ring-amber-400/30' : 'border-[#E7E2D9] hover:border-[#991B33]/50 opacity-70 hover:opacity-100')
                    }`}
                    title={isCert ? 'View Quality & Authenticity Certificate' : `${product.name} view ${index + 1}`}
                  >
                    <OptimizedImage
                      src={imgUrl}
                      alt={isCert ? 'Quality & Authenticity Certificate' : `${product.name} view ${index + 1}`}
                      fallbackText={isCert ? 'ISO 9001:2015 Certificate' : product.name}
                      priority={index === 0}
                      containerClassName="w-full h-full"
                      className={`h-full w-full ${isCert ? 'object-contain p-1' : 'object-cover'}`}
                    />
                    {isCert && (
                      <span className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-amber-600 to-amber-500 text-[8px] font-black tracking-wider text-white text-center py-0.5 uppercase shadow-xs">
                        CERTIFIED
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Main Image Display Carousel */}
            <div
              className="relative flex-1 aspect-square w-full rounded-2xl overflow-hidden border border-[#E7E2D9] bg-stone-50 shadow-xl shadow-stone-900/5 group"
            >
              {/* Native Smooth Scroll-Snap Image Track */}
              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
                style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
              >
                {product.gallery.map((imgUrl, index) => {
                  const isCert = imgUrl.includes('certificate')
                  return (
                    <div
                      key={index}
                      className="w-full h-full min-w-full flex-shrink-0 snap-center snap-always flex items-center justify-center bg-stone-50 relative"
                    >
                      <OptimizedImage
                        src={imgUrl}
                        alt={isCert ? `${product.fullName} Official ISO 9001:2015 Quality & Authenticity Certificate` : `${product.fullName} view ${index + 1}`}
                        fallbackText={product.fullName}
                        priority={index === 0}
                        containerClassName="h-full w-full select-none flex items-center justify-center bg-stone-50"
                        className={`h-full w-full select-none ${isCert ? 'object-contain p-2 sm:p-4 bg-stone-900/5' : 'object-cover'}`}
                        draggable={false}
                      />
                      {isCert && (
                        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-md z-10">
                          <ShieldCheck className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                          <span>100% Quality & Authenticity Guaranteed (ISO 9001:2015)</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Prev / Next Arrows */}
              {product.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrevImage()
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 border border-[#E7E2D9] text-[#1C1917] hover:text-[#991B33] hover:bg-white backdrop-blur-sm transition-all shadow-md active:scale-95 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNextImage()
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 border border-[#E7E2D9] text-[#1C1917] hover:text-[#991B33] hover:bg-white backdrop-blur-sm transition-all shadow-md active:scale-95 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Floating Actions (Share & Wishlist) */}
              <div
                className="absolute top-4 right-4 flex flex-col gap-2 z-10"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare()
                  }}
                  className="p-2.5 rounded-full bg-white/80 border border-[#E7E2D9] text-[#78716C] hover:text-[#991B33] hover:bg-white backdrop-blur-sm transition-all shadow-xs cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product)
                  }}
                  className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 shadow-xs cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-white/80 border border-[#E7E2D9] text-[#78716C] hover:text-rose-500 hover:bg-white'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Share confirmation toast */}
              {isCopied && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-[#1C1917] px-4 py-1.5 text-xs font-bold text-white shadow-lg z-20">
                  Link copied to clipboard!
                </div>
              )}

              {/* Gallery Image Indicator Dots */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-sm border border-white/20 z-10 pointer-events-auto"
              >
                {product.gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      scrollToImage(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeImageIndex === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Product Full Name Title */}
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1917] leading-tight">
                {product.fullName}
              </h1>

              {/* Ratings and Reviews Bar */}
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <div
                  onClick={() => scrollToSection('reviews')}
                  className="inline-flex items-center gap-2 cursor-pointer group/rate"
                >
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : i < product.rating
                            ? 'fill-amber-400/50 text-amber-400'
                            : 'text-stone-300 fill-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1C1917]">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#78716C] underline decoration-[#991B33]/40 group-hover/rate:text-[#991B33] transition-colors">
                    {product.reviewCount} verified buyer reviews
                  </span>
                </div>

                <span className="hidden sm:inline-block text-[#D6D3D1]">•</span>

                {product.gallery && product.gallery.some((u) => u.includes('certificate')) && (
                  <button
                    type="button"
                    onClick={() => {
                      const certIdx = product.gallery.findIndex((u) => u.includes('certificate'))
                      if (certIdx !== -1) {
                        scrollToImage(certIdx)
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300 transition-all cursor-pointer shadow-2xs"
                    title="Click to view ISO 9001:2015 Quality & Authenticity Certificate"
                  >
                    <ShieldCheck className="h-3 w-3 text-amber-600" />
                    <span>ISO 9001:2015 Certified Proof</span>
                  </button>
                )}
              </div>

              {/* Pricing Section */}
              <div className="mt-6 p-4 rounded-2xl border border-[#E7E2D9] bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#991B33] text-white">
                    <Sparkles className="h-3 w-3 text-amber-300" /> Sabse Sasta Deal
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save ₹{(product.originalPrice || product.price * 2) - product.price} (Half Rate)
                  </span>
                </div>

                <div className="flex items-baseline gap-2.5 sm:gap-3 flex-nowrap">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#991B33]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm sm:text-base text-[#78716C]/60 line-through">
                    M.R.P.: ₹{product.originalPrice}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.discountBadge || `-${product.discountPercent}%`}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#78716C]">
                  All prices inclusive of all taxes. Standard Express Delivery: ₹60.
                </p>

                {/* Stock status */}
                {!isOutOfStock ? (
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>In Stock · Ready for Immediate Dispatch</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-rose-600">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Currently In Backorder · Notification sent upon restock</span>
                  </div>
                )}
              </div>

              {/* Interactive Pincode Delivery Estimator */}
              <div className="mt-4 p-3.5 rounded-2xl border border-[#E7E2D9] bg-[#FAF8F5]">
                <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5 mb-2">
                  <Truck className="h-3.5 w-3.5 text-[#991B33]" />
                  <span>Check Delivery & Cash on Delivery</span>
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 400001)"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ''))
                      setPincodeResult(null)
                    }}
                    className="flex-1 bg-white border border-[#E7E2D9] rounded-xl px-3 py-2 text-xs text-[#1C1917] outline-none font-medium focus:border-[#991B33]"
                  />
                  <button
                    type="submit"
                    disabled={pincodeChecking}
                    className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#991B33] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {pincodeChecking ? 'Checking...' : 'Check'}
                  </button>
                </form>
                {pincodeResult && (
                  <div className={`mt-2.5 p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    pincodeResult.valid
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {pincodeResult.valid ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    ) : null}
                    <span>{pincodeResult.message}</span>
                  </div>
                )}
              </div>

              {/* Key Features Bullet List */}
              <div className="mt-6 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#991B33]">
                  Product Specifications & Highlights
                </h4>
                <ul className="space-y-2 text-sm text-[#44403C]">
                  {product.specs ? (
                    Object.entries(product.specs).map(([label, val]) => (
                      <li key={label} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#991B33] flex-shrink-0 mt-0.5" />
                        <span><strong className="text-[#1C1917]">{label}:</strong> {val}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#991B33] flex-shrink-0 mt-0.5" />
                        <span>Artisanal craftsmanship & precision engineered materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#991B33] flex-shrink-0 mt-0.5" />
                        <span>Certifications: CE, FCC, RoHS, ISO9001 Tested</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#991B33] flex-shrink-0 mt-0.5" />
                        <span>Signature gift packaging designed for transit protection</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Desktop Quantity & Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#E7E2D9] space-y-3.5">
              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D9]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1C1917]">Select Quantity</span>
                    <span className="text-[11px] text-[#78716C]">Direct factory half rate savings apply</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#E7E2D9] bg-white px-3 py-1 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="rounded-full p-1 text-[#78716C] transition-colors hover:text-[#991B33] disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-bold text-[#1C1917]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                      disabled={quantity >= 10}
                      className="rounded-full p-1 text-[#78716C] transition-colors hover:text-[#991B33] disabled:opacity-30 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isOutOfStock
                      ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                      : 'bg-white text-[#991B33] border-2 border-[#991B33] hover:bg-[#991B33] hover:text-white shadow-xs active:scale-98'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{isOutOfStock ? 'Out of Stock' : 'Add to Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isOutOfStock
                      ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-lg shadow-amber-500/20 active:scale-98 border border-amber-600/30'
                  }`}
                >
                  <span>{isOutOfStock ? 'Unavailable' : `Buy Now · ₹${(product.price * quantity).toLocaleString('en-IN')}`}</span>
                </button>
              </div>

              {/* Assurance Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white border border-[#E7E2D9] shadow-xs">
                  <Truck className="h-4 w-4 mx-auto text-[#991B33] mb-1" />
                  <span className="text-[10px] text-[#78716C] font-medium block">Express Courier Delivery</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7E2D9] shadow-xs">
                  <ShieldCheck className="h-4 w-4 mx-auto text-[#991B33] mb-1" />
                  <span className="text-[10px] text-[#78716C] font-medium block">2-Year Direct Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7E2D9] shadow-xs">
                  <RotateCcw className="h-4 w-4 mx-auto text-[#991B33] mb-1" />
                  <span className="text-[10px] text-[#78716C] font-medium block">7-Day Replacement</span>
                </div>
              </div>

              {/* Quality & Authenticity Certificate Verification Card */}
              {product.gallery && product.gallery.some((u) => u.includes('certificate')) && (
                <button
                  type="button"
                  onClick={() => {
                    const certIdx = product.gallery.findIndex((u) => u.includes('certificate'))
                    if (certIdx !== -1) {
                      scrollToImage(certIdx)
                      imageSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="w-full mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/70 hover:border-amber-400 transition-all flex items-center justify-between group cursor-pointer shadow-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1C1917]">ISO 9001:2015 Quality & Authenticity</span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-900 border border-amber-400/50">
                          Certified
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C]">
                        100% genuine guaranteed • Tap to inspect verified certificate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-amber-900 group-hover:translate-x-0.5 transition-all flex-shrink-0">
                    <span className="hidden sm:inline">View Proof</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Dedicated Description Tab / Content */}
        <div ref={descSectionRef} className="mt-20 pt-10 border-t border-[#E7E2D9] scroll-mt-14 sm:scroll-mt-16">
          <div className="max-w-4xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Product Overview & Specifications
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#44403C]">
              {product.description}
            </p>

            {/* Full Specifications Table */}
            <div className="mt-8 rounded-2xl border border-[#E7E2D9] bg-white shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E7E2D9] bg-[#FAF8F5]">
                <h3 className="font-heading text-base font-bold text-[#1C1917]">
                  Detailed Specifications & Craftsmanship
                </h3>
              </div>
              <div className="divide-y divide-[#E7E2D9] text-sm">
                {product.specs ? (
                  Object.entries(product.specs).map(([label, val]) => (
                    <div key={label} className="grid grid-cols-3 px-6 py-3.5">
                      <span className="text-[#78716C] font-medium">{label}</span>
                      <span className="col-span-2 font-semibold text-[#1C1917]">{val}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="grid grid-cols-3 px-6 py-3.5">
                      <span className="text-[#78716C] font-medium">Category</span>
                      <span className="col-span-2 font-semibold text-[#1C1917]">{genreData ? genreData.label : product.genre}</span>
                    </div>
                    <div className="grid grid-cols-3 px-6 py-3.5">
                      <span className="text-[#78716C] font-medium">Compliance Standards</span>
                      <span className="col-span-2 font-semibold text-[#1C1917]">Certified Quality Standard</span>
                    </div>
                    <div className="grid grid-cols-3 px-6 py-3.5">
                      <span className="text-[#78716C] font-medium">QC Testing</span>
                      <span className="col-span-2 font-semibold text-[#1C1917]">100% Pre-Shipment Quality Verification</span>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-3 px-6 py-3.5">
                  <span className="text-[#78716C] font-medium">Product Category</span>
                  <span className="col-span-2 font-semibold text-[#1C1917]">{genreData ? genreData.label : product.genre}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Customer Reviews */}
        <div ref={reviewsSectionRef} className="mt-20 pt-10 border-t border-[#E7E2D9] scroll-mt-14 sm:scroll-mt-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C1917]">
                Customer Feedback & Reviews
              </h2>
              <p className="mt-1 text-sm text-[#78716C]">
                Verified owner reviews and performance ratings on {product.fullName}
              </p>
            </div>

            {/* Overall Rating Box & Write Review Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#E7E2D9] bg-white shadow-xs">
                <div className="text-center">
                  <span className="font-heading text-4xl font-extrabold text-[#991B33] block">
                    {product.rating}
                  </span>
                  <span className="text-[11px] text-[#78716C]">out of 5</span>
                </div>
                <div className="border-l border-[#E7E2D9] pl-4">
                  <div className="flex items-center text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : i < product.rating
                            ? 'fill-amber-400/50 text-amber-400'
                            : 'text-stone-300 fill-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1C1917]">
                    {product.reviewCount} customer ratings
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsWritingReview(!isWritingReview)}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#E7E2D9] hover:border-[#991B33] text-xs font-bold uppercase tracking-wider text-[#1C1917] transition-all cursor-pointer shadow-xs"
              >
                {isWritingReview ? 'Cancel' : 'Write a Review'}
              </button>
            </div>
          </div>

          {/* Collapsible Write Review Form */}
          {isWritingReview && (
            <div className="mb-8 p-5 rounded-2xl border border-[#991B33]/30 bg-white shadow-md animate-fade-in">
              <h4 className="font-heading text-base font-bold text-[#1C1917] mb-3">
                Write Verified Buyer Review for {product.shortName || product.name}
              </h4>
              {reviewSubmitted ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Thank you! Your verified review has been published.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewerRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= reviewerRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300 fill-stone-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arjun Sharma"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] rounded-xl px-3 py-2 text-xs text-[#1C1917] outline-none focus:border-[#991B33]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">Review Details</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How was the build quality, sound, or design at this half rate price?"
                      value={reviewerText}
                      onChange={(e) => setReviewerText(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E2D9] rounded-xl px-3 py-2 text-xs text-[#1C1917] outline-none focus:border-[#991B33]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#991B33] hover:bg-[#7E1227] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(showAllReviews ? product.reviews : product.reviews.slice(0, 3)).map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-[#E7E2D9] bg-white p-5 shadow-xs transition-all hover:border-[#991B33]/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#FDF2F4] text-[#991B33] border border-[#F7CCD5] flex items-center justify-center font-bold text-xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#1C1917] block leading-snug">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-flex items-center gap-1 font-medium">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified Buyer
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-[#78716C]">
                    {rev.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300 fill-stone-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="mt-2.5 text-sm text-[#44403C] leading-relaxed font-sans">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {product.reviews && product.reviews.length > 3 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllReviews((prev) => !prev)}
                className="group inline-flex items-center gap-2 rounded-full border border-[#991B33] bg-white px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#991B33] shadow-xs transition-all duration-300 hover:bg-[#991B33] hover:text-white active:scale-95 cursor-pointer"
              >
                <span>{showAllReviews ? 'Show Less' : 'View More Reviews'}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    showAllReviews ? 'rotate-180' : 'group-hover:translate-y-0.5'
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Section 4: Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-10 border-t border-[#E7E2D9]">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1C1917] mb-6">
              {genreData?.label ? `More in ${genreData.label}` : 'You May Also Like'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/product/${rel.slug}`)}
                  className="product-card group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E7E2D9] bg-white p-3 shadow-xs transition-all hover:border-[#991B33]/50 hover:shadow-md"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-stone-50 border border-[#E7E2D9] mb-3">
                    <OptimizedImage
                      src={rel.image}
                      alt={rel.name}
                      fallbackText={rel.name}
                      containerClassName="w-full h-full"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-[#1C1917] group-hover:text-[#991B33] transition-colors line-clamp-1">
                    {rel.name}
                  </h4>
                  <div className="mt-1 flex items-baseline gap-1.5 flex-nowrap">
                    <span className="font-heading text-sm font-bold text-[#991B33] shrink-0">
                      ₹{rel.price}
                    </span>
                    <span className="text-[11px] text-[#78716C]/60 line-through shrink-0">
                      ₹{rel.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded shrink-0 border border-emerald-200">
                      {rel.discountBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom "Add to Bag" & "Buy Now" Bar for Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden border-t border-[#E7E2D9] bg-white/95 backdrop-blur-xl px-3 py-2.5 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2">
          {/* Quantity controller on mobile */}
          {!isOutOfStock && (
            <div className="flex items-center gap-1 rounded-xl border border-[#E7E2D9] bg-[#FAF8F5] px-2 py-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="text-[#78716C] hover:text-[#991B33] disabled:opacity-30 p-0.5"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-[1rem] text-center text-xs font-bold text-[#1C1917]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                disabled={quantity >= 10}
                className="text-[#78716C] hover:text-[#991B33] disabled:opacity-30 p-0.5"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-1 rounded-xl py-2.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer active:scale-95 transition-transform ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                : 'bg-white text-[#991B33] border-2 border-[#991B33]'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Bag</span>
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-[1.5] flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-transform ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md border border-amber-600/30'
            }`}
          >
            <span>Buy Now · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>

      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  )
}
