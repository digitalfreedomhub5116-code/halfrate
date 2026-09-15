import { ShoppingBag, User, X, Menu, Heart, Search, SlidersHorizontal, Bell, LayoutGrid, Sparkles, ArrowRight, Tag } from 'lucide-react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useScrolled } from '../hooks/useScrollReveal'

const TRENDING_SEARCHES = ['Selfie Stick', 'MZ Speaker', 'PD Cable', 'Car Mount', 'Fitgear FG-C3', 'Fitgear FG-M4']

export default function Navbar({ visible = true }) {
  const scrolled = useScrolled(20)
  const toggleCart = useCartStore((s) => s.toggleCart)
  const itemCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useCartStore((s) => s.getWishlistCount())
  const wishlistPing = useCartStore((s) => s.wishlistPing)
  const toggleWishlistDrawer = useCartStore((s) => s.toggleWishlistDrawer)
  const openCategories = useCartStore((s) => s.openCategories)
  const allProducts = useCartStore((s) => s.products)
  const setGlobalSearch = useCartStore((s) => s.setSearchQuery)

  const isAuthOpen = useCartStore((s) => s.isAuthOpen)
  const openAuth = useCartStore((s) => s.openAuth)
  const closeAuth = useCartStore((s) => s.closeAuth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()

  // Live filter matching products
  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase().trim()
    return allProducts
      .filter(
        (p) =>
          !p.isHidden &&
          (p.name?.toLowerCase().includes(q) ||
            p.shortName?.toLowerCase().includes(q) ||
            p.genre?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q))
      )
      .slice(0, 5)
  }, [allProducts, searchQuery])

  // Track scroll direction for mobile navbar behavior
  const [scrollDirection, setScrollDirection] = useState('none')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setScrollY(currentScrollY)

          if (currentScrollY < 50) {
            setScrollDirection('none')
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
            setScrollDirection('down') // Scrolling down
          } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
            setScrollDirection('up') // Scrolling up
          }

          lastScrollY = currentScrollY > 0 ? currentScrollY : 0
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false)
    setIsSearchFocused(false)
    if (hash === '#') {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    navigate('/')
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      setGlobalSearch(searchQuery.trim())
      setIsSearchFocused(false)
      handleNavClick('#products')
    }
  }

  const handleSelectProduct = (slug) => {
    setIsSearchFocused(false)
    setSearchQuery('')
    navigate(`/product/${slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChipClick = (term) => {
    setSearchQuery(term)
    setGlobalSearch(term)
    setIsSearchFocused(false)
    handleNavClick('#products')
  }

  // Mobile scroll logic:
  const isMobileHideAll = scrollDirection === 'down' && scrollY > 50
  const isMobileShowSearchOnly = scrollDirection === 'up' && scrollY > 50

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE NAVBAR (< md) — App-style header with live search bar
          ══════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ease-out ${
          !visible || isMobileHideAll ? '-translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        {/* Gradient Background Layer */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled
              ? 'bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#FAF8F5]/95 shadow-sm shadow-stone-900/5'
              : 'bg-gradient-to-b from-[#FAF8F5] to-[#F5F0EA]/90'
          }`}
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        />

        <div className="relative px-4 pt-3 pb-3">
          {/* Row 1: Grid Icon · Brand Logo · Shopping Cart */}
          <div
            className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${
              isMobileShowSearchOnly
                ? 'h-0 mb-0 opacity-0 pointer-events-none'
                : 'h-10 mb-3 opacity-100'
            }`}
          >
            {/* Grid / Menu Icon */}
            <button
              onClick={() => {
                if (openCategories) openCategories()
                else setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/75 backdrop-blur-sm text-[#1C1917] transition-all active:scale-95 shadow-xs border border-[#E7E2D9]"
              aria-label="Categories"
              title="Categories"
            >
              <LayoutGrid className="h-[18px] w-[18px] text-[#991B33]" strokeWidth={2} />
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              {/* HalfRate '½' Monogram Badge */}
              <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-br from-[#991B33] to-[#6E0F22] flex items-center justify-center text-white font-serif font-black text-sm tracking-tighter shadow-sm shadow-[#991B33]/25 transition-transform duration-300 group-hover:scale-105 border border-[#F7CCD5]/40">
                ½
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5 font-heading text-sm font-black tracking-tight leading-tight">
                  <span className="text-[#1C1917]">HALFRATE</span>
                  <span className="text-[#991B33]">.CO</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[7.5px] font-black tracking-[0.2em] text-[#991B33] uppercase leading-none bg-[#FDF2F4] px-1 py-0.5 rounded border border-[#F7CCD5]">
                    SABSE SASTA
                  </span>
                </div>
              </div>
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-white/75 backdrop-blur-sm text-[#1C1917] transition-all active:scale-95 shadow-xs border border-[#E7E2D9]"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#991B33] text-[9px] font-bold text-white shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Row 2: Live Search Bar */}
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center h-11 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E7E2D9] shadow-xs px-3.5 gap-2.5 transition-all focus-within:border-[#991B33] focus-within:shadow-md focus-within:shadow-[#991B33]/10">
                <Search className="h-4 w-4 text-[#991B33] shrink-0" strokeWidth={2.2} />
                <input
                  type="text"
                  placeholder="Search selfie sticks, tripods, car mounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setGlobalSearch('')
                    }}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openCategories?.() || handleNavClick('#genres')}
                  className="shrink-0 text-[#78716C] hover:text-[#991B33] transition-colors p-1"
                  aria-label="Filters"
                  title="Browse Categories"
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
            </form>

            {/* Live Search Suggestion Dropdown (Mobile) */}
            {isSearchFocused && (
              <div className="absolute top-12 left-0 right-0 z-50 rounded-2xl border border-[#E7E2D9] bg-white shadow-2xl p-3 max-h-[380px] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#991B33] flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Sabse Sasta Suggestions
                  </span>
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="text-[11px] font-bold text-stone-400 hover:text-stone-700"
                  >
                    Close
                  </button>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {TRENDING_SEARCHES.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#FDF2F4] text-[#1C1917] hover:text-[#991B33] border border-[#E7E2D9] transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Matching products */}
                {matchingProducts.length > 0 ? (
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.slug)}
                        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                      >
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-stone-200" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#1C1917] truncate">{p.shortName || p.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#991B33]">₹{p.price}</span>
                            {p.originalPrice && (
                              <span className="text-[10px] text-stone-400 line-through">₹{p.originalPrice}</span>
                            )}
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                              Half Rate
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <p className="text-xs text-stone-500 text-center py-3">No matching products found. Try another search.</p>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative border-t border-[#E7E2D9]/60 px-5 pb-5 pt-3 bg-[#FAF8F5]/98 backdrop-blur-md shadow-lg">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavClick('#')}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#1C1917] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer border-b border-[#E7E2D9]/50"
              >
                HOME
              </button>
              <button
                onClick={() => handleNavClick('#products')}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#57534E] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer border-b border-[#E7E2D9]/50"
              >
                ALL PRODUCTS
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (openCategories) openCategories()
                  else handleNavClick('#genres')
                }}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#57534E] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer border-b border-[#E7E2D9]/50"
              >
                CATEGORIES
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsAuthOpen(true)
                }}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#57534E] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer border-b border-[#E7E2D9]/50"
              >
                <User className="h-4 w-4 text-[#991B33]" />
                <span>MY ACCOUNT & ORDERS</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  toggleWishlistDrawer()
                }}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#57534E] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer border-b border-[#E7E2D9]/50"
              >
                <Heart className={`h-4 w-4 ${wishlistCount > 0 ? 'fill-[#991B33] text-[#991B33]' : 'text-[#991B33]'}`} />
                <span>WISHLIST{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  toggleCart()
                }}
                className="flex items-center gap-3 text-left text-xs font-bold text-[#57534E] hover:text-[#991B33] tracking-[0.15em] uppercase py-3 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-[#991B33]" />
                <span>SHOPPING BAG{itemCount > 0 ? ` (${itemCount})` : ''}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP NAVBAR (md+) — Classic horizontal bar
          ══════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        } ${
          scrolled
            ? 'navbar-glass shadow-sm shadow-stone-900/5'
            : 'bg-[#FAF8F5]/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* 1. Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              {/* HalfRate '½' Monogram Badge */}
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#991B33] to-[#6E0F22] flex items-center justify-center text-white font-serif font-black text-lg tracking-tighter shadow-sm shadow-[#991B33]/25 transition-transform duration-300 group-hover:scale-105 border border-[#F7CCD5]/40">
                ½
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5 font-heading text-xl font-black tracking-tight leading-none">
                  <span className="text-[#1C1917]">HALFRATE</span>
                  <span className="text-[#991B33]">.CO</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] font-black tracking-[0.25em] text-[#991B33] uppercase leading-none bg-[#FDF2F4] px-1.5 py-0.5 rounded border border-[#F7CCD5]">
                    SABSE SASTA
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Desktop Search with Live Dropdown */}
            <div className="relative flex-1 max-w-md mx-6">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center h-10 rounded-full bg-white/90 border border-[#E7E2D9] px-3.5 gap-2.5 transition-all focus-within:border-[#991B33] focus-within:shadow-md focus-within:shadow-[#991B33]/10">
                  <Search className="h-4 w-4 text-[#991B33] shrink-0" strokeWidth={2.2} />
                  <input
                    type="text"
                    placeholder="Search selfie sticks, tripods, car mounts at half rate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="flex-1 bg-transparent text-xs text-[#1C1917] placeholder-[#A8A29E] outline-none font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('')
                        setGlobalSearch('')
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Desktop Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-12 left-0 right-0 z-50 rounded-2xl border border-[#E7E2D9] bg-white shadow-2xl p-3 max-h-[380px] overflow-y-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#991B33] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Sabse Sasta Deals
                    </span>
                    <button
                      onClick={() => setIsSearchFocused(false)}
                      className="text-[11px] font-bold text-stone-400 hover:text-stone-700"
                    >
                      Close
                    </button>
                  </div>

                  {/* Trending Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {TRENDING_SEARCHES.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF8F5] hover:bg-[#FDF2F4] text-[#1C1917] hover:text-[#991B33] border border-[#E7E2D9] transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Matching products */}
                  {matchingProducts.length > 0 ? (
                    <div className="space-y-1.5">
                      {matchingProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug)}
                          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                        >
                          <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover border border-stone-200" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#1C1917] truncate">{p.shortName || p.name}</p>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#991B33]">₹{p.price}</span>
                              {p.originalPrice && (
                                <span className="text-[10px] text-stone-400 line-through">₹{p.originalPrice}</span>
                              )}
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                                Half Rate
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <p className="text-xs text-stone-500 text-center py-3">No matching products found.</p>
                  ) : null}
                </div>
              )}
            </div>

            {/* 3. Desktop Navigation Links */}
            <div className="flex items-center gap-6 lg:gap-7">
              <button
                onClick={() => handleNavClick('#')}
                className="text-xs font-bold text-[#1C1917] transition-colors hover:text-[#991B33] tracking-[0.15em] uppercase cursor-pointer"
              >
                HOME
              </button>
              <button
                onClick={() => handleNavClick('#products')}
                className="text-xs font-bold text-[#57534E] transition-colors hover:text-[#991B33] tracking-[0.15em] uppercase cursor-pointer"
              >
                ALL PRODUCTS
              </button>
              <button
                onClick={() => {
                  if (openCategories) openCategories()
                  else handleNavClick('#genres')
                }}
                className="text-xs font-bold text-[#57534E] transition-colors hover:text-[#991B33] tracking-[0.15em] uppercase cursor-pointer"
              >
                CATEGORIES
              </button>
            </div>

            {/* 3. Action Icons */}
            <div className="flex items-center gap-3">
              {/* Account Icon */}
              <button
                onClick={openAuth}
                className="group rounded-full p-2 text-[#57534E] transition-all hover:bg-white hover:text-[#991B33] hover:shadow-xs cursor-pointer"
                aria-label="Account"
                title="My Account"
              >
                <User className="h-5 w-5" strokeWidth={1.75} />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={toggleWishlistDrawer}
                className={`group relative rounded-full p-2 transition-all duration-300 hover:bg-white hover:shadow-xs ${
                  wishlistPing
                    ? 'animate-wishlist-ping text-rose-500 bg-rose-50'
                    : 'text-[#57534E] hover:text-[#991B33]'
                }`}
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    wishlistCount > 0 || wishlistPing
                      ? 'fill-[#991B33] text-[#991B33] scale-110'
                      : 'group-hover:scale-110'
                  }`}
                  strokeWidth={1.75}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#991B33] text-[10px] font-bold text-white shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="group relative rounded-full p-2 text-[#57534E] transition-all hover:bg-white hover:text-[#991B33] hover:shadow-xs cursor-pointer"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#991B33] text-[10px] font-bold text-white shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
