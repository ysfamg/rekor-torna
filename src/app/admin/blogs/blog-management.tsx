"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Eye,
  EyeOff,
  Loader2,
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  imageUrl: string | null
  published: boolean
  featured: boolean
  viewCount: number
  createdAt: Date
}

interface BlogManagementProps {
  initialBlogs: Blog[]
}

export function BlogManagement({ initialBlogs }: BlogManagementProps) {
  const { toast } = useToast()
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Genel",
    published: false,
    featured: false,
  })

  const categories = ["Torna", "Hidrolik", "Parça", "Bakım", "Genel"]

  const handleOpenDialog = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog)
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        published: blog.published,
        featured: blog.featured,
      })
    } else {
      setEditingBlog(null)
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "Genel",
        published: false,
        featured: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({ title: "Hata", description: "Başlık ve içerik zorunludur", variant: "destructive" })
      return
    }

    setIsSaving(true)
    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      
      const url = editingBlog ? `/api/admin/blogs/${editingBlog.id}` : "/api/admin/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug,
        }),
      })

      if (response.ok) {
        const savedBlog = await response.json()
        if (editingBlog) {
          setBlogs(blogs.map((b) => (b.id === savedBlog.id ? savedBlog : b)))
        } else {
          setBlogs([savedBlog, ...blogs])
        }
        setIsDialogOpen(false)
        toast({
          title: "Başarılı",
          description: editingBlog ? "Blog güncellendi" : "Blog oluşturuldu",
        })
      }
    } catch {
      toast({ title: "Hata", description: "İşlem başarısız", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return
    setDeletingId(id)
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" })
      if (response.ok) {
        setBlogs(blogs.filter((b) => b.id !== id))
        toast({ title: "Başarılı", description: "Blog silindi" })
      }
    } catch {
      toast({ title: "Hata", description: "Silme başarısız", variant: "destructive" })
    } finally {
      setDeletingId(null)
    }
  }

  const handleTogglePublished = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      })
      if (response.ok) {
        setBlogs(blogs.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b)))
      }
    } catch {
      toast({ title: "Hata", variant: "destructive" })
    }
  }

  const handleToggleFeatured = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !blog.featured }),
      })
      if (response.ok) {
        setBlogs(blogs.map((b) => (b.id === blog.id ? { ...b, featured: !b.featured } : b)))
      }
    } catch {
      toast({ title: "Hata", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Yazıları</h1>
          <p className="text-slate-500 text-sm">Blog içeriklerini yönetin</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Yazı
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{blog.title}</h3>
                    {blog.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{blog.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{blog.category}</Badge>
                    <Badge variant={blog.published ? "default" : "secondary"} className={blog.published ? "bg-green-500" : ""}>
                      {blog.published ? "Yayında" : "Taslak"}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {blog.viewCount} görüntülenme
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleToggleFeatured(blog)}>
                    <Star className={`w-4 h-4 ${blog.featured ? "text-yellow-500 fill-yellow-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleTogglePublished(blog)}>
                    {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(blog.id)}
                    disabled={deletingId === blog.id}
                  >
                    {deletingId === blog.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Blog Düzenle" : "Yeni Blog Yazısı"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium">Başlık</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Özet</label>
              <Textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Kategori</label>
              <select
                className="w-full h-10 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">İçerik (Markdown)</label>
              <Textarea
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="## Başlık

Paragraf...

- Liste öğesi 1
- Liste öğesi 2"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                Yayınla
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                Öne Çıkar
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Kaydet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
