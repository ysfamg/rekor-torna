"use client"

export const dynamic = 'force-dynamic'
export const revalidate = 0

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, ChevronRight, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SiteSettings {
  phone: string
  phone2: string
  email: string
  address: string
  mapEmbedUrl: string
  mapUrl: string
  workingHours: string
}

export default function IletisimPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<SiteSettings>({
    phone: "+90 532 123 45 67",
    phone2: "",
    email: "info@rekortorna.com",
    address: "Tuzla Organize Sanayi Bölgesi, İstanbul",
    mapEmbedUrl: "",
    mapUrl: "",
    workingHours: "Pazartesi - Cuma: 08:00 - 18:00",
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Torna İşleri",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch site settings
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings(prev => ({
            ...prev,
            phone: data.phone || prev.phone,
            phone2: data.phone2 || prev.phone2,
            email: data.email || prev.email,
            address: data.address || prev.address,
            mapEmbedUrl: data.mapEmbedUrl || prev.mapEmbedUrl,
            mapUrl: data.mapUrl || prev.mapUrl,
            workingHours: data.workingHours || prev.workingHours,
          }))
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Mesajınız Gönderildi!",
          description: data.message,
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "Torna İşleri",
          message: "",
        })
      } else {
        toast({
          title: "Hata",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Hata",
        description: "Mesajınız gönderilirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">İLETİŞİM</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Tüm sorularınız için bize ulaşın, en kısa sürede dönüş yapalım
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="border-slate-200 dark:border-slate-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Teklif Alın</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Ad Soyad *
                        </label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder="Adınız Soyadınız" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Telefon
                        </label>
                        <Input 
                          id="phone"
                          name="phone"
                          placeholder="Telefon Numaranız" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        E-posta *
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder="E-posta Adresiniz" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Hizmet Türü
                      </label>
                      <select 
                        id="serviceType"
                        name="serviceType"
                        className="flex h-10 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                      >
                        <option value="Torna İşleri">Torna İşleri</option>
                        <option value="Hidrolik Sistemler">Hidrolik Sistemler</option>
                        <option value="Parça Temini">Parça Temini</option>
                        <option value="Özel Üretim">Özel Üretim</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Mesajınız *
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="Detayları yazın..." 
                        rows={5} 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Gönderiliyor...</>
                      ) : (
                        <><ChevronRight className="w-5 h-5 mr-2" />Gönder</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Telefon</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{settings.phone}</p>
                        {settings.phone2 && (
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{settings.phone2}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">E-posta</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{settings.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="relative h-80 bg-slate-100 dark:bg-slate-800">
                  {settings.mapEmbedUrl ? (
                    <iframe 
                      src={settings.mapEmbedUrl}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <MapPin className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Rekor Torna</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{settings.address}</p>
                      </div>
                    </div>
                    {settings.mapUrl && (
                      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                        <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          Yol Tarifi
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">Çalışma Saatleri</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{settings.workingHours}</p>
                    </div>
                    <Badge className="border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10">Açık</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
