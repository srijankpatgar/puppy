import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import reviewsData from "@/data/reviews.json";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Happy families",
  description:
    "Heartwarming stories and photos of TeddyPups teacup puppies with their loving families across Dubai, Abu Dhabi, and the UAE.",
};

export default function HappyFamiliesPage() {
  const { featuredTestimonial, stories } = reviewsData;

  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <Heart className="size-4 fill-toffee text-toffee" />
            <span>our wall of happy endings</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            Happy families
          </h1>
          <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
            Nothing makes us happier than seeing our puppies in loving homes! Here
            are some beautiful moments shared by our amazing clients after
            welcoming their furry friends.
          </p>
          <div className="mt-4">
            <span className="inline-block rounded-full bg-honey/30 px-4 py-1 text-xs font-bold text-toffee uppercase tracking-wider">
              64 moments and counting
            </span>
          </div>
        </div>

        {/* Featured Testimonial Quote Spotlight */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-honey/15 border border-honey/30 p-8 sm:p-12 text-center relative shadow-sm">
          <span className="font-display text-7xl text-honey/60 leading-none select-none absolute top-4 left-6">
            “
          </span>
          <blockquote className="font-display text-lg sm:text-2xl text-cocoa font-medium leading-relaxed italic relative z-10">
            {featuredTestimonial.quote}
          </blockquote>
          <div className="mt-6 font-scrawl text-base sm:text-lg text-toffee font-semibold">
            {featuredTestimonial.author}, {featuredTestimonial.location}
          </div>
        </div>

        {/* Client Photo Stories Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group flex flex-col rounded-3xl bg-white border border-cocoa/15 p-3.5 shadow-sm hover:shadow-md hover:border-honey transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-cocoa/5 mb-3">
                <Image
                  src={story.image}
                  alt={story.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-2 space-y-1">
                <p className="text-sm font-bold text-cocoa">
                  {story.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-cocoa-soft">
                  <span>{story.breed}</span>
                  <span className="text-toffee font-medium">{story.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Adopt */}
        <div className="pt-8 text-center max-w-3xl mx-auto">
          <div className="rounded-3xl bg-cocoa text-milk p-8 sm:p-12 space-y-4 shadow-xl">
            <span className="font-scrawl text-honey text-lg">join the family</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Ready to find your own furry family member?
            </h2>
            <p className="text-milk/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Browse our currently available puppies in Downtown Dubai or speak
              with our adoption concierge.
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
