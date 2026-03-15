import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// GET - Serve uploaded file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    // Security: prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: "Geçersiz dosya adı" }, { status: 400 })
    }

    // Check multiple possible locations for the uploads folder
    const possiblePaths = [
      path.join(process.cwd(), "public", "uploads", filename),
      path.join(process.cwd(), "uploads", filename),
      path.join(process.cwd(), ".next", "standalone", "public", "uploads", filename),
      path.join(process.cwd(), ".next", "standalone", "uploads", filename),
    ]

    let filepath: string | null = null
    for (const p of possiblePaths) {
      if (existsSync(p)) {
        filepath = p
        break
      }
    }

    if (!filepath) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 404 })
    }

    // Read file
    const fileBuffer = await readFile(filepath)

    // Determine content type based on extension
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const contentTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
    }

    const contentType = contentTypes[ext] || 'application/octet-stream'

    // Return file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Dosya yüklenemedi" }, { status: 500 })
  }
}
