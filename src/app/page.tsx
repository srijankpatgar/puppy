import { HeroSection } from "@/components/home/HeroSection";
import { MeetThePups } from "@/components/home/MeetThePups";
import { TwoWaysSection } from "@/components/home/TwoWaysSection";
import { ShowroomDoorPortal } from "@/components/home/ShowroomDoorPortal";
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

      {/* 2. Meet the Pups (15 authentic 3D door puppy cards + Meet them all) */}
      <MeetThePups />

      {/* 3. Two ways to meet your puppy (Showroom vs Imported) */}
      <TwoWaysSection />

      {/* 4. Interactive Grand Showroom Double-Door Portal Showcase */}
      <ShowroomDoorPortal />

      {/* 5. Your puppy journey (3 steps + interactive WhatsApp chat widget) */}
      <PuppyJourney />

      {/* 6. Why families trust TeddyPups (4 trust pillars) */}
      <TrustBadges />

      {/* 7. Happy families & puppies (Featured testimonial + 8 photo stories) */}
      <HappyFamiliesSection />

      {/* 8. Questions, answered (Interactive FAQ preview) */}
      <FaqPreviewSection />

      {/* 9. Ready to meet your new best friend? (Final CTA) */}
      <BottomCtaSection />
    </main>
  );
}
