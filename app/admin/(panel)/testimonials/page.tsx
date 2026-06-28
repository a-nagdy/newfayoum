import { getSection } from "@/lib/content/store";
import { TestimonialsEditor } from "@/components/admin/TestimonialsEditor";

export default async function AdminTestimonialsPage() {
  const testimonials = await getSection("testimonials");
  return <TestimonialsEditor initialData={testimonials} />;
}
