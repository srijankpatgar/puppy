import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/types/puppy";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gone home",
  description:
    "See all the beautiful teacup and miniature puppies who have found their forever families in Dubai and across the UAE.",
};

export default function GoneHomePage() {
  const allPuppies = puppiesData as Puppy[];
  // Filter gone-home puppies
  const goneHomePuppies = allPuppies.filter((p) => p.status === "gone-home");

  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <Heart className="size-4 fill-toffee text-toffee" />
            <span>forever families</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            Gone home
          </h1>
          <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
            Cherished members of loving families across Dubai and the UAE. Each one
            journeyed safely into the hearts of their new forever home.
          </p>
        </div>

        {/* 27 Flight Ticket Style Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goneHomePuppies.map((puppy) => (
            <Link
              key={puppy.slug}
              href={`/puppies/${puppy.slug}`}
              className="group relative flex flex-col sm:flex-row items-center rounded-3xl bg-white border border-cocoa/15 shadow-sm overflow-hidden hover:border-honey hover:shadow-md transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative size-32 sm:size-36 shrink-0 m-3 rounded-2xl overflow-hidden bg-cocoa/5">
                <Image
                  src={puppy.cover.url}
                  alt={puppy.cover.alt || puppy.name}
                  fill
                  sizes="150px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Ticket Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between w-full">
                <div>
                  <span className="font-scrawl text-xs text-toffee block mb-0.5">
                    one ticket home
                  </span>
                  <h3 className="font-display text-2xl font-bold text-cocoa group-hover:text-toffee transition-colors">
                    {puppy.name}
                  </h3>
                  <p className="text-xs text-cocoa-soft mt-0.5">
                    {puppy.breed}
                    {puppy.genderLabel ? `, ${puppy.genderLabel.toLowerCase()}` : ""}
                  </p>
                </div>

                {/* Route Strip */}
                <div className="mt-4 pt-3 border-t border-dashed border-cocoa/15 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-cocoa-soft">
                  <span>TeddyPups</span>
                  <span className="text-toffee font-semibold">&mdash;&mdash;&gt;</span>
                  <span className="text-toffee font-bold flex items-center gap-1">
                    <span>home</span>
                    <Heart className="size-2.5 fill-toffee" />
                  </span>
                </div>
              </div>

              {/* Ticket Stub Notch */}
              <div
                aria-hidden="true"
                className="hidden sm:flex flex-col items-center justify-center border-l border-dashed border-cocoa/20 px-3 py-4 bg-honey/10 text-[10px] font-bold uppercase tracking-widest text-cocoa/60 [writing-mode:vertical-rl] select-none"
              >
                admit one
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="pt-8 text-center">
          <div className="rounded-3xl bg-honey/20 border border-honey/40 p-8 sm:p-12 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-base">
              <Sparkles className="size-4" />
              <span>ready for your own?</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-cocoa">
              Meet our available puppies today
            </h2>
            <p className="text-cocoa-soft text-sm sm:text-base max-w-md mx-auto">
              Our Downtown Dubai showroom welcomes families daily to find their
              dream companion.
            </p>
            <div className="pt-2">
              <Link
                href="/puppies"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
              >
                <span>View available puppies</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
