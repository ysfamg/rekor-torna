import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Single blog
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const blog = await db.blog.findUnique({
      where: { id },
    })
    
    if (!blog) {
      return NextResponse.json({ error: "Blog bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: "Blog yüklenemedi" }, { status: 500 })
  }
}

// PUT - Update blog
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const blog = await db.blog.update({
      where: { id },
      data: body,
    })
    
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: "Blog güncellenemedi" }, { status: 500 })
  }
}

// DELETE - Delete blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    await db.blog.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Blog silinemedi" }, { status: 500 })
  }
}
