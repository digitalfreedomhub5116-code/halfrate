import { X, Minus, Plus, ShoppingBag, Tag, Truck, Sparkles, CheckCircle2 } from 'lucide-react'
import { useCartStore, GENRES, AVAILABLE_COUPONS, FREE_SHIPPING_THRESHOLD } from '../store/cartStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CartItem({ item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const genreData = GENRES.find((g) => g.id === item.genre)

  return (
    <div className="flex gap-3.5 rounded-xl border border-[#E7E2D9] bg-[#FAF8F5] p-3 transition-colors hover:border-[#991B33]/30">
      {/* Thumbnail */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#E7E2D9] bg-white">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              {genreData && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#991B33]">
                  {genreData.label}
                </span>
              )}
              <h4 className="font-heading text-sm font-semibold text-[#1C1917] leading-snug">
                {item.name}
              </h4>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 rounded-full p-1 text-[#78716C] transition-colors hover:bg-[#F0EBE3] hover:text-[#1C1917]"
              aria-label="Remove item"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 rounded-full border border-[#E7E2D9] bg-white px-2 py-0.5 shadow-xs">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="rounded-full p-1 text-[#78716C] transition-colors hover:text-[#991B33]"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[1.25rem] text-center text-xs font-semibold text-[#1C1917]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="rounded-full p-1 text-[#78716C] transition-colors hover:text-[#991B33]"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-sm font-bold text-[#991B33]">
              ₹{item.price * item.quantity}
            </span>
            <span className="text-[11px] text-[#78716C]/60 line-through">
              ₹{(item.originalPrice || 459) * item.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)
  const getItemCount = useCartStore((s) => s.getItemCount)
  const appliedCoupon = useCartStore((s) => s.appliedCoupon)
  const couponError = useCartStore((s) => s.couponError)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)
  const getCouponDiscount = useCartStore((s) => s.getCouponDiscount)
  const getShippingFee = useCartStore((s) => s.getShippingFee)
  const getRemainingForFreeShipping = useCartStore((s) => s.getRemainingForFreeShipping)
  const getFreeShippingProgress = useCartStore((s) => s.getFreeShippingProgress)
  const getFinalTotal = useCartStore((s) => s.getFinalTotal)

  const navigate = useNavigate()
  const [animating, setAnimating] = useState(false)
  const [visible, setVisible] = useState(false)
  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [couponSuccessMsg, setCouponSuccessMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => setAnimating(true))
      document.body.style.overflow = 'hidden'
    } else {
      setAnimating(false)
      const timer = setTimeout(() => setVisible(false), 350)
      document.body.style.overflow = ''
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!visible) return null

  const total = getTotal()
  const count = getItemCount()
  const originalTotal = items.reduce(
    (sum, item) => sum + (item.originalPrice || 459) * item.quantity,
    0
  )
  const totalSavings = originalTotal - total
  const shippingFee = getShippingFee()
  const couponDiscount = getCouponDiscount()
  const remainingForFree = getRemainingForFreeShipping()
  const progressPercent = getFreeShippingProgress()
  const finalTotal = getFinalTotal()

  const handleApplyCoupon = (codeToApply) => {
    const target = codeToApply || couponCodeInput
    const res = applyCoupon(target)
    if (res.success) {
      setCouponSuccessMsg(res.message)
      setCouponCodeInput('')
      setTimeout(() => setCouponSuccessMsg(''), 2500)
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 ${
          animating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl shadow-stone-900/20 border-l border-[#E7E2D9] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7E2D9] px-5 py-4 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#991B33]" strokeWidth={1.75} />
            <h2 className="font-heading text-lg font-bold text-[#1C1917]">Shopping Bag</h2>
            {count > 0 && (
              <span className="rounded-full bg-[#FDF2F4] px-2.5 py-0.5 text-xs font-bold text-[#991B33] border border-[#F7CCD5]">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-[#78716C] transition-colors hover:bg-[#F0EBE3] hover:text-[#1C1917]"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Free Shipping Milestone Progress Bar */}
        {items.length > 0 && (
          <div className="bg-[#FAF8F5] border-b border-[#E7E2D9] px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold flex items-center gap-1.5 text-[#1C1917]">
                <Truck className="h-4 w-4 text-[#991B33]" />
                {remainingForFree > 0 ? (
                  <span>
                    Add <strong className="text-[#991B33]">₹{remainingForFree}</strong> more for <strong className="text-emerald-700 uppercase tracking-wide">FREE Express Delivery</strong>!
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>🎉 You unlocked FREE Express Delivery!</span>
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#78716C]">
                {progressPercent}%
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  remainingForFree === 0
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-[#991B33] to-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-[#D6D0C5]" strokeWidth={1} />
              <p className="font-heading text-lg font-bold text-[#1C1917]">
                Your shopping bag is empty
              </p>
              <p className="mt-1 text-xs text-[#78716C] max-w-xs">
                Explore our premium audio, titanium wearables, and smart accessories to add to your order.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 rounded-full border border-[#991B33] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#991B33] transition-all hover:bg-[#991B33] hover:text-white"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E7E2D9] px-5 py-5 bg-[#FAF8F5]">
            {/* Coupon Code Section */}
            <div className="mb-4 pb-3 border-b border-[#E7E2D9]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-[#991B33]" />
                  <span>Have a Promo Code?</span>
                </span>
                {appliedCoupon && (
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>

              {appliedCoupon ? (
                /* Active Coupon Applied Badge */
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono font-extrabold text-xs tracking-wider">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {appliedCoupon.description}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-700">
                    -₹{couponDiscount}
                  </span>
                </div>
              ) : (
                /* Coupon Input Box */
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon (e.g. HALFRATE50)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleApplyCoupon()
                      }}
                      className="flex-1 bg-white border border-[#E7E2D9] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1C1917] placeholder:font-sans placeholder:font-normal placeholder-[#A8A29E] uppercase outline-none focus:border-[#991B33]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#991B33] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Feedback Messages */}
                  {couponError && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600">
                      {couponError}
                    </p>
                  )}
                  {couponSuccessMsg && (
                    <p className="mt-1 text-[11px] font-medium text-emerald-700">
                      {couponSuccessMsg}
                    </p>
                  )}

                  {/* Quick-apply coupon chips */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {AVAILABLE_COUPONS.slice(0, 3).map((cp) => (
                      <button
                        key={cp.code}
                        type="button"
                        onClick={() => handleApplyCoupon(cp.code)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-dashed border-[#991B33]/40 bg-white hover:bg-[#FDF2F4] text-[10px] font-bold text-[#991B33] cursor-pointer transition-colors"
                        title={cp.description}
                      >
                        <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                        <span>{cp.code}</span>
                        <span className="text-[9px] text-[#78716C]">({cp.badge})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtotal & Savings */}
            <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-[#78716C]">Items Subtotal</span>
              <div className="text-right">
                <span className="font-heading text-base font-bold text-[#1C1917]">₹{total}</span>
                <span className="ml-2 text-xs text-[#78716C]/60 line-through">₹{originalTotal}</span>
              </div>
            </div>

            {/* Special Discount Savings */}
            {totalSavings > 0 && (
              <div className="mb-2 flex items-center justify-between text-xs text-emerald-700">
                <span>Direct Half Rate Savings</span>
                <span className="font-semibold">Save ₹{totalSavings}</span>
              </div>
            )}

            {/* Coupon Discount Row */}
            {appliedCoupon && couponDiscount > 0 && (
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" /> Coupon Discount ({appliedCoupon.code})
                </span>
                <span>- ₹{couponDiscount}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#78716C]">Standard Courier Delivery</span>
              {shippingFee === 0 ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[#78716C]/60 line-through">₹60</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    FREE
                  </span>
                </div>
              ) : (
                <span className="font-semibold text-[#1C1917]">₹60</span>
              )}
            </div>

            {/* Total */}
            <div className="mb-4 pt-2 border-t border-[#E7E2D9] flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#1C1917] block">Estimated Total</span>
                <span className="text-[10px] text-[#78716C]">Inclusive of all taxes</span>
              </div>
              <span className="font-heading text-2xl font-extrabold text-[#991B33]">
                ₹{finalTotal}
              </span>
            </div>

            <button
              onClick={() => {
                closeCart()
                navigate('/checkout')
              }}
              className="w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md bg-[#991B33] text-white hover:bg-[#7E1227] transition-colors active:scale-98"
            >
              Proceed to Checkout · ₹{finalTotal}
            </button>
            <button
              onClick={closeCart}
              className="mt-3 w-full rounded-full py-2 text-center text-xs font-semibold text-[#78716C] transition-colors hover:text-[#991B33] cursor-pointer"
            >
              ← Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
