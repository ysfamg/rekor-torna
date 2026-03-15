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

    // --- Robust Path Resolution ---
    const cwd = process.cwd()
    const relativeUploadsDir = path.join("public", "uploads")
    
    // Logic to find the real project root and the active public folder
    let projectRoot = cwd
    let activePublicDir = path.join(cwd, "public")

    // If we are inside .next/standalone, the actual project root is 2 levels up
    if (cwd.includes(path.join(".next", "standalone"))) {
      projectRoot = path.resolve(cwd, "..", "..")
      activePublicDir = path.join(cwd, "public") // In standalone, public is inside standalone
    }

    const uploadsDirs = [
      path.join(projectRoot, relativeUploadsDir), // Global permanent uploads
      path.join(activePublicDir, "uploads")        // Active serving uploads
    ]

    // Remove duplicates
    const finalTargetDirs = Array.from(new Set(uploadsDirs))
    
    console.log("[Upload] Detected CWD:", cwd)
    console.log("[Upload] Project Root:", projectRoot)
    console.log("[Upload] Target Directories:", finalTargetDirs)

    // Ensure all directories exist
    for (const dir of finalTargetDirs) {
      if (!existsSync(dir)) {
        console.log(`[Upload] Creating directory: ${dir}`)
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
    for (const dir of finalTargetDirs) {
      const filepath = path.join(dir, filename)
      console.log(`[Upload] Saving to: ${filepath}`)
      await writeFile(filepath, buffer)
    }
    
    console.log("[Upload] Success: Saved to all locations")

    // Return public URL
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
