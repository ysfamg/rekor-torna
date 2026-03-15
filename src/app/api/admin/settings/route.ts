import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - Get all settings
export async function GET() {
  try {
    const settings = await db.siteSetting.findMany()
    const settingsMap: Record<string, string> = {}
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value
    }
    return NextResponse.json(settingsMap)
  } catch {
    return NextResponse.json({ error: "Ayarlar yüklenemedi" }, { status: 500 })
  }
}

// POST - Update settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Ayarlar kaydedilemedi" }, { status: 500 })
  }
}
