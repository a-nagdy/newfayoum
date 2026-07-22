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

const betakSharePage = {
  hero: {
    badge: { ar: "استثمار مضمون", en: "Guaranteed Investment" },
    title: {
      ar: "استثمر في العقار بمبلغ أقل وامتلك حصة حقيقية",
      en: "Invest in real estate with a smaller amount and own a real share",
    },
    subtitle: {
      ar: "بيتك شير يتيح لك الاستثمار في عقارات مميزة بحد أدنى منخفض، مع عوائد مجزية وإدارة احترافية.",
      en: "Betak Share lets you invest in premium properties with a low minimum, attractive returns, and professional management.",
    },
  },
  featurePills: [
    { ar: "استثمار عقاري", en: "Real Estate Investment" },
    { ar: "عوائد مضمونة", en: "Guaranteed Returns" },
    { ar: "مخاطر منخفضة", en: "Low Risk" },
    { ar: "محفظة متنوعة", en: "Flexible Portfolio" },
  ],
  opportunitiesTitle: {
    ar: "فرص الاستثمار المتاحة",
    en: "Available Investment Opportunities",
  },
  advantagesTitle: {
    ar: "مزايا الاستثمار في بيتك شير",
    en: "Advantages of investing in Betak Share",
  },
  advantages: [
    {
      id: "1",
      icon: "shield" as const,
      title: { ar: "هيكل قانوني", en: "Legal Framework" },
      description: {
        ar: "حماية قانونية كاملة لاستثمارك مع عقود موثقة.",
        en: "Full legal protection for your investment with verified contracts.",
      },
    },
    {
      id: "2",
      icon: "chart" as const,
      title: { ar: "عائد مرتفع", en: "High Return" },
      description: {
        ar: "عوائد سنوية تنافسية تصل إلى 14% وأكثر.",
        en: "Competitive annual returns of up to 14% and beyond.",
      },
    },
    {
      id: "3",
      icon: "building" as const,
      title: { ar: "تكلفة دخول محدودة", en: "Limited Entry Cost" },
      description: {
        ar: "ابدأ الاستثمار بمبالغ صغيرة وامتلك حصة في عقار حقيقي.",
        en: "Start investing with small amounts and own a share in a real property.",
      },
    },
    {
      id: "4",
      icon: "people" as const,
      title: { ar: "تنويع المحفظة", en: "Portfolio Diversification" },
      description: {
        ar: "وزّع استثماراتك على عدة عقارات لتقليل المخاطر.",
        en: "Spread your investments across multiple properties to reduce risk.",
      },
    },
  ],
  stepsTitle: {
    ar: "كيف يعمل الاستثمار المشترك؟",
    en: "How does shared investment work?",
  },
  steps: [
    {
      id: "1",
      title: { ar: "اختر العقار", en: "Choose the property" },
      description: {
        ar: "تصفح فرص الاستثمار المتاحة واختر العقار المناسب.",
        en: "Browse available investment opportunities and choose the right property.",
      },
    },
    {
      id: "2",
      title: { ar: "حدد حصتك", en: "Determine your share" },
      description: {
        ar: "حدد عدد الحصص التي تريد امتلاكها حسب ميزانيتك.",
        en: "Decide how many shares you want to own based on your budget.",
      },
    },
    {
      id: "3",
      title: { ar: "وقع العقد", en: "Sign the contract" },
      description: {
        ar: "أكمل الإجراءات القانونية ووقّع عقد الملكية المشتركة.",
        en: "Complete the legal process and sign the shared ownership contract.",
      },
    },
    {
      id: "4",
      title: { ar: "استلم العوائد", en: "Receive returns" },
      description: {
        ar: "استلم عوائدك بانتظام وفق جدول التوزيع المتفق عليه.",
        en: "Receive your returns regularly according to the agreed distribution schedule.",
      },
    },
  ],
  faqTitle: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
  faq: [
    {
      id: "1",
      question: { ar: "ما هي شروط البدء بالاستثمار؟", en: "What are the conditions to start investing?" },
      answer: {
        ar: "يجب أن تكون بالغاً وتمتلك هوية سارية، مع حد أدنى للاستثمار يختلف حسب العقار.",
        en: "You must be of legal age with valid ID, with a minimum investment that varies by property.",
      },
    },
    {
      id: "2",
      question: { ar: "كيف يتم صرف العوائد؟", en: "How are returns paid out?" },
      answer: {
        ar: "يتم توزيع العوائد بشكل ربع سنوي أو سنوي حسب نوع العقار والعقد.",
        en: "Returns are distributed quarterly or annually depending on the property type and contract.",
      },
    },
    {
      id: "3",
      question: { ar: "هل يمكنني البيع في أي وقت؟", en: "Can I sell at any time?" },
      answer: {
        ar: "نعم، يمكنك عرض حصتك للبيع في السوق الثانوي وفق الشروط المحددة.",
        en: "Yes, you can list your share for sale on the secondary market under specified terms.",
      },
    },
    {
      id: "4",
      question: { ar: "ما هي الضمانات القانونية؟", en: "What are the legal guarantees?" },
      answer: {
        ar: "جميع العقود موثقة قانونياً ومسجلة لضمان حقوق المستثمرين.",
        en: "All contracts are legally verified and registered to protect investor rights.",
      },
    },
  ],
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
      monthlyInstallment: 50_000,
      fundedPercent: 65,
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
      monthlyInstallment: 100_000,
      fundedPercent: 45,
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
      monthlyInstallment: 25_000,
      fundedPercent: 72,
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
      monthlyInstallment: 30_000,
      fundedPercent: 88,
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
    slug: "why-fayoum-ideal-investment-2025",
    title: {
      ar: "لماذا الفيوم الوجهة الاستثمارية المثالية في 2025؟",
      en: "Why is Fayoum the Ideal Investment Destination in 2025?",
    },
    excerpt: {
      ar: "اكتشف لماذا أصبحت الفيوم من أقوى الفرص العقارية في مصر، مع نمو الأسعار والعوائد المتوقعة.",
      en: "Discover why Fayoum has become one of Egypt’s strongest real estate opportunities, with rising prices and expected yields.",
    },
    content: {
      ar: "تشهد محافظة الفيوم تحولاً عمرانياً واستثمارياً غير مسبوق، مدفوعاً بالمشروعات الجديدة والطلب المتزايد على الوحدات السكنية والسياحية.\n\n## لماذا الفيوم؟\n\nتتميز الفيوم بموقع استراتيجي قريب من القاهرة، وتنوع في الفرص بين الوحدات السكنية والشاليهات والاستثمار المشترك.\n\n> الفيوم لم تعد خياراً ثانوياً؛ بل أصبحت وجهة رئيسية للمستثمرين الباحثين عن عائد مستقر ونمو رأسمالي.\n\n## أبرز المشروعات في 2025\n\nتتوسع المشروعات العقارية في نيو الفيوم والمناطق السياحية المحيطة، مع نماذج تمويل مرنة تناسب المستثمرين الأفراد والملكية المشتركة.",
      en: "Fayoum is undergoing an unprecedented urban and investment transformation, driven by new projects and rising demand for residential and tourism units.\n\n## Why Fayoum?\n\nFayoum offers a strategic location near Cairo and a mix of opportunities across residential units, chalets, and shared investment models.\n\n> Fayoum is no longer a secondary option — it has become a primary destination for investors seeking stable returns and capital growth.\n\n## Key Projects in 2025\n\nReal estate projects continue to expand across New Fayoum and nearby tourism areas, with flexible financing models suited to individual and shared-ownership investors.",
    },
    image: unsplash("photo-1600585154340-be6161a56a0c"),
    category: { ar: "عقارات الفيوم", en: "Fayoum Real Estate" },
    publishedAt: "2024-07-01",
    readingTimeMinutes: 7,
    featured: true,
    author: { ar: "م. أحمد السيد", en: "Eng. Ahmed El-Sayed" },
    authorRole: { ar: "خبير عقاري", en: "Real Estate Expert" },
    stats: [
      {
        value: "35%",
        label: { ar: "ارتفاع الأسعار", en: "Price Increase" },
      },
      {
        value: "14%",
        label: { ar: "متوسط العائد", en: "Average Yield" },
      },
      {
        value: "+100",
        label: { ar: "مشروع", en: "Projects" },
      },
    ],
  },
  {
    id: "2",
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
      ar: "الاستثمار العقاري من أقوى أدوات بناء الثروة على المدى الطويل.\n\n## ابدأ بالأساسيات\n\nحدد هدفك الاستثماري، وميزانيتك، والأفق الزمني قبل اختيار العقار المناسب.\n\n> التخطيط الجيد يقلل المخاطر ويزيد فرص العائد المستقر.",
      en: "Real estate investment is one of the strongest wealth-building tools over the long term.\n\n## Start with the basics\n\nDefine your investment goal, budget, and time horizon before choosing the right property.\n\n> Good planning reduces risk and improves the chance of stable returns.",
    },
    image: unsplash("photo-1560518883-ce09059eeffa"),
    category: { ar: "استثمار", en: "Investment" },
    publishedAt: "2026-02-15",
    readingTimeMinutes: 5,
    author: { ar: "فريق بيتك", en: "Betak Team" },
    authorRole: { ar: "فريق المحتوى", en: "Content Team" },
  },
  {
    id: "3",
    slug: "shared-ownership-explained",
    title: {
      ar: "الاستثمار المشترك في العقارات: دليل المبتدئين",
      en: "Joint Investment in Real Estate: A Beginner’s Guide",
    },
    excerpt: {
      ar: "شرح مبسط لنموذج الملكية المشتركة وكيف يمكنك البدء بمبلغ صغير.",
      en: "A simple explanation of shared ownership and how you can start with a small amount.",
    },
    content: {
      ar: "الملكية المشتركة تتيح لعدة مستثمرين امتلاك حصص في عقار واحد.\n\n## كيف يعمل النموذج؟\n\nتشارك في قيمة العقار وعوائده بنسبة حصتك، مع إدارة احترافية من الشركة.\n\n> هذا النموذج مناسب لمن يريد الدخول إلى السوق بمبلغ أقل وبمخاطر موزعة.",
      en: "Shared ownership allows multiple investors to own shares in a single property.\n\n## How the model works\n\nYou share in the property’s value and returns according to your stake, with professional management from the company.\n\n> This model suits anyone who wants to enter the market with a smaller amount and distributed risk.",
    },
    image: unsplash("photo-1450101499163-c8848c66ca85"),
    category: { ar: "الاستثمار المشترك", en: "Joint Investment" },
    publishedAt: "2026-02-05",
    readingTimeMinutes: 6,
    author: { ar: "م. أحمد السيد", en: "Eng. Ahmed El-Sayed" },
    authorRole: { ar: "خبير عقاري", en: "Real Estate Expert" },
  },
  {
    id: "4",
    slug: "real-estate-market-outlook",
    title: {
      ar: "توقعات السوق العقاري لعام 2026",
      en: "Real Estate Market Outlook for 2026",
    },
    excerpt: {
      ar: "نظرة على اتجاهات الأسعار والطلب والعوامل المؤثرة على السوق العقاري المصري.",
      en: "A look at price trends, demand, and the factors shaping Egypt’s real estate market.",
    },
    content: {
      ar: "يشهد السوق العقاري المصري تغيرات مهمة في العرض والطلب والتمويل.\n\n## ما الذي يحرك السوق؟\n\nالطلب على الوحدات السكنية والاستثمارية يستمر في المدن الجديدة والمناطق السياحية.\n\n> متابعة اتجاهات السوق تساعدك على اختيار التوقيت والموقع الأنسب.",
      en: "Egypt’s real estate market is seeing important shifts in supply, demand, and financing.\n\n## What is driving the market?\n\nDemand for residential and investment units continues in new cities and tourism areas.\n\n> Tracking market trends helps you choose the right timing and location.",
    },
    image: unsplash("photo-1486406146926-c627a92ad1ab"),
    category: { ar: "السوق العقاري", en: "Real Estate Market" },
    publishedAt: "2026-01-20",
    readingTimeMinutes: 5,
    author: { ar: "فريق بيتك", en: "Betak Team" },
    authorRole: { ar: "تحليل السوق", en: "Market Analysis" },
  },
  {
    id: "5",
    slug: "mortgage-financing-basics",
    title: {
      ar: "أساسيات التمويل العقاري للمستثمرين",
      en: "Mortgage Financing Basics for Investors",
    },
    excerpt: {
      ar: "كيف تختار خطة تمويل مناسبة وتوازن بين القسط والعائد المتوقع.",
      en: "How to choose a suitable financing plan and balance installments with expected returns.",
    },
    content: {
      ar: "التمويل العقاري أداة مهمة لتوسيع قدرتك الاستثمارية عند استخدامها بحذر.\n\n## قبل التوقيع على أي عقد\n\nقارن نسب الفائدة، مدة السداد، والرسوم الإضافية.\n\n> اختر تمويلاً يتوافق مع تدفقك النقدي المتوقع من الاستثمار.",
      en: "Mortgage financing can expand your investment capacity when used carefully.\n\n## Before signing any contract\n\nCompare interest rates, repayment terms, and extra fees.\n\n> Choose financing that matches your expected cash flow from the investment.",
    },
    image: unsplash("photo-1560520653-9e0e4c89eb11"),
    category: { ar: "التمويل العقاري", en: "Real Estate Finance" },
    publishedAt: "2026-01-10",
    readingTimeMinutes: 4,
    author: { ar: "فريق بيتك", en: "Betak Team" },
    authorRole: { ar: "فريق المحتوى", en: "Content Team" },
  },
  {
    id: "6",
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
      ar: "تشهد منطقة نيو الفيوم نمواً عمرانياً متسارعاً.\n\n## فرص واعدة\n\nالطلب المتزايد والمشروعات الجديدة يجعلان المنطقة جاذبة للمستثمرين متوسطي وطويلي الأجل.",
      en: "The New Fayoum area is experiencing rapid urban growth.\n\n## Promising opportunities\n\nRising demand and new projects make the area attractive for medium- and long-term investors.",
    },
    image: unsplash("photo-1582268611958-ebfd161ef9cf"),
    category: { ar: "عقارات الفيوم", en: "Fayoum Real Estate" },
    publishedAt: "2026-02-10",
    readingTimeMinutes: 4,
    author: { ar: "م. أحمد السيد", en: "Eng. Ahmed El-Sayed" },
    authorRole: { ar: "خبير عقاري", en: "Real Estate Expert" },
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

export function getDefaultCategories(): ProductCategory[] {
  return categories.map((item) => ({ ...item }));
}

export function getDefaultProducts(): Product[] {
  return products.map((item) => ({ ...item }));
}

export function getDefaultContent(): ContentStore {
  return {
    settings,
    stats,
    hero,
    betakPage,
    betakSharePage,
    categories,
    products,
    investments,
    features,
    testimonials,
    blog,
    promo,
  };
}
