import { getSection } from "@/lib/content/store";
import { BetakSharePageEditor } from "@/components/admin/BetakSharePageEditor";

export default async function AdminBetakSharePage() {
  const pageContent = await getSection("betakSharePage");
  return <BetakSharePageEditor initialData={pageContent} />;
}
