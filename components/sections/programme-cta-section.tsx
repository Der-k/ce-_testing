"use client";

import Link from "next/link";
import { ArrowRight, Download, Ticket } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  {
    value: "600+",
    label: "Expected Delegates",
  },
  {
    value: "40+",
    label: "Countries Represented",
  },
  {
    value: "120+",
    label: "Industry Speakers",
  },
  {
    value: "2",
    label: "International Editions",
  },
];

export function ProgrammeCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;

    let frame = 0;

    const animate = () => {
      const rect = section.getBoundingClientRect();

      // slower than scroll = parallax
      const offset = rect.top * -0.38;

      bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
//                                                          ^^^^ was 1.15

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
  {/* PARALLAX BACKGROUND */}
<div
  ref={bgRef}
  className="absolute -top-40 -bottom-40 left-0 right-0 will-change-transform"
>
  <video
    autoPlay
    muted
    loop
    playsInline
    poster="/images/c_banner.jpg"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      display: "block",
    }}
    src="/videos/c_banner.mp4"
  />
</div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-[760px] items-center px-4 py-32 sm:px-6 lg:px-12">
        <div
  className="
    w-full
    max-w-[820px]
    rounded-[36px]
    border border-white/15
    bg-black/20
    p-8
    sm:p-12
    backdrop-blur-xl
    shadow-[0_25px_80px_rgba(0,0,0,0.35)]
  "
>
          {/* TAG */}
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/16 px-5 py-2 backdrop-blur-md">
            <span className="text-base font-semibold uppercase tracking-[0.22em] text-white">
              2026 Conference Experience
            </span>
          </div>

          {/* HEADING */}
          <h2 className="mt-8 text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Be Part of the Future of Clean Energy
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/95 sm:text-2xl">
            Join policymakers, investors, utilities, mining leaders,
            infrastructure developers, innovators, and climate stakeholders as
            Africa and Australia connect around renewable energy, critical
            minerals, and sustainable industrial growth.
          </p>

          {/* EVENT PILLS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-full border border-white/25 bg-white/16 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              Kigali • 6–7 August 2026
            </div>

            <div className="rounded-full border border-white/25 bg-white/16 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              Perth • 31 Aug – 1 Sept 2026
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="/documents/programme.pdf"
              download
              className="group inline-flex items-center gap-3 rounded-full bg-[#00d68f] px-8 py-5 text-xl font-semibold text-[#021226] shadow-[0_20px_60px_rgba(0,214,143,0.45)] transition duration-300 hover:scale-[1.03] hover:bg-[#19f5aa]"
            >
              <Download className="h-5 w-5" />
              Download Programme
            </a>

            <Link
              href="/get-tickets"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff2b36] px-8 py-5 text-xl font-semibold text-white shadow-[0_20px_60px_rgba(255,43,54,0.42)] transition duration-300 hover:scale-[1.03] hover:bg-[#ff4b55]"
            >
              <Ticket className="h-5 w-5" />
              Get Tickets
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="relative z-10 border-t border-white/10 bg-[#06056b]/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold tracking-tight text-[#00e6a0] sm:text-6xl">
                {stat.value}
              </p>

              <p className="mt-3 text-base font-medium leading-7 text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}