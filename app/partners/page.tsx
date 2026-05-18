"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

type Partner = {
  name: string;
  logo: string;
  description: string;
  website?: string;
};

// Empty arrays (no real partners yet)
const bronzeSponsors: Partner[] = [];
const industrySponsors: Partner[] = [];
const silverSponsors: Partner[] = [];
const goldSponsors: Partner[] = [];

export default function PartnersPage() {
  return (
    <main className="pt-24 bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-zinc-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-zinc-700">Partners & Sponsors</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Partnerships
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
              Partners & Sponsors
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-600">
              Leading partners and sponsors across clean energy, industry,
              infrastructure, and innovation will be announced soon.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* GOLD CTA */}
              <Link
                href="/partners/become-a-partner"
                className="
                  group relative inline-flex items-center gap-2
                  rounded-full px-6 py-3 font-semibold text-[#1f1f1f]

                  bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500
                  shadow-[0_14px_40px_rgba(250,204,21,0.35)]
                  transition-all duration-500 hover:scale-[1.05]
                  hover:shadow-[0_20px_60px_rgba(250,204,21,0.45)]
                "
              >
                Become a Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="
                  group inline-flex items-center gap-2
                  rounded-full border border-zinc-300 bg-white px-6 py-3
                  font-semibold text-zinc-900 shadow-sm
                  transition-all duration-300
                  hover:border-[#02026e]/40 hover:text-[#02026e]
                  hover:shadow-[0_18px_50px_rgba(2,2,110,0.18)]
                  hover:scale-[1.05]
                "
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GOLD */}
      <PartnerSection
        eyebrow="Gold Sponsorship"
        title="Gold Sponsors"
        tone="gold"
      />

      {/* SILVER */}
      <PartnerSection
        eyebrow="Silver Sponsorship"
        title="Silver Sponsors"
        tone="silver"
      />

      {/* INDUSTRY */}
      <PartnerSection
        eyebrow="Industry / Session Sponsorship"
        title="Industry & Session Sponsors"
        tone="industry"
      />

      {/* BRONZE */}
      <PartnerSection
        eyebrow="Bronze Sponsorship"
        title="Bronze Sponsors"
        tone="bronze"
      />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="relative overflow-hidden rounded-[28px] border border-[#02026e]/20 bg-gradient-to-r from-blue-600 via-[#02026e] to-indigo-700 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Partnership Opportunities
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Position your brand within the clean energy conversation
              </h2>
              <p className="mt-3 text-blue-50">
                Join as a sponsor and connect with leaders shaping the energy transition.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/partners/become-a-partner"
                className="rounded-full bg-white px-6 py-3 font-semibold text-[#02026e]"
              >
                Become a Partner
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Contact the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================= */
/* Partner Section Component */
/* ========================= */

function PartnerSection({
  eyebrow,
  title,
  tone,
}: {
  eyebrow: string;
  title: string;
  tone: "gold" | "silver" | "bronze" | "industry";
}) {
  const config = {
    gold: {
      bg: "bg-gradient-to-b from-amber-50 via-yellow-50 to-white",
      border: "border-amber-200",
      badge:
        "text-amber-800 border-amber-300 bg-gradient-to-r from-amber-200/40 to-yellow-200/40",
      glow: "bg-amber-400/10",
    },
    silver: {
      bg: "bg-gradient-to-b from-slate-50 via-gray-50 to-white",
      border: "border-slate-200",
      badge:
        "text-slate-700 border-slate-300 bg-gradient-to-r from-slate-200/40 to-gray-200/40",
      glow: "bg-slate-400/10",
    },
    bronze: {
      bg: "bg-gradient-to-b from-orange-50 via-amber-50 to-white",
      border: "border-orange-200",
      badge:
        "text-orange-800 border-orange-300 bg-gradient-to-r from-orange-200/40 to-yellow-200/40",
      glow: "bg-orange-400/10",
    },
    industry: {
      bg: "bg-gradient-to-b from-blue-50 via-indigo-50 to-white",
      border: "border-blue-200",
      badge:
        "text-[#02026e] border-blue-300 bg-gradient-to-r from-blue-200/40 to-indigo-200/40",
      glow: "bg-[#02026e]/10",
    },
  };

  const theme = config[tone];
  const placeholders = Array.from({ length: 4 });

  return (
    <section className={`relative ${theme.bg}`}>
      {/* subtle glow layer */}
      <div className={`absolute inset-0 opacity-60 ${theme.glow}`} />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${theme.badge}`}
          >
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-bold text-zinc-900">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {placeholders.map((_, i) => (
            <article
              key={i}
              className={`rounded-[24px] border ${theme.border} bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(2,6,23,0.08)]`}
            >
              <div className="flex flex-col items-center gap-4 py-10">
                <div
                  className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.badge}`}
                >
                  {eyebrow}
                </div>

                <h3 className="text-xl font-semibold text-black">
                  To Be Announced
                </h3>

                <p className="max-w-md text-base text-slate-400">
                  Sponsors in this category will be announced soon.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}