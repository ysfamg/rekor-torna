import { db } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import Link from "next/link"

// Sayfayı dinamik yap - bu olmadan veritabanı değişiklikleri yansımaz
export const dynamic = 'force-dynamic'
export const revalidate = 0

const categories = [
  { value: "torna", label: "Torna İşlemleri" },
  { value: "hidrolik", label: "Hidrolik Sistemler" },
  { value: "parca", label: "Parça Temini" },
  { value: "ozel", label: "Özel Üretim" },
  { value: "genel", label: "Genel" },
  { value: "fabrika", label: "Fabrika" },
]

export default async function GalleryPage() {
  let items = []
  try {
    items = await db.gallery.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })
  } catch (error) {
    console.error("Error fetching gallery:", error)
  }

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || "genel"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">GALERİ</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Galeri
            </h1>
            <p className="text-xl text-slate-300">
              Torna, hidrolik ve özel üretim çalışmalarımızdan kareler
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-medium text-slate-600 dark:text-slate-400 mb-2">
                Henüz galeri içeriği yok
              </h2>
              <p className="text-slate-500 dark:text-slate-500">
                Yakında çalışmalarımızdan görüntüler eklenecektir.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                    {categories.find(c => c.value === category)?.label || category}
                    <Badge variant="secondary" className="ml-2">
                      {categoryItems.length}
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryItems.map((item) => (
                      <GalleryCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sizin İçin Neler Yapabiliriz?
          </h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Torna, hidrolik ve özel üretim ihtiyaçlarınız için bizimle iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Teklif Alın
          </Link>
        </div>
      </section>
    </div>
  )
}

function GalleryCard({ item }: { item: { id: string; title: string; description: string | null; imageUrl: string } }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Resim yüklenemezse placeholder göster
            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f1f5f9" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">Resim yüklenemedi</text></svg>'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-slate-800 dark:text-white line-clamp-1">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
        )}
      </CardContent>
    </Card>
  )
}
