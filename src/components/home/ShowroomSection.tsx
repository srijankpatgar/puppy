"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, HeartPulse, Clock, Globe } from "lucide-react";
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
    description: "Every puppy comes vaccinated, dewormed, and with a verified passport.",
  },
  {
    icon: HeartPulse,
    title: "Korea to Dubai, safely",
    description: "Direct flight nanny care, stress-free travel, and safe VIP arrival.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Guidance on nutrition, grooming, training, and 24/7 concierge support.",
  },
  {
    icon: Globe,
    title: "Trusted by families",
    description: "Over 500+ happy teacup puppies welcomed into loving homes across the UAE.",
  },
];

export function ShowroomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skylineRef = useRef<SVGSVGElement>(null);
  const boothRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Skyline growth on scroll
      if (skylineRef.current) {
        gsap.fromTo(
          skylineRef.current,
          { y: 60, scaleY: 0.6, transformOrigin: "bottom" },
          {
            y: 0,
            scaleY: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: boothRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      }

      // Mascot trots in from the side next to CTA button
      if (mascotRef.current) {
        gsap.fromTo(
          mascotRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: mascotRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-quilt-cream text-[#2A1710] overflow-hidden"
    >
      <CloudDivider position="top" fill="#F8D08C" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6 max-w-6xl mx-auto">
        {/* Signboard "Puppies in Dubai" */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="px-8 sm:px-12 py-3 rounded-2xl bg-gradient-to-b from-[#A8481C] to-[#8E3F15] border-3 border-[#2A1710] shadow-[0_6px_0_#5A2E14] tp-signboard-swing mb-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFF6E5] tracking-wide">
              Puppies in Dubai
            </h2>
          </div>
          <span className="font-scrawl text-[#A8481C] text-base sm:text-lg font-bold">
            Two ways to meet your puppy: in our showroom or imported for you
          </span>
        </div>

        {/* Striped-Awning Showroom Booth with Growing Skyline */}
        <div
          ref={boothRef}
          className="relative mx-auto max-w-3xl rounded-3xl bg-[#FFFDF8] border-3 border-[#2A1710] shadow-xl overflow-hidden p-4 sm:p-8"
        >
          {/* Awning: Classic Red/Toffee & Cream Striped Scalloped Canopy */}
          <div className="relative w-full h-14 sm:h-20 -mt-4 sm:-mt-8 -mx-4 sm:-mx-8 overflow-hidden rounded-t-2xl border-b-3 border-[#2A1710] mb-6 flex">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full ${
                  i % 2 === 0 ? "bg-[#A8481C]" : "bg-[#FFF6E5]"
                }`}
              />
            ))}
            {/* Scalloped edge at bottom of awning */}
            <div className="absolute -bottom-2 inset-x-0 h-4 flex overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-4 rounded-b-full border-b-2 border-[#2A1710] ${
                    i % 2 === 0 ? "bg-[#A8481C]" : "bg-[#FFF6E5]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Showroom Window with Dubai Skyline in background */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full rounded-2xl overflow-hidden border-2 border-[#2A1710] bg-[#1F110A]">
            {/* Dubai Skyline SVG Silhouette (grows upward on scroll) */}
            <svg
              ref={skylineRef}
              viewBox="0 0 800 240"
              className="absolute inset-x-0 bottom-0 w-full h-32 sm:h-44 z-10 pointer-events-none opacity-40"
              preserveAspectRatio="none"
            >
              {/* Burj Khalifa & Downtown Towers */}
              <path
                d="M 50 240 L 50 180 L 70 180 L 70 240 M 110 240 L 110 140 L 140 140 L 140 240 M 200 240 L 200 110 L 230 110 L 230 240 M 360 240 L 360 90 L 380 90 L 380 40 L 390 40 L 390 10 L 392 0 L 394 10 L 394 40 L 404 40 L 404 90 L 424 90 L 424 240 M 470 240 L 470 130 L 500 130 L 500 240 M 550 240 L 550 150 L 580 150 L 580 240 M 640 240 L 640 100 L 670 100 L 670 240 M 710 240 L 710 160 L 740 160 L 740 240 Z"
                fill="#F8D08C"
              />
            </svg>

            {/* Showroom Puppy Photo */}
            <Image
              src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
              alt="Adorable teddy puppy in TeddyPups Dubai showroom"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/70 via-transparent to-transparent pointer-events-none" />

            {/* Overlay Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF6E5]/95 backdrop-blur px-3.5 py-1 text-xs font-extrabold text-[#2A1710] border border-[#2A1710]/20 shadow-sm">
                Downtown Dubai Showroom
              </span>
            </div>
          </div>

          {/* Action Row: Mascot trotting in beside "Meet local puppies" Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Mascot Trotting in */}
              <div ref={mascotRef} className="w-14 h-14 shrink-0 drop-shadow-md">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <ellipse cx="40" cy="45" rx="24" ry="16" fill="#F8D08C" stroke="#2A1710" strokeWidth="2.5" />
                  <ellipse cx="14" cy="40" rx="9" ry="6" fill="#F8D08C" stroke="#2A1710" strokeWidth="2" />
                  <circle cx="62" cy="30" r="18" fill="#F8D08C" stroke="#2A1710" strokeWidth="2.5" />
                  <ellipse cx="50" cy="24" rx="6" ry="13" fill="#E4A352" stroke="#2A1710" strokeWidth="2" transform="rotate(12 50 24)" />
                  <ellipse cx="74" cy="24" rx="6" ry="13" fill="#E4A352" stroke="#2A1710" strokeWidth="2" transform="rotate(-12 74 24)" />
                  <circle cx="58" cy="28" r="2.5" fill="#2A1710" />
                  <circle cx="68" cy="28" r="2.5" fill="#2A1710" />
                  <circle cx="63" cy="34" r="2" fill="#2A1710" />
                </svg>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#2A1710]">
                  See them, hold them, love them.
                </h3>
                <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed">
                  Private VIP viewing appointments available daily in Dubai.
                </p>
              </div>
            </div>

            <Link
              href="/puppies?origin=local"
              className="w-full sm:w-auto btn-chunky flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_5px_0_#5A2E14]"
            >
              <span>Meet local puppies</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* 4 Trust Points Preserved as Compact Cards Below */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710]/15 shadow-sm hover:border-[#A8481C] hover:shadow-md transition-all duration-300"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#F8D08C]/50 text-[#A8481C] mb-3.5 border border-[#5A2E14]/15">
                  <Icon className="size-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#2A1710]">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs text-[#5A2E14] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <CloudDivider position="bottom" fill="#FFF6E5" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
