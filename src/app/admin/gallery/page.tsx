"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImagePlus, Edit, Trash2, Loader2, Upload, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface GalleryItem {
  id: string
  title: string
  description: string | null
  imageUrl: string
  thumbnail: string | null
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const categories = [
  { value: "torna", label: "Torna İşlemleri" },
  { value: "hidrolik", label: "Hidrolik Sistemler" },
  { value: "parca", label: "Parça Temini" },
  { value: "ozel", label: "Özel Üretim" },
  { value: "genel", label: "Genel" },
  { value: "fabrika", label: "Fabrika" },
]

export default function GalleryManagement() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "genel",
    order: 0,
    isActive: true,
  })

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
      toast.error("Galeri yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({ ...formData, imageUrl: data.url })
        toast.success("Resim yüklendi")
      } else {
        toast.error("Resim yüklenemedi")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error("Resim yüklenemedi")
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: "genel",
      order: 0,
      isActive: true,
    })
    setEditingItem(null)
  }

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
      category: item.category,
      order: item.order,
      isActive: item.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.imageUrl) {
      toast.error("Başlık ve resim zorunludur")
      return
    }

    setSaving(true)
    try {
      const url = editingItem
        ? `/api/admin/gallery/${editingItem.id}`
        : "/api/admin/gallery"
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingItem ? "Galeri güncellendi" : "Galeri eklendi")
        setIsDialogOpen(false)
        resetForm()
        fetchGallery()
      } else {
        toast.error("İşlem başarısız")
      }
    } catch (error) {
      console.error("Error saving gallery:", error)
      toast.error("İşlem başarısız")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu galeri öğesini silmek istediğinize emin misiniz?")) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Galeri silindi")
        fetchGallery()
      } else {
        toast.error("Silme başarısız")
      }
    } catch (error) {
      console.error("Error deleting gallery:", error)
      toast.error("Silme başarısız")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Galeri Yönetimi</h1>
          <p className="text-slate-500 mt-1">Site galerisine resim ekleyin ve yönetin</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ImagePlus className="w-4 h-4 mr-2" />
              Yeni Resim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Resim Düzenle" : "Yeni Resim Ekle"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Resim</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {formData.imageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-500" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">Resim yüklemek için tıklayın</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF, WEBP (max 5MB)</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Resim başlığı"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Resim açıklaması"
                  rows={3}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order */}
              <div className="space-y-2">
                <Label htmlFor="order">Sıra</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              {/* Active */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label>Aktif</Label>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={saving || !formData.imageUrl}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Kaydet"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Henüz galeri öğesi yok</p>
            <p className="text-sm text-slate-400 mt-1">Yeni resim eklemek için yukarıdaki butonu kullanın</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {!item.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Pasif</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <p className="text-sm text-slate-500 truncate">
                      {categories.find(c => c.value === item.category)?.label || item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
