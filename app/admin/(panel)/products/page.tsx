import { PropertiesEditor } from "@/components/admin/PropertiesEditor";
import { listCategories } from "@/lib/db/categories";
import { listProducts } from "@/lib/db/products";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    listProducts(),
    listCategories(),
  ]);

  return (
    <PropertiesEditor initialData={products} categories={categories} />
  );
}
