"use client";

import { useState } from "react";
import Link from "next/link";
import { Puppy } from "@/types/puppy";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import { TeddyBuddy } from "@/components/common/TeddyBuddy";
import puppiesData from "@/data/puppies.json";
import { ArrowRight, Sparkles, DoorOpen, DoorClosed } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";

export function MeetThePups() {
  const allPuppies = puppiesData as Puppy[];
  // Get 15 authentic available puppies
  const availablePuppies = allPuppies
    .filter((p) => p.status === "available")
    .slice(0, 15);

  const [allDoorsOpen, setAllDoorsOpen] = useState(false);

  return (
    <section className="relative py-16 sm:py-24 bg-quilt-cream text-[#2A1710] overflow-hidden">
      <CloudDivider position="top" fill="#F8D08C" className="absolute top-0 inset-x-0" />

      <div className="gutter relative z-10 pt-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 relative">
          <div>
            <div className="flex items-center gap-2 font-scrawl text-[#A8481C] text-lg mb-1 font-bold">
              <Sparkles className="size-4" />
              <span>Available now</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#2A1710]">
              Meet the pups
            </h2>
            <p className="mt-2 text-[#5A2E14] text-sm sm:text-base max-w-xl leading-relaxed">
              Real puppies, real photos, looking for their families right now.
              Hover or tap each wooden door to peek inside!
            </p>
          </div>

          {/* Skin-coloured Teddy puppy greeting visitors at the doors */}
          <div className="hidden lg:block absolute -top-16 right-0 w-28 sm:w-32 filter drop-shadow-[0_6px_12px_rgba(42,23,16,0.18)] pointer-events-auto">
            <TeddyBuddy pose="sit" facing="left" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Master Door Open/Close Switch */}
            <button
              type="button"
              onClick={() => setAllDoorsOpen(!allDoorsOpen)}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-[#5A2E14] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_3px_0_#5A2E14] ${
                allDoorsOpen
                  ? "bg-[#A8481C] text-[#FFF6E5] hover:bg-[#8E3F15]"
                  : "bg-[#FFF6E5] text-[#2A1710] hover:bg-white"
              }`}
            >
              {allDoorsOpen ? (
                <>
                  <DoorClosed className="size-4" />
                  <span>Close all doors</span>
                </>
              ) : (
                <>
                  <DoorOpen className="size-4 text-[#A8481C]" />
                  <span>Open all doors</span>
                </>
              )}
            </button>

            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#A8481C] hover:text-[#5A2E14] group transition-colors ml-1"
            >
              <span>See all available puppies</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 15 3D Puppy Wooden Doors + 1 "Meet them all" Door */}
        <ol className="tp-doors" aria-label="Available puppies looking for a family">
          {availablePuppies.map((puppy, idx) => (
            <PuppyDoorCard
              key={puppy.slug}
              puppy={puppy}
              index={idx}
              forcedOpen={allDoorsOpen}
              priority={idx < 4}
            />
          ))}

          {/* 16th Portal Door: Explore all */}
          <li className="tp-door tp-door--all">
            <Link
              href="/puppies"
              className="tp-door__link group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2be6b]"
            >
              <span className="tp-door__plate">
                <span className="font-display font-bold text-xl sm:text-2xl tp-door__name text-[#2A1710] group-hover:text-[#A8481C] transition-colors">
                  Explore all
                </span>
                <span className="tp-door__meta text-[#5A2E14]/80 text-xs sm:text-sm">
                  View full catalogue
                </span>
              </span>

              <span className="tp-door__frame border-3 border-[#2A1710] bg-[#5A2E14] group-hover:border-[#A8481C] transition-colors shadow-md">
                <span className="tp-door__room flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#785838] to-[#3B2215]">
                  <span className="text-3xl mb-2">🐾</span>
                  <span className="font-display font-bold text-lg text-[#FFF6E5]">
                    Browse All Pups
                  </span>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#F8D08C] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Enter</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        </ol>
      </div>

      <CloudDivider position="bottom" fill="#F8D08C" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
