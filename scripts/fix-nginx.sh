#!/bin/bash
cat > /etc/nginx/sites-available/amrt-dev << 'NGINXEOF'
server {
    listen 80;
    server_name amertadev.my.id www.amertadev.my.id;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    server_name amertadev.my.id www.amertadev.my.id;
    ssl_certificate /etc/letsencrypt/live/amertadev.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/amertadev.my.id/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF
ln -sf /etc/nginx/sites-available/amrt-dev /etc/nginx/sites-enabled/amrt-dev
nginx -t && systemctl reload nginx && echo "NGINX OK - amertadev.my.id fixed!"
