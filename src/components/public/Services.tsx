"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, Smartphone, Palette, TrendingUp,
  Code, Database, Layout, Zap, type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service { title: string; description: string; icon: string; }
interface ServicesProps { services: Service[]; }

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, TrendingUp,
  Code, Database, Layout, Zap,
};

export default function Services({ services }: ServicesProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Badge pop-in
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(2)",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        }
      );

      // Heading blur-slide reveal
      gsap.fromTo(headingRef.current?.querySelectorAll("h2, p") ?? [],
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.75, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Cards: blur + y stagger
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 55, scale: 0.93, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            duration: 0.7, stagger: 0.09, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
          }
        );
      }

      // Magnetic tilt per card
      cardsRef.current?.querySelectorAll(".service-card").forEach((card) => {
        const el = card as HTMLElement;
        const icon = el.querySelector(".card-icon") as HTMLElement | null;

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
          const y = ((e.clientY - r.top)  / r.height - 0.5) * 16;
          gsap.to(el,   { x, y, rotateX: -y * 0.6, rotateY: x * 0.6, duration: 0.35, ease: "power2.out" });
          gsap.to(icon, { x: x * 0.4, y: y * 0.4, duration: 0.35, ease: "power2.out" });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el,   { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
          gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span
            ref={badgeRef}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5 opacity-0"
          >
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 opacity-0">
            Solusi Digital{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Terbaik
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto opacity-0">
            Kami menyediakan layanan teknologi end-to-end untuk kebutuhan digital bisnis Anda.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.title}
                className="service-card group relative p-6 rounded-2xl border border-glass-border bg-glass backdrop-blur-sm hover:bg-glass-hover hover:border-primary-500/25 transition-colors duration-300 opacity-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative z-10">
                  <div
                    className="card-icon w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.2)] transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-100 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
