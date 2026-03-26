"use client";

import { motion, type Variants } from "framer-motion";
import {
  Globe, Smartphone, Palette, TrendingUp,
  Code, Database, Layout, Zap, type LucideIcon,
} from "lucide-react";

interface Service { title: string; description: string; icon: string; }
interface ServicesProps { services: Service[]; }

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, TrendingUp,
  Code, Database, Layout, Zap,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden:  { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5"
          >
            Layanan Kami
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white mt-4"
          >
            Solusi Digital{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Terbaik
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto"
          >
            Kami menyediakan layanan teknologi end-to-end untuk kebutuhan digital bisnis Anda.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.title}
                variants={cardVariant}
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-6 rounded-2xl cursor-pointer"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onHoverStart={e => {
                  (e.target as HTMLElement).closest?.(".hover-card") as HTMLElement;
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                {/* Hover glow border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: "0 0 0 1px rgba(0,102,255,0.35), 0 8px 32px rgba(0,102,255,0.12)",
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.2)] transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-primary-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-100 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
