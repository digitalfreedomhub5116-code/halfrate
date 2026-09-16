// Realistic electronics customer & buyer feedback
// STRICT RULES: NO hyphens (-), NO commas (,), NO periods (.)
export const REVIEWS_POOL = {
  // Common positive electronics reviews
  positive: [
    { name: "Aarav Sharma", text: "build quality is insane sound separation and bass is pure studio grade" },
    { name: "Rohan Nair", text: "battery backup easily lasted 4 days on single charge super impressed" },
    { name: "Kunal Verma", text: "received in 2 days luxury presentation box was rock solid zero transit damage" },
    { name: "Aditya Patel", text: "bluetooth 5.4 connection is instant no lag whatsoever while gaming" },
    { name: "Siddharth Rao", text: "looks and feels like high end premium tech worth every single rupee" },
    { name: "Varun Malhotra", text: "active noise cancellation cut down all traffic and office chatter easily" },
    { name: "Pranav Iyer", text: "sound signature and instrument separation is pristine true audiophile delight" },
    { name: "Ankit Deshmukh", text: "fast charging speed is unbelievable 100 percent in under 35 mins" },
    { name: "Devendra Joshi", text: "genuine certified premium hardware official warranty activated without hassle" },
    { name: "Harshit Sen", text: "crystal clear mic quality during zoom meetings clients heard me clearly" },
    { name: "Nikhil Kulkarni", text: "finish and aluminum enclosure feels ultra premium top tier engineering" },
    { name: "Gautam Mehta", text: "best audio gear in this price segment hands down very satisfied" },
    { name: "Suraj Yadav", text: "compact yet packs huge power capacity works seamlessly with macbook" },
    { name: "Manish Reddy", text: "rgb lighting and mechanical switches are butter smooth for typing" },
    { name: "Vivek Choudhary", text: "proper industrial grade build loving the reliability and battery life" },
  ],

  // Specific positive reviews per category
  genreSpecific: {
    JEWELLERY: [
      { name: "Pooja Hegde", text: "kundan work and gold finish looks breathtaking received so many compliments" },
      { name: "Ananya Iyer", text: "hallmarked 925 sterling silver shines beautifully zero skin irritation" },
      { name: "Meera Sen", text: "packaging was royal gift box with certificate of authenticity included" },
    ],
    HANDICRAFTS: [
      { name: "Sunil Narang", text: "hand carved teakwood finish shows true master artisanal craftsmanship" },
      { name: "Radhika Kulkarni", text: "dhokra brass art pieces look stunning on my living room console" },
      { name: "Vikram Singhal", text: "blue pottery glaze is vibrant authentic handmade heritage treasure" },
    ],
    FRAMES: [
      { name: "Tanvi Deshpande", text: "gold leaf profile is majestic glass clarity is museum grade" },
      { name: "Rajat Kapoor", text: "solid walnut wood desk frame has heavy luxury feel flawless joinery" },
      { name: "Sneha Nair", text: "floating acrylic frame with neodymium magnets makes changing photos effortless" },
    ],
    KEYCHAINS: [
      { name: "Kartik Mehta", text: "full grain leather keychain is thick and smells divine developing great patina" },
      { name: "Arjun Verma", text: "titanium carabiner is featherlight solid CNC machining best EDC gear" },
      { name: "Diya Sharma", text: "botanical resin charm with real flowers is so delicate and pretty" },
    ],
    MOBILE_ACCESSORIES: [
      { name: "Naveen Reddy", text: "selfie stick 1.8m extension is incredible for wide angle group photos" },
      { name: "Prateek Jain", text: "aluminum pole is rock solid zero bend even when fully extended" },
      { name: "Suresh Pillai", text: "bluetooth remote pairs instantly with my iphone shutter button is super responsive" },
      { name: "Gaurav Joshi", text: "digital wattage display shows exact 45W charging speed, nylon braid is super thick" },
      { name: "Kavita Rao", text: "2 meter length reaches my bed easily, reinforced neck doesn't bend or break" },
      { name: "Siddharth Bose", text: "all-metal build with 360 clicking swivel is super satisfying, holds my iPad mini firmly with zero wobble" },
      { name: "Ananya Deshmukh", text: "folds completely flat, perfect for video calls and carrying in my laptop bag" },
    ],
    CAR_ACCESSORIES: [
      { name: "Vikram Malhotra", text: "sticky suction on dashboard is rock solid zero wobble on highway bumps" },
      { name: "Amitabh Sen", text: "360 rotation is butter smooth holds my phone with thick case easily" },
      { name: "Rohit Agarwal", text: "survived 40 degree heat in car without falling off best car mount hands down" },
      { name: "Manish Tiwari", text: "clamps behind rearview mirror perfectly zero blind spots on windshield, rock solid GPS mount" },
      { name: "Deepak Chawla", text: "360 swivel lets me adjust between portrait map and recording forward dashcam easily" },
      { name: "Sameer Kulkarni", text: "rode through heavy monsoon downpour on my Royal Enfield, phone was 100% dry inside, touch screen works through rain" },
      { name: "Karan Singhal", text: "dual ball arm locks tight on 28mm handlebar, zero vibration even at high speeds" },
    ],
    AUDIO_SPEAKERS: [
      { name: "Aditya Roy", text: "sound quality is surprisingly loud and punchy for this compact size deep bass" },
      { name: "Neha Sharma", text: "the RGB light ring looks so aesthetic in the dark party vibe everywhere" },
      { name: "Rahul Verma", text: "bluetooth connected in 2 seconds flat fits easily in my pocket solid battery life" },
      { name: "Pranav Joshi", text: "took this camping on rainy weekend IPX6 waterproofing is legit and sound is loud" },
      { name: "Harshil Patel", text: "fits directly into my bicycle bottle holder bass radiators give great thump" },
      { name: "Manish Solanki", text: "paired two of these in tws stereo mode volume doubled instantly crazy performance" },
      { name: "Deepak Rawat", text: "rugged fabric finish with loop makes it easy to clip on backpack during treks" },
    ],
    SPEAKERS: [
      { name: "Kabir Roy", text: "120w dolby atmos soundbar fills living room with theater quality spatial audio" },
      { name: "Tushar Bansal", text: "walnut wooden reference monitors deliver deep warm bass and pristine treble" },
      { name: "Aakash Pandey", text: "waterproof rugged speaker survived heavy outdoor rains battery lasts days" },
    ],
    STORAGE_DEVICES: [
      { name: "Rohit Agarwal", text: "original sandisk pendrive transfer speed is rock solid and genuine piece" },
      { name: "Vikram Malhotra", text: "compact design fits easily on my keychain sandisk secureaccess encryption is great" },
      { name: "Ananya Iyer", text: "works smoothly on both macbook and windows pc plug and play zero hassle" },
      { name: "Amitabh Sen", text: "backed up all my college study material and photos great value for money" },
      { name: "Kunal Verma", text: "fast delivery and genuine retail blister packing 5 year sandisk warranty" },
    ],
  },

  // Critical reviews
  critical: [
    { name: "Deepak Mehra", rating: 3, text: "delivery took 4 days courier delay otherwise product works great" },
    { name: "Saurabh Tiwari", rating: 3, text: "usbc cable provided in box is 1 meter wish it was 1.5 meter" },
    { name: "Mayank Mishra", rating: 3, text: "app took two attempts to pair initially but working smoothly now" },
    { name: "Chetan Bhagat", rating: 3, text: "outer packaging box had slight crease product inside was intact" },
  ],
}
