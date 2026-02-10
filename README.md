# Hastane-Yonetim-Sistemi

Frontend ve backend klasörleri olan hastane yönetim sistemi projesi.

## Repo yapısı
- backend/: sunucu tarafı
- frontend/: istemci tarafı
- docker-compose.yml: servisleri birlikte kaldırmak için
- package.json: kök proje bağımlılıkları / scriptler :contentReference[oaicite:7]{index=7}

## Teknolojiler
- JavaScript ağırlıklı geliştirme :contentReference[oaicite:8]{index=8}

## Kurulum
1) Depoyu klonla
2) Backend bağımlılıkları:
   - cd backend
   - npm install
3) Frontend bağımlılıkları:
   - cd ../frontend
   - npm install

## Çalıştırma (lokal)
Backend:
- cd backend
- npm run dev (veya npm start)

Frontend:
- cd frontend
- npm start

## Çalıştırma (Docker)
- docker compose up --build :contentReference[oaicite:9]{index=9}

## Konfigürasyon
Backend için .env gerekiyorsa:
- PORT
- DB bağlantısı
- JWT_SECRET vb.

## Katkı
Issue veya PR ile katkı yapılabilir.

## Lisans
Belirtilmedi.
