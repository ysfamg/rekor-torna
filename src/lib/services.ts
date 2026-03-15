import { db } from "./db"
import { Cog, Wrench, Package, Hammer, Droplets, Settings, Star, Gauge, Clock4, Shield, Settings2, Truck, FileCheck, Lightbulb, Ruler, Pipette } from "lucide-react"

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cog,
  Wrench,
  Package,
  Hammer,
  Droplets,
  Settings,
  Star,
}

// Benefit icon mapping
const benefitIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gauge,
  Clock4,
  Shield,
  Droplets,
  Settings2,
  Star,
  Truck,
  FileCheck,
  Lightbulb,
  Ruler,
  Pipette,
}

export interface ServiceDisplay {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  detailedDescription: string
  applications: string[]
  equipment: string[]
  benefits: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
  order: number
  isActive: boolean
}

export async function getServices(): Promise<ServiceDisplay[]> {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })

    return services.map((service) => ({
      id: service.id,
      slug: service.slug,
      title: service.title,
      shortTitle: service.shortTitle,
      description: service.description,
      icon: iconMap[service.iconName] || Cog,
      features: safeParseJSON(service.features, []),
      detailedDescription: service.detailedDescription,
      applications: safeParseJSON(service.applications, []),
      equipment: safeParseJSON(service.equipment, []),
      benefits: parseBenefits(service.benefits),
      order: service.order,
      isActive: service.isActive,
    }))
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDisplay | null> {
  try {
    const service = await db.service.findUnique({
      where: { slug },
    })

    if (!service) return null

    return {
      id: service.id,
      slug: service.slug,
      title: service.title,
      shortTitle: service.shortTitle,
      description: service.description,
      icon: iconMap[service.iconName] || Cog,
      features: safeParseJSON(service.features, []),
      detailedDescription: service.detailedDescription,
      applications: safeParseJSON(service.applications, []),
      equipment: safeParseJSON(service.equipment, []),
      benefits: parseBenefits(service.benefits),
      order: service.order,
      isActive: service.isActive,
    }
  } catch (error) {
    console.error("Error fetching service:", error)
    return null
  }
}

function safeParseJSON(str: string, fallback: string[] = []) {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

function parseBenefits(benefitsStr: string): { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[] {
  try {
    const benefits = JSON.parse(benefitsStr)
    if (Array.isArray(benefits) && benefits.length > 0) {
      if (typeof benefits[0] === "object" && benefits[0] !== null) {
        return benefits.map((b: { icon?: string; title: string; description?: string }) => ({
          icon: benefitIconMap[b.icon || "Star"] || Star,
          title: b.title || "",
          description: b.description || "",
        }))
      }
      return benefits.map((b: string) => ({
        icon: Star,
        title: b,
        description: "",
      }))
    }
    return []
  } catch {
    return []
  }
}

export interface BlogDisplay {
  id: string
  title: string
  excerpt: string
  category: string
  slug: string
  content: string
  imageUrl: string | null
  published: boolean
  featured: boolean
  viewCount: number
  createdAt: Date
}

export async function getBlogs(): Promise<BlogDisplay[]> {
  try {
    const blogs = await db.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })

    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      slug: blog.slug,
      content: blog.content,
      imageUrl: blog.imageUrl,
      published: blog.published,
      featured: blog.featured,
      viewCount: blog.viewCount,
      createdAt: blog.createdAt,
    }))
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDisplay | null> {
  try {
    const blog = await db.blog.findUnique({
      where: { slug },
    })

    if (!blog) return null

    await db.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    })

    return {
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      slug: blog.slug,
      content: blog.content,
      imageUrl: blog.imageUrl,
      published: blog.published,
      featured: blog.featured,
      viewCount: blog.viewCount + 1,
      createdAt: blog.createdAt,
    }
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

export interface SiteSettings {
  siteName: string
  siteTagline: string
  siteDescription: string
  logoUrl: string
  phone: string
  phone2: string
  email: string
  address: string
  mapUrl: string
  mapEmbedUrl: string
  workingHours: string
  footerDescription: string
  stats: { value: string; label: string }[]
  socialLinks: { facebook: string; instagram: string; linkedin: string; twitter: string }
}

export interface PageContentDisplay {
  id: string
  page: string
  title: string | null
  content: string
  seoTitle: string | null
  seoDesc: string | null
}

export async function getPageContent(page: string): Promise<PageContentDisplay | null> {
  try {
    const pageContent = await db.pageContent.findUnique({
      where: { page },
    })

    if (!pageContent) return null

    return {
      id: pageContent.id,
      page: pageContent.page,
      title: pageContent.title,
      content: pageContent.content,
      seoTitle: pageContent.seoTitle,
      seoDesc: pageContent.seoDesc,
    }
  } catch (error) {
    console.error("Error fetching page content:", error)
    return null
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    siteName: "Rekor Torna Hidrolik",
    siteTagline: "TORNA HİDROLİK",
    siteDescription: "Gemi endüstrisi için profesyonel torna, hidrolik ve parça temin çözümleri",
    logoUrl: "",
    phone: "+90 532 123 45 67",
    phone2: "+90 212 456 78 90",
    email: "info@rekortorna.com",
    address: "Tuzla Organize Sanayi Bölgesi, İstanbul",
    mapUrl: "https://maps.google.com/?q=Tuzla,Istanbul",
    mapEmbedUrl: "",
    workingHours: "Pazartesi - Cuma: 08:00 - 18:00",
    footerDescription: "Gemi sanayinde torna ve hidrolik çözümlerinde 20 yılı aşkın tecrübemizle hizmetinizdeyiz.",
    stats: [
      { value: "20+", label: "Yıllık Tecrübe" },
      { value: "500+", label: "Mutlu Müşteri" },
      { value: "1000+", label: "Tamamlanan Proje" },
      { value: "7/24", label: "Destek Hizmeti" },
    ],
    socialLinks: { facebook: "", instagram: "", linkedin: "", twitter: "" },
  }

  try {
    const settings = await db.siteSetting.findMany()
    const settingsMap: Record<string, string> = {}
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value
    }

    return {
      siteName: settingsMap.site_name || defaultSettings.siteName,
      siteTagline: settingsMap.site_tagline || defaultSettings.siteTagline,
      siteDescription: settingsMap.site_description || defaultSettings.siteDescription,
      logoUrl: settingsMap.logo_url || defaultSettings.logoUrl,
      phone: settingsMap.phone || defaultSettings.phone,
      phone2: settingsMap.phone2 || defaultSettings.phone2,
      email: settingsMap.email || defaultSettings.email,
      address: settingsMap.address || defaultSettings.address,
      mapUrl: settingsMap.map_url || defaultSettings.mapUrl,
      mapEmbedUrl: settingsMap.map_embed_url || defaultSettings.mapEmbedUrl,
      workingHours: settingsMap.working_hours || defaultSettings.workingHours,
      footerDescription: settingsMap.footer_description || defaultSettings.footerDescription,
      stats: settingsMap.stats ? safeParseJSON(settingsMap.stats, defaultSettings.stats) : defaultSettings.stats,
      socialLinks: settingsMap.social_links ? safeParseJSON(settingsMap.social_links, defaultSettings.socialLinks) : defaultSettings.socialLinks,
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return defaultSettings
  }
}
