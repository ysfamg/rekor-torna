import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, Factory, Anchor, Settings, Wrench, Clock } from "lucide-react"
import { getPageContent } from "@/lib/services"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HakkimizdaPage() {
  const pageContent = await getPageContent("about")
  
  const content = pageContent?.content || `
    2000 yılından bu yana gemi sanayine hizmet veren firmamız, torna ve hidrolik alanındaki 
    uzman kadrosu ile kaliteli çözümler sunmaktadır. Müşteri memnuniyetini ön planda tutarak, 
    zamanında teslimat ve rekabetçi fiyat politikamızla sektörde fark yaratmaktayız.

    Modern tesisimizde, son teknoloji CNC makineleri ve uzman personelimiz ile gemi sanayinin 
    tüm torna ve hidrolik ihtiyaçlarına hızlı ve güvenilir çözümler üretiyoruz.
  `

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">HAKKIMIZDA</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {pageContent?.title || "Neden Rekor Torna Hidrolik?"}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Gemi sanayinde kalite ve güvenin adresi
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                20 Yılı Aşkın Tecrübe
              </h2>
              <div className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                {content}
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Kalite Güvencesi</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Tüm işlerimizde en yüksek kalite standartları</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Uzman Kadro</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Tecrübeli mühendis ve teknisyenler</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Müşteri Odaklı</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">İhtiyaçlarınıza özel çözümler</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Modern Tesis</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Son teknoloji ekipmanlar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <Anchor className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Gemi</div>
                  <div className="text-slate-400 text-sm">Sanayi Uzmanı</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <Settings className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">CNC</div>
                  <div className="text-slate-400 text-sm">Teknolojisi</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <Wrench className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Hidrolik</div>
                  <div className="text-slate-400 text-sm">Sistem Uzmanı</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <Clock className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Hızlı</div>
                  <div className="text-slate-400 text-sm">Teslimat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Misyonumuz</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Gemi sanayinin torna ve hidrolik alanındaki ihtiyaçlarını, en yüksek kalite standartlarında 
                  ve zamanında teslimat prensibiyle karşılayarak, müşterilerimizin operasyonel sürekliliğini 
                  sağlamak.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Vizyonumuz</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Gemi sanayinde torna ve hidrolik çözümlerinde bölgesel lider konumuna ulaşmak, 
                  teknolojik yenilikleri takip ederek hizmet kalitemizi sürekli artırmak ve 
                  müşteri memnuniyetini en üst seviyede tutmak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
