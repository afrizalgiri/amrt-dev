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
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  // ── Particle field ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let W = 0, H = 0;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    // Particle types
    const COLORS = [
      [0,   120, 255],  // blue
      [60,  160, 255],  // sky blue
      [100, 220, 255],  // cyan
      [160, 100, 255],  // purple
      [255, 255, 255],  // white (rare)
    ];

    interface P {
      x: number; y: number; ox: number; oy: number;
      vx: number; vy: number;
      size: number; baseSize: number;
      color: number[]; opacity: number; baseOpacity: number;
      pulse: number; pulseSpeed: number;
      depth: number; // 0-1, affects speed & size
    }

    const COUNT = 130;
    const particles: P[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random();
      const col   = COLORS[Math.floor(Math.random() * (Math.random() < 0.05 ? COLORS.length : COLORS.length - 1))];
      const bSize = (0.6 + depth * 2.4) * (Math.random() * 0.8 + 0.6);
      const bOpa  = 0.15 + depth * 0.65;
      return {
        x: Math.random() * W, y: Math.random() * H,
        ox: 0, oy: 0,
        vx: (Math.random() - 0.5) * (0.15 + depth * 0.35),
        vy: (Math.random() - 0.5) * (0.15 + depth * 0.35),
        size: bSize, baseSize: bSize,
        color: col, opacity: bOpa, baseOpacity: bOpa,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.018,
        depth,
      };
    });

    // Shooting stars
    interface Star { x: number; y: number; len: number; speed: number; opacity: number; active: boolean; angle: number; }
    const stars: Star[] = Array.from({ length: 6 }, () => ({
      x: 0, y: 0, len: 0, speed: 0, opacity: 0, active: false, angle: 0,
    }));
    let starTimer = 0;

    const spawnStar = (s: Star) => {
      s.x = Math.random() * W;
      s.y = Math.random() * H * 0.6;
      s.len = 60 + Math.random() * 120;
      s.speed = 8 + Math.random() * 12;
      s.opacity = 0.6 + Math.random() * 0.4;
      s.angle = (Math.PI / 6) + Math.random() * (Math.PI / 8);
      s.active = true;
    };

    const MOUSE_RADIUS = 120;
    const MOUSE_FORCE  = 60;
    const CONNECT_DIST = 140;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      starTimer++;

      // Spawn shooting star randomly
      if (starTimer % 180 === 0) {
        const idle = stars.find(s => !s.active);
        if (idle) spawnStar(idle);
      }

      // Draw shooting stars
      for (const s of stars) {
        if (!s.active) continue;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.012;
        if (s.opacity <= 0 || s.x > W + 200 || s.y > H + 100) { s.active = false; continue; }

        const tx = s.x - Math.cos(s.angle) * s.len;
        const ty = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(200,230,255,0)`);
        grad.addColorStop(1, `rgba(200,230,255,${s.opacity})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse
        p.pulse += p.pulseSpeed;
        const pv = Math.sin(p.pulse);
        p.size    = p.baseSize    * (1 + pv * 0.35);
        p.opacity = p.baseOpacity * (0.75 + pv * 0.25);

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(d2) || 1;
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.ox += (dx / dist) * force * 0.04;
          p.oy += (dy / dist) * force * 0.04;
          p.opacity = Math.min(1, p.baseOpacity * 2.5);
          p.size    = p.baseSize * 1.8;
        }

        // Decay offset
        p.ox *= 0.92;
        p.oy *= 0.92;

        const rx = p.x + p.ox;
        const ry = p.y + p.oy;

        // Glow
        if (p.size > 1.5) {
          const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, p.size * 3);
          glow.addColorStop(0, `rgba(${p.color.join(",")},${p.opacity * 0.5})`);
          glow.addColorStop(1, `rgba(${p.color.join(",")},0)`);
          ctx.beginPath();
          ctx.arc(rx, ry, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(",")},${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const qx = q.x + q.ox;
          const qy = q.y + q.oy;
          const ex = rx - qx;
          const ey = ry - qy;
          const ed = ex * ex + ey * ey;
          if (ed < CONNECT_DIST * CONNECT_DIST) {
            const t = 1 - Math.sqrt(ed) / CONNECT_DIST;
            // Color blends between two particle colors
            const r = Math.round((p.color[0] + q.color[0]) / 2);
            const g = Math.round((p.color[1] + q.color[1]) / 2);
            const b = Math.round((p.color[2] + q.color[2]) / 2);
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(qx, qy);
            ctx.strokeStyle = `rgba(${r},${g},${b},${t * 0.18})`;
            ctx.lineWidth = t * 0.8;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── GSAP entrance ───────────────────────────────────────────────────────────
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
    <span key={i} className="word inline-block mr-[0.25em] last:mr-0">{word}</span>
  ));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base bg */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Subtle radial glow center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-600/8 rounded-full blur-[120px] z-[1] pointer-events-none" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-4xl mx-auto" style={{ perspective: "1200px" }}>
        <span
          ref={badgeRef}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-primary-300 border border-primary-500/20 rounded-full bg-primary-500/5 opacity-0"
        >
          {siteName}
        </span>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="bg-gradient-to-r from-white via-white to-primary-300 bg-clip-text text-transparent">
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
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Lihat Portfolio
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-glass-border hover:border-primary-500/30 text-white font-medium rounded-lg transition-all duration-300 bg-glass hover:bg-glass-hover hover:scale-[1.03] active:scale-[0.98]"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <div ref={scrollRef} className="opacity-0 flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">Scroll</span>
          <ArrowDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </section>
  );
}
