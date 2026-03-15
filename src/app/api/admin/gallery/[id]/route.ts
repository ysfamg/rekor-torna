import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - Get single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await db.gallery.findUnique({
      where: { id }
    })
    
    if (!item) {
      return NextResponse.json({ error: "Galeri öğesi bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching gallery item:", error)
    return NextResponse.json({ error: "Galeri öğesi yüklenemedi" }, { status: 500 })
  }
}

// PUT - Update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const item = await db.gallery.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl,
        thumbnail: data.thumbnail || null,
        category: data.category || "genel",
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      }
    })
    
    return NextResponse.json(item)
  } catch (error) {
    console.error("Error updating gallery item:", error)
    return NextResponse.json({ error: "Galeri öğesi güncellenemedi" }, { status: 500 })
  }
}

// DELETE - Delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.gallery.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    return NextResponse.json({ error: "Galeri öğesi silinemedi" }, { status: 500 })
  }
}
