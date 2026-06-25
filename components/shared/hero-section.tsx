"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, ArrowRight, Users, Globe, Mic, Building2 } from "lucide-react";

const injectStyles = (() => {
  let done = false;
  return () => {
    if (done || typeof document === "undefined") return;
    done = true;
    const el = document.createElement("style");
    el.textContent = [
      "@keyframes ctaPulseGlow{0%,100%{box-shadow:0 12px 35px rgba(2,2,110,.55)}50%{box-shadow:0 18px 55px rgba(17,64,196,.75)}}",
      "@keyframes ctaGoldPulse{0%,100%{box-shadow:0 12px 35px rgba(250,210,2,.45)}50%{box-shadow:0 20px 60px rgba(250,210,2,.65)}}",
    ].join("");
    document.head.appendChild(el);
  };
})();

type TextSlide = {
  kind: "text";
  src: string;
  alt: string;
  headline: string;
  sub: string;
  cta: { label: string; href: string };
};

type CardsSlide = {
  kind: "cards";
  src: string;
  alt: string;
  headline: string;
  sub: string;
  editions: { name: string; date: string; venue: string; country: string; href: string; color: string }[];
  buttons: { label: string; href: string; style: "primary" | "outline" | "gold" }[];
};

type Slide = TextSlide | CardsSlide;

const slides: Slide[] = [
  {
    kind: "text",
    src: "/images/hero-carousel-1.jpeg",
    alt: "Delegates networking",
    headline: "Clean Energy\nConference 2026",
    sub: "Kigali & Perth editions bringing together policymakers, investors, and industry leaders to accelerate clean energy transition.",
    cta: { label: "Register Now", href: "/get-tickets" },
  },
  {
    kind: "cards",
    src: "/images/hero-carousel-2.jpeg",
    alt: "Panel session",
    headline: "Two Editions.\nOne Mission.",
    sub: "Choose your destination and be part of Africa and Australia's leading clean energy event.",
    editions: [
      { name: "Kigali Edition", date: "6–7 August 2026", venue: "Kigali Marriott Hotel, Rwanda", country: "RWA", href: "/conference?edition=kigali", color: "#a5b4fc" },
      { name: "Perth Edition", date: "31 Aug – 1 Sept 2026", venue: "Novotel Hotel Perth, Australia", country: "AUS", href: "/conference?edition=perth", color: "#6ee7b7" },
    ],
    buttons: [
      { label: "Register Now", href: "/get-tickets", style: "primary" },
      { label: "View Programme", href: "/event/programme", style: "outline" },
      { label: "Become a Partner", href: "/partners/become-a-partner", style: "gold" },
    ],
  },
  {
    kind: "text",
    src: "/images/hero-carousel-3.jpeg",
    alt: "Audience keynote",
    headline: "Solar, Geothermal\n& Clean Mining",
    sub: "Three focused tracks covering the sectors driving Africa and Australia's energy future.",
    cta: { label: "View Programme", href: "/event/programme" },
  },
  {
    kind: "text",
    src: "/images/hero-carousel-4.jpeg",
    alt: "Exhibition area",
    headline: "80+ Speakers\n40+ Countries",
    sub: "World-class keynotes, panel debates and executive dialogues shaping the clean energy agenda.",
    cta: { label: "See Speakers", href: "/speakers" },
  },
  {
    kind: "text",
    src: "/images/hero-carousel-5.jpeg",
    alt: "Speaker presentation",
    headline: "Unrivalled\nNetworking",
    sub: "Two days of high-level meetings, deal-making sessions and networking events across both editions.",
    cta: { label: "Register Now", href: "/get-tickets" },
  },
  {
    kind: "text",
    src: "/images/hero-carousel-6.jpeg",
    alt: "Networking event",
    headline: "Become a\nConference Partner",
    sub: "Align your brand with Africa and Australia's most important clean energy gathering of 2026.",
    cta: { label: "Partner With Us", href: "/partners/become-a-partner" },
  },
  {
    kind: "text",
    src: "/images/hero-carousel-7.jpeg",
    alt: "Conference hall",
    headline: "Africa × Australia\nEnergy Collaboration",
    sub: "Building bridges between two continents to accelerate the global clean energy transition.",
    cta: { label: "Learn More", href: "/about" },
  },
  {
    kind: "text",
    src: "/images/hero-carousel-8.jpeg",
    alt: "Energy discussion",
    headline: "2,000+ Delegates\nExpected in 2026",
    sub: "Join government ministers, CEOs, and investors from across the clean energy value chain.",
    cta: { label: "Register Now", href: "/get-tickets" },
  },
];

