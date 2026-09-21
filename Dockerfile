# 1. Aşama: React ve Tailwind CSS Derleme (Node.js 20)
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# 2. Aşama: Go Binary Derleme (Golang Alpine)
FROM golang:1.24-alpine AS backend-builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY main.go ./
# Frontend build çıktısını Go'nun embed edebilmesi için kopyala
COPY --from=frontend-builder /app/dist ./dist

# CGO gerektirmeyen, hafif, optimize edilmiş tek binary üret
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o bioenerji .

# 3. Aşama: Ultra Hafif Çalışma Zamanı (Alpine Linux ~15 MB)
FROM alpine:3.20

WORKDIR /app

# HTTPS sertifikaları ve Türkiye saat dilimi için tzdata
RUN apk --no-cache add ca-certificates tzdata
ENV TZ=Europe/Istanbul

# Derlenen tek Go binary'sini kopyala
COPY --from=backend-builder /app/bioenerji /app/bioenerji

# SQLite veritabanı klasörü
RUN mkdir -p /app/data
VOLUME /app/data

# Portlar ve varsayılan ortam değişkenleri
EXPOSE 80 3000
ENV PORT=3000
ENV DB_PATH=/app/data/bioenerji.db
ENV ADMIN_PASSWORD=osman2026

CMD ["/app/bioenerji"]
