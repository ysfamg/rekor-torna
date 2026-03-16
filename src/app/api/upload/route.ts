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
    // Her ortamda kararlı olması için Next.js'in statik/standalone klasörü
    // yerine, daima uygulamanın çalıştığı ana dizindeki (root) 'uploads' klasörünü kullanıyoruz.
    const cwd = process.cwd()
    const isStandalone = cwd.includes(".next") || cwd.includes("standalone")
    
    // Eğer standalone build içinde çalışıyorsa, root dizin 2 klasör üsttedir.
    const projectRoot = isStandalone ? path.resolve(cwd, "..", "..") : cwd
    
    // Yükleme klasörü her zaman projenin ana dizinindeki 'uploads' olacak
    const uploadsDir = path.join(projectRoot, "uploads")
    
    console.log("[Upload] Gelen CWD:", cwd)
    console.log("[Upload] Project Root (Hesaplanan):", projectRoot)
    console.log("[Upload] Sabit Hedef Dizin:", uploadsDir)

    // Klasör yoksa oluştur
    if (!existsSync(uploadsDir)) {
      console.log(`[Upload] Klasör oluşturuluyor: ${uploadsDir}`)
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
    const filename = `${timestamp}-${randomStr}.${ext}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sadece bir hedefe kaydet (Nginx'in statik sunacağı yer)
    const filepath = path.join(uploadsDir, filename)
    console.log(`[Upload] Saving to: ${filepath}`)
    await writeFile(filepath, buffer)
    
    console.log("[Upload] Başarılı: Dosya ana yerleşkeye kaydedildi")

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
