"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Play } from "lucide-react";
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

function isVideo(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-800">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-5 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-4/5 rounded-full" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-5 w-14 rounded-md" />
          <div className="skeleton h-5 w-16 rounded-md" />
          <div className="skeleton h-5 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ item }: { item: PortfolioItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
  };

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-surface-800 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={item.imageUrl}
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
        <div className="flex gap-3">
          {item.liveUrl && item.liveUrl !== "#" && !item.liveUrl.includes("example.com") && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-primary-500/80 hover:bg-primary-500 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageCard({ item }: { item: PortfolioItem }) {
  return (
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
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
        <div className="flex gap-3">
          {item.liveUrl && item.liveUrl !== "#" && !item.liveUrl.includes("example.com") && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-primary-500/80 hover:bg-primary-500 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const categories = ["Semua", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("Semua");

  const filtered = active === "Semua" ? items : items.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
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
            Setiap proyek dikerjakan dengan standar kualitas tertinggi dan
            perhatian pada detail.
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

        {/* Empty state */}
        {items.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden border border-glass-border bg-glass backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,102,255,0.08)]"
                >
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ padding: "1px", background: "linear-gradient(90deg, #0066ff33, #4d94ff22, #0066ff33)", backgroundSize: "200% 100%" }}
                  />

                  {/* Media */}
                  {isVideo(item.imageUrl) ? (
                    <VideoCard item={item} />
                  ) : (
                    <ImageCard item={item} />
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-3.5 h-3.5 text-primary-400" />
                      <span className="text-xs text-primary-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.techStack && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.techStack.split(",").map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-medium text-primary-300 bg-primary-500/10 rounded-md border border-primary-500/10 transition-colors group-hover:border-primary-500/20"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
