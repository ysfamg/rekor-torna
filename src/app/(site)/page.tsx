import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Ship, 
  Wrench, 
  Phone, 
  ChevronRight, 
  CheckCircle2,
  ArrowRight,
  Settings
} from "lucide-react"
import { getServices, getSiteSettings } from "@/lib/services"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const settings = await getSiteSettings()
  const services = await getServices()
  
  const stats = settings.stats
  const phone = settings.phone

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
              <Ship className="w-4 h-4 mr-2" />
              Gemi Sanayi Uzmanı
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {settings.siteTagline.split(' ').map((word, i) => (
                i === 0 ? word + " " : <span key={i} className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">{word}</span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {settings.siteDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/30 px-8 py-6 text-lg">
                <Link href="/hizmetler">
                  <Wrench className="w-5 h-5 mr-2" />
                  Hizmetler
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              {phone && (
                <Button size="lg" variant="outline" asChild className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 px-8 py-6 text-lg">
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    {phone}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-slate-800/50 backdrop-blur border-t border-slate-700">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 drop-shadow-lg">{stat.value}</div>
                  <div className="text-slate-300 text-sm mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-600 dark:text-orange-400">HİZMETLERİMİZ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Profesyonel Çözümler
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Gemi sanayinin tüm torna ve hidrolik ihtiyaçları için kapsamlı hizmetler sunuyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => {
              const IconComponent = service.icon
              return (
                <Link key={service.id} href={`/hizmetler/${service.slug}`}>
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-orange-500/50 dark:hover:border-orange-500/50 overflow-hidden h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:from-orange-500 group-hover:to-orange-600 transition-all">
                        <IconComponent className="w-7 h-7 text-orange-400 group-hover:text-white transition-colors" />
                      </div>
                      <CardTitle className="text-xl">{service.shortTitle}</CardTitle>
                      <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 group/btn">
                        Detaylı Bilgi
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Projeniz İçin Bize Ulaşın
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Gemi sanayindeki tüm torna ve hidrolik ihtiyaçlarınız için profesyonel çözümler sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6">
              <Link href="/iletisim">
                İletişime Geçin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-orange-500 bg-white hover:bg-orange-50 hover:text-orange-600 px-8 py-6">
              <Link href="/hakkimizda">
                Hakkımızda
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
