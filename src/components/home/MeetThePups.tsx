import Link from "next/link";
import { Puppy } from "@/types/puppy";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import puppiesData from "@/data/puppies.json";
import { ArrowRight, Sparkles } from "lucide-react";

export function MeetThePups() {
  const allPuppies = puppiesData as Puppy[];
  // Get 15 available puppies
  const availablePuppies = allPuppies
    .filter((p) => p.status === "available")
    .slice(0, 15);

  return (
    <section className="py-16 sm:py-24 bg-milk/50 border-t border-cocoa/10">
      <div className="gutter">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
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
            </p>
          </div>

          <Link
            href="/puppies"
            className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group transition-colors"
          >
            <span>See all available puppies</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 15 Available Puppy Cards + 1 "Meet them all" Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availablePuppies.map((puppy, idx) => (
            <PuppyCard key={puppy.slug} puppy={puppy} priority={idx < 4} />
          ))}

          {/* 16th Card: Meet them all */}
          <Link
            href="/puppies"
            className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cocoa/25 bg-white/40 p-8 text-center hover:border-honey hover:bg-honey/10 transition-all duration-300 min-h-[360px]"
          >
            <div className="size-16 rounded-full bg-honey flex items-center justify-center text-cocoa shadow-sm group-hover:scale-110 transition-transform mb-4">
              <ArrowRight className="size-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-cocoa group-hover:text-toffee transition-colors">
              Meet them all
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-cocoa-soft max-w-xs">
              Explore our full collection of rare, miniature teacup puppies.
            </p>
            <span className="mt-6 inline-flex rounded-full bg-cocoa text-milk px-5 py-2 text-xs font-bold uppercase tracking-wider group-hover:bg-toffee transition-colors">
              View gallery
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
