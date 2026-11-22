"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, HeartPulse, Clock, Globe } from "lucide-react";
import reviewsData from "@/data/reviews.json";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Vet-checked & healthy",
    desc: "Every puppy comes vaccinated, dewormed, and with a verified passport.",
  },
  {
    icon: HeartPulse,
    title: "Korea to Dubai, safely",
    desc: "Trusted breeders, safe pet nanny travel, and VIP arrival care.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    desc: "Always here to guide you from choosing to lifetime aftercare.",
  },
  {
    icon: Globe,
    title: "Trusted by families worldwide",
    desc: "Hundreds of puppies welcomed into loving homes across the UAE.",
  },
];

// Alternating tilts: rotate +-6deg to +-2deg
const POLAROID_TILTS = ["-6deg", "4deg", "-3deg", "5deg", "-4deg", "6deg", "-5deg", "3deg"];

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
          const targetTilt = POLAROID_TILTS[idx % POLAROID_TILTS.length];
          const initialRotate = idx % 2 === 0 ? -12 : 12;

          gsap.fromTo(
            card,
            { y: 50, opacity: 0, rotate: initialRotate, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              rotate: targetTilt,
              scale: 1,
              duration: 0.8,
              ease: "back.out(2)",
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
      className="relative py-16 sm:py-24 bg-quilt-cream text-[#2A1710] overflow-hidden select-none"
    >
      <CloudDivider position="top" fill="#F8D08C" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6 max-w-6xl mx-auto space-y-16">
        {/* =================================================================
            1. "Puppy passport" + "Why families trust TeddyPups" DOUBLE BORDER CARD
           ================================================================= */}
        <div className="rounded-[2.5rem] bg-[#FFF6E5] border-4 border-[#2A1710] p-3 sm:p-4 shadow-[0_8px_0_#5A2E14]">
          {/* Inner Border */}
          <div className="rounded-[2rem] border-2 border-dashed border-[#A8481C]/40 p-6 sm:p-10 bg-[#FFFDF8]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-scrawl text-lg text-[#A8481C] font-bold block mb-1">
                puppy passport
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A1710]">
                Why families trust TeddyPups
              </h2>
            </div>

            {/* 4 Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col p-5 rounded-2xl bg-[#FFF6E5] border-2 border-[#2A1710]/15 shadow-sm"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#F8D08C] text-[#A8481C] mb-3.5 border border-[#5A2E14]/15">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#2A1710]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#5A2E14] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================================
            2. Featured Testimonial Quote
           ================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-scrawl text-lg text-[#A8481C] font-bold block">
            forever homes
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A1710]">
            Happy families &amp; puppies
          </h2>
          <div className="mt-6 rounded-3xl bg-[#FFFDF8] border-3 border-[#2A1710] p-6 sm:p-8 text-center relative shadow-[0_6px_0_#5A2E14]">
            <span className="font-display text-5xl text-[#F8D08C] leading-none select-none absolute top-3 left-5">
              “
            </span>
            <blockquote className="font-display text-base sm:text-xl text-[#2A1710] font-medium leading-relaxed italic relative z-10">
              {featuredTestimonial.quote}
            </blockquote>
            <div className="mt-4 font-scrawl text-sm sm:text-base text-[#A8481C] font-bold">
              {featuredTestimonial.author}, {featuredTestimonial.location}
            </div>
          </div>
        </div>

        {/* =================================================================
            3. Polaroid Cards (Tilt +-6deg to +-2deg with bounce)
           ================================================================= */}
        <div
          ref={polaroidsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto pb-4"
        >
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className="polaroid-card flex flex-col rounded-xl bg-white border-2 border-[#2A1710] p-3 pb-5 shadow-lg hover:shadow-2xl hover:scale-105 hover:rotate-0 transition-all duration-300 relative group cursor-pointer"
              style={{ transform: `rotate(${POLAROID_TILTS[idx % POLAROID_TILTS.length]})` }}
            >
              {/* Tape sticker at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F8D08C]/85 border border-[#2A1710]/20 rounded-xs shadow-xs z-10 -rotate-2" />

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

        {/* Button: "See every happy family" */}
        <div className="text-center pt-2">
          <Link
            href="/happy-families"
            className="btn-chunky py-3.5 px-8 text-sm shadow-[0_4px_0_#5A2E14] inline-flex items-center gap-2"
          >
            <span>See every happy family</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#F8D08C" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
