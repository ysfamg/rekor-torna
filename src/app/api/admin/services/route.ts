import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - List all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: "Hizmetler yüklenemedi" }, { status: 500 })
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get max order
    const maxOrder = await db.service.aggregate({
      _max: { order: true },
    })
    
    const service = await db.service.create({
      data: {
        ...body,
        order: (maxOrder._max.order || 0) + 1,
      },
    })
    
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Hizmet oluşturulamadı" }, { status: 500 })
  }
}
