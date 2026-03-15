import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getPageContent } from "@/lib/services"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata() {
  const pageContent = await getPageContent("kvkk")
  
  return {
    title: pageContent?.seoTitle || "KVKK Aydınlatma Metni | Rekor Torna Hidrolik",
    description: pageContent?.seoDesc || "Kişisel verilerin korunması hakkında aydınlatma metni",
  }
}

export default async function KVKKPage() {
  const pageContent = await getPageContent("kvkk")
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">KVKK</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {pageContent?.title || "KVKK Aydınlatma Metni"}
          </h1>
          <p className="text-slate-300 text-lg">
            Kişisel Verilerin Korunması Kanunu Kapsamında
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-slate-200 dark:border-slate-700">
            <CardContent className="p-8 space-y-6">
              {pageContent?.content ? (
                <div className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {pageContent.content}
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Veri Sorumlusu</h2>
                    <p className="text-slate-600 dark:text-slate-400">Rekor Torna Hidrolik</p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400">
                    Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenmektedir. 
                    Bu aydınlatma metni, kişisel verilerinizin nasıl işlendiği konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. Verilerin Toplanması</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Web sitemizdeki iletişim formu aracılığıyla elektronik ortamda toplanmaktadır. 
                      Bu veriler, formda belirttiğiniz bilgilerden oluşmaktadır.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. İşlenen Veriler</h3>
                    <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-1">
                      <li>Ad Soyad</li>
                      <li>E-posta Adresi</li>
                      <li>Telefon Numarası</li>
                      <li>Hizmet talebinize ilişkin mesaj</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. İşleme Amaçları</h3>
                    <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-1">
                      <li>İletişim taleplerinizi yanıtlamak</li>
                      <li>Teklif vermek, hizmet süreçlerini yürütmek</li>
                      <li>Müşteri memnuniyetini sağlamak</li>
                      <li>Yasal yükümlülükleri yerine getirmek</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">4. Veri Aktarımı</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır. 
                      Hizmet sağlayıcılarımızla gerektiğinde güvenli şekilde paylaşılabilir.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">5. Veri Sahibinin Hakları</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      KVKK kapsamında aşağıdaki haklara sahipsiniz:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-1">
                      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                      <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                      <li>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</li>
                      <li>Kişisel verilerinizin aktarıldığı üçüncü tarafları öğrenme</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">6. İletişim</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      KVKK kapsamındaki talepleriniz için: <strong>info@rekortorna.com</strong>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
