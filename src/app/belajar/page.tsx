import Link from "next/link";
import { guides } from "@/lib/guides";
import { ArrowRight, Clock, Globe, Palette, Code2, Layers } from "lucide-react";

export const metadata = { title: "Belajar Web Gratis | AMRT.dev" };

const categoryIcon: Record<string, React.ElementType> = {
  HTML: Globe, CSS: Palette, JavaScript: Code2, Project: Layers,
};

const categoryLabel: Record<string, string> = {
  HTML: "HTML", CSS: "CSS", JavaScript: "JS", Project: "Project",
};

export default function BelajarPage() {
  const totalMinutes = guides.reduce((a, g) => a + parseInt(g.duration), 0);

  return (
    <main className="min-h-screen text-white" style={{
      background:"#07080e",
      backgroundImage:"radial-gradient(ellipse at 15% 15%,rgba(124,58,237,0.18) 0%,transparent 50%),radial-gradient(ellipse at 85% 85%,rgba(6,182,212,0.12) 0%,transparent 50%),linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
      backgroundSize:"auto,auto,40px 40px,40px 40px",
    }}>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-5" style={{color:"rgba(167,139,250,0.7)"}}>
            Panduan Gratis
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.08] mb-6" style={{letterSpacing:"-1.5px"}}>
            Belajar membuat website<br />dari nol.
          </h1>
          <p className="text-[17px] text-gray-500 max-w-lg leading-relaxed mb-10">
            Panduan HTML, CSS, dan JavaScript untuk pemula. Gratis, langsung ke inti, tanpa omong kosong.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/belajar/panduan/html-dasar"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg text-sm transition-opacity hover:opacity-88"
              style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)",boxShadow:"0 0 20px rgba(124,58,237,0.4)"}}
            >
              Mulai Belajar <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/belajar/buat"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg text-sm transition-all"
              style={{border:"1px solid rgba(124,58,237,0.25)",color:"#9ca3af",background:"rgba(124,58,237,0.06)"}}
            >
              Coba Builder
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-3 rounded-xl overflow-hidden" style={{border:"1px solid rgba(124,58,237,0.2)",background:"rgba(124,58,237,0.04)"}}>
          {[
            { value: `${guides.length}`, label: "Panduan" },
            { value: `${totalMinutes}+`, label: "Menit belajar" },
            { value: "Gratis", label: "Selamanya" },
          ].map(({ value, label }, i) => (
            <div key={label} className="px-3 sm:px-6 py-5" style={{borderRight:i<2?"1px solid rgba(124,58,237,0.15)":"none"}}>
              <div className="text-xl font-bold mb-1" style={{background:"linear-gradient(135deg,#a78bfa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{value}</div>
              <div className="text-xs text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Guide list ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] mb-6" style={{color:"rgba(167,139,250,0.6)"}}>
          Daftar Panduan
        </h2>

        <div className="rounded-xl overflow-hidden" style={{border:"1px solid rgba(124,58,237,0.18)"}}>
          {guides.map((guide, i) => {
            const Icon = categoryIcon[guide.category] ?? Code2;
            return (
              <Link
                key={guide.slug}
                href={`/belajar/panduan/${guide.slug}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors"
                style={{
                  background:"rgba(124,58,237,0.03)",
                  borderBottom: i < guides.length - 1 ? "1px solid rgba(124,58,237,0.12)" : "none",
                }}
              >
                <span className="flex-shrink-0 w-7 text-xs font-medium tabular-nums" style={{color:"rgba(124,58,237,0.5)"}}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.2)"}}>
                  <Icon className="w-4 h-4" style={{color:"#a78bfa"}}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-[15px] text-gray-100 group-hover:text-white transition-colors">
                      {guide.title}
                    </span>
                    <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{color:"rgba(167,139,250,0.7)",border:"1px solid rgba(124,58,237,0.25)",background:"rgba(124,58,237,0.08)"}}>
                      {categoryLabel[guide.category] ?? guide.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{guide.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3" style={{color:"rgba(124,58,237,0.5)"}}>
                  <span className="hidden sm:flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5" />{guide.duration}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all group-hover:text-purple-400" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-5 rounded-xl" style={{border:"1px solid rgba(124,58,237,0.2)",background:"rgba(124,58,237,0.06)"}}>
          <div>
            <p className="font-semibold text-white mb-1">Sudah baca panduan?</p>
            <p className="text-sm text-gray-600">Langsung coba buat website sendiri dengan builder gratis.</p>
          </div>
          <Link
            href="/belajar/buat"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg text-sm transition-opacity hover:opacity-88 whitespace-nowrap"
            style={{background:"linear-gradient(135deg,#7c3aed,#06b6d4)",boxShadow:"0 0 16px rgba(124,58,237,0.35)"}}
          >
            Buat Website <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
