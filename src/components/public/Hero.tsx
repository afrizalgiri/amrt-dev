"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  siteName: string;
}

export default function Hero({ title, subtitle, siteName }: HeroProps) {
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  // GSAP cinematic entrance
  useEffect(() => {
    const words = titleRef.current?.querySelectorAll(".word");
    if (!words) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
    .fromTo(words,
      { opacity: 0, y: 70, rotateX: -45, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.07 },
      "-=0.3"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.45"
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    gsap.to(scrollRef.current, {
      y: 8, repeat: -1, yoyo: true, duration: 1,
      ease: "sine.inOut", delay: 2.2,
    });
  }, []);

  const titleWords = title.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em] last:mr-0">
      {word}
    </span>
  ));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020510]"
    >
      {/* ── Aurora keyframes ── */}
      <style>{`
        @keyframes aurora-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(80px,-60px) scale(1.15); }
          66%      { transform: translate(-60px,40px) scale(0.9); }
        }
        @keyframes aurora-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-100px,80px) scale(1.2); }
          75%      { transform: translate(60px,-50px) scale(0.85); }
        }
        @keyframes aurora-3 {
          0%,100% { transform: translate(0,0) scale(1); }
          30%      { transform: translate(120px,60px) scale(0.9); }
          70%      { transform: translate(-80px,-80px) scale(1.1); }
        }
        @keyframes aurora-4 {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          50%      { transform: translate(40px,30px) scale(1.1) rotate(180deg); }
        }
        @keyframes grid-pulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.7; }
        }
      `}</style>

      {/* ── Aurora blobs ── */}
      <div className="absolute inset-0 z-0">
        {/* Blob 1 — blue center-top (dominan) */}
        <div
          className="absolute rounded-full"
          style={{
            width: "900px", height: "700px",
            top: "-200px", left: "50%", marginLeft: "-450px",
            background: "radial-gradient(ellipse at center, rgba(0,102,255,0.28) 0%, rgba(0,60,180,0.12) 50%, transparent 75%)",
            filter: "blur(80px)",
            animation: "aurora-1 28s ease-in-out infinite",
          }}
        />
        {/* Blob 2 — indigo kiri */}
        <div
          className="absolute rounded-full"
          style={{
            width: "700px", height: "600px",
            top: "10%", left: "-10%",
            background: "radial-gradient(ellipse at center, rgba(79,70,229,0.22) 0%, rgba(55,48,163,0.1) 50%, transparent 75%)",
            filter: "blur(90px)",
            animation: "aurora-2 34s ease-in-out infinite",
          }}
        />
        {/* Blob 3 — cyan kanan bawah */}
        <div
          className="absolute rounded-full"
          style={{
            width: "750px", height: "550px",
            bottom: "-100px", right: "-100px",
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.18) 0%, rgba(8,145,178,0.08) 50%, transparent 75%)",
            filter: "blur(100px)",
            animation: "aurora-3 38s ease-in-out infinite",
          }}
        />
        {/* Blob 4 — purple accent tengah */}
        <div
          className="absolute rounded-full"
          style={{
            width: "500px", height: "400px",
            top: "30%", left: "60%",
            background: "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "aurora-4 22s ease-in-out infinite",
          }}
        />
        {/* Blob 5 — glow biru kecil kiri bawah */}
        <div
          className="absolute rounded-full"
          style={{
            width: "400px", height: "300px",
            bottom: "15%", left: "5%",
            background: "radial-gradient(ellipse at center, rgba(0,153,255,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "aurora-2 26s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* ── Dot grid overlay ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "radial-gradient(rgba(147,197,253,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "grid-pulse 6s ease-in-out infinite",
        }}
      />

      {/* ── Vignette / fade edges ── */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(2,5,16,0.7)_100%)]" />

      {/* ── Bottom fade to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-[#020510] to-transparent" />

      {/* ── Content ── */}
      <div
        className="relative z-[2] text-center px-6 max-w-4xl mx-auto"
        style={{ perspective: "1200px" }}
      >
        <span
          ref={badgeRef}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-primary-300 border border-primary-500/25 rounded-full bg-primary-500/8 opacity-0 backdrop-blur-sm"
        >
          {siteName}
        </span>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="bg-gradient-to-r from-white via-white to-primary-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,102,255,0.3)]">
            {titleWords}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          {subtitle}
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,102,255,0.5)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Lihat Portfolio
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-primary-500/40 text-white font-medium rounded-lg transition-all duration-300 bg-white/5 hover:bg-white/8 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <div ref={scrollRef} className="opacity-0 flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">Scroll</span>
          <ArrowDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </section>
  );
}
