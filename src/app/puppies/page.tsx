import { Suspense } from "react";
import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/types/puppy";
import { PuppiesContent } from "./PuppiesContent";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Available puppies",
  description:
    "Explore healthy, vet-checked teacup puppies in Dubai. View our latest available Maltipoo, Pomeranian, Poodle, and Cavapoo puppies.",
};

export default function PuppiesPage() {
  const allPuppies = puppiesData as Puppy[];
  // Filter available puppies for the main /puppies directory
  const availablePuppies = allPuppies.filter((p) => p.status === "available");

  // Extract unique breeds
  const breedSet = new Set<string>();
  availablePuppies.forEach((p) => {
    if (p.breed) breedSet.add(p.breed);
    p.breeds?.forEach((b) => breedSet.add(b.name));
  });
  const breeds = Array.from(breedSet).sort();

  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <Sparkles className="size-4" />
            <span>real puppies, real photos</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            Available puppies
          </h1>
          <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
            Meet your new best friend in our Downtown Dubai showroom, or order an
            exclusive miniature breed imported from trusted breeders.
          </p>
        </div>

        {/* Dynamic Filtered Gallery with Suspense */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-cocoa-soft font-medium animate-pulse">
              Loading available puppies...
            </div>
          }
        >
          <PuppiesContent initialPuppies={availablePuppies} breeds={breeds} />
        </Suspense>
      </div>
    </main>
  );
}
