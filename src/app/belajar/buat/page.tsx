"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Eye, Download, Smartphone, Monitor,
  X, Send, CheckCircle, Upload, Sparkles,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type FieldType = "text" | "textarea" | "color" | "image" | "select" | "group4";

interface Field {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  sub?: { key: string; placeholder: string }[]; // for group4
}

interface Template {
  id: string;
  name: string;
  desc: string;
  preview: string;
  fields: Field[];
}

// ── Animation CSS injector ─────────────────────────────────────────────────────
function getAnimCSS(anim: string): string {
  if (anim === "fade") return `
    @keyframes _fi{from{opacity:0}to{opacity:1}}
    .ao{opacity:0;animation:_fi .7s ease forwards}`;
  if (anim === "slide") return `
    @keyframes _su{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    .ao{opacity:0;animation:_su .6s cubic-bezier(.16,1,.3,1) forwards}`;
  if (anim === "zoom") return `
    @keyframes _zi{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
    .ao{opacity:0;animation:_zi .5s ease forwards}`;
  if (anim === "bounce") return `
    @keyframes _bo{0%{opacity:0;transform:translateY(-20px)}60%{transform:translateY(6px)}100%{opacity:1;transform:translateY(0)}}
    .ao{opacity:0;animation:_bo .7s ease forwards}`;
  return ".ao{}";
}

function delay(n: number) { return `animation-delay:${n * 0.12}s`; }

// ── HTML Generators ────────────────────────────────────────────────────────────
function genPortfolio(d: Record<string, string>): string {
  const ac = getAnimCSS(d.animasi || "slide");
  const foto = d.foto || "";
  const c1 = d.warnaPrimer || "#2563eb";
  const c2 = d.warnaAksen  || "#60a5fa";
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${d.namaLengkap || "Portfolio"}</title><style>
${ac}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;background:#08090f;color:#fff}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 48px;height:64px;position:fixed;top:0;left:0;right:0;
  background:rgba(8,9,15,.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.07);z-index:100}
