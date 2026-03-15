import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

// GET - Get single page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = await db.pageContent.findUnique({
      where: { id }
    })
    
    if (!page) {
      return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Sayfa yüklenemedi" }, { status: 500 })
  }
}

// PUT - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const page = await db.pageContent.update({
      where: { id },
      data: {
        title: data.title || null,
        content: data.content || "",
        seoTitle: data.seoTitle || null,
        seoDesc: data.seoDesc || null,
      }
    })
    
    // Revalidate relevant paths
    revalidatePath("/")
    revalidatePath("/hakkimizda")
    revalidatePath("/iletisim")
    revalidatePath("/kvkk")
    revalidatePath("/gizlilik-politikasi")
    revalidatePath("/admin/pages")
    
    return NextResponse.json(page)
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Sayfa güncellenemedi" }, { status: 500 })
  }
}

// DELETE - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.pageContent.delete({
      where: { id }
    })
    
    // Revalidate relevant paths
    revalidatePath("/")
    revalidatePath("/hakkimizda")
    revalidatePath("/iletisim")
    revalidatePath("/kvkk")
    revalidatePath("/gizlilik-politikasi")
    revalidatePath("/admin/pages")
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Sayfa silinemedi" }, { status: 500 })
  }
}
