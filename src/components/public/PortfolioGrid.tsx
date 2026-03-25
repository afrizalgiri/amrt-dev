"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Layers, Play, X, Globe, Server,
  Database, Smartphone, Cloud, Paintbrush, ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  techStack: string;
  liveUrl: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

// ── Infrastruktur mapping ────────────────────────────────────────────────────
const INFRA_MAP: { label: string; icon: React.ReactNode; keywords: string[] }[] = [
  {
    label: "Frontend",
    icon: <Globe className="w-4 h-4" />,
    keywords: ["next", "react", "vue", "angular", "svelte", "nuxt", "remix", "astro", "vite"],
  },
  {
    label: "Backend",
    icon: <Server className="w-4 h-4" />,
    keywords: ["node", "express", "laravel", "django", "fastapi", "spring", "rails", "nestjs", "golang", "go", "php", "python", "rust"],
  },
  {
    label: "Database",
    icon: <Database className="w-4 h-4" />,
    keywords: ["postgres", "mysql", "mongodb", "sqlite", "redis", "supabase", "firebase", "turso", "prisma", "planetscale"],
  },
  {
    label: "Mobile",
    icon: <Smartphone className="w-4 h-4" />,
    keywords: ["flutter", "react native", "swift", "kotlin", "android", "ios", "expo"],
  },
  {
    label: "Infrastruktur",
    icon: <Cloud className="w-4 h-4" />,
    keywords: ["vps", "aws", "gcp", "azure", "vercel", "docker", "nginx", "kubernetes", "cloudflare", "railway", "render"],
  },
  {
    label: "Desain",
    icon: <Paintbrush className="w-4 h-4" />,
    keywords: ["figma", "tailwind", "framer", "gsap", "shadcn", "chakra", "mui", "bootstrap"],
  },
];

function parseInfrastructure(techStack: string) {
  const techs = techStack.split(",").map((t) => t.trim()).filter(Boolean);
  const result: { label: string; icon: React.ReactNode; items: string[] }[] = [];

  for (const group of INFRA_MAP) {
    const matched = techs.filter((tech) =>
      group.keywords.some((kw) => tech.toLowerCase().includes(kw))
    );
    if (matched.length > 0) {
      result.push({ label: group.label, icon: group.icon, items: matched });
    }
  }

  // Tech yang ga masuk kategori manapun → masuk "Lainnya"
  const categorized = result.flatMap((r) => r.items);
  const others = techs.filter((t) => !categorized.includes(t));
  if (others.length > 0) {
    result.push({ label: "Lainnya", icon: <Layers className="w-4 h-4" />, items: others });
  }

  return result;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function isVideo(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

function hasLiveUrl(url: string) {
  return url && url !== "#" && !url.includes("example.com");
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-800">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-5 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-5 w-14 rounded-md" />
          <div className="skeleton h-5 w-16 rounded-md" />
          <div className="skeleton h-5 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ── Video preview card ────────────────────────────────────────────────────────
function VideoPreview({ item }: { item: PortfolioItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-surface-800 cursor-pointer"
      onMouseEnter={() => { videoRef.current?.play(); setPlaying(true); }}
      onMouseLeave={() => {
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
        setPlaying(false);
      }}
    >
      <video ref={videoRef} src={item.imageUrl} loop muted playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function PortfolioModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const infra = parseInfrastructure(item.techStack || "");
  const allTechs = (item.techStack || "").split(",").map((t) => t.trim()).filter(Boolean);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(12px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-900 border border-glass-border shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, y: 48, scale: 0.94, rotateX: 4 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
        style={{ transformPerspective: 1200 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-surface-800 hover:bg-surface-700 border border-glass-border flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Media */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-surface-800">
          {isVideo(item.imageUrl) ? (
            <video src={item.imageUrl} autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
          ) : item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.title} fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Layers className="w-16 h-16 text-surface-600" />
            </div>
          )}
          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 -mt-2">
          {/* Category + Title */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                  {item.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {item.title}
              </h2>
            </div>
            {hasLiveUrl(item.liveUrl) && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-all hover:shadow-[0_0_24px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Live Demo
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="mt-4 text-gray-400 leading-relaxed text-sm sm:text-base">
              {item.description}
            </p>
          )}

          {/* Infrastructure breakdown */}
          {infra.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Stack & Infrastruktur
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {infra.map((group, i) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.1 + i * 0.055 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-800/60 border border-glass-border hover:border-primary-500/30 hover:bg-surface-800/80 transition-colors"
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-primary-500/10 text-primary-400 flex-shrink-0">
                      {group.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((tech) => (
                          <span key={tech}
                            className="px-2 py-0.5 text-xs font-medium text-primary-300 bg-primary-500/10 rounded-md border border-primary-500/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All tech badges (flat) jika ga ada infrastruktur breakdown */}
          {infra.length === 0 && allTechs.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {allTechs.map((tech) => (
                <span key={tech}
                  className="px-2.5 py-1 text-xs font-medium text-primary-300 bg-primary-500/10 rounded-lg border border-primary-500/15"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Grid ─────────────────────────────────────────────────────────────────
export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const categories = ["Semua", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("Semua");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = active === "Semua" ? items : items.filter((i) => i.category === active);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Karya{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Terbaik Kami
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Setiap proyek dikerjakan dengan standar kualitas tertinggi dan perhatian pada detail.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
                active === cat
                  ? "bg-primary-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                  : "bg-glass border border-glass-border text-gray-400 hover:text-white hover:border-primary-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skeleton */}
        {items.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Grid */}
        {items.length > 0 && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    mass: 0.8,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative rounded-2xl overflow-hidden border border-glass-border bg-glass backdrop-blur-sm cursor-pointer"
                  style={{ boxShadow: "0 0 0 rgba(0,102,255,0)" }}
                  onClick={() => setSelected(item)}
                >
                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ padding: "1px", background: "linear-gradient(135deg, #0066ff33, #4d94ff22, #0066ff33)", backgroundSize: "200% 100%" }}
                  />

                  {/* Media */}
                  {isVideo(item.imageUrl) ? (
                    <VideoPreview item={item} />
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-800">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-700 flex items-center justify-center">
                          <Layers className="w-10 h-10 text-surface-500" />
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-surface-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span>Lihat Detail</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-3.5 h-3.5 text-primary-400" />
                      <span className="text-xs text-primary-400 font-medium">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.techStack && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.techStack.split(",").slice(0, 4).map((tech) => (
                          <span key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium text-primary-300 bg-primary-500/10 rounded-md border border-primary-500/10 transition-colors group-hover:border-primary-500/20"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                        {item.techStack.split(",").length > 4 && (
                          <span className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-surface-700/50 rounded-md border border-glass-border">
                            +{item.techStack.split(",").length - 4} lagi
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <PortfolioModal item={selected} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}