const stats = [
  { icon: Users,     value: "2,000+", label: "Delegates",  href: "/about" },
  { icon: Globe,     value: "40+",    label: "Countries",  href: "/about" },
  { icon: Mic,       value: "80+",    label: "Speakers",   href: "/speakers" },
  { icon: Building2, value: "2",      label: "Host Cities",href: "/conference" },
];

const quickLinks = [
  { label: "Register",         href: "/get-tickets" },
  { label: "Programme",        href: "/event/programme" },
  { label: "Speakers",         href: "/speakers" },
  { label: "Become a Partner", href: "/partners/become-a-partner" },
  { label: "Kigali Edition",   href: "/conference?edition=kigali" },
  { label: "Perth Edition",    href: "/conference?edition=perth" },
];

const INTERVAL = 6000;

function CardsContent({ slide }: { slide: CardsSlide }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-center"
      style={{ paddingLeft: "clamp(48px,6vw,90px)", paddingRight: "clamp(48px,6vw,90px)" }}
    >
      <h1 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", lineHeight: 1.08, whiteSpace: "pre-line" }}>
        {slide.headline}
      </h1>
      <p className="mt-1.5 text-white/75 max-w-sm" style={{ fontSize: "clamp(0.75rem,1vw,0.88rem)" }}>
        {slide.sub}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {slide.editions.map((ed) => (
          <Link key={ed.name} href={ed.href}
            className="group flex flex-col rounded-xl border border-white/25 backdrop-blur-sm px-4 py-3 min-w-[170px] transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "rgba(255,255,255,0.10)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ed.color }}>
                {ed.name.replace(" Edition", "")}
              </span>
              <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.40)" }}>{ed.country}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
              <CalendarDays className="h-3 w-3 shrink-0" style={{ color: "rgba(255,255,255,0.45)" }} />
              {ed.date}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.50)" }}>
              <MapPin className="h-3 w-3 shrink-0" />
              {ed.venue.split(",")[0]}
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold transition-colors" style={{ color: "rgba(255,255,255,0.50)" }}>
              Details <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {slide.buttons.map((btn) => {
          if (btn.style === "primary") return (
            <Link key={btn.label} href={btn.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-95"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaPulseGlow 2s ease infinite"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; }}
            >
              <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
          if (btn.style === "gold") return (
            <Link key={btn.label} href={btn.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a1200] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg,#d4af00,#fad202)", boxShadow: "0 6px 20px rgba(250,210,2,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaGoldPulse 2s ease infinite"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(250,210,2,0.35)"; }}
            >
              <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/30 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
          return (
            <Link key={btn.label} href={btn.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.10)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
            >
              <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/15 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TextContent({ slide }: { slide: TextSlide }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-center"
      style={{ paddingLeft: "clamp(48px,6vw,90px)", paddingRight: "clamp(80px,18vw,260px)" }}
    >
      <h1 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.8rem,4vw,3.4rem)", lineHeight: 1.08, whiteSpace: "pre-line" }}>
        {slide.headline}
      </h1>
      <p className="mt-3 leading-snug max-w-sm" style={{ fontSize: "clamp(0.78rem,1.1vw,0.95rem)", color: "rgba(255,255,255,0.85)" }}>
        {slide.sub}
      </p>
      <div className="mt-5">
        <a
          href={slide.cta.href}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-95"
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaPulseGlow 2s ease infinite"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; }}
        >
          <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
          <span className="relative z-10">{slide.cta.label}</span>
          <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [current, setCurrent]         = useState(0);
  const [prev, setPrev]               = useState<number | null>(null);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => { injectStyles(); }, []);

  const go = (next: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setPrev(current);
      setCurrent(next);
      setTimeout(() => setTextVisible(true), 120);
      setTimeout(() => setPrev(null), 1000);
    }, 300);
  };

  const goNext = () => go((current + 1) % slides.length);
  const goPrev = () => go((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(goNext, INTERVAL);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <div style={{ background: "#ffffff", isolation: "isolate" }}>

      {/* ── CAROUSEL ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(480px,60vw,720px)" }}>

        {slides.map((s, i) => (
          <div key={s.src} className="absolute inset-0" style={{ zIndex: i === current ? 2 : i === prev ? 1 : 0, opacity: i === current ? 1 : 0, transition: "opacity 1s ease" }}>
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}

        {/* dark maroon overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "rgba(40,4,4,0.62)" }} />

        {/* bottom fade for dots */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-20 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.45),transparent)" }} />

        {/* Left arrow */}
        <button onClick={goPrev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-transparent text-white hover:bg-white/15 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button onClick={goNext} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-transparent text-white hover:bg-white/15 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Animated text */}
        <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.35s ease, transform 0.35s ease", position: "absolute", inset: 0, zIndex: 20 }}>
          {slide.kind === "cards" ? <CardsContent slide={slide} /> : <TextContent slide={slide} />}
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 z-30 flex items-center gap-2" style={{ left: "clamp(48px,6vw,90px)" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
              style={{ width: i === current ? "22px" : "7px", height: "7px", borderRadius: "4px", background: i === current ? "white" : "rgba(255,255,255,0.35)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease" }}
            />
          ))}
        </div>
      </section>

      {/* ── INFO BAR — pure white ── */}
      <div style={{ background: "#ffffff", borderTop: "1px solid #f1f5f9", position: "relative", zIndex: 10, isolation: "isolate" }}>

        {/* Stats */}
        <div style={{ borderBottom: "1px solid #f1f5f9", background: "#ffffff" }}>
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderLeft: "1px solid #f1f5f9" }}>
              {stats.map(({ icon: Icon, value, label, href }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-3 px-6 py-5 transition-colors"
                  style={{ borderRight: "1px solid #f1f5f9" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(2,2,110,0.07)" }}>
                    <Icon className="h-4 w-4" style={{ color: "#02026e" }} />
                  </div>
                  <div>
                    <div className="font-extrabold leading-none tracking-tight" style={{ fontSize: "1.25rem", color: "#02026e" }}>
                      {value}
                    </div>
                    <div className="mt-0.5 font-semibold uppercase" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#94a3b8" }}>
                      {label}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16" style={{ background: "#ffffff" }}>
          <div className="flex flex-wrap items-center gap-x-1 py-3">
            {quickLinks.map((link, i) => (
              <span key={link.label} className="flex items-center">
                <Link href={link.href}
                  className="px-3 py-1.5 font-semibold uppercase whitespace-nowrap transition-colors duration-150"
                  style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#94a3b8" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#02026e"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                >
                  {link.label}
                </Link>
                {i < quickLinks.length - 1 && <span style={{ color: "#e2e8f0", fontSize: "10px" }}>·</span>}
              </span>
            ))}

            <div style={{ marginLeft: "auto" }}>
              <a href="/get-tickets"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full font-bold uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "#02026e", color: "#ffffff", padding: "6px 20px", fontSize: "11px", letterSpacing: "0.16em" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(2,2,110,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-[left] duration-700 group-hover:left-[120%]" />
                <span className="relative z-10">Register Now</span>
                <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}