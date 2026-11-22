"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { X, MessageCircle, Phone } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close menu on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close menu ONLY when route changes to a new page (not on initial mount)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A1710]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-[#FFFDF8] border-l-3 border-[#2A1710] shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300 z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b-2 border-[#2A1710]/15">
            <span className="font-scrawl text-2xl text-[#A8481C] font-bold">
              where to, friend?
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center size-9 rounded-full bg-[#FFF6E5] border-2 border-[#2A1710] text-[#2A1710] shadow-[0_2px_0_#2A1710] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-2">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`text-lg sm:text-xl font-display font-extrabold px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#FFF6E5] text-[#A8481C] border border-[#2A1710]/20 translate-x-1"
                      : "text-[#2A1710] hover:text-[#A8481C] hover:bg-[#FFF6E5]/60"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-sm">🐾</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contact & Action */}
        <div className="pt-6 border-t-2 border-[#2A1710]/15 space-y-3.5">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white border-2 border-[#1E4E36] shadow-[0_3px_0_#1E4E36] hover:brightness-105 active:translate-y-0.5 active:shadow-[0_1px_0_#1E4E36] transition-all"
          >
            <MessageCircle className="size-4" />
            <span>WhatsApp us</span>
          </a>

          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#5A2E14] hover:text-[#A8481C] transition-colors py-1"
          >
            <Phone className="size-4" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <div className="text-center font-scrawl text-xs text-[#5A2E14]/70 pt-1">
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    </div>
  );
}
