import type { ContentStore } from "@/lib/api/types";
import type {
  BlogPost,
  Feature,
  HeroContent,
  InvestmentOpportunity,
  Product,
  ProductCategory,
  PromoBanner,
  SiteSettings,
  SiteStats,
  Testimonial,
} from "@/lib/api/types";

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const settings: SiteSettings = {
  siteName: { ar: "بيتك", en: "BITAK" },
  logoText: "BITAK",
  phone: "01000324050",
  email: "info@bitak.com",
  address: {
    ar: "القاهرة، مصر",
    en: "Cairo, Egypt",
  },
  whatsappUrl: "https://wa.me/201000000000",
  socialLinks: {
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    snapchat: "#",
    facebook: "#",
  },
  footerDescription: {
    ar: "منصة استثمار عقاري تتيح لك امتلاك حصة في أفضل الوحدات العقارية بأمان وشفافية.",
    en: "A real estate investment platform that lets you own a share in premium properties safely and transparently.",
  },
};

const stats: SiteStats = {
  unitsSold: 600,
  clients: 400,
  totalInvestments: 100_000_000,
  annualReturn: 14,
};

const hero: HeroContent = {
  badge: { ar: "استثمر بذكاء", en: "Invest Smart" },
  title: {
    ar: "استثمر في أفضل الوحدات العقارية مع بيتك",
    en: "Invest in the best real estate units with Bitak",
  },
  subtitle: {
    ar: "امتلك حصة في عقارات مميزة بعائد سنوي مجزٍ وفرص استثمارية متنوعة.",
    en: "Own a share in premium properties with attractive annual returns and diverse investment opportunities.",
  },
  backgroundImage: unsplash("photo-1613490493576-7fde963acd2a", 1920),
};

const betakPage = {
  title: { ar: "الفيوم الجديدة", en: "New Fayoum" },
  backgroundImage: unsplash("photo-1582268611958-ebfd161ef9cf", 1920),
};

const categories: ProductCategory[] = [
  { id: "1", slug: "apartments", name: { ar: "شقة", en: "Apartment" } },
  { id: "2", slug: "lands", name: { ar: "اراضي", en: "Lands" } },
  { id: "3", slug: "mall", name: { ar: "مول", en: "Mall" } },
  { id: "4", slug: "shops", name: { ar: "محلات", en: "Shops" } },
];

const product = (
  id: string,
  slug: string,
  title: { ar: string; en: string },
  location: { ar: string; en: string },
  price: number,
  categorySlug: string,
  image: string,
  opts: Partial<Product> = {},
): Product => ({
  id,
  slug,
  title,
  location,
  price,
  currency: "EGP",
  image,
  bedrooms: 3,
  bathrooms: 2,
  area: 180,
  postedAt: "2026-03-01",
  categorySlug,
  ...opts,
});

const products: Product[] = [
  product(
    "1",
    "luxury-apartment-new-fayoum",
    { ar: "شقة فاخرة في نيو الفيوم", en: "Luxury Apartment in New Fayoum" },
    { ar: "نيو الفيوم، الفيوم", en: "New Fayoum, Fayoum" },
    1_900_000,
    "apartments",
    unsplash("photo-1600210492486-724fe5c67fb0"),
    {
      featured: true,
      isNew: true,
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      expectedReturn: 12,
      monthlyInstallment: 12_500,
    },
  ),
  product(
    "2",
    "modern-townhouse-compound",
    { ar: "تاون هاوس عصري في كمبوند", en: "Modern Townhouse in Compound" },
    { ar: "نيو الفيوم، الفيوم", en: "New Fayoum, Fayoum" },
    2_800_000,
    "apartments",
    unsplash("photo-1600585154340-be6161a56a0c"),
    {
      featured: true,
      isNew: true,
      isShared: true,
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      expectedReturn: 13,
      monthlyInstallment: 18_500,
    },
  ),
  product(
    "3",
    "villa-lake-view",
    { ar: "فيلا بإطلالة على البحيرة", en: "Villa with Lake View" },
    { ar: "بحيرة قارون، الفيوم", en: "Lake Qarun, Fayoum" },
    4_500_000,
    "lands",
    unsplash("photo-1600596542815-ffad4c1539a9"),
    {
      featured: true,
      isShared: true,
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      expectedReturn: 14,
      monthlyInstallment: 28_000,
    },
  ),
  product(
    "4",
    "private-garden-villa",
    { ar: "فيلا بحديقة خاصة", en: "Private Garden Villa" },
    { ar: "نيو الفيوم، الفيوم", en: "New Fayoum, Fayoum" },
    3_800_000,
    "mall",
    unsplash("photo-1600607687939-ce8a6c25118c"),
    {
      isNew: true,
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      expectedReturn: 12,
      monthlyInstallment: 22_000,
    },
  ),
  product(
    "5",
    "furnished-investment-apartment",
    { ar: "شقة مفروشة للاستثمار", en: "Furnished Investment Apartment" },
    { ar: "نيو الفيوم، الفيوم", en: "New Fayoum, Fayoum" },
    950_000,
    "shops",
    unsplash("photo-1522708323590-d24dbb6b0267"),
    {
      isNew: true,
      isShared: true,
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      expectedReturn: 11,
      monthlyInstallment: 7_500,
    },
  ),
  product(
    "6",
    "rural-chalet-lake",
    { ar: "شاليه ريفي على البحيرة", en: "Rural Chalet on the Lake" },
    { ar: "بحيرة قارون، الفيوم", en: "Lake Qarun, Fayoum" },
    1_200_000,
    "apartments",
    unsplash("photo-1502672260266-1c1ef2d93688"),
    {
      isShared: true,
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      expectedReturn: 10,
      monthlyInstallment: 9_500,
    },
  ),
];

