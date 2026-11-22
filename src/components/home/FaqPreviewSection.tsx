"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Accordion } from "@/components/common/Accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
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
  const runnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Mascot runs from left to right across the bottom of the FAQ section
      if (runnerRef.current && sectionRef.current) {
        gsap.fromTo(
          runnerRef.current,
          { x: "-10%" },
          {
            x: "105vw",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.2,
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

      <div className="gutter max-w-4xl mx-auto relative z-10 pt-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 font-scrawl text-[#A8481C] text-lg mb-1 font-bold">
              <HelpCircle className="size-4" />
              <span>got questions?</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A1710]">
              Questions, answered
            </h2>
          </div>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#A8481C] hover:text-[#5A2E14] group transition-colors"
          >
            <span>Read all questions</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Accordion */}
        <div className="bg-[#FFFDF8] rounded-3xl border-3 border-[#2A1710] p-6 sm:p-10 shadow-[0_6px_0_#5A2E14]">
          <Accordion items={previewItems} defaultOpenIndex={0} />
        </div>
      </div>

      {/* Mascot running across the bottom while FAQ is on screen */}
      <div className="relative w-full h-16 overflow-hidden pointer-events-none select-none mt-8" aria-hidden="true">
        <div ref={runnerRef} className="absolute bottom-2 flex items-center gap-2">
          <div className="w-14 h-12">
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
          <div className="bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs font-bold px-3 py-1 rounded-full border border-[#2A1710] shadow-sm whitespace-nowrap">
            Ask us anything on WhatsApp! 💬
          </div>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#2A1710" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
