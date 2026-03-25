import Link from "next/link";
import { guides } from "@/lib/guides";
import { ArrowRight, Clock, BookOpen, Zap, Globe, Palette, Code2, Layers, Rocket } from "lucide-react";

export const metadata = { title: "Belajar Web Gratis | AMRT.dev" };

const categoryColor: Record<string, string> = {
  HTML:       "text-orange-400 bg-orange-500/10 border-orange-500/20",
  CSS:        "text-blue-400 bg-blue-500/10 border-blue-500/20",
  JavaScript: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Project:    "text-green-400 bg-green-500/10 border-green-500/20",
};

const categoryIcon: Record<string, React.ElementType> = {
  HTML:       Globe,
  CSS:        Palette,
  JavaScript: Code2,
  Project:    Layers,
};

export default function BelajarPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5">
            100% Gratis
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Belajar{" "}
            <span className="bg-gradient-to-r from-primary-400 to-cyan-300 bg-clip-text text-transparent">
              Buat Website
            </span>
            <br />dari Nol
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
            Panduan lengkap HTML, CSS, dan JavaScript untuk pemula. Setelah belajar,
            langsung coba buat website-mu sendiri dan lihat hasilnya!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/belajar/panduan/html-dasar"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] hover:scale-[1.03]"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/belajar/buat"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-primary-500/40 text-white font-medium rounded-lg transition-all duration-300 bg-white/5 hover:bg-white/8 hover:scale-[1.03]"
            >
              Langsung Coba Builder
              <Zap className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stat bar ── */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white/3 border border-white/8">
          {[
            { label: "Panduan", value: `${guides.length}`, icon: BookOpen },
            { label: "Menit Belajar", value: `${guides.reduce((a,g)=>a+parseInt(g.duration),0)}+`, icon: Clock },
            { label: "Gratis Selamanya", value: "✓", icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <Icon className="w-5 h-5 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Daftar Panduan ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary-400" />
          Daftar Panduan
        </h2>

        <div className="space-y-4">
          {guides.map((guide, i) => {
            const GuideIcon = categoryIcon[guide.category] ?? Code2;
            const colorClass = categoryColor[guide.category] ?? "text-gray-400 bg-white/5 border-white/10";
            const iconColor = colorClass.split(" ")[0]; // e.g. "text-orange-400"
            return (
              <Link
                key={guide.slug}
                href={`/belajar/panduan/${guide.slug}`}
                className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-primary-500/30 transition-all duration-300"
              >
                {/* Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon + title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <GuideIcon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                    <h3 className="font-semibold text-white group-hover:text-primary-200 transition-colors">
                      {guide.title}
                    </h3>
                    <span className={`hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${colorClass}`}>
                      {guide.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{guide.description}</p>
                </div>

                {/* Meta */}
                <div className="flex-shrink-0 flex items-center gap-4 text-xs text-gray-500">
                  <span className="hidden sm:flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />{guide.duration}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA Builder ── */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary-500/15 to-cyan-500/5 border border-primary-500/20 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Sudah baca panduan? Saatnya praktek!</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Pilih template, isi konten kamu, dan lihat langsung hasilnya.
            Kalau puas, bisa langsung minta untuk dihosting!
          </p>
          <Link
            href="/belajar/buat"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-[1.03]"
          >
            Buat Website Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
