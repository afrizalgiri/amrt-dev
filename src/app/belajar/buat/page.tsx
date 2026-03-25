"use client";
import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Monitor, Smartphone, Download, Upload, X, Send, CheckCircle,
  ChevronDown, User, Building2, ShoppingBag, Video,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type FT = "text" | "textarea" | "color" | "image" | "select";
interface Field  { key: string; label: string; type: FT; placeholder?: string; options?: {value:string;label:string}[] }
interface FGroup { title: string; fields: Field[] }
interface Tpl    { id:string; name:string; desc:string; Icon:React.ElementType; color:string; groups:FGroup[] }

// ─── Animation ─────────────────────────────────────────────────────────────────
const ANIM: {value:string;label:string}[] = [
  {value:"none",  label:"Tanpa Animasi"},
  {value:"fade",  label:"Fade In"},
  {value:"slide", label:"Slide Up"},
  {value:"zoom",  label:"Zoom In"},
  {value:"bounce",label:"Bounce"},
];
function getAnim(a:string):string {
  if (a==="fade")   return `@keyframes _f{from{opacity:0}to{opacity:1}}.ao{opacity:0;animation:_f .65s ease forwards}`;
  if (a==="slide")  return `@keyframes _s{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}.ao{opacity:0;animation:_s .6s cubic-bezier(.16,1,.3,1) forwards}`;
  if (a==="zoom")   return `@keyframes _z{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:none}}.ao{opacity:0;animation:_z .5s ease forwards}`;
  if (a==="bounce") return `@keyframes _b{0%{opacity:0;transform:translateY(-22px)}65%{transform:translateY(5px)}100%{opacity:1;transform:none}}.ao{opacity:0;animation:_b .75s ease forwards}`;
  return ".ao{}";
}
function dl(n:number){return `animation-delay:${(n*0.11).toFixed(2)}s`}

// ─── Google Fonts snippet ───────────────────────────────────────────────────────
const GF = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;

