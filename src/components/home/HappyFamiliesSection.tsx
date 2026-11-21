import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import reviewsData from "@/data/reviews.json";

export function HappyFamiliesSection() {
  const { featuredTestimonial, stories } = reviewsData;

  return (
    <section className="py-16 sm:py-24 border-t border-cocoa/10">
      <div className="gutter">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1.5 font-scrawl text-toffee text-lg mb-1">
            <Heart className="size-4 fill-toffee text-toffee" />
            <span>forever homes</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa">
            Happy families &amp; puppies
          </h2>
          <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
            We are truly honored to see our puppies become cherished members of
            loving families. These heartwarming moments have been shared by our
            valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>

        {/* Featured Testimonial Quote */}
        <div className="max-w-3xl mx-auto mb-16 rounded-3xl bg-honey/15 border border-honey/30 p-8 sm:p-10 text-center relative shadow-sm">
          <span className="font-display text-6xl text-honey/60 leading-none select-none absolute top-4 left-6">
            “
          </span>
          <blockquote className="font-display text-lg sm:text-2xl text-cocoa font-medium leading-relaxed italic relative z-10">
            {featuredTestimonial.quote}
          </blockquote>
          <div className="mt-6 font-scrawl text-base text-toffee font-semibold">
            {featuredTestimonial.author}, {featuredTestimonial.location}
          </div>
        </div>

        {/* 8 Photo Story Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group flex flex-col rounded-2xl bg-white border border-cocoa/10 p-2.5 sm:p-3 shadow-sm hover:shadow-md hover:border-honey transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-cocoa/5 mb-3">
                <Image
                  src={story.image}
                  alt={story.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-cocoa text-center truncate px-1">
                {story.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/happy-families"
            className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-cocoa hover:border-toffee hover:text-toffee hover:bg-cocoa/5 transition-all group"
          >
            <span>See every happy family</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
