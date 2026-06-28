import { getSection } from "@/lib/content/store";
import { PromoForm } from "@/components/admin/PromoForm";

export default async function AdminPromoPage() {
  const promo = await getSection("promo");
  return <PromoForm initialData={promo} />;
}
