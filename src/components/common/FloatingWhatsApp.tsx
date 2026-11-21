"use client";

import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Contact Concierge"
      className="hidden lg:flex fixed bottom-8 right-8 z-40 items-center gap-3 group pointer-events-auto"
    >
      {/* Tooltip Pill */}
      <span className="rounded-full bg-cocoa text-milk px-3.5 py-1.5 text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with our Dubai team
      </span>

      {/* Button */}
      <a
        href={getWhatsAppUrl("Hi TeddyPups! I'm browsing your website and would love to speak with an adoption specialist.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-2xl"
        aria-label="Chat with TeddyPups on WhatsApp"
      >
        <MessageCircle className="size-7 fill-white text-transparent" />
      </a>
    </aside>
  );
}
