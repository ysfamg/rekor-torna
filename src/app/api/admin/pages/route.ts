import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - List all pages
export async function GET() {
  try {
    const pages = await db.pageContent.findMany({
      orderBy: { page: "asc" }
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Sayfalar yüklenemedi" }, { status: 500 })
  }
}

// POST - Create new page
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const page = await db.pageContent.create({
      data: {
        page: data.page,
        title: data.title || null,
        content: data.content || "",
        seoTitle: data.seoTitle || null,
        seoDesc: data.seoDesc || null,
      }
    })
    
    return NextResponse.json(page)
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Sayfa oluşturulamadı" }, { status: 500 })
  }
}
