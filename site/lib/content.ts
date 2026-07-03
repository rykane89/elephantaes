// Single source of truth for editable content.
// Swap photo URLs, newsletter copy and contact details here — no component changes needed.

export const brand = {
  name: "Elephantaes",
  tagline: "Cakes & Delicacies",
  bakerName: "Alex",
  instagramHandle: "elephantaes.cakes",
  instagramUrl: "https://www.instagram.com/elephantaes.cakes/",
  inquiryEmail: "hello@elephantaes.com",
  phone: "(267) 414-7861",
  phoneTel: "+12674147861",
  city: "Philadelphia, PA",
  pickup: "Pickup · Sat 9–12 · Sun 2–5",
  location: "Philadelphia · custom orders · weekend pickup",
  shopUrl: "https://elephantaes.square.site",
};

// Time-limited announcement / collab. Set `active: false` to hide entirely.
export const collab = {
  active: true,
  partnerName: "Mr Rabbit",
  partnerHandle: "mrrabbitphilly",
  partnerUrl: "https://www.instagram.com/mrrabbitphilly/",
  partnerKind: "Philly coffee shop",
  title: "Tiramisu Collab",
  window: "This weekend only",
  blurb:
    "Three flavours, hand-built into Mr Rabbit's coffee bar. Walk in for a cup, walk out with a cup of layered honey-mascarpone something.",
  flavors: [
    { name: "Classic", note: "Espresso × Mr Rabbit espresso" },
    { name: "Strawberry", note: "Bright, summery, surprise pick" },
    { name: "Passion Fruit Honeycomb", note: "Spring release, one more weekend" },
  ],
  image: "/gallery/mr-rabbit-collab.jpg",
  orderHref: "https://www.instagram.com/elephantaes.cakes/",
  orderLabel: "DM to reserve",
};

export const navLinks = [
  { label: "Signatures", href: "#signatures" },
  { label: "Tiramisu", href: "#tiramisu" },
  { label: "Gallery", href: "#gallery" },
  { label: "The Baker", href: "#story" },
  { label: "Journal", href: "#journal" },
  { label: "Order", href: "#order" },
];

// Gallery photos — pulled from @elephantaes.cakes Instagram archive,
// stored in /public/gallery. Add / swap by editing this array.
export const galleryPhotos: { src: string; alt: string; ratio: "tall" | "square" | "wide" }[] = [
  { src: "/gallery/tiramisu-layers.jpg", alt: "Passion fruit honeycomb tiramisu cross-section showing layered mascarpone cream and ladyfingers", ratio: "tall" },
  { src: "/gallery/vintage-piping-candles.jpg", alt: "Vintage piped birthday cake with gold candles", ratio: "tall" },
  { src: "/gallery/tiramisu-duo-branded.jpg", alt: "Strawberry and Classic tiramisu side by side with Elephantaes branded packaging", ratio: "tall" },
  { src: "/gallery/naked-cake-peach-florals.jpg", alt: "Naked tier cake with peach garden florals on a wood slice", ratio: "tall" },
  { src: "/gallery/baby-shower-cookies.jpg", alt: "Hand-iced baby shower cookies", ratio: "wide" },
  { src: "/gallery/tiramisu-trio-honey.jpg", alt: "Three passion fruit honeycomb tiramisus in warm light", ratio: "wide" },
  { src: "/gallery/holiday-cookie-box-open.jpg", alt: "Open holiday cookie box with festive sugar cookies", ratio: "tall" },
  { src: "/gallery/blueberry-cheesecake.jpg", alt: "Blueberry top-down cheesecake with edible flowers", ratio: "tall" },
  { src: "/gallery/koala-tier-cake.jpg", alt: "Koala-themed two-tier birthday cake", ratio: "square" },
  { src: "/gallery/feather-pearl-cake-pops.jpg", alt: "Feather and pearl petite cake pops", ratio: "tall" },
  { src: "/gallery/pink-rose-gold-leaf-cake.jpg", alt: "Naked cake with gold leaf and pink garden roses", ratio: "tall" },
  { src: "/gallery/mouse-ballerina-cake.jpg", alt: "Buttercream meadow cake with sugar mouse ballerina", ratio: "tall" },
  { src: "/gallery/winter-forest-cake.jpg", alt: "Winter forest cake with gold ornaments and a deer", ratio: "tall" },
  { src: "/gallery/encanto-cake.jpg", alt: "Encanto-themed character birthday cake", ratio: "square" },
  { src: "/gallery/sugar-flowers-macro.jpg", alt: "Macro of hand-piped sugar flowers", ratio: "square" },
];

