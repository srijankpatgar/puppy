"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Puppy } from "@/types/puppy";
import { Video } from "lucide-react";

// Distinct warm door colors matching the boutique showroom palette
const DOOR_COLORS = [
  "#a24a1a", // Deep toffee
  "#785838", // Cocoa oak
  "#8e3f15", // Terracotta
  "#b2733f", // Warm cedar
  "#c2622b", // Golden toffee
  "#6a3c20", // Espresso walnut
  "#965028", // Russet chestnut
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
  const doorColor = DOOR_COLORS[index % DOOR_COLORS.length];
  const hasVideo = puppy.media?.some((m) => m.kind === "video");

  return (
    <li
      className="tp-door group"
      data-open={isDoorOpen ? "true" : "false"}
      onMouseEnter={() => setLocalOpen(true)}
      onMouseLeave={() => setLocalOpen(false)}
    >
      <Link
        href={`/puppies/${puppy.slug}`}
        className="tp-door__link focus:outline-none focus-visible:ring-2 focus-visible:ring-honey"
        style={{ "--door": doorColor } as React.CSSProperties}
      >
        {/* Puppy Plate: Name & Metadata */}
        <span className="tp-door__plate">
          <span className="font-display tp-door__name text-cocoa transition-colors group-hover:text-toffee">
            {puppy.name}
          </span>
          <span className="tp-door__meta flex items-center justify-center gap-1.5 text-cocoa-soft text-xs sm:text-sm">
            <span>
              {puppy.breed}, {puppy.genderLabel.toLowerCase()}, {puppy.age}
            </span>
            {hasVideo && (
              <span className="inline-flex items-center gap-0.5 text-toffee font-medium">
                <Video className="size-3.5" />
                <span className="text-[11px]">video</span>
              </span>
            )}
          </span>
        </span>

        {/* 3D Arched Door Frame */}
        <span className="tp-door__frame">
          {/* Room inside displaying the puppy */}
          <span className="tp-door__room">
            <Image
              src={puppy.cover.url}
              alt={puppy.cover.alt || `${puppy.name}, ${puppy.breed} puppy`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 16rem, (min-width: 640px) 40vw, 85vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </span>

          {/* 3D Doorway with swinging door leaf */}
          <span aria-hidden="true" className="tp-door__way">
            <span
              className={`tp-door__leaf ${isDoorOpen ? "door-is-open" : ""}`}
              style={{ backgroundColor: doorColor }}
            >
              {/* Paw-shaped brass peephole */}
              <svg
                viewBox="0 0 64 64"
                className="tp-door__peephole drop-shadow-sm"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>

              {/* Golden brass doorknob */}
              <span className="tp-door__knob shadow-md ring-1 ring-cocoa/30" />
            </span>
          </span>

          {/* Availability Status Tag Badge */}
          <span className="tp-door__tag font-bold tracking-wider uppercase text-[11px]">
            {puppy.status === "available" ? "Available" : "Gone home"}
          </span>
        </span>
      </Link>
    </li>
  );
}
