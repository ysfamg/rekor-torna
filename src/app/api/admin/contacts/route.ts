import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - List all contacts
export async function GET() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json({ error: "Mesajlar yüklenemedi" }, { status: 500 })
  }
}
