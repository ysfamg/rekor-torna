import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Single contact
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const contact = await db.contact.findUnique({
      where: { id },
    })
    
    if (!contact) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: "Mesaj yüklenemedi" }, { status: 500 })
  }
}

// PUT - Update contact status/notes
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const contact = await db.contact.update({
      where: { id },
      data: body,
    })
    
    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: "Mesaj güncellenemedi" }, { status: 500 })
  }
}

// DELETE - Delete contact
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    await db.contact.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Mesaj silinemedi" }, { status: 500 })
  }
}
