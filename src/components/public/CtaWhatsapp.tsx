"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";

interface CtaWhatsappProps {
  whatsappNumber: string;
  siteName: string;
}

export default function CtaWhatsapp({
  whatsappNumber,
  siteName,
}: CtaWhatsappProps) {
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Halo ${siteName}, saya tertarik dengan layanan Anda.`
  )}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5">
            Mulai Proyek
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Siap Membangun{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Sesuatu yang Luar Biasa?
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Diskusikan proyek Anda dengan tim kami. Kami siap membantu
            mewujudkan visi digital Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]"
          >
            <MessageCircle className="w-6 h-6" />
            Hubungi via WhatsApp
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative mt-24 pt-8 border-t border-glass-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            Crafted with precision by{" "}
            <span className="text-primary-400 font-medium">{siteName}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
