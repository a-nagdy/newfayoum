import type { Locale } from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;

export interface SiteSettings {
  siteName: LocalizedString;
  logoText: string;
  phone: string;
  email: string;
  address: LocalizedString;
  whatsappUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    snapchat?: string;
    facebook?: string;
  };
  footerDescription: LocalizedString;
}

export interface SiteStats {
  unitsSold: number;
  clients: number;
  totalInvestments: number;
  annualReturn: number;
}

export interface HeroContent {
  badge: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  backgroundImage: string;
}

export interface Product {
  id: string;
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  price: number;
  currency: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  postedAt: string;
  badges?: LocalizedString[];
  categorySlug: string;
  featured?: boolean;
  isNew?: boolean;
  isShared?: boolean;
  expectedReturn?: number;
  monthlyInstallment?: number;
  fundedPercent?: number;
  /** Long-form unit description for the detail page. */
  description?: LocalizedString;
  /** Extra gallery images (main `image` is always first). */
  gallery?: string[];
  /** Amenity labels shown as pills on the detail page. */
  amenities?: LocalizedString[];
  /** Optional Google Maps embed or place URL. */
  mapUrl?: string;
  floors?: number;
  parkingSpaces?: number;
  marketValue?: number;
}

export interface BetakShareStep {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface BetakShareFaq {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface BetakSharePageContent {
  hero: {
    badge: LocalizedString;
    title: LocalizedString;
    subtitle: LocalizedString;
  };
  featurePills: LocalizedString[];
  opportunitiesTitle: LocalizedString;
  advantagesTitle: LocalizedString;
  advantages: Feature[];
  stepsTitle: LocalizedString;
  steps: BetakShareStep[];
  faqTitle: LocalizedString;
  faq: BetakShareFaq[];
}

export interface BetakPageContent {
  title: LocalizedString;
  backgroundImage: string;
}

export interface InvestmentOpportunity {
  id: string;
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  image: string;
  totalValue: number;
  expectedReturn: number;
  minInvestment: number;
  fundedPercent: number;
  currency: string;
  isNew?: boolean;
  description?: LocalizedString;
  gallery?: string[];
  amenities?: LocalizedString[];
  mapUrl?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floors?: number;
  parkingSpaces?: number;
}

export interface Feature {
  id: string;
  icon: "shield" | "building" | "chart" | "people";
  title: LocalizedString;
  description: LocalizedString;
}

export interface Testimonial {
  id: string;
  quote: LocalizedString;
  name: LocalizedString;
  role: LocalizedString;
  avatar: string;
  rating: number;
}

export interface BlogStat {
  value: string;
  label: LocalizedString;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  image: string;
  category: LocalizedString;
  publishedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  author?: LocalizedString;
  authorRole?: LocalizedString;
  stats?: BlogStat[];
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: LocalizedString;
}

export interface PromoBanner {
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  ctaLabel: LocalizedString;
  ctaHref: string;
}

export interface ContentStore {
  settings: SiteSettings;
  stats: SiteStats;
  hero: HeroContent;
  betakPage: BetakPageContent;
  betakSharePage: BetakSharePageContent;
  categories: ProductCategory[];
  products: Product[];
  investments: InvestmentOpportunity[];
  features: Feature[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  promo: PromoBanner;
}

export type ContentKey = keyof ContentStore;

/** JSON-backed CMS sections (excludes relational products/categories). */
export type SectionKey = Exclude<ContentKey, "categories" | "products">;

export function pickLocalized<T extends LocalizedString>(
  value: T,
  locale: Locale,
): string {
  return value[locale] ?? value.ar ?? value.en;
}