// ─── HTML Generators ───────────────────────────────────────────────────────────
function genPortfolio(d:Record<string,string>):string {
  const ac=getAnim(d.animasi||"slide"),c1=d.warnaPrimer||"#2563eb",c2=d.warnaAksen||"#60a5fa";
  const foto=d.foto||"", initials=(d.namaLengkap||"N").split(" ").map((x:string)=>x[0]).slice(0,2).join("").toUpperCase();
  const skills=[d.skill1,d.skill2,d.skill3,d.skill4].filter(Boolean);
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${d.namaLengkap||"Portfolio"}</title>${GF}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#060b18;color:#e2e8f0;line-height:1.6}
:root{--p:${c1};--a:${c2}}
/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:99;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:rgba(6,11,24,.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,.06)}
.nav-logo{font-weight:800;font-size:18px;color:var(--a);letter-spacing:-.3px}
.nav-links{display:flex;gap:28px}.nav-links a{color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}.nav-links a:hover{color:#fff}
/* HERO */
#hero{min-height:100vh;display:flex;align-items:center;padding:80px 5% 60px;background:radial-gradient(ellipse 75% 60% at 50% -10%,${c1}18 0%,transparent 65%)}
.hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr auto;gap:64px;align-items:center;width:100%}
.hero-text{}
.hero-tag{display:inline-block;padding:4px 14px;background:${c1}1a;color:var(--a);border:1px solid ${c1}33;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px}
.hero-text h1{font-size:clamp(36px,5.5vw,64px);font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;color:#f1f5f9}
.hero-text h1 span{color:var(--a)}
.hero-text p{font-size:17px;color:#94a3b8;max-width:480px;line-height:1.75;margin-bottom:32px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-prim{padding:13px 28px;background:var(--p);color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;transition:all .25s;display:inline-flex;align-items:center;gap:8px}
.btn-prim:hover{background:${c1}dd;transform:translateY(-2px);box-shadow:0 8px 24px ${c1}44}
.btn-sec{padding:13px 28px;border:1.5px solid rgba(255,255,255,.12);color:#e2e8f0;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;transition:all .25s;background:rgba(255,255,255,.04)}
.btn-sec:hover{border-color:var(--a);color:var(--a)}
.hero-photo{width:220px;height:220px;border-radius:24px;overflow:hidden;flex-shrink:0;border:2px solid rgba(255,255,255,.08);background:linear-gradient(135deg,${c1}33,${c2}22);display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:800;color:var(--a)}
.hero-photo img{width:100%;height:100%;object-fit:cover}
/* SKILLS */
#skills{padding:80px 5%;background:rgba(255,255,255,.015);border-top:1px solid rgba(255,255,255,.05)}
.sec-inner{max-width:900px;margin:0 auto}
.sec-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--a);margin-bottom:12px}
.sec-title{font-size:clamp(22px,3vw,32px);font-weight:800;color:#f1f5f9;margin-bottom:36px;letter-spacing:-.5px}
.skill-grid{display:flex;flex-wrap:wrap;gap:12px}
.skill-tag{padding:10px 20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:10px;font-size:14px;font-weight:500;color:#cbd5e1;transition:all .22s;cursor:default}
.skill-tag:hover{background:${c1}18;border-color:${c1}44;color:#fff}
/* CONTACT */
#contact{padding:80px 5%}
.contact-inner{max-width:600px;margin:0 auto;text-align:center}
.contact-inner .sec-title{margin-bottom:12px}
.contact-inner p{color:#64748b;font-size:15px;margin-bottom:36px}
.contact-items{display:flex;flex-direction:column;gap:12px;margin-bottom:28px}
.contact-item{display:flex;align-items:center;gap:10px;padding:14px 20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;color:#94a3b8;font-size:14px;text-decoration:none;transition:all .2s}
.contact-item:hover{border-color:${c1}44;color:#fff;background:${c1}10}
.contact-item .ci-label{flex:1;text-align:left;font-weight:500}
footer{text-align:center;padding:28px;color:#334155;font-size:13px;border-top:1px solid rgba(255,255,255,.05)}
@media(max-width:680px){.hero-inner{grid-template-columns:1fr}.hero-photo{width:120px;height:120px;font-size:36px;order:-1}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="nav-logo">${d.namaLengkap||"Portfolio"}</div><nav class="nav-links"><a href="#skills">Skill</a><a href="#contact">Kontak</a></nav></nav>
<section id="hero"><div class="hero-inner">
<div class="hero-text">
<span class="hero-tag ao" style="${dl(1)}">${d.pekerjaan||"Web Developer"}</span>
<h1 class="ao" style="${dl(2)}">Halo, saya <span>${d.namaLengkap||"Nama Kamu"}</span></h1>
<p class="ao" style="${dl(3)}">${d.bio||"Seorang developer yang passionate membuat website modern dan berkualitas."}</p>
<div class="hero-btns ao" style="${dl(4)}"><a href="#contact" class="btn-prim">Hubungi Saya</a><a href="#skills" class="btn-sec">Lihat Skill</a></div>
</div>
<div class="hero-photo ao" style="${dl(2)}">${foto?`<img src="${foto}" alt="${d.namaLengkap}"/>`:`${initials}`}</div>
</div></section>
${skills.length?`<section id="skills"><div class="sec-inner"><p class="sec-label ao" style="${dl(0)}">Keahlian</p><h2 class="sec-title ao" style="${dl(1)}">Skill & Teknologi</h2><div class="skill-grid">${skills.map((s,i)=>`<span class="skill-tag ao" style="${dl(i+2)}">${s}</span>`).join("")}</div></div></section>`:""}
<section id="contact"><div class="contact-inner"><p class="sec-label ao" style="${dl(0)}">Kontak</p><h2 class="sec-title ao" style="${dl(1)}">Mari Berkolaborasi</h2><p class="ao" style="${dl(2)}">Punya proyek menarik? Jangan ragu untuk menghubungi saya.</p><div class="contact-items">${d.email?`<a href="mailto:${d.email}" class="contact-item ao" style="${dl(3)}"><span>Email</span><span class="ci-label">${d.email}</span><span>→</span></a>`:""} ${d.instagram?`<a href="#" class="contact-item ao" style="${dl(4)}"><span>Instagram</span><span class="ci-label">${d.instagram}</span><span>→</span></a>`:""} ${d.linkedin?`<a href="${d.linkedin}" target="_blank" class="contact-item ao" style="${dl(5)}"><span>LinkedIn</span><span class="ci-label">Lihat Profil</span><span>→</span></a>`:""}</div>${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="btn-prim ao" style="${dl(6)}" style="display:inline-flex">Chat WhatsApp</a>`:""}</div></section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaLengkap||"Portfolio"}. All rights reserved.</p></footer>
</body></html>`;
}

function genBisnis(d:Record<string,string>):string {
  const ac=getAnim(d.animasi||"slide"),c1=d.warnaPrimer||"#1d4ed8",c2=d.warnaAksen||"#3b82f6";
  const logo=d.logo,banner=d.heroBanner;
  const fiturs=[
    {nama:d.fitur1,desc:d.deskripsiFitur1,icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`},
    {nama:d.fitur2,desc:d.deskripsiFitur2,icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`},
    {nama:d.fitur3,desc:d.deskripsiFitur3,icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`},
    {nama:d.fitur4,desc:d.deskripsiFitur4,icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`},
  ].filter(f=>f.nama);
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${d.namaBisnis||"Bisnis"}</title>${GF}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#fff;color:#111827;line-height:1.6}
:root{--p:${c1};--a:${c2}}
/* NAV */
nav{position:sticky;top:0;z-index:99;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:#fff;border-bottom:1px solid #f1f5f9;box-shadow:0 1px 16px rgba(0,0,0,.06)}
.nav-logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;color:#111;letter-spacing:-.4px}
.nav-logo img{height:36px;width:auto;object-fit:contain}
.nav-logo span{color:var(--p)}
.btn{padding:10px 22px;background:var(--p);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;transition:all .22s}
.btn:hover{background:${c1}dd;transform:translateY(-1px)}
/* HERO */
#hero{min-height:88vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 5% 80px;position:relative;overflow:hidden;background:linear-gradient(160deg,${c1}08 0%,${c2}06 50%,transparent 100%)}
${banner?`#hero::after{content:'';position:absolute;inset:0;background:url('${banner}') center/cover;opacity:.08;z-index:0}`:""}
.hero-inner{position:relative;z-index:1;max-width:760px;margin:0 auto}
.hero-badge{display:inline-block;padding:5px 16px;background:${c1}12;color:var(--p);border:1px solid ${c1}25;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px}
#hero h1{font-size:clamp(32px,5.5vw,62px);font-weight:900;line-height:1.1;letter-spacing:-1.5px;color:#0f172a;margin-bottom:20px}
#hero h1 span{color:var(--p)}
#hero .sub{font-size:18px;color:#6b7280;max-width:520px;margin:0 auto 36px;line-height:1.75}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-lg{padding:15px 34px;font-size:15px;font-weight:700;border-radius:10px}
.btn-out{padding:15px 34px;font-size:15px;font-weight:600;border-radius:10px;border:1.5px solid #e5e7eb;color:#374151;text-decoration:none;transition:all .22s;background:#fff}
.btn-out:hover{border-color:var(--p);color:var(--p)}
/* FEATURES */
#features{padding:90px 5%;background:#f9fafb}
.feat-inner{max-width:1080px;margin:0 auto}
.sec-header{text-align:center;margin-bottom:56px}
.sec-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--p);margin-bottom:10px}
.sec-title{font-size:clamp(24px,3vw,38px);font-weight:800;color:#0f172a;letter-spacing:-.6px}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px}
.feat-card{padding:28px;background:#fff;border-radius:16px;border:1px solid #f1f5f9;box-shadow:0 2px 16px rgba(0,0,0,.05);transition:all .25s}
.feat-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,.1);border-color:${c1}22}
.feat-icon{width:44px;height:44px;background:${c1}12;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:var(--p)}
.feat-card h3{font-size:16px;font-weight:700;color:#111827;margin-bottom:8px}
.feat-card p{font-size:14px;color:#6b7280;line-height:1.65}
/* CTA */
#cta{padding:80px 5%;background:linear-gradient(135deg,var(--p),${c2});text-align:center;color:#fff}
#cta h2{font-size:clamp(26px,4vw,42px);font-weight:800;margin-bottom:12px;letter-spacing:-.8px}
#cta p{font-size:16px;opacity:.88;margin-bottom:32px}
.btn-cta{display:inline-block;padding:15px 38px;background:#fff;color:var(--p);border-radius:10px;text-decoration:none;font-weight:800;font-size:15px;transition:all .22s}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
footer{text-align:center;padding:24px;color:#9ca3af;font-size:13px;border-top:1px solid #f1f5f9;background:#fff}
@media(max-width:640px){.hero-btns{flex-direction:column;align-items:center}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="nav-logo">${logo?`<img src="${logo}" alt="logo"/>`:"<span>"+(d.namaBisnis||"Bisnis").charAt(0)+"</span>"}<span>${d.namaBisnis||"Bisnis Saya"}</span></div><a href="#cta" class="btn">Hubungi Kami</a></nav>
<section id="hero"><div class="hero-inner">
<span class="hero-badge ao" style="${dl(1)}">${d.slogan||"Solusi Digital Terbaik"}</span>
<h1 class="ao" style="${dl(2)}">${d.namaBisnis?`<span>${d.namaBisnis}</span><br>`:""}${d.slogan||"Solusi Terpercaya untuk Bisnis Anda"}</h1>
<p class="sub ao" style="${dl(3)}">${d.deskripsi||"Kami membantu bisnis Anda tumbuh dengan solusi digital yang tepat, efisien, dan berkualitas tinggi."}</p>
<div class="hero-btns ao" style="${dl(4)}"><a href="#cta" class="btn btn-lg">Mulai Sekarang</a><a href="#features" class="btn-out btn-lg">Pelajari Lebih</a></div>
</div></section>
${fiturs.length?`<section id="features"><div class="feat-inner"><div class="sec-header"><p class="sec-label ao" style="${dl(0)}">Keunggulan</p><h2 class="sec-title ao" style="${dl(1)}">Mengapa Memilih Kami?</h2></div><div class="feat-grid">${fiturs.map((f,i)=>`<div class="feat-card ao" style="${dl(i+2)}"><div class="feat-icon">${f.icon}</div><h3>${f.nama}</h3><p>${f.desc||"Layanan terbaik untuk kebutuhan Anda."}</p></div>`).join("")}</div></div></section>`:""}
<section id="cta"><h2 class="ao" style="${dl(0)}">Siap Mulai Kerja Sama?</h2><p class="ao" style="${dl(1)}">${[d.email,d.alamat].filter(Boolean).join(" &middot; ")}</p>${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="btn-cta ao" style="${dl(2)}">Chat WhatsApp</a>`:""}</section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaBisnis||"Bisnis Saya"}</p></footer>
</body></html>`;
}

function genToko(d:Record<string,string>):string {
  const ac=getAnim(d.animasi||"fade"),c1=d.warnaPrimer||"#7c3aed",c2=d.warnaAksen||"#a78bfa";
  const logo=d.logoToko,banner=d.bannerToko;
  const produk=[
    {nama:d.produk1,harga:d.harga1,foto:d.fotoProduk1},
    {nama:d.produk2,harga:d.harga2,foto:d.fotoProduk2},
    {nama:d.produk3,harga:d.harga3,foto:d.fotoProduk3},
    {nama:d.produk4,harga:d.harga4,foto:d.fotoProduk4},
  ].filter(p=>p.nama);
  const fmtHarga=(h:string)=>h?`Rp ${parseInt(h.replace(/\D/g,"")).toLocaleString("id")}`:"-";
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${d.namaToko||"Toko"}</title>${GF}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#fafafa;color:#111827;line-height:1.6}
:root{--p:${c1};--a:${c2}}
/* NAV */
nav{position:sticky;top:0;z-index:99;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:#fff;border-bottom:1px solid #f1f5f9;box-shadow:0 1px 12px rgba(0,0,0,.06)}
.nav-logo{display:flex;align-items:center;gap:9px;font-weight:800;font-size:17px;color:var(--p)}
.nav-logo img{height:30px;width:auto;object-fit:contain}
.nav-right{display:flex;align-items:center;gap:14px}
.cart-btn{display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--p);color:#fff;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;border:none;transition:.22s}
.cart-btn:hover{opacity:.88}
/* HERO */
#hero{position:relative;overflow:hidden;min-height:${banner?"480px":"420px"};display:flex;align-items:flex-end;background:linear-gradient(125deg,${c1},${c2})}
${banner?`#hero .bg{position:absolute;inset:0;background:url('${banner}') center/cover;opacity:.35}`:""}
.hero-content{position:relative;z-index:1;padding:60px 5%;color:#fff;max-width:600px}
.hero-content h1{font-size:clamp(28px,5vw,52px);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:12px}
.hero-content p{font-size:16px;opacity:.88;margin-bottom:26px}
.btn-hero{display:inline-block;padding:13px 28px;background:#fff;color:var(--p);border-radius:9px;text-decoration:none;font-weight:800;font-size:14px;transition:.22s}
.btn-hero:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.2)}
/* PRODUCTS */
#produk{padding:72px 5%}
.prod-inner{max-width:1100px;margin:0 auto}
.sec-header{margin-bottom:40px}
.sec-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--p);margin-bottom:8px}
.sec-title{font-size:clamp(22px,3vw,34px);font-weight:800;color:#0f172a;letter-spacing:-.5px}
.prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
.prod-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid #f1f5f9;box-shadow:0 2px 12px rgba(0,0,0,.06);transition:.25s;display:flex;flex-direction:column}
.prod-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(0,0,0,.12)}
.prod-img{height:180px;background:linear-gradient(135deg,${c1}18,${c2}18);display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:48px}
.prod-img img{width:100%;height:100%;object-fit:cover}
.prod-body{padding:16px;display:flex;flex-direction:column;gap:8px;flex:1}
.prod-name{font-size:15px;font-weight:700;color:#111827}
.prod-price{font-size:17px;font-weight:800;color:var(--p)}
.beli-btn{margin-top:auto;padding:10px;background:var(--p);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:.22s;width:100%}
.beli-btn:hover{opacity:.88}
/* KONTAK */
#kontak{padding:60px 5%;background:#fff;border-top:1px solid #f1f5f9;text-align:center}
.kontak-inner{max-width:520px;margin:0 auto}
.kontak-inner h2{font-size:26px;font-weight:800;margin-bottom:10px;color:#0f172a}
.kontak-inner p{color:#6b7280;font-size:15px;margin-bottom:24px}
.wa-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:#25D366;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;transition:.22s}
.wa-btn:hover{background:#1da851;transform:translateY(-2px)}
footer{text-align:center;padding:22px;color:#9ca3af;font-size:13px;border-top:1px solid #f1f5f9;background:#fafafa}
@media(max-width:600px){.prod-grid{grid-template-columns:repeat(2,1fr)}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="nav-logo">${logo?`<img src="${logo}" alt="logo"/>`:""}${d.namaToko||"Toko"}</div><div class="nav-right"><button class="cart-btn" onclick="alert('Fitur keranjang belum aktif.')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Keranjang</button></div></nav>
<section id="hero">${banner?`<div class="bg"></div>`:""}<div class="hero-content"><h1 class="ao" style="${dl(1)}">${d.slogan||d.namaToko||"Toko Terbaik"}</h1><p class="ao" style="${dl(2)}">${d.deskripsi||"Produk berkualitas dengan harga terbaik."}</p><a href="#produk" class="btn-hero ao" style="${dl(3)}">Lihat Produk</a></div></section>
${produk.length?`<section id="produk"><div class="prod-inner"><div class="sec-header"><p class="sec-label ao" style="${dl(0)}">Katalog</p><h2 class="sec-title ao" style="${dl(1)}">Produk Unggulan</h2></div><div class="prod-grid">${produk.map((p,i)=>`<div class="prod-card ao" style="${dl(i+2)}"><div class="prod-img">${p.foto?`<img src="${p.foto}" alt="${p.nama}"/>`:`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${c2}" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/></svg>`}</div><div class="prod-body"><div class="prod-name">${p.nama}</div><div class="prod-price">${fmtHarga(p.harga||"")}</div><button class="beli-btn" onclick="window.open('https://wa.me/${(d.whatsapp||"").replace(/\D/g,"")}?text=Halo, saya mau pesan ${encodeURIComponent(p.nama||"")}','_blank')">Pesan Sekarang</button></div></div>`).join("")}</div></div></section>`:""}
<section id="kontak"><div class="kontak-inner"><h2 class="ao" style="${dl(0)}">Ada Pertanyaan?</h2><p class="ao" style="${dl(1)}">${d.alamat||""}</p>${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="wa-btn ao" style="${dl(2)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Chat WhatsApp</a>`:""}</div></section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaToko||"Toko Saya"}</p></footer>
</body></html>`;
}

function genKreator(d:Record<string,string>):string {
  const ac=getAnim(d.animasi||"zoom"),c1=d.warnaPrimer||"#ec4899",c2=d.warnaAksen||"#f9a8d4";
  const foto=d.fotoProfil;
  const initials=(d.nama||"K").split(" ").map((x:string)=>x[0]).slice(0,2).join("").toUpperCase();
  const platforms=[
    d.youtube   &&{label:"YouTube",url:d.youtube,  color:"#FF0000",svg:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`},
    d.tiktok    &&{label:"TikTok",  url:d.tiktok,  color:"#010101",svg:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1-.39z"/></svg>`},
    d.instagram &&{label:"Instagram",url:d.instagram,color:"#E1306C",svg:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`},
    d.twitter   &&{label:"X / Twitter",url:d.twitter,color:"#000",svg:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`},
  ].filter(Boolean) as {label:string;url:string;color:string;svg:string}[];
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${d.nama||"Creator"}</title>${GF}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#09090b;color:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:48px 24px 48px}
:root{--p:${c1};--a:${c2}}
.card{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:0}
.avatar{width:96px;height:96px;border-radius:50%;overflow:hidden;border:2.5px solid ${c1}55;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;margin-bottom:16px;flex-shrink:0}
.avatar img{width:100%;height:100%;object-fit:cover}
.name{font-size:22px;font-weight:800;text-align:center;margin-bottom:4px;letter-spacing:-.3px}
.handle{font-size:14px;color:${c2};font-weight:600;margin-bottom:10px}
.bio{font-size:14px;color:#a1a1aa;text-align:center;line-height:1.7;max-width:320px;margin-bottom:10px}
.cat{display:inline-block;padding:4px 14px;background:${c1}20;color:${c2};border:1px solid ${c1}35;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:28px}
.links{display:flex;flex-direction:column;gap:10px;width:100%;margin-bottom:28px}
.link-item{display:flex;align-items:center;gap:12px;padding:14px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#fff;text-decoration:none;font-size:14px;font-weight:600;transition:all .2s}
.link-item:hover{background:rgba(255,255,255,.1);transform:translateX(4px)}
.link-icon{width:24px;height:24px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.link-icon svg{width:18px;height:18px}
.stats{display:flex;gap:24px;padding:20px 28px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:16px;width:100%;justify-content:center;margin-bottom:16px}
.stat{text-align:center}
.stat-val{font-size:20px;font-weight:800;color:${c2};letter-spacing:-.3px}
.stat-lbl{font-size:11px;color:#71717a;margin-top:3px;font-weight:500}
.collab{display:block;width:100%;padding:14px;background:var(--p);color:#fff;border-radius:12px;text-align:center;text-decoration:none;font-weight:700;font-size:14px;transition:.22s}
.collab:hover{opacity:.88;transform:translateY(-1px)}
footer{margin-top:32px;color:#3f3f46;font-size:12px;text-align:center}
</style></head><body>
<div class="card">
<div class="avatar ao" style="${dl(0)}">${foto?`<img src="${foto}" alt="${d.nama}"/>`:`${initials}`}</div>
<div class="name ao" style="${dl(1)}">${d.nama||"Nama Kreator"}</div>
<div class="handle ao" style="${dl(2)}">@${(d.username||"username").replace("@","")}</div>
<p class="bio ao" style="${dl(3)}">${d.bio||"Content creator yang suka berbagi hal-hal menarik setiap hari."}</p>
${d.kategori?`<span class="cat ao" style="${dl(4)}">${d.kategori}</span>`:""}
<div class="links">
${platforms.map((p,i)=>`<a href="${p.url}" target="_blank" class="link-item ao" style="${dl(i+5)}"><span class="link-icon" style="color:${p.color}">${p.svg}</span><span>${p.label}</span><span style="margin-left:auto;opacity:.4;font-size:12px">→</span></a>`).join("")}
</div>
<div class="stats ao" style="${dl(platforms.length+5)}">
<div class="stat"><div class="stat-val">${d.statFoloer||"10K+"}</div><div class="stat-lbl">Followers</div></div>
<div class="stat"><div class="stat-val">${d.statKonten||"200+"}</div><div class="stat-lbl">Konten</div></div>
<div class="stat"><div class="stat-val">${d.statBrand||"50+"}</div><div class="stat-lbl">Brand Deal</div></div>
</div>
${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="collab ao" style="${dl(platforms.length+6)}">Ajak Kolaborasi</a>`:""}
</div>
<footer><p>&copy; ${new Date().getFullYear()} ${d.nama||"Creator"}</p></footer>
</body></html>`;
}

function generateHTML(tid:string,d:Record<string,string>):string {
  if(tid==="bisnis")  return genBisnis(d);
  if(tid==="toko")    return genToko(d);
  if(tid==="kreator") return genKreator(d);
  return genPortfolio(d);
}

// ─── Templates config ──────────────────────────────────────────────────────────
const TEMPLATES:Tpl[] = [
  {
    id:"portfolio",name:"Portfolio Personal",desc:"Freelancer, Designer, Developer",
    Icon:User,color:"#2563eb",
    groups:[
      { title:"Identitas", fields:[
        {key:"foto",       label:"Foto Profil",    type:"image",    placeholder:"Upload foto kamu"},
        {key:"namaLengkap",label:"Nama Lengkap",   type:"text",     placeholder:"Nama Kamu"},
        {key:"pekerjaan",  label:"Profesi",        type:"text",     placeholder:"Web Developer"},
        {key:"bio",        label:"Tentang Kamu",   type:"textarea", placeholder:"Ceritakan sedikit tentang dirimu..."},
      ]},
      { title:"Skill", fields:[
        {key:"skill1",label:"Skill 1",type:"text",placeholder:"HTML & CSS"},
        {key:"skill2",label:"Skill 2",type:"text",placeholder:"JavaScript"},
        {key:"skill3",label:"Skill 3",type:"text",placeholder:"React"},
        {key:"skill4",label:"Skill 4",type:"text",placeholder:"Figma"},
      ]},
      { title:"Kontak & Sosmed", fields:[
        {key:"email",    label:"Email",       type:"text",placeholder:"nama@email.com"},
        {key:"whatsapp", label:"WhatsApp",    type:"text",placeholder:"08123456789"},
        {key:"instagram",label:"Instagram",   type:"text",placeholder:"@namakamu"},
        {key:"linkedin", label:"LinkedIn URL",type:"text",placeholder:"linkedin.com/in/nama"},
      ]},
      { title:"Tampilan", fields:[
        {key:"warnaPrimer",label:"Warna Utama", type:"color"},
        {key:"warnaAksen", label:"Warna Aksen", type:"color"},
        {key:"animasi",    label:"Animasi",     type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"bisnis",name:"Landing Bisnis",desc:"Layanan, Jasa, atau Produk Digital",
    Icon:Building2,color:"#1d4ed8",
    groups:[
      { title:"Identitas Bisnis", fields:[
        {key:"logo",      label:"Logo Bisnis",    type:"image",    placeholder:"Upload logo"},
        {key:"heroBanner",label:"Foto Hero",      type:"image",    placeholder:"Upload gambar hero"},
        {key:"namaBisnis",label:"Nama Bisnis",    type:"text",     placeholder:"PT Nama Jaya"},
        {key:"slogan",    label:"Slogan/Headline",type:"text",     placeholder:"Solusi Terbaik untuk Kamu"},
        {key:"deskripsi", label:"Deskripsi",      type:"textarea", placeholder:"Ceritakan bisnis kamu..."},
      ]},
      { title:"Keunggulan", fields:[
        {key:"fitur1",          label:"Keunggulan 1",      type:"text",placeholder:"Kualitas Premium"},
        {key:"deskripsiFitur1", label:"Deskripsi 1",       type:"text",placeholder:"Standar kualitas tertinggi"},
        {key:"fitur2",          label:"Keunggulan 2",      type:"text",placeholder:"Tepat Waktu"},
        {key:"deskripsiFitur2", label:"Deskripsi 2",       type:"text",placeholder:"Pengiriman selalu on schedule"},
        {key:"fitur3",          label:"Keunggulan 3",      type:"text",placeholder:"Harga Terjangkau"},
        {key:"deskripsiFitur3", label:"Deskripsi 3",       type:"text",placeholder:"Harga bersaing di pasaran"},
        {key:"fitur4",          label:"Keunggulan 4",      type:"text",placeholder:"Support 24/7"},
        {key:"deskripsiFitur4", label:"Deskripsi 4",       type:"text",placeholder:"Siap membantu kapanpun"},
      ]},
      { title:"Kontak", fields:[
        {key:"email",   label:"Email Bisnis",  type:"text",placeholder:"bisnis@email.com"},
        {key:"whatsapp",label:"WhatsApp",      type:"text",placeholder:"08123456789"},
        {key:"alamat",  label:"Kota / Alamat", type:"text",placeholder:"Jakarta, Indonesia"},
      ]},
      { title:"Tampilan", fields:[
        {key:"warnaPrimer",label:"Warna Utama",type:"color"},
        {key:"warnaAksen", label:"Warna Aksen",type:"color"},
        {key:"animasi",    label:"Animasi",    type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"toko",name:"Toko Online",desc:"Katalog produk & pemesanan via WA",
    Icon:ShoppingBag,color:"#7c3aed",
    groups:[
      { title:"Info Toko", fields:[
        {key:"logoToko",  label:"Logo Toko",    type:"image",    placeholder:"Upload logo toko"},
        {key:"bannerToko",label:"Banner Hero",  type:"image",    placeholder:"Upload banner"},
        {key:"namaToko",  label:"Nama Toko",    type:"text",     placeholder:"Toko Keren Ku"},
        {key:"slogan",    label:"Slogan",       type:"text",     placeholder:"Belanja Mudah & Terpercaya"},
        {key:"deskripsi", label:"Deskripsi",    type:"textarea", placeholder:"Toko kami menjual..."},
      ]},
      { title:"Produk 1", fields:[
        {key:"produk1",    label:"Nama Produk",type:"text",placeholder:"Nama produk"},
        {key:"harga1",     label:"Harga (Rp)", type:"text",placeholder:"99000"},
        {key:"fotoProduk1",label:"Foto Produk",type:"image",placeholder:"Upload foto"},
      ]},
      { title:"Produk 2", fields:[
        {key:"produk2",    label:"Nama Produk",type:"text",placeholder:"Nama produk"},
        {key:"harga2",     label:"Harga (Rp)", type:"text",placeholder:"149000"},
        {key:"fotoProduk2",label:"Foto Produk",type:"image",placeholder:"Upload foto"},
      ]},
      { title:"Produk 3", fields:[
        {key:"produk3",    label:"Nama Produk",type:"text",placeholder:"Nama produk"},
        {key:"harga3",     label:"Harga (Rp)", type:"text",placeholder:"199000"},
        {key:"fotoProduk3",label:"Foto Produk",type:"image",placeholder:"Upload foto"},
      ]},
      { title:"Produk 4", fields:[
        {key:"produk4",    label:"Nama Produk",type:"text",placeholder:"Nama produk"},
        {key:"harga4",     label:"Harga (Rp)", type:"text",placeholder:"299000"},
        {key:"fotoProduk4",label:"Foto Produk",type:"image",placeholder:"Upload foto"},
      ]},
      { title:"Kontak", fields:[
        {key:"whatsapp", label:"WhatsApp Order",   type:"text",placeholder:"08123456789"},
        {key:"instagram",label:"Instagram Toko",   type:"text",placeholder:"@tokokamu"},
        {key:"alamat",   label:"Kota / Alamat",    type:"text",placeholder:"Bandung, Jawa Barat"},
      ]},
      { title:"Tampilan", fields:[
        {key:"warnaPrimer",label:"Warna Utama",type:"color"},
        {key:"warnaAksen", label:"Warna Aksen",type:"color"},
        {key:"animasi",    label:"Animasi",    type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"kreator",name:"Content Creator",desc:"Link-in-bio & showcase platform",
    Icon:Video,color:"#ec4899",
    groups:[
      { title:"Profil", fields:[
        {key:"fotoProfil",label:"Foto Profil",   type:"image",    placeholder:"Upload foto"},
        {key:"nama",      label:"Nama",          type:"text",     placeholder:"Nama Kreator"},
        {key:"username",  label:"Username",      type:"text",     placeholder:"@kreatorku"},
        {key:"bio",       label:"Bio",           type:"textarea", placeholder:"Content creator yang suka..."},
        {key:"kategori",  label:"Kategori",      type:"text",     placeholder:"Lifestyle · Tech · Gaming"},
      ]},
      { title:"Platform", fields:[
        {key:"youtube",  label:"Link YouTube",  type:"text",placeholder:"https://youtube.com/@kamu"},
        {key:"tiktok",   label:"Link TikTok",   type:"text",placeholder:"https://tiktok.com/@kamu"},
        {key:"instagram",label:"Link Instagram",type:"text",placeholder:"https://instagram.com/kamu"},
        {key:"twitter",  label:"Link X/Twitter",type:"text",placeholder:"https://x.com/kamu"},
        {key:"whatsapp", label:"WA Kolaborasi", type:"text",placeholder:"08123456789"},
      ]},
      { title:"Statistik", fields:[
        {key:"statFoloer",label:"Followers", type:"text",placeholder:"10K+"},
        {key:"statKonten",label:"Konten",    type:"text",placeholder:"200+"},
        {key:"statBrand", label:"Brand Deal",type:"text",placeholder:"50+"},
      ]},
      { title:"Tampilan", fields:[
        {key:"warnaPrimer",label:"Warna Tema", type:"color"},
        {key:"warnaAksen", label:"Warna Aksen",type:"color"},
        {key:"animasi",    label:"Animasi",    type:"select",options:ANIM},
      ]},
    ],
  },
];

const DEFAULTS:Record<string,Record<string,string>> = {
  portfolio:{ namaLengkap:"Nama Kamu",pekerjaan:"Web Developer",bio:"Seorang web developer yang passionate membuat website modern dan berkualitas tinggi.",skill1:"HTML & CSS",skill2:"JavaScript",skill3:"React",skill4:"Figma",email:"nama@email.com",instagram:"@namakamu",whatsapp:"08123456789",warnaPrimer:"#2563eb",warnaAksen:"#60a5fa",animasi:"slide" },
  bisnis:{ namaBisnis:"Nama Bisnis",slogan:"Solusi Terbaik untuk Kamu",deskripsi:"Kami menyediakan layanan berkualitas tinggi untuk kebutuhan digital bisnis Anda.",fitur1:"Kualitas Premium",deskripsiFitur1:"Standar kualitas tertinggi di industri",fitur2:"Tepat Waktu",deskripsiFitur2:"Pengiriman selalu on schedule",fitur3:"Harga Terjangkau",deskripsiFitur3:"Harga kompetitif tanpa kompromi kualitas",fitur4:"Support 24/7",deskripsiFitur4:"Tim siap membantu kapanpun Anda butuhkan",email:"bisnis@email.com",whatsapp:"08123456789",alamat:"Jakarta, Indonesia",warnaPrimer:"#1d4ed8",warnaAksen:"#3b82f6",animasi:"slide" },
  toko:{ namaToko:"Toko Keren",slogan:"Belanja Mudah & Terpercaya",deskripsi:"Toko online terpercaya dengan produk berkualitas dan harga terbaik.",produk1:"Produk Unggulan",harga1:"99000",produk2:"Best Seller",harga2:"149000",produk3:"New Arrival",harga3:"199000",produk4:"Limited Edition",harga4:"299000",whatsapp:"08123456789",instagram:"@tokokamu",alamat:"Bandung, Jawa Barat",warnaPrimer:"#7c3aed",warnaAksen:"#a78bfa",animasi:"fade" },
  kreator:{ nama:"Nama Kreator",username:"@kreatorku",bio:"Content creator yang suka berbagi hal-hal menarik setiap hari.",kategori:"Lifestyle · Tech · Gaming",statFoloer:"10K+",statKonten:"200+",statBrand:"50+",whatsapp:"08123456789",warnaPrimer:"#ec4899",warnaAksen:"#f9a8d4",animasi:"zoom" },
};

// ─── ImageUpload ────────────────────────────────────────────────────────────────
function ImageUpload({label,value,onChange}:{label:string;value:string;onChange:(b64:string)=>void}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile=(file:File)=>{ const r=new FileReader(); r.onload=(e)=>onChange(e.target?.result as string); r.readAsDataURL(file); };
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <div onClick={()=>ref.current?.click()}
        onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
        className="relative w-full h-24 rounded-lg border border-dashed border-white/12 hover:border-white/25 bg-white/3 hover:bg-white/5 cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 overflow-hidden">
        {value?(
          <><img src={value} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-50"/><div className="relative z-10 text-[11px] text-white bg-black/50 px-2.5 py-1 rounded-full">Klik untuk ganti</div></>
        ):(
          <><Upload className="w-4 h-4 text-gray-600"/><span className="text-[11px] text-gray-600">Klik atau drag gambar</span></>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);}}/>
    </div>
  );
}

// ─── Accordion section ─────────────────────────────────────────────────────────
function Section({title,children,defaultOpen=false}:{title:string;children:React.ReactNode;defaultOpen?:boolean}) {
  const [open,setOpen]=useState(defaultOpen);
  return (
    <div className="border-b border-white/6">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-200 hover:bg-white/3 transition-colors">
        {title}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open?"rotate-180":""}`}/>
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function BuatPage() {
  const [tid,setTid]         = useState("portfolio");
  const [formData,setFormData] = useState<Record<string,string>>(DEFAULTS.portfolio);
  const [prevMode,setPrevMode] = useState<"desktop"|"mobile">("desktop");
  const [showPanel,setShowPanel] = useState<"edit"|"preview">("edit");
  const [showModal,setShowModal] = useState(false);
  const [reqName,setReqName]   = useState("");
  const [reqWa,setReqWa]       = useState("");
  const [sent,setSent]         = useState(false);

  const tpl   = TEMPLATES.find(t=>t.id===tid)!;
  const html  = useMemo(()=>generateHTML(tid,formData),[tid,formData]);
  const set   = useCallback((k:string,v:string)=>setFormData(p=>({...p,[k]:v})),[]);

  const switchTemplate=(id:string)=>{ setTid(id); setFormData(DEFAULTS[id]||{}); };

  const handleDownload=()=>{
    if(!reqName||!reqWa) return;
    const msg=encodeURIComponent(`Halo kak AMRT.dev 👋\n\nSaya *${reqName}* mau minta approve download website saya.\n\n📌 Template: *${tpl.name}*\n📱 WA saya: *${reqWa}*\n\nSaya sudah puas dengan hasilnya! Mohon di-approve kak 🙏`);
    window.open(`https://wa.me/6283805753932?text=${msg}`,"_blank");
    setTimeout(()=>{ const f=document.getElementById("pf") as HTMLIFrameElement|null; if(f?.contentWindow) f.contentWindow.print(); },1200);
    setSent(true);
  };

  const renderField=(f:Field)=>{
    const base="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/25 text-sm transition";
    if(f.type==="image") return <ImageUpload key={f.key} label={f.label} value={formData[f.key]||""} onChange={v=>set(f.key,v)}/>;
    if(f.type==="textarea") return (
      <div key={f.key}>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">{f.label}</label>
        <textarea value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder} rows={3} className={base+" resize-none"}/>
      </div>
    );
    if(f.type==="color") return (
      <div key={f.key}>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">{f.label}</label>
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg">
          <input type="color" value={formData[f.key]||"#2563eb"} onChange={e=>set(f.key,e.target.value)} className="w-7 h-7 rounded-md cursor-pointer border-0 bg-transparent"/>
          <span className="text-xs text-gray-400 font-mono">{formData[f.key]||"#2563eb"}</span>
        </div>
      </div>
    );
    if(f.type==="select") return (
      <div key={f.key}>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">{f.label}</label>
        <div className="flex flex-wrap gap-1.5">
          {f.options?.map(o=>(
            <button key={o.value} type="button" onClick={()=>set(f.key,o.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formData[f.key]===o.value?"bg-primary-500 text-white border-primary-500":"bg-white/4 text-gray-400 border-white/10 hover:border-white/20"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <div key={f.key}>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">{f.label}</label>
        <input value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder} className={base}/>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#0c0d10] text-white overflow-hidden">

      {/* ── Topbar ── */}
      <div className="flex-shrink-0 h-12 flex items-center justify-between px-4 border-b border-white/8 bg-[#0c0d10] z-50">
        <div className="flex items-center gap-3">
          <Link href="/belajar" className="text-gray-500 hover:text-white transition-colors p-1">
            <ArrowLeft className="w-4 h-4"/>
          </Link>
          <div className="w-px h-4 bg-white/10"/>
          <span className="text-sm font-medium text-gray-300">{tpl.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile: toggle edit/preview */}
          <div className="flex sm:hidden items-center gap-1 bg-white/5 rounded-lg p-1">
            <button onClick={()=>setShowPanel("edit")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${showPanel==="edit"?"bg-white/10 text-white":"text-gray-500"}`}>Edit</button>
            <button onClick={()=>setShowPanel("preview")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${showPanel==="preview"?"bg-white/10 text-white":"text-gray-500"}`}>Preview</button>
          </div>
          {/* Desktop: viewport toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button onClick={()=>setPrevMode("desktop")} className={`p-1.5 rounded-md transition-all ${prevMode==="desktop"?"bg-white/10 text-white":"text-gray-600 hover:text-gray-400"}`}><Monitor className="w-3.5 h-3.5"/></button>
            <button onClick={()=>setPrevMode("mobile")} className={`p-1.5 rounded-md transition-all ${prevMode==="mobile"?"bg-white/10 text-white":"text-gray-600 hover:text-gray-400"}`}><Smartphone className="w-3.5 h-3.5"/></button>
          </div>
          <button onClick={()=>setShowModal(true)} className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold rounded-lg transition-all">
            <Download className="w-3.5 h-3.5"/> Download
          </button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className={`flex-shrink-0 w-72 xl:w-80 flex flex-col border-r border-white/8 bg-[#0e0f13] overflow-y-auto ${showPanel==="preview"?"hidden sm:flex":"flex"}`}>

          {/* Template switcher */}
          <div className="flex-shrink-0 p-3 border-b border-white/8">
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-1 mb-2">Template</p>
            <div className="grid grid-cols-2 gap-1.5">
              {TEMPLATES.map(t=>{
                const TIcon=t.Icon;
                return (
                  <button key={t.id} onClick={()=>switchTemplate(t.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all border ${tid===t.id?"border-primary-500/50 bg-primary-500/10 text-white":"border-white/6 bg-white/3 text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                    <TIcon className="w-3.5 h-3.5 flex-shrink-0" style={{color: tid===t.id ? t.color : undefined}}/>
                    <span className="text-xs font-medium leading-tight">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field groups */}
          <div className="flex-1">
            {tpl.groups.map((g,gi)=>(
              <Section key={g.title} title={g.title} defaultOpen={gi===0}>
                {g.fields.map(f=>renderField(f))}
              </Section>
            ))}
          </div>
        </aside>

        {/* ── Preview ── */}
        <main className={`flex-1 flex flex-col bg-[#111318] overflow-hidden ${showPanel==="edit"&&"hidden sm:flex"}`}>
          <div className="flex-1 flex items-start justify-center overflow-auto p-4 sm:p-6">
            <div className={`transition-all duration-300 bg-white shadow-2xl overflow-hidden ${prevMode==="mobile"?"w-[390px] rounded-[36px] border-[6px] border-[#1a1a1a]":"w-full max-w-5xl rounded-xl"}`}
              style={{height: prevMode==="mobile"?"780px":"calc(100vh - 120px)"}}>
              <iframe id="pf" srcDoc={html} className="w-full h-full border-0" title="Preview"/>
            </div>
          </div>
        </main>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f1117] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button onClick={()=>{setShowModal(false);setSent(false);}} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
            {!sent?(
              <>
                <h2 className="text-lg font-bold mb-1">Download & Hosting</h2>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">Isi data di bawah, pesan akan dikirim otomatis ke admin. Setelah konfirmasi, website siap di-download atau langsung dihosting.</p>
                <div className="space-y-3 mb-5">
                  <input value={reqName} onChange={e=>setReqName(e.target.value)} placeholder="Nama lengkap kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/25 text-sm"/>
                  <input value={reqWa} onChange={e=>setReqWa(e.target.value)} placeholder="Nomor WhatsApp kamu"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-white/25 text-sm"/>
                </div>
                <button onClick={handleDownload} disabled={!reqName||!reqWa}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1fb855] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                  <Send className="w-4 h-4"/> Kirim ke Admin & Download
                </button>
                <p className="text-[11px] text-gray-700 text-center mt-3">100% Gratis · Chat langsung ke WhatsApp admin</p>
              </>
            ):(
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3"/>
                <h2 className="text-lg font-bold mb-2">Berhasil Dikirim!</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Admin akan konfirmasi via WhatsApp. Kamu juga bisa request hosting di chat yang sama.</p>
                <button onClick={()=>{setShowModal(false);setSent(false);}} className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition-all">Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