const investments: InvestmentOpportunity[] = [
  {
    id: "1",
    slug: "furnished-studio",
    title: { ar: "استوديو مفروش", en: "Furnished Studio" },
    location: { ar: "التجمع الخامس", en: "Fifth Settlement" },
    image: unsplash("photo-1560448204-e02f11c3d0e2"),
    totalValue: 2_500_000,
    expectedReturn: 14,
    minInvestment: 50_000,
    fundedPercent: 72,
    currency: "EGP",
    isNew: true,
  },
  {
    id: "2",
    slug: "sea-chalet-share",
    title: { ar: "شاليه على البحر", en: "Chalet on the Sea" },
    location: { ar: "الساحل الشمالي", en: "North Coast" },
    image: unsplash("photo-1502672260266-1c1ef2d93688"),
    totalValue: 5_000_000,
    expectedReturn: 16,
    minInvestment: 100_000,
    fundedPercent: 45,
    currency: "EGP",
  },
  {
    id: "3",
    slug: "villa-share",
    title: { ar: "حصة في فيلا", en: "Villa Share" },
    location: { ar: "نيو الفيوم", en: "New Fayoum" },
    image: unsplash("photo-1600596542815-ffad4c1539a9"),
    totalValue: 8_000_000,
    expectedReturn: 12,
    minInvestment: 200_000,
    fundedPercent: 88,
    currency: "EGP",
  },
];

const features: Feature[] = [
  {
    id: "1",
    icon: "shield",
    title: { ar: "استثمار آمن", en: "Secure Investment" },
    description: {
      ar: "حماية قانونية كاملة لاستثمارك مع عقود موثقة.",
      en: "Full legal protection for your investment with verified contracts.",
    },
  },
  {
    id: "2",
    icon: "building",
    title: { ar: "عقارات موثوقة", en: "Reliable Properties" },
    description: {
      ar: "وحدات مختارة بعناية من أفضل المطورين العقاريين.",
      en: "Carefully selected units from top real estate developers.",
    },
  },
  {
    id: "3",
    icon: "chart",
    title: { ar: "عائد مرتفع", en: "High Return" },
    description: {
      ar: "عوائد سنوية تنافسية تصل إلى 14% وأكثر.",
      en: "Competitive annual returns of up to 14% and beyond.",
    },
  },
  {
    id: "4",
    icon: "people",
    title: { ar: "ملكية مشتركة", en: "Shared Ownership" },
    description: {
      ar: "استثمر مع الآخرين وامتلك جزءاً من عقار بحد أدنى منخفض.",
      en: "Invest with others and own a part of a property with a low minimum.",
    },
  },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: {
      ar: "تجربة استثمارية ممتازة. المنصة سهلة الاستخدام والعائد كان أفضل من المتوقع.",
      en: "Excellent investment experience. The platform is easy to use and returns exceeded expectations.",
    },
    name: { ar: "أحمد محمد", en: "Ahmed Mohamed" },
    role: { ar: "مستثمر", en: "Investor" },
    avatar: unsplash("photo-1472099645785-5658abf4ff4e", 100),
    rating: 5,
  },
  {
    id: "2",
    quote: {
      ar: "أفضل منصة للاستثمار العقاري في مصر. شفافية كاملة في كل خطوة.",
      en: "The best real estate investment platform in Egypt. Full transparency at every step.",
    },
    name: { ar: "سارة علي", en: "Sara Ali" },
    role: { ar: "مستثمرة", en: "Investor" },
    avatar: unsplash("photo-1438761681033-6461ffad8d80", 100),
    rating: 5,
  },
  {
    id: "3",
    quote: {
      ar: "استثمرت في شاليه على البحر وبدأت أستلم عوائدي بانتظام. أنصح بها بشدة.",
      en: "I invested in a sea chalet and receive returns regularly. Highly recommended.",
    },
    name: { ar: "محمود حسن", en: "Mahmoud Hassan" },
    role: { ar: "مستثمر", en: "Investor" },
    avatar: unsplash("photo-1507003211169-0a1dd7228f2d", 100),
    rating: 5,
  },
];

