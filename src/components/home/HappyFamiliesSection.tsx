"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import reviewsData from "@/data/reviews.json";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TILTS = ["-3deg", "4deg", "-2deg", "3deg", "-4deg", "2.5deg", "-3.5deg", "3deg"];

export function HappyFamiliesSection() {
  const { featuredTestimonial, stories } = reviewsData;
  const sectionRef = useRef<HTMLElement>(null);
  const polaroidsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      if (polaroidsRef.current) {
        const cards = polaroidsRef.current.querySelectorAll(".polaroid-card");
        cards.forEach((card, idx) => {
          const targetTilt = TILTS[idx % TILTS.length];
          gsap.fromTo(
            card,
            { y: 50, opacity: 0, rotate: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              rotate: targetTilt,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.8)",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-quilt-caramel text-[#2A1710] overflow-hidden"
    >
      <CloudDivider position="top" fill="#FFF6E5" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1.5 font-scrawl text-[#A8481C] text-lg mb-1 font-bold">
            <Heart className="size-4 fill-[#A8481C] text-[#A8481C]" />
            <span>forever homes</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A1710]">
            Happy families &amp; puppies
          </h2>
          <p className="mt-3 text-[#5A2E14] text-sm sm:text-base leading-relaxed">
            We are truly honored to see our puppies become cherished members of
            loving families. Heartwarming moments shared by our clients across the UAE.
          </p>
        </div>

        {/* Featured Testimonial Quote */}
        <div className="max-w-3xl mx-auto mb-16 rounded-3xl bg-[#FFFDF8] border-3 border-[#2A1710] p-8 sm:p-10 text-center relative shadow-[0_6px_0_#5A2E14]">
          <span className="font-display text-6xl text-[#F8D08C] leading-none select-none absolute top-4 left-6">
            “
          </span>
          <blockquote className="font-display text-lg sm:text-2xl text-[#2A1710] font-medium leading-relaxed italic relative z-10">
            {featuredTestimonial.quote}
          </blockquote>
          <div className="mt-6 font-scrawl text-base text-[#A8481C] font-bold">
            {featuredTestimonial.author}, {featuredTestimonial.location}
          </div>
        </div>

        {/* 8 Polaroid Photo Cards with Settle Bounce */}
        <div
          ref={polaroidsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto pb-6"
        >
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className="polaroid-card flex flex-col rounded-xl bg-white border-2 border-[#2A1710] p-3 pb-5 shadow-lg hover:shadow-2xl hover:scale-105 hover:rotate-0 transition-all duration-300 relative group cursor-pointer"
              style={{ transform: `rotate(${TILTS[idx % TILTS.length]})` }}
            >
              {/* Tape sticker at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F8D08C]/80 border border-[#2A1710]/20 rounded-xs shadow-xs z-10 -rotate-2" />

              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#2A1710]/5 mb-3 border border-[#2A1710]/10">
                <Image
                  src={story.image}
                  alt={story.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Handwritten caption at bottom of Polaroid */}
              <p className="font-scrawl text-xs sm:text-sm font-bold text-[#2A1710] text-center px-1 truncate">
                {story.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/happy-families"
            className="btn-chunky py-3 px-8 text-sm shadow-[0_5px_0_#5A2E14] inline-flex items-center gap-2"
          >
            <span>See every happy family</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#FFF6E5" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
