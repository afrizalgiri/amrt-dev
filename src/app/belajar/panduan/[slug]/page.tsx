import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuide } from "@/lib/guides";
import { ArrowLeft, ArrowRight, Clock, ChevronRight, Globe, Palette, Code2, Layers, Lightbulb, AlertTriangle, Rocket } from "lucide-react";

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
  HTML:       "text-gray-300 bg-white/5 border-white/10",
  CSS:        "text-gray-300 bg-white/5 border-white/10",
  JavaScript: "text-gray-300 bg-white/5 border-white/10",
  Project:    "text-gray-300 bg-white/5 border-white/10",
};

const categoryIcon: Record<string, React.ElementType> = {
  HTML:       Globe,
  CSS:        Palette,
  JavaScript: Code2,
  Project:    Layers,
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const sorted = [...guides].sort((a, b) => a.order - b.order);
  const idx   = sorted.findIndex((g) => g.slug === slug);
  const prev  = sorted[idx - 1];
  const next  = sorted[idx + 1];

  const GuideIcon = categoryIcon[guide.category] ?? Code2;
  const colorClass = categoryColor[guide.category] ?? "text-gray-300 bg-white/5 border-white/10";

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
            <span className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${colorClass}`}>
              {guide.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" /> {guide.duration}
            </span>
            <span className="text-xs text-gray-500">{guide.difficulty}</span>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <GuideIcon className="w-7 h-7 flex-shrink-0 text-gray-500 mt-1" />
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">{guide.title}</h1>
          </div>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{guide.description}</p>
        </div>

        {/* ── Progress indicator ── */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {sorted.map((g, i) => {
            const StepIcon = categoryIcon[g.category] ?? Code2;
            return (
              <Link key={g.slug} href={`/belajar/panduan/${g.slug}`}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap ${
                  g.slug === slug
                    ? "bg-white text-black border-white"
                    : "text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-300"
                }`}>
                  <span>{i + 1}.</span> {g.title}
                </div>
              </Link>
            );
          })}
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
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/4 border border-white/8">
                <Lightbulb className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
              </div>
            );

            if (section.type === "warning") return (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/4 border border-white/8">
                <AlertTriangle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
              </div>
            );

            return null;
          })}
        </div>

        {/* ── Prev / Next ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-16 pt-8 border-t border-white/8">
          {prev ? (() => {
            const PrevIcon = categoryIcon[prev.category] ?? Code2;
            const prevColor = (categoryColor[prev.category] ?? "text-gray-400").split(" ")[0];
            return (
              <Link href={`/belajar/panduan/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/3 transition-all">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Sebelumnya
                </span>
                <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors flex items-center gap-2">
                  <PrevIcon className={`w-4 h-4 flex-shrink-0 ${prevColor}`} />
                  {prev.title}
                </span>
              </Link>
            );
          })() : <div />}

          {next ? (() => {
            const NextIcon = categoryIcon[next.category] ?? Code2;
            const nextColor = (categoryColor[next.category] ?? "text-gray-400").split(" ")[0];
            return (
              <Link href={`/belajar/panduan/${next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/3 transition-all sm:text-right">
                <span className="text-xs text-gray-500 flex items-center gap-1 sm:justify-end">
                  Selanjutnya <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors flex items-center gap-2 sm:justify-end">
                  <NextIcon className={`w-4 h-4 flex-shrink-0 ${nextColor}`} />
                  {next.title}
                </span>
              </Link>
            );
          })() : (
            <Link href="/belajar/buat"
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15 transition-all sm:text-right">
              <span className="text-xs text-gray-500 flex items-center gap-1 sm:justify-end">
                Selesai belajar! <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-medium text-sm text-white flex items-center gap-2 sm:justify-end">
                <Rocket className="w-4 h-4 flex-shrink-0" />
                Buat Website Sekarang
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
