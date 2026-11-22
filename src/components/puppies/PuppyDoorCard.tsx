"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Puppy } from "@/types/puppy";
import { Video } from "lucide-react";
import { TeddyMascot } from "@/components/common/TeddyMascot";

// Warm wooden door leaf tones from reference
const DOOR_LEAF_COLORS = [
  "#5A2E14", // Dark brown mahogany
  "#8E3F15", // Rich terracotta walnut
  "#A8481C", // Deep toffee cedar
  "#785838", // Cocoa oak
  "#B2733F", // Golden teak
];

interface PuppyDoorCardProps {
  puppy: Puppy;
  index?: number;
  priority?: boolean;
  onNavigate?: () => void;
}

export function PuppyDoorCard({
  puppy,
  index = 0,
  priority = false,
  onNavigate,
}: PuppyDoorCardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTouchToggled, setIsTouchToggled] = useState<boolean | null>(null);

  // Automatically swing doors open on mobile / touch when scrolled into view
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Slight stagger between columns
          const staggerMs = (index % 2) * 120;
          const timer = setTimeout(() => {
            setIsInView(true);
          }, staggerMs);
          return () => clearTimeout(timer);
        } else {
          setIsInView(false);
          setIsTouchToggled(null);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const isOpen =
    isTouchToggled !== null ? isTouchToggled : isHovered || isInView;

  const doorColor = DOOR_LEAF_COLORS[index % DOOR_LEAF_COLORS.length];
  const hasVideo = puppy.media?.some((m) => m.kind === "video");

  const displayTitle = puppy.name || puppy.displayName || puppy.breed;
  const displaySubtitle = puppy.name
    ? `${puppy.breed}, ${puppy.genderLabel.toLowerCase()}, ${puppy.age}`
    : `${puppy.genderLabel.toLowerCase()}, ${puppy.age}`;

  const toggleDoorTouch = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTouchToggled((prev) => (prev === null ? !isOpen : !prev));
  };

  return (
    <li
      ref={cardRef}
      data-mascot-slot={index === 0 ? "doors-bottom-left" : undefined}
      className="tp-door group relative list-none select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/puppies/${puppy.slug}`}
        onClick={onNavigate}
        className={`tp-door__link block rounded-2xl focus:outline-none transition-transform duration-300 ${
          isOpen ? "-translate-y-2" : ""
        }`}
      >
        {/* Puppy Plate: Name in bold serif + small detail line below */}
        <span className="tp-door__plate block text-center mb-2.5">
          <span className="font-display font-extrabold text-xl sm:text-2xl text-[#2A1710] group-hover:text-[#A8481C] transition-colors block">
            {displayTitle}
          </span>
          <span className="tp-door__meta flex items-center justify-center gap-1.5 text-[#5A2E14]/80 text-xs sm:text-sm font-semibold mt-0.5">
            <span>{displaySubtitle}</span>
            {hasVideo && (
              <span className="inline-flex items-center gap-0.5 text-[#A8481C] font-bold">
                <Video className="size-3.5" />
                <span className="text-[11px]">video</span>
              </span>
            )}
          </span>
        </span>

        {/* Arched Door Frame with 3D Perspective */}
        <span className="tp-door__frame block relative aspect-[4/5.2] rounded-t-full border-3 border-[#2A1710] bg-[#1F110A] shadow-md group-hover:shadow-2xl transition-all [perspective:900px]">
          {/* Puppy Photo inside arched room */}
          <span className="tp-door__room absolute inset-0 size-full overflow-hidden rounded-t-full">
            <Image
              src={puppy.cover.url}
              alt={puppy.cover.alt || `${displayTitle}, ${puppy.breed}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 85vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                isOpen ? "scale-108" : "scale-100"
              }`}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/40 via-transparent to-transparent pointer-events-none" />
          </span>

          {/* 3D Swinging Door Leaf - OPENS ON HOVER (DESKTOP) & IN-VIEW SCROLL / TAP (MOBILE) */}
          <span
            aria-hidden="true"
            className="tp-door__way absolute inset-0 rounded-t-full overflow-hidden"
          >
            <span
              onClick={toggleDoorTouch}
              className="tp-door__leaf absolute inset-y-0 left-0 w-full origin-left rounded-t-full border-r-3 border-[#2A1710] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.85,0.25,1)] cursor-pointer"
              style={{
                backgroundColor: doorColor,
                transform: isOpen ? "rotateY(-78deg)" : "rotateY(0deg)",
                WebkitTransform: isOpen ? "rotateY(-78deg)" : "rotateY(0deg)",
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 24px, rgba(42,23,16,0.28) 24px, rgba(42,23,16,0.32) 26px), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(0,0,0,0.22) 100%)",
              }}
            >
              {/* Inner Decorative Bevel */}
              <span className="absolute inset-[8%_10%_6%] rounded-t-full rounded-b-md border-2 border-white/25 pointer-events-none" />

              {/* Engraved Subtle Paw Print on upper-left of door leaf */}
              <span className="absolute left-4 top-1/3 -translate-y-1/2 opacity-35 text-[#FFF6E5]">
                <svg className="size-6 fill-current" viewBox="0 0 64 64">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
              </span>

              {/* Golden Brass Oval Knob */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-4.5 rounded-full bg-gradient-to-br from-[#FFE4A0] via-[#F8D08C] to-[#C27D2E] border-2 border-[#2A1710] shadow-md" />
            </span>
          </span>

          {/* Tilted White "Available" Sticker Pill on top right overlapping arch border */}
          <span
            className="tp-door__tag absolute -top-2 -right-2 z-20 bg-white text-[#2A1710] font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider px-3 py-1 rounded-full border-2 border-[#2A1710] shadow-sm transform rotate-[8deg]"
          >
            {puppy.status === "available" ? "Available" : "Gone home"}
          </span>

          {/* Thick Brown Base threshold step */}
          <span className="absolute -bottom-2 -inset-x-2 h-2.5 rounded-sm bg-[#5A2E14] border-2 border-[#2A1710] shadow-sm" />

          {/* Mascot peeking at bottom-left corner of first door (matches reference video) */}
          {index === 0 && (
            <div className="absolute -bottom-8 -left-5 z-30 pointer-events-none w-20 sm:w-26">
              <TeddyMascot pose="head-peek" />
            </div>
          )}
        </span>
      </Link>
    </li>
  );
}
