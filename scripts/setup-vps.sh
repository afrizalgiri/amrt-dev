#!/bin/bash
set -e

echo "======================================"
echo " AMRT.dev VPS Setup Script"
echo "======================================"

# 1. Update system
echo "[1/8] Update system..."
apt update -y && apt upgrade -y

# 2. Install Node.js 20 LTS
echo "[2/8] Install Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. Install PM2 + Nginx
echo "[3/8] Install PM2 & Nginx..."
npm install -g pm2
apt install -y nginx

# 4. Install Git (kalau belum ada)
apt install -y git

# 5. Clone repo
echo "[4/8] Clone repository..."
cd /var/www
rm -rf amrt-dev
git clone https://github.com/afrizalgiri/amrt-dev.git
cd amrt-dev

# 6. Buat file .env
echo "[5/8] Setup environment variables..."
cat > .env << 'ENVEOF'
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="amrt-dev-super-secret-production-2025-xK9mP2qR"
NEXTAUTH_URL="https://amertadev.my.id"
TURSO_DATABASE_URL="libsql://amrt-dev-afrizalgiri.aws-ap-northeast-1.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzQyOTg4NTEsImlkIjoiMDE5ZDFjNzItMTQwMS03Njk5LWFmOTUtNjE2YmU2ZTI0MTcxIiwicmlkIjoiNmJmMDBkOTUtM2M5OC00MWQwLWIwZjctZDlmMzQ4M2M4NjNjIn0.9k6n95bv7q7FlaPMtqCeXadF3R50PPkeYesJNk_E4nQHZjkWVKrJ4A9UNw4gOL3oU67I4Ie8iedIYv6NllQWBw"
CLOUDINARY_CLOUD_NAME="dpfqbvngq"
CLOUDINARY_API_KEY="621163185974746"
CLOUDINARY_API_SECRET="P0xSkMAgZ-ZPyTiGpuMxJ1ElAaA"
ENVEOF

# 7. Install dependencies & build
echo "[6/8] Install dependencies..."
npm install

echo "[7/8] Build app..."
npm run build

# 8. Start dengan PM2
echo "[8/8] Start app with PM2..."
pm2 delete amrt-dev 2>/dev/null || true
pm2 start npm --name "amrt-dev" -- start
pm2 save
pm2 startup | tail -1 | bash 2>/dev/null || pm2 startup systemd -u root --hp /root

# 9. Setup Nginx
echo "[9/9] Configure Nginx..."
cat > /etc/nginx/sites-available/amrt-dev << 'NGINXEOF'
server {
    listen 80;
    server_name amertadev.my.id www.amertadev.my.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/amrt-dev /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo ""
echo "======================================"
echo " Setup selesai!"
echo " App jalan di: http://amertadev.my.id"
echo " SSL belum aktif, jalankan:"
echo " certbot --nginx -d amertadev.my.id -d www.amertadev.my.id"
echo "======================================"
