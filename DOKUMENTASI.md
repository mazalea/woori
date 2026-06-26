# Dokumentasi Proyek Woori-ta

**Woori-ta** adalah aplikasi web yang menampilkan analisis sentimen media sosial terhadap saham-saham pilihan, ditujukan untuk nasabah Woori Bank. Aplikasi ini dibuat menggunakan Next.js dan dihosting di Vercel.

---

## Daftar Isi

1. [Persiapan Awal (Step-by-Step)](#1-persiapan-awal-step-by-step)
2. [Instalasi Proyek](#2-instalasi-proyek)
3. [Struktur Folder Proyek](#3-struktur-folder-proyek)
4. [Cara Mengubah Data Konten](#4-cara-mengubah-data-konten)
5. [Penjelasan Kode: Halaman & Layout](#5-penjelasan-kode-halaman--layout)
6. [Penjelasan Kode: Data & Tipe](#6-penjelasan-kode-data--tipe)
7. [Penjelasan Kode: Komponen Interaktif](#7-penjelasan-kode-komponen-interaktif)
8. [Penjelasan Kode: Komponen Tampilan](#8-penjelasan-kode-komponen-tampilan)
9. [Penjelasan Kode: Visualisasi (Grafik & Word Cloud)](#9-penjelasan-kode-visualisasi-grafik--word-cloud)
10. [Tampilan & Warna (Styling)](#10-tampilan--warna-styling)
11. [Menjalankan Proyek di Komputer Lokal](#11-menjalankan-proyek-di-komputer-lokal)
12. [Deploy ke Vercel](#12-deploy-ke-vercel)

---

## 1. Persiapan Awal (Step-by-Step)

### Langkah 1 — Install Node.js

Node.js adalah "mesin" yang menjalankan kode JavaScript di luar browser. Tanpanya, proyek ini tidak bisa berjalan.

**Cara install:**

1. Buka browser dan akses **https://nodejs.org**
2. Klik tombol **"LTS"** (bukan "Current") — versi LTS lebih stabil
3. Unduh file installer sesuai sistem operasi (Windows/Mac)
4. Jalankan file installer → klik **Next** terus sampai selesai
5. Setelah selesai, buka **Terminal** (Windows: tekan `Win + R`, ketik `cmd`, Enter)
6. Ketik perintah berikut untuk memastikan berhasil:

```bash
node -v
```

Jika berhasil, terminal akan menampilkan versi, misalnya: `v20.11.0`

```bash
npm -v
```

npm (Node Package Manager) ikut ter-install bersama Node.js. Hasilnya misalnya: `10.2.4`

> Jika terminal menampilkan pesan error seperti `'node' is not recognized`, coba restart komputer lalu coba lagi.

---

### Langkah 2 — Install Git

Git adalah alat untuk menyimpan dan melacak perubahan kode. Mirip seperti "tombol undo" yang bisa kembali ke versi kode kapan saja.

**Cara install:**

1. Buka **https://git-scm.com/downloads**
2. Klik download sesuai sistem operasi
3. Jalankan installer → biarkan semua opsi default → klik **Next** terus
4. Verifikasi instalasi:

```bash
git -v
```

Hasil: `git version 2.x.x`

---

### Langkah 3 — Buat akun GitHub

GitHub adalah tempat menyimpan kode secara online (seperti Google Drive tapi khusus kode).

1. Buka **https://github.com**
2. Klik **Sign Up** → isi email, password, username
3. Verifikasi email
4. Akun siap digunakan

---

### Langkah 4 — Buat akun Vercel

Vercel adalah layanan hosting gratis untuk aplikasi Next.js.

1. Buka **https://vercel.com**
2. Klik **Sign Up**
3. Pilih **Continue with GitHub** — ini menghubungkan Vercel langsung ke akun GitHub kamu
4. Izinkan akses yang diminta → akun siap

---

### Langkah 5 — Install VS Code (Opsional tapi Disarankan)

VS Code adalah editor kode yang memudahkan penulisan dan navigasi kode.

1. Buka **https://code.visualstudio.com**
2. Klik **Download** → install seperti biasa
3. Buka VS Code → install ekstensi yang berguna:
   - **ESLint** — mendeteksi kesalahan kode secara otomatis
   - **Prettier** — merapikan format kode otomatis
   - **Tailwind CSS IntelliSense** — autocomplete untuk nama class Tailwind

---

### Langkah 6 — Konfigurasi Git (Sekali Saja)

Sebelum menggunakan Git, perlu memberi tahu Git nama dan email kamu (ini akan muncul di riwayat perubahan kode):

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

Ganti `"Nama Kamu"` dan `"email@kamu.com"` dengan data aktual. Email sebaiknya sama dengan akun GitHub.

---

## 2. Instalasi Proyek

### Clone repositori

"Clone" artinya mengunduh salinan kode dari GitHub ke komputer lokal.

```bash
git clone https://github.com/mazalea/woori-ta.git
```

Masuk ke folder proyek:

```bash
cd woori-ta
```

### Install dependencies

"Dependencies" adalah library-library yang dibutuhkan aplikasi agar bisa berjalan (misalnya Next.js, Tailwind CSS, Chart.js, dll). Daftarnya ada di file `package.json`.

```bash
npm install
```

Perintah ini membuat folder `node_modules/` berisi semua library. Proses memerlukan koneksi internet, memakan waktu 10–30 detik.

> Folder `node_modules/` **tidak perlu** di-upload ke GitHub karena sudah terdaftar di `.gitignore`. Siapapun yang mengunduh kode cukup jalankan `npm install` lagi.

---

## 3. Struktur Folder Proyek

```
woori-ta/
│
├── app/                          ← Semua halaman dan komponen utama
│   ├── layout.tsx                ← Kerangka global (font, script Maze)
│   ├── page.tsx                  ← Halaman utama (/)
│   ├── globals.css               ← Style global & definisi warna/font
│   │
│   ├── barchart/                 ← Halaman /barchart
│   ├── pie/                      ← Halaman /pie
│   ├── wordcloud/                ← Halaman /wordcloud
│   │
│   └── _components/              ← Komponen yang dipakai bersama
│       ├── page-shell.tsx        ← Kerangka halaman (layout konten)
│       ├── info-modal.tsx        ← Pop-up penjelasan istilah
│       ├── screen-utama/         ← Bagian-bagian halaman utama
│       └── stock-detail/         ← Kartu detail saham
│
├── dataset/                      ← File data JSON (ini yang sering diedit)
│   ├── stocks.json               ← Data 3 saham terpanas
│   ├── trending.json             ← Saham trending mingguan
│   ├── themes.json               ← Tema/sektor investasi
│   ├── issues.json               ← Isu pasar terkini
│   ├── disclaimers.json          ← Teks disclaimer
│   └── wordcloud.json            ← Kata-kata word cloud per saham
│
├── public/                       ← File statis (gambar, ikon, logo)
│
├── package.json                  ← Daftar library dan perintah npm
├── next.config.ts                ← Konfigurasi Next.js
└── tsconfig.json                 ← Konfigurasi TypeScript
```

---

## 4. Cara Mengubah Data Konten

Semua konten yang tampil di aplikasi disimpan dalam file `.json` di folder `dataset/`. File-file ini bisa diedit langsung — tidak perlu memahami kode pemrograman.

### `dataset/stocks.json` — 3 Saham Terpanas

```json
[
  {
    "ticker": "GOOGL",
    "logo": "/images/screen-utama/top-three/nvda.png",
    "rank": 1,
    "mentionCount": 927,
    "priceChange": { "value": 6.7, "direction": "down" },
    "platformMentions": [
      { "icon": "...", "label": "YouTube", "count": 86 },
      { "icon": "...", "label": "Reddit",  "count": 550 },
      { "icon": "...", "label": "X",       "count": 291 }
    ],
    "unusualSpike": "82% from new accounts within 24h",
    "sentiment": { "positive": 30, "negative": 55, "neutral": 15 },
    "credibility": { "verified": 55, "unverified": 45 },
    "description": "Teks deskripsi saham...",
    "tags": ["Tag1", "Tag2"]
  }
]
```

**Ketentuan penting:**
- `positive + negative + neutral` harus berjumlah **100**
- `verified + unverified` harus berjumlah **100**
- `unusualSpike` diisi `null` (tanpa tanda kutip) jika tidak ada lonjakan tidak wajar
- `ticker` harus **unik** dan konsisten dengan file lain yang mereferensikannya

### `dataset/trending.json` — Saham Trending Mingguan

```json
[
  {
    "rank": 1,
    "name": "Silicon Motion Technology ADR",
    "logo": "/images/...",
    "weeklyDelta": "+53.97%",
    "source": "Based on X",
    "highlight": "Surge on NAND controller strength.",
    "priceSparkline":   [62, 61, 63, 68, 79, 91, 98],
    "mentionSparkline": [120, 190, 420, 870, 1200, 980, 860]
  }
]
```

`priceSparkline` dan `mentionSparkline` adalah angka harian selama 7 hari — dipakai untuk menggambar grafik mini (sparkline).

### `dataset/wordcloud.json` — Kata-Kata Word Cloud

```json
[
  {
    "ticker": "GOOGL",
    "words": [
      { "text": "AI",        "weight": 5, "sentiment": "positive" },
      { "text": "antitrust", "weight": 4, "sentiment": "negative" },
      { "text": "earnings",  "weight": 3, "sentiment": "neutral"  }
    ]
  }
]
```

- `weight` = 1–5 (5 = kata paling besar di tampilan)
- `sentiment` = `"positive"` (biru), `"negative"` (merah), atau `"neutral"` (abu-abu)

---

## 5. Penjelasan Kode: Halaman & Layout

### `app/layout.tsx` — Kerangka Global

File ini adalah "kulit terluar" yang membungkus semua halaman. Apapun yang ada di sini muncul di setiap halaman tanpa perlu ditulis ulang.

```typescript
// Mengimpor jenis font dari Google Fonts
import { Geist, Geist_Mono, Lato, Noto_Sans_KR } from "next/font/google";

// Setiap font didaftarkan dengan konfigurasinya
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",   // ← nama variabel CSS yang bisa dipakai di stylesheet
  subsets: ["latin"],           // ← subset karakter yang diunduh (latin + korea)
  weight: ["400", "500", "700"],// ← ketebalan font yang dimuat
  display: "swap",              // ← teks langsung tampil dengan font fallback sambil menunggu font utama
});
```

> Dengan `display: "swap"`, pengguna tidak melihat teks kosong/blank saat font sedang diunduh.

```typescript
// Metadata: informasi tentang halaman untuk browser dan mesin pencari
export const metadata: Metadata = {
  icons: { icon: "/wooriIcon.png" },   // ← ikon tab browser
  title: "Woori-ta — AI Investment Insights",
  description: "AI-powered investment analysis...",
};
```

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ... typo-base mx-auto md:max-w-[720px]`}
      //                                         ↑ lebar maksimum 720px di layar lebar
      //                                           supaya tampilan tidak terlalu melebar
    >
      <body className="min-h-full bg-neutral-500 font-sans antialiased">
        {children}   {/* ← konten setiap halaman masuk di sini */}

        {/* Script Maze untuk user testing analytics */}
        <Script id="maze-snippet" strategy="afterInteractive" ... />
        //                                  ↑ "afterInteractive" = script dijalankan
        //                                    setelah halaman selesai dimuat,
        //                                    agar tidak memperlambat tampilan awal
      </body>
    </html>
  );
}
```

---

### `app/page.tsx` — Halaman Utama

```typescript
import { PageShell } from "./_components/page-shell";
import { HottestStockInteractive } from "./_components/screen-utama/hottest-stock-interactive";
// ... import komponen lainnya

export default function Home() {
  return (
    // PageShell adalah kerangka halaman
    // Masing-masing prop (hottest, trending, themes, issues)
    // diisi dengan komponen yang sesuai
    <PageShell
      hottest={<HottestStockInteractive />}
      trending={<TrendingStocksSection />}
      themes={<ThemesSection />}
      issues={<IssuesSection />}
    />
  );
}
```

> Halaman `/barchart`, `/pie`, dan `/wordcloud` memiliki struktur yang identik — bedanya hanya pada komponen yang diisi ke prop `hottest`.

---

### `app/_components/page-shell.tsx` — Kerangka Konten

```typescript
// TypeScript: mendefinisikan "kontrak" prop yang boleh diterima komponen ini
type PageShellProps = {
  hottest:  React.ReactNode;  // ← ReactNode = bisa diisi komponen apapun
  trending: React.ReactNode;
  themes:   React.ReactNode;
  issues:   React.ReactNode;
};

export function PageShell({ hottest, trending, themes, issues }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* flex flex-col = susun isi secara vertikal (atas ke bawah) */}

      <main className="flex flex-col gap-[54px] pt-4 pb-18">
        {/* gap-[54px] = jarak 54px antar bagian */}

        <div>
          <HottestStockHeader />  {/* Judul bagian "Hottest Stocks" */}
          {hottest}               {/* Konten interaktif pilih saham */}
        </div>

        {trending}  {/* Bagian saham trending */}
        {themes}    {/* Bagian tema investasi */}
        {issues}    {/* Bagian isu pasar */}
      </main>
    </div>
  );
}
```

---

## 6. Penjelasan Kode: Data & Tipe

### `app/barchart/_components/data.ts` — Pusat Data Saham

File ini bertugas mengambil data mentah dari JSON dan memberinya "bentuk" (tipe) yang jelas agar kode tidak bisa salah menggunakannya.

```typescript
import rawStocks   from "@/dataset/stocks.json";
//     ↑ "@/" adalah alias untuk root folder proyek
//       Jadi ini sama dengan "../../../dataset/stocks.json"
//       tapi lebih pendek dan tidak berubah walau file dipindah

// Mendefinisikan tipe data — TypeScript akan error
// jika kode mencoba mengakses field yang tidak ada di sini
export type BarchartStockDetail = {
  ticker:       string;           // ← "GOOGL", "AMZN", dst.
  logo:         string;           // ← path gambar, misal "/images/..."
  rank:         1 | 2 | 3;       // ← HANYA boleh bernilai 1, 2, atau 3
  mentionCount: number;
  priceChange:  { value: number; direction: "up" | "down" };
  //                                         ↑ hanya boleh "up" atau "down"
  platformMentions: ReadonlyArray<PlatformMention>;
  //                ↑ ReadonlyArray = array yang tidak bisa diubah isinya
  unusualSpike: string | null;    // ← boleh teks atau null (tidak ada)
  sentiment:    { positive: number; negative: number; neutral: number };
  credibility:  { verified: number; unverified: number };
  description:  string;
  tags:         readonly string[];
};

// Mengekspor data dengan tipe yang sudah didefinisikan
// "as ReadonlyArray<...>" = "percayalah, data ini berbentuk seperti ini"
export const BARCHART_STOCKS = rawStocks as ReadonlyArray<BarchartStockDetail>;
```

> Keuntungan mendefinisikan tipe: jika nanti ada kode yang mencoba mengakses `stock.harga` (field yang tidak ada), TypeScript langsung menampilkan error sebelum kode dijalankan.

---

### `app/_components/screen-utama/data.ts` — Data Halaman Utama

File ini mirip dengan `barchart/data.ts`, tetapi untuk komponen-komponen halaman utama yang tidak butuh data selengkap kartu detail.

```typescript
// Tipe yang lebih ringkas — hanya field yang dibutuhkan TopThreeStocks
export type TopThreeStock = {
  ticker: string;
  logo:   string;
  rank:   number;
};

// Data yang sama (stocks.json) di-cast ke tipe yang berbeda sesuai kebutuhan
export const TOP_THREE = rawStocks as ReadonlyArray<TopThreeStock>;

// Path gambar dikumpulkan di sini agar mudah diubah jika file dipindah
export const ICONS = {
  aiBadge:      "/images/screen-utama/icons/ai-badge.png",
  trendingUp:   "/images/screen-utama/icons/section-icon.svg",
  externalLink: "/images/screen-utama/icons/external-link.svg",
};
```

---

## 7. Penjelasan Kode: Komponen Interaktif

### Konsep: Server Component vs Client Component

Next.js membagi komponen menjadi dua jenis:

| | Server Component | Client Component |
|---|---|---|
| **Cara tandai** | Default (tidak ada penanda) | Tambahkan `"use client"` di baris pertama |
| **Dirender di** | Server (sebelum dikirim ke browser) | Browser (setelah halaman dimuat) |
| **Bisa pakai** | Data fetching, akses langsung ke database | `useState`, `useEffect`, event listener (klik, input, dll.) |
| **Contoh di proyek** | `page.tsx`, `page-shell.tsx` | `hottest-stock-interactive.tsx`, `info-modal.tsx` |

---

### `hottest-stock-interactive.tsx` — Pemilih Saham Interaktif

```typescript
"use client";  // ← WAJIB ada agar bisa pakai useState

import { useState } from "react";
// useState = "kotak penyimpan" nilai yang bisa berubah.
// Ketika nilainya berubah, komponen otomatis di-render ulang.

export function HottestStockInteractive() {
  // Deklarasi state:
  // - selectedTicker: nilai saat ini (awalnya "GOOGL")
  // - setSelectedTicker: fungsi untuk mengubah nilai
  const [selectedTicker, setSelectedTicker] = useState<string>("GOOGL");

  // Cari data saham yang cocok dengan ticker yang sedang dipilih
  // .find() mencari item pertama yang memenuhi kondisi di dalam kurung
  // "!" di akhir = "dijamin tidak undefined" (supaya TypeScript tidak complain)
  const active = BARCHART_STOCKS.find((s) => s.ticker === selectedTicker)!;
  //                              ↑ s = setiap item, dicek satu per satu

  return (
    <>
      {/* StockSelector menampilkan 3 tombol pilih saham */}
      <StockSelector
        stocks={BARCHART_STOCKS}
        selectedTicker={selectedTicker}
        onChange={setSelectedTicker}   // ← saat tombol diklik, nilai selectedTicker berubah
      />

      {/* active.mentionCount → data saham yang sedang aktif dipilih */}
      <strong>Mentioned {active.mentionCount.toLocaleString()} times!</strong>
      {/* .toLocaleString() = format angka dengan pemisah ribuan, misal: 927 → "927" */}
    </>
  );
}
```

**Alur kerja komponen ini:**

```
User klik tombol "AMZN"
        ↓
onChange dipanggil dengan nilai "AMZN"
        ↓
setSelectedTicker("AMZN") → selectedTicker berubah jadi "AMZN"
        ↓
React me-render ulang komponen
        ↓
active = BARCHART_STOCKS.find(s => s.ticker === "AMZN")
        ↓
Tampilan berubah menampilkan data AMZN
```

---

### `stock-selector.tsx` — Tombol Pilih Saham

```typescript
type StockSelectorProps = {
  stocks:          ReadonlyArray<SelectableStock>;  // ← daftar semua saham
  selectedTicker:  string;                          // ← ticker yang sedang aktif
  onChange:        (ticker: string) => void;        // ← fungsi yang dipanggil saat klik
  //               ↑ ini adalah "fungsi callback" — dipanggil oleh child,
  //                 tapi definisinya ada di parent (hottest-stock-interactive.tsx)
};

export function StockSelector({ stocks, selectedTicker, onChange }: StockSelectorProps) {
  return (
    <ul>
      {stocks.map((stock) => {
        // Cek apakah saham ini yang sedang aktif
        const isSelected = stock.ticker === selectedTicker;

        return (
          <li key={stock.ticker}>   {/* key = ID unik agar React bisa melacak tiap item */}
            <button
              onClick={() => onChange(stock.ticker)}
              // ↑ saat diklik: panggil fungsi onChange dengan ticker saham ini
              className={`... ${
                isSelected
                  ? "scale-110 border-primary-800"  // ← tampilan saat dipilih: lebih besar
                  : "scale-100 border-transparent"   // ← tampilan normal
              }`}
            >
              {stock.rank}    {/* Angka peringkat */}
              {stock.ticker}  {/* Kode saham */}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
```

---

### `info-modal.tsx` — Pop-up Penjelasan Istilah

```typescript
"use client";

import { useEffect } from "react";
// useEffect = menjalankan kode "efek samping" setelah render,
// misalnya: menambah event listener, memanipulasi DOM, dll.

export function InfoModal({ content, onClose }: InfoModalProps) {
  useEffect(() => {
    // Fungsi yang dijalankan setiap kali komponen ini muncul:

    // 1. Daftarkan listener: tekan Escape → tutup modal
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);

    // 2. Kunci scroll halaman di belakang modal
    document.body.style.overflow = "hidden";

    // Fungsi return = "cleanup" — dijalankan saat modal ditutup/komponen dihapus
    return () => {
      document.removeEventListener("keydown", handler); // ← hapus listener agar tidak menumpuk
      document.body.style.overflow = "";                 // ← kembalikan scroll seperti semula
    };
  }, [onClose]);
  // ↑ [onClose] = "jalankan ulang useEffect hanya jika onClose berubah"

  return (
    <div className="fixed inset-0 z-50 ...">
    {/* fixed inset-0 = menempel di seluruh layar (atas/bawah/kiri/kanan = 0) */}
    {/* z-50 = tampil di atas semua elemen lain */}

      {/* Area gelap di belakang modal — klik untuk tutup */}
      <div
        className="absolute inset-0 bg-black/40"
        //                              ↑ bg-black/40 = hitam dengan opacity 40%
        onClick={onClose}
      />

      {/* Kotak modal yang muncul dari bawah layar */}
      <div className="relative w-full max-w-[720px] rounded-t-3xl ...">
        {/* rounded-t-3xl = sudut membulat hanya di bagian atas */}
        ...
      </div>
    </div>
  );
}
```

---

## 8. Penjelasan Kode: Komponen Tampilan

### `base-detail-card.tsx` — Kartu Detail Saham

Komponen ini adalah "template" kartu yang dipakai di semua halaman visualisasi. Ia menerima `sentimentSlot` sehingga setiap halaman bisa memasukkan visualisasi yang berbeda.

```typescript
type BaseDetailCardProps = {
  stock:         BarchartStockDetail;  // ← data saham
  sentimentSlot: React.ReactNode;      // ← "lubang" untuk diisi visualisasi
  //             ↑ di /barchart diisi SegmentedBar
  //               di /pie diisi SentimentPieChart
  //               di /wordcloud diisi WordCloud
};

export function BaseDetailCard({ stock, sentimentSlot }: BaseDetailCardProps) {
  const [modal, setModal] = useState<InfoModalContent | null>(null);
  //     ↑ null = tidak ada modal yang terbuka

  // Cari nilai mention terbesar dari semua platform
  // untuk menentukan lebar bar secara proporsional
  const maxMention = Math.max(...stock.platformMentions.map((p) => p.count));
  //                          ↑ spread operator: mengubah array menjadi argumen terpisah
  //                            Math.max([86, 550, 291]) → Math.max(86, 550, 291) → 550

  return (
    <div>
      {/* Badge perubahan harga — warna berbeda tergantung naik/turun */}
      <span className={`... ${
        stock.priceChange.direction === "down"
          ? "bg-[#FBECE6] text-[#E34850]"   // ← merah jika turun
          : "bg-[#E1ECFF] text-[#2589F4]"   // ← biru jika naik
      }`}>
        Price {stock.priceChange.direction === "down" ? "↓" : "↑"} {stock.priceChange.value}%
      </span>

      {/* Banner "Unusual Spike" hanya ditampilkan jika datanya ada */}
      {stock.unusualSpike && (     // ← "&&" = tampilkan hanya jika unusualSpike bukan null
        <div className="border border-[#2589F4] bg-[#E1ECFF] ...">
          ⚠ Unusual spike! {stock.unusualSpike}
        </div>
      )}

      {/* Slot visualisasi — diisi dari luar saat komponen dipanggil */}
      <div>{sentimentSlot}</div>

      {/* Tombol "?" — klik untuk membuka modal penjelasan */}
      <QuestionBtn onClick={() => setModal(SENTIMENT_MODAL)} />
      //                     ↑ setModal diisi dengan konten modal yang akan ditampilkan

      {/* Modal hanya dirender jika modal !== null */}
      {modal && <InfoModal content={modal} onClose={() => setModal(null)} />}
      //                                    ↑ saat ditutup: isi modal dikosongkan (null)
    </div>
  );
}
```

---

### `segmented-bar.tsx` — Bar Bertumpuk

```typescript
export type Segment = {
  pct:   number;  // ← persentase (0–100)
  color: string;  // ← kode warna hex
  label: string;  // ← nama label
};

export function SegmentedBar({ segments }: { segments: ReadonlyArray<Segment> }) {
  return (
    <>
      {/* Bar horizontal: setiap segment punya lebar proporsional */}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div
            key={s.label}
            className="h-full"
            style={{
              width: `${s.pct}%`,         // ← lebar = persentase, misal "65%"
              backgroundColor: s.color,   // ← warna dari data
            }}
          />
        ))}
      </div>

      {/* Legenda di bawah bar */}
      <div className="mt-1.5 flex justify-end gap-3">
        {segments.map((s) => (
          <span key={s.label}>
            <span style={{ backgroundColor: s.color }} />  {/* lingkaran warna */}
            {s.label}
          </span>
        ))}
      </div>
    </>
  );
}
```

---

## 9. Penjelasan Kode: Visualisasi (Grafik & Word Cloud)

### `sparkline-chart.tsx` — Grafik Mini Dua Garis

```typescript
"use client";

// Chart.js menggunakan sistem "registrasi" — hanya fitur yang didaftarkan
// yang akan dimasukkan ke bundle, agar ukuran file lebih kecil
import {
  CategoryScale,   // ← skala sumbu X (kategori)
  Chart as ChartJS,
  Filler,          // ← fitur isi area di bawah garis
  LineElement,     // ← elemen garis
  LinearScale,     // ← skala sumbu Y (angka)
  PointElement,    // ← titik-titik di garis
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export function SparklineChart({ priceData, mentionData }: SparklineChartProps) {
  const data = {
    labels: priceData.map(() => ""),   // ← label kosong = sumbu X tidak ditampilkan

    datasets: [
      {
        label:       "Price",
        data:        priceData,
        borderColor: "#2589f4",   // ← garis biru untuk harga
        borderWidth: 1.5,
        pointRadius: 0,           // ← tidak ada titik di tiap data point
        tension:     0.4,         // ← 0 = garis lurus, 1 = sangat melengkung
        yAxisID:     "yPrice",    // ← gunakan sumbu Y kiri
      },
      {
        label:       "Mentions",
        data:        mentionData,
        borderColor: "#00b8d4",   // ← garis cyan untuk mention
        borderDash:  [4, 3],      // ← garis putus-putus: 4px garis, 3px spasi
        yAxisID:     "yMentions", // ← gunakan sumbu Y kanan (skala berbeda)
      },
    ],
  };

  const options = {
    responsive:          true,
    maintainAspectRatio: false,   // ← ukuran mengikuti container div
    animation:           false,   // ← nonaktifkan animasi agar lebih cepat

    scales: {
      x:         { display: false },   // ← sembunyikan sumbu X
      yPrice:    { display: false },   // ← sembunyikan sumbu Y harga
      yMentions: { display: false },   // ← sembunyikan sumbu Y mention
      // Dua sumbu Y terpisah dipakai karena skala harga (ratusan) dan
      // mention (ribuan) sangat berbeda — jika digabung, salah satu
      // akan terlihat datar
    },
  };

  return (
    <div className="h-[56px] w-[120px]">
      <Line data={data} options={options} />
    </div>
  );
}
```

---

### `sentiment-pie-chart.tsx` — Pie Chart Sentimen

```typescript
"use client";

import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);
// ArcElement = elemen busur/irisan untuk pie/donut chart

const SEGMENTS = [
  { label: "Positive", color: "#2589F4" },  // ← biru
  { label: "Negative", color: "#e34850" },  // ← merah
  { label: "Neutral",  color: "#E0E9F2" },  // ← abu-abu muda
];

export function SentimentPieChart({ positive, negative, neutral }: SentimentPieChartProps) {
  const data = {
    datasets: [{
      data:            [positive, negative, neutral],  // ← nilai persentase tiap irisan
      backgroundColor: SEGMENTS.map((s) => s.color),  // ← warna tiap irisan
      borderWidth:     0,  // ← tidak ada garis tepi antar irisan
    }],
  };

  const options = {
    animation:   false,
    plugins: {
      legend:  { display: false },   // ← sembunyikan legenda bawaan Chart.js
      tooltip: { enabled: false },   // ← sembunyikan tooltip saat hover
      // Legenda dan tooltip dibuat manual di sebelah kanan pie chart
    },
  };

  return (
    <div className="flex items-center gap-5">
      {/* Pie chart */}
      <div className="size-[120px] shrink-0">
        <Pie data={data} options={options} />
      </div>

      {/* Legenda manual */}
      <div className="flex flex-col gap-2">
        {SEGMENTS.map((s, i) => {
          const value = [positive, negative, neutral][i];  // ← ambil nilai berdasarkan index
          return (
            <span key={s.label}>
              <span style={{ backgroundColor: s.color }} />  {/* lingkaran warna */}
              {s.label}  {/* nama kategori */}
            </span>
          );
        })}
      </div>
    </div>
  );
}
```

---

### `word-cloud.tsx` — Awan Kata

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
// d3-cloud = library untuk menghitung posisi kata agar tidak saling tumpang tindih

// Pemetaan: weight (1-5) → ukuran font dalam pixel
const WEIGHT_SIZE = { 1: 11, 2: 14, 3: 18, 4: 24, 5: 32 };

// Pemetaan: sentiment → warna
const COLOR_MAP = {
  positive: "#2589f4",  // ← biru
  negative: "#e34850",  // ← merah
  neutral:  "#686e75",  // ← abu-abu
};

export function WordCloud({ words }: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // useRef = cara mengakses elemen HTML secara langsung
  // containerRef.current = elemen <div> di return statement

  const [placed, setPlaced] = useState<PlacedWord[]>([]);
  // placed = array kata dengan posisi x,y yang sudah dihitung

  const [dims, setDims] = useState({ w: 320, h: 220 });
  // dims = ukuran container dalam pixel

  useEffect(() => {
    if (!containerRef.current) return;  // ← amankan jika ref belum siap

    // Ukur lebar dan tinggi container secara aktual
    const w = containerRef.current.offsetWidth  || 320;
    const h = containerRef.current.offsetHeight || 220;
    setDims({ w, h });

    // Siapkan input untuk d3-cloud
    const input = words.map((word) => ({
      text:   word.text,
      size:   WEIGHT_SIZE[word.weight],  // ← ukuran dari weight
      color:  COLOR_MAP[word.sentiment], // ← warna dari sentiment
      weight: word.weight,
    }));

    // Jalankan algoritma penempatan kata
    cloud()
      .size([w, h])        // ← area yang tersedia
      .words(input)        // ← kata-kata yang akan diletakkan
      .padding(5)          // ← jarak minimal antar kata (pixel)
      .rotate(0)           // ← semua kata horizontal (0 derajat)
      .fontSize((d) => d.size!)     // ← ukuran font dari data
      .on("end", (output) => {
        // Setelah algoritma selesai menghitung posisi,
        // simpan hasilnya ke state untuk ditampilkan
        setPlaced(output.map((d) => ({
          text: d.text!, size: d.size!, color: d.color as string,
          x: d.x!,       y: d.y!,      rotate: d.rotate!, weight: d.weight as number,
        })));
      })
      .start();  // ← mulai hitung
  }, [words]);  // ← jalankan ulang setiap kali prop "words" berubah (ganti saham)

  return (
    // SVG = format gambar vektor — dipakai karena bisa menempatkan teks
    // di koordinat x,y yang presisi
    <div ref={containerRef} className="relative h-55 w-full">
      <svg width={dims.w} height={dims.h}>
        {/* translate ke tengah: koordinat (0,0) d3-cloud ada di tengah */}
        <g transform={`translate(${dims.w / 2},${dims.h / 2})`}>
          {placed.map((w) => (
            <text
              key={w.text}
              transform={`translate(${w.x},${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fill={w.color}
            >
              {w.text}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
```

---

## 10. Tampilan & Warna (Styling)

### Sistem Warna (`app/globals.css`)

Semua warna didefinisikan sebagai variabel CSS di satu tempat, sehingga mudah diubah secara konsisten:

```css
@theme inline {
  /* Biru utama — dipakai untuk elemen interaktif, sentimen positif */
  --color-primary-800: #2589f4;

  /* Merah — dipakai untuk sentimen negatif, harga turun */
  --color-accent-red: #e34850;

  /* Cyan — dipakai untuk badge trending */
  --color-accent-cyan: #00b8d4;

  /* Skala abu-abu untuk teks */
  --color-gray-w900: #333333;  /* teks paling gelap */
  --color-gray-w700: #686e75;  /* teks deskripsi */
  --color-gray-w600: #8c8d96;  /* teks sekunder */
}
```

Untuk mengubah warna utama aplikasi, cukup ubah nilai hex di file ini — semua komponen yang menggunakan warna tersebut akan ikut berubah.

### Sistem Font

| Variabel | Font | Dipakai untuk |
|---|---|---|
| `--font-sans` | Noto Sans KR → Geist Sans | Teks umum |
| `--font-numbers` | Lato | Angka (mention count, persentase) |
| `--font-mono` | Geist Mono | Kode (jika ada) |

### Skala Teks

```css
.typo-xlarge { font-size: 1.5rem;   }  /* 24px — angka besar */
.typo-large  { font-size: 1.25rem;  }  /* 20px — judul seksi */
.typo-base   { font-size: 1rem;     }  /* 16px — teks normal */
.typo-small  { font-size: 0.875rem; }  /* 14px — label */
.typo-tiny   { font-size: 0.75rem;  }  /* 12px — teks kecil, tag */
.typo-micro  { font-size: 0.625rem; }  /* 10px — badge, angka kecil */
```

---

## 11. Menjalankan Proyek di Komputer Lokal

### Mode Development

```bash
npm run dev
```

Buka browser → `http://localhost:3000`

Perubahan pada file kode atau data JSON akan langsung terlihat di browser (hot reload).

### Cek Error TypeScript

```bash
npx tsc --noEmit
```

Tidak ada output = tidak ada error. Selalu jalankan ini sebelum push ke GitHub.

### Simulasi Build Production

```bash
npm run build
npm run start
```

Gunakan sebelum deploy untuk memastikan tidak ada masalah.

---

## 12. Deploy ke Vercel

### Langkah 1 — Push ke GitHub

Simpan semua perubahan:

```bash
git add .
git commit -m "Deskripsi singkat perubahan"
git push
```

**Penjelasan perintah:**
- `git add .` — pilih semua file yang berubah untuk disimpan
- `git commit -m "..."` — buat "snapshot" dengan pesan keterangan
- `git push` — kirim snapshot ke GitHub

### Langkah 2 — Hubungkan ke Vercel (Sekali Saja)

1. Buka [vercel.com](https://vercel.com) → login dengan GitHub
2. Klik **"Add New Project"**
3. Pilih repositori `woori-ta`
4. Vercel otomatis mendeteksi Next.js → klik **"Deploy"**

### Langkah 3 — Deploy Otomatis

Setelah terhubung: setiap `git push` ke branch `main` → Vercel otomatis build dan deploy ulang. Tidak perlu langkah manual.

### Proses Build di Vercel

```
git push ke GitHub
       ↓
Vercel mendeteksi perubahan
       ↓
npm install  (mengunduh library)
       ↓
npm run build  (membuat versi produksi)
       ↓
Deploy ke server → URL aktif
```

### Troubleshooting Build Gagal

| Pesan Error | Penyebab | Solusi |
|---|---|---|
| `Module '...' has no exported member '...'` | Mengimpor sesuatu yang tidak ada di file tersebut | Periksa nama ekspor di file yang diimpor |
| `Cannot read properties of undefined` | Data tidak ditemukan (misalnya ticker salah) | Periksa konsistensi nilai ticker di `stocks.json` dan semua komponen |
| `Type error: ...` | Tipe data tidak sesuai | Jalankan `npx tsc --noEmit` untuk melihat detail |
| `Export encountered an error on /halaman` | Halaman gagal dirender saat build | Baca baris error di atasnya untuk tahu komponen yang bermasalah |

---

## Ringkasan Alur Kerja

```
Edit data di dataset/*.json  (tidak perlu paham kode)
             ↓
Uji tampilan: npm run dev → buka localhost:3000
             ↓
Pastikan tidak ada error: npx tsc --noEmit
             ↓
Simulasi build: npm run build
             ↓
Simpan ke GitHub:
  git add .
  git commit -m "update data saham"
  git push
             ↓
Vercel otomatis deploy → aplikasi live
```
