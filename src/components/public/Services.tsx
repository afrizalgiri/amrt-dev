"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Code,
  Database,
  Layout,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Code,
  Database,
  Layout,
  Zap,
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Section divider gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary-400 border border-primary-500/20 rounded-full bg-primary-500/5">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Solusi Digital{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              Terbaik
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Kami menyediakan layanan teknologi end-to-end untuk kebutuhan digital
            bisnis Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-glass-border bg-glass backdrop-blur-sm hover:bg-glass-hover hover:border-primary-500/20 transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
