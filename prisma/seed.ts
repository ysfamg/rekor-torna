import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rekortorna.com' },
    update: {},
    create: {
      email: 'admin@rekortorna.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'superadmin',
      isActive: true,
    },
  })

  console.log('Admin user created:', admin.email)

  // Create default site settings
  const settings = [
    { key: 'site_name', value: 'REKOR', type: 'text' },
    { key: 'site_tagline', value: 'TORNA HİDROLİK', type: 'text' },
    { key: 'site_description', value: 'Gemi endüstrisi için profesyonel torna, hidrolik ve parça temin çözümleri', type: 'text' },
    { key: 'logo_url', value: '', type: 'text' },
    { key: 'phone', value: '+90 532 123 45 67', type: 'text' },
    { key: 'phone2', value: '+90 212 456 78 90', type: 'text' },
    { key: 'email', value: 'info@rekortorna.com', type: 'text' },
    { key: 'address', value: 'Tuzla Organize Sanayi Bölgesi, İstanbul', type: 'text' },
    { key: 'map_url', value: 'https://maps.google.com/?q=Tuzla,Istanbul', type: 'text' },
    { key: 'working_hours', value: 'Pazartesi - Cuma: 08:00 - 18:00', type: 'text' },
    { key: 'stats', value: JSON.stringify([
      { value: "20+", label: "Yıllık Tecrübe" },
      { value: "500+", label: "Mutlu Müşteri" },
      { value: "1000+", label: "Tamamlanan Proje" },
      { value: "7/24", label: "Destek Hizmeti" },
    ]), type: 'json' },
    { key: 'social_links', value: JSON.stringify({ facebook: '', instagram: '', linkedin: '', twitter: '' }), type: 'json' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
    console.log('Setting created/updated:', setting.key)
  }

  // Create default services
  const services = [
    {
      title: 'Torna İşlemleri',
      slug: 'torna',
      shortTitle: 'Torna',
      description: 'Gemi motor parçaları ve eksenel mil tornalaması konusunda uzman ekibimizle hassas torna işlemleri sunuyoruz.',
      iconName: 'Cog',
      features: JSON.stringify(['Hassas Tornalama', 'Silindirik Parçalar', 'Konik Tornalama', 'Face Tornalama']),
      detailedDescription: 'Profesyonel torna hizmetlerimiz ile gemi endüstrisinin ihtiyaç duyduğu hassas parçaları üretiyoruz. Modern CNC torna tezgahlarımız ve deneyimli kadromuzla kaliteli çözümler sunuyoruz.',
      applications: JSON.stringify(['Gemi motor parçaları', 'Pervane şaftları', 'Türbin bileşenleri', 'Pompa parçaları']),
      equipment: JSON.stringify(['CNC Torna Tezgahları', 'Konvansiyonel Torna', 'Ölçüm Cihazları']),
      benefits: JSON.stringify(['Yüksek hassasiyet', 'Hızlı teslimat', 'Kalite güvencesi']),
      order: 1,
    },
    {
      title: 'Hidrolik Sistemler',
      slug: 'hidrolik',
      shortTitle: 'Hidrolik',
      description: 'Gemi hidrolik sistemleri, vinç ve düzenek hidroliği konusunda kapsamlı hizmetler sunuyoruz.',
      iconName: 'Droplets',
      features: JSON.stringify(['Hidrolik Pompa', 'Hidrolik Silindir', 'Valf Sistemleri', 'Hidrolik Motor']),
      detailedDescription: 'Gemi hidrolik sistemlerinin tasarım, montaj ve bakımını gerçekleştiriyoruz. Yüksek basınçlı sistemlerde uzmanlaşmış ekibimizle güvenilir çözümler sunuyoruz.',
      applications: JSON.stringify(['Gemi vinçleri', 'Dümen sistemleri', 'Kapı ve rampalar', 'Kazan sistemleri']),
      equipment: JSON.stringify(['Hidrolik Test Cihazları', 'Basınç Ölçerler', 'Temiz Üniteler']),
      benefits: JSON.stringify(['Uzun ömürlü sistemler', 'Düşük bakım maliyeti', '7/24 destek']),
      order: 2,
    },
    {
      title: 'Parça Temini',
      slug: 'parca-temini',
      shortTitle: 'Parça',
      description: 'Gemi sanayii için yedek parça tedariki ve özel üretim parça temin hizmetleri sunuyoruz.',
      iconName: 'Package',
      features: JSON.stringify(['Orijinal Parça', 'Muadil Parça', 'Özel Üretim', 'Acil Tedarik']),
      detailedDescription: 'Gemi sahipleri ve işletmecileri için geniş bir yedek parça ağı sunuyoruz. Orijinal ve muadil parça seçenekleriyle ekonomik çözümler sağlıyoruz.',
      applications: JSON.stringify(['Motor yedek parçaları', 'Hidrolik komponentler', 'Elektrik malzemeleri', 'Güverte ekipmanları']),
      equipment: JSON.stringify(['Parça Katalogları', 'Tedarik Ağı', 'Stok Yönetimi']),
      benefits: JSON.stringify(['Hızlı tedarik', 'Rekabetçi fiyatlar', 'Kalite garantisi']),
      order: 3,
    },
    {
      title: 'Özel Üretim',
      slug: 'ozel-uretim',
      shortTitle: 'Özel',
      description: 'Özel tasarım ve üretim ihtiyaçlarınız için mühendislik destekli çözümler sunuyoruz.',
      iconName: 'Wrench',
      features: JSON.stringify(['Özel Tasarım', 'Prototip Üretim', 'Seri Üretim', 'Mühendislik Desteği']),
      detailedDescription: 'Müşteri özel ihtiyaçlarına yönelik tasarım ve üretim hizmetleri sunuyoruz. Teknik çizimlerden başlayarak prototip ve seri üretim süreçlerini yönetiyoruz.',
      applications: JSON.stringify(['Özel bağlantı elemanları', 'Modifikasyon parçaları', 'Yedek parça üretimi', 'Özel aksesuarlar']),
      equipment: JSON.stringify(['CAD/CAM Sistemleri', 'CNC Tezgahlar', '3D Ölçüm']),
      benefits: JSON.stringify(['Tam uyum çözümler', 'Hızlı prototip', 'Maliyet etkinliği']),
      order: 4,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
    console.log('Service created:', service.slug)
  }

  // Create sample blog posts
  const blogs = [
    {
      title: 'Gemi Hidrolik Sistemlerinde Bakımın Önemi',
      slug: 'gemi-hidrolik-sistemlerinde-bakimin-onemi',
      excerpt: 'Düzenli hidrolik sistem bakımı, gemilerin güvenli çalışmasını sağlar ve maliyetli arızaları önler.',
      content: `Gemi hidrolik sistemleri, modern denizcilik endüstrisinin en kritik bileşenlerinden biridir. Bu sistemler, vinçlerin çalışmasından dümen kontrolüne kadar birçok önemli fonksiyonu yerine getirir.

## Neden Düzenli Bakım Önemlidir?

Düzenli bakım, hidrolik sistemlerin ömrünü uzatır ve beklenmedik arızaları önler. İşte düzenli bakımın faydaları:

- **Maliyet Tasarrufu**: Önleyici bakım, acil onarım maliyetlerinden tasarruf sağlar
- **Güvenlik**: Hidrolik kaçakları ve basınç kayıpları güvenlik riskleri oluşturabilir
- **Verimlilik**: İyi bakılmış sistemler daha az enerji tüketir

## Bakım Periyotları

Hidrolik sistem bakımı şu periyotlarla yapılmalıdır:

1. **Günlük Kontroller**: Yağ seviyesi, sızıntı kontrolü
2. **Haftalık Kontroller**: Filtre durumu, bağlantı elemanları
3. **Aylık Kontroller**: Yağ kalitesi analizi, valf testleri
4. **Yıllık Kontroller**: Kapsamlı sistem muayenesi

Profesyonel bakım hizmeti için bizimle iletişime geçebilirsiniz.`,
      category: 'Bakım',
      published: true,
      featured: true,
    },
    {
      title: 'Torna İşlemlerinde Hassasiyet Standartları',
      slug: 'torna-islemlerinde-hassasiyet-standartlari',
      excerpt: 'Gemi endüstrisinde torna işlemleri için gereken hassasiyet standartları ve kalite kontrol süreçleri.',
      content: `Gemi endüstrisinde torna işlemleri, yüksek hassasiyet gerektiren kritik üretim süreçleridir. Bu makalede, torna işlemlerinde dikkat edilmesi gereken standartları inceleyeceğiz.

## Hassasiyet Gereksinimleri

Gemi motor parçaları ve mil gibi kritik bileşenler, mikron düzeyinde hassasiyet gerektirir. Bu parçalar:

- ±0.01 mm toleranslarla çalışır
- Yüksek yüzey kalitesi gerektirir
- Uzun ömürlü malzemelerden üretilir

## Kalite Kontrol Süreçleri

Her torna işlemi sonrası şu kontroller yapılır:

1. Boyutsal ölçümler
2. Yüzey pürüzlülük testleri
3. Sertlik ölçümleri
4. Görsel muayene

Hassas torna hizmetlerimiz hakkında bilgi almak için iletişime geçebilirsiniz.`,
      category: 'Üretim',
      published: true,
      featured: false,
    },
  ]

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    })
    console.log('Blog created:', blog.slug)
  }

  console.log('\n✅ Seed completed successfully!')
  console.log('📧 Admin login: admin@rekortorna.com')
  console.log('🔑 Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
