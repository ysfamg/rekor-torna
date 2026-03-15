# Rekor Torna Hidrolik - Hetzner Kurulum Rehberi

## 1. Sunucuyu Bağlanın

```bash
ssh root@SUNUCU_IP
```

## 2. Sistem Güncelleme ve Node.js Kurulumu
```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version
```

## 3. Proje Dosyalarını Yükleme

Lokal bilgisayarınızdan proje klasörünü yükleyin:
```bash
scp -r deploy/* root@SUNUCU_IP:/var/www/rekor-torna/
```

## 4. Proje Kurulumu
```bash
cd /var/www/rekor-torna

# .env dosyası oluştur
cp .env.example .env
nano .env

# Gerekli bilgileri düzenleyin:
# - DATABASE_URL (MySQL bağlantısı)
# - NEXTAUTH_SECRET (openssl rand -base64 32 ile oluşturun)
# - NEXTAUTH_URL (site URL)

# Bağımlılıkları kurun
npm install

# Veritabanını hazırla
npx prisma generate
npx prisma db push
npx prisma db seed

# Klasör izinlerini ayarlayın (Önemli: Resim yükleme için)
mkdir -p public/uploads
chmod 777 public/uploads

# Build al
npm run build

# PM2 ile başlat
npm install -g pm2
pm2 start server.js --name rekor-torna
pm2 save
pm2 startup
```

## 5. MySQL Kurulumu (yoksa)
```bash
apt install -y mysql-server

# MySQL güvenli kurulum
mysql_secure_installation

# Veritabanı oluştur
mysql -u root -p

CREATE DATABASE rekor_torna CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'rekor'@'localhost' IDENTIFIED BY 'GUCLU_SIFRE';
GRANT ALL PRIVILEGES ON rekor_torna.* TO 'rekor'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# .env dosyasında DATABASE_URL'i güncelleyin:
# DATABASE_URL="mysql://rekor:GUCLU_SIFRE@localhost:3306/rekor_torna"
```

## 6. Nginx Kurulumu
```bash
apt install -y nginx

# Nginx konfigürasyonu
cat > /etc/nginx/sites-available/rekor-torna << 'EOF'
server {
    listen 80;
    server_name SIZIN_DOMAININIZ.com www.SIZIN_DOMAININIZ.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Site'ı aktif et
ln -s /etc/nginx/sites-available/rekor-torna /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## 7. SSL Sertifikası (Ücretsiz)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d SIZIN_DOMAININIZ.com -d www.SIZIN_DOMAININIZ.com
```

## 8. Admin Girişi
- URL: https://SIZIN_DOMAININIZ.com/admin/login
- E-posta: admin@rekortorna.com
- Şifre: admin123

⚠️ İlk girişten sonra şifreyi değiştirin!

