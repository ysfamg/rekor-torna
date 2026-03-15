import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Phone, 
  ArrowLeft,
  Settings,
  Star
} from "lucide-react"
import { servicesData } from "@/lib/data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = servicesData.find((s) => s.id === slug)
  
  if (!service) {
    return { title: "Hizmet Bulunamadı" }
  }

  return {
    title: `${service.title} | Rekor Torna Hidrolik`,
    description: service.detailedDescription,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = servicesData.find((s) => s.id === slug)

  if (!service) {
    notFound()
  }

  const IconComponent = service.icon

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link href="/hizmetler" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tüm Hizmetlere Dön
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div>
              <Badge className="mb-2 bg-orange-500/20 text-orange-300 border-orange-500/30">{service.shortTitle}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hakkında</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-orange-500" />
                  Uygulama Alanları
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.applications.map((app, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ekipman ve Kapasite</h2>
                <div className="flex flex-wrap gap-2">
                  {service.equipment.map((eq, idx) => (
                    <Badge key={idx} variant="outline" className="border-orange-500/30 text-orange-600 dark:text-orange-400 py-2 px-4 text-sm">
                      {eq}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500" />
                    Avantajlar
                  </h3>
                  <div className="space-y-4">
                    {service.benefits.map((benefit, idx) => {
                      const BenefitIcon = benefit.icon
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BenefitIcon className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{benefit.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">Teklif Alın</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    {service.title} için hemen teklif alın
                  </p>
                  <Button asChild className="w-full bg-white text-orange-600 hover:bg-orange-50">
                    <Link href="/iletisim">
                      <Phone className="w-4 h-4 mr-2" />
                      İletişime Geçin
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Diğer Hizmetlerimiz</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData.filter(s => s.id !== service.id).map((otherService) => {
              const OtherIcon = otherService.icon
              return (
                <Link key={otherService.id} href={`/hizmetler/${otherService.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-slate-200 dark:border-slate-700 hover:border-orange-500/50">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <OtherIcon className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{otherService.shortTitle}</span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
