"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only once per session
    try {
      const shown = sessionStorage.getItem("amrt_splash");
      if (!shown) {
        setVisible(true);
        sessionStorage.setItem("amrt_splash", "1");
        setTimeout(() => setVisible(false), 2800);
      }
    } catch {
      // sessionStorage might be unavailable (private mode etc)
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #0e0733 0%, #07080e 60%, #030712 100%)",
          }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="w-[600px] h-[400px] rounded-full bg-primary-600/12 blur-[100px]" />
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "rgba(0,102,255,0.12)",
              border: "1px solid rgba(0,102,255,0.3)",
              boxShadow: "0 0 32px rgba(0,102,255,0.15)",
            }}
          >
            <Zap className="w-8 h-8 text-primary-400" />
          </motion.div>

          {/* "Welcome to" label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: "easeOut" }}
            className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-3"
          >
            Welcome to
          </motion.p>

          {/* Domain name */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="text-primary-400">AMRT</span>
              <span className="text-gray-500">.dev</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="mt-4 text-xs text-gray-600 tracking-widest"
          >
            Digital Agency Indonesia
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, #0066ff, #4d94ff, #0066ff)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
