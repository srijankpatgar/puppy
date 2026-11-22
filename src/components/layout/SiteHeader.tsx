"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
import { Menu, MessageCircle } from "lucide-react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-[#2A1710] text-[#FFF6E5] py-1.5 px-4 text-center text-xs tracking-wider font-scrawl">
        <span>{siteConfig.tagline}</span>
      </div>

      {/* Header: Cream #FFF6E5, stays cream over dark sections, with scalloped bottom edge */}
      <header className="sticky top-0 z-40 w-full bg-[#FFF6E5] text-[#2A1710] shadow-sm select-none">
        <div className="gutter flex h-20 items-center justify-between relative z-20">
          {/* Brand Logo + "TeddyPups" */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8D08C] rounded-lg"
          >
            <div className="relative size-11 overflow-hidden rounded-full border-2 border-[#2A1710] shadow-sm bg-white">
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                priority
                className="object-cover size-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A1710]">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#5A2E14]">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-[#A8481C] ${
                    isActive ? "text-[#A8481C] font-extrabold underline decoration-2 underline-offset-4" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#25D366] border-2 border-[#1E4E36] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#FFFFFF] shadow-[0_3px_0_#1E4E36] hover:brightness-105 active:translate-y-0.5 active:shadow-[0_1px_0_#1E4E36] transition-all"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp us</span>
            </a>

            {/* "Menu" Pill Button with thick shadow */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF8] border-2 border-[#2A1710] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#2A1710] shadow-[0_3px_0_#2A1710] active:translate-y-0.5 active:shadow-[0_1px_0_#2A1710] transition-all cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Scalloped Bottom Edge with dashed stitch line hanging under header */}
        <div className="absolute -bottom-4 inset-x-0 w-full overflow-hidden leading-none pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1440 24"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-4 sm:h-5 block"
          >
            <path
              d="M0 0 H1440 V8 C1380 8 1370 24 1320 24 C1270 24 1260 8 1200 8 C1140 8 1130 24 1080 24 C1030 24 1020 8 960 8 C900 8 890 24 840 24 C790 24 780 8 720 8 C660 8 650 24 600 24 C550 24 540 8 480 8 C420 8 410 24 360 24 C310 24 300 8 240 8 C180 8 170 24 120 24 C70 24 60 8 0 8 Z"
              fill="#FFF6E5"
            />
            {/* Dashed stitch line */}
            <path
              d="M0 6 C60 6 70 20 120 20 C170 20 180 6 240 6 C300 6 310 20 360 20 C410 20 420 6 480 6 C540 6 550 20 600 20 C650 20 660 6 720 6 C780 6 790 20 840 20 C890 20 900 6 960 6 C1020 6 1030 20 1080 20 C1130 20 1140 6 1200 6 C1260 6 1270 20 1320 20 C1370 20 1380 6 1440 6"
              stroke="rgba(42, 23, 16, 0.22)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
        </div>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
