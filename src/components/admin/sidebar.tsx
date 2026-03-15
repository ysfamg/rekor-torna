"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings, LayoutDashboard, Wrench, FileText, Mail, Settings2, FileCode, LogOut, ImageIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Hizmetler", href: "/admin/services", icon: Wrench },
  { name: "Galeri", href: "/admin/gallery", icon: ImageIcon },
  { name: "Blog Yazıları", href: "/admin/blogs", icon: FileText },
  { name: "Mesajlar", href: "/admin/contacts", icon: Mail },
  { name: "Sayfa İçerikleri", href: "/admin/pages", icon: FileCode },
  { name: "Site Ayarları", href: "/admin/settings", icon: Settings2 },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-slate-900 pt-5 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-white tracking-tight">REKOR</h1>
            <p className="text-xs text-orange-400 tracking-widest">ADMIN</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{session?.user?.name}</p>
            <p className="text-xs text-slate-400">{session?.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <LogOut className="h-5 w-5 text-slate-500 group-hover:text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  )
}
