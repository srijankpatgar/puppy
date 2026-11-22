"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";
import { TeddyMascot } from "@/components/common/TeddyMascot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ShowroomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowSignRef = useRef<HTMLDivElement>(null);
  const skylineBarsRef = useRef<SVGGElement>(null);
  const boothRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // 1. Arrow signboard pointing LEFT slides in from the left with settle
      if (arrowSignRef.current) {
        gsap.fromTo(
          arrowSignRef.current,
          { x: -140, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: arrowSignRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Line-art skyline bars that grow upward (scaleY from bottom, 70ms stagger)
      if (skylineBarsRef.current) {
        const bars = skylineBarsRef.current.querySelectorAll("rect");
        gsap.fromTo(
          bars,
          { scaleY: 0, transformOrigin: "bottom center" },
          {
            scaleY: 1,
            duration: 0.8,
            stagger: 0.07, // 70ms stagger
            ease: "power2.out",
            scrollTrigger: {
              trigger: boothRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
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
      className="relative py-16 sm:py-24 bg-quilt-cream text-[#2A1710] overflow-hidden select-none"
    >
      <CloudDivider position="top" fill="#F8D08C" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6 max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="font-scrawl text-lg text-[#A8481C] font-bold block mb-1">
            convenient &amp; trusted
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A1710]">
            Two ways to meet your puppy
          </h2>
        </div>

        {/* Arrow-Shaped Signboard "Puppies in Dubai" pointing LEFT */}
        <div className="flex justify-center mb-8">
          <div
            ref={arrowSignRef}
            className="relative pl-12 pr-8 sm:pl-14 sm:pr-10 py-3 sm:py-4 bg-gradient-to-l from-[#A8481C] to-[#8E3F15] text-[#FFF6E5] border-3 border-[#2A1710] shadow-[0_6px_0_#5A2E14]"
            style={{
              clipPath:
                "polygon(24px 0%, 100% 0%, 100% 100%, 24px 100%, 0% 50%)",
              transform: "rotate(2deg)",
            }}
          >
            <span className="font-display font-black text-2xl sm:text-4xl text-[#FFF6E5] tracking-wide block drop-shadow-sm">
              ⮜ Puppies in Dubai
            </span>
          </div>
        </div>

        {/* Showroom Booth with Red/White Striped Awning & Skyline */}
        <div
          ref={boothRef}
          className="relative mx-auto max-w-2xl rounded-3xl bg-[#FFFDF8] border-3 border-[#2A1710] shadow-xl overflow-hidden p-4 sm:p-7"
        >
          {/* Classic Red & White Striped Scalloped Awning */}
          <div className="relative w-full h-14 sm:h-18 -mt-4 sm:-mt-7 -mx-4 sm:-mx-7 overflow-hidden rounded-t-2xl border-b-3 border-[#2A1710] mb-5 flex">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full ${
                  i % 2 === 0 ? "bg-[#C23B22]" : "bg-[#FFFFFF]"
                }`}
              />
            ))}
            {/* Scalloped edge hanging beneath awning */}
            <div className="absolute -bottom-2 inset-x-0 h-4 flex overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-4 rounded-b-full border-b-2 border-[#2A1710] ${
                    i % 2 === 0 ? "bg-[#C23B22]" : "bg-[#FFFFFF]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Showroom Window Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[21/11] w-full rounded-2xl overflow-hidden border-2 border-[#2A1710] bg-[#1F110A]">
            {/* Line-Art Skyline Bars Growing Upward (70ms stagger) */}
            <svg
              viewBox="0 0 600 200"
              className="absolute inset-x-0 bottom-0 w-full h-28 sm:h-36 z-10 pointer-events-none opacity-45"
              preserveAspectRatio="none"
            >
              <g ref={skylineBarsRef} fill="#F8D08C" stroke="#2A1710" strokeWidth="1.5">
                <rect x="30" y="80" width="28" height="120" rx="3" />
                <rect x="70" y="50" width="34" height="150" rx="3" />
                <rect x="116" y="90" width="26" height="110" rx="3" />
                <rect x="154" y="30" width="38" height="170" rx="3" />
                {/* Burj Khalifa silhouette bar */}
                <rect x="204" y="10" width="22" height="190" rx="2" />
                <rect x="238" y="60" width="32" height="140" rx="3" />
                <rect x="282" y="100" width="26" height="100" rx="3" />
                <rect x="320" y="40" width="36" height="160" rx="3" />
                <rect x="368" y="70" width="30" height="130" rx="3" />
                <rect x="410" y="110" width="26" height="90" rx="3" />
                <rect x="448" y="50" width="34" height="150" rx="3" />
                <rect x="494" y="80" width="28" height="120" rx="3" />
                <rect x="534" y="60" width="36" height="140" rx="3" />
              </g>
            </svg>

            {/* Framed Puppy Photo in Window */}
            <Image
              src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
              alt="Teddy puppy in TeddyPups Dubai showroom"
              fill
              sizes="(max-width: 768px) 100vw, 750px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/60 via-transparent to-transparent pointer-events-none" />

            {/* Caption Pill "In our showroom" */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF6E5]/95 backdrop-blur px-3.5 py-1 text-xs font-black text-[#2A1710] border border-[#2A1710]/20 shadow-sm">
                <MapPin className="size-3.5 text-[#A8481C]" />
                <span>In our showroom</span>
              </span>
            </div>
          </div>

          {/* Paragraph + "Meet local puppies" Button + Mascot Puppy (matches reference video) */}
          <div
            data-mascot-slot="twoways-bottom-right"
            className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed max-w-sm">
              See them, love them, take them home. Come meet our locally available
              puppies in our Downtown Dubai showroom before you decide.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="/puppies?origin=local"
                className="w-full sm:w-auto btn-chunky py-3 px-6 text-xs sm:text-sm whitespace-nowrap shadow-[0_4px_0_#5A2E14] flex items-center justify-center gap-2"
              >
                <span>Meet local puppies</span>
                <ArrowRight className="size-4" />
              </Link>
              <div className="w-22 sm:w-28 shrink-0">
                <TeddyMascot pose="sitting" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#F8D08C" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
