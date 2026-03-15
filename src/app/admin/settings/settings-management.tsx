"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, Phone, Mail, MapPin, Clock, Globe, Upload, Image as ImageIcon, Trash2, Plus, MinusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { toast as sonnerToast } from "sonner"

interface SettingsManagementProps {
  initialSettings: Record<string, string>
}

interface Stat {
  value: string
  label: string
}

export function SettingsManagement({ initialSettings }: SettingsManagementProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse stats from settings
  const parseStats = (statsStr: string): Stat[] => {
    try {
      return JSON.parse(statsStr) || [
        { value: "20+", label: "Yıllık Tecrübe" },
        { value: "500+", label: "Mutlu Müşteri" },
        { value: "1000+", label: "Tamamlanan Proje" },
        { value: "7/24", label: "Destek Hizmeti" },
      ]
    } catch {
      return [
        { value: "20+", label: "Yıllık Tecrübe" },
        { value: "500+", label: "Mutlu Müşteri" },
        { value: "1000+", label: "Tamamlanan Proje" },
        { value: "7/24", label: "Destek Hizmeti" },
      ]
    }
  }

  const [settings, setSettings] = useState({
    site_name: initialSettings.site_name || "Rekor Torna Hidrolik",
    site_tagline: initialSettings.site_tagline || "TORNA HİDROLİK",
    logo_url: initialSettings.logo_url || "",
    phone: initialSettings.phone || "",
    email: initialSettings.email || "",
    address: initialSettings.address || "",
    working_hours: initialSettings.working_hours || "",
    map_embed_url: initialSettings.map_embed_url || "",
    map_directions_url: initialSettings.map_directions_url || "",
    footer_description: initialSettings.footer_description || "",
    stats: initialSettings.stats || JSON.stringify([
      { value: "20+", label: "Yıllık Tecrübe" },
      { value: "500+", label: "Mutlu Müşteri" },
      { value: "1000+", label: "Tamamlanan Proje" },
      { value: "7/24", label: "Destek Hizmeti" },
    ]),
  })

  const [stats, setStats] = useState<Stat[]>(parseStats(settings.stats))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setSettings({ ...settings, logo_url: data.url })
        sonnerToast.success("Logo yüklendi")
      } else {
        sonnerToast.error("Logo yüklenemedi")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      sonnerToast.error("Logo yüklenemedi")
    } finally {
      setUploading(false)
    }
  }

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const newStats = [...stats]
    newStats[index][field] = value
    setStats(newStats)
    setSettings({ ...settings, stats: JSON.stringify(newStats) })
  }

  const addStat = () => {
    const newStats = [...stats, { value: "", label: "" }]
    setStats(newStats)
    setSettings({ ...settings, stats: JSON.stringify(newStats) })
  }

  const removeStat = (index: number) => {
    const newStats = stats.filter((_, i) => i !== index)
    setStats(newStats)
    setSettings({ ...settings, stats: JSON.stringify(newStats) })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Ayarlar kaydedildi",
        })
        sonnerToast.success("Ayarlar kaydedildi")
      } else {
        toast({
          title: "Hata",
          description: "Ayarlar kaydedilemedi",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Hata",
        description: "Bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Site Ayarları</h1>
          <p className="text-slate-500 text-sm">Genel site ayarlarını yönetin</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Kaydet
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Site Info & Logo */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-500" />
              Site Bilgileri
            </CardTitle>
            <CardDescription>Genel site ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Site Logosu</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              {settings.logo_url ? (
                <div className="relative inline-block">
                  <img
                    src={settings.logo_url}
                    alt="Logo"
                    className="h-16 w-auto rounded-lg border p-2 bg-white"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => setSettings({ ...settings, logo_url: "" })}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-500" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500">Logo yüklemek için tıklayın</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Site Adı</label>
              <Input
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Slogan</label>
              <Input
                value={settings.site_tagline}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Footer Açıklaması</label>
              <Textarea
                rows={3}
                value={settings.footer_description}
                onChange={(e) => setSettings({ ...settings, footer_description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              İstatistikler
            </CardTitle>
            <CardDescription>Ana sayfadaki istatistik kartları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  placeholder="Değer (örn: 20+)"
                  className="w-24"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="Açıklama (örn: Yıllık Tecrübe)"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStat(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <MinusCircle className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addStat}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              İstatistik Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-500" />
              İletişim Bilgileri
            </CardTitle>
            <CardDescription>İletişim bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" /> Telefon
              </label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+90 362 XXX XX XX"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> E-posta
              </label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@rekortorna.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Adres
              </label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Samsun, Türkiye"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" /> Çalışma Saatleri
              </label>
              <Input
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                placeholder="Pzt-Cuma: 08:00-18:00 • Cmt: 09:00-14:00"
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Settings */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Harita Ayarları
            </CardTitle>
            <CardDescription>Google Maps konum ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Google Maps Embed URL</label>
              <Textarea
                rows={2}
                value={settings.map_embed_url}
                onChange={(e) => setSettings({ ...settings, map_embed_url: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-slate-500 mt-1">
                Google Maps'ten "Harita embed" seçeneği ile alınan URL
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Yol Tarifi URL</label>
              <Input
                value={settings.map_directions_url}
                onChange={(e) => setSettings({ ...settings, map_directions_url: e.target.value })}
                placeholder="https://www.google.com/maps/dir/?api=1&destination=..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
