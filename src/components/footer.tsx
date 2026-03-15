import Link from "next/link"
import { Settings } from "lucide-react"
import { servicesData } from "@/lib/data"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">REKOR</h3>
                <p className="text-xs text-orange-400 tracking-widest">TORNA HİDROLİK</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Gemi sanayinde torna ve hidrolik çözümlerinde 20 yılı aşkın tecrübemizle 
              hizmetinizdeyiz. Kalite ve güven için doğru adrestesiniz.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-2 text-slate-400">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link href={`/hizmetler/${service.id}`} className="hover:text-orange-400 transition-colors">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/hakkimizda" className="hover:text-orange-400 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/galeri" className="hover:text-orange-400 transition-colors">Galeri</Link></li>
              <li><Link href="/iletisim" className="hover:text-orange-400 transition-colors">İletişim</Link></li>
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
              <li><Link href="/kvkk" className="hover:text-orange-400 transition-colors">KVKK</Link></li>
              <li><Link href="/gizlilik-politikasi" className="hover:text-orange-400 transition-colors">Gizlilik Politikası</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>© 2024 Rekor Torna Hidrolik. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
