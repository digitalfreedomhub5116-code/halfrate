import { useScrollReveal } from '../hooks/useScrollReveal'
import { GENRES } from '../store/cartStore'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'

export default function Footer() {
  const [ref, isVisible] = useScrollReveal(0.08)
  const navigate = useNavigate()

  const handleGenreClick = (slug) => {
    navigate(`/${slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative border-t border-[#E7E2D9] bg-[#F4EFEA] text-[#57534E]">
      <div className="mx-auto h-px w-36 bg-gradient-to-r from-transparent via-[#991B33]/40 to-transparent" />

      <div
        className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Logo & Name */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-br from-[#991B33] to-[#6E0F22] flex items-center justify-center text-white font-serif font-black text-sm tracking-tighter shadow-sm shadow-[#991B33]/25 border border-[#F7CCD5]/40">
                ½
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-0.5 font-heading text-lg font-black tracking-tight leading-none">
                  <span className="text-[#1C1917]">HALFRATE</span>
                  <span className="text-[#991B33]">.CO</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[8px] font-black tracking-[0.2em] text-[#991B33] uppercase leading-none bg-[#FDF2F4] px-1 py-0.5 rounded border border-[#F7CCD5]">
                    SABSE SASTA
                  </span>
                </div>
              </div>
            </Link>
            <p className="mt-3.5 max-w-xs text-xs sm:text-sm leading-relaxed text-[#78716C]">
              Direct-to-consumer value electronics and curated lifestyle platform. 100% genuine products at guaranteed lowest half rates with pan-India express dispatch.
            </p>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] text-[#1C1917] uppercase">
              Curated Collections
            </h4>
            <ul className="mt-4 space-y-2.5">
              {GENRES.map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => handleGenreClick(g.slug)}
                    className="text-xs sm:text-sm text-[#78716C] transition-colors hover:text-[#991B33] text-left cursor-pointer"
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] text-[#1C1917] uppercase">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'About HalfRate', path: '#' },
                { label: 'Sabse Sasta Guarantee', path: '#' },
                { label: 'Track Consignment', path: '/track-order' },
                { label: 'Shipping & Delivery', path: '#' },
                { label: 'Returns & Replacements', path: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.path.startsWith('/')) {
                        navigate(link.path)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className="text-xs sm:text-sm text-[#78716C] transition-colors hover:text-[#991B33] text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    navigate('/admin-panel-access')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-xs sm:text-sm text-[#78716C] transition-colors hover:text-[#991B33] text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Admin Terminal</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#991B33]/10 text-[#991B33] border border-[#991B33]/20 font-mono font-bold">
                    HQ
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] text-[#1C1917] uppercase">
              HalfRate Alerts
            </h4>
            <p className="mt-4 text-xs sm:text-sm text-[#78716C]">
              Subscribe to get secret alert access for 70% off flash sales and direct factory drops.
            </p>
            <div className="mt-3 flex shadow-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-l-full border border-[#E7E2D9] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-colors focus:border-[#991B33]"
              />
              <button className="rounded-r-full bg-[#991B33] hover:bg-[#7E1227] px-4 py-2.5 text-white transition-all cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-[#E7E2D9] pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-[#78716C]">
            © 2026 halfrate.co. All rights reserved. Sabse Sasta Guaranteed.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Price Match Promise'].map((link) => (
              <a key={link} href="#" className="text-xs text-[#78716C] transition-colors hover:text-[#991B33]">
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                navigate('/admin-panel-access')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-xs text-[#78716C] transition-colors hover:text-[#991B33] cursor-pointer"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
