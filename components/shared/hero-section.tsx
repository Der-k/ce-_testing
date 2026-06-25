"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { CalendarDays, MapPin, ArrowRight, Users, Globe, Mic, Building2 } from "lucide-react";

// ── Keyframe injection ────────────────────────────────────────────────────────
const injectStyles = (() => {
  let done = false;
  return () => {
    if (done || typeof document === "undefined") return;
    done = true;
    const el = document.createElement("style");
    el.textContent = `
      @keyframes ctaPulseGlow{0%,100%{box-shadow:0 12px 35px rgba(2,2,110,.55)}50%{box-shadow:0 18px 55px rgba(17,64,196,.75)}}
      @keyframes ctaGoldPulse{0%,100%{box-shadow:0 12px 35px rgba(250,210,2,.45)}50%{box-shadow:0 20px 60px rgba(250,210,2,.65)}}
      @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg)}100%{transform:translateX(200%) skewX(-15deg)}}
      @keyframes tickIn{0%{transform:translateY(-100%);opacity:0}100%{transform:translateY(0);opacity:1}}
      @keyframes slideUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
      @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(250,210,2,0.6)}70%{box-shadow:0 0 0 10px rgba(250,210,2,0)}100%{box-shadow:0 0 0 0 rgba(250,210,2,0)}}
      @keyframes scanline{0%{top:-10%}100%{top:110%}}
      .stat-num{animation:slideUp 0.5s ease both}
      .cta-shimmer:hover::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.25) 50%,transparent 60%);animation:shimmer 0.7s ease}
      @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
    `;
    document.head.appendChild(el);
  };
})();

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── Data ──────────────────────────────────────────────────────────────────────
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
  { icon: Users,     value: "2,000+", label: "Delegates",   href: "/about" },
  { icon: Globe,     value: "40+",    label: "Countries",   href: "/about" },
  { icon: Mic,       value: "80+",    label: "Speakers",    href: "/speakers" },
  { icon: Building2, value: "2",      label: "Host Cities", href: "/conference" },
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
// Target: Kigali edition, 6 August 2026
const TARGET_DATE = new Date("2026-08-06T08:00:00Z");

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ── Announcement bar ──────────────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center gap-3 py-2 px-4 text-center"
      style={{ background: "linear-gradient(90deg,#02026e,#1140c4,#02026e)", minHeight: "36px" }}
    >
      {/* moving shimmer */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.08) 50%,transparent 60%)", animation: "shimmer 3s ease infinite" }} />
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fad202", display: "inline-block", flexShrink: 0, animation: "pulseRing 1.8s ease infinite" }} />
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.92)", textTransform: "uppercase" }}>
        Early‑bird registration open&nbsp;·&nbsp;Kigali 6–7 Aug&nbsp;·&nbsp;Perth 31 Aug – 1 Sep 2026
      </p>
      <Link href="/get-tickets"
        className="shrink-0 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
        style={{ background: "#fad202", color: "#0a0800", letterSpacing: "0.14em" }}
      >
        Register
      </Link>
    </div>
  );
}

// ── Countdown unit ────────────────────────────────────────────────────────────
function CountUnit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center" style={{ minWidth: "44px" }}>
      <div
        style={{
          fontVariantNumeric: "tabular-nums",
          fontSize: "clamp(1.4rem,3vw,2.2rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          textShadow: "0 2px 20px rgba(250,210,2,0.4)",
        }}
      >
        {padded}
      </div>
      <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
        {label}
      </div>
    </div>
  );
}

function CountdownSeparator() {
  return <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", lineHeight: 1, marginBottom: "12px" }}>:</span>;
}

