import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowRight, MessageCircle } from "lucide-react";

const breedOptions = [
  { name: "Maltipoo", slug: "maltipoo" },
  { name: "Pomeranian", slug: "pomeranian" },
  { name: "Poodle", slug: "poodle" },
  { name: "Cavapoo", slug: "cavapoo" },
  { name: "Shih Tzu", slug: "shih-tzu" },
];

const showroomPhotos = [
  {
    url: "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
    alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
  },
  {
    url: "/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
    alt: "The apricot teddy bear puppy from our showroom, close up",
  },
  {
    url: "/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
    alt: "The apricot teddy bear puppy from our showroom, looking up",
  },
  {
    url: "/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
    alt: "The apricot teddy bear puppy from our showroom, held up to say hello",
  },
];

export function PuppyJourney() {
  return (
    <section className="py-16 sm:py-24 bg-milk border-t border-cocoa/10 overflow-hidden">
      <div className="gutter">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-scrawl text-toffee text-lg">
            concierge adoption
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa mt-2">
            Your puppy journey
          </h2>
          <p className="mt-3 text-cocoa-soft text-sm sm:text-base leading-relaxed">
            A premium, step-by-step concierge experience. We make adoption
            simple, secure, and purely joyful.
          </p>
        </div>

        {/* 3 Steps + Interactive Chat Simulation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-honey font-display text-base font-bold text-cocoa shadow-sm">
                1
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cocoa">
                  Choose your breed
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-cocoa-soft leading-relaxed">
                  Select your preferred breed or tell us what you&apos;re looking
                  for. We&apos;ll guide you based on availability and your lifestyle.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-honey font-display text-base font-bold text-cocoa shadow-sm">
                2
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cocoa">
                  Get photos &amp; details
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-cocoa-soft leading-relaxed">
                  Our team will share real photos, health details, and all
                  necessary information directly on WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-honey font-display text-base font-bold text-cocoa shadow-sm">
                3
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-cocoa">
                  Secure &amp; safe delivery
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-cocoa-soft leading-relaxed">
                  Once confirmed, we handle everything professionally and ensure
                  your puppy reaches you safely and stress-free.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cocoa hover:border-toffee hover:text-toffee hover:bg-cocoa/5 transition-all"
              >
                <span>How it works</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic WhatsApp Concierge Chat Widget Simulation */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-cocoa/15 bg-[#efeae2] shadow-xl overflow-hidden max-w-lg mx-auto">
              {/* WhatsApp Chat Header */}
              <div className="bg-[#005c4b] text-white px-5 py-3.5 flex items-center gap-3">
                <div className="relative size-10 rounded-full overflow-hidden bg-white/20 shrink-0">
                  <Image
                    src="/brand/logo.png"
                    alt="TeddyPups U.A.E."
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">TeddyPups U.A.E.</div>
                  <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    online
                  </div>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm">
                {/* User sent bubble */}
                <div className="flex justify-end">
                  <div className="bg-[#d9fdd3] text-cocoa rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-sm">
                    Hi TeddyPups! I&apos;d love to know more about your puppies.
                  </div>
                </div>

                {/* Team response bubble */}
                <div className="flex justify-start">
                  <div className="bg-white text-cocoa rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[90%] shadow-sm space-y-2">
                    <p>
                      Select your preferred breed or tell us what you&apos;re looking
                      for. We&apos;ll guide you based on availability and your
                      lifestyle.
                    </p>

                    {/* Breed pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {breedOptions.map((b) => (
                        <Link
                          key={b.slug}
                          href={`/puppies?breed=${b.slug}`}
                          className="inline-block rounded-full bg-honey/30 hover:bg-honey px-3 py-1 text-xs font-semibold text-cocoa transition-colors"
                        >
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4-photo showroom mini gallery */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none p-2 max-w-[90%] shadow-sm">
                    <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
                      {showroomPhotos.map((photo, i) => (
                        <div
                          key={i}
                          className="relative aspect-square w-28 sm:w-36 bg-cocoa/5 overflow-hidden"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.alt}
                            fill
                            sizes="150px"
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team details bubble */}
                <div className="flex justify-start">
                  <div className="bg-white text-cocoa rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] shadow-sm">
                    Our team will share real photos, health details, and all
                    necessary information directly on WhatsApp.
                  </div>
                </div>

                {/* Final reassurance bubble */}
                <div className="flex justify-start">
                  <div className="bg-white text-cocoa rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] shadow-sm">
                    Once confirmed, we handle everything professionally and
                    ensure your puppy reaches you safely and stress-free.
                  </div>
                </div>
              </div>

              {/* Bottom WhatsApp CTA trigger */}
              <div className="p-4 bg-white/70 border-t border-cocoa/10">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-honey py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
                >
                  <MessageCircle className="size-4" />
                  <span>Say hello on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
