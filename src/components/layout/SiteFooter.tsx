"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { TeddyMascot } from "@/components/common/TeddyMascot";

export function SiteFooter() {
  return (
    <footer className="relative bg-[#2A1710] text-[#FFF6E5] pt-16 pb-24 lg:pb-16 mt-auto border-t border-[#FFF6E5]/10 overflow-hidden select-none">
      {/* Night Sky: Crescent Moon top-right & Stars twinkling at random intervals */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        {/* Crescent Moon top-right */}
        <div className="absolute top-8 right-8 sm:right-16 opacity-85">
          <svg viewBox="0 0 60 60" className="w-12 sm:w-16 h-auto drop-shadow-[0_0_15px_rgba(248,208,140,0.6)]">
            <path
              d="M 12 10 A 24 24 0 1 0 50 48 A 20 20 0 1 1 12 10 Z"
              fill="#F8D08C"
            />
          </svg>
        </div>

        {/* Stars twinkling at random intervals */}
        <div className="absolute top-12 left-20 tp-star text-[#F8D08C] text-sm">✦</div>
        <div className="absolute top-28 left-1/3 tp-star text-[#F8D08C] text-lg" style={{ animationDelay: "1.4s" }}>✧</div>
        <div className="absolute top-8 right-1/3 tp-star text-[#F8D08C] text-xs" style={{ animationDelay: "2.1s" }}>✦</div>
        <div className="absolute bottom-32 left-16 tp-star text-[#F8D08C] text-base" style={{ animationDelay: "0.8s" }}>✧</div>
        <div className="absolute bottom-24 right-24 tp-star text-[#F8D08C] text-sm" style={{ animationDelay: "1.7s" }}>✦</div>
      </div>

      <div className="gutter relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFF6E5]">
              Home, at last.
            </h3>
            <p className="text-[#FFF6E5]/75 max-w-sm text-sm sm:text-base leading-relaxed font-medium">
              TeddyPups U.A.E. is a Dubai-based boutique brand specializing in miniature
              and teacup puppies, offering certified health services and worldwide shipping.
            </p>
          </div>

          {/* Explore Col */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-scrawl text-lg text-[#F8D08C] font-bold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF6E5]/90 font-medium">
              {siteConfig.footerExplore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F8D08C] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Say hello Col */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <h4 className="font-scrawl text-lg text-[#F8D08C] font-bold">Say hello</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF6E5]/90 font-medium">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-[#F8D08C] transition-colors"
                >
                  WhatsApp {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all hover:text-[#F8D08C] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>

            {/* Pill Social links (Instagram / TikTok / Facebook) */}
            <div className="pt-3">
              <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-[#FFF6E5]/30 px-4 text-xs font-bold uppercase tracking-wider text-[#FFF6E5]/90 hover:border-[#F8D08C] hover:text-[#F8D08C] hover:bg-[#F8D08C]/10 transition-colors"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* WICKER BASKET WITH PUPPY INSIDE (Matches reference video) */}
        <div
          data-mascot-slot="footer-basket"
          className="mt-14 flex flex-col items-center justify-center min-h-[160px]"
        >
          <div className="w-36 sm:w-44 mb-2">
            <TeddyMascot pose="in-basket" />
          </div>
          <div className="text-center font-scrawl text-xs text-[#F8D08C]/70">
            every puppy is family
          </div>
        </div>

        {/* Bottom copyright row + handwritten "every puppy is family" */}
        <div className="mt-10 pt-8 border-t border-[#FFF6E5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#FFF6E5]/60">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              width={32}
              height={32}
              className="size-8 rounded-full opacity-90"
            />
            <span>&copy; 2026 TeddyPups U.A.E.</span>
          </div>
          <span className="font-scrawl text-sm sm:text-base text-[#F8D08C]">
            every puppy is family
          </span>
        </div>
      </div>
    </footer>
  );
}
