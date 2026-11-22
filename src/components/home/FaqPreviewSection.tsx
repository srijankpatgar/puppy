"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import faqData from "@/data/faq.json";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FaqPreviewSection() {
  const previewItems = faqData.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Scrubbed transition from peach (#F8D08C) to dark brown wall (#2A1710)
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: "#F8D08C" },
          {
            backgroundColor: "#2A1710",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 25%",
              scrub: true,
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
      className="relative py-20 sm:py-28 text-[#FFF6E5] overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0, transparent 38px, rgba(0,0,0,0.2) 38px, rgba(0,0,0,0.25) 40px)",
      }}
    >
      <CloudDivider position="top" fill="#FFF6E5" className="absolute top-0 inset-x-0" />

      {/* Background Decor: Twinkling Star Sparkles, Lantern on the Left, Small Arched Door */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        {/* Twinkling Star Sparkles */}
        <div className="absolute top-12 left-1/4 tp-star text-[#F8D08C] text-xl">✦</div>
        <div className="absolute top-24 right-1/4 tp-star text-[#F8D08C] text-lg" style={{ animationDelay: "1.2s" }}>✧</div>
        <div className="absolute bottom-20 left-1/3 tp-star text-[#F8D08C] text-sm" style={{ animationDelay: "0.7s" }}>✦</div>
        <div className="absolute top-36 right-16 tp-star text-[#F8D08C] text-xl" style={{ animationDelay: "1.8s" }}>✧</div>

        {/* Lantern on the Left */}
        <div className="absolute top-16 left-4 sm:left-12 tp-lantern-glow">
          <svg viewBox="0 0 60 90" className="w-10 sm:w-14 h-auto drop-shadow-lg">
            <path d="M 10 30 L 25 30 L 25 45" stroke="#FFF6E5" strokeWidth="3" fill="none" opacity="0.6" />
            <polygon points="15,45 35,45 25,35" fill="#1A0D08" />
            <polygon points="17,45 33,45 30,68 20,68" fill="#FFE4A0" stroke="#1A0D08" strokeWidth="2" />
            <circle cx="25" cy="56" r="4" fill="#FFA500" />
          </svg>
        </div>

        {/* Small Arched Door in the Background */}
        <div className="absolute bottom-6 right-6 sm:right-16 opacity-35">
          <svg viewBox="0 0 80 120" className="w-16 sm:w-20 h-auto">
            <path
              d="M 10 120 L 10 40 A 30 30 0 0 1 70 40 L 70 120 Z"
              fill="#1F110A"
              stroke="#FFF6E5"
              strokeWidth="2"
            />
            <circle cx="40" cy="40" r="10" fill="#FFE4A0" opacity="0.7" />
          </svg>
        </div>
      </div>

      <div className="gutter max-w-4xl mx-auto relative z-10 pt-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 font-scrawl text-[#F8D08C] text-lg mb-1 font-bold">
              <HelpCircle className="size-4" />
              <span>got questions?</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFF6E5]">
              Questions, answered
            </h2>
          </div>

          {/* Button: "Read all questions" (with mascot slot anchor) */}
          <div data-mascot-slot="faq-bottom-right" className="relative">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full bg-[#F8D08C] text-[#2A1710] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 border-2 border-[#1A0D08] shadow-[0_3px_0_#1A0D08] hover:bg-white active:translate-y-0.5 active:shadow-[0_1px_0_#1A0D08] transition-all cursor-pointer"
            >
              <span>Read all questions</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* FAQ items with Star Bullets (⭐) that expand smoothly */}
        <div className="space-y-4">
          {previewItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.question}
                className="rounded-2xl bg-[#FFFDF8] text-[#2A1710] border-3 border-[#2A1710] shadow-[0_5px_0_#1A0D08] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-[#A8481C]">⭐</span>
                    <span className="font-display font-bold text-base sm:text-lg text-[#2A1710]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-5 text-[#A8481C] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5A2E14] leading-relaxed border-t border-[#2A1710]/10 animate-in fade-in duration-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <CloudDivider position="bottom" fill="#2A1710" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
