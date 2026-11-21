"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Puppy } from "@/types/puppy";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import { PuppyFilters } from "@/components/puppies/PuppyFilters";
import { Frown } from "lucide-react";

interface PuppiesContentProps {
  initialPuppies: Puppy[];
  breeds: string[];
}

export function PuppiesContent({ initialPuppies, breeds }: PuppiesContentProps) {
  const searchParams = useSearchParams();

  const currentBreed = searchParams.get("breed") || "all";
  const currentOrigin = searchParams.get("origin") || "all";
  const currentGender = searchParams.get("gender") || "all";
  const currentSort = searchParams.get("sort") || "default";

  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter((p) => {
      // 1. Breed filter
      if (currentBreed !== "all") {
        const breedNormalized = currentBreed.toLowerCase().replace(/-/g, " ");
        const matchSlug = p.breeds?.some((b) => b.slug.toLowerCase() === currentBreed.toLowerCase());
        const matchName = p.breed.toLowerCase().includes(breedNormalized);
        if (!matchSlug && !matchName) return false;
      }

      // 2. Origin filter
      if (currentOrigin !== "all") {
        if (p.origin?.slug !== currentOrigin) return false;
      }

      // 3. Gender filter
      if (currentGender !== "all") {
        if (p.gender !== currentGender) return false;
      }

      return true;
    }).sort((a, b) => {
      if (currentSort === "name-asc") return a.name.localeCompare(b.name);
      if (currentSort === "name-desc") return b.name.localeCompare(a.name);
      if (currentSort === "age") {
        const getMonths = (ageStr: string) => {
          const match = ageStr.match(/([0-9.]+)/);
          return match ? parseFloat(match[1]) : 99;
        };
        return getMonths(a.age) - getMonths(b.age);
      }
      return 0;
    });
  }, [initialPuppies, currentBreed, currentOrigin, currentGender, currentSort]);

  return (
    <div className="space-y-10">
      {/* Interactive Filters Bar */}
      <PuppyFilters breeds={breeds} totalResults={filteredPuppies.length} />

      {/* Puppies Grid */}
      {filteredPuppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.slug} puppy={puppy} priority={idx < 4} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/60 rounded-3xl border border-cocoa/10 p-8">
          <div className="size-16 rounded-full bg-honey/30 mx-auto flex items-center justify-center text-cocoa mb-4">
            <Frown className="size-8 text-toffee" />
          </div>
          <h3 className="font-display text-2xl font-bold text-cocoa">
            No puppies match your filter
          </h3>
          <p className="mt-2 text-cocoa-soft text-sm max-w-md mx-auto">
            Try adjusting your search criteria or reset filters to see all available puppies in our Dubai showroom.
          </p>
        </div>
      )}
    </div>
  );
}
