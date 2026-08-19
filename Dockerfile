# 1. Aşama: Build (Derleme) Aşaması
FROM node:24-alpine AS builder

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package.json package-lock.json* ./
RUN npm install

# Kaynak kodları kopyala ve üretim paketi oluştur
COPY . .
RUN npm run build

# 2. Aşama: Nginx ile Ultra Hızlı ve Güvenli Sunum Aşaması
FROM nginx:alpine

# Özel Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derlenen statik dosyaları Nginx web kök dizinine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# 80 portunu dışa aç (Coolify otomatik algılar)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
