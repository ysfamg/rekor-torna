import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET - List all blogs
export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(blogs)
  } catch {
    return NextResponse.json({ error: "Blog yazıları yüklenemedi" }, { status: 500 })
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const blog = await db.blog.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        excerpt: body.excerpt || "",
        content: body.content,
        category: body.category || "Genel",
        published: body.published ?? false,
        featured: body.featured ?? false,
      },
    })
    
    return NextResponse.json(blog)
  } catch {
    return NextResponse.json({ error: "Blog oluşturulamadı" }, { status: 500 })
  }
}
