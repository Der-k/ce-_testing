"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SvgTestSection() {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/images/hero-1.svg")
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <section className="relative py-32 bg-white overflow-hidden flex items-center justify-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full" />

      {/* SVG */}
      <motion.div
        className="relative z-10 w-[420px] h-[420px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.2,
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          },
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* TEXT */}
      <div className="absolute bottom-10 text-center">
        <h2 className="text-2xl font-bold text-[#02026e]">
          Animated SVG Test
        </h2>

        <p className="text-sm text-black/60">
          Loaded from /images/hero-1.svg
        </p>
      </div>

    </section>
  );
}