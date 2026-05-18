"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Dr Dinah Mwinzi",
    role: "Director at the Ministry of Education, Science and Technology",
    company: "Mama Ngina University",
    image: "/images/testimonials/testimonial-1.jpg",
    quote:
      "The Clean Energy Conference brought together the best minds in the industry. The discussions were insightful, the networking invaluable, and the energy inspiring. I walked away with fresh ideas, meaningful connections, and a clearer vision of where the industry is headed. Truly one of the best conferences in the secto",
  },
  {
    name: "Steve Kuria",
    role: "Founder & CEO. ",
    company: "AAEMI",
    image: "/images/testimonials/testimonial-2.jpg",
    quote:
      "This conference is a goldmine for clean energy investment. I connected with innovative startups, explored emerging trends, and engaged in high-level discussions with industry leaders. The networking and deal-making opportunities are unmatched—highly recommended for investors looking to drive the future of sustainability",
  },
  {
    name: "Alex Chamwada",
    role: "CEO",
    company: "CHAMS Media Limited",
    image: "/images/testimonials/testimonial-3.jpg",
    quote:
      "The programme was highly relevant, the networking was strong, and the event felt well positioned for professionals looking for meaningful engagement rather than generic conference traffic.",
  },
];

export function TestimonialsPreview() {
  return (
    <section className="bg-[#020266]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00cc88]">
            Testimonials
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
            What attendees say about the conference
          </h2>
          <p className="mt-4 text-base leading-8 text-white/85">
            Feedback from senior delegates, investors, and industry professionals who have participated in previous editions.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="hover-glow-card rounded-[24px] border border-white/20 bg-white/10 p-6 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/30 bg-white/15">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#009966]/30 text-[#00cc88]">
                  <Quote className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-white/90">
                "{item.quote}"
              </p>

              <div className="mt-5">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-base text-white/70">{item.role}</p>
                <p className="text-base font-semibold text-[#00cc88]">
                  {item.company}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-amber-300">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
  <Link
    href="/conference/testimonials"
    className="
      group relative inline-flex items-center justify-center gap-2
      overflow-hidden

      rounded-full px-6 py-3 text-base font-semibold

      text-white
      bg-white/10 backdrop-blur-sm

      border border-white/30

      shadow-[0_10px_30px_rgba(0,0,0,0.12)]

      transition-all duration-500 ease-out

      hover:border-white/60
      hover:scale-[1.04]
      hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-white/25
      focus:ring-offset-2
      focus:ring-offset-[#02026e]
    "
  >
    {/* white sweep */}
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span
        className="
          absolute left-0 top-0 h-full w-0
          bg-white
          transition-all duration-500 ease-out
          group-hover:w-full
        "
      />
    </span>

    {/* text turns blue */}
    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
      View all testimonials
    </span>

    <ArrowRight
      className="
        relative z-10 h-4 w-4
        transition-all duration-300
        group-hover:translate-x-1
        group-hover:text-[#02026e]
      "
    />
  </Link>
</div>
      </div>
    </section>
  );
}