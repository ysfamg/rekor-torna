import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// POST - Upload image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    if (!file) {
      return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Sadece resim dosyaları yüklenebilir" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Dosya boyutu 5MB'dan küçük olmalıdır" }, { status: 400 })
    }

    // Base directory resolution
    const baseDir = process.cwd()
    const relativeUploadsDir = path.join("public", "uploads")
    
    // Primary uploads directory (project root)
    const primaryUploadsDir = path.join(baseDir, relativeUploadsDir)
    
    // Secondary uploads directory (for standalone mode)
    // In standalone mode, Next.js serves from .next/standalone/public
    const standaloneUploadsDir = path.join(baseDir, ".next", "standalone", relativeUploadsDir)
    
    const targetDirs = [primaryUploadsDir]
    if (primaryUploadsDir !== standaloneUploadsDir && existsSync(path.join(baseDir, ".next", "standalone"))) {
      targetDirs.push(standaloneUploadsDir)
    }

    console.log("Target upload directories:", targetDirs)

    for (const dir of targetDirs) {
      if (!existsSync(dir)) {
        console.log(`Creating directory: ${dir}`)
        await mkdir(dir, { recursive: true })
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
    const filename = `${timestamp}-${randomStr}.${ext}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save to all target directories
    for (const dir of targetDirs) {
      const filepath = path.join(dir, filename)
      console.log(`Saving file to: ${filepath}`)
      await writeFile(filepath, buffer)
    }
    
    console.log("File saved successfully to all locations")

    // Return public URL (Next.js serves from /uploads/)
    const publicUrl = `/uploads/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Dosya yüklenemedi" }, { status: 500 })
  }
}