// ── Slide content: Cards ──────────────────────────────────────────────────────
function CardsContent({ slide }: { slide: CardsSlide }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-center"
      style={{ paddingLeft: "clamp(48px,6vw,90px)", paddingRight: "clamp(48px,6vw,90px)" }}
    >
      {/* eyebrow */}
      <div className="flex items-center gap-2 mb-3">
        <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#fad202" }} />
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", color: "#fad202", textTransform: "uppercase" }}>
          2026 Editions
        </span>
      </div>

      <h1 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", lineHeight: 1.08, whiteSpace: "pre-line" }}>
        {slide.headline}
      </h1>
      <p className="mt-1.5 text-white/75 max-w-sm" style={{ fontSize: "clamp(0.75rem,1vw,0.88rem)" }}>
        {slide.sub}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {slide.editions.map((ed) => (
          <Link key={ed.name} href={ed.href}
            className="group flex flex-col rounded-xl backdrop-blur-sm px-4 py-3 transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", minWidth: "170px" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            {/* colored top accent */}
            <div style={{ position: "absolute", top: 0, left: "16px", right: "16px", height: "2px", background: ed.color, borderRadius: "0 0 2px 2px", opacity: 0.7 }} />
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ed.color }}>
                {ed.name.replace(" Edition", "")}
              </span>
              <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{ed.country}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
              <CalendarDays className="h-3 w-3 shrink-0" style={{ color: "rgba(255,255,255,0.45)" }} />
              {ed.date}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              <MapPin className="h-3 w-3 shrink-0" />
              {ed.venue.split(",")[0]}
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold" style={{ color: ed.color }}>
              Details <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {slide.buttons.map((btn) => {
          if (btn.style === "primary") return (
            <Link key={btn.label} href={btn.href}
              className="cta-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontSize: "11px", padding: "9px 22px", background: "linear-gradient(135deg,#02026e,#1140c4)", boxShadow: "0 4px 20px rgba(2,2,110,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaPulseGlow 2s ease infinite"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; }}
            >
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
          if (btn.style === "gold") return (
            <Link key={btn.label} href={btn.href}
              className="cta-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ fontSize: "11px", padding: "9px 22px", background: "linear-gradient(135deg,#d4af00,#fad202)", color: "#1a1200", boxShadow: "0 6px 20px rgba(250,210,2,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaGoldPulse 2s ease infinite"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(250,210,2,0.35)"; }}
            >
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
          return (
            <Link key={btn.label} href={btn.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ fontSize: "11px", padding: "9px 22px", background: "rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
            >
              <span className="relative z-10">{btn.label}</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Slide content: Text ───────────────────────────────────────────────────────
function TextContent({ slide, countdown }: { slide: TextSlide; countdown: ReturnType<typeof useCountdown> }) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-center"
      style={{ paddingLeft: "clamp(48px,6vw,90px)", paddingRight: "clamp(80px,18vw,260px)" }}
    >
      {/* eyebrow line */}
      <div className="flex items-center gap-2 mb-4">
        <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#fad202" }} />
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", color: "#fad202", textTransform: "uppercase" }}>
          Africa · Australia · 2026
        </span>
      </div>

      <h1
        className="font-heading font-bold text-white"
        style={{ fontSize: "clamp(1.8rem,4vw,3.8rem)", lineHeight: 1.05, whiteSpace: "pre-line", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
      >
        {slide.headline}
      </h1>

      <p className="mt-3 leading-snug max-w-md" style={{ fontSize: "clamp(0.78rem,1.1vw,0.95rem)", color: "rgba(255,255,255,0.80)" }}>
        {slide.sub}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={slide.cta.href}
          className="cta-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ fontSize: "11px", padding: "10px 24px", background: "linear-gradient(135deg,#02026e,#1140c4)", boxShadow: "0 4px 24px rgba(2,2,110,0.55)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animation = "ctaPulseGlow 2s ease infinite"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animation = ""; }}
        >
          <span className="relative z-10">{slide.cta.label}</span>
          <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>

        <a
          href="/event/programme"
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/30 font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:text-white"
          style={{ fontSize: "10.5px", padding: "9px 20px", background: "rgba(255,255,255,0.06)" }}
        >
          View Programme
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* countdown — only on first slide */}
      {slide.src.includes("hero-carousel-1") && (
        <div className="mt-7 flex items-end gap-3">
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <div className="mr-1" style={{ fontSize: "8.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", writingMode: "vertical-lr", transform: "rotate(180deg)" }}>
              Kigali&nbsp;opens&nbsp;in
            </div>
            <CountUnit value={countdown.days}    label="Days" />
            <CountdownSeparator />
            <CountUnit value={countdown.hours}   label="Hrs" />
            <CountdownSeparator />
            <CountUnit value={countdown.minutes} label="Min" />
            <CountdownSeparator />
            <CountUnit value={countdown.seconds} label="Sec" />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent]         = useState(0);
  const [prev, setPrev]               = useState<number | null>(null);
  const [textVisible, setTextVisible] = useState(true);
  const countdown                     = useCountdown(TARGET_DATE);
  const progressRef                   = useRef<HTMLDivElement>(null);

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

      {/* ── Announcement bar ── */}
      <AnnouncementBar />

      {/* ── CAROUSEL ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(520px,62vw,780px)" }}>

        {/* Images */}
        {slides.map((s, i) => (
          <div key={s.src} className="absolute inset-0"
            style={{ zIndex: i === current ? 2 : i === prev ? 1 : 0, opacity: i === current ? 1 : 0, transition: "opacity 1.1s ease" }}
          >
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}

        {/* Gradient overlays — cinematic layered */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(2,2,60,0.80) 0%,rgba(2,2,60,0.50) 50%,rgba(2,2,60,0.15) 100%)" }} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.60) 0%,transparent 40%)" }} />

        {/* Subtle scanline texture */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(0,0,0,0.03) 0px,rgba(0,0,0,0.03) 1px,transparent 1px,transparent 3px)", opacity: 0.6 }} />

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none" style={{ width: "4px", background: "linear-gradient(to bottom,transparent,#fad202 30%,#fad202 70%,transparent)" }} />

        {/* Slide text */}
        <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.4s ease, transform 0.4s ease", position: "absolute", inset: 0, zIndex: 20 }}>
          {slide.kind === "cards"
            ? <CardsContent slide={slide} />
            : <TextContent slide={slide} countdown={countdown} />
          }
        </div>

        {/* Nav arrows */}
        <button onClick={goPrev} aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/60 hover:scale-110 active:scale-95"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button onClick={goNext} aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/60 hover:scale-110 active:scale-95"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom: dots + slide label */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-6 sm:px-10 lg:px-16 pb-5">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "28px" : "7px",
                  height: "3px",
                  borderRadius: "2px",
                  background: i === current ? "#fad202" : "rgba(255,255,255,0.30)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.40)" }}>
            {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* Progress bar at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            key={current}
            style={{
              height: "100%",
              background: "linear-gradient(90deg,#fad202,#f59e0b)",
              animation: `shimmer 0s, none`,
              width: "0%",
              transition: `width ${INTERVAL}ms linear`,
            }}
            ref={(el) => { if (el) requestAnimationFrame(() => { el.style.width = "100%"; }); }}
          />
        </div>
      </section>

      {/* ── INFO BAR ── */}
      <div style={{ background: "#ffffff", borderTop: "3px solid #02026e" }}>

        {/* Stats row */}
        <div style={{ borderBottom: "1px solid #eef0f4" }}>
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map(({ icon: Icon, value, label, href }, idx) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative flex items-center gap-4 py-5 overflow-hidden transition-colors duration-150"
                  style={{
                    paddingLeft: idx === 0 ? "0" : "clamp(16px,3vw,32px)",
                    paddingRight: "clamp(16px,3vw,32px)",
                    borderLeft: idx === 0 ? "none" : "1px solid #eef0f4",
                  }}
                >
                  {/* hover bg sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(2,2,110,0.04),transparent)" }} />

                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 group-hover:bg-[#02026e]"
                    style={{ background: "#f4f6fa" }}>
                    <Icon className="h-4 w-4 transition-colors duration-150 group-hover:text-white" style={{ color: "#8492a6" }} />
                  </div>
                  <div className="relative">
                    <div
                      className="font-bold leading-none tracking-tight transition-colors duration-150 group-hover:text-[#02026e]"
                      style={{ fontSize: "1.4rem", color: "#0f1629", letterSpacing: "-0.025em" }}
                    >
                      {value}
                    </div>
                    <div
                      className="mt-[4px] uppercase tracking-widest"
                      style={{ fontSize: "9px", color: "#b0b8c9", letterSpacing: "0.2em" }}
                    >
                      {label}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links row */}
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center" style={{ minHeight: "44px" }}>

            <nav className="flex flex-wrap items-center flex-1">
              {quickLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-3 transition-colors duration-150 group"
                  style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.07em", color: "#8492a6" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#02026e"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8492a6"; }}
                >
                  {link.label}
                  {i < quickLinks.length - 1 && (
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" style={{ fontSize: "10px", color: "#e2e6ee", lineHeight: 1 }}>/</span>
                  )}
                </Link>
              ))}
            </nav>

            <a
              href="/get-tickets"
              className="cta-shimmer group relative inline-flex items-center gap-2 overflow-hidden font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg,#02026e,#1140c4)",
                padding: "8px 20px",
                fontSize: "10px",
                letterSpacing: "0.15em",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}
            >
              <span className="relative z-10">Register Now</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

          </div>
        </div>
      </div>

    </div>
  );
}