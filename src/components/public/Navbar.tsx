"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface NavLink { href: string; label: string; highlight?: boolean; }

interface NavbarProps {
  siteName: string;
  logoUrl?: string;
}

const navLinks = [
  { href: "#services",   label: "Services" },
  { href: "#portfolio",  label: "Portfolio" },
  { href: "/belajar",    label: "Belajar", highlight: true },
  { href: "#contact",    label: "Contact" },
];

export default function Navbar({ siteName, logoUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resolvedLogo = logoUrl && logoUrl !== "" ? logoUrl : "/logo.png";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface-950/80 backdrop-blur-xl border-b border-glass-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
          >
            <Image
              src={resolvedLogo}
              alt={siteName}
              width={32}
              height={32}
              className="rounded-md object-contain"
            />
            <span className="text-primary-400">{siteName.split(".")[0]}</span>
            {siteName.includes(".") && (
              <span className="text-gray-400 -ml-1.5">
                .{siteName.split(".").slice(1).join(".")}
              </span>
            )}
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link: NavLink) => (
              link.highlight ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 hover:text-primary-300 transition-all duration-300"
                >
                  ✨ {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-xl border-b border-glass-border sm:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link: NavLink) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 transition-colors ${link.highlight ? "text-primary-400 font-medium" : "text-gray-400 hover:text-white"}`}
                >
                  {link.highlight ? `✨ ${link.label}` : link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
