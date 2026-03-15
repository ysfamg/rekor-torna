import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Gizlilik Politikası | Rekor Torna Hidrolik",
  description: "Gizlilik politikası ve kişisel verilerin korunması",
}

export default function GizlilikPolitikasiPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">GİZLİLİK POLİTİKASI</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-slate-300 text-lg">
            Kişisel verilerinizin korunması bizim için önemli
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-slate-200 dark:border-slate-700">
            <CardContent className="p-8 space-y-6">
              <p className="text-slate-600 dark:text-slate-400">
                Bu gizlilik politikası, web sitemizi ziyaret eden kullanıcıların gizliliğini korumak amacıyla 
                hazırlanmıştır. Rekor Torna Hidrolik olarak kişisel verilerinizin güvenliğine önem veriyoruz.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. Toplanan Bilgiler</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Web sitemizde aşağıdaki bilgiler toplanabilir:
                </p>
                <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-1">
                  <li><strong>İletişim Bilgileri:</strong> Form aracılığıyla paylaştığınız ad, e-posta, telefon</li>
                  <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı tipi, ziyaret süresi (analitik amaçlı)</li>
                  <li><strong>Çerezler:</strong> Site deneyimini iyileştirmek için kullanılır</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. Bilgilerin Kullanımı</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
                </p>
                <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Hizmet taleplerinizi karşılamak ve size dönüş yapmak</li>
                  <li>Site performansını ve kullanıcı deneyimini artırmak</li>
                  <li>İstatistiksel analizler yapmak</li>
                  <li>Yasal yükümlülükleri yerine getirmek</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. Bilgi Güvenliği</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Kişisel verileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz. 
                  Verileriniz güvenli sunucularda saklanır ve gerekli güvenlik önlemleri alınır.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">4. Çerezler</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerez kullanabilir. 
                  Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">5. Üçüncü Taraf Bağlantıları</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Sitemizdeki harici bağlantılar (Google Maps vb.) kendi gizlilik politikalarına tabidir. 
                  Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">6. Değişiklikler</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler bu sayfada yayınlanacaktır.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">7. İletişim</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Gizlilik politikamız hakkında sorularınız için: <strong>info@rekortorna.com</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
