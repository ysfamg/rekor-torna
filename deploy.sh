#!/bin/bash
# Rekor Torna Hidrolik - Deployment Script
# Bu script production için projeyi hazırlar

echo "🚀 Production build alınıyor..."
bun run build

echo "📦 Deployment paketi oluşturuluyor..."
mkdir -p deploy

# Gerekli dosyaları kopyala
cp -r .next/standalone deploy/
cp -r .next/static deploy/.next/standalone/.next/
cp -r public deploy/.next/standalone/
cp -r db deploy/.next/standalone/
cp -r prisma deploy/.next/standalone/
cp package.json deploy/.next/standalone/
cp .env.example deploy/.next/standalone/

echo "✅ Deployment paketi hazır: deploy/.next/standalone/"
echo ""
echo "📋 Sunucuda yapılması gerekenler:"
echo "1. Dosyaları sunucuya yükleyin"
echo "2. .env dosyasını düzenleyin (NEXTAUTH_SECRET oluşturun)"
echo "3. npm install --production"
echo "4. npx prisma migrate deploy"
echo "5. npm start"
