import { getSection } from "@/lib/content/store";
import { CategoriesEditor } from "@/components/admin/CategoriesEditor";

export default async function AdminCategoriesPage() {
  const categories = await getSection("categories");
  return <CategoriesEditor initialData={categories} />;
}
