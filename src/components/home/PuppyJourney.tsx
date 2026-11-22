"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Send, CheckCheck, Home } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PuppyJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeBubble, setActiveBubble] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setActiveBubble(4);
      return;
    }

    const ctx = gsap.context(() => {
      // Steps 1, 2, 3: sliding up 24px + fade, circles pop with small overshoot
      if (stepsContainerRef.current) {
        const stepItems = stepsContainerRef.current.querySelectorAll(".journey-step-item");
        stepItems.forEach((step, idx) => {
          const circle = step.querySelector(".step-circle");
          const content = step.querySelector(".step-content");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          tl.fromTo(
            circle,
            { scale: 0.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
          ).fromTo(
            content,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
        });
      }

      // Phone chat bubbles appearing one by one with typing delay
      if (phoneRef.current) {
        ScrollTrigger.create({
          trigger: phoneRef.current,
          start: "top 75%",
          onEnter: () => {
            setTimeout(() => setActiveBubble(2), 500);
            setTimeout(() => setActiveBubble(3), 1200);
            setTimeout(() => setActiveBubble(4), 1900);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#F8D08C] text-[#2A1710] overflow-hidden select-none"
    >
      <CloudDivider position="top" fill="#FFF6E5" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-scrawl text-lg text-[#A8481C] font-bold block mb-1">
            concierge adoption
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A1710]">
            Your puppy journey
          </h2>
          <p className="mt-3 text-[#5A2E14] text-sm sm:text-base leading-relaxed">
            A premium, transparent step-by-step experience. We make adoption
            simple, secure, and purely joyful.
          </p>
        </div>

        {/* 2-Column Grid: Steps on Left, Phone Mockup on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Steps 1, 2, 3 + "How it works" outline button */}
          <div
            ref={stepsContainerRef}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            {/* Step 1: Outlined circle */}
            <div className="journey-step-item flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710] shadow-[0_4px_0_#5A2E14]">
              <div className="step-circle flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2A1710] bg-[#FFF6E5] font-display text-lg font-black text-[#2A1710] shadow-sm">
                1
              </div>
              <div className="step-content space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#2A1710]">
                  Choose your breed
                </h3>
                <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed">
                  Select your preferred breed or tell us what you&apos;re looking
                  for. We&apos;ll guide you based on availability and your lifestyle.
                </p>
              </div>
            </div>

            {/* Step 2: Outlined circle (has mascot slot anchor) */}
            <div
              data-mascot-slot="steps-step2"
              className="journey-step-item relative flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710] shadow-[0_4px_0_#5A2E14] z-10"
            >
              <div className="step-circle flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2A1710] bg-[#FFF6E5] font-display text-lg font-black text-[#2A1710] shadow-sm">
                2
              </div>
              <div className="step-content space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#2A1710]">
                  Get photos &amp; details
                </h3>
                <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed">
                  Our team will share real 4K photos, veterinary records, and pedigree
                  details directly on WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 3: Filled brown circle (#5A2E14) */}
            <div className="journey-step-item flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710] shadow-[0_4px_0_#5A2E14]">
              <div className="step-circle flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#2A1710] bg-[#5A2E14] font-display text-lg font-black text-[#FFF6E5] shadow-sm">
                3
              </div>
              <div className="step-content space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#2A1710]">
                  Secure &amp; safe delivery
                </h3>
                <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed">
                  Once confirmed, we handle white-glove delivery to your doorstep
                  in Dubai, Abu Dhabi, and across the UAE safely and stress-free.
                </p>
              </div>
            </div>

            {/* "How it works" Outline Button */}
            <div className="pt-2">
              <Link
                href="/how-it-works"
                className="btn-chunky-outline py-3 px-7 text-xs sm:text-sm shadow-[0_4px_0_#5A2E14] inline-flex items-center gap-2"
              >
                <span>How it works</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Authentic Phone Mockup with WhatsApp-Style Chat */}
          <div ref={phoneRef} className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-sm rounded-[2.5rem] border-4 border-[#2A1710] bg-[#1F110A] p-2.5 shadow-2xl shadow-[#2A1710]/20">
              {/* Phone Screen Container */}
              <div className="relative rounded-[2rem] overflow-hidden bg-[#EFEAE2] flex flex-col h-[480px] sm:h-[520px]">
                {/* Header: "TeddyPups U.A.E. online" */}
                <div className="bg-[#005C4B] text-white px-4 py-3 flex items-center gap-3 shadow-md">
                  <div className="relative size-9 rounded-full overflow-hidden bg-white/20 shrink-0 border border-white/30">
                    <Image
                      src="/brand/logo.png"
                      alt="TeddyPups U.A.E."
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs sm:text-sm leading-tight">
                      TeddyPups U.A.E.
                    </div>
                    <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>online</span>
                    </div>
                  </div>
                </div>

                {/* Message Stream with typing delays */}
                <div className="p-3.5 space-y-3 flex-1 overflow-y-auto text-xs no-scrollbar">
                  {/* Bubble 1: User enquiry */}
                  {activeBubble >= 1 && (
                    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-[#D9FDD3] text-[#2A1710] rounded-2xl rounded-tr-none px-3.5 py-2 max-w-[85%] shadow-sm">
                        <p>Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
                        <div className="text-[9px] text-[#5A2E14]/60 text-right mt-1 flex items-center justify-end gap-1">
                          <span>10:42 AM</span>
                          <CheckCheck className="size-3 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bubble 2: Team response with breed selection */}
                  {activeBubble >= 2 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-[#FFFFFF] text-[#2A1710] rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[88%] shadow-sm space-y-2">
                        <p>
                          Select your preferred breed or tell us what you&apos;re looking
                          for! We&apos;ll guide you based on availability and lifestyle:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {["Maltipoo", "Pomeranian", "Poodle", "Cavapoo"].map((b) => (
                            <span
                              key={b}
                              className="rounded-full bg-[#FFF6E5] border border-[#2A1710]/20 px-2 py-0.5 text-[10px] font-bold text-[#A8481C]"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bubble 3: Video thumbnail with play button */}
                  {activeBubble >= 3 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-[#FFFFFF] text-[#2A1710] rounded-2xl rounded-tl-none p-1.5 max-w-[85%] shadow-sm space-y-1.5">
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1F110A]">
                          <Image
                            src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                            alt="Puppy video thumbnail"
                            fill
                            sizes="240px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                            <div className="size-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <Play className="size-5 fill-[#2A1710] text-[#2A1710] ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#5A2E14] px-1 font-medium">
                          Here is Max playing in our showroom today! 🧸
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bubble 4: Dotted route with small house icon */}
                  {activeBubble >= 4 && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-[#FFFFFF] text-[#2A1710] rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[88%] shadow-sm flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-full bg-[#F8D08C] text-[#2A1710] shrink-0">
                          <Home className="size-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-[11px] text-[#2A1710]">
                            Doorstep UAE Delivery
                          </div>
                          <div className="text-[10px] text-[#5A2E14]/80">
                            Safe chauffeur straight to your home 🏠
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar: "Say hello on WhatsApp" with green send button */}
                <div className="bg-[#F0F2F5] p-2.5 border-t border-[#2A1710]/10 flex items-center gap-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-[#5A2E14]/70 border border-[#2A1710]/15 flex items-center justify-between shadow-xs hover:border-[#25D366] transition-colors"
                  >
                    <span>Say hello on WhatsApp</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-md hover:bg-[#008F6F] active:scale-95 transition-all shrink-0"
                    aria-label="Send message on WhatsApp"
                  >
                    <Send className="size-4 fill-white text-white ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#FFF6E5" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
