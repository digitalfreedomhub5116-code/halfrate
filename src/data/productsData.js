import { REVIEWS_POOL } from './reviewsData.js'

export const AUTHENTICITY_CERTIFICATE_IMAGE = '/images/certification/halfrate-quality-authenticity-certificate.jpg'

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
    label: 'Car & Bike Mounts',
    slug: 'car-accessories',
    image: '/images/products/fitgear-fg-15/fitgear-fg-15-1.jpg',
    description: 'Heavy-duty 360° dashboard mounts, IPX6 waterproof bike & motorcycle holders, and rearview mirror brackets.',
  },
  {
    id: 'AUDIO_SPEAKERS',
    label: 'Bluetooth Speakers',
    slug: 'bluetooth-speakers',
    image: '/images/products/mz-m412sp/mz-m412sp-1.jpg',
    description: 'Portable wireless Bluetooth speakers, crystal-clear dynamic audio, RGB ambient halo lights, and punchy bass.',
  },
  {
    id: 'STORAGE_DEVICES',
    label: 'Pen Drives & Storage',
    slug: 'pen-drives',
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-main-hero.jpg',
    description: 'Original SanDisk USB 2.0 pen drives from 8GB to 256GB at wholesale Sabse Sasta rates.',
  },
]

const RAW_PRODUCTS = [
  // ══════════════════════════════════════════════════════════════════
  // 1. FITGEAR FG-M4 ULTRA-LONG 1.8M SELFIE STICK & TRIPOD
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'fitgear-fg-m4',
    name: 'Fitgear Horizon 1.8M Bluetooth Selfie Tripod',
    shortName: 'Fitgear Horizon 1.8M Tripod',
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
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Aviation-Grade Aluminum Build',
    compliance: 'Fitgear® Official Certification',
    pack: 'Fitgear Horizon Tripod + Bluetooth Remote + User Guide',
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
    name: 'Fitgear ProDrive 360° In-Car Phone Mount',
    shortName: 'Fitgear ProDrive Mount',
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
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Heavy-Duty ABS & Sticky Gel Suction',
    compliance: 'Fitgear® Official 2-Year Warranty',
    pack: 'Fitgear ProDrive Mount + Suction Base + User Manual',
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
    name: 'MZ Pulse RGB Wireless Portable Speaker',
    shortName: 'MZ Pulse RGB Speaker',
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
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Woven Acoustic Mesh & Silicone Lanyard',
    compliance: 'MZ™ Official Quality Certification',
    pack: 'MZ Pulse RGB Speaker + USB Charging Cable + 3.5mm AUX Cable + Quick Start Guide',
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

  // ══════════════════════════════════════════════════════════════════
  // 4. FITGEAR FG-C3 SMART DIGITAL LED 45W PD FAST CHARGING CABLE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'fitgear-fg-c3',
    name: 'Fitgear CyberWatt 45W Digital Display Cable (2M)',
    shortName: 'Fitgear CyberWatt Cable',
    genre: 'MOBILE_ACCESSORIES',
    price: 299,
    originalPrice: 799,
    reviewCount: 54,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/fitgear-fg-c3/fitgear-fg-c3-1.jpg',
    gallery: [
      '/images/products/fitgear-fg-c3/fitgear-fg-c3-1.jpg',
      '/images/products/fitgear-fg-c3/fitgear-fg-c3-2.jpg',
      '/images/products/fitgear-fg-c3/fitgear-fg-c3-3.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'High-Density Braided Nylon & Zinc Alloy Shell',
    compliance: 'Fitgear® Official Certification & 2-Year Warranty',
    pack: 'Fitgear CyberWatt Cable (2M) + Branded Cable Tie Wrap + Retail Box',
    dimensions: 'Length: 2 Meters (6.6 ft) | Reinforced SR Strain-Relief Joint',
    weight: '65g Heavy-Duty Build',
    material: 'Anti-Tangle Double-Braided Nylon & Aerospace Zinc Alloy Housing',
    chipset: 'Smart Power E-Marker Chip • Real-Time Digital Wattage Display • Auto Current Adjust',
    description: 'The Fitgear FG-C3 Smart Fast Charging PD Cable features a transparent cyber-chassis connector with an integrated real-time digital LED power display that monitors charging wattage up to 45W PD live. Engineered with an intelligent microchip that automatically regulates current to safeguard device batteries from overcharging, excessive heat, and power surges. Encased in high-density anti-fray braided nylon with heavy-duty reinforced SR strain-relief joints rated for 10,000+ bends, its extended 2-meter (6.6 ft) reach offers ultimate flexibility for bedside, desk, and in-car charging.',
    features: [
      'Real-Time Digital LED Power Display — Visualizes live charging wattage up to 45W PD so you can verify maximum fast charging speed at a glance',
      'Intelligent Battery Protection Chip — Automatically regulates voltage and current dynamically to protect device battery health and prevent overheating',
      'Reinforced SR Strain-Relief Joint — Heavy-duty engineered neck built to withstand over 10,000+ severe bends without fraying or split seams',
      'Extended 2-Meter (6.6 ft) Length — Long-range reach allows comfortable device use from wall sockets to desks, couches, and bedside stands',
      'High-Density Double-Braided Nylon — Ultra-tough exterior resists tangles, pets, and friction for extended daily durability',
      'High-Speed 480 Mbps Data Transfer — Sync files, high-res photos, and music seamlessly while charging',
      'Universal Type-C Compatibility — Fast-charges iPhone 16/15 series, iPad, Samsung Galaxy, OnePlus, Pixel, and other USB-C powered devices',
    ],
    specs: {
      'Brand': 'Fitgear®',
      'Model': 'FG-C3',
      'Charging Standard': 'Power Delivery (PD) Fast Charging up to 45W',
      'Display': 'Real-Time Digital LED Wattage Readout',
      'Cable Length': '2 Meters (6.6 ft)',
      'Connector Type': 'USB Type-C to Type-C',
      'Joint Durability': 'Reinforced SR Strain-Relief (10,000+ Bends Tested)',
      'Exterior': 'High-Density Heavy-Duty Braided Nylon',
      'Housing Material': 'Zinc Alloy with Transparent Chipset Window',
      'Data Transfer Rate': 'Up to 480 Mbps (USB 2.0 Standard)',
      'Device Compatibility': 'Smartphones, Tablets, Power Banks, Laptops (USB-C)',
      'Warranty': '2-Year Official Fitgear® Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 5. SAFE-VIEW ELITE 360° CAR REARVIEW MIRROR PHONE BRACKET
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'safe-view-mirror-bracket',
    name: 'Safe-View ClearDrive 360° Rearview Mirror Mount',
    shortName: 'Safe-View ClearDrive Mount',
    genre: 'CAR_ACCESSORIES',
    price: 349,
    originalPrice: 999,
    reviewCount: 38,
    rating: 4.8,
    badCount: 0,
    image: '/images/products/safe-view-mirror-bracket/safe-view-mirror-bracket-1.jpg',
    gallery: [
      '/images/products/safe-view-mirror-bracket/safe-view-mirror-bracket-1.jpg',
      '/images/products/safe-view-mirror-bracket/safe-view-mirror-bracket-2.jpg',
      '/images/products/safe-view-mirror-bracket/safe-view-mirror-bracket-3.jpg',
      '/images/products/safe-view-mirror-bracket/safe-view-mirror-bracket-4.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'High-Tension Locking Knobs & Silicone Cushions',
    compliance: 'Safe-View™ Official Quality Guarantee',
    pack: 'Safe-View ClearDrive Mirror Mount + Tightening Hardware + Retail Box',
    dimensions: 'Rearview Clamp: 5.5cm - 8.5cm | Phone Clamp: 6cm - 10cm',
    weight: '175g Ultra-Stable No-Shake Design',
    material: 'High-Strength Thermal-Resistant ABS & Precision Metal Pivot Springs',
    chipset: '360° Ball Joint • 0.05mm Tolerance • Unobstructed Windshield View • Quick Lock',
    description: 'The Safe-View Elite 360° Car Rearview Mirror Phone Bracket clamps securely onto your vehicle\'s existing rearview mirror stem, positioning your smartphone at eye level for safer navigation without blocking the windshield or dashboard vents. Built with precision 0.05mm tolerance pivot joints and heavy-duty spring-loaded dual arms with anti-slip silicone cushions, it prevents shaking, vibration, and wobble even on bumpy off-road trails. Features 360° horizontal swivel and vertical multi-angle tilt so you can easily switch between GPS navigation, dash cam recording, hands-free video calls, and passenger entertainment.',
    features: [
      'Zero Blind Spot Eye-Level Navigation — Mounts directly behind the rearview mirror, keeping your eyes on the road with zero windshield or vent obstruction',
      '360° Omnidirectional Field Swivel — Infinite angle pivot allows seamless rotation between landscape GPS maps and portrait call modes',
      'Precision Tolerance & Anti-Shake Stability — Engineered with 0.05mm tolerance joints and reinforced lock screws for vibration-free driving on rough roads',
      'Dual Spring-Loaded Silicone Clamps — Four-claw grip securely anchors onto standard rearview mirrors with anti-scratch rubber pads',
      'Quick One-Handed Phone Insertion — Elastic clamp fits smartphones from 4.0 to 7.0 inches, even with thick protective shockproof cases',
      'Multi-Purpose Dashboard Utility — Ideal for GPS turn-by-turn navigation, forward road trip dash cam recording, and passenger entertainment',
      'Tool-Free Rapid Installation — Easily attaches and tightens onto almost any car, SUV, or truck rearview mirror in seconds',
    ],
    specs: {
      'Brand': 'Safe-View™ (Elite Driver Series)',
      'Model': 'RB-360',
      'Mount Placement': 'Interior Car Rearview Mirror Stem',
      'Swivel & Rotation': '360° Total Field Swivel & Multi-Axis Tilt',
      'Joint Precision': '0.05mm Engineering Tolerance with Tension Screw',
      'Mirror Clamp Width': 'Fits Mirrors from 5.5 cm to 8.5 cm Height',
      'Phone Clamp Range': 'Fits 4.0 to 7.0 inch Smartphones (Width 6cm to 10cm)',
      'Case Compatibility': 'Supports Thick Armor Cases & Ring Stands',
      'Material': 'High-Density Reinforced ABS & Metal Spring Screws',
      'Product Weight': 'Approx. 175g',
      'Ideal For': 'Turn-by-turn GPS, Dash Cam Recording, Hands-Free Calling',
      'Warranty': '1-Year Official Safe-View™ Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 6. FLY AJ-581 360° ROTATING METAL DESKTOP PHONE & TABLET STAND
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'fly-aj581-phone-stand',
    name: 'FLY Orbit 360° Metal Desktop Stand',
    shortName: 'FLY Orbit 360° Stand',
    genre: 'MOBILE_ACCESSORIES',
    price: 299,
    originalPrice: 899,
    reviewCount: 46,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/fly-aj581-stand/fly-aj581-stand-1.jpg',
    gallery: [
      '/images/products/fly-aj581-stand/fly-aj581-stand-1.jpg',
      '/images/products/fly-aj581-stand/fly-aj581-stand-2.jpg',
      '/images/products/fly-aj581-stand/fly-aj581-stand-3.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Aerospace Aluminum Alloy & Anti-Slip Silicone Pads',
    compliance: 'FLY™ Official Premium Quality Certification',
    pack: 'FLY Orbit Metal Stand + Anti-Scratch Cushions + Official Retail Box',
    dimensions: 'Folded: 12cm × 8cm × 3cm | Height Adjustable up to 16cm',
    weight: '210g Weighted Base (Zero Tip-Over)',
    material: 'Solid Aviation-Grade Aluminum Alloy & Precision Steel Damping Hinges',
    chipset: '360° Rotating Turntable Base • Double-Pivot Articulation • Flat Folding • Anti-Slip',
    description: 'The FLY AJ-581 360° Rotating Desktop Phone & Tablet Stand is precision-engineered from solid aviation-grade aluminum alloy to deliver uncompromising stability to your workspace. Featuring an ultra-smooth 360° clicking rotating base, dual-axis pivot articulation, and adjustable height/angle mechanisms, it positions your smartphone or iPad Mini at the ergonomically perfect eye-level for Zoom calls, FaceTime, video watching, and desktop multi-tasking. Folds completely flat in seconds for effortless portability in your laptop bag, backpack, or pocket.',
    features: [
      '360° Click-Rotating Swivel Base — Smooth, satisfying mechanical rotation allows effortless screen sharing across conference desks or workstations',
      'Double-Pivot Articulation — Dual reinforced steel hinges allow infinite tilt angle and height customization for the ideal ergonomic posture',
      'Heavy-Duty Weighted Base — Solid aviation-grade aluminum construction prevents tipping over even when tapping large phones or tablets',
      'Foldable & Ultra-Portable — Collapses completely flat into a sleek compact profile, making it the ultimate travel and office EDC companion',
      'Protective Silicone Padding — Thick anti-scratch silicone cushions line the cradle hooks, backplate, and base to safeguard desks and device finishes',
      'Charging Cable Friendly — Thoughtful bottom cutout allows continuous fast charging while using the stand in both portrait and landscape',
      'Universal Compatibility — Perfectly fits iPhone 16/15/14 series, Samsung Galaxy, OnePlus, iPad Mini, Nintendo Switch, and all 4.0 to 11 inch devices',
    ],
    specs: {
      'Brand': 'FLY™ (Premium Quality)',
      'Model': 'AJ-581',
      'Stand Type': '360° Rotating Desktop Phone & Tablet Stand',
      'Material': 'Aviation-Grade Aluminum Alloy + Precision Steel Dampers',
      'Rotation': '360° Continuous Turntable Swivel with Mechanical Ratchet',
      'Articulation': 'Dual-Pivot Height & Tilt Adjustability',
      'Foldability': 'Full 180° Flat Fold for Travel & Commute',
      'Device Size Compatibility': 'Universal (4.0" to 11.0" Smartphones & Tablets)',
      'Protection': 'Full Silicone Grip Pads on Hooks, Back & Base',
      'Product Weight': 'Approx. 210g (Weighted Anti-Tip Base)',
      'Ideal For': 'Desk Work, Video Calls, Cooking Recipes, Hands-Free Entertainment',
      'Warranty': '1-Year Official FLY™ Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 7. PRO-SHIELD M3-C1 IPX6 WATERPROOF BIKE & MOTORCYCLE MOUNT
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'pro-shield-m3c1-mount',
    name: 'Pro-Shield AquaArmor IPX6 All-Weather Bike Mount',
    shortName: 'Pro-Shield AquaArmor Mount',
    genre: 'CAR_ACCESSORIES',
    price: 399,
    originalPrice: 999,
    reviewCount: 41,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/pro-shield-m3c1-mount/pro-shield-m3c1-1.jpg',
    gallery: [
      '/images/products/pro-shield-m3c1-mount/pro-shield-m3c1-1.jpg',
      '/images/products/pro-shield-m3c1-mount/pro-shield-m3c1-2.jpg',
      '/images/products/pro-shield-m3c1-mount/pro-shield-m3c1-3.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'IPX6 Waterproof Seal & Dual-Ball Joint',
    compliance: 'Pro-Shield™ Official All-Weather Guarantee',
    pack: 'Pro-Shield AquaArmor Case + Telescopic Dual-Ball Arm + Handlebar Clamp + 3 Spacers + Hex Tool',
    dimensions: 'Case: 210 × 110 × 30 mm | Arm: 180mm - 260mm Adjustable Length',
    weight: '290g Heavy-Duty Shockproof Chassis',
    material: 'Impact-Resistant ABS Body, High-Sensitivity TPU Film & Stainless Steel Hardware',
    chipset: 'IPX6 Waterproof Seal • 360° Dual-Ball Swivel • Sensitive Touchscreen • Fits 22-32mm Bars',
    description: 'The Pro-Shield M3-C1 Universal Journey Mount is an all-weather IPX6 waterproof phone holder engineered for motorcycles, bicycles, scooters, and ATVs. Featuring a fully sealed heavy-duty waterproof case with an airtight silicone gasket, it keeps your phone 100% dry and dust-free during heavy monsoon rains and muddy off-road trails. An ultra-responsive high-sensitivity clear TPU touchscreen window allows effortless map navigation, call answering, and face unlock without opening the case. Equipped with a telescoping dual-ball joint arm (adjustable 180-260mm) and 360° omnidirectional rotation to dial in the ideal viewing angle on any 22-32mm handlebar.',
    features: [
      'IPX6 All-Weather Waterproofing — Airtight silicone perimeter gasket shields your device from downpours, mud splatters, and road debris',
      'Sensitive TPU Touchscreen Window — Crystal-clear responsive touch membrane allows smooth GPS map zooming, call answering, and screen interaction',
      'Sturdy Dual-Ball Joint Arm — 360° omnidirectional swivel enables seamless horizontal and vertical screen positioning with zero vibrations',
      'Telescopic Height Adjustability — Retractable dual-hinge arm extends from 180mm to 260mm to position the phone above handlebars or meters',
      'Internal Depth of 17.5mm — Generous interior accommodates all smartphones from 4.7 to 7.0 inches, even with thick rugged protective cases',
      'Universal 22mm to 32mm Clamp — Includes 3 custom rubber spacer pads to mount firmly onto bikes, Royal Enfields, sports bikes, and electric scooters',
      'Shock-Absorbing Internal Cushioning — Spring-loaded backplate holds the phone firmly against the front window, eliminating rattles on rough terrain',
    ],
    specs: {
      'Brand': 'Pro-Shield™ (Universal Journey Series)',
      'Model': 'M3-C1 Rain Stand',
      'Waterproof Standard': 'IPX6 Certified All-Weather Waterproof & Dustproof',
      'Case External Dimensions': '210mm × 110mm × 30mm',
      'Case Internal Depth': '17.5mm (Supports Rugged Phone Cases)',
      'Arm Extension': 'Telescopic Adjustable 180mm to 260mm',
      'Swivel & Rotation': '360° Dual Ball Joint + Locking Screws',
      'Handlebar Diameter': 'Fits 22mm - 32mm (Includes 3 Spacer Adapters)',
      'Screen Film': 'High-Sensitivity Optical Clear TPU',
      'Device Compatibility': 'Universal (Fits all 4.7" to 7.0" Smartphones)',
      'Product Weight': 'Approx. 290g',
      'Warranty': '1-Year Official Pro-Shield™ Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 8. MZ TG113 RUGGED OUTDOOR PORTABLE BLUETOOTH SPEAKER
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'mz-tg113-speaker',
    name: 'MZ StormRock IPX6 Rugged Outdoor Speaker',
    shortName: 'MZ StormRock Speaker',
    genre: 'AUDIO_SPEAKERS',
    price: 499,
    originalPrice: 1299,
    reviewCount: 47,
    rating: 4.8,
    badCount: 0,
    image: '/images/products/mz-tg113-speaker/mz-tg113-speaker-1.jpg',
    gallery: [
      '/images/products/mz-tg113-speaker/mz-tg113-speaker-1.jpg',
      '/images/products/mz-tg113-speaker/mz-tg113-speaker-2.jpg',
      '/images/products/mz-tg113-speaker/mz-tg113-speaker-3.jpg',
      '/images/products/mz-tg113-speaker/mz-tg113-speaker-4.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'IPX6 Waterproof Fabric Mesh & Carabiner Loop',
    compliance: 'MZ™ Official Quality Certified',
    pack: 'MZ StormRock Speaker + Micro-USB Charging Cable + 3.5mm AUX Cable + Quick Guide',
    dimensions: 'Height: 180mm (7.1 in) × Diameter: 75mm (2.9 in) | 500ml Bottle Form Factor',
    weight: '512g Heavy-Bass Cylinder Chassis',
    material: 'Rugged Camouflage Woven Acoustic Fabric & Rubberized Shockproof Base',
    chipset: 'Bluetooth 5.0 • TWS Stereo Pairing • Dual Passive Radiators • IPX6 Waterproof',
    description: 'The MZ TG113 Rugged Outdoor Bluetooth Speaker is engineered for room-filling substantial audio in an all-terrain, splash-proof cylinder design. Sized like a standard 500ml water bottle (180mm × 75mm) and finished in a durable camouflage acoustic fabric mesh, it slips easily into backpack bottle pockets or clips onto gear with its integrated carry loop. Features IPX6 all-weather waterproofing, dual passive bass radiators for deep punchy lows, TWS stereo pairing to link two speakers wirelessly for left/right spatial separation, and up to 12 hours of uninterrupted battery playtime.',
    features: [
      'Substantial Audio Power & Deep Bass — Precision-engineered dual acoustic drivers with passive bass radiators pump out loud, room-filling sound',
      'IPX6 All-Weather Waterproofing — Heavy-duty woven fabric mesh and sealed silicone ports protect against heavy rain, poolside splashes, and dust',
      'TWS True Wireless Stereo Pairing — Wirelessly connect two TG113 speakers for doubled volume and true left/right channel stereo separation',
      '500ml Bottle Form Factor — Measuring 180mm × 75mm, it fits perfectly into bike water bottle cages, backpack side sleeves, and cup holders',
      'Extended 12-Hour Battery Playtime — High-capacity rechargeable lithium-ion battery fuels all-day hiking treks, camping, and outdoor workouts',
      'Rugged Camouflage Finish — Shock-absorbing rubberized top/bottom end caps and anti-tear exterior fabric withstand outdoor wear and drops',
      'Universal Multi-Mode Playback — Bluetooth 5.0, 3.5mm AUX input, TF MicroSD card slot, and USB flash drive support for versatile offline audio',
    ],
    specs: {
      'Brand': 'MZ™ (We Believe In Quality)',
      'Model': 'TG113',
      'Speaker Type': 'Rugged Outdoor Cylinder Wireless Speaker',
      'Dimensions': '180mm Height × 75mm Diameter (Bottle Sized)',
      'Waterproof Rating': 'IPX6 Water-Resistant & Dustproof',
      'Wireless Connectivity': 'Bluetooth 5.0 (10m transmission range)',
      'Special Features': 'TWS Dual Speaker Pairing • Hands-Free Calling',
      'Inputs': 'Bluetooth, 3.5mm AUX, Micro-USB, TF Card, USB',
      'Battery Life': 'Up to 12 Hours (Varies by volume & content)',
      'Product Weight': 'Approx. 512g',
      'Warranty': '1-Year Official MZ™ Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 9. SANDISK CRUZER BLADE 8GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-8gb',
    name: 'SanDisk 8GB Pen Drive',
    shortName: 'SanDisk 8GB',
    genre: 'STORAGE_DEVICES',
    price: 199,
    originalPrice: 499,
    reviewCount: 58,
    rating: 4.8,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-8gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-8gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-8gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-8gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 8GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '8GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 8GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up essential documents, high-res photos, music libraries, and work files. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '8GB High-Reliability Storage — High-speed flash NAND storage ideal for photos, full HD videos, music, assignments, and office documents.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-008G)',
      'Storage Capacity': '8GB (8 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 10. SANDISK CRUZER BLADE 16GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-16gb',
    name: 'SanDisk 16GB Pen Drive',
    shortName: 'SanDisk 16GB',
    genre: 'STORAGE_DEVICES',
    price: 249,
    originalPrice: 599,
    reviewCount: 74,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-16gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-16gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-16gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-16gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 16GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '16GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 16GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up essential documents, high-res photos, music libraries, and work files. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '16GB High-Reliability Storage — High-speed flash NAND storage ideal for photos, full HD videos, music, assignments, and office documents.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-016G)',
      'Storage Capacity': '16GB (16 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 11. SANDISK CRUZER BLADE 32GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-32gb',
    name: 'SanDisk 32GB Pen Drive',
    shortName: 'SanDisk 32GB',
    genre: 'STORAGE_DEVICES',
    price: 299,
    originalPrice: 799,
    reviewCount: 96,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-32gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-32gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-32gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-32gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 32GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '32GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 32GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up essential documents, high-res photos, 4K videos, music libraries, and work files. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '32GB High-Reliability Storage — High-speed flash NAND storage ideal for photos, full HD/4K videos, music, assignments, and office documents.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-032G)',
      'Storage Capacity': '32GB (32 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 12. SANDISK CRUZER BLADE 64GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-64gb',
    name: 'SanDisk 64GB Pen Drive',
    shortName: 'SanDisk 64GB',
    genre: 'STORAGE_DEVICES',
    price: 399,
    originalPrice: 1099,
    reviewCount: 82,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-64gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-64gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-64gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-64gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 64GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '64GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 64GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up essential documents, high-res photos, 4K videos, music libraries, and work files. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '64GB High-Reliability Storage — High-speed flash NAND storage ideal for photos, full HD/4K videos, music, assignments, and office documents.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-064G)',
      'Storage Capacity': '64GB (64 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 13. SANDISK CRUZER BLADE 128GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-128gb',
    name: 'SanDisk 128GB Pen Drive',
    shortName: 'SanDisk 128GB',
    genre: 'STORAGE_DEVICES',
    price: 649,
    originalPrice: 1699,
    reviewCount: 65,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-128gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-128gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-128gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-128gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 128GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '128GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 128GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up essential documents, high-res photos, 4K videos, music libraries, and work files. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '128GB High-Reliability Storage — High-speed flash NAND storage ideal for photos, full HD/4K videos, music, assignments, and office documents.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-128G)',
      'Storage Capacity': '128GB (128 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 14. SANDISK CRUZER BLADE 256GB PEN DRIVE
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'sandisk-cruzer-blade-256gb',
    name: 'SanDisk 256GB Pen Drive',
    shortName: 'SanDisk 256GB',
    genre: 'STORAGE_DEVICES',
    price: 1199,
    originalPrice: 2999,
    reviewCount: 43,
    rating: 4.9,
    badCount: 0,
    image: '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-256gb-hero.jpg',
    gallery: [
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-256gb-hero.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-256gb-features.jpg',
      '/images/products/sandisk-cruzer-blade/sandisk-cruzer-blade-256gb-pack.jpg',
      AUTHENTICITY_CERTIFICATE_IMAGE,
    ],
    purity: 'Genuine SanDisk 5-Year Warranty',
    compliance: 'Official SanDisk® Quality Certified',
    pack: 'SanDisk 256GB Flash Drive + Retail Blister Pack',
    dimensions: '41.5mm × 17.6mm × 7.4mm | Pocket Sized',
    weight: '2.5g Ultra-Lightweight',
    material: 'Contoured High-Impact Thermal Polymer Chassis',
    chipset: '256GB Capacity • USB 2.0 High Speed • 128-bit AES Encryption',
    description: 'The SanDisk 256GB USB Flash Drive combines an ultra-compact contoured profile with reliable data storage in its iconic red and black design. Perfect for backing up massive file collections, 4K videos, heavy raw photos, and system backups. Features high-speed USB 2.0 plug-and-play simplicity across Windows, Mac, smart TVs, and car stereos, backed by SanDisk SecureAccess™ password protection with 128-bit AES encryption to keep private files safe.',
    features: [
      'Iconic Red & Black Pocket Profile — Compact, featherweight 2.5g contoured body easily slips into pockets, bags, or keychains via integrated lanyard loop.',
      '256GB Massive High-Reliability Storage — High-speed flash NAND storage ideal for entire media libraries, full HD/4K videos, and bulk file archives.',
      'Universal Plug & Play USB 2.0 — Works instantly with zero drivers across Windows, macOS, Linux, Android OTG, car audio systems, and smart TVs.',
      'SanDisk SecureAccess™ Included — Protect sensitive personal files with a password-protected 128-bit AES encrypted folder vault.',
      'Official 5-Year SanDisk Warranty — Built with genuine Western Digital flash NAND memory for rock-solid long-term data retention.',
    ],
    specs: {
      'Brand': 'SanDisk® (Western Digital)',
      'Model': 'Cruzer Blade (SDCZ50-256G)',
      'Storage Capacity': '256GB (256 GB)',
      'Color': 'Classic Red & Black',
      'Interface': 'USB 2.0 (High Speed)',
      'Form Factor': 'Ultra-Compact Contoured Pocket Flash Drive',
      'Product Weight': 'Approx. 2.5g',
      'Dimensions': '41.5mm × 17.6mm × 7.4mm',
      'Security Encryption': 'SanDisk SecureAccess™ 128-bit AES',
      'Operating Temperature': '0°C to 45°C',
      'Warranty': '5-Year Official SanDisk Manufacturer Warranty',
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
    gallery: (() => {
      const base = Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [p.image]
      const withoutCert = base.filter((u) => u && u !== AUTHENTICITY_CERTIFICATE_IMAGE)
      return [...withoutCert, AUTHENTICITY_CERTIFICATE_IMAGE]
    })(),
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