export const signatures = [
  {
    title: "Custom Celebration Cakes",
    description:
      "Birthdays, Korean Dohl 1st birthdays, anniversaries — designed around the story, not a stock catalogue. Vintage piping, modern minimal, themed builds (yes, even Avatar).",
    detail: "From $85 · 2 weeks notice",
  },
  {
    title: "Signature Tiramisu",
    description:
      "Classic Italian, Strawberry, and rotating seasonal flavours like Passion Fruit Honeycomb. Soaked ladyfingers, honey mascarpone, layers all the way down.",
    detail: "From $8 · weekend pickup",
  },
  {
    title: "Weddings & Bridal",
    description:
      "Now booking. Vegan buttercream, multi-flavour tiers, sugar work — designed with you over a tasting and a long talk about the day.",
    detail: "Bespoke quote · book early",
  },
  {
    title: "Cookie Boxes & Minis",
    description:
      "Holiday cookie boxes with menu cards, 4\" mini celebration cakes for Valentine's and showers, gourmet pastries for gifting.",
    detail: "Seasonal · DM to preorder",
  },
];

export const tiramisuMenu = [
  {
    name: "Classic Italian",
    description:
      "The original. Espresso-soaked ladyfingers, mascarpone cream, dusted dark cocoa.",
    image: "/gallery/tiramisu-classic.jpg",
    imageAlt: "Classic Italian tiramisu with cocoa-dusted Elephantaes branded top",
    sizes: [
      { label: "10 oz", price: "$8" },
      { label: "20 oz", price: "$14" },
    ],
    accent: false,
  },
  {
    name: "Strawberry",
    description:
      "Strawberry purée swap for the espresso. Light, bright, surprisingly summery.",
    image: "/gallery/tiramisu-strawberry.jpg",
    imageAlt: "Strawberry tiramisu with strawberry slice and Elephantaes branded top",
    sizes: [
      { label: "10 oz", price: "$9" },
      { label: "20 oz", price: "$16" },
    ],
    accent: false,
  },
  {
    name: "Passion Fruit Honeycomb",
    description:
      "Spring release. Passion-fruit-soaked ladyfingers, honey mascarpone, raw honeycomb on top.",
    image: "/gallery/tiramisu-passionfruit.jpg",
    imageAlt: "Passion fruit honeycomb tiramisu with golden honeycomb texture",
    sizes: [
      { label: "10 oz", price: "$12" },
      { label: "20 oz", price: "$18" },
    ],
    accent: true,
  },
];

export const latestNewsletter = {
  issue: "Issue 14",
  date: "April 2026",
  title: "On tiramisu, restraint, and the perfect mascarpone cream",
  excerpt:
    "The OGs are back this weekend — Classic Italian and Strawberry on the menu, plus the spring Passion Fruit Honeycomb. Notes from the test kitchen on how I finally got the cream to set without going grainy, and why I stopped over-soaking the ladyfingers.",
  readingTime: "6 min read",
  link: "#journal",
};

export const journalArchive = [
  { title: "Designing the Korean Dohl: a first birthday, a thousand small choices", date: "Mar 2026" },
  { title: "Vegan buttercream, finally — the bridal version", date: "Feb 2026" },
  { title: "Vintage piping, and the cake I keep redoing on my birthday", date: "Jan 2026" },
];

export const testimonials = [
  {
    quote:
      "Honored doesn't cover it. She walked me through every detail of our daughter's Dohl — colour, symbolism, flavour — and made something my whole family is still talking about.",
    attribution: "Ji-won, Dohl 1st birthday · Philly",
  },
  {
    quote:
      "She nailed a vegan buttercream tier for our wedding when three other bakers said it couldn't be done. The cake tasted better than anything I expected.",
    attribution: "Maya & Theo, wedding 2025",
  },
];

export const pickupHours = [
  { day: "Saturday", hours: "9 AM — 12 PM" },
  { day: "Sunday", hours: "2 PM — 5 PM" },
];
