import { getSection } from "@/lib/content/store";
import { PropertiesEditor } from "@/components/admin/PropertiesEditor";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getSection("products"),
    getSection("categories"),
  ]);
  return (
    <PropertiesEditor initialData={products} categories={categories} />
  );
}
