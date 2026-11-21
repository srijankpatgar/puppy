"use client";

import { useState } from "react";
import Link from "next/link";
import { Puppy } from "@/types/puppy";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import puppiesData from "@/data/puppies.json";
import { ArrowRight, Sparkles, DoorOpen, DoorClosed } from "lucide-react";

export function MeetThePups() {
  const allPuppies = puppiesData as Puppy[];
  // Get 15 authentic available puppies
  const availablePuppies = allPuppies
    .filter((p) => p.status === "available")
    .slice(0, 15);

  const [allDoorsOpen, setAllDoorsOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-milk/50 border-t border-cocoa/10">
      <div className="gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 font-scrawl text-toffee text-base mb-1">
              <Sparkles className="size-4" />
              <span>Available now</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa">
              Meet the pups
            </h2>
            <p className="mt-2 text-cocoa-soft text-sm sm:text-base max-w-xl">
              Real puppies, real photos, looking for their families right now.
              Hover or click each door to peek inside!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Master Door Open/Close Switch */}
            <button
              type="button"
              onClick={() => setAllDoorsOpen(!allDoorsOpen)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xs ${
                allDoorsOpen
                  ? "border-toffee bg-toffee text-milk hover:bg-toffee-deep"
                  : "border-cocoa/20 bg-white text-cocoa hover:border-toffee hover:text-toffee"
              }`}
            >
              {allDoorsOpen ? (
                <>
                  <DoorClosed className="size-4" />
                  <span>Close all doors</span>
                </>
              ) : (
                <>
                  <DoorOpen className="size-4 text-toffee" />
                  <span>Open all doors</span>
                </>
              )}
            </button>

            <Link
              href="/puppies"
              className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group transition-colors ml-1"
            >
              <span>See all available puppies</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 15 3D Puppy Doors + 1 "Meet them all" Door */}
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

          {/* 16th Portal Door: Meet them all */}
          <li className="tp-door tp-door--all">
            <Link
              href="/puppies"
              className="tp-door__link group block focus:outline-none focus-visible:ring-2 focus-visible:ring-honey"
            >
              <span className="tp-door__plate">
                <span className="font-display tp-door__name text-cocoa group-hover:text-toffee transition-colors">
                  Explore all
                </span>
                <span className="tp-door__meta text-cocoa-soft text-xs sm:text-sm">
                  View full showroom
                </span>
              </span>

              <span className="tp-door__frame tp-door__frame--all rounded-t-full border-2 border-dashed border-cocoa/30 p-6 flex flex-col items-center justify-center text-center group-hover:border-honey group-hover:bg-honey/10 transition-all duration-300">
                <div className="size-16 rounded-full bg-honey flex items-center justify-center text-cocoa shadow-sm group-hover:scale-110 transition-transform mb-3">
                  <ArrowRight className="size-7 text-cocoa" />
                </div>
                <span className="font-display text-xl sm:text-2xl font-bold text-cocoa group-hover:text-toffee transition-colors">
                  Meet them all
                </span>
                <span className="mt-4 inline-flex rounded-full bg-cocoa text-milk px-4 py-1.5 text-xs font-bold uppercase tracking-wider group-hover:bg-toffee transition-colors shadow-xs">
                  View gallery
                </span>
              </span>
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
