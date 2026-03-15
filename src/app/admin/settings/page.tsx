import { db } from "@/lib/db"
import { SettingsManagement } from "./settings-management"

async function getSettings() {
  const settings = await db.siteSetting.findMany()
  const settingsMap: Record<string, string> = {}
  for (const setting of settings) {
    settingsMap[setting.key] = setting.value
  }
  return settingsMap
}

export default async function AdminSettingsPage() {
  const settings = await getSettings()
  return <SettingsManagement initialSettings={settings} />
}
