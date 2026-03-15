import { Cog, Wrench, Package, Hammer, Gauge, Clock4, Shield, Droplets, Settings2, Star, Truck, FileCheck, Lightbulb, Ruler, Pipette } from "lucide-react"

// Service Data Type
export interface ServiceData {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  detailedDescription: string
  applications: string[]
  equipment: string[]
  benefits: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
}

// Blog Data Type
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  slug: string
  content: string
  date: string
}

// Service Data
export const servicesData: ServiceData[] = [
  {
    id: "torna",
    title: "Torna İşleri",
    shortTitle: "Torna İşleri",
    description: "Profesyonel torna hizmetleri",
    icon: Cog,
    features: [
      "CNC torna imalatı",
      "Hassas işçilik",
      "Mil ve yatak üretimi"
    ],
    detailedDescription: "Gemi sanayiinin tüm torna ihtiyaçları için modern CNC makinelerimiz ve uzman kadromuzla hizmet veriyoruz. Mil imalatı, yatak boğma, flanş işleme, porya çekme ve tüm torna operasyonlarında yüksek hassasiyet ve kalite garantisi sunuyoruz.",
    applications: [
      "Dizel motor mil imalatı ve onarımı",
      "Türbin mil tornalama işlemleri",
      "Pompa mil ve gövde işleme",
      "Flanş ve kaplin üretimi",
      "Sterntube (kızak) burçları",
      "Porya ve yatak boğma"
    ],
    equipment: [
      "CNC Torna Tezgahları (Ø 1000mm x 6000mm)",
      "Konvansiyonel Torna Tezgahları",
      "Hassas Ölçüm Cihazları",
      "Yüzey Sertleştirme Ekipmanları"
    ],
    benefits: [
      { icon: Gauge, title: "Yüksek Hassasiyet", description: "±0.01mm tolerans ile üretim" },
      { icon: Clock4, title: "Hızlı Teslimat", description: "Acil işlerde 24 saat içinde" },
      { icon: Shield, title: "Kalite Garantisi", description: "Tüm işlerde 1 yıl garanti" }
    ]
  },
  {
    id: "hidrolik",
    title: "Hidrolik Sistemler",
    shortTitle: "Hidrolik Sistemler",
    description: "Komple hidrolik çözümler",
    icon: Wrench,
    features: [
      "Hidrolik pompa tamiri",
      "Silindir bakımı",
      "Sistem montajı"
    ],
    detailedDescription: "Gemi hidrolik sistemlerinin tasarım, montaj, bakım ve onarımında uzmanlaşmış ekibimizle hizmetinizdeyiz. Vinç hidroliği, dümen hidroliği, baştankara hidroliği ve tüm gemi hidrolik sistemleri için profesyonel çözümler sunuyoruz.",
    applications: [
      "Gemi vincileri hidrolik sistemleri",
      "Dümen makinesi hidrolik üniteleri",
      "Baştankara hidrolik sistemleri",
      "Kapı ve rampa hidrolikleri",
      "Hidrolik direksiyon sistemleri",
      "Sea chest valfleri ve aktuatörleri"
    ],
    equipment: [
      "Hidrolik Test Bench (700 bar)",
      "Silindir Baskı Presi",
      "Honlama Makinesi",
      "Segman Takım Setleri"
    ],
    benefits: [
      { icon: Droplets, title: "Orijinal Parça", description: "Tüm markalarda orijinal yedek parça" },
      { icon: Settings2, title: "Kapsamlık", description: "Tüm hidrolik marka ve modeleri" },
      { icon: Star, title: "Deneyim", description: "20+ yıllık hidrolik tecrübesi" }
    ]
  },
  {
    id: "parca",
    title: "Parça Temini",
    shortTitle: "Parça Temini",
    description: "Orijinal ve uyumlu parçalar",
    icon: Package,
    features: [
      "Gemi yedek parçaları",
      "İthal parça tedariki",
      "Hızlı teslimat"
    ],
    detailedDescription: "Dünya genelinde gemi yedek parça tedarik ağımız ile ihtiyaç duyduğunuz her türlü parçayı hızlı ve güvenilir şekilde temin ediyoruz. Motor yedek parçaları, hidrolik elemanlar, elektrik malzemeleri ve daha fazlası için tek adresiniz.",
    applications: [
      "Ana ve yardımcı motor yedek parçaları",
      "Hidrolik pompa ve motor parçaları",
      "Piston, segman, gömlek setleri",
      "Enjektör ve pompa elemanları",
      "Türbin yedek parçaları",
      "Elektrik ve otomasyon malzemeleri"
    ],
    equipment: [
      "Kapsamlı Tedarik Ağı",
      "Hızlı Gümrük İşlemleri",
      "Kalıntı Analiz Laboratuvarı",
      "Merkez Stok Deposu"
    ],
    benefits: [
      { icon: Truck, title: "Hızlı Teslimat", description: "Acil parçalarda uçak kargo" },
      { icon: FileCheck, title: "Sertifikalı", description: "Class onaylı parça temini" },
      { icon: Lightbulb, title: "Danışmanlık", description: "Doğru parça seçiminde destek" }
    ]
  },
  {
    id: "ozel",
    title: "Özel Üretim",
    shortTitle: "Özel Üretim",
    description: "Özel tasarım imalatlar",
    icon: Hammer,
    features: [
      "Prototip üretimi",
      "Özel ölçü parçalar",
      "Teknik danışmanlık"
    ],
    detailedDescription: "Standart dışı parça ihtiyaçlarınız için özel tasarım ve üretim hizmeti sunuyoruz. Teknik çizim veya numune üzerinden çalışarak, ihtiyacınıza özel parçaları tasarlıyor ve üretiyoruz. Mühendislik desteği ile kaliteli çözümler.",
    applications: [
      "Obsolet parçaların yeniden üretimi",
      "Modifikasyon ve iyileştirme parçaları",
      "Özel flanş ve bağlantı elemanları",
      "Testere dişli miller ve dişliler",
      "Performans artırıcı parçalar",
      "Prototip ve deneysel üretimler"
    ],
    equipment: [
      "CAD/CAM Tasarım Sistemi",
      "CNC İşleme Merkezi",
      "TIG/MIG Kaynak Üniteleri",
      "3D Ölçüm Cihazı"
    ],
    benefits: [
      { icon: Ruler, title: "Hassas Ölçüm", description: "3D tarama ile kusursuz kopyalama" },
      { icon: Pipette, title: "Malzeme Uzmanlığı", description: "Doğru malzeme seçimi ve sertleştirme" },
      { icon: Lightbulb, title: "Mühendislik", description: "Tasarım ve optimize desteği" }
    ]
  }
]

