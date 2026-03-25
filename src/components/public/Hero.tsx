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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number; y: number; size: number;
      speedX: number; speedY: number; opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${p.opacity})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

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

    // Scroll bounce loop
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-surface-950 to-surface-950" />
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] z-[1]" />

      <div
        className="relative z-[2] text-center px-6 max-w-4xl mx-auto"
        style={{ perspective: "1200px" }}
      >
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <div ref={scrollRef} className="opacity-0">
          <ArrowDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </section>
  );
}
