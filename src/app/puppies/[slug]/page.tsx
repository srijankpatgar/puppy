import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/types/puppy";
import { siteConfig } from "@/config/site";
import { getPuppyEnquiryUrl } from "@/lib/whatsapp";
import { PuppyGallery } from "@/components/puppies/PuppyGallery";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
  ChevronRight,
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

  // Related puppies
  const relatedPuppies = puppies
    .filter((p) => p.status === "available" && p.slug !== puppy.slug)
    .slice(0, 4);

  const enquiryUrl = getPuppyEnquiryUrl(puppy.name, puppy.breed, puppy.slug);

  return (
    <main className="py-8 sm:py-14 bg-quilt-cream text-[#2A1710] flex-1 select-none">
      <div className="gutter space-y-10 max-w-6xl mx-auto">
        {/* Breadcrumb: "Available puppies / Korean Teacup Pomeranian" */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5A2E14]">
          <Link
            href="/puppies"
            className="hover:text-[#A8481C] transition-colors"
          >
            Available puppies
          </Link>
          <ChevronRight className="size-3.5 text-[#A8481C]" />
          <span className="text-[#A8481C] font-extrabold truncate">
            {puppy.breed} ({puppy.name})
          </span>
        </nav>

        {/* Numbered circle 1 + handwritten "hello, it's me" */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#F8D08C] border-2 border-[#2A1710] font-display text-base font-black text-[#2A1710] shadow-sm">
            1
          </div>
          <span className="font-scrawl text-2xl sm:text-3xl text-[#A8481C] font-bold">
            hello, it&apos;s me
          </span>
        </div>

        {/* 2-Column Layout: Gallery on Left, Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Media Gallery with stacked-card edge */}
          <div className="lg:col-span-6">
            <PuppyGallery
              media={puppy.media && puppy.media.length > 0 ? puppy.media : [puppy.cover]}
              puppyName={puppy.name}
            />
          </div>

          {/* Right Column: Puppy Specs & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-[#FFFDF8] px-3.5 py-1 text-xs font-black text-[#2A1710] border-2 border-[#2A1710] shadow-xs">
                  {puppy.status === "available" ? (
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Available in Dubai
                    </span>
                  ) : (
                    <span className="text-[#A8481C] flex items-center gap-1">
                      <Heart className="size-3 fill-[#A8481C]" />
                      Gone Home (Adopted)
                    </span>
                  )}
                </span>

                {puppy.origin?.name && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F8D08C] border border-[#2A1710]/20 px-3 py-1 text-xs font-bold text-[#2A1710]">
                    <MapPin className="size-3 text-[#A8481C]" />
                    <span>{puppy.origin.name}</span>
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2A1710] tracking-tight">
                {puppy.name}
              </h1>
              <p className="font-scrawl text-xl text-[#A8481C] font-bold mt-1">
                {puppy.breed} &bull; {puppy.genderLabel}
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710]/15 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5A2E14]/70 block">
                  Breed
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#2A1710] mt-0.5 block truncate">
                  {puppy.breed}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710]/15 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5A2E14]/70 block">
                  Age
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#2A1710] mt-0.5 block">
                  {puppy.age}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710]/15 shadow-xs">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5A2E14]/70 block">
                  Gender
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-[#2A1710] mt-0.5 block">
                  {puppy.genderLabel}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border-2 border-[#2A1710] shadow-[0_4px_0_#5A2E14] space-y-2">
              <h3 className="font-display font-bold text-base text-[#2A1710]">
                About {puppy.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A2E14] leading-relaxed font-medium">
                {puppy.description}
              </p>
            </div>

            {/* Passport Guarantee */}
            <div className="p-4 rounded-2xl bg-[#F8D08C]/40 border-2 border-[#2A1710]/20 flex items-center gap-3">
              <ShieldCheck className="size-6 text-[#A8481C] shrink-0" />
              <div className="text-xs text-[#5A2E14] font-semibold leading-tight">
                100% Certified Health Passport &bull; Full Vaccinations &bull; Dewormed &bull; Microchipped
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] border-2 border-[#1E4E36] py-3.5 px-6 text-sm font-black uppercase tracking-wider text-white shadow-[0_4px_0_#1E4E36] hover:brightness-105 active:translate-y-0.5 active:shadow-[0_1px_0_#1E4E36] transition-all cursor-pointer"
              >
                <MessageCircle className="size-4 fill-white text-[#25D366]" />
                <span>Enquire about {puppy.name}</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="btn-chunky-outline py-3.5 px-6 text-sm shadow-[0_4px_0_#5A2E14] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="size-4 text-[#A8481C]" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Other Available Puppies */}
        {relatedPuppies.length > 0 && (
          <div className="pt-14 border-t-2 border-[#2A1710]/15 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2A1710]">
              More available puppies
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPuppies.map((p, idx) => (
                <PuppyDoorCard key={p.slug} puppy={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
