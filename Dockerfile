# 1. Aşama: Build (Derleme) Aşaması - Node 20 LTS
FROM node:20-alpine AS builder

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Kaynak kodları kopyala ve build al
COPY . .
RUN npm run build

# 2. Aşama: Nginx ile Ultra Hızlı Sunum
FROM nginx:alpine

# Özel Nginx konfigürasyonunu kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derlenen statik dosyaları Nginx web kök dizinine kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Hem 80 hem 3000 portunu dışa aç (Coolify hangisini isterse anında eşleşir)
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
