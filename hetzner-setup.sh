#!/bin/bash
# ============================================
# Rekor Torna Hidrolik - Hetzner Kurulum Scripti
# ============================================
# Bu script'i sunucuda çalıştırın:
# curl -sSL https://raw.githubusercontent.com/.../setup.sh | bash

set -e

echo "🚀 Rekor Torna Hidrolik Kurulumu Başlıyor..."

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Sistem Güncelleme
echo -e "${YELLOW}[1/8] Sistem güncelleniyor...${NC}"
apt update && apt upgrade -y

# 2. Node.js Kurulumu
echo -e "${YELLOW}[2/8] Node.js 20 kurulumu...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version

# 3. MySQL Kurulumu
echo -e "${YELLOW}[3/8] MySQL kurulumu...${NC}"
export DEBIAN_FRONTEND=noninteractive
apt install -y mysql-server

# MySQL başlat
systemctl start mysql
systemctl enable mysql

# 4. Veritabanı Oluşturma
echo -e "${YELLOW}[4/8] Veritabanı oluşturuluyor...${NC}"
# Rastgele şifre oluştur
DB_PASS=$(openssl rand -base64 12)

mysql -u root <<EOF
CREATE DATABASE rekor_torna CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'rekor'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON rekor_torna.* TO 'rekor'@'localhost';
FLUSH PRIVILEGES;
EOF

echo -e "${GREEN}MySQL Şifresi: ${DB_PASS}${NC}"

# 5. Nginx Kurulumu
echo -e "${YELLOW}[5/8] Nginx kurulumu...${NC}"
apt install -y nginx

# 6. PM2 Kurulumu
echo -e "${YELLOW}[6/8] PM2 kurulumu...${NC}"
npm install -g pm2

# 7. Proje Klasörü
echo -e "${YELLOW}[7/8] Proje klasörü oluşturuluyor...${NC}"
mkdir -p /var/www/rekor-torna

# 8. Firewall Ayarları
echo -e "${YELLOW}[8/8] Firewall ayarlanıyor...${NC}"
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# Bilgileri kaydet
cat > /root/rekor-kurulum-bilgileri.txt <<EOF
============================================
REKOR TORNA HİDROLİK - KURULUM BİLGİLERİ
============================================

MySQL Veritabanı: rekor_torna
MySQL Kullanıcı: rekor
MySQL Şifre: ${DB_PASS}

Sonraki Adımlar:
1. Proje dosyalarını yükleyin:
   scp -r ./proje-dosyalari root@SUNUCU_IP:/var/www/rekor-torna/

2. .env dosyasını düzenleyin:
   nano /var/www/rekor-torna/.env

   DATABASE_URL="mysql://rekor:${DB_PASS}@localhost:3306/rekor_torna"

3. Projeyi kurun:
   cd /var/www/rekor-torna
   npm install
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   npm run build
   pm2 start server.js --name rekor-torna
   pm2 save
   pm2 startup

4. Domain ayarlayın (nginx config):
   nano /etc/nginx/sites-available/rekor-torna

5. SSL sertifikası:
   apt install certbot python3-certbot-nginx
   certbot --nginx -d rekortorna.com

============================================
EOF

echo -e "${GREEN}✅ Kurulum tamamlandı!${NC}"
echo -e "${GREEN}Bilgiler: /root/rekor-kurulum-bilgileri.txt${NC}"
echo ""
echo "MySQL Şifresi: ${DB_PASS}"
echo "Bu şifreyi not alın!"
