"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaItem } from "@/types/puppy";
import { Play } from "lucide-react";

interface PuppyGalleryProps {
  media: MediaItem[];
  puppyName: string;
}

export function PuppyGallery({ media, puppyName }: PuppyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeMedia = media[selectedIndex] || media[0];

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Main Active Viewer */}
      <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-cocoa/5 border border-cocoa/10 shadow-md">
        {activeMedia.kind === "video" ? (
          <video
            key={activeMedia.url}
            src={activeMedia.url}
            poster={activeMedia.poster?.url}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover"
          />
        ) : (
          <Image
            key={activeMedia.url}
            src={activeMedia.url}
            alt={activeMedia.alt || `${puppyName} photo`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Thumbnails Carousel / Strip */}
      {media.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {media.map((item, idx) => {
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
                className={`relative size-20 sm:size-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? "border-toffee ring-2 ring-toffee/30 scale-102"
                    : "border-cocoa/15 opacity-75 hover:opacity-100 hover:border-honey"
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${puppyName} thumbnail ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />

                {item.kind === "video" && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white">
                    <Play className="size-5 fill-white text-white drop-shadow" />
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
