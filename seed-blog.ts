// Seed blog posts
import { db } from "./src/lib/db";

const blogPosts = [
  {
    title: "Gemi Sanayinde Torna İşlemleri: Kapsamlı Rehber",
    slug: "gemi-sanayinde-torna-islemleri",
    excerpt: "Gemi sanayinde torna işlemlerinin önemi, kullanılan teknikler ve dikkat edilmesi gereken hususlar hakkında detaylı bilgiler.",
    content: `Gemi sanayinde torna işlemleri, deniz taşıtlarının üretim ve bakım süreçlerinde kritik bir rol oynamaktadır. Bu yazımızda gemi torna işlemlerinin detaylarını inceleyeceğiz.

## Torna İşlemlerinin Önemi

Gemi sanayinde torna işlemleri, motor parçaları, şaft sistemleri, pervane mileleri ve birçok kritik bileşenin üretiminde kullanılmaktadır. Yüksek hassasiyet gerektiren bu işlemler, deniz taşıtlarının güvenliği ve performansı için hayati önem taşır.

### Temel Uygulama Alanları

1. **Mil ve Şaft Üretimi**: Gemi ana makine ve yardımcı makinelerinde kullanılan millerin hassas işlenmesi
2. **Pervane Sistemleri**: Pervane mileleri ve gövdelerinin üretilmesi
3. **Pompa Parçaları**: Santrifüj ve pozitif deplasmanlı pompaların kritik parçaları
4. **Türbin Bileşenleri**: Buhar ve gaz türbinlerinin hassas parçaları

## Kullanılan Teknolojiler

Modern gemi sanayinde CNC torna tezgahları yaygın olarak kullanılmaktadır. Bu tezgahlar:
- ±0.01mm hassasiyet
- Otomatik araç değiştirme
- CAD/CAM entegrasyonu
- Çok eksenli işleme imkanı sunmaktadır.

## Kalite Standartları

Gemi sanayinde torna işlemleri uluslararası sınıf kuruluşlarının (DNV, LR, ABS, BV) standartlarına uygun olarak gerçekleştirilmelidir.`,
    category: "torna",
    featured: true,
  },
  {
    title: "Hidrolik Sistemlerin Gemi Performansına Etkisi",
    slug: "hidrolik-sistemlerin-gemi-performansina-etkisi",
    excerpt: "Gemi hidrolik sistemlerinin bakımı, sık karşılaşılan arızalar ve performans optimizasyonu üzerine kapsamlı bir inceleme.",
    content: `Hidrolik sistemler, modern gemilerin en önemli yardımcı sistemlerinden biridir. Bu yazımızda hidrolik sistemlerin gemi performansına etkisini detaylı olarak inceleyeceğiz.

## Hidrolik Sistemlerin Kullanım Alanları

Gemilerde hidrolik sistemler çeşitli kritik işlevlerde kullanılır:

- **Dümen Sistemleri**: Gemilerin yönlendirilmesinde kullanılan hidrolik dümen makineleri
- **Vinçler**: Yükleme ve boşaltma operasyonlarında kullanılan hidrolik vinçler
- **Baştankara**: Baştankara ve demirleme sistemleri
- **Kapı ve Kapaklar**: Watertight kapılar, rampalar ve kargo kapakları

## Performans Faktörleri

Hidrolik sistem performansını etkileyen temel faktörler:

### 1. Yağ Kalitesi
Hidrolik yağın viskozitesi ve temizliği sistem performansını doğrudan etkiler. Düzenli yağ analizi ve değişimi gereklidir.

### 2. Sıcaklık Kontrolü
Hidrolik sistemlerde optimal çalışma sıcaklığı 40-60°C arasındadır. Soğutma sistemlerinin düzenli bakımı önemlidir.

### 3. Sızdırmazlık Elemanları
Contalar, o-ringler ve salmastraların düzenli kontrolü ve değişimi kaçakları önler.

## Bakım Önerileri

- Günlük yağ seviyesi kontrolü
- Haftalık filtre kontrolü
- Aylık basınç testleri
- Yıllık kapsamlı sistem kontrolü`,
    category: "hidrolik",
    featured: true,
  },
  {
    title: "Denizcilikte Parça Temini ve Tedarik Zinciri",
    slug: "denizcilikte-parça-temini-tedarik-zinciri",
    excerpt: "Gemi yedek parça temininde dikkat edilmesi gerekenler, tedarik zinciri yönetimi ve stok optimizasyonu üzerine bilgiler.",
    content: `Denizcilik sektöründe parça temini, gemilerin kesintisiz operasyonunu sağlamak için kritik bir konudur. Bu yazımızda tedarik zinciri yönetimini ele alacağız.

## Parça Temininde Dikkat Edilmesi Gerekenler

### Orijinal vs Muadil Parça
- **Orijinal Parçalar**: Üretici garantili, tam uyumlu
- **Muadil Parçalar**: Maliyet avantajlı, kalite kontrolü önemli
- **İmal Parçalar**: Obsolete parçalar için alternatif çözüm

### Sınıf Onayı
Gemi parçalarında sınıf kuruluşlarının onayı gerekebilir. Bu belgeler:
- Type Approval Certificate
- Works Approval Certificate
- Material Certificate

## Tedarik Zinciri Yönetimi

Etkili tedarik zinciri için:

1. **Tedarikçi Değerlendirme**: Güvenilir tedarikçi seçimi
2. **Stok Yönetimi**: Kritik parçalar için minimum stok seviyesi
3. **Lojistik Planlama**: Acil teslimat seçenekleri
4. **Dokümantasyon**: Tüm parçalar için teknik dokümantasyon

## Acil Parça Temini

Gemi arızalarında acil parça temini için:
- 7/24 ulaşılabilir tedarikçi
- Uçak kargo seçeneği
- Liman teslim organizasyonu`,
    category: "gemi-sanayi",
    featured: false,
  },
  {
    title: "Gemi Motorlarında Sık Karşılaşılan Arızalar ve Çözümleri",
    slug: "gemi-motorlarinda-sik-karsilasilan-arizalar",
    excerpt: "Deniz motorlarında en sık rastlanan arıza türleri, teşhis yöntemleri ve bakım önerileri hakkında pratik bilgiler.",
    content: `Gemi motorları, deniz koşullarının zorlu ortamında çalışmaktadır. Bu yazımızda sık karşılaşılan arızaları ve çözümlerini inceleyeceğiz.

## Yaygın Arıza Türleri

### 1. Soğutma Sistemi Arızaları
- Deniz suyu pompası arızaları
- Isı değiştirici tıkanıklıkları
- Thermostat bozulmaları

**Çözüm**: Düzenli temizlik ve contaların kontrolü

### 2. Yakıt Sistemi Arızaları
- Enjektör tıkanıklıkları
- Yakıt pompası arızaları
- Filtre problemleri

**Çözüm**: Yakıt kalitesi kontrolü ve düzenli filtre değişimi

### 3. Yağlama Sistemi Arızaları
- Yağ basıncı düşüklüğü
- Yağ sızdırmazlık problemleri
- Yağ filtresi tıkanıklığı

**Çözüm**: Yağ analizi ve düzenli bakım

## Önleyici Bakım

Arızaları önlemek için:
- Düzenli yağ numunesi analizi
- Titreşim ölçümleri
- Termal kamera kontrolleri
- Performans izleme`,
    category: "gemi-sanayi",
    featured: true,
  },
  {
    title: "Özel Üretim Parçalarında Tersine Mühendislik",
    slug: "ozel-uretim-tersine-muhendislik",
    excerpt: "Obsolete parçaların yeniden üretimi, tersine mühendislik teknikleri ve özel üretim süreçleri hakkında bilgiler.",
    content: `Artık üretilmeyen (obsolete) parçaların yeniden üretimi, gemi sahipleri için önemli bir konudur. Tersine mühendislik bu sorunun çözümünü sunar.

## Tersine Mühendislik Süreci

### 1. Ölçüm ve Tarama
- 3D lazer tarama
- CMM ölçümleri
- El ölçü aletleri

### 2. Tasarım ve Modelleme
- CAD model oluşturma
- Teknik çizim hazırlama
- Malzeme analizi

### 3. Üretim
- CNC işleme
- Döküm alternatifleri
- Kalite kontrol

## Avantajları

- **Maliyet**: Orijinal parça maliyetinden tasarruf
- **Teslimat**: Hızlı üretim imkanı
- **İyileştirme**: Parça tasarımında optimize
- **Bağımsızlık**: Tedarikçi bağımlılığını azaltma

## Kalite Güvencesi

Özel üretilen parçalar için:
- Malzeme sertifikası
- Ölçüm raporları
- Sınıf onayı (gerektiğinde)`,
    category: "torna",
    featured: false,
  }
];

async function seedBlog() {
  console.log("Seeding blog posts...");
  
  for (const post of blogPosts) {
    try {
      const existing = await db.blog.findUnique({
        where: { slug: post.slug }
      });
      
      if (!existing) {
        await db.blog.create({
          data: {
            ...post,
            seoTitle: post.title,
            seoDesc: post.excerpt,
          }
        });
        console.log(`✓ Created: ${post.title}`);
      } else {
        console.log(`- Already exists: ${post.title}`);
      }
    } catch (error) {
      console.error(`✗ Error creating ${post.title}:`, error);
    }
  }
  
  console.log("\nSeeding complete!");
  process.exit(0);
}

seedBlog().catch(console.error);
