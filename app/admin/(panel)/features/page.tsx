import { getSection } from "@/lib/content/store";
import { FeaturesEditor } from "@/components/admin/FeaturesEditor";

export default async function AdminFeaturesPage() {
  const features = await getSection("features");
  return <FeaturesEditor initialData={features} />;
}
