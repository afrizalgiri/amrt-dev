"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.style.cursor = "none";
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    // RAF loop dengan lerp — jauh lebih responsif dari GSAP tween
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isBig = target.matches("a[href], button");
      gsap.to(ring, {
        scale: isBig ? 2.0 : 1.5,
        borderColor: "rgba(99,153,255,0.9)",
        backgroundColor: "rgba(0,102,255,0.06)",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.4, opacity: 0.5, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(99,153,255,0.6)",
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.12, ease: "power3.out" });
      gsap.to(dot, { scale: 1.5, duration: 0.1 });
    };
    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "elastic.out(1,0.5)" });
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-primary-400 rounded-full pointer-events-none z-[9999] [@media(pointer:coarse)]:hidden"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-primary-400/60 [@media(pointer:coarse)]:hidden"
      />
    </>
  );
}
