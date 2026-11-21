import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Plane } from "lucide-react";

export function TwoWaysSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-cocoa/10">
      <div className="gutter">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-scrawl text-toffee text-lg">
            convenient &amp; trusted
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa mt-2">
            Two ways to meet your puppy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Card 1: Puppies in Dubai (Showroom) */}
          <div className="flex flex-col rounded-3xl bg-white border border-cocoa/10 overflow-hidden shadow-sm hover:shadow-md hover:border-honey transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-cocoa/5">
              <Image
                src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-milk/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-cocoa shadow-sm">
                  <MapPin className="size-3.5 text-toffee" />
                  <span>In our showroom</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-display text-2xl font-bold text-cocoa">
                  Puppies in Dubai
                </h3>
                <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
                  See them, love them, take them home. Come meet our locally
                  available puppies before you decide.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cocoa/10">
                <Link
                  href="/puppies?origin=local"
                  className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group"
                >
                  <span>Meet local puppies</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Imported for you */}
          <div className="flex flex-col rounded-3xl bg-white border border-cocoa/10 overflow-hidden shadow-sm hover:shadow-md hover:border-honey transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sky/30 flex items-center justify-center p-8">
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-milk/95 backdrop-blur px-5 py-2.5 text-sm font-bold text-cocoa shadow-md">
                  <span>Korea</span>
                  <Plane className="size-4 text-toffee" />
                  <span>Dubai</span>
                </div>
                <p className="mt-4 font-scrawl text-lg text-cocoa-soft">
                  Hand-selected Korean champion bloodlines
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-display text-2xl font-bold text-cocoa">
                  Imported for you
                </h3>
                <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
                  Exclusive Korean teacup puppies, delivered. Order from the
                  world&apos;s most reputable breeders and let us handle the import.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cocoa/10">
                <Link
                  href="/puppies?origin=imported"
                  className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group"
                >
                  <span>See imported puppies</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
