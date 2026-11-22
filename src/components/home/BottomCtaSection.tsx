"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BottomCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const porchRef = useRef<HTMLDivElement>(null);
  const doorLeafRef = useRef<HTMLDivElement>(null);
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDoorOpen(true);
      if (doorLeafRef.current) doorLeafRef.current.style.transform = "rotateY(-75deg)";
      return;
    }

    const ctx = gsap.context(() => {
      // WHEN IT ENTERS VIEW: door opens in about 0.4s (rotateY to about -75deg)
      if (porchRef.current && doorLeafRef.current) {
        ScrollTrigger.create({
          trigger: porchRef.current,
          start: "top 72%",
          onEnter: () => {
            setDoorOpen(true);
            gsap.to(doorLeafRef.current, {
              rotateY: -75,
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            setDoorOpen(false);
            gsap.to(doorLeafRef.current, {
              rotateY: 0,
              duration: 0.35,
              ease: "power2.in",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#2A1710] text-[#FFF6E5] overflow-hidden select-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.35) 42px)",
      }}
    >
      <div className="gutter relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-block font-scrawl text-lg sm:text-xl text-[#F8D08C] tracking-wide mb-2">
          welcome home
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FFF6E5] max-w-3xl leading-[1.15]">
          Ready to meet your new best friend?
        </h2>

        {/* Paragraph */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#FFF6E5]/80 leading-relaxed font-medium">
          Bring home a healthy, happy teacup puppy with white-glove guidance every
          step of the way. We help you find the right match and ensure a safe, joyful arrival.
        </p>

        {/* Porch Scene: Wooden plank wall, arched wooden door, glowing lantern on right, potted plant, doormat */}
        <div
          ref={porchRef}
          className="mt-14 relative w-full max-w-md sm:max-w-lg aspect-[4/4.5] flex flex-col items-center justify-end pb-6"
        >
          {/* Glowing Lantern on the RIGHT (soft flicker) */}
          <div className="absolute top-12 right-4 sm:right-10 z-30 tp-lantern-glow">
            <svg viewBox="0 0 60 90" className="w-12 sm:w-16 h-auto drop-shadow-xl">
              <path d="M 50 30 L 35 30 L 35 45" stroke="#1A0D08" strokeWidth="4" fill="none" />
              <polygon points="45,45 25,45 35,35" fill="#1A0D08" />
              <polygon points="43,45 27,45 30,68 40,68" fill="#FFE4A0" stroke="#1A0D08" strokeWidth="2.5" />
              <circle cx="35" cy="56" r="4" fill="#FFA500" />
            </svg>
          </div>

          {/* Arched Wooden Door Frame */}
          <div className="relative w-56 sm:w-68 aspect-[3/4.8] rounded-t-full border-4 border-[#1A0D08] bg-[#1A0D08] overflow-hidden shadow-2xl [perspective:1000px]">
            {/* Doorway Interior: Standing Poodle Puppy with Warm Light Spilling Out */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFE4A0] via-[#F8D08C] to-[#E4A352] flex flex-col items-center justify-end p-2 overflow-hidden">
              <div className="relative w-36 sm:w-44 h-48 sm:h-54">
                <Image
                  src="/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg"
                  alt="Standing teacup puppy in doorway"
                  fill
                  sizes="200px"
                  className="object-cover rounded-t-full"
                />
              </div>
            </div>

            {/* Left Door Leaf (Hinged on left, opens 0.4s to rotateY -75deg) */}
            <div
              ref={doorLeafRef}
              className="absolute inset-0 origin-left border-r border-[#1A0D08] z-20 shadow-2xl"
              style={{
                backgroundColor: "#A8481C",
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 28px, rgba(42,23,16,0.3) 28px, rgba(42,23,16,0.35) 30px)",
                transform: doorOpen ? "rotateY(-75deg)" : "rotateY(0deg)",
              }}
            >
              {/* Round Window with Warm Light */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 size-14 sm:size-16 rounded-full border-3 border-[#1A0D08] bg-[#FFE4A0] shadow-[0_0_15px_rgba(255,228,160,0.8)] flex items-center justify-center overflow-hidden">
                <div className="size-full border-t border-b border-[#1A0D08] opacity-60" />
                <div className="absolute inset-0 border-l border-r border-[#1A0D08] opacity-60" />
              </div>

              {/* Brass Knob */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 size-4 rounded-full bg-[#FFE4A0] border-2 border-[#1A0D08] shadow-md" />
            </div>
          </div>

          {/* Warm Light Spill onto Porch Floor */}
          <div
            className={`absolute bottom-6 w-80 sm:w-96 h-20 transition-opacity duration-500 pointer-events-none z-10 ${
              doorOpen ? "opacity-80" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(254, 228, 160, 0.75) 0%, rgba(248, 208, 140, 0.4) 50%, transparent 80%)",
            }}
          />

          {/* Doormat "welcome home" */}
          <div className="relative z-20 mt-2 px-8 py-2.5 rounded-xl bg-[#C27D2E] border-2 border-[#1A0D08] shadow-md">
            <span className="font-scrawl text-sm sm:text-base font-bold text-[#1A0D08]">
              welcome home
            </span>
          </div>

          {/* Potted Plant beside entrance (on the left) */}
          <div className="absolute bottom-4 left-4 sm:left-10 z-20 drop-shadow-md">
            <svg viewBox="0 0 50 70" className="w-10 sm:w-14 h-auto">
              <polygon points="12,42 38,42 34,65 16,65" fill="#8E3F15" stroke="#1A0D08" strokeWidth="2" />
              <ellipse cx="25" cy="30" rx="14" ry="10" fill="#2E6F40" stroke="#1A0D08" strokeWidth="1.5" />
              <ellipse cx="18" cy="22" rx="10" ry="7" fill="#3D8B53" stroke="#1A0D08" strokeWidth="1.5" />
              <ellipse cx="32" cy="22" rx="10" ry="7" fill="#3D8B53" stroke="#1A0D08" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Buttons: Green "Enquire on WhatsApp" + Outlined "Visit & contact" */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] border-2 border-[#1E4E36] py-3.5 px-8 text-sm font-black uppercase tracking-wider text-white shadow-[0_4px_0_#1E4E36] hover:brightness-105 active:translate-y-0.5 active:shadow-[0_1px_0_#1E4E36] transition-all cursor-pointer"
          >
            <MessageCircle className="size-5 fill-white text-[#25D366]" />
            <span>Enquire on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="btn-chunky-outline py-3.5 px-8 text-sm shadow-[0_4px_0_#1A0D08] flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="size-5 text-[#A8481C]" />
            <span>Visit &amp; contact</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
