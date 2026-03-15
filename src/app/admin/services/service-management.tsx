"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  slug: string
  shortTitle: string
  description: string
  iconName: string
  features: string
  detailedDescription: string
  applications: string
  equipment: string
  benefits: string
  order: number
  isActive: boolean
}

interface ServiceManagementProps {
  initialServices: Service[]
}

export function ServiceManagement({ initialServices }: ServiceManagementProps) {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    shortTitle: "",
    description: "",
    iconName: "Cog",
    features: "",
    detailedDescription: "",
    applications: "",
    equipment: "",
    benefits: "",
  })

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        shortTitle: service.shortTitle,
        description: service.description,
        iconName: service.iconName,
        features: service.features,
        detailedDescription: service.detailedDescription,
        applications: service.applications,
        equipment: service.equipment,
        benefits: service.benefits,
      })
    } else {
      setEditingService(null)
      setFormData({
        title: "",
        shortTitle: "",
        description: "",
        iconName: "Cog",
        features: "[]",
        detailedDescription: "",
        applications: "[]",
        equipment: "[]",
        benefits: "[]",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services"
      const method = editingService ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        }),
      })

      if (response.ok) {
        const savedService = await response.json()
        if (editingService) {
          setServices(services.map((s) => (s.id === savedService.id ? savedService : s)))
        } else {
          setServices([...services, savedService])
        }
        setIsDialogOpen(false)
        toast({
          title: "Başarılı",
          description: editingService ? "Hizmet güncellendi" : "Hizmet oluşturuldu",
        })
      } else {
        toast({ title: "Hata", description: "İşlem başarısız", variant: "destructive" })
      }
    } catch {
      toast({ title: "Hata", description: "Bir hata oluştu", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return
    setDeletingId(id)
    try {
      const response = await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
      if (response.ok) {
        setServices(services.filter((s) => s.id !== id))
        toast({ title: "Başarılı", description: "Hizmet silindi" })
      }
    } catch {
      toast({ title: "Hata", description: "Silme işlemi başarısız", variant: "destructive" })
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (service: Service) => {
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      })
      if (response.ok) {
        setServices(services.map((s) => (s.id === service.id ? { ...s, isActive: !s.isActive } : s)))
      }
    } catch {
      toast({ title: "Hata", description: "İşlem başarısız", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hizmetler</h1>
          <p className="text-slate-500 text-sm">Site hizmetlerini yönetin</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Hizmet
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                    <Badge variant={service.isActive ? "default" : "secondary"} className={service.isActive ? "bg-green-500" : ""}>
                      {service.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">{service.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(service)}
                  >
                    {service.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(service.id)}
                    disabled={deletingId === service.id}
                  >
                    {deletingId === service.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? "Hizmet Düzenle" : "Yeni Hizmet"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Başlık</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Kısa Başlık</label>
                <Input
                  value={formData.shortTitle}
                  onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Açıklama</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Detaylı Açıklama</label>
              <Textarea
                rows={4}
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Özellikler (JSON dizi)</label>
              <Textarea
                rows={2}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder='["Özellik 1", "Özellik 2"]'
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Kaydet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
