"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
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
import { FileText, Edit, Save, Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

interface PageContent {
  id: string
  page: string
  title: string | null
  content: string
  seoTitle: string | null
  seoDesc: string | null
  updatedAt: string
}

const pageOptions = [
  { value: "home", label: "Ana Sayfa" },
  { value: "about", label: "Hakkımızda" },
  { value: "services", label: "Hizmetler" },
  { value: "contact", label: "İletişim" },
  { value: "kvkk", label: "KVKK" },
  { value: "privacy", label: "Gizlilik Politikası" },
]

export default function PagesManagement() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingPage, setEditingPage] = useState<PageContent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/pages")
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
    } catch (error) {
      console.error("Error fetching pages:", error)
      toast.error("Sayfalar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleSave = async () => {
    if (!editingPage) return
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/pages/${editingPage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      })

      if (response.ok) {
        toast.success("Sayfa içeriği güncellendi")
        setIsDialogOpen(false)
        fetchPages()
      } else {
        toast.error("Kaydetme hatası")
      }
    } catch (error) {
      console.error("Error saving page:", error)
      toast.error("Kaydetme hatası")
    } finally {
      setSaving(false)
    }
  }

  const handleCreate = async (pageKey: string) => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pageKey,
          title: "",
          content: "",
          seoTitle: "",
          seoDesc: "",
        }),
      })

      if (response.ok) {
        toast.success("Sayfa oluşturuldu")
        fetchPages()
      } else {
        toast.error("Oluşturma hatası")
      }
    } catch (error) {
      console.error("Error creating page:", error)
      toast.error("Oluşturma hatası")
    } finally {
      setSaving(false)
    }
  }

  const getExistingPageKeys = () => pages.map(p => p.page)
  const getAvailablePages = () => pageOptions.filter(p => !getExistingPageKeys().includes(p.value))

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sayfa İçerikleri</h1>
          <p className="text-slate-500 mt-1">Site sayfalarının içeriklerini yönetin</p>
        </div>
        
        {getAvailablePages().length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Sayfa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Sayfa Oluştur</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {getAvailablePages().map((page) => (
                  <Button
                    key={page.value}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleCreate(page.value)}
                    disabled={saving}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {page.label}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sayfa Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Henüz sayfa içeriği yok</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sayfa</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>SEO Başlık</TableHead>
                  <TableHead>Güncelleme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => {
                  const pageInfo = pageOptions.find(p => p.value === page.page)
                  return (
                    <TableRow key={page.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{pageInfo?.label || page.page}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {page.title ? (
                          <span className="truncate max-w-xs block">{page.title}</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {page.seoTitle ? (
                          <Badge variant="secondary">Var</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-400">Yok</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {new Date(page.updatedAt).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog open={isDialogOpen && editingPage?.id === page.id} onOpenChange={(open) => {
                          setIsDialogOpen(open)
                          if (!open) setEditingPage(null)
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingPage(page)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Düzenle
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                {pageOptions.find(p => p.value === editingPage?.page)?.label} - İçerik Düzenle
                              </DialogTitle>
                            </DialogHeader>
                            {editingPage && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Sayfa Başlığı</Label>
                                  <Input
                                    value={editingPage.title || ""}
                                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                                    placeholder="Sayfa başlığı"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>İçerik</Label>
                                  <Textarea
                                    value={editingPage.content}
                                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                                    placeholder="Sayfa içeriği (HTML veya düz metin)"
                                    rows={10}
                                  />
                                </div>

                                <div className="border-t pt-4 mt-4">
                                  <h4 className="font-medium mb-3">SEO Ayarları</h4>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>SEO Başlık (Title)</Label>
                                      <Input
                                        value={editingPage.seoTitle || ""}
                                        onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                                        placeholder="SEO başlık"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>SEO Açıklama (Meta Description)</Label>
                                      <Textarea
                                        value={editingPage.seoDesc || ""}
                                        onChange={(e) => setEditingPage({ ...editingPage, seoDesc: e.target.value })}
                                        placeholder="SEO açıklaması"
                                        rows={3}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => {
                                      setIsDialogOpen(false)
                                      setEditingPage(null)
                                    }}
                                  >
                                    İptal
                                  </Button>
                                  <Button 
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-orange-500 hover:bg-orange-600"
                                  >
                                    {saving ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Kaydediliyor...
                                      </>
                                    ) : (
                                      <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Kaydet
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
