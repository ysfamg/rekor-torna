import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Single service
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const service = await db.service.findUnique({
      where: { id },
    })
    
    if (!service) {
      return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 })
    }
    
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Hizmet yüklenemedi" }, { status: 500 })
  }
}

// PUT - Update service
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const service = await db.service.update({
      where: { id },
      data: body,
    })
    
    revalidatePath("/")
    revalidatePath("/hizmetler")
    revalidatePath("/admin/services")
    
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Hizmet güncellenemedi" }, { status: 500 })
  }
}

// DELETE - Delete service
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    await db.service.delete({
      where: { id },
    })
    
    revalidatePath("/")
    revalidatePath("/hizmetler")
    revalidatePath("/admin/services")
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Hizmet silinemedi" }, { status: 500 })
  }
}
