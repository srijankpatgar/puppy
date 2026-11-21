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
      <div className="bg-cocoa text-milk py-1.5 px-4 text-center text-xs tracking-wider font-scrawl">
        <span>{siteConfig.tagline}</span>
      </div>

      <header className="sticky top-0 z-30 w-full bg-milk/95 backdrop-blur border-b border-cocoa/10 transition-colors">
        <div className="gutter flex h-20 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-honey rounded-lg"
          >
            <div className="relative size-10 overflow-hidden rounded-full border border-cocoa/15 shadow-sm">
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                priority
                className="object-cover size-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-cocoa">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-cocoa-soft">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-toffee ${
                    isActive ? "text-toffee font-semibold" : ""
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-honey px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cocoa shadow-sm hover:bg-honey-soft hover:shadow transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp us</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-cocoa/20 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-cocoa hover:bg-cocoa/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" />
              <span>Menu</span>
            </button>
          </div>
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