const blog: BlogPost[] = [
  {
    id: "1",
    slug: "real-estate-investment-guide",
    title: {
      ar: "دليلك الشامل للاستثمار العقاري في مصر",
      en: "Your Complete Guide to Real Estate Investment in Egypt",
    },
    excerpt: {
      ar: "تعرف على أساسيات الاستثمار العقاري وكيف تبدأ رحلتك الاستثمارية بأمان.",
      en: "Learn the basics of real estate investment and how to start your journey safely.",
    },
    content: {
      ar: "الاستثمار العقاري من أقوى أدوات بناء الثروة على المدى الطويل...",
      en: "Real estate investment is one of the strongest wealth-building tools over the long term...",
    },
    image: unsplash("photo-1560518883-ce09059eeffa"),
    category: { ar: "استثمار", en: "Investment" },
    publishedAt: "2026-02-15",
    readingTimeMinutes: 5,
  },
  {
    id: "2",
    slug: "new-fayoum-opportunity",
    title: {
      ar: "لماذا نيو الفيوم فرصة استثمارية واعدة؟",
      en: "Why New Fayoum Is a Promising Investment Opportunity",
    },
    excerpt: {
      ar: "اكتشف أسباب نمو الطلب على العقارات في نيو الفيوم والعوائد المتوقعة.",
      en: "Discover why demand for properties in New Fayoum is growing and expected returns.",
    },
    content: {
      ar: "تشهد منطقة نيو الفيوم نمواً عمرانياً متسارعاً...",
      en: "The New Fayoum area is experiencing rapid urban growth...",
    },
    image: unsplash("photo-1600585154340-be6161a56a0c"),
    category: { ar: "عقارات", en: "Real Estate" },
    publishedAt: "2026-02-10",
    readingTimeMinutes: 4,
  },
  {
    id: "3",
    slug: "shared-ownership-explained",
    title: {
      ar: "الملكية المشتركة: كيف تعمل ولماذا تناسبك",
      en: "Shared Ownership: How It Works and Why It Suits You",
    },
    excerpt: {
      ar: "شرح مبسط لنموذج الملكية المشتركة وكيف يمكنك البدء بمبلغ صغير.",
      en: "A simple explanation of shared ownership and how you can start with a small amount.",
    },
    content: {
      ar: "الملكية المشتركة تتيح لعدة مستثمرين امتلاك حصص في عقار واحد...",
      en: "Shared ownership allows multiple investors to own shares in a single property...",
    },
    image: unsplash("photo-1450101499163-c8848c66ca85"),
    category: { ar: "استثمار", en: "Investment" },
    publishedAt: "2026-02-05",
    readingTimeMinutes: 6,
  },
];

const promo: PromoBanner = {
  title: { ar: "نيو الفيوم", en: "New Fayoum" },
  description: {
    ar: "اكتشف وحدات استثمارية في أحد أسرع المناطق نمواً في مصر.",
    en: "Discover investment units in one of Egypt's fastest-growing areas.",
  },
  image: unsplash("photo-1582268611958-ebfd161ef9cf", 1400),
  ctaLabel: { ar: "اكتشف الوحدات", en: "Discover Units" },
  ctaHref: "/products?category=chalets",
};

export function getDefaultContent(): ContentStore {
  return {
    settings,
    stats,
    hero,
    betakPage,
    categories,
    products,
    investments,
    features,
    testimonials,
    blog,
    promo,
  };
}
