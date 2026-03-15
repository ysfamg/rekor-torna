import { db } from "./src/lib/db"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@rekortorna.com" },
    update: {},
    create: {
      email: "admin@rekortorna.com",
      password: hashedPassword,
      name: "Admin",
      role: "superadmin",
      isActive: true,
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // Create services
  const services = [
    {
      title: "Torna İşleri",
      slug: "torna",
      shortTitle: "Torna İşleri",
      description: "Profesyonel torna hizmetleri",
      iconName: "Cog",
      features: JSON.stringify(["CNC torna imalatı", "Hassas işçilik", "Mil ve yatak üretimi"]),
      detailedDescription: "Gemi sanayiinin tüm torna ihtiyaçları için modern CNC makinelerimiz ve uzman kadromuzla hizmet veriyoruz. Mil imalatı, yatak boğma, flanş işleme, porya çekme ve tüm torna operasyonlarında yüksek hassasiyet ve kalite garantisi sunuyoruz.",
      applications: JSON.stringify([
        "Dizel motor mil imalatı ve onarımı",
        "Türbin mil tornalama işlemleri",
        "Pompa mil ve gövde işleme",
        "Flanş ve kaplin üretimi",
        "Sterntube (kızak) burçları",
        "Porya ve yatak boğma"
      ]),
      equipment: JSON.stringify([
        "CNC Torna Tezgahları (Ø 1000mm x 6000mm)",
        "Konvansiyonel Torna Tezgahları",
        "Hassas Ölçüm Cihazları",
        "Yüzey Sertleştirme Ekipmanları"
      ]),
      benefits: JSON.stringify([
        { title: "Yüksek Hassasiyet", description: "±0.01mm tolerans ile üretim" },
        { title: "Hızlı Teslimat", description: "Acil işlerde 24 saat içinde" },
        { title: "Kalite Garantisi", description: "Tüm işlerde 1 yıl garanti" }
      ]),
      order: 1,
    },
    {
      title: "Hidrolik Sistemler",
      slug: "hidrolik",
      shortTitle: "Hidrolik Sistemler",
      description: "Komple hidrolik çözümler",
      iconName: "Wrench",
      features: JSON.stringify(["Hidrolik pompa tamiri", "Silindir bakımı", "Sistem montajı"]),
      detailedDescription: "Gemi hidrolik sistemlerinin tasarım, montaj, bakım ve onarımında uzmanlaşmış ekibimizle hizmetinizdeyiz. Vinç hidroliği, dümen hidroliği, baştankara hidroliği ve tüm gemi hidrolik sistemleri için profesyonel çözümler sunuyoruz.",
      applications: JSON.stringify([
        "Gemi vincileri hidrolik sistemleri",
        "Dümen makinesi hidrolik üniteleri",
        "Baştankara hidrolik sistemleri",
        "Kapı ve rampa hidrolikleri",
        "Hidrolik direksiyon sistemleri",
        "Sea chest valfleri ve aktuatörleri"
      ]),
      equipment: JSON.stringify([
        "Hidrolik Test Bench (700 bar)",
        "Silindir Baskı Presi",
        "Honlama Makinesi",
        "Segman Takım Setleri"
      ]),
      benefits: JSON.stringify([
        { title: "Orijinal Parça", description: "Tüm markalarda orijinal yedek parça" },
        { title: "Kapsamlık", description: "Tüm hidrolik marka ve modelleri" },
        { title: "Deneyim", description: "20+ yıllık hidrolik tecrübesi" }
      ]),
      order: 2,
    },
    {
      title: "Parça Temini",
      slug: "parca",
      shortTitle: "Parça Temini",
      description: "Orijinal ve uyumlu parçalar",
      iconName: "Package",
      features: JSON.stringify(["Gemi yedek parçaları", "İthal parça tedariki", "Hızlı teslimat"]),
      detailedDescription: "Dünya genelinde gemi yedek parça tedarik ağımız ile ihtiyaç duyduğunuz her türlü parçayı hızlı ve güvenilir şekilde temin ediyoruz. Motor yedek parçaları, hidrolik elemanlar, elektrik malzemeleri ve daha fazlası için tek adresiniz.",
      applications: JSON.stringify([
        "Ana ve yardımcı motor yedek parçaları",
        "Hidrolik pompa ve motor parçaları",
        "Piston, segman, gömlek setleri",
        "Enjektör ve pompa elemanları",
        "Türbin yedek parçaları",
        "Elektrik ve otomasyon malzemeleri"
      ]),
      equipment: JSON.stringify([
        "Kapsamlı Tedarik Ağı",
        "Hızlı Gümrük İşlemleri",
        "Kalıntı Analiz Laboratuvarı",
        "Merkez Stok Deposu"
      ]),
      benefits: JSON.stringify([
        { title: "Hızlı Teslimat", description: "Acil parçalarda uçak kargo" },
        { title: "Sertifikalı", description: "Class onaylı parça temini" },
        { title: "Danışmanlık", description: "Doğru parça seçiminde destek" }
      ]),
      order: 3,
    },
    {
      title: "Özel Üretim",
      slug: "ozel",
      shortTitle: "Özel Üretim",
      description: "Özel tasarım imalatlar",
      iconName: "Hammer",
      features: JSON.stringify(["Prototip üretimi", "Özel ölçü parçalar", "Teknik danışmanlık"]),
      detailedDescription: "Standart dışı parça ihtiyaçlarınız için özel tasarım ve üretim hizmeti sunuyoruz. Teknik çizim veya numune üzerinden çalışarak, ihtiyacınıza özel parçaları tasarlıyor ve üretiyoruz. Mühendislik desteği ile kaliteli çözümler.",
      applications: JSON.stringify([
        "Obsolet parçaların yeniden üretimi",
        "Modifikasyon ve iyileştirme parçaları",
        "Özel flanş ve bağlantı elemanları",
        "Testere dişli miller ve dişliler",
        "Performans artırıcı parçalar",
        "Prototip ve deneysel üretimler"
      ]),
      equipment: JSON.stringify([
        "CAD/CAM Tasarım Sistemi",
        "CNC İşleme Merkezi",
        "TIG/MIG Kaynak Üniteleri",
        "3D Ölçüm Cihazı"
      ]),
      benefits: JSON.stringify([
        { title: "Hassas Ölçüm", description: "3D tarama ile kusursuz kopyalama" },
        { title: "Malzeme Uzmanlığı", description: "Doğru malzeme seçimi ve sertleştirme" },
        { title: "Mühendislik", description: "Tasarım ve optimizasyon desteği" }
      ]),
      order: 4,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }
  console.log("✅ Services created")

  // Create blog posts
  const blogs = [
    {
      title: "Gemi Sanayinde Torna İşlemleri: Kapsamlı Rehber",
      slug: "gemi-sanayinde-torna",
      excerpt: "Hassas torna işlemlerinin gemi sanayindeki önemi ve uygulama alanları.",
      content: `Gemi sanayinde torna işlemleri, denizcilik sektörünün en temel üretim süreçlerinden birini oluşturmaktadır. Bu makalemizde gemi torna işlemlerinin önemini, uygulama alanlarını ve dikkat edilmesi gereken hususları detaylı olarak inceleyeceğiz.

## Torna İşlemlerinin Önemi

Gemi sanayinde mil imalatı, flanş işleme, yatak boğma gibi kritik işlemler torna tezgahlarında gerçekleştirilir. Bu işlemlerin hassasiyeti, geminin güvenliğini ve performansını doğrudan etkiler.

### Uygulama Alanları

- **Dizel Motor Milleri:** Ana ve yardımcı motor millerinin imalatı ve onarımı
- **Türbin Milleri:** Buhar ve gaz türbinlerinin mil tornalama işlemleri
- **Pompa Milleri:** Santrifüj ve pistonlu pompaların mil işleme
- **Flanş ve Kaplinler:** Bağlantı elemanlarının hassas işlenmesi

## Kullanılan Teknolojiler

Modern gemi sanayi işletmelerinde CNC torna tezgahları yaygın olarak kullanılmaktadır. Bu tezgahlar sayesinde ±0.01mm hassasiyetle üretim yapmak mümkündür.

Rekor Torna Hidrolik olarak, 20 yılı aşkın tecrübemizle gemi sanayinin tüm torna ihtiyaçlarına profesyonel çözümler sunuyoruz.`,
      category: "Torna",
      published: true,
      featured: true,
    },
    {
      title: "Hidrolik Sistemlerin Gemi Performansına Etkisi",
      slug: "hidrolik-sistem-performans",
      excerpt: "Gemi hidrolik sistemlerinde düzenli bakım ve performans optimizasyonu.",
      content: `Gemi hidrolik sistemleri, deniz araçlarının birçok kritik fonksiyonunu yerine getirmektedir. Vinciler, dümen sistemleri, baştankara ekipmanları ve daha birçok sistem hidrolik güçle çalışmaktadır.

## Hidrolik Sistemlerin Önemi

Hidrolik sistemler, yüksek güç aktarımı gerektiren uygulamalarda ideal çözümler sunar. Gemi sanayinde bu sistemlerin güvenli çalışması, operasyonel güvenlik açısından kritiktir.

### Bakım Gereklilikleri

- **Yağ Değişimi:** Belirli periyotlarla hidrolik yağının değiştirilmesi
- **Filtre Temizliği:** Sistemin temiz kalması için filtre bakımı
- **Sızıntı Kontrolü:** Silindir ve bağlantı noktalarının kontrolü
- **Basınç Testi:** Sistem basıncının düzenli kontrolü

Rekor Torna Hidrolik olarak, tüm gemi hidrolik sistemleriniz için profesyonel bakım ve onarım hizmeti sunmaktayız.`,
      category: "Hidrolik",
      published: true,
      featured: true,
    },
    {
      title: "Denizcilikte Parça Temini ve Tedarik Zinciri",
      slug: "parca-temini",
      excerpt: "Gemi yedek parça temininde dikkat edilmesi gerekenler ve tedarik zinciri yönetimi.",
      content: `Gemi yedek parça temini, denizcilik operasyonlarının kesintisiz sürdürülmesi için kritik öneme sahiptir. Bu makalemizde doğru parça temini ve tedarik zinciri yönetimi konularını ele alacağız.

## Parça Temininde Dikkat Edilmesi Gerekenler

### 1. Orijinallik
Parçanın orijinal veya onaylı muadil olması, performans ve güvenlik açısından hayati önem taşır.

### 2. Sertifikasyon
Class onaylı parçalar, sınıf kuruluşlarının gereksinimlerini karşılar.

### 3. Uyumluluk
Parçanın teknik spesifikasyonlara tam uyumu gereklidir.

Rekor Torna Hidrolik, geniş tedarik ağı ile gemi yedek parça ihtiyaçlarınıza hızlı çözümler sunmaktadır.`,
      category: "Parça",
      published: true,
      featured: false,
    },
  ]

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    })
  }
  console.log("✅ Blog posts created")

  // Create site settings
  const settings = [
    { key: "site_name", value: "Rekor Torna Hidrolik", type: "text" },
    { key: "site_tagline", value: "TORNA HİDROLİK", type: "text" },
    { key: "phone", value: "+90 362 XXX XX XX", type: "text" },
    { key: "email", value: "info@rekortorna.com", type: "text" },
    { key: "address", value: "Samsun, Türkiye", type: "text" },
    { key: "working_hours", value: "Pzt-Cuma: 08:00-18:00 • Cmt: 09:00-14:00", type: "text" },
    { key: "map_embed_url", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33935.95456854815!2d36.36827167712543!3d41.25351270938244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4087df87348f9885%3A0xc8040b3c4b1d0ae0!2sRekor%20Torna!5e0!3m2!1str!2str!4v1773402790935!5m2!1str!2str", type: "text" },
    { key: "map_directions_url", value: "https://www.google.com/maps/dir/?api=1&destination=Rekor+Torna+Samsun", type: "text" },
    { key: "footer_description", value: "Gemi sanayinde torna ve hidrolik çözümlerinde 20 yılı aşkın tecrübemizle hizmetinizdeyiz. Kalite ve güven için doğru adrestesiniz.", type: "text" },
    { key: "social_links", value: JSON.stringify({ facebook: "", instagram: "", linkedin: "", twitter: "" }), type: "json" },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    })
  }
  console.log("✅ Site settings created")

  // Create page contents
  const pages = [
    {
      page: "home",
      title: "Ana Sayfa",
      content: JSON.stringify({
        heroTitle: "Torna ve Hidrolik",
        heroSubtitle: "Çözümlerinde Lider",
        heroDescription: "20 yılı aşkın tecrübemizle gemi sanayinde torna işleri, hidrolik sistemler, parça temini ve özel üretim konularında profesyonel çözümler sunuyoruz.",
      }),
    },
    {
      page: "about",
      title: "Hakkımızda",
      content: JSON.stringify({
        title: "Neden Rekor Torna Hidrolik?",
        description: "2000 yılından bu yana gemi sanayine hizmet veren firmamız, torna ve hidrolik alanındaki uzman kadrosu ile kaliteli çözümler sunmaktadır.",
        mission: "Gemi sanayinin torna ve hidrolik alanındaki ihtiyaçlarını, en yüksek kalite standartlarında ve zamanında teslimat prensibiyle karşılayarak, müşterilerimizin operasyonel sürekliliğini sağlamak.",
        vision: "Gemi sanayinde torna ve hidrolik çözümlerinde bölgesel lider konumuna ulaşmak, teknolojik yenilikleri takip ederek hizmet kalitemizi sürekli artırmak.",
      }),
    },
    {
      page: "kvkk",
      title: "KVKK Aydınlatma Metni",
      content: JSON.stringify({
        description: "Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenmektedir.",
      }),
    },
    {
      page: "privacy",
      title: "Gizlilik Politikası",
      content: JSON.stringify({
        description: "Bu gizlilik politikası, web sitemizi ziyaret eden kullanıcıların gizliliğini korumak amacıyla hazırlanmıştır.",
      }),
    },
  ]

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { page: page.page },
      update: page,
      create: page,
    })
  }
  console.log("✅ Page contents created")

  console.log("🎉 Seeding completed!")
  console.log("\n📧 Admin Login Credentials:")
  console.log("   Email: admin@rekortorna.com")
  console.log("   Password: admin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
