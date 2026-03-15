import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

/**
 * Bu route, Next.js'in "public/uploads" klasöründe bulamadığı (yeni yüklenen) 
 * dosyaları canlı olarak dosya sisteminden bulup servis etmek için kullanılır.
 * Özellikle "standalone" modunda yeni yüklenen resimlerin 404 vermesini önler.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    // Güvenlik: Dizin dışına çıkışı engelle
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse("Geçersiz dosya adı", { status: 400 })
    }

    const cwd = process.cwd()
    
    // Olası tüm dosya yollarını tara
    const possiblePaths = [
      // 1. Proje kök dizinindeki asıl uploads (En güvenilir yer)
      path.join(cwd, "public", "uploads", filename),
      // 2. Standalone modunda üst dizindeki uploads
      path.resolve(cwd, "..", "..", "public", "uploads", filename),
      // 3. Standalone içindeki uploads
      path.join(cwd, ".next", "standalone", "public", "uploads", filename),
      // 4. Doğrudan uploads klasörü
      path.join(cwd, "uploads", filename),
    ]

    let filepath: string | null = null
    for (const p of possiblePaths) {
      if (existsSync(p)) {
        filepath = p
        break
      }
    }

    if (!filepath) {
      console.error(`[Upload Serve] Dosya hiçbir yerde bulunamadı: ${filename}`)
      return new NextResponse("Dosya bulunamadı", { status: 404 })
    }

    // Dosyayı oku
    const fileBuffer = await readFile(filepath)

    // Uzantıya göre Content-Type belirle
    const ext = filename.split('.').pop()?.toLowerCase() || ''
    const contentTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
    }

    const contentType = contentTypes[ext] || 'application/octet-stream'

    // Dosyayı uygun headerlar ile dön
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error(`[Upload Serve] Beklenmedik hata:`, error)
    return new NextResponse("Sunucu hatası", { status: 500 })
  }
}
