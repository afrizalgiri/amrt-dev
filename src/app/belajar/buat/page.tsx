"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Download, Smartphone, Monitor, X, Send, CheckCircle } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormData {
  namaWebsite: string;
  tagline: string;
  deskripsi: string;
  namaOwner: string;
  pekerjaan: string;
  warnaPrimer: string;
  warnaAksen: string;
  email: string;
  instagram: string;
  whatsapp: string;
  skill1: string; skill2: string; skill3: string; skill4: string;
}

interface Template {
  id: string;
  name: string;
  desc: string;
  preview: string;
}

const TEMPLATES: Template[] = [
  { id: "portfolio",  name: "Portfolio Personal",  desc: "Cocok untuk freelancer, designer, developer", preview: "👤" },
  { id: "bisnis",     name: "Landing Bisnis",       desc: "Promosikan layanan atau produk bisnis kamu", preview: "🏢" },
  { id: "toko",       name: "Toko Online",          desc: "Tampilan produk dan cara pembelian", preview: "🛍️" },
  { id: "kreator",    name: "Content Creator",      desc: "Showcase konten, link sosmed, dan kolaborasi", preview: "🎥" },
];

const DEFAULT: FormData = {
  namaWebsite: "Nama.dev", tagline: "Web Developer & Designer",
  deskripsi: "Halo! Saya seorang web developer yang suka membuat website modern dan responsif.",
  namaOwner: "Nama Kamu", pekerjaan: "Web Developer",
  warnaPrimer: "#2563eb", warnaAksen: "#60a5fa",
  email: "nama@email.com", instagram: "@namakamu", whatsapp: "08123456789",
  skill1: "HTML & CSS", skill2: "JavaScript", skill3: "UI/UX Design", skill4: "Responsive Web",
};

