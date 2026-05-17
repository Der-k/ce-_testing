"use client";

import Link from "next/link";
import { ArrowRight, Download, Ticket } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { value: "600+", label: "Expected Delegates" },
  { value: "40+", label: "Countries Represented" },
  { value: "120+", label: "Industry Speakers" },
  { value: "2", label: "International Editions" },
];

export function ProgrammeCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;

    const sectionTop = section.offsetTop;

    const onScroll = () => {
      const scrollY = window.scrollY;

      // distance from section start
      const relative = scrollY - sectionTop;

      // reduce intensity
      const translateY = relative * 0.3;

      bg.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.2)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,5,107,0.62), rgba(6,5,107,0.78)), url('/images/c_banner.jpg')",
          }}
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,214,143,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(6,5,107,0.35),transparent_32%)]" />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-white text-6xl font-bold">
            Be Part of the Future of Clean Energy
          </h2>

          <div className="mt-10 flex gap-5">
            <a
              href="/documents/programme.pdf"
              download
              className="bg-[#00d68f] px-6 py-4 rounded-full text-black font-semibold"
            >
              <Download className="inline h-5 w-5 mr-2" />
              Download Programme
            </a>

            <Link
              href="/get-tickets"
              className="bg-[#ff2b36] px-6 py-4 rounded-full text-white font-semibold"
            >
              <Ticket className="inline h-5 w-5 mr-2" />
              Get Tickets
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="relative bg-[#06056b]/95 border-t border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4 py-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-5xl text-[#00e6a0] font-bold">{s.value}</p>
              <p className="text-white/90 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}