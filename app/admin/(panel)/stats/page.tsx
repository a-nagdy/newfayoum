import { getSection } from "@/lib/content/store";
import { StatsForm } from "@/components/admin/StatsForm";

export default async function AdminStatsPage() {
  const stats = await getSection("stats");
  return <StatsForm initialData={stats} />;
}
