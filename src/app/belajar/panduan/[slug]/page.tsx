import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuide } from "@/lib/guides";
import { ArrowLeft, ArrowRight, Clock, ChevronRight } from "lucide-react";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: `${guide.title} | Belajar AMRT.dev` };
}

const langLabel: Record<string, string> = {
  html: "HTML", css: "CSS", javascript: "JavaScript",
};

const categoryColor: Record<string, string> = {
  HTML:       "text-orange-400 bg-orange-500/10 border-orange-500/20",
  CSS:        "text-blue-400 bg-blue-500/10 border-blue-500/20",
  JavaScript: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Project:    "text-green-400 bg-green-500/10 border-green-500/20",
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const sorted = [...guides].sort((a, b) => a.order - b.order);
  const idx   = sorted.findIndex((g) => g.slug === slug);
  const prev  = sorted[idx - 1];
  const next  = sorted[idx + 1];

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* ── Top nav ── */}
      <div className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-3 text-sm text-gray-500">
          <Link href="/belajar" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Belajar
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-300 truncate">{guide.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Guide header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${categoryColor[guide.category] ?? ""}`}>
              {guide.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" /> {guide.duration}
            </span>
            <span className="text-xs text-gray-500">{guide.difficulty}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {guide.icon} {guide.title}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">{guide.description}</p>
        </div>

        {/* ── Progress indicator ── */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {sorted.map((g, i) => (
            <Link key={g.slug} href={`/belajar/panduan/${g.slug}`}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap ${
                g.slug === slug
                  ? "bg-primary-500 text-white border-primary-500"
                  : "text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-300"
              }`}>
                <span>{i + 1}.</span> {g.title}
              </div>
            </Link>
          ))}
        </div>

        {/* ── Content sections ── */}
        <div className="prose prose-invert max-w-none space-y-6">
          {guide.sections.map((section, i) => {
            if (section.type === "heading") return (
              <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 first:mt-0">
                {section.content}
              </h2>
            );

            if (section.type === "text") return (
              <p key={i} className="text-gray-300 leading-relaxed text-[15px]">
                {section.content}
              </p>
            );

            if (section.type === "code") return (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                {section.language && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-white/8">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2 font-mono">
                      {langLabel[section.language] ?? section.language}
                    </span>
                  </div>
                )}
                <pre className="overflow-x-auto p-5 bg-[#0d1117] text-[13px] leading-relaxed">
                  <code className="text-gray-200 font-mono">{section.content}</code>
                </pre>
              </div>
            );

            if (section.type === "tip") return (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-primary-500/8 border border-primary-500/20">
                <span className="text-xl flex-shrink-0">💡</span>
                <p className="text-primary-200 text-sm leading-relaxed">{section.content}</p>
              </div>
            );

            if (section.type === "warning") return (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
                <span className="text-xl flex-shrink-0">⚠️</span>
                <p className="text-amber-200 text-sm leading-relaxed">{section.content}</p>
              </div>
            );

            return null;
          })}
        </div>

        {/* ── Prev / Next ── */}
        <div className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-white/8">
          {prev ? (
            <Link href={`/belajar/panduan/${prev.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-primary-500/30 hover:bg-white/3 transition-all">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Sebelumnya
              </span>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">
                {prev.icon} {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/belajar/panduan/${next.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-primary-500/30 hover:bg-white/3 transition-all text-right">
              <span className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                Selanjutnya <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">
                {next.icon} {next.title}
              </span>
            </Link>
          ) : (
            <Link href="/belajar/buat"
              className="group flex flex-col gap-1 p-4 rounded-xl border border-primary-500/30 bg-primary-500/8 hover:bg-primary-500/15 transition-all text-right">
              <span className="text-xs text-primary-400 flex items-center gap-1 justify-end">
                Selesai belajar! <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-medium text-sm text-primary-200">
                🚀 Buat Website Sekarang
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
