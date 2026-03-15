"use client"

import { Badge } from "@/components/ui/badge"

interface DynamicPageContentProps {
  pageKey: string
  title: string | null
  content: string
  showHeader?: boolean
  headerBadge?: string
}

export function DynamicPageContent({ 
  pageKey, 
  title, 
  content, 
  showHeader = true,
  headerBadge 
}: DynamicPageContentProps) {
  const badgeText = headerBadge || pageKey.toUpperCase()
  
  return (
    <>
      {showHeader && (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
              {badgeText}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title || pageKey}
            </h1>
          </div>
        </section>
      )}
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            className="prose prose-lg dark:prose-invert max-w-4xl mx-auto prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </>
  )
}
