import { HeroSection } from "@/components/home/HeroSection";
import { MeetThePups } from "@/components/home/MeetThePups";
import { ImportedPlaneSection } from "@/components/home/ImportedPlaneSection";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { PuppyJourney } from "@/components/home/PuppyJourney";
import { HappyFamiliesSection } from "@/components/home/HappyFamiliesSection";
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection";
import { BottomCtaSection } from "@/components/home/BottomCtaSection";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col overflow-x-hidden">
      {/* 1. Hero with Arch Photo Strip, Half Mascot, & Scroll Runner */}
      <HeroSection />

      {/* 2. Available Puppies (Wooden 3D Door Cards) */}
      <MeetThePups />

      {/* 3. Imported For You (Korea to Dubai GSAP MotionPath Plane) */}
      <ImportedPlaneSection />

      {/* 4. Two Ways to Meet Your Puppy (Striped Showroom Booth + Skyline + 4 Trust Points) */}
      <ShowroomSection />

      {/* 5. Your Puppy Journey (3-Step Pop + Big Double Doors Open on Scroll) */}
      <PuppyJourney />

      {/* 6. Happy Families (Polaroids Tilt & Settle Bounce) */}
      <HappyFamiliesSection />

      {/* 7. FAQ Preview (Accordion + Mascot Running Across Bottom) */}
      <FaqPreviewSection />

      {/* 8. Night "Welcome Home" Final CTA (Dark Chocolate + Lantern + Moon + Light Spill) */}
      <BottomCtaSection />
    </main>
  );
}
