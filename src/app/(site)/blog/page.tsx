import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Eye } from "lucide-react"
import { getBlogs } from "@/lib/services"

// Sayfayı dinamik yap
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">BLOG</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog & Haberler
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Gemi sanayi hakkında güncel yazılar ve haberler
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400">
                Henüz blog yazısı bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-orange-500/50 h-full overflow-hidden">
                    {post.imageUrl && (
                      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{post.category}</Badge>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                          {post.viewCount > 0 && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.viewCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-500 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button variant="ghost" className="p-0 h-auto text-orange-500 hover:text-orange-600 group/btn">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
