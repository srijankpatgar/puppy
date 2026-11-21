import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Sparkles,
  MapPin,
  Plane,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Clock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Learn about our step-by-step concierge adoption process, South Korea import logistics, showroom visits, and doorstep delivery across the UAE.",
};

export default function HowItWorksPage() {
  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-16 sm:space-y-24">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <Sparkles className="size-4" />
            <span>simple, transparent &amp; joyful</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            How it works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-cocoa-soft leading-relaxed">
            Whether you choose to visit us locally in Downtown Dubai or order a
            rare miniature breed from overseas, TeddyPups is here to make the
            experience purely magical and transparent.
          </p>

          {/* Quick Nav Anchors */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <a
              href="#two-ways"
              className="rounded-full bg-white border border-cocoa/15 px-4 py-2 text-cocoa hover:border-toffee hover:text-toffee transition-colors shadow-sm"
            >
              1. Two ways home
            </a>
            <a
              href="#promise"
              className="rounded-full bg-white border border-cocoa/15 px-4 py-2 text-cocoa hover:border-toffee hover:text-toffee transition-colors shadow-sm"
            >
              2. Our puppy promise
            </a>
            <a
              href="#delivery"
              className="rounded-full bg-white border border-cocoa/15 px-4 py-2 text-cocoa hover:border-toffee hover:text-toffee transition-colors shadow-sm"
            >
              3. Delivery &amp; collection
            </a>
            <a
              href="#why-us"
              className="rounded-full bg-white border border-cocoa/15 px-4 py-2 text-cocoa hover:border-toffee hover:text-toffee transition-colors shadow-sm"
            >
              4. Why choose us
            </a>
          </div>
        </div>

        {/* Section 1: Two Ways Home */}
        <section id="two-ways" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-scrawl text-toffee text-base">step 01</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Two ways home
            </h2>
            <p className="mt-2 text-sm sm:text-base text-cocoa-soft">
              Choose the path that fits your schedule and lifestyle best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Showroom path */}
            <div className="rounded-3xl bg-white border border-cocoa/10 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-toffee font-semibold text-xs uppercase tracking-wider mb-2">
                  <MapPin className="size-4" />
                  <span>In Dubai &bull; Meet in person</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cocoa">
                  Meet your puppy in person
                </h3>
                <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
                  Step into our Downtown Dubai showroom and experience the joy
                  of meeting our puppies first-hand. Bond with them, cuddle, and
                  find your perfect match.
                </p>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-cocoa font-medium">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>Instant same-day adoption available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>Spend unhurried quality time bonding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>Meet licensed on-site pet care specialists</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/puppies?origin=local"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-honey py-3 px-6 text-xs font-bold uppercase tracking-wider text-cocoa hover:bg-honey-soft transition-colors"
              >
                <span>View local puppies</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Imported path */}
            <div className="rounded-3xl bg-white border border-cocoa/10 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-toffee font-semibold text-xs uppercase tracking-wider mb-2">
                  <Plane className="size-4" />
                  <span>Imported &bull; Order upon request</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cocoa">
                  Exclusive Korean bloodlines
                </h3>
                <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
                  Looking for an ultra-rare micro teacup or special coat
                  pattern? We partner with the world&apos;s most reputable
                  registered breeders in South Korea to safely bring your dream
                  puppy to Dubai.
                </p>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-cocoa font-medium">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>Verified pedigree &amp; champion lineage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>Full photo, video &amp; medical updates beforehand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-honey" />
                    <span>VIP flight transport &amp; customs handled 100%</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/puppies?origin=imported"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 py-3 px-6 text-xs font-bold uppercase tracking-wider text-cocoa hover:bg-cocoa/5 transition-colors"
              >
                <span>View imported puppies</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Our Premium Puppy Promise */}
        <section id="promise" className="scroll-mt-24 rounded-3xl bg-honey/15 border border-honey/30 p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="font-scrawl text-toffee text-base">step 02</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Our premium puppy promise
            </h2>
            <p className="mt-2 text-sm sm:text-base text-cocoa-soft">
              Every single puppy that joins a family through TeddyPups is backed
              by rigorous medical and health standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/80 shadow-sm space-y-3">
              <div className="size-12 rounded-full bg-honey/30 mx-auto flex items-center justify-center text-toffee">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-cocoa">
                100% Vet Certified
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft">
                Full physical examinations by licensed veterinarians, complete
                with vaccination card and deworming treatments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 shadow-sm space-y-3">
              <div className="size-12 rounded-full bg-honey/30 mx-auto flex items-center justify-center text-toffee">
                <HeartHandshake className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-cocoa">
                Ethical &amp; Responsible
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft">
                Zero puppy mills. We only collaborate with boutique home breeders
                who treat parent dogs like family members.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 shadow-sm space-y-3">
              <div className="size-12 rounded-full bg-honey/30 mx-auto flex items-center justify-center text-toffee">
                <Clock className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-cocoa">
                24/7 Lifelong Care
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft">
                Our support doesn&apos;t end at delivery. We guide you through
                diet, potty training, and settling-in for weeks to come.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Delivery & Collection (#delivery) */}
        <section id="delivery" className="scroll-mt-24 space-y-8 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <span className="font-scrawl text-toffee text-base">step 03</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Delivery &amp; collection
            </h2>
            <p className="mt-2 text-sm sm:text-base text-cocoa-soft">
              Smooth, secure, and stress-free handover anywhere in the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-xl bg-cocoa text-milk flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cocoa">
                    Showroom Collection (Downtown Dubai)
                  </h3>
                  <p className="mt-1 text-sm text-cocoa-soft leading-relaxed">
                    Pick up your puppy directly from our showroom. We prepare a
                    welcome starter kit including food, vitamins, and familiar
                    scented toys to ease their first night.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pt-4 border-t border-cocoa/10">
                <div className="size-10 rounded-xl bg-toffee text-milk flex items-center justify-center shrink-0 shadow-sm">
                  <Truck className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cocoa">
                    Doorstep VIP Delivery across the UAE
                  </h3>
                  <p className="mt-1 text-sm text-cocoa-soft leading-relaxed">
                    Prefer private home delivery? Our pet concierge travels
                    with your puppy in climate-controlled transport to Dubai,
                    Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-cocoa/10">
              <Image
                src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                alt="Puppy collection at TeddyPups showroom Dubai"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Why Choose Us */}
        <section id="why-us" className="scroll-mt-24 pt-8 border-t border-cocoa/10">
          <div className="rounded-3xl bg-white border border-cocoa/15 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
            <span className="font-scrawl text-toffee text-lg">
              the TeddyPups standard
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-cocoa">
              Ready to begin your journey?
            </h2>
            <p className="text-cocoa-soft text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Message our concierge team today on WhatsApp to check current
              showroom availability or request a custom Korean miniature import.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppUrl("Hi TeddyPups! I'm reading through How It Works and would love guidance on choosing a puppy.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
              >
                <MessageCircle className="size-4" />
                <span>Speak with our concierge</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
