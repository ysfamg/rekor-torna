"use client"

import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isLoginPage = pathname === "/admin/login"

  // Login sayfası için auth kontrolü yapma
  if (isLoginPage) {
    return <>{children}</>
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader user={session?.user} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