.logo{font-weight:700;font-size:18px;color:${c2}}
nav ul{display:flex;gap:28px;list-style:none}nav a{color:#9ca3af;text-decoration:none;font-size:14px;transition:.25s}nav a:hover{color:#fff}
#hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  padding:80px 24px 0;background:radial-gradient(ellipse 70% 55% at 50% 25%,${c1}1a,transparent 70%)}
.foto-wrap{width:110px;height:110px;border-radius:50%;overflow:hidden;margin:0 auto 24px;border:3px solid ${c2}55;${foto?"":"background:linear-gradient(135deg,"+c1+","+c2+")"}}
.foto-wrap img{width:100%;height:100%;object-fit:cover}
.foto-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:42px}
.job{color:${c2};font-size:15px;font-weight:600;margin-bottom:10px;letter-spacing:.04em}
h1{font-size:clamp(28px,5vw,54px);font-weight:800;margin-bottom:14px;line-height:1.15}
.tagline{color:#9ca3af;font-size:17px;max-width:480px;line-height:1.7;margin:0 auto 32px}
.btn{display:inline-block;padding:13px 32px;background:${c1};color:#fff;border-radius:8px;
  text-decoration:none;font-weight:700;transition:.25s;font-size:15px}
.btn:hover{opacity:.85;transform:translateY(-2px)}
section.sec{padding:80px 48px;max-width:1000px;margin:0 auto}
h2{font-size:28px;font-weight:700;margin-bottom:40px;text-align:center}
.skills{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
.skill{padding:14px 26px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;font-size:15px;transition:.25s}
.skill:hover{background:${c1}22;border-color:${c2}55;transform:translateY(-3px)}
.kontak{text-align:center;max-width:480px;margin:0 auto}
.kontak p{color:#9ca3af;margin:8px 0;font-size:15px}
footer{text-align:center;padding:28px;color:#374151;font-size:13px;border-top:1px solid rgba(255,255,255,.06)}
@media(max-width:640px){nav{padding:0 20px}.sec{padding:60px 20px}nav ul{gap:16px;font-size:13px}}
</style></head><body>
<nav class="ao" style="${delay(0)}">
  <div class="logo">${d.namaLengkap ? d.namaLengkap.split(" ")[0] + ".dev" : "Portfolio"}</div>
  <ul><li><a href="#skill">Skill</a></li><li><a href="#kontak">Kontak</a></li></ul>
</nav>
<section id="hero">
  <div class="foto-wrap ao" style="${delay(1)}">
    ${foto ? `<img src="${foto}" alt="Foto"/>` : `<div class="foto-placeholder">😎</div>`}
  </div>
  <p class="job ao" style="${delay(2)}">${d.pekerjaan || "Web Developer"}</p>
  <h1 class="ao" style="${delay(3)}">Halo, Saya <span style="color:${c2}">${d.namaLengkap || "Nama Kamu"}</span> 👋</h1>
  <p class="tagline ao" style="${delay(4)}">${d.bio || "Ceritakan sedikit tentang dirimu."}</p>
  <a href="#kontak" class="btn ao" style="${delay(5)}">Hubungi Saya</a>
</section>
<section id="skill" class="sec"><h2 class="ao" style="${delay(0)}">✨ Skill Saya</h2>
<div class="skills">
  ${[d.skill1,d.skill2,d.skill3,d.skill4].filter(Boolean).map((s,i)=>`<div class="skill ao" style="${delay(i+1)}">⚡ ${s}</div>`).join("")}
</div></section>
<section id="kontak" class="sec kontak">
  <h2 class="ao" style="${delay(0)}">📬 Hubungi Saya</h2>
  ${d.email?`<p class="ao" style="${delay(1)}">📧 ${d.email}</p>`:""}
  ${d.instagram?`<p class="ao" style="${delay(2)}">📸 ${d.instagram}</p>`:""}
  ${d.linkedin?`<p class="ao" style="${delay(3)}">💼 ${d.linkedin}</p>`:""}
  ${d.whatsapp?`<br/><a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="btn ao" style="${delay(4)}">💬 Chat WhatsApp</a>`:""}
</section>
<footer><p>© 2025 ${d.namaLengkap || "Portfolio"} · ${d.tagline || ""}</p></footer>
</body></html>`;
}

function genBisnis(d: Record<string, string>): string {
  const ac = getAnimCSS(d.animasi || "slide");
  const c1 = d.warnaPrimer || "#2563eb";
  const c2 = d.warnaAksen  || "#60a5fa";
  const logo   = d.logo;
  const banner = d.heroBanner;
  const fiturs = [
    { nama: d.fitur1, desc: d.deskripsiFitur1, icon: "⚡" },
    { nama: d.fitur2, desc: d.deskripsiFitur2, icon: "🎯" },
    { nama: d.fitur3, desc: d.deskripsiFitur3, icon: "🤝" },
    { nama: d.fitur4, desc: d.deskripsiFitur4, icon: "🚀" },
  ].filter(f => f.nama);
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${d.namaBisnis || "Bisnis"}</title><style>
${ac}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;background:#fff;color:#111}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 48px;height:64px;background:#fff;
  box-shadow:0 1px 12px rgba(0,0,0,.07);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:${c1}}
.logo img{height:36px;width:auto;object-fit:contain}
.btn{padding:10px 24px;background:${c1};color:#fff;border-radius:7px;text-decoration:none;font-weight:700;font-size:14px;border:none;cursor:pointer}
#hero{min-height:88vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;
  padding:80px 24px;position:relative;overflow:hidden;
  background:${banner?"url('')":"linear-gradient(135deg,"+c1+"0d,"+c2+"0d)"}}
${banner?`#hero::before{content:'';position:absolute;inset:0;background:url('${banner}') center/cover;opacity:.18}`:""}
#hero>*{position:relative;z-index:1}
#hero h1{font-size:clamp(28px,5vw,56px);font-weight:900;color:#111;margin-bottom:14px;line-height:1.12}
.hl{color:${c1}}
.sub{color:#555;font-size:17px;max-width:500px;line-height:1.7;margin-bottom:32px}
.fitur-wrap{padding:72px 48px;background:#f9fafb}
.fitur-wrap h2{font-size:28px;font-weight:800;text-align:center;margin-bottom:40px;color:#111}
.fitur-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;max-width:960px;margin:0 auto}
.kartu{padding:28px;background:#fff;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,.06);transition:.25s}
.kartu:hover{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,.1)}
.kartu .ikon{font-size:28px;margin-bottom:12px}
.kartu h3{font-weight:700;font-size:15px;margin-bottom:8px;color:#111}
.kartu p{color:#6b7280;font-size:13px;line-height:1.6}
.cta-wrap{background:${c1};color:#fff;padding:64px 48px;text-align:center}
.cta-wrap h2{font-size:26px;font-weight:800;margin-bottom:10px}
.cta-wrap p{opacity:.85;margin-bottom:24px;font-size:15px}
.btn-w{padding:14px 36px;background:#fff;color:${c1};border-radius:8px;text-decoration:none;font-weight:800;font-size:15px;display:inline-block}
footer{text-align:center;padding:22px;color:#9ca3af;font-size:13px;border-top:1px solid #e5e7eb}
@media(max-width:640px){nav{padding:0 20px}.fitur-wrap{padding:48px 20px}.cta-wrap{padding:48px 20px}}
</style></head><body>
<nav class="ao" style="${delay(0)}">
  <div class="logo">${logo?`<img src="${logo}" alt="logo"/>`:""}${d.namaBisnis||"Bisnis Saya"}</div>
  <a href="#cta" class="btn">Hubungi Kami</a>
</nav>
<section id="hero">
  <h1 class="ao" style="${delay(1)}">${d.slogan||"Solusi Terbaik"}<br/><span class="hl">${d.namaBisnis||""}</span></h1>
  <p class="sub ao" style="${delay(2)}">${d.deskripsi||"Deskripsi bisnis kamu."}</p>
  <a href="#cta" class="btn ao" style="${delay(3)}" style="font-size:16px;padding:14px 36px">Mulai Sekarang →</a>
</section>
${fiturs.length>0?`<div class="fitur-wrap"><h2 class="ao" style="${delay(0)}">🌟 Keunggulan Kami</h2>
<div class="fitur-grid">${fiturs.map((f,i)=>`<div class="kartu ao" style="${delay(i+1)}"><div class="ikon">${f.icon}</div><h3>${f.nama}</h3><p>${f.desc||"Layanan berkualitas tinggi."}</p></div>`).join("")}</div></div>`:""}
<div class="cta-wrap" id="cta">
  <h2 class="ao" style="${delay(0)}">Siap Bekerja Sama?</h2>
  <p class="ao" style="${delay(1)}">${d.email||""} · ${d.alamat||""}</p>
  ${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="btn-w ao" style="${delay(2)}">💬 Chat WhatsApp</a>`:""}
</div>
<footer><p>© 2025 ${d.namaBisnis||"Bisnis Saya"}</p></footer>
</body></html>`;
}

function genToko(d: Record<string, string>): string {
  const ac = getAnimCSS(d.animasi || "fade");
  const c1 = d.warnaPrimer || "#7c3aed";
  const c2 = d.warnaAksen  || "#a78bfa";
  const logo   = d.logoToko;
  const banner = d.bannerToko;
  const produk = [
    { nama: d.produk1, harga: d.harga1, emoji: d.emoji1||"📦", foto: d.fotoProduk1 },
    { nama: d.produk2, harga: d.harga2, emoji: d.emoji2||"🎁", foto: d.fotoProduk2 },
    { nama: d.produk3, harga: d.harga3, emoji: d.emoji3||"⭐", foto: d.fotoProduk3 },
    { nama: d.produk4, harga: d.harga4, emoji: d.emoji4||"🏆", foto: d.fotoProduk4 },
  ].filter(p => p.nama);
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${d.namaToko||"Toko"}</title><style>
${ac}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;background:#fafafa;color:#111}
nav{display:flex;justify-content:space-between;align-items:center;padding:0 40px;height:60px;background:#fff;
  box-shadow:0 1px 8px rgba(0,0,0,.07);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:8px;font-weight:800;font-size:18px;color:${c1}}
.logo img{height:32px;width:auto}
.cart{background:${c1};color:#fff;border:none;padding:8px 20px;border-radius:20px;cursor:pointer;font-weight:700;font-size:13px}
#hero{background:linear-gradient(120deg,${c1},${c2});padding:${banner?"0":"56px 40px"};text-align:center;color:#fff;position:relative;overflow:hidden}
${banner?`#hero img.banner{width:100%;max-height:380px;object-fit:cover;display:block;opacity:.6}`:""}
${banner?`#hero .hero-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px}`:`#hero .hero-inner{}`}
#hero h1{font-size:clamp(22px,4vw,44px);font-weight:900;margin-bottom:10px}
#hero p{font-size:15px;opacity:.9;margin-bottom:24px}
.btn-w{display:inline-block;padding:12px 28px;background:#fff;color:${c1};border-radius:8px;text-decoration:none;font-weight:800}
.produk-wrap{padding:56px 40px}
.produk-wrap h2{font-size:22px;font-weight:800;margin-bottom:28px;text-align:center}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px}
.p-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);transition:.25s}
.p-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.12)}
.p-img{height:140px;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-size:48px;overflow:hidden}
.p-img img{width:100%;height:100%;object-fit:cover}
.p-info{padding:14px}
.p-info h3{font-size:14px;font-weight:700;margin-bottom:6px}
.harga{color:${c1};font-weight:900;font-size:16px;margin-bottom:10px}
.beli{width:100%;padding:9px;background:${c1};color:#fff;border:none;border-radius:7px;cursor:pointer;font-weight:700;font-size:13px;transition:.2s}
.beli:hover{opacity:.85}
.cta-kontak{background:${c1}12;padding:48px 40px;text-align:center}
.cta-kontak h2{color:${c1};font-size:22px;font-weight:800;margin-bottom:8px}
.cta-kontak p{color:#6b7280;font-size:14px;margin-bottom:16px}
.wa-btn{display:inline-block;padding:12px 28px;background:#25D366;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px}
footer{text-align:center;padding:20px;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb}
@media(max-width:600px){nav{padding:0 16px}.produk-wrap{padding:40px 16px}}
</style></head><body>
<nav class="ao" style="${delay(0)}">
  <div class="logo">${logo?`<img src="${logo}" alt="logo"/>`:"🛍️ "}${d.namaToko||"Toko Saya"}</div>
  <button class="cart">🛒 Keranjang</button>
</nav>
<section id="hero">
  ${banner?`<img src="${banner}" class="banner" alt="banner"/>`:""}
  <div class="hero-inner">
    <h1 class="ao" style="${delay(1)}">${d.slogan||d.namaToko||"Toko Terbaik"}</h1>
    <p class="ao" style="${delay(2)}">${d.deskripsi||""}</p>
    <a href="#produk" class="btn-w ao" style="${delay(3)}">Lihat Produk</a>
  </div>
</section>
${produk.length>0?`<div class="produk-wrap" id="produk"><h2 class="ao" style="${delay(0)}">🔥 Produk Unggulan</h2>
<div class="pgrid">${produk.map((p,i)=>`
<div class="p-card ao" style="${delay(i+1)}">
  <div class="p-img">${p.foto?`<img src="${p.foto}" alt="${p.nama}"/>`:`<span>${p.emoji}</span>`}</div>
  <div class="p-info"><h3>${p.nama}</h3><div class="harga">Rp ${p.harga||"0"}</div>
  <button class="beli" onclick="window.open('https://wa.me/${(d.whatsapp||"").replace(/\D/g,"")}?text=Halo, saya mau pesan ${p.nama}','_blank')">Beli Sekarang</button>
  </div></div>`).join("")}</div></div>`:""}
<div class="cta-kontak">
  <h2 class="ao" style="${delay(0)}">Ada Pertanyaan?</h2>
  <p class="ao" style="${delay(1)}">${d.alamat||""} ${d.instagram?`· ${d.instagram}`:""}</p>
  ${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="wa-btn ao" style="${delay(2)}">💬 Chat WhatsApp</a>`:""}
</div>
<footer><p>© 2025 ${d.namaToko||"Toko Saya"}</p></footer>
</body></html>`;
}

function genKreator(d: Record<string, string>): string {
  const ac = getAnimCSS(d.animasi || "zoom");
  const c1 = d.warnaPrimer || "#ec4899";
  const c2 = d.warnaAksen  || "#f9a8d4";
  const foto = d.fotoProfil;
  const links = [
    d.youtube    && { label:"▶️ YouTube",  url: d.youtube },
    d.tiktok     && { label:"🎵 TikTok",   url: d.tiktok },
    d.instagram  && { label:"📸 Instagram", url: d.instagram },
    d.twitter    && { label:"🐦 X/Twitter", url: d.twitter },
  ].filter(Boolean) as {label:string;url:string}[];
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${d.nama||"Creator"}</title><style>
${ac}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;background:#09090b;color:#fff;min-height:100vh}
#hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  padding:64px 24px;background:radial-gradient(ellipse 65% 55% at 50% 0%,${c1}28,transparent 65%)}
.avatar{width:104px;height:104px;border-radius:50%;margin:0 auto 20px;border:3px solid ${c1}66;overflow:hidden;
  ${foto?"":"background:linear-gradient(135deg,"+c1+","+c2+")"};display:flex;align-items:center;justify-content:center;font-size:40px}
.avatar img{width:100%;height:100%;object-fit:cover}
h1{font-size:clamp(26px,5vw,48px);font-weight:900;margin-bottom:6px}
.username{color:${c1};font-weight:700;font-size:15px;margin-bottom:14px}
.bio{color:#a1a1aa;max-width:400px;line-height:1.7;margin-bottom:10px;font-size:15px}
.kategori{display:inline-block;padding:4px 14px;background:${c1}20;color:${c2};border-radius:20px;font-size:12px;font-weight:600;margin-bottom:28px}
.links{display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px;margin:0 auto 36px}
.link-btn{display:block;padding:13px 20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
  border-radius:10px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;transition:.22s;text-align:center}
.link-btn:hover{background:${c1};border-color:${c1};transform:scale(1.02)}
.collab{background:${c1};border:none;color:#fff;padding:13px 32px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;
  display:block;width:100%;max-width:360px;margin:0 auto;transition:.25s}
.collab:hover{opacity:.85}
.stats{display:flex;gap:32px;justify-content:center;margin:40px 0 0;flex-wrap:wrap}
.stat{text-align:center}
.stat .val{font-size:22px;font-weight:800;color:${c2}}
.stat .lbl{font-size:12px;color:#71717a;margin-top:2px}
footer{text-align:center;padding:20px;color:#3f3f46;font-size:12px;border-top:1px solid rgba(255,255,255,.06)}
</style></head><body>
<section id="hero">
  <div class="avatar ao" style="${delay(0)}">${foto?`<img src="${foto}" alt="foto"/>`:"😎"}</div>
  <h1 class="ao" style="${delay(1)}">${d.nama||"Nama Kreator"}</h1>
  <div class="username ao" style="${delay(2)}">@${(d.username||"username").replace("@","")}</div>
  <p class="bio ao" style="${delay(3)}">${d.bio||"Bio kreator."}</p>
  ${d.kategori?`<span class="kategori ao" style="${delay(4)}">${d.kategori}</span>`:""}
  <div class="links">
    ${links.map((l,i)=>`<a href="${l.url}" target="_blank" class="link-btn ao" style="${delay(i+5)}">${l.label}</a>`).join("")}
  </div>
  ${d.whatsapp?`<button class="collab ao" style="${delay(links.length+5)}" onclick="window.open('https://wa.me/${d.whatsapp.replace(/\D/g,"")}?text=Halo, saya ingin kolaborasi!','_blank')">🤝 Ajak Kolaborasi</button>`:""}
  <div class="stats ao" style="${delay(links.length+6)}">
    <div class="stat"><div class="val">${d.statFoloer||"10K+"}</div><div class="lbl">Followers</div></div>
    <div class="stat"><div class="val">${d.statKonten||"200+"}</div><div class="lbl">Konten</div></div>
    <div class="stat"><div class="val">${d.statBrand||"50+"}</div><div class="lbl">Brand Deal</div></div>
  </div>
</section>
<footer><p>© 2025 ${d.nama||"Creator"}</p></footer>
</body></html>`;
}

function generateHTML(tid: string, d: Record<string, string>): string {
  if (tid === "bisnis")  return genBisnis(d);
  if (tid === "toko")    return genToko(d);
  if (tid === "kreator") return genKreator(d);
  return genPortfolio(d);
}

// ── Animation options ──────────────────────────────────────────────────────────
const ANIM_OPTIONS = [
  { value: "none",   label: "Tanpa Animasi" },
  { value: "fade",   label: "✨ Fade In" },
  { value: "slide",  label: "⬆️ Slide Up" },
  { value: "zoom",   label: "🔍 Zoom In" },
  { value: "bounce", label: "🎈 Bounce" },
];

// ── Template definitions ───────────────────────────────────────────────────────
const TEMPLATES: Template[] = [
  {
    id: "portfolio", name: "Portfolio Personal",
    desc: "Untuk freelancer, designer, developer", preview: "👤",
    fields: [
      { key:"foto",       label:"Foto Profil",        type:"image",   placeholder:"Upload foto kamu" },
      { key:"namaLengkap",label:"Nama Lengkap",        type:"text",    placeholder:"Nama Kamu" },
      { key:"pekerjaan",  label:"Pekerjaan / Profesi", type:"text",    placeholder:"Web Developer" },
      { key:"tagline",    label:"Tagline",             type:"text",    placeholder:"Kalimat singkat tentang kamu" },
      { key:"bio",        label:"Tentang Kamu",        type:"textarea",placeholder:"Ceritakan dirimu..." },
      { key:"skills",     label:"Skill (4 skill)",     type:"group4",
        sub:[{key:"skill1",placeholder:"HTML & CSS"},{key:"skill2",placeholder:"JavaScript"},
             {key:"skill3",placeholder:"UI/UX Design"},{key:"skill4",placeholder:"Figma"}] },
      { key:"email",      label:"Email",               type:"text",    placeholder:"nama@email.com" },
      { key:"instagram",  label:"Instagram",           type:"text",    placeholder:"@namakamu" },
      { key:"linkedin",   label:"LinkedIn URL",        type:"text",    placeholder:"linkedin.com/in/nama" },
      { key:"whatsapp",   label:"Nomor WhatsApp",      type:"text",    placeholder:"08123456789" },
      { key:"warnaPrimer",label:"Warna Utama",         type:"color" },
      { key:"warnaAksen", label:"Warna Aksen",         type:"color" },
      { key:"animasi",    label:"Animasi Masuk",       type:"select",  options: ANIM_OPTIONS },
    ],
  },
  {
    id: "bisnis", name: "Landing Bisnis",
    desc: "Promosikan layanan atau produk bisnis", preview: "🏢",
    fields: [
      { key:"logo",       label:"Logo Bisnis",         type:"image",   placeholder:"Upload logo" },
      { key:"heroBanner", label:"Foto Banner Hero",    type:"image",   placeholder:"Upload foto/banner" },
      { key:"namaBisnis", label:"Nama Bisnis",         type:"text",    placeholder:"PT Nama Jaya" },
      { key:"slogan",     label:"Slogan / Headline",   type:"text",    placeholder:"Solusi Terbaik untuk Kamu" },
      { key:"deskripsi",  label:"Deskripsi Bisnis",    type:"textarea",placeholder:"Ceritakan bisnis kamu..." },
      { key:"fiturs",     label:"Keunggulan (4 item)", type:"group4",
        sub:[{key:"fitur1",placeholder:"Keunggulan 1"},{key:"fitur2",placeholder:"Keunggulan 2"},
             {key:"fitur3",placeholder:"Keunggulan 3"},{key:"fitur4",placeholder:"Keunggulan 4"}] },
      { key:"deskFiturs", label:"Deskripsi Keunggulan",type:"group4",
        sub:[{key:"deskripsiFitur1",placeholder:"Penjelasan keunggulan 1"},
             {key:"deskripsiFitur2",placeholder:"Penjelasan keunggulan 2"},
             {key:"deskripsiFitur3",placeholder:"Penjelasan keunggulan 3"},
             {key:"deskripsiFitur4",placeholder:"Penjelasan keunggulan 4"}] },
      { key:"email",      label:"Email Bisnis",        type:"text",    placeholder:"bisnis@email.com" },
      { key:"whatsapp",   label:"WhatsApp Bisnis",     type:"text",    placeholder:"08123456789" },
      { key:"alamat",     label:"Kota / Alamat",       type:"text",    placeholder:"Jakarta, Indonesia" },
      { key:"warnaPrimer",label:"Warna Utama",         type:"color" },
      { key:"warnaAksen", label:"Warna Aksen",         type:"color" },
      { key:"animasi",    label:"Animasi Masuk",       type:"select",  options: ANIM_OPTIONS },
    ],
  },
  {
    id: "toko", name: "Toko Online",
    desc: "Tampilkan produk dan katalog online", preview: "🛍️",
    fields: [
      { key:"logoToko",   label:"Logo Toko",           type:"image",   placeholder:"Upload logo toko" },
      { key:"bannerToko", label:"Banner Toko",         type:"image",   placeholder:"Upload banner" },
      { key:"namaToko",   label:"Nama Toko",           type:"text",    placeholder:"Toko Keren Ku" },
      { key:"slogan",     label:"Slogan Toko",         type:"text",    placeholder:"Belanja Mudah & Murah" },
      { key:"deskripsi",  label:"Deskripsi Toko",      type:"textarea",placeholder:"Toko kami menjual..." },
      { key:"produk1",    label:"Produk 1 — Nama",     type:"text",    placeholder:"Nama produk 1" },
      { key:"harga1",     label:"Produk 1 — Harga",    type:"text",    placeholder:"99.000" },
      { key:"fotoProduk1",label:"Produk 1 — Foto",     type:"image",   placeholder:"Upload foto produk 1" },
      { key:"produk2",    label:"Produk 2 — Nama",     type:"text",    placeholder:"Nama produk 2" },
      { key:"harga2",     label:"Produk 2 — Harga",    type:"text",    placeholder:"149.000" },
      { key:"fotoProduk2",label:"Produk 2 — Foto",     type:"image",   placeholder:"Upload foto produk 2" },
      { key:"produk3",    label:"Produk 3 — Nama",     type:"text",    placeholder:"Nama produk 3" },
      { key:"harga3",     label:"Produk 3 — Harga",    type:"text",    placeholder:"199.000" },
      { key:"fotoProduk3",label:"Produk 3 — Foto",     type:"image",   placeholder:"Upload foto produk 3" },
      { key:"produk4",    label:"Produk 4 — Nama",     type:"text",    placeholder:"Nama produk 4" },
      { key:"harga4",     label:"Produk 4 — Harga",    type:"text",    placeholder:"299.000" },
      { key:"fotoProduk4",label:"Produk 4 — Foto",     type:"image",   placeholder:"Upload foto produk 4" },
      { key:"whatsapp",   label:"WhatsApp Order",      type:"text",    placeholder:"08123456789" },
      { key:"instagram",  label:"Instagram Toko",      type:"text",    placeholder:"@tokokamu" },
      { key:"alamat",     label:"Kota / Alamat",       type:"text",    placeholder:"Bandung, Jawa Barat" },
      { key:"warnaPrimer",label:"Warna Utama",         type:"color" },
      { key:"warnaAksen", label:"Warna Aksen",         type:"color" },
      { key:"animasi",    label:"Animasi Masuk",       type:"select",  options: ANIM_OPTIONS },
    ],
  },
  {
    id: "kreator", name: "Content Creator",
    desc: "Showcase konten & link sosmed", preview: "🎥",
    fields: [
      { key:"fotoProfil", label:"Foto Profil",         type:"image",   placeholder:"Upload foto profil" },
      { key:"nama",       label:"Nama Lengkap",        type:"text",    placeholder:"Nama Kreator" },
      { key:"username",   label:"Username / Handle",   type:"text",    placeholder:"@kreatorku" },
      { key:"bio",        label:"Bio",                 type:"textarea",placeholder:"Kreator konten yang..." },
      { key:"kategori",   label:"Kategori Konten",     type:"text",    placeholder:"Lifestyle · Tech · Gaming" },
      { key:"youtube",    label:"Link YouTube",        type:"text",    placeholder:"https://youtube.com/@kamu" },
      { key:"tiktok",     label:"Link TikTok",         type:"text",    placeholder:"https://tiktok.com/@kamu" },
      { key:"instagram",  label:"Link Instagram",      type:"text",    placeholder:"https://instagram.com/kamu" },
      { key:"twitter",    label:"Link X/Twitter",      type:"text",    placeholder:"https://x.com/kamu" },
      { key:"whatsapp",   label:"WhatsApp Kolaborasi", type:"text",    placeholder:"08123456789" },
      { key:"statFoloer", label:"Jumlah Followers",    type:"text",    placeholder:"10K+" },
      { key:"statKonten", label:"Jumlah Konten",       type:"text",    placeholder:"200+" },
      { key:"statBrand",  label:"Brand Deal",          type:"text",    placeholder:"50+" },
      { key:"warnaPrimer",label:"Warna Tema",          type:"color" },
      { key:"warnaAksen", label:"Warna Aksen",         type:"color" },
      { key:"animasi",    label:"Animasi Masuk",       type:"select",  options: ANIM_OPTIONS },
    ],
  },
];

// ── Defaults per template ──────────────────────────────────────────────────────
const DEFAULTS: Record<string, Record<string, string>> = {
  portfolio: { namaLengkap:"Nama Kamu", pekerjaan:"Web Developer", tagline:"Membangun website impianmu",
    bio:"Halo! Saya seorang web developer yang suka membuat website modern dan responsif.",
    skill1:"HTML & CSS", skill2:"JavaScript", skill3:"UI/UX Design", skill4:"Figma",
    email:"nama@email.com", instagram:"@namakamu", whatsapp:"08123456789",
    warnaPrimer:"#2563eb", warnaAksen:"#60a5fa", animasi:"slide" },
  bisnis: { namaBisnis:"Nama Bisnis", slogan:"Solusi Terbaik untuk Kamu",
    deskripsi:"Kami menyediakan layanan berkualitas tinggi untuk kebutuhan digital bisnis Anda.",
    fitur1:"Kualitas Premium", fitur2:"Tepat Waktu", fitur3:"Harga Terjangkau", fitur4:"Support 24/7",
    deskripsiFitur1:"Standar kualitas tertinggi", deskripsiFitur2:"Pengiriman selalu on schedule",
    deskripsiFitur3:"Harga bersaing di pasaran", deskripsiFitur4:"Siap membantu kapanpun",
    email:"bisnis@email.com", whatsapp:"08123456789", alamat:"Jakarta, Indonesia",
    warnaPrimer:"#2563eb", warnaAksen:"#60a5fa", animasi:"slide" },
  toko: { namaToko:"Toko Keren", slogan:"Belanja Mudah & Terpercaya",
    deskripsi:"Toko online terpercaya dengan produk berkualitas dan harga terbaik.",
    produk1:"Produk Unggulan", harga1:"99.000", produk2:"Best Seller", harga2:"149.000",
    produk3:"New Arrival", harga3:"199.000", produk4:"Limited Edition", harga4:"299.000",
    whatsapp:"08123456789", instagram:"@tokokamu", alamat:"Bandung, Jawa Barat",
    warnaPrimer:"#7c3aed", warnaAksen:"#a78bfa", animasi:"fade" },
  kreator: { nama:"Nama Kreator", username:"@kreatorku", bio:"Content creator yang suka berbagi hal menarik setiap hari!",
    kategori:"Lifestyle · Tech · Gaming", statFoloer:"10K+", statKonten:"200+", statBrand:"50+",
    whatsapp:"08123456789", warnaPrimer:"#ec4899", warnaAksen:"#f9a8d4", animasi:"zoom" },
};

// ── Image upload component ─────────────────────────────────────────────────────
function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (b64: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
        className="relative w-full h-28 rounded-xl border-2 border-dashed border-white/15 hover:border-primary-500/50 bg-white/3 hover:bg-white/6 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 overflow-hidden"
      >
        {value ? (
          <>
            <img src={value} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="relative z-10 text-xs text-white bg-black/50 px-3 py-1 rounded-full">Klik untuk ganti</div>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Klik atau drag foto di sini</span>
          </>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if(f) handleFile(f); }} />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function BuatPage() {
  const [step, setStep]     = useState<"template"|"form"|"preview">("template");
  const [tid, setTid]       = useState("portfolio");
  const [formData, setFormData] = useState<Record<string, string>>(DEFAULTS.portfolio);
  const [prevMode, setPrevMode] = useState<"desktop"|"mobile">("desktop");
  const [showModal, setShowModal] = useState(false);
  const [reqName, setReqName]   = useState("");
  const [reqWa, setReqWa]       = useState("");
  const [sent, setSent]         = useState(false);

  const tpl = TEMPLATES.find(t => t.id === tid)!;
  const html = generateHTML(tid, formData);

  const set = useCallback((k: string, v: string) => setFormData(p => ({...p, [k]: v})), []);

  const pickTemplate = (id: string) => {
    setTid(id);
    setFormData(DEFAULTS[id] || {});
    setStep("form");
  };

  const handleDownload = () => {
    if (!reqName || !reqWa) return;
    const msg = encodeURIComponent(
      `Halo kak AMRT.dev 👋\n\nSaya *${reqName}* mau minta approve download website saya.\n\n` +
      `📌 Template: *${tpl.name}*\n🌐 Nama Website: *${formData.namaWebsite||formData.namaBisnis||formData.namaToko||formData.nama||"-"}*\n` +
      `📱 WA saya: *${reqWa}*\n\nSaya sudah puas dengan hasilnya! Mohon di-approve kak 🙏`
    );
    window.open(`https://wa.me/6283805753932?text=${msg}`, "_blank");
    setTimeout(() => {
      const iframe = document.getElementById("pf") as HTMLIFrameElement | null;
      if (iframe?.contentWindow) iframe.contentWindow.print();
    }, 1200);
    setSent(true);
  };

  // ── Render field ──────────────────────────────────────────────────────────────
  const renderField = (f: Field) => {
    const base = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 focus:bg-white/8 transition text-sm";

    if (f.type === "image") return (
      <ImageUpload key={f.key} label={f.label} value={formData[f.key]||""} onChange={v => set(f.key, v)} />
    );
    if (f.type === "textarea") return (
      <div key={f.key}>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
        <textarea value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)}
          placeholder={f.placeholder} rows={3} className={base + " resize-none"} />
      </div>
    );
    if (f.type === "color") return (
      <div key={f.key}>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
          <input type="color" value={formData[f.key]||"#2563eb"} onChange={e=>set(f.key,e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
          <span className="text-sm text-gray-400 font-mono">{formData[f.key]||"#2563eb"}</span>
        </div>
      </div>
    );
    if (f.type === "select") return (
      <div key={f.key}>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          <Sparkles className="inline w-3.5 h-3.5 mr-1 text-primary-400" />{f.label}
        </label>
        <div className="flex flex-wrap gap-2">
          {f.options?.map(opt => (
            <button key={opt.value} type="button" onClick={() => set(f.key, opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formData[f.key]===opt.value ? "bg-primary-500 text-white border-primary-500" : "bg-white/5 text-gray-400 border-white/10 hover:border-white/25"}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
    if (f.type === "group4") return (
      <div key={f.key}>
        <label className="block text-sm font-medium text-gray-300 mb-2">{f.label}</label>
        <div className="grid grid-cols-2 gap-2">
          {f.sub?.map(s => (
            <input key={s.key} value={formData[s.key]||""} onChange={e=>set(s.key,e.target.value)}
              placeholder={s.placeholder}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 text-sm" />
          ))}
        </div>
      </div>
    );
    return (
      <div key={f.key}>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
        <input value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)}
          placeholder={f.placeholder} className={base} />
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/belajar" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm text-gray-400">Buat Website</span>
            <div className="hidden sm:flex items-center gap-1 ml-3">
              {(["template","form","preview"] as const).map((s,i) => (
                <div key={s} className="flex items-center gap-1">
                  {i>0 && <span className="text-gray-700 text-xs">›</span>}
                  <button onClick={() => { if(s!=="preview"||step==="preview") setStep(s); }}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${step===s?"bg-primary-500/20 text-primary-400":"text-gray-600 hover:text-gray-400"}`}>
                    {i+1}. {s==="template"?"Template":s==="form"?"Isi Konten":"Preview"}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {step==="preview" && (
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-all">
              <Download className="w-4 h-4"/> Download / Hosting
            </button>
          )}
        </div>
      </div>

      {/* Step 1: Template */}
      {step==="template" && (
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Pilih Template</h1>
            <p className="text-gray-400">Pilih gaya website sesuai kebutuhanmu</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => pickTemplate(t.id)}
                className={`group relative p-6 rounded-2xl border text-left transition-all hover:border-primary-500/40 hover:bg-white/4 ${tid===t.id?"border-primary-500/50 bg-primary-500/8":"border-white/10 bg-white/3"}`}>
                <div className="text-5xl mb-4">{t.preview}</div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary-200 transition-colors">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.desc}</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-primary-400 transition-colors flex items-center justify-center">
                  {tid===t.id && <div className="w-3 h-3 rounded-full bg-primary-400"/>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Form */}
      {step==="form" && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">Isi Konten Website</h1>
            <p className="text-gray-400 text-sm">
              Template: <span className="text-primary-400 font-medium">{tpl.name}</span>
              {" · "}
              <button onClick={() => setStep("template")} className="text-gray-500 hover:text-gray-300 underline text-xs">Ganti template</button>
            </p>
          </div>
          <div className="space-y-5">
            {tpl.fields.map(f => renderField(f))}
          </div>
          <button onClick={() => setStep("preview")}
            className="w-full mt-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,102,255,0.35)] flex items-center justify-center gap-2">
            <Eye className="w-5 h-5"/> Lihat Preview Website
          </button>
        </div>
      )}

      {/* Step 3: Preview */}
      {step==="preview" && (
        <div className="flex flex-col h-[calc(100vh-56px)]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/8 bg-white/2">
            <div className="flex items-center gap-2">
              <button onClick={() => setStep("form")} className="text-xs text-gray-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/8 transition">← Edit</button>
              <span className="text-xs text-gray-600">|</span>
              <span className="text-xs text-gray-500 truncate max-w-[160px]">{tpl.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPrevMode("desktop")} className={`p-2 rounded-lg transition ${prevMode==="desktop"?"bg-white/10 text-white":"text-gray-600 hover:text-gray-400"}`}>
                <Monitor className="w-4 h-4"/>
              </button>
              <button onClick={() => setPrevMode("mobile")} className={`p-2 rounded-lg transition ${prevMode==="mobile"?"bg-white/10 text-white":"text-gray-600 hover:text-gray-400"}`}>
                <Smartphone className="w-4 h-4"/>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-start justify-center bg-[#111827] p-4">
            <div className={`transition-all duration-300 bg-white shadow-2xl rounded-lg overflow-hidden ${prevMode==="mobile"?"w-[375px]":"w-full max-w-5xl"}`}
              style={{ height: prevMode==="mobile"?"700px":"calc(100vh - 160px)" }}>
              <iframe id="pf" srcDoc={html} className="w-full h-full border-0" title="Preview"/>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f1117] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button onClick={() => { setShowModal(false); setSent(false); }} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-5 h-5"/>
            </button>
            {!sent ? (
              <>
                <div className="text-3xl mb-3">📥</div>
                <h2 className="text-xl font-bold mb-1">Download & Hosting</h2>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Isi data kamu → chat otomatis ke admin AMRT.dev → setelah approve, website bisa di-download.
                  Mau hosting juga? Bilang aja di chat! 🚀
                </p>
                <div className="space-y-3 mb-5">
                  <input value={reqName} onChange={e=>setReqName(e.target.value)} placeholder="Nama lengkap kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 text-sm"/>
                  <input value={reqWa} onChange={e=>setReqWa(e.target.value)} placeholder="Nomor WhatsApp kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/60 text-sm"/>
                </div>
                <button onClick={handleDownload} disabled={!reqName||!reqWa}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1fb855] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4"/> Kirim ke Admin & Download
                </button>
                <p className="text-[11px] text-gray-600 text-center mt-3">100% Gratis · Langsung chat WA admin</p>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4"/>
                <h2 className="text-xl font-bold mb-2">Terkirim! 🎉</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Admin akan konfirmasi via WhatsApp. Browser print dialog sudah muncul — save sebagai PDF!
                </p>
                <p className="text-xs text-primary-400">Mau dihosting? Bilang di chat WA-nya 🚀</p>
                <button onClick={() => { setShowModal(false); setSent(false); }}
                  className="mt-5 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-all">
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
