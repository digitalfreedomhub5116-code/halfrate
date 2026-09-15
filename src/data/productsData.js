import { REVIEWS_POOL } from './reviewsData'

export const GENRES = [
  {
    id: 'MOBILE_ACCESSORIES',
    label: 'Mobile Accessories',
    slug: 'mobile-accessories',
    image: '/images/products/fitgear-fg-m4/fitgear-fg-m4-1.jpg',
    description: 'Ultra-long 1.8M selfie sticks, heavy-duty phone tripods, in-car dashboard mounts, and essential mobile gear.',
  },
  {
    id: 'CAR_ACCESSORIES',
    label: 'Car Mounts & Stands',
    slug: 'car-accessories',
    image: '/images/products/fitgear-fg-15/fitgear-fg-15-1.jpg',
    description: 'Heavy-duty 360° dashboard mounts, windshield phone brackets, and in-car driving accessories.',
  },
  {
    id: 'AUDIO_SPEAKERS',
    label: 'Bluetooth Speakers',
    slug: 'bluetooth-speakers',
    image: '/images/products/mz-m412sp/mz-m412sp-1.jpg',
    description: 'Portable wireless Bluetooth speakers, crystal-clear dynamic audio, RGB ambient halo lights, and punchy bass.',
  },
]

const RAW_PRODUCTS = [
  // ══════════════════════════════════════════════════════════════════
  // 1. FITGEAR FG-M4 ULTRA-LONG 1.8M SELFIE STICK & TRIPOD
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'fitgear-fg-m4',
    name: 'Fitgear FG-M4 Ultra-Long 1.8M Extended Selfie Stick & Tripod with Bluetooth Remote',
    shortName: 'Fitgear FG-M4 Selfie Stick & Tripod',
    genre: 'MOBILE_ACCESSORIES',
    price: 999,
    originalPrice: 1999,
    reviewCount: 48,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/fitgear-fg-m4/fitgear-fg-m4-1.jpg',
    gallery: [
      '/images/products/fitgear-fg-m4/fitgear-fg-m4-1.jpg',
      '/images/products/fitgear-fg-m4/fitgear-fg-m4-2.jpg',
      '/images/products/fitgear-fg-m4/fitgear-fg-m4-3.jpg',
      '/images/products/fitgear-fg-m4/fitgear-fg-m4-4.jpg',
    ],
    purity: 'Aviation-Grade Aluminum Build',
    compliance: 'Fitgear® Official Certification',
    pack: 'Fitgear FG-M4 Stick + Bluetooth Remote + User Guide',
    dimensions: 'Folded: 29.5 cm | Full Extension: 180 cm (1.8m)',
    weight: '340g Ultra-Portable Design',
    material: '7-Section Aviation Aluminum Pole & Reinforced Tripod',
    chipset: '1.8M Reach • Bluetooth Remote • 360° Rotation',
    description: 'The Fitgear FG-M4 Ultra-Long Extended Selfie Stick & Tripod delivers an unmatched 1.8-meter (180 cm) reach for capturing expansive group shots, dramatic travel panoramas, and dynamic vlog perspectives. Built with a smooth and durable 7-section aviation-grade aluminum alloy telescoping pole, reinforced non-slip tripod base for hands-free stability, 360° rotating phone mount, and a detachable quick-connect Bluetooth remote for effortless wireless control.',
    features: [
      'Unmatched 1.8 Meter (180 cm) reach — double the extension of standard selfie sticks for wider, epic group photos and dynamic landscapes',
      'Smooth & durable 7-section aviation-grade aluminum alloy telescoping pole engineered for zero flex and maximum stability',
      'Reinforced stable tripod base with anti-slip silicone feet for shake-free hands-free shooting, vlogging, and video calls',
      'Detachable wireless Bluetooth shutter remote with up to 10m quick, reliable connection',
      '360° rotation and multi-angle tilt phone clamp to effortlessly switch between portrait and landscape modes',
      'Ultra-compact folded length of only 29.5 cm — perfectly portable, fits easily into standard backpacks and travel bags',
      'Universal phone mount compatible with all iPhone, Samsung, OnePlus, Xiaomi, and other smartphones (4.7 to 7.0)',
    ],
    specs: {
      'Brand': 'Fitgear®',
      'Model': 'FG-M4',
      'Max Extension Reach': '1.8 Meters (180 cm)',
      'Folded Length': '29.5 cm (approx. 30 cm)',
      'Pole Build': '7-Section Aviation Aluminum Alloy',
      'Base': 'Reinforced Anti-Slip Tripod Stand',
      'Wireless Shutter': 'Detachable Bluetooth Remote (10m range)',
      'Phone Mount': '360° Horizontal / 270° Vertical Tilt',
      'Phone Compatibility': 'Universal (4.7 to 7.0 smartphones)',
      'Product Weight': 'Approx. 340g',
      'Ideal Usage': 'Group Photos, Vlogs, Travel, Panoramic Selfies',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 2. FITGEAR FG-15 SECURE-GRIP PRO IN-CAR PHONE MOUNT BRACKET
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'fitgear-fg-15',
    name: 'Fitgear FG-15 Secure-Grip Pro In-Car Phone Bracket & Windshield/Dashboard Mount',
    shortName: 'Fitgear FG-15 In-Car Phone Mount',
    genre: 'CAR_ACCESSORIES',
    price: 339,
    originalPrice: 999,
    reviewCount: 36,
    rating: 4.8,
    badCount: 0,
    image: '/images/products/fitgear-fg-15/fitgear-fg-15-1.jpg',
    gallery: [
      '/images/products/fitgear-fg-15/fitgear-fg-15-1.jpg',
      '/images/products/fitgear-fg-15/fitgear-fg-15-2.jpg',
      '/images/products/fitgear-fg-15/fitgear-fg-15-3.jpg',
      '/images/products/fitgear-fg-15/fitgear-fg-15-4.jpg',
      '/images/products/fitgear-fg-15/fitgear-fg-15-5.jpg',
    ],
    purity: 'Heavy-Duty ABS & Sticky Gel Suction',
    compliance: 'Fitgear® Official 2-Year Warranty',
    pack: 'Fitgear FG-15 Bracket + Suction Base + User Manual',
    dimensions: 'Telescopic Arm: 10cm - 16cm | Universal Phone Clamp',
    weight: '210g Reinforced Driving Stability',
    material: 'Thermal-Resistant ABS Body & Reusable Sticky Gel Pad',
    chipset: '360° Ball Joint • Extreme Temp Suction • Case Friendly',
    description: 'The Fitgear FG-15 Secure-Grip Pro In-Car Phone Bracket is engineered for rock-solid stability on every journey. Built with an ultra-strong reusable sticky gel suction cup and two-step pressure-locking lever, it mounts reliably on dashboards, windshields, and textured leather consoles. Features 360° omnidirectional rotation, an extendable telescopic arm for the ultimate GPS navigation viewing angle, extreme all-season temperature resistance (-4°F to 194°F), and extra-deep case-friendly clamping arms that securely lock heavy-duty armor cases with zero wobble.',
    features: [
      'Multi-Surface Versatility — Securely adheres to dashboards, windshield glass, leather consoles, and desks with ultra-sticky gel suction',
      '360° Omnidirectional Ball Joint — Effortlessly switch between portrait navigation and landscape viewing with smooth pivot',
      'All-Season Extreme Thermal Resistance — Stays firmly mounted in temperatures from -4°F to 194°F (-20°C to 90°C) with no suction loss',
      'Deep Case-Friendly Clamping Arms — Accommodates all smartphone cases including thick rugged armor, ring holders, and wallet covers',
      'One-Touch Quick Release & Secure Auto-Lock — Effortlessly insert and release your phone with one-handed ease',
      'Universal Compatibility — Fits all 4.0 to 7.2 smartphones including iPhone 16/15/14, Samsung Galaxy S24/S23, OnePlus, and Xiaomi',
      'Official Fitgear® 2-Year Warranty — Includes manufacturer warranty card for peace of mind driving',
    ],
    specs: {
      'Brand': 'Fitgear®',
      'Model': 'FG-15',
      'Mount Type': 'Dashboard, Windshield & Leather Console Suction Mount',
      'Rotation': '360° Ball Joint + Multi-Angle Telescopic Arm',
      'Temperature Tolerance': '-4°F to 194°F (-20°C to 90°C)',
      'Suction Mechanism': 'Reusable Sticky Gel Pad with Vacuum Pressure Lever',
      'Case Compatibility': 'Case-Friendly (Supports up to 18mm thickness)',
      'Device Compatibility': 'Universal (4.0 to 7.2 smartphones)',
      'Product Weight': 'Approx. 210g',
      'Warranty': '2-Year Official Fitgear® Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 3. MZ M412SP PORTABLE WIRELESS BLUETOOTH SPEAKER
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'mz-m412sp',
    name: 'MZ M412SP Portable Wireless Bluetooth Speaker with Dynamic RGB Ambient Light & Crystal Sound',
    shortName: 'MZ M412SP Wireless Bluetooth Speaker',
    genre: 'AUDIO_SPEAKERS',
    price: 499,
    originalPrice: 999,
    reviewCount: 42,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/mz-m412sp/mz-m412sp-1.jpg',
    gallery: [
      '/images/products/mz-m412sp/mz-m412sp-1.jpg',
      '/images/products/mz-m412sp/mz-m412sp-2.jpg',
      '/images/products/mz-m412sp/mz-m412sp-3.jpg',
    ],
    purity: 'Woven Acoustic Mesh & Silicone Lanyard',
    compliance: 'MZ™ Official Quality Certification',
    pack: 'MZ M412SP Wireless Speaker + USB Charging Cable + 3.5mm AUX Cable + Quick Start Guide',
    dimensions: '100mm (W) × 70mm (H) × 40mm (D) | Pocket-Sized Form Factor',
    weight: '195g Ultra-Lightweight Portability',
    material: 'Impact-Resistant Polymer Chassis & Protective Fabric Acoustic Grille',
    chipset: 'Bluetooth 5.3 • Dynamic RGB Light Ring • Deep Bass Acoustic Driver • AUX Input',
    description: 'The MZ M412SP Portable Wireless Speaker delivers punchy dynamic sound, crystal-clear acoustics, and rich resonant bass in an ultra-compact body smaller than a standard smartphone (100mm × 70mm × 40mm). Designed for music lovers on the move, it features a vibrant pulsating multi-color RGB ambient LED halo light ring around the center logo that lights up your vibe, a durable woven acoustic mesh front, responsive top-mounted tactile playback controls, a rugged integrated silicone carry loop, and versatile dual connectivity with both high-speed Bluetooth 5.3 and 3.5mm AUX input.',
    features: [
      'Crystal Clear Sound & Punchy Bass — Precision-engineered acoustic driver produces room-filling, distortion-free audio with deep resonant bass',
      'Vibrant RGB Ambient Halo Light — Multi-color pulsating LED light ring syncs to the music to light up your vibe and elevate any setting',
      'Ultra-Compact Smartphone-Sized Body — Measuring just 100mm × 70mm × 40mm, smaller than a phone for effortless palm, pocket, or backpack carrying',
      'High-Speed Bluetooth 5.3 & AUX Input — Seamless low-latency wireless connection up to 10m plus standard 3.5mm AUX port for universal device playback',
      'Extended Battery Playtime — High-efficiency rechargeable lithium-ion battery powers hours of continuous music on a single charge',
      'Integrated Silicone Carry Loop — Heavy-duty flexible strap allows you to hang the speaker from bike handlebars, bags, or tents',
      'Available in 5 Finishes — Vibrant Red, Bold Green, Royal Blue, Warm Beige, and Classic Matte Black color options',
    ],
    specs: {
      'Brand': 'MZ™ (We Believe In Quality)',
      'Model': 'M412SP',
      'Audio Output': 'Crystal Sound Dynamic Acoustic Driver with Passive Bass Radiator',
      'Lighting': 'Dynamic Multi-Color RGB Ambient LED Halo Ring',
      'Form Factor': 'Ultra-Compact Pocket Speaker (Smaller than Smartphone)',
      'Dimensions': '100mm × 70mm × 40mm',
      'Connectivity': 'Bluetooth 5.3 Wireless (10m Range) + 3.5mm AUX Input',
      'Controls': 'Top-Mounted Tactile Buttons (Power, Mode, Volume +, Volume -, Play/Pause)',
      'Portability': 'Integrated Silicone Lanyard / Carry Strap',
      'Color Finishes': 'Red, Green, Blue, Beige, Black',
      'Product Weight': 'Approx. 195g',
      'Warranty': '1-Year Official MZ™ Manufacturer Warranty',
    },
  },
]

function buildProductReviews(product) {
  const reviews = []
  const count = product.reviewCount || 15
  const badTarget = product.badCount || 0

  const seed = typeof product.id === 'number'
    ? Math.abs(product.id)
    : (String(product.id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) || 7)

  const critPool = REVIEWS_POOL.critical || []
  if (critPool.length > 0) {
    for (let i = 0; i < badTarget && i < critPool.length; i++) {
      const pick = critPool[(seed + i) % critPool.length]
      if (pick) {
        reviews.push({
          id: `bad-${product.id}-${i}`,
          name: pick.name,
          rating: pick.rating,
          date: `${(i + 2)} days ago`,
          text: pick.text,
          verified: true,
        })
      }
    }
  }

  const genreList = (REVIEWS_POOL.genreSpecific && REVIEWS_POOL.genreSpecific[product.genre]) || []
  if (genreList.length > 0 && reviews.length < count) {
    const genreReview = genreList[seed % genreList.length]
    if (genreReview) {
      reviews.push({
        id: `genre-${product.id}`,
        name: genreReview.name,
        rating: 5,
        date: 'Just now',
        text: genreReview.text,
        verified: true,
      })
    }
  }

  const posPool = REVIEWS_POOL.positive || []
  if (posPool.length > 0) {
    let posIndex = (seed * 3) % posPool.length
    while (reviews.length < count) {
      const item = posPool[posIndex % posPool.length]
      if (item) {
        reviews.push({
          id: `pos-${product.id}-${reviews.length}`,
          name: item.name,
          rating: (reviews.length % 4 === 0) ? 4 : 5,
          date: `${(reviews.length + 1) * 2} days ago`,
          text: item.text,
          verified: true,
        })
      }
      posIndex++
    }
  }

  return reviews
}

export const MOCK_PRODUCTS = RAW_PRODUCTS.map((p) => {
  const reviews = buildProductReviews(p)
  const slug = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const fullName = p.name
  const originalPrice = p.originalPrice || Math.round(p.price * 1.8)
  const discountPercent = Math.round(((originalPrice - p.price) / originalPrice) * 100)
  const discountBadge = `-${discountPercent}%`

  return {
    ...p,
    slug,
    fullName,
    originalPrice,
    discountPercent,
    discountBadge,
    image: p.image,
    gallery: p.gallery || [p.image],
    purity: p.purity || 'GRADE A+',
    compliance: p.compliance || 'Certified Quality Standard',
    pack: p.pack || 'Signature Presentation Box',
    dimensions: p.dimensions || 'Compact Precision Dimensions',
    material: p.material || 'Artisanal & Engineered Materials',
    finish: 'Precision Handcrafted Finish',
    keyring: 'Reinforced Hardware Assembly',
    durability: 'Premium Tested Reliability',
    reviews,
  }
})
