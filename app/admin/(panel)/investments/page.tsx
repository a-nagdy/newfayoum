import { getSection } from "@/lib/content/store";
import { InvestmentsEditor } from "@/components/admin/InvestmentsEditor";

export default async function AdminInvestmentsPage() {
  const investments = await getSection("investments");
  return <InvestmentsEditor initialData={investments} />;
}
