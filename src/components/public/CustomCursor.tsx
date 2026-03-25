"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.style.cursor = "none";
    gsap.set([dot, trail], { xPercent: -50, yPercent: -50, opacity: 0 });

    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    let rafId: number;
    let visible = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      tx = lerp(tx, mx, 0.14);
      ty = lerp(ty, my, 0.14);
      gsap.set(trail, { x: tx, y: ty });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
      if (!visible) {
        visible = true;
        gsap.to([dot, trail], { opacity: 1, duration: 0.3 });
      }
    };

    const onEnter = () => {
      gsap.to(dot,   { scale: 3.5, backgroundColor: "rgba(99,153,255,0.25)", duration: 0.25, ease: "power2.out" });
      gsap.to(trail, { scale: 0.4, opacity: 0.3,  duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(dot,   { scale: 1, backgroundColor: "rgb(99,153,255)", duration: 0.25, ease: "power2.out" });
      gsap.to(trail, { scale: 1, opacity: 0.5, duration: 0.3 });
    };
    const onDown = () => {
      gsap.to(dot,   { scale: 0.7, duration: 0.1 });
      gsap.to(trail, { scale: 1.4, duration: 0.15, ease: "power3.out" });
    };
    const onUp = () => {
      gsap.to(dot,   { scale: 1, duration: 0.2, ease: "elastic.out(1,0.4)" });
      gsap.to(trail, { scale: 1, duration: 0.25, ease: "elastic.out(1,0.4)" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

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
      window.removeEventListener("mouseup",   onUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot utama — ikut instan */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full pointer-events-none z-[9999] [@media(pointer:coarse)]:hidden"
        style={{ backgroundColor: "rgb(99,153,255)", willChange: "transform" }}
      />
      {/* Trail — lag sedikit, lebih kecil & transparan */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9998] [@media(pointer:coarse)]:hidden"
        style={{ border: "1.5px solid rgba(99,153,255,0.5)", willChange: "transform" }}
      />
    </>
  );
}
