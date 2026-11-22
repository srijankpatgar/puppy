"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Puppy } from "@/types/puppy";
import { Video } from "lucide-react";

// Distinct warm rich wooden door tones matching the reference
const WOOD_DOOR_TONES = [
  "#a24a1a", // Deep toffee cedar
  "#785838", // Cocoa oak
  "#8e3f15", // Terracotta walnut
  "#b2733f", // Warm golden teak
  "#c2622b", // Russet chestnut
  "#6a3c20", // Espresso mahogany
  "#965028", // Amber oak
];

interface PuppyDoorCardProps {
  puppy: Puppy;
  forcedOpen?: boolean;
  priority?: boolean;
  index?: number;
}

export function PuppyDoorCard({
  puppy,
  forcedOpen = false,
  priority = false,
  index = 0,
}: PuppyDoorCardProps) {
  const [localOpen, setLocalOpen] = useState(false);

  // If forcedOpen is provided, use it; otherwise use local hover/click state
  const isDoorOpen = forcedOpen || localOpen;
  const doorColor = WOOD_DOOR_TONES[index % WOOD_DOOR_TONES.length];
  const hasVideo = puppy.media?.some((m) => m.kind === "video");

  return (
    <li
      className="tp-door group"
      data-open={isDoorOpen ? "true" : "false"}
      onMouseEnter={() => setLocalOpen(true)}
      onMouseLeave={() => setLocalOpen(false)}
      onTouchStart={() => setLocalOpen((prev) => !prev)}
    >
      <Link
        href={`/puppies/${puppy.slug}`}
        className="tp-door__link focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2be6b]"
        style={{ "--door": doorColor } as React.CSSProperties}
      >
        {/* Puppy Plate: Chunky Serif Name & Details */}
        <span className="tp-door__plate">
          <span className="font-display font-bold text-xl sm:text-2xl tp-door__name text-[#2A1710] transition-colors group-hover:text-[#A8481C]">
            {puppy.name}
          </span>
          <span className="tp-door__meta flex items-center justify-center gap-1.5 text-[#5A2E14]/80 text-xs sm:text-sm font-medium">
            <span>
              {puppy.breed}, {puppy.genderLabel.toLowerCase()}, {puppy.age}
            </span>
            {hasVideo && (
              <span className="inline-flex items-center gap-0.5 text-[#A8481C] font-semibold">
                <Video className="size-3.5" />
                <span className="text-[11px]">video</span>
              </span>
            )}
          </span>
        </span>

        {/* 3D Arched Door Frame */}
        <span className="tp-door__frame shadow-md group-hover:shadow-xl transition-shadow">
          {/* Room inside displaying the puppy */}
          <span className="tp-door__room bg-[#1F110A]">
            <Image
              src={puppy.cover.url}
              alt={puppy.cover.alt || `${puppy.name}, ${puppy.breed} puppy`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 85vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle light vignette inside room */}
            <span className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/40 via-transparent to-transparent pointer-events-none" />

            {/* Small paw trail when door swings open */}
            <span
              className={`absolute bottom-3 left-4 flex gap-1.5 transition-opacity duration-500 pointer-events-none ${
                isDoorOpen ? "opacity-75" : "opacity-0"
              }`}
            >
              <svg viewBox="0 0 64 64" className="size-3.5 fill-[#FFF6E5]/90 -rotate-12">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              <svg viewBox="0 0 64 64" className="size-3 fill-[#FFF6E5]/75 rotate-6">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>
          </span>

          {/* 3D Doorway with swinging wooden door leaf */}
          <span aria-hidden="true" className="tp-door__way">
            <span
              className={`tp-door__leaf tp-door__leaf-wood ${isDoorOpen ? "door-is-open" : ""}`}
              style={{
                backgroundColor: doorColor,
                transform: isDoorOpen ? "rotateY(-78deg)" : "rotateY(0deg)",
              }}
            >
              {/* Vertical panel lines mimicking wooden planks */}
              <span className="absolute inset-y-0 left-1/3 w-[1px] bg-[#2A1710]/30 shadow-[1px_0_1px_rgba(255,255,255,0.15)]" />
              <span className="absolute inset-y-0 left-2/3 w-[1px] bg-[#2A1710]/30 shadow-[1px_0_1px_rgba(255,255,255,0.15)]" />

              {/* Paw-shaped peephole */}
              <svg
                viewBox="0 0 64 64"
                className="tp-door__peephole drop-shadow-sm opacity-60"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>

              {/* Golden brass doorknob with 3D shadow */}
              <span className="tp-door__knob shadow-lg ring-1 ring-[#5A2E14] bg-gradient-to-br from-[#FFE4A0] via-[#F8D08C] to-[#C27D2E]" />
            </span>
          </span>

          {/* Tilted "Available" Sticker Badge */}
          <span
            className="tp-door__tag font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px] shadow-sm transform -rotate-6 border-2 border-[#2A1710]"
            style={{
              backgroundColor: puppy.status === "available" ? "#FFF6E5" : "#F8D08C",
              color: puppy.status === "available" ? "#2A1710" : "#5A2E14",
            }}
          >
            {puppy.status === "available" ? "Available" : "Gone home"}
          </span>
        </span>
      </Link>
    </li>
  );
}
