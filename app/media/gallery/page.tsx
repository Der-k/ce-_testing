"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Category = "Conference" | "Networking" | "Exhibition" | "Speakers";

type GalleryItem = {
  src: string;
  alt: string;
  category: Category;
};

const galleryItems: GalleryItem[] = [
  // Conference
  { src: "/images/gallery/gallery-1.jpg", alt: "Conference opening session", category: "Conference" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Conference exhibition display", category: "Conference" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Conference audience session", category: "Conference" },
  { src: "/images/gallery/gallery-5.jpeg", alt: "Conference discussion session", category: "Conference" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Conference delegates", category: "Conference" },

  // Networking
  { src: "/images/gallery/gallery-2.jpg", alt: "Delegates networking", category: "Networking" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Delegates meeting at the conference", category: "Networking" },
  { src: "/images/gallery/gallery-11.jpeg", alt: "Networking and partner engagement", category: "Networking" },
  { src: "/images/gallery/hero-carousel-1.jpeg", alt: "Delegates networking", category: "Networking" },
  { src: "/images/gallery/hero-carousel-2.jpeg", alt: "Conference delegates in discussion", category: "Networking" },
  { src: "/images/gallery/hero-carousel-3.jpeg", alt: "Roundtable discussion", category: "Networking" },
  { src: "/images/gallery/hero-carousel-4.jpeg", alt: "Delegates seated during session", category: "Networking" },
  { src: "/images/gallery/hero-carousel-7.jpeg", alt: "Conference networking room", category: "Networking" },
  { src: "/images/gallery/hero-carousel-8.jpeg", alt: "Audience networking session", category: "Networking" },
  { src: "/images/gallery/hero-carousel-10.jpeg", alt: "Panel discussion and audience", category: "Networking" },

  // Exhibition
  { src: "/images/gallery/gallery-7.jpg", alt: "Exhibition booth and branding", category: "Exhibition" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Exhibition stand", category: "Exhibition" },
  { src: "/images/gallery/hero-carousel-16.jpeg", alt: "Exhibition and event branding", category: "Exhibition" },

  // Speakers
  { src: "/images/gallery/hero-carousel-5.jpeg", alt: "Speaker at conference table", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-6.jpeg", alt: "Speaker presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9.jpg", alt: "Speaker addressing delegates", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (2).jpeg", alt: "Speaker session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (3).jpeg", alt: "Speaker presentation session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (5).jpeg", alt: "Speaker keynote session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-10.jpg", alt: "Speaker on stage", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-11.jpg", alt: "Speaker at podium", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-12.jpg", alt: "Panel speakers on stage", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-13.jpeg", alt: "Speaker presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-14.jpeg", alt: "Award presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-15.jpeg", alt: "Speaker at podium", category: "Speakers" },
];

const filters = ["All", "Conference", "Networking", "Exhibition", "Speakers", "Highlights"] as const;
type Filter = (typeof filters)[number];

// Logo-inspired color per filter
const filterColors: Record<Filter, string> = {
  "All":         "#E8471C", // orange
  "Conference":  "#2BB5B8", // teal
  "Networking":  "#F5A623", // gold
  "Exhibition":  "#7B8C35", // olive green
  "Speakers":    "#F06292", // pink
  "Highlights":  "#8B5EA4", // purple
};

export default function GalleryPage() {
  const [active, setActive] = useState<Filter>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return galleryItems;
    return galleryItems.filter((i) => i.category === active);
  }, [active]);

  return (
    <div
      className="min-h-screen text-white pt-[96px]"
      style={{
        background: `
          radial-gradient(ellipse at 0% 0%, rgba(43,181,184,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(232,71,28,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 60%, rgba(245,166,35,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 0% 100%, rgba(123,140,53,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 100%, rgba(240,98,146,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(139,94,164,0.15) 0%, transparent 60%),
          linear-gradient(160deg, #0a0a14 0%, #0f0a08 40%, #080f10 70%, #0a080f 100%)
        `,
      }}
    >

      {/* HERO */}
      <section className="relative py-24 px-6 text-center border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-white/60 text-xs">
            Event Gallery
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold mt-3">
            Captured Moments
          </h1>
          <p className="text-white/60 mt-5 text-sm md:text-base">
            Explore memories across all event experiences.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div
        className="sticky top-0 z-20 backdrop-blur-md border-b border-white/10 px-6"
        style={{ background: "rgba(10, 8, 12, 0.75)" }}
      >
        <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
          {filters.map((filter) => {
            const color = filterColors[filter];
            const isActive = active === filter;
            return (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition border"
                style={{
                  backgroundColor: isActive ? color : "transparent",
                  borderColor: color,
                  color: isActive ? "#fff" : color,
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL-BLEED GRID */}
      <main className="w-full px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img.src)}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition" />
            </div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
        >
          <div className="max-w-6xl w-full">
            <Image
              src={selectedImage}
              alt="preview"
              width={1600}
              height={1000}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}