"use client";

import { useEffect } from "react";

// Cursor: pakai CSS cursor custom SVG — clean, sharp, standar
export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Custom CSS cursor — arrow pointer yang lebih clean & sharp
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      body { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const el = document.createElement("div");
    el.id = "cc";
    el.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 12px; height: 12px;
      border: 1.5px solid rgba(147,197,253,0.9);
      border-radius: 2px;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%,-50%);
      transition: width .15s, height .15s, background .15s, border-color .15s, border-radius .15s;
      will-change: transform;
    `;
    document.body.appendChild(el);

    let x = 0, y = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      el.style.left = x + "px";
      el.style.top  = y + "px";
    };

    const onEnter = () => {
      el.style.width  = "32px";
      el.style.height = "32px";
      el.style.borderRadius = "50%";
      el.style.background = "rgba(99,153,255,0.1)";
      el.style.borderColor = "rgba(99,153,255,0.7)";
    };
    const onLeave = () => {
      el.style.width  = "12px";
      el.style.height = "12px";
      el.style.borderRadius = "2px";
      el.style.background = "transparent";
      el.style.borderColor = "rgba(147,197,253,0.9)";
    };
    const onDown = () => {
      el.style.width  = "8px";
      el.style.height = "8px";
      el.style.background = "rgba(99,153,255,0.3)";
    };
    const onUp = () => {
      el.style.width  = "12px";
      el.style.height = "12px";
      el.style.background = "transparent";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const els = document.querySelectorAll("a, button, [role='button']");
    els.forEach(e => {
      e.addEventListener("mouseenter", onEnter);
      e.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.head.removeChild(style);
      document.body.removeChild(el);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      els.forEach(e => {
        e.removeEventListener("mouseenter", onEnter);
        e.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}
