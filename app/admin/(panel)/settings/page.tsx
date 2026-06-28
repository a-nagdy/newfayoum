import { getSection } from "@/lib/content/store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSection("settings");
  return <SettingsForm initialData={settings} />;
}
