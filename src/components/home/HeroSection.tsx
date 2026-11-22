"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { TeddyMascot } from "@/components/common/TeddyMascot";

export interface HeroArchItem {
  name: string;
  breed: string;
  slug: string;
  image: string;
  heightClass: string;
  widthClass: string;
  visibilityClass: string;
}

export const HERO_ARCH_LEFT: HeroArchItem[] = [
  // 0. Far Left (small, ~110-135px desktop)
  {
    name: "Max & Leo",
    breed: "Teacup Maltipoo",
    slug: "maltipoo-max-male",
    image: "/media/4wOJk9azop_-%2F65ecf66bf0%2F27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg",
    heightClass: "h-[105px] sm:h-[120px] lg:h-[135px]",
    widthClass: "w-20 sm:w-26 lg:w-30",
    visibilityClass: "hidden lg:flex",
  },
  // 1. Left Middle (tall, ~190-230px desktop)
  {
    name: "Teddy & Bella",
    breed: "Maltipoo & Cavapoo",
    slug: "maltipoo-cavapoo-male",
    image: "/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg",
    heightClass: "h-[165px] sm:h-[195px] lg:h-[225px]",
    widthClass: "w-24 sm:w-30 lg:w-36",
    visibilityClass: "hidden sm:flex",
  },
  // 2. Left Center (medium, ~140-175px desktop, visible on mobile)
  {
    name: "Bella & Milo",
    breed: "Korean Teacup Poodle",
    slug: "korean-teacup-poodle-female",
    image: "/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg",
    heightClass: "h-[130px] sm:h-[155px] lg:h-[175px]",
    widthClass: "w-22 sm:w-28 lg:w-32",
    visibilityClass: "flex",
  },
];

export const HERO_ARCH_RIGHT: HeroArchItem[] = [
  // 3. Right Center (medium-tall, ~155-195px desktop, visible on mobile)
  {
    name: "Chloe",
    breed: "Korean Teacup Maltipoo",
    slug: "korean-teacup-maltipoo-female",
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    heightClass: "h-[145px] sm:h-[170px] lg:h-[195px]",
    widthClass: "w-24 sm:w-28 lg:w-34",
    visibilityClass: "flex",
  },
  // 4. Right Middle (tall, ~190-240px desktop)
  {
    name: "Oreo",
    breed: "Shih Tzu",
    slug: "shitzu-female",
    image: "/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    heightClass: "h-[175px] sm:h-[205px] lg:h-[235px]",
    widthClass: "w-26 sm:w-32 lg:w-38",
    visibilityClass: "hidden sm:flex",
  },
  // 5. Far Right (medium-small, ~110-140px desktop)
  {
    name: "Luna",
    breed: "Pomeranian",
    slug: "pomeranian-female",
    image: "/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    heightClass: "h-[110px] sm:h-[125px] lg:h-[140px]",
    widthClass: "w-20 sm:w-26 lg:w-30",
    visibilityClass: "hidden lg:flex",
  },
];

export const HERO_ARCH_PUPPIES = [...HERO_ARCH_LEFT, ...HERO_ARCH_RIGHT];

interface HeroSectionProps {
  activeArchIndex?: number;
  onSelectArch?: (index: number) => void;
}

