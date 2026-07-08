import { CategoriesEditor } from "@/components/admin/CategoriesEditor";
import { listCategories } from "@/lib/db/categories";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();
  return <CategoriesEditor initialData={categories} />;
}
