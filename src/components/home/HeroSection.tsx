"use client";

import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";

export const HERO_ARCH_PUPPIES = [
  {
    name: "Max",
    breed: "Maltipoo",
    slug: "maltipoo-max-male",
    image: "/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
  },
  {
    name: "Chloe",
    breed: "Korean Teacup Maltipoo",
    slug: "korean-teacup-maltipoo-female",
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
  },
  {
    name: "Bella",
    breed: "Korean Teacup Poodle",
    slug: "korean-teacup-poodle-female",
    image: "/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
  },
  {
    name: "Teddy",
    breed: "Maltipoo & Cavapoo",
    slug: "maltipoo-cavapoo-male",
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
  },
  {
    name: "Milo",
    breed: "Toy Poodle",
    slug: "toy-poodle-male-female",
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
  },
  {
    name: "Luna",
    breed: "Pomeranian",
    slug: "pomeranian-female",
    image: "/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
  },
];

interface HeroSectionProps {
  activeArchIndex: number;
  onSelectArch: (index: number) => void;
}

export function HeroSection({
  activeArchIndex,
  onSelectArch,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-quilt-cream text-center select-none">
      <div className="gutter flex flex-col items-center">
        {/* Handwritten Tagline */}
        <div className="inline-block font-scrawl text-lg sm:text-xl text-[#A8481C] tracking-wide mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          every puppy is family
        </div>

        {/* Big Chunky Serif Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A1710] max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-500">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subhead Paragraph */}
        <p className="mt-5 max-w-2xl text-base sm:text-xl text-[#5A2E14] leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Pill Buttons: "View available puppies" (Brown) + "Enquire on WhatsApp" (Outlined) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
          <Link
            href="/puppies"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#5A2E14] text-[#FFF6E5] font-extrabold text-sm uppercase tracking-wider px-8 py-3.5 border-2 border-[#2A1710] shadow-[0_4px_0_#2A1710] hover:bg-[#A8481C] active:translate-y-0.5 active:shadow-[0_1px_0_#2A1710] transition-all cursor-pointer"
          >
            View available puppies
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-chunky-outline text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="size-4 text-[#A8481C]" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Full-width Arch Strip sitting on Scalloped Cloud Edge */}
        <div className="relative mt-16 sm:mt-22 w-full max-w-6xl">
          {/* Invisible anchor for mascot slot in center */}
          <div
            data-mascot-slot="hero-center"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-20 pointer-events-none"
          />

          {/* Arches Strip (Tall arches, edge-to-edge, thin dark outlines, real photos) */}
          <div className="relative pt-6 pb-2 z-10">
            <div className="flex items-end justify-center gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto pb-6 pt-10 no-scrollbar px-2 sm:px-4">
              {HERO_ARCH_PUPPIES.map((pup, idx) => {
                const isUnderTeddy = activeArchIndex === idx;

                return (
                  <div
                    key={pup.slug}
                    data-arch-slot={idx}
                    className="relative flex flex-col items-center shrink-0 cursor-pointer transition-transform duration-300"
                    style={{
                      transform: isUnderTeddy ? "translateY(-8px)" : "translateY(0)",
                    }}
                    onMouseEnter={() => onSelectArch(idx)}
                    onTouchStart={() => onSelectArch(idx)}
                  >
                    {/* Arch-Shaped Photo Window */}
                    <Link
                      href={`/puppies/${pup.slug}`}
                      className={`relative w-24 sm:w-36 md:w-42 aspect-[3/4.8] rounded-t-full rounded-b-2xl overflow-hidden border-2 sm:border-3 border-[#2A1710] bg-[#3B2215] shadow-md transition-all duration-300 block ${
                        isUnderTeddy
                          ? "ring-4 ring-[#F8D08C] shadow-2xl"
                          : "hover:scale-102"
                      }`}
                    >
                      <Image
                        src={pup.image}
                        alt={`${pup.name} - ${pup.breed}`}
                        fill
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 168px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1710]/45 via-transparent to-transparent pointer-events-none" />

                      {/* Puppy Name at base of arch */}
                      <div className="absolute bottom-2 inset-x-2 bg-[#FFF6E5]/90 backdrop-blur-xs py-1 px-1.5 rounded-lg text-center border border-[#2A1710]/15">
                        <span className="font-display font-bold text-xs sm:text-sm text-[#2A1710] block truncate">
                          {pup.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scalloped Cloud Divider sitting directly under the photo strip */}
          <CloudDivider fill="#FFF6E5" className="mt-2" />
        </div>
      </div>
    </section>
  );
}
