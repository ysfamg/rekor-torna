import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { getServices } from "@/lib/services"

// Sayfayı dinamik yap
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HizmetlerPage() {
  const services = await getServices()

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">HİZMETLERİMİZ</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profesyonel Hizmetler
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Gemi sanayinin tüm torna ve hidrolik ihtiyaçları için kapsamlı çözümler sunuyoruz
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {services.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400">
                Henüz hizmet bilgisi bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <Link key={service.slug} href={`/hizmetler/${service.slug}`}>
                    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-orange-500/50 dark:hover:border-orange-500/50 overflow-hidden h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:from-orange-500 group-hover:to-orange-600 transition-all flex-shrink-0">
                            <IconComponent className="w-8 h-8 text-orange-400 group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                            <CardDescription className="text-base">{service.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                          {service.detailedDescription}
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white group/btn">
                          Detaylı Bilgi
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
