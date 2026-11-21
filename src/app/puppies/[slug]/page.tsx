import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/types/puppy";
import { siteConfig } from "@/config/site";
import { getPuppyEnquiryUrl } from "@/lib/whatsapp";
import { PuppyGallery } from "@/components/puppies/PuppyGallery";
import { PuppyCard } from "@/components/puppies/PuppyCard";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
} from "lucide-react";

interface PuppyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const puppies = puppiesData as Puppy[];
  return puppies.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PuppyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const puppies = puppiesData as Puppy[];
  const puppy = puppies.find((p) => p.slug === slug);

  if (!puppy) {
    return {
      title: "Puppy Not Found",
    };
  }

  const title = `${puppy.name}, ${puppy.breed} puppy`;
  const description =
    puppy.seoDescription ||
    `Meet ${puppy.name}, a healthy ${puppy.age} ${puppy.genderLabel.toLowerCase()} ${puppy.breed} puppy in Dubai. Vet-checked, vaccinated and microchipped.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: puppy.cover.url,
          width: puppy.cover.width || 800,
          height: puppy.cover.height || 1000,
          alt: `${puppy.name}, ${puppy.breed}`,
        },
      ],
    },
  };
}

export default async function PuppyDetailPage({ params }: PuppyPageProps) {
  const { slug } = await params;
  const puppies = puppiesData as Puppy[];
  const puppy = puppies.find((p) => p.slug === slug);

  if (!puppy) {
    notFound();
  }

  // Related puppies (available puppies excluding this one)
  const relatedPuppies = puppies
    .filter((p) => p.status === "available" && p.slug !== puppy.slug)
    .slice(0, 3);

  const enquiryUrl = getPuppyEnquiryUrl(puppy.name, puppy.breed, puppy.slug);

  return (
    <main className="py-10 sm:py-16 flex-1">
      <div className="gutter space-y-12">
        {/* Back navigation link */}
        <div>
          <Link
            href={puppy.status === "gone-home" ? "/gone-home" : "/puppies"}
            className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep transition-colors group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>
              {puppy.status === "gone-home"
                ? "Back to adopted puppies"
                : "Back to available puppies"}
            </span>
          </Link>
        </div>

        {/* 2-Column Puppy Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-6">
            <PuppyGallery
              media={puppy.media && puppy.media.length > 0 ? puppy.media : [puppy.cover]}
              puppyName={puppy.name}
            />
          </div>

          {/* Right Column: Puppy Specs, Passport & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header / Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center rounded-full bg-milk/90 px-3 py-1 text-xs font-bold text-cocoa border border-cocoa/15 shadow-sm">
                  {puppy.status === "available" ? (
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Available in Dubai
                    </span>
                  ) : (
                    <span className="text-toffee flex items-center gap-1">
                      <Heart className="size-3 fill-toffee" />
                      Gone Home (Adopted)
                    </span>
                  )}
                </span>

                {puppy.origin?.name && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-honey/20 border border-honey/40 px-3 py-1 text-xs font-semibold text-cocoa">
                    <MapPin className="size-3 text-toffee" />
                    <span>{puppy.origin.name}</span>
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-cocoa">
                {puppy.name}
              </h1>
              <p className="font-scrawl text-xl text-toffee mt-1">
                {puppy.breed} &bull; {puppy.genderLabel}
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-cocoa/10 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-cocoa-soft/70 block">
                  Breed
                </span>
                <span className="font-display text-base font-bold text-cocoa mt-0.5 block truncate">
                  {puppy.breed}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cocoa/10 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-cocoa-soft/70 block">
                  Gender
                </span>
                <span className="font-display text-base font-bold text-cocoa mt-0.5 block">
                  {puppy.genderLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cocoa/10 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-cocoa-soft/70 block">
                  Age
                </span>
                <span className="font-display text-base font-bold text-cocoa mt-0.5 block">
                  {puppy.age}
                </span>
              </div>
            </div>

            {/* Description if present */}
            {puppy.description && (
              <div className="text-cocoa-soft text-sm sm:text-base leading-relaxed bg-white/60 p-5 rounded-2xl border border-cocoa/10">
                <p>{puppy.description}</p>
              </div>
            )}

            {/* Puppy Passport & Health Guarantee Block */}
            <div className="p-6 rounded-3xl bg-honey/15 border border-honey/30 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-toffee" />
                <h3 className="font-display text-lg font-bold text-cocoa">
                  TeddyPups Passport &amp; Health Guarantee
                </h3>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-cocoa font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Licensed vet health certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Up to date vaccinations &amp; deworming</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>ISO standard microchipped</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>24/7 post-adoption care guidance</span>
                </li>
              </ul>
            </div>

            {/* Direct Action CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-full bg-honey py-4 px-6 text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft active:scale-95 transition-all"
              >
                <MessageCircle className="size-5 shrink-0" />
                <span>Enquire on WhatsApp about {puppy.name}</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-cocoa hover:bg-cocoa/5 transition-colors"
                >
                  <Phone className="size-4 text-toffee shrink-0" />
                  <span>Call {siteConfig.contact.phone}</span>
                </a>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-white py-3 px-4 text-xs font-bold uppercase tracking-wider text-cocoa hover:bg-cocoa/5 transition-colors"
                >
                  <Calendar className="size-4 text-toffee shrink-0" />
                  <span>Book Showroom Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* You might also love / Related Puppies */}
        {relatedPuppies.length > 0 && (
          <div className="pt-16 border-t border-cocoa/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-scrawl text-toffee text-base">
                  find your match
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-cocoa">
                  You might also love
                </h2>
              </div>

              <Link
                href="/puppies"
                className="text-xs sm:text-sm font-bold text-toffee hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPuppies.map((p) => (
                <PuppyCard key={p.slug} puppy={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
