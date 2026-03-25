export interface GuideSection {
  type: "heading" | "text" | "code" | "tip" | "warning" | "result";
  content: string;
  language?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Pemula" | "Menengah";
  category: string;
  icon: string;
  order: number;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: "html-dasar",
    title: "HTML Dasar",
    description: "Pelajari fondasi website — struktur, elemen, dan tag HTML yang wajib kamu tahu.",
    duration: "20 menit",
    difficulty: "Pemula",
    category: "HTML",
    icon: "🌐",
    order: 1,
    sections: [
      { type: "heading", content: "Apa itu HTML?" },
      { type: "text", content: "HTML (HyperText Markup Language) adalah bahasa dasar untuk membuat halaman web. Semua yang kamu lihat di browser — teks, gambar, tombol — semuanya ditulis dengan HTML." },
      { type: "tip", content: "HTML bukan bahasa pemrograman, tapi bahasa markup. Artinya kita cukup menulis 'tag' untuk menandai konten." },
      { type: "heading", content: "Struktur Dasar HTML" },
      { type: "text", content: "Setiap halaman HTML punya struktur dasar seperti ini:" },
      {
        type: "code",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Website Pertamaku</title>
  </head>
  <body>
    <h1>Halo, Dunia!</h1>
    <p>Ini adalah halaman web pertamaku.</p>
  </body>
</html>`,
      },
      { type: "heading", content: "Tag-Tag Penting" },
      { type: "text", content: "Berikut tag HTML yang paling sering dipakai:" },
      {
        type: "code",
        language: "html",
        content: `<!-- Judul -->
<h1>Judul Besar</h1>
<h2>Judul Sedang</h2>
<h3>Judul Kecil</h3>

<!-- Paragraf -->
<p>Ini adalah paragraf teks biasa.</p>

<!-- Link -->
<a href="https://google.com">Klik di sini</a>

<!-- Gambar -->
<img src="foto.jpg" alt="Deskripsi foto" />

<!-- Tombol -->
<button>Klik Saya</button>

<!-- Daftar -->
<ul>
  <li>Item pertama</li>
  <li>Item kedua</li>
</ul>`,
      },
      { type: "heading", content: "Membuat Bagian / Section" },
      { type: "text", content: "Gunakan div dan section untuk membagi halaman menjadi bagian-bagian:" },
      {
        type: "code",
        language: "html",
        content: `<body>
  <!-- Header / Navigasi -->
  <header>
    <nav>
      <a href="#beranda">Beranda</a>
      <a href="#tentang">Tentang</a>
      <a href="#kontak">Kontak</a>
    </nav>
  </header>

  <!-- Konten Utama -->
  <main>
    <section id="beranda">
      <h1>Selamat Datang!</h1>
      <p>Ini beranda website saya.</p>
    </section>

    <section id="tentang">
      <h2>Tentang Saya</h2>
      <p>Saya suka belajar web.</p>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2025 Nama Saya</p>
  </footer>
</body>`,
      },
      { type: "tip", content: "Gunakan tag semantik seperti <header>, <main>, <footer>, <section> agar website kamu lebih rapi dan SEO-friendly." },
      { type: "heading", content: "Form & Input" },
      { type: "text", content: "Form digunakan untuk mengumpulkan data dari pengunjung:" },
      {
        type: "code",
        language: "html",
        content: `<form>
  <label for="nama">Nama Kamu:</label>
  <input type="text" id="nama" placeholder="Masukkan nama" />

  <label for="email">Email:</label>
  <input type="email" id="email" placeholder="nama@email.com" />

  <label for="pesan">Pesan:</label>
  <textarea id="pesan" rows="4" placeholder="Tulis pesanmu..."></textarea>

  <button type="submit">Kirim</button>
</form>`,
      },
      { type: "warning", content: "Pastikan setiap <input> punya atribut id yang unik dan label yang sesuai agar mudah diakses." },
    ],
  },
  {
    slug: "css-dasar",
    title: "CSS Dasar",
    description: "Pelajari cara mempercantik tampilan website — warna, font, layout, dan animasi sederhana.",
    duration: "25 menit",
    difficulty: "Pemula",
    category: "CSS",
    icon: "🎨",
    order: 2,
    sections: [
      { type: "heading", content: "Apa itu CSS?" },
      { type: "text", content: "CSS (Cascading Style Sheets) adalah bahasa untuk mengatur tampilan HTML. Kalau HTML adalah kerangka rumah, CSS adalah cat, furnitur, dan dekorasinya." },
      { type: "heading", content: "Cara Menghubungkan CSS ke HTML" },
      {
        type: "code",
        language: "html",
        content: `<!-- Di dalam <head> HTML kamu -->
<link rel="stylesheet" href="style.css" />`,
      },
      { type: "heading", content: "Selektor & Properti Dasar" },
      {
        type: "code",
        language: "css",
        content: `/* Memberi style pada semua <p> */
p {
  color: #333333;       /* warna teks */
  font-size: 16px;      /* ukuran huruf */
  line-height: 1.6;     /* jarak antar baris */
  font-family: Arial, sans-serif;
}

/* Memberi style berdasarkan class */
.judul-besar {
  font-size: 48px;
  font-weight: bold;
  color: #0066ff;
}

/* Memberi style berdasarkan ID */
#header {
  background-color: #1a1a2e;
  padding: 20px;
}`,
      },
      { type: "heading", content: "Warna & Background" },
      {
        type: "code",
        language: "css",
        content: `/* Warna teks */
h1 { color: #ff6600; }           /* hex */
p  { color: rgb(50, 50, 50); }   /* rgb */

/* Background */
.hero {
  background-color: #0a0a1a;
  background-image: linear-gradient(135deg, #0066ff, #7c3aed);
}

/* Gambar sebagai background */
.banner {
  background-image: url('banner.jpg');
  background-size: cover;
  background-position: center;
}`,
      },
      { type: "heading", content: "Box Model — Padding & Margin" },
      { type: "text", content: "Setiap elemen HTML punya kotak (box) tersendiri. Kamu bisa mengatur jarak di dalam (padding) dan jarak ke luar (margin)." },
      {
        type: "code",
        language: "css",
        content: `.kartu {
  padding: 24px;          /* jarak isi ke tepi dalam */
  margin: 16px auto;      /* jarak ke elemen lain, auto = tengah */
  border: 1px solid #ddd; /* garis tepi */
  border-radius: 12px;    /* sudut membulat */
  width: 320px;           /* lebar */
  box-shadow: 0 4px 20px rgba(0,0,0,0.1); /* bayangan */
}`,
      },
      { type: "heading", content: "Flexbox — Layout Mudah" },
      { type: "text", content: "Flexbox adalah cara paling mudah untuk mengatur posisi elemen secara horizontal atau vertikal." },
      {
        type: "code",
        language: "css",
        content: `/* Baris horizontal */
.navbar {
  display: flex;
  justify-content: space-between; /* kiri & kanan */
  align-items: center;            /* rata tengah vertikal */
  padding: 0 24px;
  height: 64px;
}

/* Grid kartu */
.grid-kartu {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* Tengah layar */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}`,
      },
      { type: "tip", content: "Gunakan justify-content: center untuk menengahkan secara horizontal, dan align-items: center untuk vertikal." },
      { type: "heading", content: "Responsive — Mobile Friendly" },
      {
        type: "code",
        language: "css",
        content: `/* Default: desktop */
.grid {
  display: flex;
  gap: 24px;
}

/* Tablet (≤ 768px) */
@media (max-width: 768px) {
  .grid {
    flex-direction: column;
  }
  h1 {
    font-size: 28px;
  }
}

/* HP (≤ 480px) */
@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
}`,
      },
      { type: "heading", content: "Hover & Transisi" },
      {
        type: "code",
        language: "css",
        content: `.tombol {
  background: #0066ff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease; /* animasi transisi */
}

.tombol:hover {
  background: #0052cc;
  transform: translateY(-2px);      /* gerak ke atas */
  box-shadow: 0 8px 24px rgba(0,102,255,0.4);
}

.tombol:active {
  transform: translateY(0);
}`,
      },
    ],
  },
  {
    slug: "javascript-dasar",
    title: "JavaScript Dasar",
    description: "Buat website kamu jadi interaktif — tombol yang bereaksi, animasi, dan logika sederhana.",
    duration: "30 menit",
    difficulty: "Pemula",
    category: "JavaScript",
    icon: "⚡",
    order: 3,
    sections: [
      { type: "heading", content: "Apa itu JavaScript?" },
      { type: "text", content: "JavaScript (JS) adalah bahasa pemrograman yang membuat website menjadi interaktif. Kalau HTML = kerangka, CSS = tampilan, maka JS = nyawa website kamu." },
      { type: "heading", content: "Cara Menghubungkan JS ke HTML" },
      {
        type: "code",
        language: "html",
        content: `<!-- Di bawah </body> -->
<script src="script.js"></script>

<!-- Atau langsung di HTML -->
<script>
  alert("Halo dari JavaScript!");
</script>`,
      },
      { type: "heading", content: "Variabel" },
      {
        type: "code",
        language: "javascript",
        content: `// let: bisa diubah
let nama = "Budi";
let umur = 20;

// const: tidak bisa diubah
const siteName = "AMRT.dev";

// Menampilkan ke console
console.log("Nama:", nama);  // Nama: Budi
console.log("Umur:", umur);  // Umur: 20`,
      },
      { type: "heading", content: "Manipulasi Elemen HTML" },
      { type: "text", content: "JS bisa mengubah teks, warna, dan isi elemen HTML secara langsung:" },
      {
        type: "code",
        language: "javascript",
        content: `// Ambil elemen berdasarkan ID
const judul = document.getElementById("judul");

// Ubah isi teks
judul.textContent = "Halo, ini diubah JS!";

// Ubah style
judul.style.color = "#0066ff";
judul.style.fontSize = "32px";

// Tambah / hapus class
judul.classList.add("aktif");
judul.classList.remove("aktif");
judul.classList.toggle("aktif");`,
      },
      { type: "heading", content: "Event — Reaksi terhadap Klik" },
      {
        type: "code",
        language: "javascript",
        content: `// HTML: <button id="tombol">Klik Saya</button>

const tombol = document.getElementById("tombol");

tombol.addEventListener("click", function() {
  alert("Tombol diklik!");
});

// Atau pakai arrow function
tombol.addEventListener("click", () => {
  tombol.textContent = "Sudah diklik!";
  tombol.style.background = "green";
});`,
      },
      { type: "heading", content: "Contoh Nyata: Dark/Light Mode" },
      {
        type: "code",
        language: "javascript",
        content: `// HTML:
// <button id="toggle">🌙 Dark Mode</button>

const toggleBtn = document.getElementById("toggle");
let isDark = false;

toggleBtn.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.style.background = "#0a0a1a";
    document.body.style.color = "#ffffff";
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    document.body.style.background = "#ffffff";
    document.body.style.color = "#000000";
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});`,
      },
      { type: "tip", content: "Coba buka browser kamu, tekan F12, lalu klik tab 'Console'. Di sini kamu bisa langsung ketik JS dan lihat hasilnya!" },
      { type: "heading", content: "Contoh Nyata: Form Validasi" },
      {
        type: "code",
        language: "javascript",
        content: `// HTML:
// <input id="email" type="email" />
// <button id="submit">Kirim</button>
// <p id="pesan"></p>

document.getElementById("submit").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan");

  if (email === "") {
    pesan.textContent = "❌ Email tidak boleh kosong!";
    pesan.style.color = "red";
  } else if (!email.includes("@")) {
    pesan.textContent = "❌ Format email tidak valid!";
    pesan.style.color = "red";
  } else {
    pesan.textContent = "✅ Email valid! Terima kasih.";
    pesan.style.color = "green";
  }
});`,
      },
    ],
  },
  {
    slug: "cara-buat-website",
    title: "Cara Buat Website Lengkap",
    description: "Gabungkan HTML + CSS + JS untuk membuat website profesional dari nol sampai jadi.",
    duration: "45 menit",
    difficulty: "Pemula",
    category: "Project",
    icon: "🚀",
    order: 4,
    sections: [
      { type: "heading", content: "Yang Akan Kita Buat" },
      { type: "text", content: "Di panduan ini kita akan membuat website portfolio personal yang lengkap — dengan navigasi, hero section, kartu skill, dan form kontak. Semua dari nol!" },
      { type: "heading", content: "Langkah 1: Struktur HTML" },
      {
        type: "code",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio - Nama Kamu</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- NAVIGASI -->
  <nav id="navbar">
    <div class="logo">Nama.dev</div>
    <ul class="nav-links">
      <li><a href="#tentang">Tentang</a></li>
      <li><a href="#skill">Skill</a></li>
      <li><a href="#kontak">Kontak</a></li>
    </ul>
  </nav>

  <!-- HERO -->
  <section id="hero">
    <h1>Halo, Saya <span class="highlight">Nama Kamu</span> 👋</h1>
    <p>Web Developer yang suka bikin hal keren di internet.</p>
    <a href="#kontak" class="tombol">Hubungi Saya</a>
  </section>

  <!-- SKILL -->
  <section id="skill">
    <h2>Skill Saya</h2>
    <div class="grid-skill">
      <div class="kartu-skill">🌐 HTML</div>
      <div class="kartu-skill">🎨 CSS</div>
      <div class="kartu-skill">⚡ JavaScript</div>
      <div class="kartu-skill">📱 Responsive</div>
    </div>
  </section>

  <!-- KONTAK -->
  <section id="kontak">
    <h2>Hubungi Saya</h2>
    <form id="form-kontak">
      <input type="text" id="nama" placeholder="Nama kamu" />
      <input type="email" id="email" placeholder="Email kamu" />
      <textarea id="pesan" rows="4" placeholder="Pesanmu..."></textarea>
      <button type="submit" class="tombol">Kirim Pesan</button>
    </form>
    <p id="status-form"></p>
  </section>

  <footer>
    <p>© 2025 Nama Kamu. Dibuat dengan ❤️</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
      },
      { type: "heading", content: "Langkah 2: CSS Styling" },
      {
        type: "code",
        language: "css",
        content: `/* Reset & base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #0a0a1a;
  color: #ffffff;
}
a { text-decoration: none; color: inherit; }

/* Navbar */
#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  height: 64px;
  position: fixed;
  top: 0; left: 0; right: 0;
  background: rgba(10,10,26,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  z-index: 100;
}
.logo { font-weight: bold; font-size: 20px; color: #60a5fa; }
.nav-links { display: flex; gap: 32px; list-style: none; }
.nav-links a { color: #9ca3af; transition: color 0.3s; }
.nav-links a:hover { color: white; }

/* Hero */
#hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 24px 0;
}
#hero h1 { font-size: clamp(32px, 5vw, 64px); line-height: 1.2; margin-bottom: 16px; }
.highlight { color: #60a5fa; }
#hero p { color: #9ca3af; font-size: 18px; margin-bottom: 32px; }

/* Tombol */
.tombol {
  display: inline-block;
  padding: 14px 32px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.tombol:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37,99,235,0.4);
}

/* Skill */
#skill {
  padding: 96px 48px;
  text-align: center;
}
#skill h2 { font-size: 36px; margin-bottom: 48px; }
.grid-skill {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.kartu-skill {
  padding: 24px 32px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  font-size: 18px;
  transition: all 0.3s;
}
.kartu-skill:hover {
  background: rgba(37,99,235,0.15);
  border-color: rgba(96,165,250,0.4);
  transform: translateY(-4px);
}

/* Kontak */
#kontak {
  padding: 96px 48px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
#kontak h2 { font-size: 36px; margin-bottom: 32px; }
#form-kontak {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
#form-kontak input,
#form-kontak textarea {
  padding: 14px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: white;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}
#form-kontak input:focus,
#form-kontak textarea:focus {
  border-color: #60a5fa;
}
#status-form { margin-top: 16px; font-size: 15px; }

/* Footer */
footer {
  text-align: center;
  padding: 32px;
  color: #4b5563;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* Responsive */
@media (max-width: 640px) {
  #navbar { padding: 0 20px; }
  .nav-links { gap: 16px; font-size: 14px; }
  #skill, #kontak { padding: 64px 24px; }
}`,
      },
      { type: "heading", content: "Langkah 3: JavaScript Interaktif" },
      {
        type: "code",
        language: "javascript",
        content: `// Navbar berubah saat scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 80) {
    navbar.style.background = "rgba(10,10,26,0.98)";
  } else {
    navbar.style.background = "rgba(10,10,26,0.9)";
  }
});

// Form kontak
document.getElementById("form-kontak").addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan").value;
  const status = document.getElementById("status-form");

  if (!nama || !email || !pesan) {
    status.textContent = "❌ Semua kolom harus diisi!";
    status.style.color = "#f87171";
    return;
  }

  status.textContent = \`✅ Terima kasih \${nama}! Pesan kamu sudah terkirim.\`;
  status.style.color = "#34d399";
  e.target.reset();
});`,
      },
      { type: "tip", content: "Selamat! Kamu sudah punya website portfolio pertamamu. Sekarang coba kustomisasi warna, teks, dan tambahkan section lainnya sesuai kreativitas kamu!" },
      { type: "warning", content: "Sudah puas dengan hasilnya? Lanjut ke halaman 'Buat Website' untuk mencoba template siap pakai yang bisa langsung kamu kustomisasi!" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
