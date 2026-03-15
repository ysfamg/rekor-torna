import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, Phone, Menu, X } from "lucide-react"
import { db } from "@/lib/db"

export async function Header() {
  // Get settings from database
  let settings = {
    site_name: "REKOR",
    site_tagline: "TORNA HİDROLİK",
    logo_url: "",
    phone: "",
  }

  try {
    const siteName = await db.siteSetting.findUnique({ where: { key: "site_name" } })
    const siteTagline = await db.siteSetting.findUnique({ where: { key: "site_tagline" } })
    const logoUrl = await db.siteSetting.findUnique({ where: { key: "logo_url" } })
    const phone = await db.siteSetting.findUnique({ where: { key: "phone" } })

    if (siteName) settings.site_name = siteName.value
    if (siteTagline) settings.site_tagline = siteTagline.value
    if (logoUrl) settings.logo_url = logoUrl.value
    if (phone) settings.phone = phone.value
  } catch (error) {
    console.error("Error fetching settings:", error)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {settings.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings.site_name}
                className="h-12 w-auto"
              />
            ) : (
              <>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{settings.site_name}</h1>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold tracking-widest">{settings.site_tagline}</p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              Hizmetler
            </Link>
            <Link href="/galeri" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              Galeri
            </Link>
            <Link href="/hakkimizda" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              Hakkımızda
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/iletisim" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
              İletişim
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {settings.phone && (
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {settings.phone}
                </a>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu settings={settings} />
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ settings }: { settings: { phone: string } }) {
  return (
    <>
      <input type="checkbox" id="mobile-menu" className="hidden peer" />
      <label
        htmlFor="mobile-menu"
        className="md:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
      >
        <X className="w-6 h-6 hidden peer-checked:block" />
        <Menu className="w-6 h-6 block peer-checked:hidden" />
      </label>

      <nav className="hidden peer-checked:block md:hidden py-4 border-t border-slate-200 dark:border-slate-800 mt-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            Ana Sayfa
          </Link>
          <Link href="/hizmetler" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            Hizmetler
          </Link>
          <Link href="/galeri" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            Galeri
          </Link>
          <Link href="/hakkimizda" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            Hakkımızda
          </Link>
          <Link href="/blog" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            Blog
          </Link>
          <Link href="/iletisim" className="text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition-colors font-medium">
            İletişim
          </Link>
          {settings.phone && (
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-2">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                <Phone className="w-4 h-4 mr-2" />
                {settings.phone}
              </a>
            </Button>
          )}
        </div>
      </nav>
    </>
  )
}
