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
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 mb-5">
            Panduan Gratis
          </p>
          <h1 className="text-4xl sm:text-5xl font-800 leading-[1.08] tracking-tight mb-6 font-bold" style={{letterSpacing:"-1.5px"}}>
            Belajar membuat website<br />dari nol.
          </h1>
          <p className="text-[17px] text-gray-500 max-w-lg leading-relaxed mb-10">
            Panduan HTML, CSS, dan JavaScript untuk pemula. Gratis, langsung ke inti, tanpa omong kosong.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/belajar/panduan/html-dasar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg text-sm transition-opacity hover:opacity-90"
            >
              Mulai Belajar <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/belajar/buat"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-400 font-medium rounded-lg text-sm transition-all hover:border-white/25 hover:text-white"
            >
              Coba Builder
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-3 divide-x divide-white/6 border border-white/6 rounded-xl overflow-hidden">
          {[
            { value: `${guides.length}`, label: "Panduan" },
            { value: `${totalMinutes}+`, label: "Menit belajar" },
            { value: "Gratis", label: "Selamanya" },
          ].map(({ value, label }) => (
            <div key={label} className="px-3 sm:px-6 py-5">
              <div className="text-xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Guide list ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-gray-600 mb-6">
          Daftar Panduan
        </h2>

        <div className="divide-y divide-white/5 border border-white/6 rounded-xl overflow-hidden">
          {guides.map((guide, i) => {
            const Icon = categoryIcon[guide.category] ?? Code2;
            return (
              <Link
                key={guide.slug}
                href={`/belajar/panduan/${guide.slug}`}
                className="group flex items-center gap-4 px-5 py-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <span className="flex-shrink-0 w-7 text-xs font-medium text-gray-700 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-[15px] text-gray-100 group-hover:text-white transition-colors">
                      {guide.title}
                    </span>
                    <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider text-gray-700 px-1.5 py-0.5 border border-white/6 rounded">
                      {categoryLabel[guide.category] ?? guide.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{guide.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3 text-gray-700">
                  <span className="hidden sm:flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5" />{guide.duration}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-5 border border-white/6 rounded-xl bg-white/[0.02]">
          <div>
            <p className="font-semibold text-white mb-1">Sudah baca panduan?</p>
            <p className="text-sm text-gray-600">Langsung coba buat website sendiri dengan builder gratis.</p>
          </div>
          <Link
            href="/belajar/buat"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Buat Website <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
