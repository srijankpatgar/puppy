"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";

// Authentic real puppy photos for the Arch photo strip
const ARCH_PUPPIES = [
  {
    name: "Max",
    breed: "Korean Teacup Maltipoo",
    slug: "maltipoo-max-male",
    image: "/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    tilt: "-3deg",
  },
  {
    name: "Chloe",
    breed: "Korean Teacup Maltipoo",
    slug: "korean-teacup-maltipoo-female",
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
    tilt: "4deg",
  },
  {
    name: "Bella",
    breed: "Korean Teacup Poodle",
    slug: "korean-teacup-poodle-female",
    image: "/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
    tilt: "-4deg",
  },
  {
    name: "Teddy",
    breed: "Maltipoo & Cavapoo",
    slug: "maltipoo-cavapoo-male",
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    tilt: "3deg",
  },
  {
    name: "Milo",
    breed: "Toy Poodle",
    slug: "toy-poodle-male-female",
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    tilt: "-5deg",
  },
  {
    name: "Luna",
    breed: "Mini Pomeranian",
    slug: "pomeranian-female",
    image: "/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    tilt: "4deg",
  },
];

// Rotating friendly mascot speech bubbles along scroll
const RUNNER_SPEECHES = [
  "every puppy is family! 🐾",
  "Korea to Dubai, safely! ✈️",
  "100% vet-checked & healthy! ✨",
  "Meet them in our showroom! 🏡",
];

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rot: number;
}

