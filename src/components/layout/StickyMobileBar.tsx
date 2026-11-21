"use client";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Phone } from "lucide-react";

export function StickyMobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-milk/95 backdrop-blur border-t border-cocoa/15 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-honey py-3 px-4 text-xs font-bold uppercase tracking-wider text-cocoa shadow-sm hover:bg-honey-soft active:scale-95 transition-all"
        >
          <MessageCircle className="size-4 shrink-0" />
          <span>WhatsApp us</span>
        </a>

        <a
          href={`tel:${siteConfig.contact.phoneTel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-milk py-3 px-5 text-xs font-bold uppercase tracking-wider text-cocoa hover:bg-cocoa/5 active:scale-95 transition-all"
        >
          <Phone className="size-4 shrink-0" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
