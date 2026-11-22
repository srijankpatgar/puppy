"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaItem } from "@/types/puppy";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

interface PuppyGalleryProps {
  media: MediaItem[];
  puppyName: string;
}

export function PuppyGallery({ media, puppyName }: PuppyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = media && media.length > 0 ? media : [];
  const total = items.length || 1;
  const activeMedia = items[selectedIndex] || items[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6 select-none">
      {/* Arched Frame with Stacked-Card Edge Behind It */}
      <div className="relative mx-auto max-w-md">
        {/* Stacked Card Edge Behind Frame */}
        <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-t-full rounded-b-3xl border-3 border-[#2A1710] bg-[#F8D08C] shadow-lg pointer-events-none" />
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-t-full rounded-b-3xl border-3 border-[#2A1710] bg-[#FFF6E5] pointer-events-none" />

        {/* Foreground Arched Frame */}
        <div className="relative aspect-[3/4.2] w-full rounded-t-full rounded-b-3xl overflow-hidden border-3 border-[#2A1710] bg-[#1F110A] shadow-xl">
          {activeMedia?.kind === "video" ? (
            <video
              key={activeMedia.url}
              src={activeMedia.url}
              poster={activeMedia.poster?.url}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-cover transition-all duration-500 ease-out"
            />
          ) : (
            <div className="relative size-full transition-transform duration-500 ease-out scale-100 hover:scale-102">
              <Image
                key={activeMedia?.url}
                src={activeMedia?.url || "/media/placeholder.jpg"}
                alt={activeMedia?.alt || `${puppyName} photo`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* "1/2" Pill with Prev/Next Arrows */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF6E5]/95 backdrop-blur-md px-3.5 py-1.5 border-2 border-[#2A1710] shadow-md text-xs font-black text-[#2A1710]">
              <button
                type="button"
                onClick={handlePrev}
                className="hover:text-[#A8481C] active:scale-90 transition-transform p-0.5 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-4" />
              </button>

              <span className="tracking-widest font-mono">
                {selectedIndex + 1}/{total}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="hover:text-[#A8481C] active:scale-90 transition-transform p-0.5 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Below with soft slide & scale transition */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar max-w-md mx-auto">
          {items.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            const thumbUrl =
              item.kind === "video" && item.poster?.url
                ? item.poster.url
                : item.url;

            return (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative size-18 sm:size-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 focus:outline-none cursor-pointer ${
                  isSelected
                    ? "border-[#2A1710] ring-3 ring-[#F8D08C] scale-105 shadow-md"
                    : "border-[#2A1710]/20 opacity-70 hover:opacity-100 hover:scale-102"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${puppyName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />

                {item.kind === "video" && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white">
                    <Play className="size-4 fill-white text-white drop-shadow" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