export function HeroSection() {
  const [activeArch, setActiveArch] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState<1 | -1>(1);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const lastScrollY = useRef(0);
  const lastPawX = useRef(0);
  const printIdRef = useRef(0);

  // Monitor scroll for the hero runner mascot
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const heroHeight = rect.height;
          const windowHeight = window.innerHeight;

          // Calculate progress through hero (0 to 1)
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;
          if (Math.abs(delta) > 2) {
            setScrollDir(delta > 0 ? 1 : -1);
          }
          lastScrollY.current = currentY;

          const progress = Math.min(Math.max(-rect.top / (heroHeight - 100), 0), 1);
          setScrollProgress(progress);

          // Add paw prints along the runner's path
          const currentX = progress * 85; // percentage across section
          if (Math.abs(currentX - lastPawX.current) > 7 && progress > 0.05 && progress < 0.95) {
            lastPawX.current = currentX;
            printIdRef.current += 1;
            const newPrint: PawPrint = {
              id: printIdRef.current,
              x: currentX,
              y: Math.sin(progress * 12) * 6,
              rot: delta > 0 ? 12 : -12,
            };
            setPawPrints((prev) => [...prev.slice(-8), newPrint]);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speechIndex = Math.min(
    Math.floor(scrollProgress * RUNNER_SPEECHES.length),
    RUNNER_SPEECHES.length - 1
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-quilt-cream text-center"
    >
      <div className="gutter flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-block font-scrawl text-lg sm:text-xl text-[#A8481C] tracking-wide mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          every puppy is family
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2A1710] max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-500">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subhead */}
        <p className="mt-5 max-w-2xl text-base sm:text-xl text-[#5A2E14] leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Chunky Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
          <Link
            href="/puppies"
            className="w-full sm:w-auto btn-chunky text-center"
          >
            View available puppies
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-chunky-outline text-center flex items-center justify-center gap-2"
          >
            <MessageCircle className="size-4 text-[#A8481C]" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Arch-Shaped Photo Strip sitting on Scalloped Edge */}
        <div className="relative mt-16 sm:mt-20 w-full max-w-5xl">
          {/* Half-visible Mascot Peeking Between Arches in the Center */}
          <div className="absolute -top-14 sm:-top-20 left-1/2 -translate-x-1/2 z-20 w-28 sm:w-36 pointer-events-none drop-shadow-[0_8px_16px_rgba(42,23,16,0.22)]">
            <svg
              viewBox="0 0 240 180"
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Fluffy Head */}
              <g>
                {/* Ears */}
                <ellipse
                  cx="54"
                  cy="70"
                  rx="24"
                  ry="44"
                  fill="#E4A352"
                  stroke="#2A1710"
                  strokeWidth="4"
                  transform="rotate(12 54 70)"
                />
                <ellipse
                  cx="186"
                  cy="70"
                  rx="24"
                  ry="44"
                  fill="#E4A352"
                  stroke="#2A1710"
                  strokeWidth="4"
                  transform="rotate(-12 186 70)"
                />

                {/* Head circle */}
                <circle
                  cx="120"
                  cy="76"
                  r="56"
                  fill="#F8D08C"
                  stroke="#2A1710"
                  strokeWidth="4.5"
                />
                <circle
                  cx="120"
                  cy="26"
                  r="18"
                  fill="#F8D08C"
                  stroke="#2A1710"
                  strokeWidth="4"
                />

                {/* Snout */}
                <ellipse cx="120" cy="94" rx="28" ry="22" fill="#FFF6E5" />
                {/* Cheeks */}
                <circle cx="82" cy="88" r="8" fill="#F9B9A6" opacity="0.8" />
                <circle cx="158" cy="88" r="8" fill="#F9B9A6" opacity="0.8" />

                {/* Blinking / Happy Eyes */}
                <ellipse cx="98" cy="68" rx="6" ry="7" fill="#2A1710" />
                <ellipse cx="142" cy="68" rx="6" ry="7" fill="#2A1710" />
                <circle cx="96" cy="66" r="2.2" fill="#FFFFFF" />
                <circle cx="140" cy="66" r="2.2" fill="#FFFFFF" />

                {/* Nose & Smile */}
                <path
                  d="M112 88 Q120 83 128 88 Q125 96 120 97 Q115 96 112 88 Z"
                  fill="#2A1710"
                />
                <path
                  d="M120 97 v5 M114 102 q6 6 12 0"
                  stroke="#2A1710"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Collar */}
                <path
                  d="M80 134 Q120 152 160 134 L160 144 Q120 162 80 144 Z"
                  fill="#A8481C"
                  stroke="#2A1710"
                  strokeWidth="3"
                />

                {/* Paws Resting on the Arch Ledge */}
                <ellipse
                  cx="84"
                  cy="150"
                  rx="14"
                  ry="10"
                  fill="#FFF6E5"
                  stroke="#2A1710"
                  strokeWidth="3.5"
                />
                <ellipse
                  cx="156"
                  cy="150"
                  rx="14"
                  ry="10"
                  fill="#FFF6E5"
                  stroke="#2A1710"
                  strokeWidth="3.5"
                />
              </g>
            </svg>
          </div>

          {/* Arches Strip Container */}
          <div className="relative pt-6 pb-2">
            <div className="flex items-end justify-center gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-6 pt-10 no-scrollbar px-4">
              {ARCH_PUPPIES.map((pup, idx) => {
                const isActive = activeArch === idx;

                return (
                  <div
                    key={pup.slug}
                    className="relative flex flex-col items-center group shrink-0"
                    onMouseEnter={() => setActiveArch(idx)}
                    onMouseLeave={() => setActiveArch(null)}
                    onTouchStart={() => setActiveArch(activeArch === idx ? null : idx)}
                  >
                    {/* Spring Pop-up Tilted Label Tag on Hover/Touch */}
                    <div
                      className={`absolute -top-12 z-30 transition-all duration-300 pointer-events-none ${
                        isActive
                          ? "opacity-100 -translate-y-2 scale-100"
                          : "opacity-0 translate-y-2 scale-90"
                      }`}
                      style={{ transform: `rotate(${pup.tilt})` }}
                    >
                      <div className="bg-[#2A1710] text-[#FFF6E5] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-[#F8D08C] whitespace-nowrap">
                        <span className="text-[#F8D08C] mr-1.5">{pup.name}:</span>
                        <span>{pup.breed}</span>
                      </div>
                    </div>

                    {/* Arch-Shaped Photo Window */}
                    <Link
                      href={`/puppies/${pup.slug}`}
                      className={`relative w-28 sm:w-36 md:w-40 aspect-[3/4.4] rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#2A1710] bg-[#3B2215] shadow-md transition-all duration-300 block ${
                        isActive
                          ? "scale-105 -translate-y-2 shadow-2xl ring-4 ring-[#F8D08C]"
                          : "hover:scale-[1.03] hover:-translate-y-1"
                      }`}
                    >
                      <Image
                        src={pup.image}
                        alt={`${pup.name} - ${pup.breed}`}
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/50 via-transparent to-transparent pointer-events-none" />

                      {/* Name Plate at bottom of arch */}
                      <div className="absolute bottom-2 inset-x-2 bg-[#FFF6E5]/90 backdrop-blur-xs py-1 px-2 rounded-lg text-center border border-[#2A1710]/15">
                        <span className="font-display font-bold text-xs sm:text-sm text-[#2A1710] block truncate">
                          {pup.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scalloped Cloud Divider sitting directly under the photo strip */}
          <CloudDivider fill="#F8D08C" className="mt-4" />
        </div>
      </div>

      {/* Scroll-Driven Running Mascot along the bottom */}
      <div
        className="relative w-full h-20 overflow-hidden pointer-events-none select-none mt-2"
        aria-hidden="true"
      >
        {/* Fading Paw Prints Trail */}
        {pawPrints.map((print) => (
          <div
            key={print.id}
            className="absolute bottom-4 transition-opacity duration-1000"
            style={{
              left: `${print.x}%`,
              transform: `translateY(${print.y}px) rotate(${print.rot}deg)`,
              opacity: 0.45,
            }}
          >
            <svg viewBox="0 0 64 64" className="size-4 fill-[#A8481C]">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>
        ))}

        {/* Mascot Running tied to scroll progress */}
        <div
          className="absolute bottom-2 flex flex-col items-center transition-transform duration-100 ease-out"
          style={{
            left: `${Math.min(Math.max(scrollProgress * 85 + 5, 5), 90)}%`,
            transform: `scaleX(${scrollDir})`,
          }}
        >
          {/* Speech bubble */}
          <div
            className="mb-1 bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-[#5A2E14] whitespace-nowrap"
            style={{ transform: `scaleX(${scrollDir})` }}
          >
            {RUNNER_SPEECHES[speechIndex]}
          </div>

          {/* Running Cartoon Mascot SVG */}
          <div className="w-16 h-14">
            <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
              {/* Back Legs */}
              <rect
                x="20"
                y="48"
                width="6"
                height="18"
                rx="3"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="1.5"
                transform={`rotate(${scrollDir * 20} 23 48)`}
              />
              <rect
                x="45"
                y="48"
                width="6"
                height="18"
                rx="3"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="1.5"
                transform={`rotate(${scrollDir * -20} 48 48)`}
              />

              {/* Wagging Tail */}
              <ellipse
                cx="12"
                cy="38"
                rx="10"
                ry="7"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2"
                transform="rotate(-25 12 38)"
              />

              {/* Body */}
              <ellipse
                cx="35"
                cy="42"
                rx="24"
                ry="16"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2.5"
              />

              {/* Front Legs */}
              <rect
                x="26"
                y="50"
                width="6"
                height="18"
                rx="3"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="1.5"
                transform={`rotate(${scrollDir * -20} 29 50)`}
              />
              <rect
                x="52"
                y="50"
                width="6"
                height="18"
                rx="3"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="1.5"
                transform={`rotate(${scrollDir * 20} 55 50)`}
              />

              {/* Head */}
              <circle
                cx="58"
                cy="28"
                r="18"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
              <ellipse
                cx="46"
                cy="22"
                rx="6"
                ry="13"
                fill="#E4A352"
                stroke="#2A1710"
                strokeWidth="2"
                transform="rotate(15 46 22)"
              />
              <ellipse
                cx="70"
                cy="22"
                rx="6"
                ry="13"
                fill="#E4A352"
                stroke="#2A1710"
                strokeWidth="2"
                transform="rotate(-15 70 22)"
              />

              {/* Eyes & Smile */}
              <circle cx="54" cy="26" r="2.5" fill="#2A1710" />
              <circle cx="64" cy="26" r="2.5" fill="#2A1710" />
              <circle cx="60" cy="32" r="2" fill="#2A1710" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
