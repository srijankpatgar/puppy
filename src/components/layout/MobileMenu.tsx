"use client";

import { useEffect } from "react";
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

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-milk shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-cocoa/10">
            <span className="font-scrawl text-2xl text-toffee">
              where to, friend?
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 text-sm font-semibold text-cocoa-soft hover:text-cocoa focus:outline-none p-1.5 rounded-full hover:bg-cocoa/5"
              aria-label="Close menu"
            >
              <span>Close</span>
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`text-xl font-display transition-colors py-1 ${
                    isActive
                      ? "text-toffee font-bold translate-x-1"
                      : "text-cocoa hover:text-toffee"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contact & Action */}
        <div className="pt-8 border-t border-cocoa/10 space-y-4">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-honey py-3 text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
          >
            <MessageCircle className="size-4" />
            <span>WhatsApp us</span>
          </a>

          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-cocoa-soft hover:text-cocoa transition-colors"
          >
            <Phone className="size-4" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <div className="text-center font-scrawl text-xs text-cocoa/60 pt-2">
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    </div>
  );
}
