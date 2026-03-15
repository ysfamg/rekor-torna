import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, FileText, Mail, Eye, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { db } from "@/lib/db"

async function getStats() {
  const [
    servicesCount,
    blogsCount,
    contactsCount,
    newContactsCount,
    blogViews,
  ] = await Promise.all([
    db.service.count({ where: { isActive: true } }),
    db.blog.count({ where: { published: true } }),
    db.contact.count(),
    db.contact.count({ where: { status: "new" } }),
    db.blog.aggregate({ _sum: { viewCount: true } }),
  ])

  return {
    servicesCount,
    blogsCount,
    contactsCount,
    newContactsCount,
    blogViews: blogViews._sum.viewCount || 0,
  }
}

async function getRecentContacts() {
  return db.contact.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })
}

async function getRecentBlogs() {
  return db.blog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      viewCount: true,
      published: true,
      createdAt: true,
    },
  })
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentContacts = await getRecentContacts()
  const recentBlogs = await getRecentBlogs()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Toplam Hizmet</CardTitle>
            <Wrench className="w-5 h-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.servicesCount}</div>
            <p className="text-xs opacity-75 mt-1">Aktif hizmet</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Blog Yazıları</CardTitle>
            <FileText className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.blogsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Yayınlanan yazı</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Mesajlar</CardTitle>
            <Mail className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.contactsCount}</div>
            <p className="text-xs text-orange-500 mt-1">{stats.newContactsCount} yeni mesaj</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Toplam Görüntülenme</CardTitle>
            <Eye className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.blogViews}</div>
            <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Blog görüntülenme
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Contacts */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Son Mesajlar</CardTitle>
            <a href="/admin/contacts" className="text-sm text-orange-500 hover:text-orange-600">
              Tümünü Gör
            </a>
          </CardHeader>
          <CardContent>
            {recentContacts.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Henüz mesaj yok</p>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      contact.status === "new" ? "bg-orange-500" : 
                      contact.status === "read" ? "bg-blue-500" : "bg-green-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{contact.name}</p>
                        <span className="text-xs text-slate-500 flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {new Date(contact.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{contact.email}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-1">{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Blogs */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Son Blog Yazıları</CardTitle>
            <a href="/admin/blogs" className="text-sm text-orange-500 hover:text-orange-600">
              Tümünü Gör
            </a>
          </CardHeader>
          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Henüz blog yazısı yok</p>
            ) : (
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className={`w-2 h-2 mt-2 rounded-full ${blog.published ? "bg-green-500" : "bg-yellow-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{blog.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{blog.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {blog.viewCount}
                        </span>
                        <span className="text-xs flex items-center gap-1">
                          {blog.published ? (
                            <><CheckCircle2 className="w-3 h-3 text-green-500" /> Yayında</>
                          ) : (
                            <><AlertCircle className="w-3 h-3 text-yellow-500" /> Taslak</>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
