"use client";

import Link from "next/link";
import { Puppy } from "@/types/puppy";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import puppiesData from "@/data/puppies.json";
import { ArrowRight, Sparkles } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";

interface MeetThePupsProps {
  onDoorClick?: () => void;
}

export function MeetThePups({ onDoorClick }: MeetThePupsProps) {
  const allPuppies = puppiesData as Puppy[];
  // Available puppies
  const availablePuppies = allPuppies
    .filter((p) => p.status === "available")
    .slice(0, 15);

  return (
    <section className="relative py-16 sm:py-24 bg-[#FBF3E4] text-[#2A1710] overflow-hidden select-none">
      {/* Subtle Quilt Diamond Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(168,72,28,0.035) 38px, rgba(168,72,28,0.035) 40px), repeating-linear-gradient(-45deg, transparent, transparent 38px, rgba(168,72,28,0.035) 38px, rgba(168,72,28,0.035) 40px)",
        }}
      />
      <CloudDivider position="top" fill="#FBF3E4" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 font-scrawl text-[#A8481C] text-lg mb-1 font-bold">
              <Sparkles className="size-4" />
              <span>Available now</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A1710]">
              Meet the pups
            </h2>
            <p className="mt-2 text-[#5A2E14] text-sm sm:text-base max-w-xl leading-relaxed">
              Real puppies, real photos, looking for their families right now.
              Hover or tap each door to peek inside!
            </p>
          </div>

          <div>
            {/* Brown Button: "See all available puppies" */}
            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 rounded-full bg-[#5A2E14] text-[#FFF6E5] font-extrabold text-sm uppercase tracking-wider px-6 py-3 border-2 border-[#2A1710] shadow-[0_4px_0_#2A1710] hover:bg-[#A8481C] active:translate-y-0.5 active:shadow-[0_1px_0_#2A1710] transition-all cursor-pointer"
            >
              <span>See all available puppies</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Grid: 2 Columns on Mobile, 4 on Desktop */}
        <ol
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 list-none p-0 m-0"
          aria-label="Available puppies looking for a family"
        >
          {availablePuppies.map((puppy, idx) => (
            <PuppyDoorCard
              key={puppy.slug}
              puppy={puppy}
              index={idx}
              priority={idx < 4}
              onNavigate={onDoorClick}
            />
          ))}

          {/* 16th Card: Explore All */}
          <li className="tp-door list-none">
            <Link
              href="/puppies"
              onClick={onDoorClick}
              className="block rounded-2xl p-4 h-full flex flex-col items-center justify-center text-center bg-[#5A2E14] text-[#FFF6E5] border-3 border-[#2A1710] shadow-md hover:bg-[#A8481C] hover:-translate-y-1 transition-all rounded-t-full"
            >
              <span className="text-3xl mb-2">🐾</span>
              <span className="font-display font-extrabold text-xl text-[#FFF6E5]">
                Meet them all
              </span>
              <span className="mt-2 text-xs font-bold uppercase tracking-wider text-[#F8D08C] inline-flex items-center gap-1">
                <span>View catalogue</span>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </li>
        </ol>
      </div>

      <CloudDivider position="bottom" fill="#F8D08C" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
