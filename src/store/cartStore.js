import { create } from 'zustand'
import { MOCK_PRODUCTS, GENRES } from '../data/productsData'
import { getLocalCart, saveCartToAccount, saveProduct } from '../lib/db'

const LOCAL_STORAGE_PRODUCTS_KEY = 'halfrate_catalog_v4'

// Helper to load products from localStorage with fallback to default catalog
const loadInitialProducts = () => {
  try {
    // Clear out deprecated legacy catalog caches if present
    try {
      localStorage.removeItem('halfrate_catalog_v3')
      localStorage.removeItem('halfrate_catalog_v2')
      localStorage.removeItem('halfrate_catalog_v1')
      localStorage.removeItem('halfrate_products')
    } catch {}

    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p) => ({
          ...p,
          inStock: p.inStock !== false,
          isHidden: p.isHidden === true,
        }))
      }
    }
  } catch (e) {
    console.warn('Failed to load stored products', e)
  }
  return MOCK_PRODUCTS.map((p) => ({
    ...p,
    inStock: p.inStock !== false,
    isHidden: false,
  }))
}

const persistProducts = (products) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products))
  } catch (e) {
    console.error('Failed to persist products to localStorage', e)
  }
}

export const useCartStore = create((set, get) => ({
  // ── Global Products State ──
  products: loadInitialProducts(),

  updateProduct: (updatedProduct) => {
    const current = get().products
    const nextProducts = current.map((p) => {
      if (p.id === updatedProduct.id) {
        const slug =
          updatedProduct.slug ||
          `${(updatedProduct.name || p.name)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}`
        const fullName =
          updatedProduct.fullName ||
          `${updatedProduct.name || p.name}`

        return {
          ...p,
          ...updatedProduct,
          slug,
          fullName,
          inStock: updatedProduct.inStock !== undefined ? updatedProduct.inStock : p.inStock !== false,
          isHidden: updatedProduct.isHidden !== undefined ? updatedProduct.isHidden : p.isHidden === true,
        }
      }
      return p
    })

    set({ products: nextProducts })
    persistProducts(nextProducts)

    // Also update matching items currently in the cart
    const updatedItems = get().items.map((it) => {
      if (it.id === updatedProduct.id) {
        return {
          ...it,
          name: updatedProduct.name || it.name,
          fullName: updatedProduct.fullName || it.fullName,
          price: updatedProduct.price !== undefined ? Number(updatedProduct.price) : it.price,
          image: updatedProduct.image || it.image,
        }
      }
      return it
    })
    set({ items: updatedItems })

    // Also update matching items in wishlist
    const updatedWishlist = get().wishlist.map((it) => {
      if (it.id === updatedProduct.id) {
        return {
          ...it,
          name: updatedProduct.name || it.name,
          fullName: updatedProduct.fullName || it.fullName,
          price: updatedProduct.price !== undefined ? Number(updatedProduct.price) : it.price,
          image: updatedProduct.image || it.image,
        }
      }
      return it
    })
    set({ wishlist: updatedWishlist })
  },

  addProduct: (newProduct) => {
    const slug =
      newProduct.slug ||
      `${newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    const fullName = newProduct.name
    const productWithDefaults = {
      id: newProduct.id || Date.now(),
      slug,
      fullName,
      originalPrice: newProduct.originalPrice || Math.round(newProduct.price * 1.8),
      reviewCount: 7,
      rating: 4.8,
      inStock: newProduct.inStock !== false,
      isHidden: newProduct.isHidden === true,
      gallery: newProduct.gallery && newProduct.gallery.length > 0 ? newProduct.gallery : [newProduct.image],
      dimensions: newProduct.dimensions || 'Standard Precision Dimensions',
      material: newProduct.material || 'Engineered Aluminum & Polymer',
      finish: newProduct.finish || 'Precision Matte Finish',
      purity: newProduct.purity || 'GRADE A+',
      compliance: newProduct.compliance || 'CE / FCC / RoHS',
      pack: newProduct.pack || 'Signature Presentation Box',
      durability: newProduct.durability || 'Premium Grade Tested Reliability',
      features: newProduct.features || [
        'CE and FCC certified for consumer safety & compliance',
        'Multi-stage automated QC verified hardware reliability',
        'Official 2-Year Pan-India Warranty protection',
      ],
      reviews: [],
      ...newProduct,
    }

    const nextProducts = [productWithDefaults, ...get().products]
    set({ products: nextProducts })
    persistProducts(nextProducts)
    return productWithDefaults
  },

  deleteProduct: (productId) => {
    const nextProducts = get().products.filter((p) => p.id !== productId)
    set({
      products: nextProducts,
      items: get().items.filter((it) => it.id !== productId),
      wishlist: get().wishlist.filter((it) => it.id !== productId),
    })
    persistProducts(nextProducts)
  },

  toggleProductStock: (productId) => {
    let updated = null
    const nextProducts = get().products.map((p) => {
      if (p.id === productId) {
        updated = { ...p, inStock: !p.inStock }
        return updated
      }
      return p
    })
    set({ products: nextProducts })
    persistProducts(nextProducts)
    if (updated) {
      saveProduct(updated).catch((e) => console.warn('Sync stock to db failed', e))
    }
  },

  toggleProductVisibility: (productId) => {
    let updated = null
    const nextProducts = get().products.map((p) => {
      if (p.id === productId) {
        updated = { ...p, isHidden: !p.isHidden }
        return updated
      }
      return p
    })
    set({ products: nextProducts })
    persistProducts(nextProducts)
    if (updated) {
      saveProduct(updated).catch((e) => console.warn('Sync visibility to db failed', e))
    }
  },

  resetProductsToDefault: () => {
    const defaults = MOCK_PRODUCTS.map((p) => ({
      ...p,
      inStock: true,
      isHidden: false,
    }))
    set({ products: defaults })
    persistProducts(defaults)
  },

  items: getLocalCart(),
  setItems: (newItems) => {
    set({ items: newItems })
    saveCartToAccount(newItems)
  },
  clearCart: () => {
    set({ items: [] })
    saveCartToAccount([])
  },
  isOpen: false,
  isCheckoutOpen: false,
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  activeReviewProduct: null, // Product whose reviews modal is currently open

  // ── Global Search & Sabse Sasta Filters ──
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  priceFilter: 'ALL', // 'ALL' | 'UNDER_999' | 'UNDER_1999' | 'HALF_RATE' | 'RATED_48'
  setPriceFilter: (filter) => set({ priceFilter: filter }),

  // ── Categories Drawer State ──
  isCategoriesOpen: false,
  openCategories: () => set({ isCategoriesOpen: true }),
  closeCategories: () => set({ isCategoriesOpen: false }),
  toggleCategoriesDrawer: () => set((state) => ({ isCategoriesOpen: !state.isCategoriesOpen })),

  // ── Auth Modal & Profile State ──
  isAuthOpen: false,
  openAuth: () => set({ isAuthOpen: true }),
  closeAuth: () => set({ isAuthOpen: false }),
  toggleAuth: () => set((state) => ({ isAuthOpen: !state.isAuthOpen })),
  openProfile: () => set({ isAuthOpen: true }),

  // ── Add Verified Customer Review ──
  addReview: (productId, newReview) => {
    const nextProducts = get().products.map((p) => {
      if (p.id === productId) {
        const existingReviews = p.reviews || []
        const updatedReviews = [newReview, ...existingReviews]
        const newCount = (p.reviewCount || 0) + 1
        const newRating = Math.min(5, Math.max(1, Number((((p.rating || 4.8) * (p.reviewCount || 1) + newReview.rating) / newCount).toFixed(1))))
        return {
          ...p,
          reviewCount: newCount,
          rating: newRating,
          reviews: updatedReviews,
        }
      }
      return p
    })
    set({ products: nextProducts })
    persistProducts(nextProducts)
    // Also update activeReviewProduct if currently open
    const currentActive = get().activeReviewProduct
    if (currentActive && currentActive.id === productId) {
      set({
        activeReviewProduct: nextProducts.find((p) => p.id === productId) || currentActive,
      })
    }
  },

  // ── Wishlist State ──
  wishlist: [],
  isWishlistOpen: false,
  wishlistPing: false,

  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
  toggleWishlistDrawer: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),

  toggleWishlist: (product) => {
    const exists = get().wishlist.some((item) => item.id === product.id)
    if (exists) {
      set({ wishlist: get().wishlist.filter((item) => item.id !== product.id) })
    } else {
      // Add product & trigger glowing highlight animation on navbar heart!
      set({
        wishlist: [...get().wishlist, product],
        wishlistPing: true,
      })
      setTimeout(() => {
        set({ wishlistPing: false })
      }, 1400)
    }
  },

  isWishlisted: (productId) => {
    return get().wishlist.some((item) => item.id === productId)
  },

  getWishlistCount: () => {
    return get().wishlist.length
  },

  // ── Reviews Modal State ──
  openReviews: (product) => set({ activeReviewProduct: product }),
  closeReviews: () => set({ activeReviewProduct: null }),

  // ── Cart Drawer State ──
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  // ── Coupon & Free Shipping State ──
  appliedCoupon: null,
  couponError: '',

  applyCoupon: (code) => {
    if (!code || !code.trim()) {
      set({ couponError: 'Please enter a coupon code.' })
      return { success: false, message: 'Please enter a coupon code.' }
    }
    const cleanCode = code.trim().toUpperCase()
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode)
    if (!found) {
      const err = `Invalid coupon code "${cleanCode}". Try HALFRATE50 or SABSE100.`
      set({ couponError: err })
      return { success: false, message: err }
    }

    const subtotal = get().getTotal()
    if (subtotal < found.minOrderValue) {
      const err = `Min. order value of ₹${found.minOrderValue} required for ${found.code}. Add ₹${found.minOrderValue - subtotal} more.`
      set({ couponError: err })
      return { success: false, message: err }
    }

    set({ appliedCoupon: found, couponError: '' })
    return { success: true, message: `Coupon ${found.code} applied successfully!` }
  },

  removeCoupon: () => {
    set({ appliedCoupon: null, couponError: '' })
  },

  getCouponDiscount: () => {
    const coupon = get().appliedCoupon
    if (!coupon) return 0
    const subtotal = get().getTotal()
    if (subtotal < coupon.minOrderValue) return 0

    if (coupon.discountType === 'FLAT') {
      return Math.min(coupon.discountValue, subtotal)
    }
    if (coupon.discountType === 'PERCENT') {
      const discount = Math.round((subtotal * coupon.discountValue) / 100)
      return Math.min(discount, coupon.maxDiscount || discount)
    }
    return 0
  },

  getShippingFee: () => {
    const subtotal = get().getTotal()
    const coupon = get().appliedCoupon
    if (subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.discountType === 'SHIPPING' || coupon?.code === 'FREESHIP') {
      return 0
    }
    return subtotal > 0 ? 60 : 0
  },

  getRemainingForFreeShipping: () => {
    const subtotal = get().getTotal()
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  },

  getFreeShippingProgress: () => {
    const subtotal = get().getTotal()
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  },

  getFinalTotal: () => {
    const subtotal = get().getTotal()
    const shipping = get().getShippingFee()
    const discount = get().getCouponDiscount()
    return Math.max(0, subtotal + shipping - discount)
  },

  addItem: (product, quantity = 1) => {
    if (product.inStock === false) return
    const addQty = Math.max(1, Number(quantity) || 1)
    const existing = get().items.find((item) => item.id === product.id)
    let nextItems
    if (existing) {
      nextItems = get().items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + addQty }
          : item
      )
    } else {
      nextItems = [...get().items, { ...product, quantity: addQty }]
    }
    set({ items: nextItems })
    saveCartToAccount(nextItems)
  },

  removeItem: (id) => {
    const nextItems = get().items.filter((item) => item.id !== id)
    set({ items: nextItems })
    saveCartToAccount(nextItems)
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    const nextItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
    set({ items: nextItems })
    saveCartToAccount(nextItems)
  },

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

export const AVAILABLE_COUPONS = [
  {
    code: 'HALFRATE50',
    discountType: 'FLAT',
    discountValue: 50,
    minOrderValue: 499,
    description: 'Flat ₹50 OFF on orders above ₹499',
    badge: 'SAVE ₹50',
  },
  {
    code: 'SABSE100',
    discountType: 'FLAT',
    discountValue: 100,
    minOrderValue: 999,
    description: 'Flat ₹100 OFF on orders above ₹999',
    badge: 'SAVE ₹100',
  },
  {
    code: 'EXTRA10',
    discountType: 'PERCENT',
    discountValue: 10,
    maxDiscount: 200,
    minOrderValue: 299,
    description: '10% Instant Discount (up to ₹200)',
    badge: '10% OFF',
  },
  {
    code: 'FREESHIP',
    discountType: 'SHIPPING',
    discountValue: 60,
    minOrderValue: 0,
    description: '100% Free Express Courier Delivery',
    badge: 'FREE DELIVERY',
  },
]

export const FREE_SHIPPING_THRESHOLD = 999

export { MOCK_PRODUCTS, GENRES }
