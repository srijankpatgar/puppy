"use client";

import { useState } from "react";
import { HeroSection, HERO_ARCH_PUPPIES } from "@/components/home/HeroSection";
import { MeetThePups } from "@/components/home/MeetThePups";
import { ImportedPlaneSection } from "@/components/home/ImportedPlaneSection";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { PuppyJourney } from "@/components/home/PuppyJourney";
import { HappyFamiliesSection } from "@/components/home/HappyFamiliesSection";
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection";
import { BottomCtaSection } from "@/components/home/BottomCtaSection";

export default function HomePage() {
  const [activeArchIndex, setActiveArchIndex] = useState(2); // Center arch default

  return (
    <main className="flex-1 flex flex-col overflow-x-hidden relative">
      {/* B) Hero with Headline, CTAs, Full-width Arch Strip, & Center Mascot */}
      <HeroSection
        activeArchIndex={activeArchIndex}
        onSelectArch={setActiveArchIndex}
      />

      {/* C) Meet the Pups (Arched Door Cards, 2-col Mobile / 4-col Desktop) */}
      <MeetThePups />

      {/* E) Imported For You (Pinned, Arrow Signboard, Korea to Dubai Plane) */}
      <ImportedPlaneSection />

      {/* F) Two Ways to Meet Your Puppy (Arrow Signboard, Striped Booth, Skyline Bars) */}
      <ShowroomSection />

      {/* G) Your Puppy Journey (Steps 1, 2, 3 + Phone WhatsApp Mockup) */}
      <PuppyJourney />

      {/* H) Why Families Trust + Happy Families (Double Border Card + Polaroids Tilt) */}
      <HappyFamiliesSection />

      {/* I) Night Wall + FAQ (Planks Transition, Lantern, Stars, Star Bullets) */}
      <FaqPreviewSection />

      {/* J) Ready to Meet Your Best Friend (Porch, Door Opens to Puppy, Green Button) */}
      <BottomCtaSection />
    </main>
  );
}
