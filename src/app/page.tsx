import { HeroSection } from "@/components/home/HeroSection";
import { MeetThePups } from "@/components/home/MeetThePups";
import { TwoWaysSection } from "@/components/home/TwoWaysSection";
import { PuppyJourney } from "@/components/home/PuppyJourney";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HappyFamiliesSection } from "@/components/home/HappyFamiliesSection";
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection";
import { BottomCtaSection } from "@/components/home/BottomCtaSection";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero with Puppy Lineup Carousel & Banner */}
      <HeroSection />

      {/* 2. Meet the Pups (15 available puppies + Meet them all card) */}
      <MeetThePups />

      {/* 3. Two ways to meet your puppy (Showroom vs Imported) */}
      <TwoWaysSection />

      {/* 4. Your puppy journey (3 steps + interactive WhatsApp chat widget) */}
      <PuppyJourney />

      {/* 5. Why families trust TeddyPups (4 trust pillars) */}
      <TrustBadges />

      {/* 6. Happy families & puppies (Featured testimonial + 8 photo stories) */}
      <HappyFamiliesSection />

      {/* 7. Questions, answered (Interactive FAQ preview) */}
      <FaqPreviewSection />

      {/* 8. Ready to meet your new best friend? (Final CTA) */}
      <BottomCtaSection />
    </main>
  );
}
