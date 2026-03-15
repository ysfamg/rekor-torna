import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Phone } from "lucide-react"
import { blogPosts } from "@/lib/data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  
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
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

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

  // Related posts
  const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)

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
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">{post.category}</Badge>
              <span className="text-slate-400 text-sm">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA */}
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">Teklif Alın</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Profesyonel hizmetlerimiz için bize ulaşın
                  </p>
                  <Button asChild className="w-full bg-white text-orange-600 hover:bg-orange-50">
                    <Link href="/iletisim">
                      <Phone className="w-4 h-4 mr-2" />
                      İletişime Geçin
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">İlgili Yazılar</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-slate-200 dark:border-slate-700">
                          <CardContent className="p-4">
                            <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2">
                              {relatedPost.title}
                            </h4>
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
