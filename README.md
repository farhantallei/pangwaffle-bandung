Pang Waffle — Cabang Mars Utara, Metro, Bandung

Website katalog + pemesanan sederhana untuk Thailand Pang Waffle cabang Mars Utara, Metro, Bandung. Pengunjung dapat melihat menu berdasarkan kategori, menambahkan ke keranjang, lalu checkout via WhatsApp dengan ringkasan pesanan yang otomatis terformat.

Demo: https://pangwaffle-bandung.pages.dev

Fitur
- Katalog menu: Classic, Red Velvet, Pandan, dengan gambar dan harga.
- Filter kategori: pilih “Semua” atau per kategori.
- Keranjang belanja: tambah/kurangi, hapus item, jumlah total dan subtotal.
- Checkout via WhatsApp: form pemesan (nama, nomor HP, metode pickup/GoSend) dengan validasi dasar; pesan WA terformat otomatis.
- Info toko: nama cabang, alamat, telepon, jam operasional, tautan social media, peta Google Maps ter-embed.
- Persisten lokal: keranjang dan data form disimpan di localStorage.
- Responsif dan tema warna sesuai brand.

Teknologi
- React 19 + TypeScript, bundling dengan Vite 7.
- Tailwind CSS v4 via `@tailwindcss/vite`.
- Radix UI primitives (Sheet, Radio/Label), `lucide-react` ikon, `class-variance-authority`.
- Validasi ringan dengan `zod` dan utilitas tanggal `date-fns`.
- `vite-plugin-singlefile` untuk output statis yang mudah deploy.

Persyaratan
- Node.js 18+ (disarankan 20+) atau Bun 1.1+.
- Paket manajer: npm atau bun (dua-duanya didukung).

Menjalankan Secara Lokal
- Install dependensi:
  - npm: `npm install`
  - bun: `bun install`
- Development server:
  - npm: `npm run dev`
  - bun: `bun run dev`
- Build produksi (output di `dist/`):
  - npm: `npm run build`
  - bun: `bun run build`
- Preview build lokal:
  - npm: `npm run preview`
  - bun: `bun run preview`

Konfigurasi Konten
- Info toko: ubah profil cabang, alamat dan nomor WA tujuan
  - `src/constants/profile.ts:1`
- Tautan sosial media
  - `src/constants/socmed.ts:1`
- Lokasi/Map Google Maps (iframe dan link)
  - `src/constants/location.ts:1`
- Data menu (nama, kategori, harga, gambar)
  - `src/data/items.json:1`
- Kategori yang ditampilkan di filter (opsional, jika ingin menambah/mengubah label)
  - `src/components/categories.tsx:4`
- Template pesan WhatsApp saat checkout
  - `src/components/order-form.tsx:16`
- Logo dan gambar produk
  - `public/logo.png`
  - `public/images/`

Catatan SEO/Meta
- Perbarui judul, deskripsi, dan Open Graph/Twitter Card sesuai domain produksi
  - `index.html:1`

Deploy
- Hasil build ada di folder `dist/`. Karena memakai `vite-plugin-singlefile`, HTML di-inline dengan aset sehingga mudah dihosting di layanan statis apa pun (Cloudflare Pages, Netlify, GitHub Pages, dsb.).
- Langkah umum:
  1) Jalankan build: `npm run build`
  2) Upload isi folder `dist/` ke hosting statis pilihan Anda.

Struktur Singkat
- Entry aplikasi: `src/main.tsx`, `src/App.tsx`
- Komponen UI: `src/components/*` dan `src/components/ui/*`
- State global: `src/providers/cart-provider.tsx`, `src/providers/filter-provider.tsx`
- Utilitas dan tipe: `src/lib/utils.ts`, `src/types.ts`

Lisensi
- Proprietary: Pang Waffle Proprietary License v1.0 — lihat `LICENSE`.
