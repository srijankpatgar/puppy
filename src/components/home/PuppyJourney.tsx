"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "1",
    title: "Choose your breed",
    desc: "Select your preferred teacup puppy or tell us your lifestyle preferences. We curate the best matches from Dubai and Korea.",
  },
  {
    num: "2",
    title: "Get photos & details",
    desc: "Receive real-time 4K videos, parent pedigree records, and certified veterinary reports directly on WhatsApp.",
  },
  {
    num: "3",
    title: "Secure & safe delivery",
    desc: "VIP airport delivery or direct doorstep chauffeur anywhere in Dubai, Abu Dhabi, and across the Emirates.",
  },
];

export function PuppyJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const doorsStageRef = useRef<HTMLDivElement>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDoorsOpen(true);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Staggered pop and slide-up for steps 1, 2, 3
      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll(".journey-step");
        stepItems.forEach((step, idx) => {
          const circle = step.querySelector(".journey-num");
          const text = step.querySelector(".journey-text");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          tl.fromTo(
            circle,
            { scale: 0.3, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
          ).fromTo(
            text,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
        });
      }

      // 2. Big double doors open on scroll into view
      if (doorsStageRef.current) {
        ScrollTrigger.create({
          trigger: doorsStageRef.current,
          start: "top 70%",
          onEnter: () => setDoorsOpen(true),
          onLeaveBack: () => setDoorsOpen(false),
        });
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
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-scrawl text-[#A8481C] text-lg font-bold">
            concierge adoption
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A1710] mt-2">
            Your puppy journey
          </h2>
          <p className="mt-3 text-[#5A2E14] text-sm sm:text-base leading-relaxed">
            A premium, transparent step-by-step experience. We make adoption
            simple, secure, and purely joyful.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="journey-step flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border-2 border-[#2A1710] shadow-[0_6px_0_#5A2E14] relative"
            >
              {/* Number Circle with pop animation */}
              <div className="journey-num flex size-14 items-center justify-center rounded-full bg-[#F8D08C] border-3 border-[#2A1710] font-display text-2xl font-black text-[#2A1710] shadow-md mb-5">
                {step.num}
              </div>

              {/* Text */}
              <div className="journey-text space-y-2">
                <h3 className="font-display text-xl font-bold text-[#2A1710]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Big Grand Double Door (Opens on scroll + Interactive toggle) */}
        <div ref={doorsStageRef} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 font-scrawl text-sm sm:text-base text-[#A8481C] font-bold mb-3">
            <span>✨ Step inside our boutique world ✨</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#2A1710] mb-6">
            Open the doors to your new best friend
          </h3>

          {/* Interactive controls */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setDoorsOpen(!doorsOpen)}
              className="btn-chunky text-xs sm:text-sm py-2.5 px-6 shadow-[0_3px_0_#5A2E14]"
            >
              <span>{doorsOpen ? "Close Doors" : "Open Double Doors"}</span>
            </button>
            {doorsOpen && (
              <button
                type="button"
                onClick={() => {
                  setDoorsOpen(false);
                  setTimeout(() => setDoorsOpen(true), 350);
                }}
                className="btn-chunky-outline text-xs sm:text-sm py-2.5 px-4 flex items-center gap-1.5 shadow-[0_3px_0_#5A2E14]"
              >
                <RotateCcw className="size-3.5" />
                <span>Replay</span>
              </button>
            )}
          </div>

          {/* 3D Arched Grand Double Door Stage */}
          <div className="relative mx-auto w-full max-w-2xl [perspective:1400px]">
            <div
              className={`relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-t-[14rem] sm:rounded-t-[18rem] border-4 border-[#2A1710] bg-[#1F110A] overflow-hidden transition-all duration-700 ${
                doorsOpen
                  ? "shadow-[0_0_80px_20px_rgba(248,208,140,0.5)] ring-4 ring-[#F8D08C]/50"
                  : "shadow-2xl"
              }`}
            >
              {/* Interior Room (Revealed when doors swing open) */}
              <div className="absolute inset-0 size-full overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none">
                <Image
                  src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                  alt="Max the Teacup Maltipoo inside TeddyPups"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={`object-cover transition-transform duration-1000 ${
                    doorsOpen ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/85 via-[#2A1710]/30 to-transparent" />

                {/* Interior Welcome Badge */}
                <div
                  className={`relative z-10 space-y-3 transition-all duration-700 delay-200 ${
                    doorsOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <span className="inline-block rounded-full bg-[#F8D08C] border-2 border-[#2A1710] px-4 py-1 text-xs font-black text-[#2A1710] uppercase tracking-wider shadow-md">
                    Welcome to TeddyPups
                  </span>
                  <h4 className="font-display text-2xl sm:text-4xl font-black text-[#FFF6E5] drop-shadow-md">
                    Meet Max &amp; Friends
                  </h4>
                  <div className="pt-2">
                    <Link
                      href="/puppies"
                      className="btn-chunky py-2.5 px-6 text-xs sm:text-sm shadow-[0_4px_0_#5A2E14]"
                    >
                      <span>Explore Available Puppies</span>
                      <ArrowRight className="size-4 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Left Door Leaf */}
              <div
                className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-[#2A1710]/40 transition-transform duration-1000 ease-[cubic-bezier(0.34,1.4,0.4,1)] z-20 pointer-events-none"
                style={{
                  backgroundColor: "#A8481C",
                  transform: doorsOpen ? "rotateY(-78deg)" : "rotateY(0deg)",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(42,23,16,0.25) 38px, rgba(42,23,16,0.3) 40px), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
                }}
              >
                {/* Brass Door Handle & Crest */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 size-4 sm:size-5 rounded-full bg-gradient-to-br from-[#FFE4A0] via-[#F8D08C] to-[#C27D2E] border-2 border-[#2A1710] shadow-md" />
                <div className="absolute inset-4 sm:inset-6 border-2 border-[#FFF6E5]/25 rounded-tl-[10rem] pointer-events-none" />
              </div>

              {/* Right Door Leaf */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 origin-right border-l border-[#2A1710]/40 transition-transform duration-1000 ease-[cubic-bezier(0.34,1.4,0.4,1)] z-20 pointer-events-none"
                style={{
                  backgroundColor: "#A8481C",
                  transform: doorsOpen ? "rotateY(78deg)" : "rotateY(0deg)",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(42,23,16,0.25) 38px, rgba(42,23,16,0.3) 40px), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
                }}
              >
                {/* Brass Door Handle & Crest */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 size-4 sm:size-5 rounded-full bg-gradient-to-br from-[#FFE4A0] via-[#F8D08C] to-[#C27D2E] border-2 border-[#2A1710] shadow-md" />
                <div className="absolute inset-4 sm:inset-6 border-2 border-[#FFF6E5]/25 rounded-tr-[10rem] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#F8D08C" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
