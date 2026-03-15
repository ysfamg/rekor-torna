import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Phone, Calendar, Eye } from "lucide-react"
import { getBlogBySlug, getBlogs } from "@/lib/services"

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  
  if (!post) {
    return { title: "Yazı Bulunamadı" }
  }

  return {
    title: `${post.title} | Rekor Torna Hidrolik`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  const allBlogs = await getBlogs()
  const relatedPosts = allBlogs
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  // Parse content
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(l => l.startsWith('- '))
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
            ))}
          </ul>
        )
      }
      if (paragraph.match(/^\d\. /)) {
        const items = paragraph.split('\n').filter(l => l.match(/^\d\. /))
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-400 mb-4">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d\. /, '')}</li>
            ))}
          </ol>
        )
      }
      return <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
    })
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tüm Yazılara Dön
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">{post.category}</Badge>
              <div className="flex items-center gap-3 text-sm text-slate-400">
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
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* CTA */}
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <CardContent className="p-8 text-center relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3">Teklif Alın</h3>
                  <p className="text-orange-100 mb-6">
                    Profesyonel torna ve hidrolik çözümlerimiz için bize ulaşın.
                  </p>
                  <Button asChild className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold py-6">
                    <Link href="/iletisim">
                      <Phone className="w-4 h-4 mr-2" />
                      İletişime Geçin
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white pl-4 border-l-4 border-orange-500">İlgili Yazılar</h3>
                  <div className="grid gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <Card className="hover:shadow-xl transition-all cursor-pointer border-slate-200 dark:border-slate-700 hover:border-orange-500/50 group overflow-hidden">
                          <CardContent className="p-0">
                            {relatedPost.imageUrl && (
                              <div className="aspect-video overflow-hidden">
                                <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              </div>
                            )}
                            <div className="p-4">
                              <Badge variant="secondary" className="mb-2 text-xs">{relatedPost.category}</Badge>
                              <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-orange-500 transition-colors">
                                {relatedPost.title}
                              </h4>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
