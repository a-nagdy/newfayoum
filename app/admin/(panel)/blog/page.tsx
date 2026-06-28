import { getSection } from "@/lib/content/store";
import { BlogEditor } from "@/components/admin/BlogEditor";

export default async function AdminBlogPage() {
  const blog = await getSection("blog");
  return <BlogEditor initialData={blog} />;
}
