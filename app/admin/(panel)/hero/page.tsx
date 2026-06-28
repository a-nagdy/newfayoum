import { getSection } from "@/lib/content/store";
import { HeroForm } from "@/components/admin/HeroForm";

export default async function AdminHeroPage() {
  const hero = await getSection("hero");
  return <HeroForm initialData={hero} />;
}
