# Deployment Guide

> **Catatan:** Panduan ini mengasumsikan Docker dan Docker Compose sudah terpasang di host Anda.

---

## 1. Pre‑Deployment

1. **Siapkan berkas lingkungan (`.env`)**

   Salin/letakkan `.env` ke direktori proyek (sejajar dengan `docker-compose.yml`) dan pastikan seluruh variabel terisi dengan benar sebelum melanjutkan.

---

## 2. Deployment

Buat atau perbarui berkas **`docker-compose.yml`** seperti di bawah ini:

```yaml
version: "3.8"

services:
  app:
    image: agungdh/lareact             # Image yang sama seperti saat menggunakan `docker run`
    container_name: app               # Opsional—memberi nama eksplisit
    restart: always
    ports:
      - "8000:80"                     # host:container
    volumes:
      - supervisor-logs:/var/log/supervisor
      - php-logs:/var/log/php
      - nginx-logs:/var/log/nginx
      - storage-logs:/var/www/html/storage/logs
      - ./.env:/var/www/html/.env:ro

# Deklarasi named‑volume (Docker akan mempertahankannya di antara rebuild)
volumes:
  supervisor-logs:
  php-logs:
  nginx-logs:
  storage-logs:
```

> **Tips:** Jika perlu menyesuaikan konfigurasi (mis. port host berbeda), ubah nilai di atas sebelum menjalankan langkah berikutnya.

Jalankan stack:

```bash
docker compose up -d
```

---

## 3. Post‑Deployment

Setelah container berjalan, jalankan perintah berikut **satu kali saja**:

```bash
# 1) Beri izin eksekusi pada skrip post‑deploy
docker compose exec --user root app chmod +x ./post-deploy.sh

# 2) Eksekusi skrip sebagai pengguna www-data
docker compose exec --user www-data app ./post-deploy.sh

# 3) Restart container untuk menerapkan perubahan
docker compose restart app
```

Aplikasi kini dapat diakses pada **[http://localhost:8000](http://localhost:8000)** (atau host/IP yang Anda petakan).

---

### Troubleshooting

| Gejala                      | Kemungkinan Penyebab                  | Solusi Cepat                                         |
| --------------------------- | ------------------------------------- | ---------------------------------------------------- |
| Container langsung berhenti | Format `.env` salah / variabel hilang | Periksa ulang isi `.env`                             |
| 403/404 dari Nginx          | Permission pada direktori `storage`   | Pastikan `www-data` memiliki `/var/www/html/storage` |

---

Selamat berlayar! 🚀