// Blog Posts
export const blogPosts: BlogPost[] = [
  { 
    id: "1", 
    title: "Gemi Sanayinde Torna İşlemleri: Kapsamlı Rehber", 
    excerpt: "Hassas torna işlemlerinin gemi sanayindeki önemi ve uygulama alanları.", 
    category: "Torna", 
    slug: "gemi-sanayinde-torna",
    date: "15 Ocak 2024",
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

Rekor Torna Hidrolik olarak, 20 yılı aşkın tecrübemizle gemi sanayinin tüm torna ihtiyaçlarına profesyonel çözümler sunuyoruz.`
  },
  { 
    id: "2", 
    title: "Hidrolik Sistemlerin Gemi Performansına Etkisi", 
    excerpt: "Gemi hidrolik sistemlerinde düzenli bakım ve performans optimizasyonu.", 
    category: "Hidrolik", 
    slug: "hidrolik-sistem-performans",
    date: "10 Ocak 2024",
    content: `Gemi hidrolik sistemleri, deniz araçlarının birçok kritik fonksiyonunu yerine getirmektedir. Vinciler, dümen sistemleri, baştankara ekipmanları ve daha birçok sistem hidrolik güçle çalışmaktadır.

## Hidrolik Sistemlerin Önemi

Hidrolik sistemler, yüksek güç aktarımı gerektiren uygulamalarda ideal çözümler sunar. Gemi sanayinde bu sistemlerin güvenli çalışması, operasyonel güvenlik açısından kritiktir.

### Bakım Gereklilikleri

- **Yağ Değişimi:** Belirli periyotlarla hidrolik yağının değiştirilmesi
- **Filtre Temizliği:** Sistemin temiz kalması için filtre bakımı
- **Sızıntı Kontrolü:** Silindir ve bağlantı noktalarının kontrolü
- **Basınç Testi:** Sistem basıncının düzenli kontrolü

## Performans İpuçları

1. Orijinal yedek parça kullanımı
2. Düzenli yağ analizi
3. Operatör eğitimi
4. Önleyici bakım programı

Rekor Torna Hidrolik olarak, tüm gemi hidrolik sistemleriniz için profesyonel bakım ve onarım hizmeti sunmaktayız.`
  },
  { 
    id: "3", 
    title: "Denizcilikte Parça Temini ve Tedarik Zinciri", 
    excerpt: "Gemi yedek parça temininde dikkat edilmesi gerekenler ve tedarik zinciri yönetimi.", 
    category: "Parça", 
    slug: "parca-temini",
    date: "5 Ocak 2024",
    content: `Gemi yedek parça temini, denizcilik operasyonlarının kesintisiz sürdürülmesi için kritik öneme sahiptir. Bu makalemizde doğru parça temini ve tedarik zinciri yönetimi konularını ele alacağız.

## Parça Temininde Dikkat Edilmesi Gerekenler

### 1. Orijinallik
Parçanın orijinal veya onaylı muadil olması, performans ve güvenlik açısından hayati önem taşır.

### 2. Sertifikasyon
Class onaylı parçalar, sınıf kuruluşlarının gereksinimlerini karşılar.

### 3. Uyumluluk
Parçanın teknik spesifikasyonlara tam uyumu gereklidir.

## Tedarik Zinciri Yönetimi

- **Acil Temin:** Kritik parçalar için hızlı tedarik kanalları
- **Stok Yönetimi:** Sık kullanılan parçaların stoklanması
- **Kalite Kontrol:** Gelen parçaların kontrolü
- **Dokümantasyon:** Sertifikasyon ve kayıt tutma

Rekor Torna Hidrolik, geniş tedarik ağı ile gemi yedek parça ihtiyaçlarınıza hızlı çözümler sunmaktadır.`
  },
  { 
    id: "4", 
    title: "Özel Üretim: Obsolet Parça Sorunlarına Çözüm", 
    excerpt: "Artık üretilmeyen parçaların özel üretim ile yeniden hayata geçirilmesi.", 
    category: "Özel Üretim", 
    slug: "obsolet-parca-cozum",
    date: "28 Aralık 2023",
    content: `Gemi sanayinde, özellikle yaşlı gemilerde obsolet (artık üretilmeyen) parça sorunu sıkça karşılaşılan bir durumdur. Bu makalemizde özel üretim ile bu sorunun nasıl çözülebileceğini anlatacağız.

## Obsolet Parça Nedir?

Obsolet parçalar, üreticisi tarafından artık üretilmeyen veya tedarik edilemeyen parçalardır. Bu durum gemilerin operasyonel sürekliliğini tehdit edebilir.

## Özel Üretim Süreci

### 1. Ölçüm ve Analiz
Eski parçanın 3D tarama ve ölçümü yapılır.

### 2. Tasarım
CAD ortamında teknik çizimler hazırlanır.

### 3. Malzeme Seçimi
Uygun malzeme ve sertleştirme işlemi belirlenir.

### 4. Üretim
CNC tezgahlarında hassas üretim gerçekleştirilir.

## Avantajlar

- Geminin ömrünün uzatılması
- Orijinal parçadan daha iyi performans
- Modifikasyon imkanı
- Maliyet avantajı

Rekor Torna Hidrolik olarak, tüm özel üretim ihtiyaçlarınıza profesyonel çözümler sunuyoruz.`
  },
  { 
    id: "5", 
    title: "Gemi Bakımında Dönemsel Kontroller", 
    excerpt: "Gemi bakım programlarında dönemsel kontrol checklist'leri ve öneriler.", 
    category: "Bakım", 
    slug: "donemsel-kontroller",
    date: "20 Aralık 2023",
    content: `Gemi bakımında dönemsel kontroller, güvenli ve verimli operasyon için vazgeçilmezdir. Bu yazımızda gemi bakım programlarında dikkat edilmesi gereken kontrol noktalarını paylaşacağız.

## Günlük Kontroller

- Ana motor yağ basıncı ve sıcaklığı
- Soğutma suyu parametreleri
- Hidrolik sistem yağ seviyesi
- Acil ekipmanların kontrolü

## Haftalık Kontroller

- Jeneratör performans testleri
- Hidrolik filtre kontrolleri
- Elektrik panoları termal tarama
- Güverte makineleri kontrolü

## Aylık Kontroller

- Tüm makinelerin detaylı muayenesi
- Yağ numunelerinin alınması
- Emniyet valflerinin testi
- Seyir ekipmanları kalibrasyonu

## Yıllık Kontroller

- Class survey hazırlıkları
- Ana motor revizyonu
- Hidrolik sistem basınç testi
- Gövde muayenesi

Düzenli bakım programı ile geminizin performansını ve güvenliğini maksimize edebilirsiniz. Rekor Torna Hidrolik olarak bakım ve onarım hizmetlerinizde yanınızdayız.`
  },
]

// Stats
export const stats = [
  { value: "20+", label: "Yıllık Tecrübe" },
  { value: "500+", label: "Mutlu Müşteri" },
  { value: "1000+", label: "Tamamlanan Proje" },
  { value: "7/24", label: "Destek Hizmeti" },
]

// Contact Info
export const contactInfo = {
  phone: "+90 362 XXX XX XX",
  email: "info@rekortorna.com",
  address: "Samsun, Türkiye",
  hours: "Pzt-Cuma: 08:00-18:00 • Cmt: 09:00-14:00",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33935.95456854815!2d36.36827167712543!3d41.25351270938244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4087df87348f9885%3A0xc8040b3c4b1d0ae0!2sRekor%20Torna!5e0!3m2!1str!2str!4v1773402790935!5m2!1str!2str",
  mapDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rekor+Torna+Samsun"
}
