import { ShoppingBag, Star, Heart, CheckCircle2, Sparkles, Filter, ArrowUpDown, X, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore, GENRES } from '../store/cartStore'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const PRODUCTS_PER_BATCH = 8

function ProductCard({ product }) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const openReviews = useCartStore((s) => s.openReviews)
  const toggleWishlist = useCartStore((s) => s.toggleWishlist)
  const isWishlisted = useCartStore((s) => s.isWishlisted(product.id))
  const [ref, isVisible] = useScrollReveal(0.05)
  const isOutOfStock = product.inStock === false

  const savings = (product.originalPrice || Math.round(product.price * 2)) - product.price
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / (product.originalPrice || 1)) * 100
  )

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    if (isOutOfStock) return
    addItem(product)
    openCart()
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div
      ref={ref}
      onClick={handleCardClick}
      className={`product-card group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E7E2D9] bg-white transition-all duration-500 hover:border-[#991B33]/40 hover:shadow-xl hover:shadow-stone-900/8 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
            isOutOfStock ? 'opacity-60 grayscale-[25%]' : ''
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />

        {/* Top-Left: Sabse Sasta Deal Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-[#991B33] text-white shadow-sm border border-white/30">
            <Sparkles className="h-2.5 w-2.5 text-amber-300" />
            <span>Sabse Sasta</span>
          </span>
          {savings > 0 && (
            <span className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-extrabold bg-emerald-700 text-white shadow-xs">
              Save ₹{savings.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Out of Stock badge */}
        {isOutOfStock && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-black/85 backdrop-blur-md text-rose-400 border border-rose-500/50 shadow-md">
              Out of Stock
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-[#991B33] border border-rose-200'
              : 'bg-white/85 text-stone-500 hover:text-[#991B33] hover:bg-white border border-stone-200'
          }`}
          aria-label={`Wishlist ${product.name}`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`h-3.5 w-3.5 transition-all duration-300 ${
              isWishlisted ? 'fill-[#991B33] text-[#991B33] scale-110 animate-heart-burst' : 'hover:scale-110'
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="px-2.5 py-2.5 sm:px-3 sm:py-3 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Title */}
          <h3 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] transition-colors group-hover:text-[#991B33] line-clamp-1">
            {product.shortName || product.name}
          </h3>

          {/* Star Rating */}
          <div
            onClick={(e) => {
              e.stopPropagation()
              openReviews(product)
            }}
            className="mt-1 flex items-center gap-1 cursor-pointer group/rating hover:opacity-90 transition-opacity"
            title="Click to view verified buyer reviews"
          >
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2.5 w-2.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-500 text-amber-500'
                      : i < product.rating
                      ? 'fill-amber-500/50 text-amber-500'
                      : 'text-stone-300 fill-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#1C1917]">
              {product.rating}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#78716C] group-hover/rating:text-[#991B33] transition-colors">
              ({product.reviewCount})
            </span>
          </div>

          {/* Half Rate Pricing */}
          <div className="mt-1.5 flex items-baseline gap-1.5 flex-nowrap overflow-hidden">
            <span className="font-serif text-sm sm:text-base font-bold text-[#991B33] shrink-0">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#A8A29E] line-through shrink-0">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 py-0.5 rounded shrink-0">
              {discountPercent > 0 ? `${discountPercent}% OFF` : 'HALF RATE'}
            </span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <div className="mt-2 pt-2 border-t border-[#F0EBE3]">
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                : 'bg-[#991B33] hover:bg-[#7E1227] text-white shadow-xs hover:shadow-md hover:shadow-[#991B33]/20 active:scale-98 cursor-pointer'
            }`}
            aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to bag`}
          >
            <ShoppingBag className="h-3 w-3" />
            <span>{isOutOfStock ? 'Out of Stock' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  const allProducts = useCartStore((s) => s.products)
  const searchQuery = useCartStore((s) => s.searchQuery)
  const setSearchQuery = useCartStore((s) => s.setSearchQuery)
  const priceFilter = useCartStore((s) => s.priceFilter)
  const setPriceFilter = useCartStore((s) => s.setPriceFilter)

  const [selectedGenre, setSelectedGenre] = useState('ALL')
  const [sortBy, setSortBy] = useState('sabse_sasta') // 'sabse_sasta' | 'price_high' | 'discount' | 'rating'
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH)
  const loadMoreRef = useRef(null)

  // Filter and sort catalog
  const filteredCatalog = useMemo(() => {
    let list = allProducts.filter((p) => !p.isHidden)

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.shortName?.toLowerCase().includes(q) ||
          p.genre?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }

    // 2. Category Filter
    if (selectedGenre !== 'ALL') {
      list = list.filter((p) => p.genre === selectedGenre)
    }

    // 3. Sabse Sasta Price Filter
    if (priceFilter === 'UNDER_999') {
      list = list.filter((p) => p.price <= 999)
    } else if (priceFilter === 'UNDER_1999') {
      list = list.filter((p) => p.price <= 1999)
    } else if (priceFilter === 'HALF_RATE') {
      // 50% or more discount
      list = list.filter((p) => (p.originalPrice || p.price * 2) >= p.price * 1.8)
    } else if (priceFilter === 'RATED_48') {
      list = list.filter((p) => (p.rating || 0) >= 4.8)
    }

    // 4. Sorting
    if (sortBy === 'sabse_sasta') {
      // Lowest price first
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_high') {
      list = [...list].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'discount') {
      list = [...list].sort((a, b) => {
        const discA = ((a.originalPrice - a.price) / (a.originalPrice || 1))
        const discB = ((b.originalPrice - b.price) / (b.originalPrice || 1))
        return discB - discA
      })
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return list
  }, [allProducts, searchQuery, selectedGenre, priceFilter, sortBy])

  const visibleProducts = filteredCatalog.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCatalog.length

  // Infinite scroll trigger
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_BATCH, filteredCatalog.length))
  }, [filteredCatalog.length])

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  return (
    <section id="products" className="relative pb-16 sm:pb-24 pt-4 sm:pt-6 bg-[#FAF8F5]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1917] tracking-tight">
            Direct Factory Half Rate Deals
          </h2>
        </div>

        {/* Active Search Notification Banner */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E7E2D9] shadow-xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-bold text-[#1C1917]">Searching for:</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FDF2F4] text-[#991B33] font-bold">
                "{searchQuery}"
              </span>
              <span className="text-stone-400">({filteredCatalog.length} deals found)</span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#991B33] hover:underline"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear Search</span>
            </button>
          </div>
        )}

        {/* ── Filter & Sort Control Bar ── */}
        <div className="mb-6 flex flex-col gap-3">
          {/* Row 1: Sabse Sasta Deal Tiers */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'ALL', label: 'All Deals' },
              { id: 'UNDER_999', label: '⚡ Under ₹999' },
              { id: 'UNDER_1999', label: '🔥 Under ₹1,999' },
              { id: 'HALF_RATE', label: '🏷️ Flat 50% Off' },
              { id: 'RATED_48', label: '★ Top Rated (4.8+)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPriceFilter(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  priceFilter === tab.id
                    ? 'bg-[#991B33] text-white shadow-sm shadow-[#991B33]/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-[#E7E2D9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Row 2: Category Chips & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E7E2D9]/70">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedGenre('ALL')}
                className={`text-xs px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                  selectedGenre === 'ALL'
                    ? 'bg-[#1C1917] text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-[#E7E2D9]'
                }`}
              >
                All Categories
              </button>
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGenre(g.id)}
                  className={`text-xs px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                    selectedGenre === g.id
                      ? 'bg-[#1C1917] text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-[#E7E2D9]'
                  }`}
                >
                  {g.label.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="text-xs text-[#78716C] font-semibold flex items-center gap-1">
                <ArrowUpDown className="h-3 w-3 text-[#991B33]" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-[#1C1917] bg-white border border-[#E7E2D9] rounded-xl px-2.5 py-1.5 outline-none focus:border-[#991B33]"
              >
                <option value="sabse_sasta">Price: Lowest First (Sabse Sasta)</option>
                <option value="price_high">Price: High to Low</option>
                <option value="discount">Biggest Discount %</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-xs font-semibold text-[#78716C]">
          Showing {visibleProducts.length} of {filteredCatalog.length} Sabse Sasta deals
        </div>

        {/* Product Grid */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#E7E2D9] bg-white p-12 text-center my-6">
            <Tag className="h-12 w-12 text-[#991B33] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#1C1917]">No Matching Half Rate Deals</h3>
            <p className="mt-1 text-xs text-[#78716C]">
              Try changing your price filter, search term, or selected category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('ALL')
                setPriceFilter('ALL')
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#991B33] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        {hasMore && (
          <div ref={loadMoreRef} className="mt-14 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#991B33] animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-[#991B33] animate-pulse [animation-delay:200ms]" />
              <div className="h-2 w-2 rounded-full bg-[#991B33] animate-pulse [animation-delay:400ms]" />
            </div>
            <p className="text-xs text-[#78716C] tracking-wider uppercase font-semibold">Loading more deals...</p>
          </div>
        )}

        {/* End of Catalog message */}
        {!hasMore && visibleProducts.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-2 text-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#991B33]/40 to-transparent" />
            <p className="mt-2 text-xs text-[#78716C] tracking-wider uppercase font-semibold">
              All {filteredCatalog.length} Sabse Sasta deals displayed
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