// ── Template renderers ─────────────────────────────────────────────────────────
function buildPortfolioHTML(f: FormData) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${f.namaWebsite}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0a0a1a;color:#fff}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 48px;height:64px;position:fixed;top:0;left:0;right:0;background:rgba(10,10,26,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.08);z-index:100}
.logo{font-weight:700;font-size:18px;color:${f.warnaAksen}}
nav ul{display:flex;gap:28px;list-style:none}nav a{color:#9ca3af;text-decoration:none;font-size:14px;transition:.3s}nav a:hover{color:#fff}
#hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:80px 24px 0;background:radial-gradient(ellipse 80% 50% at 50% 30%,${f.warnaPrimer}18,transparent)}
h1{font-size:clamp(28px,5vw,56px);font-weight:700;margin-bottom:12px}
.hl{color:${f.warnaAksen}}
.sub{color:#9ca3af;font-size:17px;margin-bottom:8px}
.desc{color:#6b7280;max-width:480px;line-height:1.7;margin-bottom:32px;font-size:15px}
.btn{display:inline-block;padding:13px 32px;background:${f.warnaPrimer};color:#fff;border-radius:8px;text-decoration:none;font-weight:600;transition:.3s}
.btn:hover{opacity:.88;transform:translateY(-2px)}
section{padding:80px 48px;max-width:1100px;margin:0 auto}
h2{font-size:30px;font-weight:700;margin-bottom:40px;text-align:center}
.grid{display:flex;flex-wrap:wrap;gap:16px;justify-content:center}
.skill{padding:20px 28px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;font-size:15px;transition:.3s}
.skill:hover{background:${f.warnaPrimer}22;border-color:${f.warnaAksen}66}
.kontak{max-width:540px;margin:0 auto;text-align:center}
.kontak p{color:#9ca3af;margin-bottom:8px;font-size:15px}
footer{text-align:center;padding:28px;color:#374151;border-top:1px solid rgba(255,255,255,.06);font-size:13px}
</style></head><body>
<nav><div class="logo">${f.namaWebsite}</div><ul><li><a href="#tentang">Tentang</a></li><li><a href="#skill">Skill</a></li><li><a href="#kontak">Kontak</a></li></ul></nav>
<section id="hero">
  <p class="sub">${f.pekerjaan}</p>
  <h1>Halo, Saya <span class="hl">${f.namaOwner}</span> 👋</h1>
  <p class="desc">${f.deskripsi}</p>
  <a href="#kontak" class="btn">Hubungi Saya</a>
</section>
<section id="skill"><h2>Skill Saya</h2>
<div class="grid">
  <div class="skill">⚡ ${f.skill1}</div><div class="skill">🎨 ${f.skill2}</div>
  <div class="skill">🚀 ${f.skill3}</div><div class="skill">📱 ${f.skill4}</div>
</div></section>
<section id="kontak" class="kontak"><h2>Hubungi Saya</h2>
  <p>📧 ${f.email}</p>
  <p>📸 Instagram: ${f.instagram}</p>
  <p>💬 WhatsApp: ${f.whatsapp}</p>
  <br/><a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" class="btn" style="margin-top:8px">Chat WhatsApp</a>
</section>
<footer><p>© 2025 ${f.namaOwner} · ${f.tagline}</p></footer>
</body></html>`;
}

function buildBisnisHTML(f: FormData) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${f.namaWebsite}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#fff;color:#111}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 48px;height:64px;background:#fff;border-bottom:1px solid #e5e7eb;position:sticky;top:0;z-index:100}
.logo{font-weight:800;font-size:20px;color:${f.warnaPrimer}}
.btn{padding:10px 24px;background:${f.warnaPrimer};color:#fff;border-radius:7px;text-decoration:none;font-weight:600;font-size:14px}
#hero{min-height:90vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:80px 24px;background:linear-gradient(135deg,${f.warnaPrimer}08,${f.warnaAksen}08)}
h1{font-size:clamp(30px,5vw,58px);font-weight:800;color:#111;margin-bottom:16px;line-height:1.15}
.hl{color:${f.warnaPrimer}}
.sub{color:#6b7280;font-size:18px;max-width:500px;line-height:1.7;margin-bottom:32px}
.fitur{display:flex;flex-wrap:wrap;gap:24px;justify-content:center;padding:64px 48px;background:#f9fafb}
.kartu{padding:28px;background:#fff;border-radius:16px;width:240px;box-shadow:0 2px 16px rgba(0,0,0,.07);text-align:center}
.kartu .ikon{font-size:32px;margin-bottom:12px}
.kartu h3{font-weight:700;margin-bottom:8px;font-size:15px}
.kartu p{color:#6b7280;font-size:13px;line-height:1.6}
.kontak-wrap{padding:64px 48px;text-align:center;background:${f.warnaPrimer};color:#fff}
.kontak-wrap h2{font-size:28px;font-weight:800;margin-bottom:12px}
.kontak-wrap p{opacity:.85;margin-bottom:24px}
.btn-putih{padding:13px 32px;background:#fff;color:${f.warnaPrimer};border-radius:8px;text-decoration:none;font-weight:700}
footer{text-align:center;padding:24px;color:#9ca3af;font-size:13px;border-top:1px solid #e5e7eb}
</style></head><body>
<nav><div class="logo">${f.namaWebsite}</div><a href="#kontak" class="btn">Hubungi Kami</a></nav>
<section id="hero">
  <h1>${f.tagline.split(' ').slice(0,3).join(' ')}<br/><span class="hl">${f.tagline.split(' ').slice(3).join(' ') || f.namaWebsite}</span></h1>
  <p class="sub">${f.deskripsi}</p>
  <a href="#kontak" class="btn" style="font-size:16px;padding:14px 36px">Mulai Sekarang →</a>
</section>
<div class="fitur">
  <div class="kartu"><div class="ikon">⚡</div><h3>${f.skill1}</h3><p>Solusi terbaik untuk kebutuhan kamu</p></div>
  <div class="kartu"><div class="ikon">🎯</div><h3>${f.skill2}</h3><p>Tepat sasaran dan berkualitas tinggi</p></div>
  <div class="kartu"><div class="ikon">🤝</div><h3>${f.skill3}</h3><p>Layanan profesional dan terpercaya</p></div>
  <div class="kartu"><div class="ikon">🚀</div><h3>${f.skill4}</h3><p>Hasil cepat dan memuaskan</p></div>
</div>
<div class="kontak-wrap" id="kontak">
  <h2>Siap Bekerja Sama?</h2>
  <p>Hubungi kami sekarang dan dapatkan konsultasi gratis!</p>
  <a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" class="btn-putih">Chat WhatsApp Sekarang</a>
</div>
<footer><p>© 2025 ${f.namaWebsite} · ${f.email}</p></footer>
</body></html>`;
}

function buildTokoHTML(f: FormData) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${f.namaWebsite}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#fafafa;color:#111}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 40px;height:60px;background:#fff;box-shadow:0 1px 8px rgba(0,0,0,.08);position:sticky;top:0;z-index:100}
.logo{font-weight:800;font-size:18px;color:${f.warnaPrimer}}
.cart{background:${f.warnaPrimer};color:#fff;border:none;padding:8px 20px;border-radius:20px;cursor:pointer;font-weight:600;font-size:13px}
#hero{background:linear-gradient(120deg,${f.warnaPrimer},${f.warnaAksen});padding:60px 40px;text-align:center;color:#fff}
#hero h1{font-size:clamp(24px,4vw,48px);font-weight:800;margin-bottom:12px}
#hero p{font-size:16px;opacity:.9;margin-bottom:28px}
.btn-w{display:inline-block;padding:13px 32px;background:#fff;color:${f.warnaPrimer};border-radius:8px;text-decoration:none;font-weight:700}
.produk-wrap{padding:60px 40px}
.produk-wrap h2{font-size:24px;font-weight:700;margin-bottom:32px;text-align:center}
.produk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}
.produk{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);transition:.3s}
.produk:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.12)}
.produk-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:48px;background:#f3f4f6}
.produk-info{padding:14px}
.produk-info h3{font-size:14px;font-weight:600;margin-bottom:6px}
.harga{color:${f.warnaPrimer};font-weight:800;font-size:16px;margin-bottom:10px}
.beli{width:100%;padding:8px;background:${f.warnaPrimer};color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px}
.kontak{background:${f.warnaPrimer}12;padding:48px 40px;text-align:center}
.kontak h2{font-size:22px;font-weight:700;margin-bottom:8px;color:${f.warnaPrimer}}
.kontak p{color:#6b7280;margin-bottom:16px;font-size:14px}
.wa-btn{display:inline-block;padding:12px 28px;background:#25D366;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px}
footer{text-align:center;padding:20px;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb}
</style></head><body>
<nav><div class="logo">🛍️ ${f.namaWebsite}</div><button class="cart">🛒 Keranjang</button></nav>
<section id="hero">
  <h1>${f.tagline}</h1>
  <p>${f.deskripsi}</p>
  <a href="#produk" class="btn-w">Lihat Produk</a>
</section>
<div class="produk-wrap" id="produk"><h2>Produk Unggulan</h2>
<div class="produk-grid">
  <div class="produk"><div class="produk-img">📦</div><div class="produk-info"><h3>${f.skill1}</h3><div class="harga">Rp 99.000</div><button class="beli" onclick="alert('Menghubungi penjual...')">Beli Sekarang</button></div></div>
  <div class="produk"><div class="produk-img">🎁</div><div class="produk-info"><h3>${f.skill2}</h3><div class="harga">Rp 149.000</div><button class="beli" onclick="alert('Menghubungi penjual...')">Beli Sekarang</button></div></div>
  <div class="produk"><div class="produk-img">⭐</div><div class="produk-info"><h3>${f.skill3}</h3><div class="harga">Rp 199.000</div><button class="beli" onclick="alert('Menghubungi penjual...')">Beli Sekarang</button></div></div>
  <div class="produk"><div class="produk-img">🏆</div><div class="produk-info"><h3>${f.skill4}</h3><div class="harga">Rp 299.000</div><button class="beli" onclick="alert('Menghubungi penjual...')">Beli Sekarang</button></div></div>
</div></div>
<div class="kontak"><h2>Mau Pesan?</h2><p>Hubungi kami langsung untuk harga terbaik!</p>
  <a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" class="wa-btn">💬 Chat WhatsApp</a>
</div>
<footer><p>© 2025 ${f.namaWebsite} · ${f.email}</p></footer>
</body></html>`;
}

function buildKreatorHTML(f: FormData) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${f.namaWebsite}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#09090b;color:#fff}
#hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;background:radial-gradient(ellipse 60% 50% at 50% 0%,${f.warnaPrimer}25,transparent 70%)}
.avatar{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,${f.warnaPrimer},${f.warnaAksen});display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px}
h1{font-size:clamp(24px,4vw,44px);font-weight:800;margin-bottom:8px}
.job{color:${f.warnaAksen};font-size:16px;margin-bottom:16px;font-weight:600}
.bio{color:#a1a1aa;max-width:420px;line-height:1.7;margin-bottom:32px;font-size:15px}
.links{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:48px}
.link-btn{padding:11px 22px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#fff;text-decoration:none;font-size:14px;font-weight:500;transition:.25s}
.link-btn:hover{background:${f.warnaPrimer};border-color:${f.warnaPrimer}}
.konten{padding:64px 40px;max-width:800px;margin:0 auto}
.konten h2{font-size:22px;font-weight:700;margin-bottom:24px;text-align:center;color:#e4e4e7}
.grid-konten{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.kartu-k{aspect-ratio:16/9;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:32px;cursor:pointer;transition:.3s}
.kartu-k:hover{background:${f.warnaPrimer}22;border-color:${f.warnaAksen}66;transform:scale(1.03)}
.cta{text-align:center;padding:48px 24px;background:linear-gradient(135deg,${f.warnaPrimer}22,${f.warnaAksen}12);border-top:1px solid rgba(255,255,255,.08)}
.cta h2{font-size:22px;margin-bottom:8px}
.cta p{color:#a1a1aa;margin-bottom:20px;font-size:14px}
.cta a{display:inline-block;padding:13px 32px;background:${f.warnaPrimer};color:#fff;border-radius:8px;text-decoration:none;font-weight:700}
footer{text-align:center;padding:20px;color:#52525b;font-size:12px;border-top:1px solid rgba(255,255,255,.06)}
</style></head><body>
<section id="hero">
  <div class="avatar">😎</div>
  <h1>${f.namaOwner}</h1>
  <div class="job">${f.pekerjaan} · ${f.tagline}</div>
  <p class="bio">${f.deskripsi}</p>
  <div class="links">
    <a href="#" class="link-btn">📸 ${f.instagram}</a>
    <a href="mailto:${f.email}" class="link-btn">📧 Email</a>
    <a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" class="link-btn">💬 WhatsApp</a>
    <a href="#kolaborasi" class="link-btn" style="background:${f.warnaPrimer};border-color:${f.warnaPrimer}">🤝 Kolaborasi</a>
  </div>
</section>
<div class="konten"><h2>✨ Konten Terbaru</h2>
<div class="grid-konten">
  <div class="kartu-k">🎬</div><div class="kartu-k">📸</div>
  <div class="kartu-k">🎵</div><div class="kartu-k">📝</div>
</div></div>
<div class="cta" id="kolaborasi">
  <h2>Mau Kolaborasi?</h2>
  <p>Kirim pesan dan kita diskusikan projeknya!</p>
  <a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}">Chat Sekarang 🚀</a>
</div>
<footer><p>© 2025 ${f.namaOwner}</p></footer>
</body></html>`;
}

function generateHTML(templateId: string, f: FormData): string {
  if (templateId === "bisnis")  return buildBisnisHTML(f);
  if (templateId === "toko")    return buildTokoHTML(f);
  if (templateId === "kreator") return buildKreatorHTML(f);
  return buildPortfolioHTML(f);
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function BuatPage() {
  const [step, setStep]           = useState<"template" | "form" | "preview">("template");
  const [templateId, setTemplateId] = useState("portfolio");
  const [form, setForm]           = useState<FormData>(DEFAULT);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [showModal, setShowModal] = useState(false);
  const [reqName, setReqName]     = useState("");
  const [reqWa, setReqWa]         = useState("");
  const [sent, setSent]           = useState(false);

  const update = (k: keyof FormData, v: string) => setForm(prev => ({ ...prev, [k]: v }));
  const html = generateHTML(templateId, form);

  const handleDownload = () => {
    if (!reqName || !reqWa) return;
    const tpl = TEMPLATES.find(t => t.id === templateId)!;
    const msg = encodeURIComponent(
      `Halo kak AMRT.dev 👋\n\nSaya *${reqName}* mau minta approve download website saya.\n\n` +
      `📌 Template: *${tpl.name}*\n` +
      `🌐 Nama Website: *${form.namaWebsite}*\n` +
      `👤 Nama: *${form.namaOwner}*\n` +
      `📧 Email: *${form.email}*\n` +
      `📱 WA: *${reqWa}*\n\n` +
      `Saya sudah buat website dan puas dengan hasilnya! Mohon di-approve kak 🙏`
    );
    window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");

    // Setelah buka WA, trigger browser print sebagai PDF
    setTimeout(() => {
      const iframe = document.getElementById("preview-frame") as HTMLIFrameElement | null;
      if (iframe?.contentWindow) iframe.contentWindow.print();
    }, 1200);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/belajar" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm text-gray-400">Buat Website</span>
            {/* step breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 ml-4">
              {(["template","form","preview"] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gray-700">›</span>}
                  <button
                    onClick={() => { if (s !== "preview" || step === "preview") setStep(s); }}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${step === s ? "bg-primary-500/20 text-primary-400" : "text-gray-600 hover:text-gray-400"}`}
                  >
                    {s === "template" ? "1. Template" : s === "form" ? "2. Isi Konten" : "3. Preview"}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {step === "preview" && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Download className="w-4 h-4" /> Download / Hosting
            </button>
          )}
        </div>
      </div>

      {/* ── Step 1: Pilih Template ── */}
      {step === "template" && (
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Pilih Template</h1>
            <p className="text-gray-400">Pilih gaya website yang sesuai dengan kebutuhanmu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTemplateId(t.id); setStep("form"); }}
                className={`group relative p-6 rounded-2xl border text-left transition-all hover:border-primary-500/40 hover:bg-white/4 ${templateId === t.id ? "border-primary-500/50 bg-primary-500/8" : "border-white/10 bg-white/3"}`}
              >
                <div className="text-5xl mb-4">{t.preview}</div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary-200 transition-colors">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.desc}</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-primary-400 transition-colors flex items-center justify-center">
                  {templateId === t.id && <div className="w-3 h-3 rounded-full bg-primary-400" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Isi Form ── */}
      {step === "form" && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Isi Konten Website</h1>
            <p className="text-gray-400 text-sm">Template: <span className="text-primary-400 font-medium">{TEMPLATES.find(t=>t.id===templateId)?.name}</span></p>
          </div>
          <div className="space-y-5">
            {([
              { k:"namaWebsite",  label:"Nama Website",       ph:"Nama.dev" },
              { k:"tagline",      label:"Tagline / Slogan",   ph:"Web Developer & Designer" },
              { k:"namaOwner",    label:"Nama Kamu",          ph:"Nama Kamu" },
              { k:"pekerjaan",    label:"Pekerjaan / Profesi",ph:"Web Developer" },
              { k:"deskripsi",    label:"Tentang Kamu",       ph:"Ceritakan sedikit tentang dirimu..." },
              { k:"email",        label:"Email",              ph:"nama@email.com" },
              { k:"instagram",    label:"Instagram",          ph:"@namakamu" },
              { k:"whatsapp",     label:"Nomor WhatsApp",     ph:"08123456789" },
            ] as {k: keyof FormData, label: string, ph: string}[]).map(({ k, label, ph }) => (
              <div key={k}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                {k === "deskripsi" ? (
                  <textarea
                    value={form[k]} onChange={e => update(k, e.target.value)}
                    placeholder={ph} rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 focus:bg-white/8 transition text-sm resize-none"
                  />
                ) : (
                  <input
                    value={form[k]} onChange={e => update(k, e.target.value)}
                    placeholder={ph}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 focus:bg-white/8 transition text-sm"
                  />
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {([
                { k:"skill1", label:"Skill / Produk 1" },
                { k:"skill2", label:"Skill / Produk 2" },
                { k:"skill3", label:"Skill / Produk 3" },
                { k:"skill4", label:"Skill / Produk 4" },
              ] as {k: keyof FormData, label: string}[]).map(({ k, label }) => (
                <div key={k}>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                  <input
                    value={form[k]} onChange={e => update(k, e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 transition text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "warnaPrimer" as keyof FormData, label: "Warna Utama" },
                { k: "warnaAksen"  as keyof FormData, label: "Warna Aksen" },
              ].map(({ k, label }) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                    <input type="color" value={form[k]} onChange={e => update(k, e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <span className="text-sm text-gray-400 font-mono">{form[k]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("preview")}
            className="w-full mt-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,102,255,0.35)] flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" /> Lihat Preview Website
          </button>
        </div>
      )}

      {/* ── Step 3: Preview ── */}
      {step === "preview" && (
        <div className="flex flex-col h-[calc(100vh-56px)]">
          {/* toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/8 bg-white/2">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep("form")} className="text-xs text-gray-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/8 transition">← Edit</button>
              <span className="text-xs text-gray-600">|</span>
              <span className="text-xs text-gray-500 truncate max-w-[160px]">{form.namaWebsite}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPreviewMode("desktop")} className={`p-2 rounded-lg transition ${previewMode==="desktop" ? "bg-white/10 text-white" : "text-gray-600 hover:text-gray-400"}`}>
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setPreviewMode("mobile")} className={`p-2 rounded-lg transition ${previewMode==="mobile" ? "bg-white/10 text-white" : "text-gray-600 hover:text-gray-400"}`}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* iframe */}
          <div className="flex-1 overflow-auto flex items-start justify-center bg-[#111827] p-4">
            <div className={`transition-all duration-300 bg-white shadow-2xl rounded-lg overflow-hidden ${previewMode === "mobile" ? "w-[375px] min-h-[680px]" : "w-full max-w-5xl min-h-full"}`}
              style={{ height: previewMode === "mobile" ? "680px" : "calc(100vh - 160px)" }}
            >
              <iframe
                id="preview-frame"
                srcDoc={html}
                className="w-full h-full border-0"
                title="Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Download / Hosting ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f1117] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button onClick={() => { setShowModal(false); setSent(false); }} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <>
                <div className="text-3xl mb-3">📥</div>
                <h2 className="text-xl font-bold mb-1">Download & Hosting</h2>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Isi data kamu, lalu kita kirim pesan ke admin AMRT.dev.
                  Setelah di-approve, website kamu bisa langsung di-download!
                  Kalau mau hosting juga, tinggal bilang di chat.
                </p>
                <div className="space-y-3 mb-5">
                  <input
                    value={reqName} onChange={e => setReqName(e.target.value)}
                    placeholder="Nama lengkap kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 text-sm"
                  />
                  <input
                    value={reqWa} onChange={e => setReqWa(e.target.value)}
                    placeholder="Nomor WhatsApp kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 text-sm"
                  />
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!reqName || !reqWa}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1fb855] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim ke Admin & Download
                </button>
                <p className="text-[11px] text-gray-600 text-center mt-3">
                  Gratis 100% · Tidak perlu akun · Langsung chat WA
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Pesan Terkirim! 🎉</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Admin akan segera konfirmasi via WhatsApp.
                  Browser print dialog juga sudah muncul — kamu bisa save sebagai PDF!
                </p>
                <p className="text-xs text-primary-400">Mau website ini dihosting? Bilang aja di chat WhatsApp-nya 🚀</p>
                <button
                  onClick={() => { setShowModal(false); setSent(false); }}
                  className="mt-5 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
