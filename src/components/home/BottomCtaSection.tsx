"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BottomCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const moonRef = useRef<SVGGElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const lightSpillRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const [doorAjar, setDoorAjar] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDoorAjar(true);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Rising crescent moon on scroll
      if (moonRef.current) {
        gsap.fromTo(
          moonRef.current,
          { y: 50, opacity: 0.4 },
          {
            y: -20,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // 2. Door opens slightly and light spills out when CTA buttons appear
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaButtonsRef.current,
          start: "top 85%",
          onEnter: () => setDoorAjar(true),
          onLeaveBack: () => setDoorAjar(false),
        },
      });

      // 3. Mascot runs in from the left
      if (mascotRef.current) {
        tl.fromTo(
          mascotRef.current,
          { x: -120, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "back.out(1.5)" },
          0.1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#2A1710] text-[#FFF6E5] overflow-hidden"
    >
      {/* Night Sky with Twinkling Stars & Rising Crescent Moon */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
          {/* Twinkling Stars */}
          <g className="fill-[#F8D08C]">
            <circle cx="120" cy="90" r="2.5" className="tp-star" style={{ animationDelay: "0.2s" }} />
            <circle cx="280" cy="140" r="1.8" className="tp-star" style={{ animationDelay: "1.1s" }} />
            <circle cx="440" cy="70" r="3" className="tp-star" style={{ animationDelay: "0.7s" }} />
            <circle cx="680" cy="110" r="2" className="tp-star" style={{ animationDelay: "1.9s" }} />
            <circle cx="920" cy="80" r="2.8" className="tp-star" style={{ animationDelay: "0.4s" }} />
            <circle cx="1120" cy="130" r="2.2" className="tp-star" style={{ animationDelay: "1.5s" }} />
            <circle cx="1340" cy="95" r="3.2" className="tp-star" style={{ animationDelay: "0.9s" }} />
            <circle cx="200" cy="220" r="1.6" className="tp-star" style={{ animationDelay: "2.1s" }} />
            <circle cx="820" cy="200" r="2" className="tp-star" style={{ animationDelay: "1.3s" }} />
            <circle cx="1260" cy="230" r="2.4" className="tp-star" style={{ animationDelay: "0.6s" }} />
          </g>

          {/* Glowing Crescent Moon */}
          <g ref={moonRef} transform="translate(1220, 100)">
            <circle r="46" fill="#F8D08C" opacity="0.12" filter="blur(10px)" />
            <path
              d="M 0 -36 A 36 36 0 1 0 36 0 A 28 28 0 1 1 0 -36 Z"
              fill="#F8D08C"
              stroke="#FFF6E5"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_20px_rgba(248,208,140,0.8)]"
            />
          </g>
        </svg>
      </div>

      <div className="gutter relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-block font-scrawl text-lg sm:text-xl text-[#F8D08C] tracking-wide mb-2">
          welcome home
        </div>

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF6E5] max-w-3xl leading-[1.15]">
          Ready to meet your new best friend?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#FFF6E5]/80 leading-relaxed">
          Bring home a healthy, happy teacup puppy with white-glove guidance every
          step of the way. We help you find the right match and ensure a safe, joyful arrival.
        </p>

        {/* Cottage / Boutique Arched Door Scene */}
        <div className="mt-14 relative w-full max-w-md sm:max-w-lg aspect-[4/4.5] flex flex-col items-center justify-end pb-8">
          {/* Flickering Wall Lantern (mounted to the left of the door) */}
          <div className="absolute top-12 left-4 sm:left-8 z-30 tp-lantern-glow">
            <svg viewBox="0 0 60 90" className="w-12 sm:w-16 h-auto drop-shadow-lg">
              {/* Wall bracket */}
              <path d="M 10 30 L 25 30 L 25 45" stroke="#1A0D08" strokeWidth="4" fill="none" />
              {/* Lantern roof */}
              <polygon points="15,45 35,45 25,35" fill="#1A0D08" />
              {/* Lantern glass */}
              <polygon points="17,45 33,45 30,68 20,68" fill="#FFE4A0" stroke="#1A0D08" strokeWidth="2.5" />
              {/* Flame inside */}
              <circle cx="25" cy="56" r="4" fill="#FFA500" />
            </svg>
          </div>

          {/* Arched Door Frame Container */}
          <div className="relative w-56 sm:w-68 aspect-[3/4.8] rounded-t-full border-4 border-[#1A0D08] bg-[#1A0D08] overflow-hidden shadow-2xl [perspective:1000px]">
            {/* Interior Warm Golden Room Light */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFE4A0] via-[#F8D08C] to-[#E4A352] flex flex-col items-center justify-center p-4">
              <span className="text-3xl animate-pulse">🐾</span>
            </div>

            {/* Arched Wooden Door Leaf */}
            <div
              ref={doorRef}
              className="absolute inset-0 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.34,1.3,0.4,1)] z-20"
              style={{
                backgroundColor: "#A8481C",
                transform: doorAjar ? "rotateY(-36deg)" : "rotateY(0deg)",
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 28px, rgba(42,23,16,0.3) 28px, rgba(42,23,16,0.35) 30px)",
              }}
            >
              {/* Round Window with Warm Light */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 size-14 sm:size-16 rounded-full border-3 border-[#1A0D08] bg-[#FFE4A0] shadow-[0_0_15px_rgba(255,228,160,0.8)] flex items-center justify-center overflow-hidden">
                <div className="size-full border-t border-b border-[#1A0D08] opacity-60" />
                <div className="absolute inset-0 border-l border-r border-[#1A0D08] opacity-60" />
              </div>

              {/* Brass Doorknob */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 size-4 rounded-full bg-[#FFE4A0] border-2 border-[#1A0D08] shadow-md" />
            </div>
          </div>

          {/* Warm Light Spill on the Floor when door is ajar */}
          <div
            ref={lightSpillRef}
            className={`absolute bottom-6 w-80 sm:w-96 h-20 transition-opacity duration-1000 pointer-events-none z-10 ${
              doorAjar ? "opacity-75" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(254, 228, 160, 0.65) 0%, rgba(248, 208, 140, 0.35) 50%, transparent 80%)",
            }}
          />

          {/* Doormat "welcome home" */}
          <div className="relative z-20 mt-2 px-8 py-2.5 rounded-xl bg-[#C27D2E] border-2 border-[#1A0D08] shadow-md">
            <span className="font-scrawl text-sm sm:text-base font-bold text-[#1A0D08]">
              welcome home
            </span>
          </div>

          {/* Potted Plant beside entrance (mounted to the right) */}
          <div className="absolute bottom-4 right-4 sm:right-10 z-20 drop-shadow-md">
            <svg viewBox="0 0 50 70" className="w-10 sm:w-14 h-auto">
              {/* Pot */}
              <polygon points="12,42 38,42 34,65 16,65" fill="#8E3F15" stroke="#1A0D08" strokeWidth="2" />
              {/* Green Leaves */}
              <ellipse cx="25" cy="30" rx="14" ry="10" fill="#2E6F40" stroke="#1A0D08" strokeWidth="1.5" />
              <ellipse cx="18" cy="22" rx="10" ry="7" fill="#3D8B53" stroke="#1A0D08" strokeWidth="1.5" />
              <ellipse cx="32" cy="22" rx="10" ry="7" fill="#3D8B53" stroke="#1A0D08" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Mascot trotting in from the left */}
          <div
            ref={mascotRef}
            className="absolute bottom-4 left-0 sm:left-4 z-30 w-16 sm:w-20 drop-shadow-lg"
          >
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
        </div>

        {/* Action Buttons */}
        <div
          ref={ctaButtonsRef}
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-chunky-dark flex items-center justify-center gap-2.5 text-base shadow-[0_5px_0_#1A0D08]"
          >
            <MessageCircle className="size-5 text-[#2A1710]" />
            <span>Enquire on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="btn-chunky-outline flex items-center justify-center gap-2 text-base shadow-[0_5px_0_#1A0D08]"
          >
            <MapPin className="size-5 text-[#A8481C]" />
            <span>Visit &amp; contact</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
