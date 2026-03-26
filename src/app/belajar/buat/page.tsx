"use client";
import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Monitor, Tablet, Smartphone, Download, Upload, X, Send, CheckCircle,
  ChevronDown, User, Building2, ShoppingBag, Video, Copy, ExternalLink, Check,
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

// ─── Color helpers ──────────────────────────────────────────────────────────────
function isDark(hex:string):boolean {
  const h=hex.replace("#","").padEnd(6,"0");
  const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  return (r*299+g*587+b*114)/1000 < 140;
}
function palette(bg:string){
  const dark=isDark(bg);
  return {
    bg,
    text:     dark?"#ededed":"#111111",
    textSub:  dark?"#888888":"#666666",
    textMute: dark?"#444444":"#aaaaaa",
    border:   dark?"#1e1e1e":"#ebebeb",
    card:     dark?"#111111":"#f8f8f8",
    cardHov:  dark?"#161616":"#f0f0f0",
    navBg:    bg,
    footerC:  dark?"#333333":"#cccccc",
  };
}

// ─── Google Fonts snippet ───────────────────────────────────────────────────────
const FONTS:{value:string;label:string}[] = [
  {value:"Inter",             label:"Inter"},
  {value:"Poppins",           label:"Poppins"},
  {value:"Plus Jakarta Sans", label:"Jakarta Sans"},
  {value:"DM Sans",           label:"DM Sans"},
  {value:"Outfit",            label:"Outfit"},
  {value:"Space Grotesk",     label:"Space Grotesk"},
  {value:"Raleway",           label:"Raleway"},
];
function getGF(font:string="Inter"):string {
  return `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g,"+")}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;
}

// ─── HTML Generators ───────────────────────────────────────────────────────────

function genPortfolio(d:Record<string,string>):string {
  const bg    = d.warnaBackground||"#0a0a0a";
  const C     = palette(bg);
  const ac    = getAnim(d.animasi||"slide");
  const acc   = d.warnaPrimer||"#2563eb";
  const foto  = d.foto;
  const ini   = (d.namaLengkap||"N").split(" ").map((x:string)=>x[0]).slice(0,2).join("").toUpperCase();
  const skills= [d.skill1,d.skill2,d.skill3,d.skill4,d.skill5,d.skill6,d.skill7,d.skill8].filter(Boolean);
  const proyeks= [
    {n:d.proyek1,desc:d.deskProyek1,url:d.urlProyek1},
    {n:d.proyek2,desc:d.deskProyek2,url:d.urlProyek2},
    {n:d.proyek3,desc:d.deskProyek3,url:d.urlProyek3},
  ].filter(p=>p.n);
  const title = d.titleWebsite||d.namaLengkap||"Portfolio";
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title>${getGF(d.fontFamily)}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'${d.fontFamily||"Inter"}',system-ui,sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased}
nav{position:fixed;inset:0 0 auto;z-index:99;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;background:${C.navBg};border-bottom:1px solid ${C.border}}
.logo{font-size:15px;font-weight:700;color:${C.text};letter-spacing:-.2px}
.nav-links{display:flex;gap:24px}.nav-links a{color:${C.textSub};text-decoration:none;font-size:13px;font-weight:500;transition:color .18s}.nav-links a:hover{color:${C.text}}
#hero{min-height:100vh;display:flex;align-items:center;padding:80px 6% 64px}
.hi{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 200px;gap:80px;align-items:center;width:100%}
.ht p.role{font-size:13px;font-weight:600;color:${acc};letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px}
.ht h1{font-size:clamp(38px,5vw,66px);font-weight:800;line-height:1.06;letter-spacing:-2px;color:${C.text};margin-bottom:20px}
.ht .bio{font-size:16px;color:${C.textSub};max-width:440px;line-height:1.75;margin-bottom:36px}
.btns{display:flex;gap:10px;flex-wrap:wrap}
.btn-p{padding:12px 26px;background:${acc};color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;transition:opacity .18s}.btn-p:hover{opacity:.85}
.btn-g{padding:12px 26px;border:1px solid ${C.border};color:${C.textSub};border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;transition:all .18s;background:none}.btn-g:hover{border-color:${C.textMute};color:${C.text}}
.photo{width:200px;height:200px;border-radius:16px;overflow:hidden;background:${C.card};border:1px solid ${C.border};display:flex;align-items:center;justify-content:center;font-size:56px;font-weight:800;color:${C.textMute};flex-shrink:0}.photo img{width:100%;height:100%;object-fit:cover}
section.sec{padding:80px 6%;border-top:1px solid ${C.border}}
.si{max-width:900px;margin:0 auto}
.sh{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.textMute};margin-bottom:20px}
.st{font-size:clamp(22px,2.5vw,30px);font-weight:700;color:${C.text};margin-bottom:36px;letter-spacing:-.5px}
.sg{display:flex;flex-wrap:wrap;gap:10px}
.sk{padding:9px 18px;background:${C.card};border:1px solid ${C.border};border-radius:8px;font-size:13px;font-weight:500;color:${C.textSub};transition:all .18s}.sk:hover{border-color:${C.textMute};color:${C.text}}
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:4px}
.pc{padding:22px;background:${C.card};border:1px solid ${C.border};border-radius:12px;transition:all .18s}.pc:hover{border-color:${C.textMute}}
.pc h3{font-size:15px;font-weight:700;color:${C.text};margin-bottom:8px}
.pc p{font-size:13px;color:${C.textSub};line-height:1.65;margin-bottom:14px}
.pc a{font-size:12px;font-weight:600;color:${acc};text-decoration:none}.pc a:hover{text-decoration:underline}
#contact .ci{max-width:560px}
#contact .st{margin-bottom:10px}
#contact .desc{font-size:15px;color:${C.textSub};margin-bottom:32px;line-height:1.7}
.clist{display:flex;flex-direction:column;gap:8px;margin-bottom:28px}
.cl{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;background:${C.card};border:1px solid ${C.border};border-radius:10px;color:${C.textSub};font-size:13px;text-decoration:none;transition:all .18s}.cl:hover{border-color:${C.textMute};color:${C.text}}.cl span{font-weight:500}
footer{padding:32px 6%;border-top:1px solid ${C.border};color:${C.footerC};font-size:12px}
@media(max-width:640px){.hi{grid-template-columns:1fr}.photo{width:80px;height:80px;font-size:24px;order:-1}.btns{flex-direction:column}.pg{grid-template-columns:1fr}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="logo">${title}</div><div class="nav-links">${skills.length?`<a href="#skills">Skill</a>`:""}${proyeks.length?`<a href="#proyek">Proyek</a>`:""}<a href="#contact">Kontak</a></div></nav>
<section id="hero"><div class="hi"><div class="ht">
<p class="role ao" style="${dl(1)}">${d.pekerjaan||"Web Developer"}</p>
<h1 class="ao" style="${dl(2)}">${d.namaLengkap||"Nama Kamu"}</h1>
<p class="bio ao" style="${dl(3)}">${d.bio||"Seorang developer yang passionate membuat website modern dan berkualitas."}</p>
<div class="btns ao" style="${dl(4)}"><a href="#contact" class="btn-p">Hubungi Saya</a><a href="#skills" class="btn-g">Lihat Skill</a></div>
</div><div class="photo ao" style="${dl(2)}">${foto?`<img src="${foto}" alt="${d.namaLengkap}"/>`:`${ini}`}</div></div></section>
${skills.length?`<section id="skills" class="sec"><div class="si"><p class="sh ao" style="${dl(0)}">Keahlian</p><h2 class="st ao" style="${dl(1)}">Skill & Teknologi</h2><div class="sg">${skills.map((s,i)=>`<span class="sk ao" style="${dl(i+2)}">${s}</span>`).join("")}</div></div></section>`:""}
${proyeks.length?`<section id="proyek" class="sec"><div class="si"><p class="sh ao" style="${dl(0)}">Portofolio</p><h2 class="st ao" style="${dl(1)}">Proyek Pilihan</h2><div class="pg">${proyeks.map((p,i)=>`<div class="pc ao" style="${dl(i+2)}"><h3>${p.n}</h3><p>${p.desc||"Proyek pilihan saya."}</p>${p.url?`<a href="${p.url}" target="_blank">Lihat Proyek →</a>`:""}</div>`).join("")}</div></div></section>`:""}
<section id="contact" class="sec"><div class="ci"><p class="sh ao" style="${dl(0)}">Kontak</p><h2 class="st ao" style="${dl(1)}">Mari Berkolaborasi</h2><p class="desc ao" style="${dl(2)}">Punya proyek menarik? Jangan ragu untuk menghubungi saya.</p><div class="clist">
${d.email?`<a href="mailto:${d.email}" class="cl ao" style="${dl(3)}"><span>Email</span><span>${d.email}</span></a>`:""}
${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="cl ao" style="${dl(4)}"><span>WhatsApp</span><span>${d.whatsapp}</span></a>`:""}
${d.instagram?`<a href="https://instagram.com/${d.instagram.replace("@","")}" target="_blank" class="cl ao" style="${dl(5)}"><span>Instagram</span><span>${d.instagram}</span></a>`:""}
${d.linkedin?`<a href="${d.linkedin}" target="_blank" class="cl ao" style="${dl(6)}"><span>LinkedIn</span><span>Lihat Profil →</span></a>`:""}
${d.github?`<a href="${d.github}" target="_blank" class="cl ao" style="${dl(7)}"><span>GitHub</span><span>Lihat GitHub →</span></a>`:""}
${d.website?`<a href="${d.website}" target="_blank" class="cl ao" style="${dl(8)}"><span>Website</span><span>${d.website}</span></a>`:""}
</div></div></section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaLengkap||"Portfolio"}</p></footer>
</body></html>`;
}

function genBisnis(d:Record<string,string>):string {
  const bg  = d.warnaBackground||"#ffffff";
  const C   = palette(bg);
  const ac  = getAnim(d.animasi||"slide");
  const acc = d.warnaPrimer||"#1d4ed8";
  const logo=d.logo, banner=d.heroBanner;
  const title = d.titleWebsite||d.namaBisnis||"Bisnis";
  const fiturs=[
    {n:d.fitur1,desc:d.deskripsiFitur1},{n:d.fitur2,desc:d.deskripsiFitur2},
    {n:d.fitur3,desc:d.deskripsiFitur3},{n:d.fitur4,desc:d.deskripsiFitur4},
    {n:d.fitur5,desc:d.deskripsiFitur5},{n:d.fitur6,desc:d.deskripsiFitur6},
  ].filter(f=>f.n);
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title>${getGF(d.fontFamily)}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'${d.fontFamily||"Inter"}',system-ui,sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased}
nav{position:sticky;top:0;z-index:99;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;background:${C.navBg};border-bottom:1px solid ${C.border}}
.logo{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:700;color:${C.text}}.logo img{height:32px;width:auto;object-fit:contain}
.btn-nav{padding:9px 20px;background:${acc};color:#fff;border-radius:7px;text-decoration:none;font-weight:600;font-size:13px;transition:opacity .18s}.btn-nav:hover{opacity:.85}
#hero{min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:96px 6% 80px;position:relative;overflow:hidden;background:${C.bg}}
${banner?`#hero::before{content:'';position:absolute;inset:0;background:url('${banner}') center/cover;opacity:.07;z-index:0}`:""}
.hi{position:relative;z-index:1;max-width:680px;margin:0 auto}
${d.taglineBisnis?`.tagline{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:${acc};margin-bottom:18px}`:""}
#hero h1{font-size:clamp(34px,5vw,60px);font-weight:800;line-height:1.08;letter-spacing:-1.5px;color:${C.text};margin-bottom:18px}
#hero h1 em{font-style:normal;color:${acc}}
#hero p{font-size:17px;color:${C.textSub};max-width:480px;margin:0 auto 36px;line-height:1.75}
.hbtns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn-p{padding:13px 30px;background:${acc};color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;transition:opacity .18s}.btn-p:hover{opacity:.85}
.btn-s{padding:13px 30px;border:1px solid ${C.border};color:${C.textSub};border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;transition:all .18s}.btn-s:hover{border-color:${C.textMute};color:${C.text}}
#features{padding:88px 6%;background:${C.card};border-top:1px solid ${C.border}}
.fi{max-width:1060px;margin:0 auto}
.fh{margin-bottom:52px}
.fh .sh{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.textMute};margin-bottom:10px}
.fh h2{font-size:clamp(24px,3vw,36px);font-weight:700;color:${C.text};letter-spacing:-.6px}
.fg{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1px;background:${C.border};border:1px solid ${C.border};border-radius:12px;overflow:hidden}
.fc{padding:28px;background:${C.card};transition:background .18s}.fc:hover{background:${C.bg}}
.fc h3{font-size:15px;font-weight:700;color:${C.text};margin-bottom:8px}
.fc p{font-size:13px;color:${C.textSub};line-height:1.65}
.fc .num{font-size:11px;font-weight:700;color:${acc};letter-spacing:.06em;margin-bottom:14px}
#cta{padding:80px 6%;background:${isDark(bg)?"#111":"#0a0a0a"};text-align:center;color:#fff}
#cta h2{font-size:clamp(26px,3.5vw,40px);font-weight:700;margin-bottom:12px;letter-spacing:-.8px}
#cta p{font-size:15px;color:#555;margin-bottom:16px}
.contact-info{display:flex;justify-content:center;flex-wrap:wrap;gap:20px;margin-bottom:28px}
.contact-info a,.contact-info span{color:#666;font-size:14px;text-decoration:none}.contact-info a:hover{color:#fff}
.btn-w{display:inline-block;padding:13px 32px;background:#fff;color:#111;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;transition:opacity .18s}.btn-w:hover{opacity:.9}
footer{padding:24px 6%;border-top:1px solid ${C.border};color:${C.footerC};font-size:12px;background:${C.bg}}
@media(max-width:640px){.hbtns{flex-direction:column;align-items:center}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="logo">${logo?`<img src="${logo}" alt="logo"/>`:""}${d.namaBisnis||"Bisnis"}</div><a href="#cta" class="btn-nav">Hubungi Kami</a></nav>
<section id="hero"><div class="hi">
${d.taglineBisnis?`<p class="tagline ao" style="${dl(0)}">${d.taglineBisnis}</p>`:""}
<h1 class="ao" style="${dl(1)}">${d.namaBisnis?`<em>${d.namaBisnis}</em><br>`:""}${d.slogan||"Solusi Terpercaya untuk Bisnis Anda"}</h1>
<p class="ao" style="${dl(2)}">${d.deskripsi||"Kami membantu bisnis Anda tumbuh dengan solusi yang tepat dan berkualitas."}</p>
<div class="hbtns ao" style="${dl(3)}"><a href="#cta" class="btn-p">Mulai Sekarang</a><a href="#features" class="btn-s">Pelajari Lebih</a></div>
</div></section>
${fiturs.length?`<section id="features"><div class="fi"><div class="fh"><p class="sh ao" style="${dl(0)}">Keunggulan</p><h2 class="ao" style="${dl(1)}">Mengapa Memilih Kami</h2></div><div class="fg">${fiturs.map((f,i)=>`<div class="fc ao" style="${dl(i+2)}"><p class="num">0${i+1}</p><h3>${f.n}</h3><p>${f.desc||"Layanan terbaik untuk Anda."}</p></div>`).join("")}</div></div></section>`:""}
<section id="cta">
<h2 class="ao" style="${dl(0)}">${d.namaBisnis||"Kami"} Siap Membantu</h2>
<div class="contact-info ao" style="${dl(1)}">
${d.email?`<a href="mailto:${d.email}">📧 ${d.email}</a>`:""}
${d.telepon?`<a href="tel:${d.telepon}">📞 ${d.telepon}</a>`:""}
${d.alamat?`<span>📍 ${d.alamat}</span>`:""}
${d.instagram?`<a href="https://instagram.com/${d.instagram.replace("@","")}" target="_blank">Instagram: ${d.instagram}</a>`:""}
${d.website?`<a href="${d.website}" target="_blank">🌐 Website</a>`:""}
</div>
${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="btn-w ao" style="${dl(2)}">Chat WhatsApp</a>`:""}
</section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaBisnis||"Bisnis Saya"}</p></footer>
</body></html>`;
}

function genToko(d:Record<string,string>):string {
  const bg  = d.warnaBackground||"#ffffff";
  const C   = palette(bg);
  const ac  = getAnim(d.animasi||"fade");
  const acc = d.warnaPrimer||"#111";
  const logo=d.logoToko, banner=d.bannerToko;
  const title = d.titleWebsite||d.namaToko||"Toko";
  const produk=[
    {nama:d.produk1,harga:d.harga1,foto:d.fotoProduk1,stok:d.stok1},
    {nama:d.produk2,harga:d.harga2,foto:d.fotoProduk2,stok:d.stok2},
    {nama:d.produk3,harga:d.harga3,foto:d.fotoProduk3,stok:d.stok3},
    {nama:d.produk4,harga:d.harga4,foto:d.fotoProduk4,stok:d.stok4},
    {nama:d.produk5,harga:d.harga5,foto:d.fotoProduk5,stok:d.stok5},
    {nama:d.produk6,harga:d.harga6,foto:d.fotoProduk6,stok:d.stok6},
    {nama:d.produk7,harga:d.harga7,foto:d.fotoProduk7,stok:d.stok7},
    {nama:d.produk8,harga:d.harga8,foto:d.fotoProduk8,stok:d.stok8},
  ].filter(p=>p.nama);
  const fmt=(h:string)=>h?`Rp\u00a0${parseInt(h.replace(/\D/g,"")).toLocaleString("id")}`:"-";
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title>${getGF(d.fontFamily)}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'${d.fontFamily||"Inter"}',system-ui,sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased}
nav{position:sticky;top:0;z-index:99;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:${C.navBg};border-bottom:1px solid ${C.border}}
.logo{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:${C.text}}.logo img{height:28px;width:auto;object-fit:contain}
.cart{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:${C.text};cursor:pointer;background:none;border:1px solid ${C.border};padding:7px 16px;border-radius:7px;transition:all .18s}.cart:hover{border-color:${C.text}}
#hero{position:relative;overflow:hidden;height:${banner?"420px":"340px"};display:flex;align-items:flex-end;background:#111}
${banner?`.hbg{position:absolute;inset:0;background:url('${banner}') center/cover;opacity:.5}`:`.hbg{position:absolute;inset:0;background:#111}`}
.hc{position:relative;z-index:1;padding:40px 5%;color:#fff;max-width:640px}
.hc h1{font-size:clamp(26px,4.5vw,46px);font-weight:800;line-height:1.1;letter-spacing:-1px;margin-bottom:10px}
.hc p{font-size:14px;opacity:.65;margin-bottom:22px;line-height:1.6}
.btn-hero{display:inline-block;padding:11px 24px;background:#fff;color:#111;border-radius:7px;text-decoration:none;font-weight:700;font-size:13px;transition:opacity .18s}.btn-hero:hover{opacity:.85}
#produk{padding:64px 5%;background:${C.bg}}
.pi{max-width:1100px;margin:0 auto}
.ph{margin-bottom:36px}
.sh{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.textMute};margin-bottom:8px}
.st{font-size:clamp(20px,2.5vw,28px);font-weight:700;color:${C.text};letter-spacing:-.4px}
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.pc{background:${C.bg};border-radius:12px;overflow:hidden;border:1px solid ${C.border};display:flex;flex-direction:column;transition:box-shadow .2s}.pc:hover{box-shadow:0 4px 24px rgba(0,0,0,.08)}
.pimg{height:200px;background:${C.card};display:flex;align-items:center;justify-content:center;overflow:hidden}
.pimg img{width:100%;height:100%;object-fit:cover}.pimg svg{opacity:.25}
.pb{padding:16px;display:flex;flex-direction:column;flex:1;gap:6px}
.pn{font-size:14px;font-weight:600;color:${C.text}}
.pp{font-size:16px;font-weight:700;color:${acc}}
.pstok{font-size:11px;color:${C.textMute};font-weight:500}
.pb-btn{margin-top:auto;padding:10px;background:${acc};color:#fff;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;transition:opacity .18s;width:100%}.pb-btn:hover{opacity:.85}
#kontak{padding:56px 5%;background:${C.card};border-top:1px solid ${C.border};text-align:center}
.ki{max-width:480px;margin:0 auto}
.ki h2{font-size:22px;font-weight:700;margin-bottom:8px;letter-spacing:-.4px;color:${C.text}}
.ki p{color:${C.textSub};font-size:14px;margin-bottom:8px}
.ki .contacts{display:flex;flex-direction:column;gap:4px;margin-bottom:20px}
.ki .contacts a,.ki .contacts span{color:${C.textSub};font-size:13px;text-decoration:none}
.wa{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:#25D366;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;transition:opacity .18s}.wa:hover{opacity:.88}
footer{padding:20px 5%;border-top:1px solid ${C.border};color:${C.footerC};font-size:12px;background:${C.bg}}
@media(max-width:600px){.pg{grid-template-columns:repeat(2,1fr)}}
</style></head><body>
<nav class="ao" style="${dl(0)}"><div class="logo">${logo?`<img src="${logo}" alt="logo"/>`:""}${d.namaToko||"Toko"}</div><button class="cart"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Keranjang</button></nav>
<section id="hero"><div class="hbg"></div><div class="hc"><h1 class="ao" style="${dl(1)}">${d.slogan||d.namaToko||"Toko Terbaik"}</h1><p class="ao" style="${dl(2)}">${d.deskripsi||"Produk berkualitas, harga terbaik."}</p><a href="#produk" class="btn-hero ao" style="${dl(3)}">Lihat Produk</a></div></section>
${produk.length?`<section id="produk"><div class="pi"><div class="ph"><p class="sh ao" style="${dl(0)}">Katalog</p><h2 class="st ao" style="${dl(1)}">Produk Kami</h2></div><div class="pg">${produk.map((p,i)=>`<div class="pc ao" style="${dl(i+2)}"><div class="pimg">${p.foto?`<img src="${p.foto}" alt="${p.nama}"/>`:`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`}</div><div class="pb"><div class="pn">${p.nama}</div><div class="pp">${fmt(p.harga||"")}</div>${p.stok?`<div class="pstok">Stok: ${p.stok}</div>`:""}<button class="pb-btn" onclick="window.open('https://wa.me/${(d.whatsapp||"").replace(/\D/g,"")}?text=Halo, saya mau pesan ${encodeURIComponent(p.nama||"")}','_blank')">Pesan via WhatsApp</button></div></div>`).join("")}</div></div></section>`:""}
<section id="kontak"><div class="ki">
<h2 class="ao" style="${dl(0)}">Hubungi Kami</h2>
<div class="contacts ao" style="${dl(1)}">
${d.alamat?`<span>📍 ${d.alamat}</span>`:""}
${d.telepon?`<a href="tel:${d.telepon}">📞 ${d.telepon}</a>`:""}
${d.email?`<a href="mailto:${d.email}">📧 ${d.email}</a>`:""}
${d.instagram?`<a href="https://instagram.com/${d.instagram.replace("@","")}" target="_blank">Instagram: ${d.instagram}</a>`:""}
</div>
${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="wa ao" style="${dl(2)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Chat WhatsApp</a>`:""}</div></section>
<footer><p>&copy; ${new Date().getFullYear()} ${d.namaToko||"Toko Saya"}</p></footer>
</body></html>`;
}

function genKreator(d:Record<string,string>):string {
  const bg  = d.warnaBackground||"#f5f5f5";
  const C   = palette(bg);
  const ac  = getAnim(d.animasi||"fade");
  const acc = d.warnaPrimer||"#111";
  const foto = d.fotoProfil;
  const ini  = (d.nama||"K").split(" ").map((x:string)=>x[0]).slice(0,2).join("").toUpperCase();
  const title = d.titleWebsite||d.nama||"Creator";
  const platforms=[
    d.youtube   &&{label:"YouTube",   url:d.youtube,   svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`},
    d.tiktok    &&{label:"TikTok",    url:d.tiktok,    svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1-.39z"/></svg>`},
    d.instagram &&{label:"Instagram", url:d.instagram, svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`},
    d.twitter   &&{label:"X / Twitter",url:d.twitter,  svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`},
    d.spotify   &&{label:"Spotify",   url:d.spotify,   svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`},
    d.linkedin  &&{label:"LinkedIn",  url:d.linkedin,  svg:`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`},
    d.website   &&{label:d.websiteLabel||"Website",url:d.website,svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`},
  ].filter(Boolean) as {label:string;url:string;svg:string}[];
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${title}</title>${getGF(d.fontFamily)}<style>
${ac}*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${d.fontFamily||"Inter"}',system-ui,sans-serif;background:${C.bg};color:${C.text};min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:56px 24px 56px;-webkit-font-smoothing:antialiased}
.card{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center}
.av{width:96px;height:96px;border-radius:50%;overflow:hidden;background:${C.card};display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:${C.textMute};margin-bottom:16px;flex-shrink:0;border:2px solid ${C.border}}.av img{width:100%;height:100%;object-fit:cover}
.nm{font-size:20px;font-weight:700;text-align:center;margin-bottom:3px;letter-spacing:-.3px;color:${C.text}}
.un{font-size:13px;color:${C.textSub};font-weight:500;margin-bottom:10px}
.bi{font-size:14px;color:${C.textSub};text-align:center;line-height:1.7;max-width:300px;margin-bottom:8px}
.cat{font-size:11px;font-weight:600;color:${C.textMute};text-transform:uppercase;letter-spacing:.06em;margin-bottom:28px}
.links{display:flex;flex-direction:column;gap:8px;width:100%;margin-bottom:24px}
.li{display:flex;align-items:center;gap:12px;padding:13px 16px;background:${isDark(bg)?"#1a1a1a":"#fff"};border:1px solid ${C.border};border-radius:10px;color:${C.text};text-decoration:none;font-size:13px;font-weight:600;transition:all .18s}.li:hover{border-color:${C.textMute}}
.li span{flex:1}.li svg{opacity:.5}.li .arr{font-size:11px;color:${C.textMute}}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};border-radius:12px;overflow:hidden;width:100%;margin-bottom:16px}
.stat{background:${isDark(bg)?"#1a1a1a":"#fff"};padding:16px 12px;text-align:center}
.sv{font-size:18px;font-weight:700;color:${C.text};letter-spacing:-.3px}
.sl{font-size:11px;color:${C.textMute};margin-top:2px;font-weight:500}
.col{display:block;width:100%;padding:13px;background:${acc};color:${isDark(acc)?"#fff":"#111"};border-radius:10px;text-align:center;text-decoration:none;font-weight:700;font-size:13px;transition:opacity .18s}.col:hover{opacity:.85}
footer{margin-top:36px;color:${C.footerC};font-size:12px}
</style></head><body>
<div class="card">
<div class="av ao" style="${dl(0)}">${foto?`<img src="${foto}" alt="${d.nama}"/>`:`${ini}`}</div>
<div class="nm ao" style="${dl(1)}">${d.nama||"Nama Kreator"}</div>
<div class="un ao" style="${dl(2)}">@${(d.username||"username").replace("@","")}</div>
<p class="bi ao" style="${dl(3)}">${d.bio||"Content creator yang suka berbagi hal-hal menarik."}</p>
${d.kategori?`<div class="cat ao" style="${dl(4)}">${d.kategori}</div>`:""}
<div class="links">
${platforms.map((p,i)=>`<a href="${p.url}" target="_blank" class="li ao" style="${dl(i+5)}">${p.svg}<span>${p.label}</span><span class="arr">→</span></a>`).join("")}
</div>
<div class="stats ao" style="${dl(platforms.length+5)}">
<div class="stat"><div class="sv">${d.statFoloer||"0"}</div><div class="sl">${d.labelStat1||"Followers"}</div></div>
<div class="stat"><div class="sv">${d.statKonten||"0"}</div><div class="sl">${d.labelStat2||"Konten"}</div></div>
<div class="stat"><div class="sv">${d.statBrand||"0"}</div><div class="sl">${d.labelStat3||"Brand Deal"}</div></div>
</div>
${d.whatsapp?`<a href="https://wa.me/${d.whatsapp.replace(/\D/g,"")}" class="col ao" style="${dl(platforms.length+6)}">${d.ctaKolaborasi||"Ajak Kolaborasi"}</a>`:""}
</div>
<footer>&copy; ${new Date().getFullYear()} ${d.nama||"Creator"}</footer>
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
    id:"portfolio", name:"Portfolio Personal", desc:"Freelancer, Designer, Developer",
    Icon:User, color:"#2563eb",
    groups:[
      { title:"Identitas", fields:[
        {key:"foto",        label:"Foto Profil",       type:"image"},
        {key:"namaLengkap", label:"Nama Lengkap",      type:"text",     placeholder:"Nama Kamu"},
        {key:"titleWebsite",label:"Judul Browser Tab", type:"text",     placeholder:"Portfolio - Nama Kamu"},
        {key:"pekerjaan",   label:"Profesi / Jabatan", type:"text",     placeholder:"Web Developer"},
        {key:"bio",         label:"Bio / Tentang Kamu",type:"textarea", placeholder:"Ceritakan sedikit tentang dirimu..."},
      ]},
      { title:"Skill & Keahlian", fields:[
        {key:"skill1",label:"Skill 1",type:"text",placeholder:"HTML & CSS"},
        {key:"skill2",label:"Skill 2",type:"text",placeholder:"JavaScript"},
        {key:"skill3",label:"Skill 3",type:"text",placeholder:"React"},
        {key:"skill4",label:"Skill 4",type:"text",placeholder:"Figma"},
        {key:"skill5",label:"Skill 5",type:"text",placeholder:"Node.js"},
        {key:"skill6",label:"Skill 6",type:"text",placeholder:"UI/UX Design"},
        {key:"skill7",label:"Skill 7",type:"text",placeholder:"TypeScript"},
        {key:"skill8",label:"Skill 8",type:"text",placeholder:"Git & GitHub"},
      ]},
      { title:"Proyek / Portofolio", fields:[
        {key:"proyek1",    label:"Nama Proyek 1",  type:"text",     placeholder:"Aplikasi Mobile XYZ"},
        {key:"deskProyek1",label:"Deskripsi 1",    type:"textarea", placeholder:"Deskripsi singkat proyek..."},
        {key:"urlProyek1", label:"Link Proyek 1",  type:"text",     placeholder:"https://github.com/..."},
        {key:"proyek2",    label:"Nama Proyek 2",  type:"text",     placeholder:"Website Company ABC"},
        {key:"deskProyek2",label:"Deskripsi 2",    type:"textarea", placeholder:"Deskripsi singkat proyek..."},
        {key:"urlProyek2", label:"Link Proyek 2",  type:"text",     placeholder:"https://..."},
        {key:"proyek3",    label:"Nama Proyek 3",  type:"text",     placeholder:"Dashboard Analytics"},
        {key:"deskProyek3",label:"Deskripsi 3",    type:"textarea", placeholder:"Deskripsi singkat proyek..."},
        {key:"urlProyek3", label:"Link Proyek 3",  type:"text",     placeholder:"https://..."},
      ]},
      { title:"Kontak & Sosial Media", fields:[
        {key:"email",    label:"Email",          type:"text",placeholder:"nama@email.com"},
        {key:"whatsapp", label:"WhatsApp",       type:"text",placeholder:"08123456789"},
        {key:"instagram",label:"Instagram",      type:"text",placeholder:"@namakamu"},
        {key:"linkedin", label:"LinkedIn URL",   type:"text",placeholder:"https://linkedin.com/in/nama"},
        {key:"github",   label:"GitHub URL",     type:"text",placeholder:"https://github.com/username"},
        {key:"website",  label:"Website / Blog", type:"text",placeholder:"https://namakamu.com"},
      ]},
      { title:"Tampilan & Warna", fields:[
        {key:"warnaBackground",label:"Warna Background", type:"color"},
        {key:"warnaPrimer",    label:"Warna Aksen/CTA",  type:"color"},
        {key:"fontFamily",     label:"Font",             type:"select",options:FONTS},
        {key:"animasi",        label:"Animasi Masuk",    type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"bisnis", name:"Landing Bisnis", desc:"Layanan, Jasa, atau Produk Digital",
    Icon:Building2, color:"#1d4ed8",
    groups:[
      { title:"Identitas Bisnis", fields:[
        {key:"logo",        label:"Logo Bisnis",        type:"image"},
        {key:"heroBanner",  label:"Foto / Banner Hero", type:"image"},
        {key:"namaBisnis",  label:"Nama Bisnis",        type:"text",     placeholder:"PT Nama Jaya"},
        {key:"titleWebsite",label:"Judul Browser Tab",  type:"text",     placeholder:"Nama Bisnis - Tagline"},
        {key:"taglineBisnis",label:"Tagline Kecil (atas headline)", type:"text", placeholder:"Dipercaya 1000+ klien"},
        {key:"slogan",      label:"Headline Utama",     type:"text",     placeholder:"Solusi Terbaik untuk Kamu"},
        {key:"deskripsi",   label:"Deskripsi Bisnis",   type:"textarea", placeholder:"Ceritakan bisnis kamu..."},
      ]},
      { title:"Keunggulan (maks. 6)", fields:[
        {key:"fitur1",          label:"Keunggulan 1",  type:"text",placeholder:"Kualitas Premium"},
        {key:"deskripsiFitur1", label:"Deskripsi 1",   type:"text",placeholder:"Standar kualitas tertinggi"},
        {key:"fitur2",          label:"Keunggulan 2",  type:"text",placeholder:"Tepat Waktu"},
        {key:"deskripsiFitur2", label:"Deskripsi 2",   type:"text",placeholder:"Pengiriman selalu on schedule"},
        {key:"fitur3",          label:"Keunggulan 3",  type:"text",placeholder:"Harga Terjangkau"},
        {key:"deskripsiFitur3", label:"Deskripsi 3",   type:"text",placeholder:"Harga bersaing di pasaran"},
        {key:"fitur4",          label:"Keunggulan 4",  type:"text",placeholder:"Support 24/7"},
        {key:"deskripsiFitur4", label:"Deskripsi 4",   type:"text",placeholder:"Siap membantu kapanpun"},
        {key:"fitur5",          label:"Keunggulan 5",  type:"text",placeholder:"Bergaransi"},
        {key:"deskripsiFitur5", label:"Deskripsi 5",   type:"text",placeholder:"Garansi kepuasan pelanggan"},
        {key:"fitur6",          label:"Keunggulan 6",  type:"text",placeholder:"Tim Profesional"},
        {key:"deskripsiFitur6", label:"Deskripsi 6",   type:"text",placeholder:"Ditangani oleh ahlinya"},
      ]},
      { title:"Kontak Bisnis", fields:[
        {key:"whatsapp", label:"Nomor WhatsApp",      type:"text",placeholder:"08123456789"},
        {key:"email",    label:"Email Bisnis",        type:"text",placeholder:"bisnis@email.com"},
        {key:"telepon",  label:"Telepon / Kantor",    type:"text",placeholder:"021-12345678"},
        {key:"alamat",   label:"Kota / Alamat",       type:"text",placeholder:"Jakarta, Indonesia"},
        {key:"instagram",label:"Instagram",           type:"text",placeholder:"@namabisnis"},
        {key:"website",  label:"Website Resmi",       type:"text",placeholder:"https://bisnis.com"},
      ]},
      { title:"Tampilan & Warna", fields:[
        {key:"warnaBackground",label:"Warna Background", type:"color"},
        {key:"warnaPrimer",    label:"Warna Aksen/CTA",  type:"color"},
        {key:"fontFamily",     label:"Font",             type:"select",options:FONTS},
        {key:"animasi",        label:"Animasi Masuk",    type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"toko", name:"Toko Online", desc:"Katalog produk & pemesanan via WA",
    Icon:ShoppingBag, color:"#7c3aed",
    groups:[
      { title:"Info Toko", fields:[
        {key:"logoToko",   label:"Logo Toko",         type:"image"},
        {key:"bannerToko", label:"Banner Hero",       type:"image"},
        {key:"namaToko",   label:"Nama Toko",         type:"text",     placeholder:"Toko Keren Ku"},
        {key:"titleWebsite",label:"Judul Browser Tab",type:"text",     placeholder:"Toko - Belanja Mudah"},
        {key:"slogan",     label:"Slogan / Headline", type:"text",     placeholder:"Belanja Mudah & Terpercaya"},
        {key:"deskripsi",  label:"Deskripsi Toko",   type:"textarea", placeholder:"Toko kami menjual..."},
      ]},
      { title:"Produk 1", fields:[
        {key:"produk1",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga1",     label:"Harga (Rp)",  type:"text",  placeholder:"99000"},
        {key:"stok1",      label:"Info Stok",   type:"text",  placeholder:"Ready Stock"},
        {key:"fotoProduk1",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 2", fields:[
        {key:"produk2",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga2",     label:"Harga (Rp)",  type:"text",  placeholder:"149000"},
        {key:"stok2",      label:"Info Stok",   type:"text",  placeholder:"Ready Stock"},
        {key:"fotoProduk2",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 3", fields:[
        {key:"produk3",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga3",     label:"Harga (Rp)",  type:"text",  placeholder:"199000"},
        {key:"stok3",      label:"Info Stok",   type:"text",  placeholder:"Indent 3 hari"},
        {key:"fotoProduk3",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 4", fields:[
        {key:"produk4",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga4",     label:"Harga (Rp)",  type:"text",  placeholder:"299000"},
        {key:"stok4",      label:"Info Stok",   type:"text",  placeholder:"Limited"},
        {key:"fotoProduk4",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 5", fields:[
        {key:"produk5",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga5",     label:"Harga (Rp)",  type:"text",  placeholder:"399000"},
        {key:"stok5",      label:"Info Stok",   type:"text",  placeholder:"Ready Stock"},
        {key:"fotoProduk5",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 6", fields:[
        {key:"produk6",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga6",     label:"Harga (Rp)",  type:"text",  placeholder:"499000"},
        {key:"stok6",      label:"Info Stok",   type:"text",  placeholder:"Ready Stock"},
        {key:"fotoProduk6",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 7", fields:[
        {key:"produk7",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga7",     label:"Harga (Rp)",  type:"text",  placeholder:"599000"},
        {key:"stok7",      label:"Info Stok",   type:"text",  placeholder:"Ready Stock"},
        {key:"fotoProduk7",label:"Foto Produk", type:"image"},
      ]},
      { title:"Produk 8", fields:[
        {key:"produk8",    label:"Nama Produk", type:"text",  placeholder:"Nama produk"},
        {key:"harga8",     label:"Harga (Rp)",  type:"text",  placeholder:"699000"},
        {key:"stok8",      label:"Info Stok",   type:"text",  placeholder:"Pre-order"},
        {key:"fotoProduk8",label:"Foto Produk", type:"image"},
      ]},
      { title:"Kontak Toko", fields:[
        {key:"whatsapp", label:"WhatsApp Order",   type:"text",placeholder:"08123456789"},
        {key:"instagram",label:"Instagram Toko",   type:"text",placeholder:"@tokokamu"},
        {key:"telepon",  label:"Telepon",          type:"text",placeholder:"021-12345678"},
        {key:"email",    label:"Email",            type:"text",placeholder:"toko@email.com"},
        {key:"alamat",   label:"Kota / Alamat",    type:"text",placeholder:"Bandung, Jawa Barat"},
      ]},
      { title:"Tampilan & Warna", fields:[
        {key:"warnaBackground",label:"Warna Background", type:"color"},
        {key:"warnaPrimer",    label:"Warna Aksen/CTA",  type:"color"},
        {key:"fontFamily",     label:"Font",             type:"select",options:FONTS},
        {key:"animasi",        label:"Animasi Masuk",    type:"select",options:ANIM},
      ]},
    ],
  },
  {
    id:"kreator", name:"Content Creator", desc:"Link-in-bio & showcase platform",
    Icon:Video, color:"#ec4899",
    groups:[
      { title:"Profil", fields:[
        {key:"fotoProfil",  label:"Foto Profil",     type:"image"},
        {key:"nama",        label:"Nama Lengkap",    type:"text",     placeholder:"Nama Kreator"},
        {key:"username",    label:"Username",        type:"text",     placeholder:"@kreatorku"},
        {key:"titleWebsite",label:"Judul Browser Tab",type:"text",    placeholder:"Nama Kreator - Creator"},
        {key:"bio",         label:"Bio",             type:"textarea", placeholder:"Content creator yang suka berbagi..."},
        {key:"kategori",    label:"Kategori Konten", type:"text",     placeholder:"Lifestyle · Tech · Gaming"},
      ]},
      { title:"Platform & Link", fields:[
        {key:"youtube",      label:"Link YouTube",        type:"text",placeholder:"https://youtube.com/@kamu"},
        {key:"tiktok",       label:"Link TikTok",         type:"text",placeholder:"https://tiktok.com/@kamu"},
        {key:"instagram",    label:"Link Instagram",      type:"text",placeholder:"https://instagram.com/kamu"},
        {key:"twitter",      label:"Link X / Twitter",    type:"text",placeholder:"https://x.com/kamu"},
        {key:"spotify",      label:"Link Spotify / Podcast",type:"text",placeholder:"https://open.spotify.com/..."},
        {key:"linkedin",     label:"Link LinkedIn",       type:"text",placeholder:"https://linkedin.com/in/kamu"},
        {key:"website",      label:"Website / Blog",      type:"text",placeholder:"https://namakamu.com"},
        {key:"websiteLabel", label:"Label Website",       type:"text",placeholder:"Blog Saya"},
        {key:"whatsapp",     label:"WA Kolaborasi",       type:"text",placeholder:"08123456789"},
      ]},
      { title:"Statistik", fields:[
        {key:"statFoloer", label:"Angka Stat 1",   type:"text",placeholder:"100K+"},
        {key:"labelStat1", label:"Label Stat 1",   type:"text",placeholder:"Followers"},
        {key:"statKonten", label:"Angka Stat 2",   type:"text",placeholder:"500+"},
        {key:"labelStat2", label:"Label Stat 2",   type:"text",placeholder:"Konten"},
        {key:"statBrand",  label:"Angka Stat 3",   type:"text",placeholder:"50+"},
        {key:"labelStat3", label:"Label Stat 3",   type:"text",placeholder:"Brand Deal"},
      ]},
      { title:"Kolaborasi", fields:[
        {key:"ctaKolaborasi",label:"Teks Tombol CTA", type:"text",placeholder:"Ajak Kolaborasi"},
      ]},
      { title:"Tampilan & Warna", fields:[
        {key:"warnaBackground",label:"Warna Background", type:"color"},
        {key:"warnaPrimer",    label:"Warna Tombol CTA", type:"color"},
        {key:"fontFamily",     label:"Font",             type:"select",options:FONTS},
        {key:"animasi",        label:"Animasi Masuk",    type:"select",options:ANIM},
      ]},
    ],
  },
];

const DEFAULTS:Record<string,Record<string,string>> = {
  portfolio:{
    namaLengkap:"Nama Kamu", pekerjaan:"Web Developer",
    bio:"Seorang web developer yang passionate membuat website modern dan berkualitas tinggi.",
    skill1:"HTML & CSS", skill2:"JavaScript", skill3:"React", skill4:"Figma",
    skill5:"Node.js", skill6:"UI/UX Design",
    proyek1:"Website Company", deskProyek1:"Landing page profesional untuk perusahaan klien.",
    email:"nama@email.com", instagram:"@namakamu", whatsapp:"08123456789",
    warnaBackground:"#0a0a0a", warnaPrimer:"#2563eb", animasi:"slide", fontFamily:"Inter",
  },
  bisnis:{
    namaBisnis:"Nama Bisnis", slogan:"Solusi Terbaik untuk Kamu",
    deskripsi:"Kami menyediakan layanan berkualitas tinggi untuk kebutuhan digital bisnis Anda.",
    fitur1:"Kualitas Premium", deskripsiFitur1:"Standar kualitas tertinggi di industri",
    fitur2:"Tepat Waktu",      deskripsiFitur2:"Pengiriman selalu on schedule",
    fitur3:"Harga Terjangkau", deskripsiFitur3:"Harga kompetitif tanpa kompromi kualitas",
    fitur4:"Support 24/7",     deskripsiFitur4:"Tim siap membantu kapanpun Anda butuhkan",
    email:"bisnis@email.com", whatsapp:"08123456789", alamat:"Jakarta, Indonesia",
    warnaBackground:"#ffffff", warnaPrimer:"#1d4ed8", animasi:"slide", fontFamily:"Inter",
  },
  toko:{
    namaToko:"Toko Keren", slogan:"Belanja Mudah & Terpercaya",
    deskripsi:"Toko online terpercaya dengan produk berkualitas dan harga terbaik.",
    produk1:"Produk Unggulan", harga1:"99000",
    produk2:"Best Seller",     harga2:"149000",
    produk3:"New Arrival",     harga3:"199000",
    produk4:"Limited Edition", harga4:"299000",
    whatsapp:"08123456789", instagram:"@tokokamu", alamat:"Bandung, Jawa Barat",
    warnaBackground:"#ffffff", warnaPrimer:"#111111", animasi:"fade", fontFamily:"Inter",
  },
  kreator:{
    nama:"Nama Kreator", username:"@kreatorku",
    bio:"Content creator yang suka berbagi hal-hal menarik setiap hari.",
    kategori:"Lifestyle · Tech · Gaming",
    statFoloer:"10K+", labelStat1:"Followers",
    statKonten:"200+", labelStat2:"Konten",
    statBrand:"50+",   labelStat3:"Brand Deal",
    ctaKolaborasi:"Ajak Kolaborasi",
    whatsapp:"08123456789",
    warnaBackground:"#f5f5f5", warnaPrimer:"#111111", animasi:"zoom", fontFamily:"Inter",
  },
};

// ─── ImageUpload ─────────────────────────────────────────────────────────────
function ImageUpload({value,onChange}:{label:string;value:string;onChange:(b64:string)=>void}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile=(file:File)=>{ const r=new FileReader(); r.onload=(e)=>onChange(e.target?.result as string); r.readAsDataURL(file); };
  return (
    <div onClick={()=>ref.current?.click()}
      onDragOver={e=>e.preventDefault()}
      onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
      className="relative h-20 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-1 overflow-hidden"
      style={{border:"1.5px dashed rgba(124,58,237,0.35)",background:"rgba(124,58,237,0.06)"}}>
      {value?(
        <><img src={value} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-60"/><div className="relative z-10 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">Ganti</div></>
      ):(
        <><Upload className="w-3.5 h-3.5" style={{color:"rgba(167,139,250,0.6)"}}/><span className="text-[10px]" style={{color:"rgba(167,139,250,0.5)"}}>Upload atau drag gambar</span></>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);}}/>
    </div>
  );
}

// ─── Section accordion ───────────────────────────────────────────────────────
function Section({title,count,children,defaultOpen=false}:{title:string;count?:number;children:React.ReactNode;defaultOpen?:boolean}) {
  const [open,setOpen]=useState(defaultOpen);
  return (
    <div style={{borderBottom:"1px solid rgba(124,58,237,0.1)"}}>
      <button onClick={()=>setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 transition-colors group"
        style={{background:"transparent"}}
        onMouseEnter={e=>(e.currentTarget.style.background="rgba(124,58,237,0.05)")}
        onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{color:"rgba(167,139,250,0.55)"}}>{title}</span>
          {count!==undefined && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{background:"rgba(124,58,237,0.12)",color:"rgba(167,139,250,0.45)"}}>{count}</span>
          )}
        </div>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open?"rotate-180":""}`} style={{color:"rgba(124,58,237,0.4)"}}/>
      </button>
      {open && <div style={{borderTop:"1px solid rgba(124,58,237,0.08)"}}>{children}</div>}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function BuatPage() {
  const [tid,setTid]             = useState("portfolio");
  const [formData,setFormData]   = useState<Record<string,string>>(DEFAULTS.portfolio);
  const [prevMode,setPrevMode]   = useState<"desktop"|"tablet"|"mobile">("desktop");
  const [showPanel,setShowPanel] = useState<"edit"|"preview">("edit");
  const [activeTab,setActiveTab] = useState<"konten"|"desain">("konten");
  const [showModal,setShowModal] = useState(false);
  const [reqName,setReqName]     = useState("");
  const [reqWa,setReqWa]         = useState("");
  const [sent,setSent]           = useState(false);
  const [copied,setCopied]       = useState(false);

  const tpl  = TEMPLATES.find(t=>t.id===tid)!;
  const html = useMemo(()=>generateHTML(tid,formData),[tid,formData]);
  const set  = useCallback((k:string,v:string)=>setFormData(p=>({...p,[k]:v})),[]);

  const switchTemplate=(id:string)=>{ setTid(id); setFormData(DEFAULTS[id]||{}); setActiveTab("konten"); };

  const handleDownload=()=>{
    if(!reqName||!reqWa) return;
    const msg=encodeURIComponent(`Halo kak AMRT.dev 👋\n\nSaya *${reqName}* mau minta approve download website saya.\n\n📌 Template: *${tpl.name}*\n📱 WA saya: *${reqWa}*\n\nSaya sudah puas dengan hasilnya! Mohon di-approve kak 🙏`);
    window.open(`https://wa.me/6283805753932?text=${msg}`,"_blank");
    setTimeout(()=>{ const f=document.getElementById("pf") as HTMLIFrameElement|null; if(f?.contentWindow) f.contentWindow.print(); },1200);
    setSent(true);
  };

  const copyHTML=useCallback(()=>{
    navigator.clipboard.writeText(html).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  },[html]);

  const openInTab=useCallback(()=>{
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    setTimeout(()=>URL.revokeObjectURL(url),5000);
  },[html]);

  const renderField=(f:Field)=>{
    const inpStyle={background:"rgba(124,58,237,0.07)",border:"1px solid rgba(124,58,237,0.2)",color:"#e5e7eb"};
    const inpFocus={border:"1px solid rgba(124,58,237,0.5)",boxShadow:"0 0 0 3px rgba(124,58,237,0.08)"};
    const inp="w-full px-3 py-2 rounded-lg text-sm transition text-white placeholder-gray-600 focus:outline-none";
    const row="flex items-start gap-3 px-4 py-2.5 transition-colors";
    const rowSt={borderBottom:"1px solid rgba(124,58,237,0.08)"};
    const lbl="w-28 flex-shrink-0 text-sm pt-1.5 leading-tight";
    const lblC={color:"rgba(196,181,253,0.7)"};

    if(f.type==="image") return (
      <div key={f.key} className={row} style={rowSt}>
        <span className={lbl} style={lblC}>{f.label}</span>
        <div className="flex-1"><ImageUpload label={f.label} value={formData[f.key]||""} onChange={v=>set(f.key,v)}/></div>
      </div>
    );
    if(f.type==="textarea") return (
      <div key={f.key} className={row} style={rowSt}>
        <span className={lbl} style={lblC}>{f.label}</span>
        <div className="flex-1">
          <textarea value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder} rows={3}
            className={inp+" resize-none"} style={inpStyle}
            onFocus={e=>Object.assign(e.currentTarget.style,inpFocus)} onBlur={e=>Object.assign(e.currentTarget.style,inpStyle)}/>
        </div>
      </div>
    );
    if(f.type==="color") return (
      <div key={f.key} className={row} style={rowSt}>
        <span className={lbl} style={lblC}>{f.label}</span>
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition" style={inpStyle}>
          <input type="color" value={formData[f.key]||"#111111"} onChange={e=>set(f.key,e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent flex-shrink-0"/>
          <span className="text-xs font-mono" style={{color:"rgba(196,181,253,0.6)"}}>{formData[f.key]||"#111111"}</span>
        </div>
      </div>
    );
    if(f.type==="select") return (
      <div key={f.key} className={row} style={rowSt}>
        <span className={lbl} style={lblC}>{f.label}</span>
        <div className="flex-1 flex flex-wrap gap-1.5 pt-1">
          {f.options?.map(o=>(
            <button key={o.value} type="button" onClick={()=>set(f.key,o.value)}
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
              style={formData[f.key]===o.value
                ?{background:"linear-gradient(135deg,#7c3aed,#06b6d4)",color:"#fff",border:"1px solid transparent"}
                :{background:"rgba(124,58,237,0.06)",color:"rgba(196,181,253,0.6)",border:"1px solid rgba(124,58,237,0.2)"}}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <div key={f.key} className={row} style={rowSt}>
        <span className={lbl} style={lblC}>{f.label}</span>
        <div className="flex-1">
          <input value={formData[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder}
            className={inp} style={inpStyle}
            onFocus={e=>Object.assign(e.currentTarget.style,inpFocus)} onBlur={e=>Object.assign(e.currentTarget.style,inpStyle)}/>
        </div>
      </div>
    );
  };

  // Split template groups into content groups vs design group
  const contentGroups = tpl.groups.filter(g=>g.title!=="Tampilan & Warna");
  const designGroup   = tpl.groups.find(g=>g.title==="Tampilan & Warna");

  const pageStyle={
    background:"#07080e",
    backgroundImage:"radial-gradient(ellipse at 10% 10%,rgba(124,58,237,0.18) 0%,transparent 45%),radial-gradient(ellipse at 90% 90%,rgba(6,182,212,0.1) 0%,transparent 45%),linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
    backgroundSize:"auto,auto,40px 40px,40px 40px",
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden text-white" style={pageStyle}>

      {/* ── Topbar ── */}
      <div className="flex-shrink-0 h-12 flex items-center justify-between px-4 z-50 backdrop-blur-xl"
        style={{background:"rgba(7,8,14,0.9)",borderBottom:"1px solid rgba(124,58,237,0.22)"}}>
        <div className="flex items-center gap-3">
          <Link href="/belajar" className="p-1.5 rounded-md transition-colors hover:bg-white/5" style={{color:"rgba(167,139,250,0.6)"}}>
            <ArrowLeft className="w-4 h-4"/>
          </Link>
          <div className="w-px h-4" style={{background:"rgba(124,58,237,0.25)"}}/>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)"}}/>
            <span className="text-sm font-semibold" style={{color:"rgba(229,231,235,0.9)"}}>{tpl.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Mobile: edit/preview toggle */}
          <div className="flex sm:hidden items-center gap-0.5 rounded-lg p-1" style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.18)"}}>
            <button onClick={()=>setShowPanel("edit")} className="px-3 py-1 text-xs font-medium rounded-md transition-all"
              style={showPanel==="edit"?{background:"rgba(124,58,237,0.35)",color:"#e9d5ff"}:{color:"rgba(167,139,250,0.45)"}}>Edit</button>
            <button onClick={()=>setShowPanel("preview")} className="px-3 py-1 text-xs font-medium rounded-md transition-all"
              style={showPanel==="preview"?{background:"rgba(124,58,237,0.35)",color:"#e9d5ff"}:{color:"rgba(167,139,250,0.45)"}}>Preview</button>
          </div>
          {/* Desktop: device toggle */}
          <div className="hidden sm:flex items-center gap-0.5 rounded-lg p-1" style={{background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.15)"}}>
            <button onClick={()=>setPrevMode("desktop")} title="Desktop" className="p-1.5 rounded-md transition-all"
              style={prevMode==="desktop"?{background:"rgba(124,58,237,0.3)",color:"#a78bfa"}:{color:"rgba(167,139,250,0.35)"}}><Monitor className="w-3.5 h-3.5"/></button>
            <button onClick={()=>setPrevMode("tablet")} title="Tablet" className="p-1.5 rounded-md transition-all"
              style={prevMode==="tablet"?{background:"rgba(124,58,237,0.3)",color:"#a78bfa"}:{color:"rgba(167,139,250,0.35)"}}><Tablet className="w-3.5 h-3.5"/></button>
            <button onClick={()=>setPrevMode("mobile")} title="Mobile" className="p-1.5 rounded-md transition-all"
              style={prevMode==="mobile"?{background:"rgba(124,58,237,0.3)",color:"#a78bfa"}:{color:"rgba(167,139,250,0.35)"}}><Smartphone className="w-3.5 h-3.5"/></button>
          </div>
          <div className="w-px h-4 hidden sm:block" style={{background:"rgba(124,58,237,0.2)"}}/>
          <button onClick={copyHTML} title="Copy HTML" className="hidden sm:flex p-2 rounded-md transition-all items-center gap-1.5 text-xs"
            style={copied?{background:"rgba(34,197,94,0.15)",color:"#4ade80",border:"1px solid rgba(34,197,94,0.3)"}:{color:"rgba(167,139,250,0.5)",border:"1px solid transparent"}}>
            {copied?<><Check className="w-3.5 h-3.5"/>Copied!</>:<><Copy className="w-3.5 h-3.5"/><span className="hidden lg:inline">Copy HTML</span></>}
          </button>
          <button onClick={openInTab} title="Buka di tab baru" className="hidden sm:flex p-2 rounded-md transition-all items-center"
            style={{color:"rgba(167,139,250,0.5)"}}>
            <ExternalLink className="w-3.5 h-3.5"/>
          </button>
          <button onClick={()=>setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-white text-xs font-semibold rounded-lg transition-all"
            style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)",boxShadow:"0 0 16px rgba(124,58,237,0.35)"}}>
            <Download className="w-3.5 h-3.5"/><span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className={`flex-shrink-0 w-72 xl:w-80 flex flex-col overflow-hidden ${showPanel==="preview"?"hidden sm:flex":"flex"}`}
          style={{background:"rgba(7,8,14,0.8)",borderRight:"1px solid rgba(124,58,237,0.18)",backdropFilter:"blur(12px)"}}>

          {/* Template selector */}
          <div className="flex-shrink-0 p-3" style={{borderBottom:"1px solid rgba(124,58,237,0.14)"}}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] px-1 mb-2" style={{color:"rgba(124,58,237,0.45)"}}>Template</p>
            <div className="grid grid-cols-2 gap-1.5">
              {TEMPLATES.map(t=>{
                const TIcon=t.Icon;
                const active=tid===t.id;
                return (
                  <button key={t.id} onClick={()=>switchTemplate(t.id)}
                    className="flex flex-col gap-1.5 px-3 py-2.5 rounded-xl text-left transition-all relative overflow-hidden"
                    style={active
                      ?{background:"rgba(124,58,237,0.18)",border:"1px solid rgba(124,58,237,0.45)",boxShadow:`0 0 16px rgba(124,58,237,0.18),inset 0 1px 0 rgba(167,139,250,0.12)`}
                      :{background:"rgba(124,58,237,0.04)",border:"1px solid rgba(124,58,237,0.1)"}}>
                    {active && <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{background:`linear-gradient(90deg,${t.color},transparent)`}}/>}
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{background:active?`${t.color}22`:"rgba(124,58,237,0.08)",border:`1px solid ${active?t.color+"44":"rgba(124,58,237,0.15)"}`}}>
                        <TIcon className="w-2.5 h-2.5" style={{color:active?t.color:"rgba(167,139,250,0.4)"}}/>
                      </div>
                      <span className="text-[11px] font-semibold leading-tight" style={{color:active?"#e9d5ff":"rgba(167,139,250,0.5)"}}>{t.name}</span>
                    </div>
                    <p className="text-[9px] leading-snug pl-0.5" style={{color:active?"rgba(196,181,253,0.5)":"rgba(124,58,237,0.3)"}}>{t.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-shrink-0 flex" style={{borderBottom:"1px solid rgba(124,58,237,0.14)"}}>
            {(["konten","desain"] as const).map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)}
                className="flex-1 py-2.5 text-xs font-semibold transition-all capitalize relative"
                style={activeTab===tab?{color:"#a78bfa"}:{color:"rgba(167,139,250,0.35)"}}>
                {tab==="konten"?"Konten":"Desain"}
                {activeTab===tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full" style={{background:"linear-gradient(90deg,#7c3aed,#06b6d4)"}}/>}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab==="konten" ? (
              contentGroups.map((g,gi)=>(
                <Section key={g.title} title={g.title} count={g.fields.length} defaultOpen={gi===0}>
                  {g.fields.map(f=>renderField(f))}
                </Section>
              ))
            ):(
              <div className="p-4 space-y-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] mb-3" style={{color:"rgba(124,58,237,0.45)"}}>Tampilan & Warna</p>
                {designGroup?.fields.map(f=>renderField(f))}
                {!designGroup && <p className="text-xs" style={{color:"rgba(167,139,250,0.3)"}}>Tidak ada pengaturan desain.</p>}
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between"
            style={{borderTop:"1px solid rgba(124,58,237,0.1)",background:"rgba(5,6,10,0.6)"}}>
            <span className="text-[10px]" style={{color:"rgba(124,58,237,0.4)"}}>
              {contentGroups.reduce((a,g)=>a+g.fields.length,0)} field
            </span>
            <span className="flex items-center gap-1 text-[10px]" style={{color:"rgba(34,197,94,0.5)"}}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse"/>Live Preview
            </span>
          </div>
        </aside>

        {/* ── Preview ── */}
        <main className={`flex-1 flex flex-col overflow-hidden ${showPanel==="edit"&&"hidden sm:flex"}`}
          style={{background:"rgba(5,6,10,0.5)"}}>
          <div className="flex-1 flex items-start justify-center overflow-auto p-4 sm:p-6">
            <div className="transition-all duration-300 overflow-hidden"
              style={{
                width: prevMode==="mobile"?"390px": prevMode==="tablet"?"768px":"100%",
                maxWidth: prevMode==="desktop"?"1100px":undefined,
                height: prevMode==="mobile"?"780px": prevMode==="tablet"?"1024px":"calc(100vh - 120px)",
                borderRadius: prevMode==="mobile"?"36px": prevMode==="tablet"?"20px":"12px",
                border: prevMode==="mobile"?"6px solid rgba(124,58,237,0.5)": prevMode==="tablet"?"4px solid rgba(124,58,237,0.35)":"1px solid rgba(124,58,237,0.2)",
                boxShadow: prevMode!=="desktop"?"0 24px 60px rgba(0,0,0,0.6),0 0 40px rgba(124,58,237,0.15)":"0 0 40px rgba(124,58,237,0.08)",
              }}>
              <iframe id="pf" srcDoc={html} className="w-full h-full border-0" title="Preview"/>
            </div>
          </div>
          {/* Preview label */}
          <div className="flex-shrink-0 flex items-center justify-center py-2" style={{borderTop:"1px solid rgba(124,58,237,0.08)"}}>
            <span className="text-[10px] font-medium" style={{color:"rgba(124,58,237,0.35)"}}>
              {prevMode==="desktop"?"Desktop (Penuh)":prevMode==="tablet"?"Tablet (768px)":"Mobile (390px)"}
            </span>
          </div>
        </main>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{background:"rgba(0,0,0,0.65)"}}>
          <div className="relative w-full max-w-md rounded-2xl p-6" style={{background:"rgba(10,11,20,0.97)",border:"1px solid rgba(124,58,237,0.35)",boxShadow:"0 0 60px rgba(124,58,237,0.2),0 24px 48px rgba(0,0,0,0.5)"}}>
            <button onClick={()=>{setShowModal(false);setSent(false);}} className="absolute top-4 right-4 rounded-lg p-1.5 transition-colors hover:bg-white/5" style={{color:"rgba(167,139,250,0.5)"}}><X className="w-4 h-4"/></button>
            {!sent?(
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.3),rgba(6,182,212,0.2))",border:"1px solid rgba(124,58,237,0.3)"}}>
                    <Download className="w-4 h-4" style={{color:"#a78bfa"}}/>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Download & Hosting</h2>
                    <p className="text-[11px]" style={{color:"rgba(156,163,175,0.6)"}}>Gratis · Chat ke Admin WhatsApp</p>
                  </div>
                </div>
                <p className="text-sm mb-5 leading-relaxed" style={{color:"rgba(156,163,175,0.7)"}}>Isi data di bawah, pesan akan dikirim otomatis ke admin. Setelah konfirmasi, website siap di-download atau langsung dihosting.</p>
                <div className="space-y-3 mb-5">
                  {[{v:reqName,sv:setReqName,ph:"Nama lengkap kamu"},{v:reqWa,sv:setReqWa,ph:"Nomor WhatsApp kamu"}].map((inp,i)=>(
                    <input key={i} value={inp.v} onChange={e=>inp.sv(e.target.value)} placeholder={inp.ph}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none text-sm transition"
                      style={{background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.22)"}}
                      onFocus={e=>{e.currentTarget.style.border="1px solid rgba(124,58,237,0.55)";e.currentTarget.style.boxShadow="0 0 0 3px rgba(124,58,237,0.1)"}}
                      onBlur={e=>{e.currentTarget.style.border="1px solid rgba(124,58,237,0.22)";e.currentTarget.style.boxShadow="none"}}/>
                  ))}
                </div>
                <button onClick={handleDownload} disabled={!reqName||!reqWa}
                  className="w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  style={{background:"#25D366",boxShadow:"0 0 20px rgba(37,211,102,0.2)"}}>
                  <Send className="w-4 h-4"/> Kirim ke Admin & Download
                </button>
                <p className="text-[11px] text-center mt-3" style={{color:"rgba(167,139,250,0.35)"}}>100% Gratis · Tidak perlu daftar</p>
              </>
            ):(
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{background:"rgba(6,182,212,0.1)",border:"1px solid rgba(6,182,212,0.3)"}}>
                  <CheckCircle className="w-7 h-7" style={{color:"#22d3ee"}}/>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">Berhasil Dikirim!</h2>
                <p className="text-sm leading-relaxed mb-6" style={{color:"rgba(156,163,175,0.7)"}}>Admin akan konfirmasi via WhatsApp. Kamu juga bisa request hosting di chat yang sama.</p>
                <button onClick={()=>{setShowModal(false);setSent(false);}}
                  className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold transition-all"
                  style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)"}}>Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
