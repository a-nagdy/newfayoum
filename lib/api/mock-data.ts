import type { Locale } from "@/i18n/routing";
import { getDefaultContent } from "@/lib/content/default-content";
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
} from "./types";

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const mockSiteSettings: SiteSettings = {
  siteName: { ar: "بيتك", en: "BITAK" },
  logoText: "BITAK",
  phone: "+20 100 000 0000",
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

export const mockStats: SiteStats = {
  unitsSold: 600,
  clients: 400,
  totalInvestments: 100_000_000,
  annualReturn: 14,
};

export const mockHero: HeroContent = {
  badge: { ar: "استثمر بذكاء", en: "Invest Smart" },
  title: {
    ar: "استثمر في أفضل الوحدات العقارية مع بيتك",
    en: "Invest in the best real estate units with Bitak",
  },
  subtitle: {
    ar: "امتلك حصة في عقارات مميزة بعائد سنوي مجزٍ وفرص استثمارية متنوعة.",
    en: "Own a share in premium properties with attractive annual returns and diverse investment opportunities.",
  },
  backgroundImage: unsplash(
    "photo-1613490493576-7fde963acd2a",
    1920,
  ),
};

export const mockCategories: ProductCategory[] = [
  { id: "1", slug: "apartments", name: { ar: "شقق", en: "Apartments" } },
  { id: "2", slug: "villas", name: { ar: "فيلات", en: "Villas" } },
  { id: "3", slug: "townhouses", name: { ar: "تاون هاوس", en: "Townhouses" } },
  { id: "4", slug: "chalets", name: { ar: "شاليهات", en: "Chalets" } },
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

export const mockProducts: Product[] = [
  product(
    "1",
    "luxury-villa-new-fayoum",
    { ar: "فيلا فاخرة - نيو الفيوم", en: "Luxury Villa - New Fayoum" },
    { ar: "نيو الفيوم", en: "New Fayoum" },
    4_500_000,
    "villas",
    unsplash("photo-1600596542815-ffad4c1539a9"),
    { featured: true, isNew: true, badges: [{ ar: "جديد", en: "New" }] },
  ),
  product(
    "2",
    "sea-view-chalet",
    { ar: "شاليه على البحر", en: "Sea View Chalet" },
    { ar: "الساحل الشمالي", en: "North Coast" },
    2_800_000,
    "chalets",
    unsplash("photo-1502672260266-1c1ef2d93688"),
    { featured: true, badges: [{ ar: "مميز", en: "Featured" }] },
  ),
  product(
    "3",
    "modern-apartment",
    { ar: "شقة عصرية مفروشة", en: "Modern Furnished Apartment" },
    { ar: "التجمع الخامس", en: "Fifth Settlement" },
    1_950_000,
    "apartments",
    unsplash("photo-1522708323590-d24dbb6b0267"),
    { featured: true },
  ),
  product(
    "4",
    "townhouse-compound",
    { ar: "تاون هاوس في كمبوند", en: "Townhouse in Compound" },
    { ar: "6 أكتوبر", en: "6th of October" },
    3_200_000,
    "townhouses",
    unsplash("photo-1600585154340-be6161a56a0c"),
  ),
  product(
    "5",
    "studio-investment",
    { ar: "استوديو للاستثمار", en: "Investment Studio" },
    { ar: "المعادي", en: "Maadi" },
    850_000,
    "apartments",
    unsplash("photo-1560448204-e02f11c3d0e2"),
    { isNew: true },
  ),
  product(
    "6",
    "resort-chalet",
    { ar: "شاليه في منتجع", en: "Resort Chalet" },
    { ar: "نيو الفيوم", en: "New Fayoum" },
    1_600_000,
    "chalets",
    unsplash("photo-1582268611958-ebfd161ef9cf"),
  ),
];

export const mockInvestments: InvestmentOpportunity[] = [
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

export const mockFeatures: Feature[] = [
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

export const mockTestimonials: Testimonial[] = [
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

export const mockBlogPosts: BlogPost[] = getDefaultContent().blog;

export const mockPromoBanner: PromoBanner = {
  title: { ar: "نيو الفيوم", en: "New Fayoum" },
  description: {
    ar: "اكتشف وحدات استثمارية في أحد أسرع المناطق نمواً في مصر.",
    en: "Discover investment units in one of Egypt's fastest-growing areas.",
  },
  image: unsplash("photo-1582268611958-ebfd161ef9cf", 1400),
  ctaLabel: { ar: "اكتشف الوحدات", en: "Discover Units" },
  ctaHref: "/products?category=chalets",
};

export function getMockData<T>(endpoint: string, locale: Locale): T | null {
  void locale;
  const normalized = endpoint.replace(/^\/api/, "");
  const map: Record<string, unknown> = {
    "/settings": mockSiteSettings,
    "/stats": mockStats,
    "/hero": mockHero,
    "/categories": mockCategories,
    "/products": mockProducts,
    "/investments": mockInvestments,
    "/features": mockFeatures,
    "/testimonials": mockTestimonials,
    "/blog": mockBlogPosts,
    "/promo": mockPromoBanner,
  };
  return (map[normalized] as T) ?? null;
}
