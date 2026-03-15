import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - List all gallery items
export async function GET() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: { order: "asc" }
    })
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Galeri yüklenemedi" }, { status: 500 })
  }
}

// POST - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const gallery = await db.gallery.create({
      data: {
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl,
        thumbnail: data.thumbnail || null,
        category: data.category || "genel",
        order: data.order || 0,
        isActive: data.isActive ?? true,
      }
    })
    
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Galeri öğesi oluşturulamadı" }, { status: 500 })
  }
}
