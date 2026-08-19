# 1. Aşama: Build Aşaması (Node 20 Alpine)
FROM node:20-alpine AS builder

WORKDIR /app

# Paket tanımlarını kopyala ve sessiz/hızlı yükle
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Kaynak kodları kopyala ve derle
COPY . .
RUN npm run build

# 2. Aşama: Nginx ile Web Sunumu
FROM nginx:alpine

# Nginx ayar dosyasını ekle
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derleme çıktısını web dizinine aktar
COPY --from=builder /app/dist /usr/share/nginx/html

# Hem port 80 hem port 3000'i aç
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