export function HeroSection({
  activeArchIndex,
  onSelectArch,
}: HeroSectionProps = {}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>("korean-teacup-maltipoo-female");

  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-5rem)] flex flex-col justify-between items-center bg-[#FBF3E4] text-center select-none pt-4 sm:pt-7 md:pt-9">
      {/* Subtle Quilt Diamond Texture & Golden Peach Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 28%, rgba(248,208,140,0.3) 0%, transparent 65%), repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(168,72,28,0.035) 38px, rgba(168,72,28,0.035) 40px), repeating-linear-gradient(-45deg, transparent, transparent 38px, rgba(168,72,28,0.035) 38px, rgba(168,72,28,0.035) 40px)",
        }}
      />

      {/* 1. TOP TEXT BLOCK */}
      <div className="gutter relative z-10 flex flex-col items-center max-w-4xl px-4">
        {/* Eyebrow text with curved decorative underline */}
        <div className="relative inline-flex flex-col items-center mb-1 sm:mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="font-scrawl text-base sm:text-xl text-[#A8481C] tracking-wide font-bold">
            every puppy is family
          </span>
          <svg
            className="w-24 sm:w-36 h-2 text-[#A8481C]/45 -mt-0.5"
            viewBox="0 0 140 10"
            fill="none"
          >
            <path
              d="M 2 5 Q 70 9 138 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Big Chunky Serif Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A1710] leading-[1.08] animate-in fade-in slide-in-from-bottom-3 duration-500">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subtitle paragraph */}
        <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg text-[#5A2E14] leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-500">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Action Buttons: "View available puppies" (rust brown) + "Enquire on WhatsApp" (cream outline) */}
        <div className="mt-5 sm:mt-6 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
          <Link
            href="/puppies"
            className="inline-flex items-center justify-center rounded-full bg-[#A8481C] text-[#FFF6E5] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-8 py-2.5 sm:py-3.5 border-2 border-[#2A1710] shadow-[0_4px_0_#2A1710] hover:bg-[#8E3F15] active:translate-y-0.5 active:shadow-[0_1px_0_#2A1710] transition-all cursor-pointer"
          >
            View available puppies
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#FFFDF8] text-[#2A1710] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-7 py-2.5 sm:py-3.5 border-2 border-[#2A1710] shadow-[0_4px_0_#2A1710] hover:bg-[#FFF6E5] active:translate-y-0.5 active:shadow-[0_1px_0_#2A1710] transition-all cursor-pointer"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* 2. BOTTOM ARCH WINDOWS ROW & SCALLOPED CREAM WALL */}
      <div className="w-full relative mt-auto pt-6 sm:pt-8 flex flex-col items-center justify-end overflow-visible">
        {/* ROW OF ARCHES + MASCOT IN THE CENTER */}
        <div className="flex items-end justify-center gap-2 sm:gap-3.5 md:gap-4.5 lg:gap-5.5 px-2 sm:px-4 z-10 relative">
          {/* LEFT 3 ARCHES */}
          {HERO_ARCH_LEFT.map((arch, idx) => {
            const isHovered = hoveredSlug === arch.slug;
            return (
              <div
                key={arch.slug}
                className={`relative flex flex-col items-center shrink-0 ${arch.visibilityClass} hero-arch-enter group`}
                style={{
                  animationDelay: `${idx * 80}ms`,
                }}
                onMouseEnter={() => setHoveredSlug(arch.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onTouchStart={() => setHoveredSlug(arch.slug)}
              >
                {/* Handwritten Breed Tag springs in above arch on hover */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none whitespace-nowrap transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 scale-100 -translate-y-1"
                      : "opacity-0 scale-90 translate-y-1"
                  }`}
                >
                  <div className="bg-[#FFFFFF] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3 sm:px-3.5 py-1 rounded-full border-[1.5px] border-[#2A1710] shadow-[0_2px_4px_rgba(42,23,16,0.15)] transform -rotate-3">
                    {arch.breed}
                  </div>
                </div>

                {/* Arched Photo Window */}
                <Link
                  href={`/puppies/${arch.slug}`}
                  className={`relative ${arch.widthClass} ${arch.heightClass} rounded-t-full border-2 border-[#2A1710] bg-[#3B2215] overflow-hidden shadow-sm transition-transform duration-300 ease-out hover:-translate-y-3.5 block cursor-pointer`}
                >
                  <Image
                    src={arch.image}
                    alt={`${arch.name} - ${arch.breed}`}
                    fill
                    sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 180px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/35 via-transparent to-transparent pointer-events-none" />
                </Link>
              </div>
            );
          })}

          {/* CENTER CARTOON MASCOT (TEDDY) PEEKING OVER WALL */}
          <div
            className="relative flex flex-col items-center shrink-0 z-30 hero-arch-enter"
            style={{
              animationDelay: "240ms",
            }}
          >
            <div className="w-28 sm:w-38 md:w-46 lg:w-52 h-auto -mb-2 sm:-mb-3 drop-shadow-md">
              <TeddyMascot pose="head-peek" />
            </div>
          </div>

          {/* RIGHT 3 ARCHES */}
          {HERO_ARCH_RIGHT.map((arch, idx) => {
            const isHovered = hoveredSlug === arch.slug;
            return (
              <div
                key={arch.slug}
                className={`relative flex flex-col items-center shrink-0 ${arch.visibilityClass} hero-arch-enter group`}
                style={{
                  animationDelay: `${(idx + 4) * 80}ms`,
                }}
                onMouseEnter={() => setHoveredSlug(arch.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onTouchStart={() => setHoveredSlug(arch.slug)}
              >
                {/* Handwritten Breed Tag springs in above arch on hover */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none whitespace-nowrap transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 scale-100 -translate-y-1"
                      : "opacity-0 scale-90 translate-y-1"
                  }`}
                >
                  <div className="bg-[#FFFFFF] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3 sm:px-3.5 py-1 rounded-full border-[1.5px] border-[#2A1710] shadow-[0_2px_4px_rgba(42,23,16,0.15)] transform -rotate-3">
                    {arch.breed}
                  </div>
                </div>

                {/* Arched Photo Window */}
                <Link
                  href={`/puppies/${arch.slug}`}
                  className={`relative ${arch.widthClass} ${arch.heightClass} rounded-t-full border-2 border-[#2A1710] bg-[#3B2215] overflow-hidden shadow-sm transition-transform duration-300 ease-out hover:-translate-y-3.5 block cursor-pointer`}
                >
                  <Image
                    src={arch.image}
                    alt={`${arch.name} - ${arch.breed}`}
                    fill
                    sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 180px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/35 via-transparent to-transparent pointer-events-none" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 3. SCALLOPED CREAM WALL COVERING LOWER ~55-60% OF ARCHES */}
        <div className="w-full relative z-20 pointer-events-none select-none -mt-9 sm:-mt-13 md:-mt-16 lg:-mt-18">
          {/* Semicircle Scalloped Bumps with Dashed Stitch Line */}
          <div className="w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 50"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-7 sm:h-9 md:h-12 block"
            >
              {/* Cream wall fill */}
              <path
                d="M0 50 C50 50 60 10 120 10 C180 10 190 50 240 50 C290 50 300 10 360 10 C420 10 430 50 480 50 C530 50 540 10 600 10 C660 10 670 50 720 50 C770 50 780 10 840 10 C900 10 910 50 960 50 C1010 50 1020 10 1080 10 C1140 10 1150 50 1200 50 C1250 50 1260 10 1320 10 C1380 10 1390 50 1440 50 V50 H0 Z"
                fill="#FFF6E5"
              />
              {/* Dark border along scalloped edge */}
              <path
                d="M0 50 C50 50 60 10 120 10 C180 10 190 50 240 50 C290 50 300 10 360 10 C420 10 430 50 480 50 C530 50 540 10 600 10 C660 10 670 50 720 50 C770 50 780 10 840 10 C900 10 910 50 960 50 C1010 50 1020 10 1080 10 C1140 10 1150 50 1200 50 C1250 50 1260 10 1320 10 C1380 10 1390 50 1440 50"
                stroke="#2A1710"
                strokeWidth="2"
                fill="none"
              />
              {/* Dashed stitch line inside each bump */}
              <path
                d="M0 43 C50 43 60 16 120 16 C180 16 190 43 240 43 C290 43 300 16 360 16 C420 16 430 43 480 43 C530 43 540 16 600 16 C660 16 670 43 720 43 C770 43 780 16 840 16 C900 16 910 43 960 43 C1010 43 1020 16 1080 16 C1140 16 1150 43 1200 43 C1250 43 1260 16 1320 16 C1380 16 1390 43 1440 43"
                stroke="rgba(42, 23, 16, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Wall lower panel with faint diamond pattern */}
          <div
            className="w-full h-8 sm:h-12 md:h-16 bg-[#FFF6E5] border-b border-[#2A1710]/10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 24px, rgba(42,23,16,0.045) 24px 25px), repeating-linear-gradient(-45deg, transparent 0 24px, rgba(42,23,16,0.045) 24px 25px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
