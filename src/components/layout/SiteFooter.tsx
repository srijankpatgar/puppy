"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const [basketPopped, setBasketPopped] = useState(false);

  return (
    <footer className="bg-[#2A1710] text-[#FFF6E5] pt-16 pb-24 lg:pb-16 mt-auto border-t border-[#FFF6E5]/10">
      <div className="gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF6E5]">
              Home, at last.
            </h3>
            <p className="text-[#FFF6E5]/75 max-w-sm text-sm sm:text-base leading-relaxed">
              TeddyPups U.A.E. is a Dubai-based boutique brand specializing in miniature
              and teacup puppies, offering certified health services and safe delivery worldwide.
            </p>
          </div>

          {/* Explore Col */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-scrawl text-lg text-[#F8D08C] font-bold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF6E5]/90">
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
            <ul className="space-y-2.5 text-sm text-[#FFF6E5]/90">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-[#F8D08C] transition-colors"
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

            {/* Social pills */}
            <div className="pt-3">
              <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-[#FFF6E5]/30 px-3.5 text-xs font-bold uppercase tracking-wider text-[#FFF6E5]/90 hover:border-[#F8D08C] hover:text-[#F8D08C] hover:bg-[#F8D08C]/10 transition-colors"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-[#FFF6E5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#FFF6E5]/60">
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
            {siteConfig.tagline}
          </span>
        </div>

        {/* ===================================================================
            FINAL ELEMENT: PUPPY SITTING IN A WICKER BASKET
            Bobbing loop, periodic blink, ear wiggle, and pop-up "woof!" bubble
           =================================================================== */}
        <div className="mt-12 flex flex-col items-center justify-center select-none pt-4">
          <div
            className="relative cursor-pointer group flex flex-col items-center"
            onMouseEnter={() => setBasketPopped(true)}
            onMouseLeave={() => setBasketPopped(false)}
            onTouchStart={() => setBasketPopped((prev) => !prev)}
          >
            {/* Pop-up "Woof!" Speech Bubble on Hover/Tap */}
            <div
              className={`mb-2 transition-all duration-300 pointer-events-none ${
                basketPopped
                  ? "opacity-100 -translate-y-2 scale-110"
                  : "opacity-0 translate-y-2 scale-90"
              }`}
            >
              <div className="bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3 py-1 rounded-full border-2 border-[#5A2E14] shadow-lg whitespace-nowrap">
                woof! 🐾
              </div>
            </div>

            {/* Wicker Basket & Fluffy Puppy SVG */}
            <div
              className={`w-32 sm:w-36 h-auto transition-transform duration-300 ${
                basketPopped ? "-translate-y-3 scale-105" : "tp-basket-bob"
              }`}
            >
              <svg viewBox="0 0 160 140" className="w-full h-full overflow-visible">
                {/* Fluffy Puppy Peeking Over Rim */}
                <g className={basketPopped ? "translate-y-[-6px]" : ""}>
                  {/* Ears with wiggle animation */}
                  <ellipse
                    cx="50"
                    cy="40"
                    rx="14"
                    ry="26"
                    fill="#E4A352"
                    stroke="#2A1710"
                    strokeWidth="3"
                    className="tp-basket-ear"
                    style={{ transformOrigin: "50px 30px" }}
                  />
                  <ellipse
                    cx="110"
                    cy="40"
                    rx="14"
                    ry="26"
                    fill="#E4A352"
                    stroke="#2A1710"
                    strokeWidth="3"
                    className="tp-basket-ear"
                    style={{ transformOrigin: "110px 30px", animationDelay: "0.2s" }}
                  />

                  {/* Head */}
                  <circle
                    cx="80"
                    cy="46"
                    r="32"
                    fill="#F8D08C"
                    stroke="#2A1710"
                    strokeWidth="3.5"
                  />

                  {/* Topknot fluff */}
                  <circle
                    cx="80"
                    cy="18"
                    r="10"
                    fill="#F8D08C"
                    stroke="#2A1710"
                    strokeWidth="2.5"
                  />

                  {/* Snout */}
                  <ellipse cx="80" cy="56" rx="16" ry="12" fill="#FFF6E5" />

                  {/* Rosy Cheeks */}
                  <circle cx="58" cy="52" r="5" fill="#F9B9A6" opacity="0.8" />
                  <circle cx="102" cy="52" r="5" fill="#F9B9A6" opacity="0.8" />

                  {/* Blinking Eyes */}
                  <g className="tp-basket-blink">
                    <circle cx="68" cy="42" r="3.5" fill="#2A1710" />
                    <circle cx="92" cy="42" r="3.5" fill="#2A1710" />
                    <circle cx="67" cy="40.5" r="1.2" fill="#FFFFFF" />
                    <circle cx="91" cy="40.5" r="1.2" fill="#FFFFFF" />
                  </g>

                  {/* Nose */}
                  <ellipse cx="80" cy="52" rx="4.5" ry="3" fill="#2A1710" />

                  {/* Mouth / Smile (opens when popped) */}
                  {basketPopped ? (
                    <path
                      d="M 74 58 Q 80 68 86 58 Z"
                      fill="#E98C8C"
                      stroke="#2A1710"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M 80 55 v 3 M 76 58 q 4 4 8 0"
                      stroke="#2A1710"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  )}

                  {/* Paws Resting on Basket Rim */}
                  <ellipse
                    cx="56"
                    cy="80"
                    rx="11"
                    ry="7"
                    fill="#FFF6E5"
                    stroke="#2A1710"
                    strokeWidth="2.5"
                  />
                  <ellipse
                    cx="104"
                    cy="80"
                    rx="11"
                    ry="7"
                    fill="#FFF6E5"
                    stroke="#2A1710"
                    strokeWidth="2.5"
                  />
                </g>

                {/* Wicker Basket Body */}
                <g>
                  {/* Basket Rim */}
                  <ellipse
                    cx="80"
                    cy="82"
                    rx="52"
                    ry="11"
                    fill="#C27D2E"
                    stroke="#2A1710"
                    strokeWidth="3.5"
                  />
                  <ellipse
                    cx="80"
                    cy="82"
                    rx="46"
                    ry="7"
                    fill="#8E3F15"
                  />

                  {/* Wicker Basket Base with Woven Pattern */}
                  <path
                    d="M 32 82 L 44 124 C 46 130 52 134 60 134 L 100 134 C 108 134 114 130 116 124 L 128 82 Z"
                    fill="#C27D2E"
                    stroke="#2A1710"
                    strokeWidth="3.5"
                  />

                  {/* Wicker Weave Lines */}
                  <path
                    d="M 40 98 Q 80 106 120 98 M 43 114 Q 80 122 117 114"
                    stroke="#8E3F15"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M 58 84 L 54 132 M 80 84 L 80 134 M 102 84 L 106 132"
                    stroke="#8E3F15"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>
              </svg>
            </div>

            <span className="mt-2 font-scrawl text-xs text-[#F8D08C]/70">
              tap me!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
