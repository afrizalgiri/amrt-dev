"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Zap, Globe, Smartphone } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  siteName: string;
}

// ── Floating code-window illustration ────────────────────────────────────────
function FloatingIllustration() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main code window */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,20,0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,102,255,0.08)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(6,6,14,0.6)",
          }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 text-[11px] text-gray-500 font-mono">app.tsx</span>
          <div className="ml-auto flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400/50 animate-pulse" />
            <span className="text-[10px] text-primary-500/70 font-mono">live</span>
          </div>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-[12px] leading-relaxed space-y-1.5">
          <div>
            <span className="text-primary-400">const</span>{" "}
            <span className="text-green-400">Solution</span>{" "}
            <span className="text-white">= {"{"}</span>
          </div>
          <div className="pl-4">
            <span className="text-yellow-300">type</span>
            <span className="text-gray-400">: </span>
            <span className="text-orange-300">&quot;premium&quot;</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-4">
            <span className="text-yellow-300">stack</span>
            <span className="text-gray-400">: [</span>
            <span className="text-green-300">&quot;Next.js&quot;</span>
            <span className="text-gray-400">,</span>
            <span className="text-green-300"> &quot;React&quot;</span>
            <span className="text-gray-400">],</span>
          </div>
          <div className="pl-4">
            <span className="text-yellow-300">quality</span>
            <span className="text-gray-400">: </span>
            <span className="text-primary-300">100</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="pl-4">
            <span className="text-yellow-300">deliver</span>
            <span className="text-gray-400">: () </span>
            <span className="text-primary-400">=&gt;</span>
            <span className="text-green-300"> &quot;✓ On Time&quot;</span>
          </div>
          <div>
            <span className="text-white">{"}"}</span>
          </div>
          {/* Blinking cursor */}
          <div className="flex items-center gap-1 pt-1">
            <span className="text-primary-500">❯</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary-400 rounded-sm"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        animate={{ y: [-5, 6, -5], x: [-2, 3, -2] }}
        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
        className="absolute -top-5 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-400"
        />
        <span className="text-[11px] font-semibold text-green-300">Deploy sukses</span>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
        className="absolute -bottom-5 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(0,102,255,0.1)",
          border: "1px solid rgba(0,102,255,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Zap className="w-3.5 h-3.5 text-primary-400" />
        <span className="text-[11px] font-semibold text-primary-300">Performance 100</span>
      </motion.div>

      {/* Floating stat — right */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(139,92,246,0.1)",
          border: "1px solid rgba(139,92,246,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Globe className="w-3.5 h-3.5 text-violet-400" />
        <div className="text-[10px]">
          <div className="font-bold text-violet-300 leading-none">50+</div>
          <div className="text-violet-500">Projects</div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const COLORS = [
      [0,   120, 255],
      [60,  160, 255],
      [100, 220, 255],
      [160, 100, 255],
      [255, 255, 255],
    ];

    interface P {
      x: number; y: number; ox: number; oy: number;
      vx: number; vy: number;
      size: number; baseSize: number;
      color: number[]; opacity: number; baseOpacity: number;
      pulse: number; pulseSpeed: number;
      depth: number;
    }

    const COUNT = 120;
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

      if (starTimer % 180 === 0) {
        const idle = stars.find(s => !s.active);
        if (idle) spawnStar(idle);
      }

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
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;
        const pv = Math.sin(p.pulse);
        p.size    = p.baseSize    * (1 + pv * 0.35);
        p.opacity = p.baseOpacity * (0.75 + pv * 0.25);
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
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
        p.ox *= 0.92; p.oy *= 0.92;
        const rx = p.x + p.ox;
        const ry = p.y + p.oy;
        if (p.size > 1.5) {
          const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, p.size * 3);
          glow.addColorStop(0, `rgba(${p.color.join(",")},${p.opacity * 0.5})`);
          glow.addColorStop(1, `rgba(${p.color.join(",")},0)`);
          ctx.beginPath(); ctx.arc(rx, ry, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(",")},${p.opacity})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const qx = q.x + q.ox, qy = q.y + q.oy;
          const ex = rx - qx, ey = ry - qy;
          const ed = ex * ex + ey * ey;
          if (ed < CONNECT_DIST * CONNECT_DIST) {
            const t = 1 - Math.sqrt(ed) / CONNECT_DIST;
            const r = Math.round((p.color[0] + q.color[0]) / 2);
            const g = Math.round((p.color[1] + q.color[1]) / 2);
            const b = Math.round((p.color[2] + q.color[2]) / 2);
            ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(qx, qy);
            ctx.strokeStyle = `rgba(${r},${g},${b},${t * 0.18})`;
            ctx.lineWidth = t * 0.8; ctx.stroke();
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

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />;
}

// ── Hero ─────────────────────────────────────────────────────────────────────
const leftVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export default function Hero({ title, subtitle, siteName }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base bg */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/3 w-[700px] h-[500px] bg-primary-600/8 rounded-full blur-[120px] z-[1] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] z-[1] pointer-events-none" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemLeft}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-primary-300 rounded-full"
                style={{
                  border: "1px solid rgba(0,102,255,0.2)",
                  background: "rgba(0,102,255,0.05)",
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-primary-400"
                />
                {siteName}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemLeft}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-white via-white to-primary-300 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemUp}
              className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemUp} className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,102,255,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Lihat Portfolio
                <ArrowDown className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, borderColor: "rgba(0,102,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl transition-colors duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Hubungi Kami
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemUp}
              className="flex items-center gap-8 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "50+", label: "Proyek Selesai" },
                { value: "30+", label: "Klien Puas" },
                { value: "3+", label: "Tahun Berpengalaman" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: floating illustration ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="hidden lg:flex justify-center items-center pr-10"
          >
            <FloatingIllustration />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-600">Scroll</span>
          <ArrowDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
