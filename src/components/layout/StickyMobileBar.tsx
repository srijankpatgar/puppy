"use client";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Phone } from "lucide-react";

export function StickyMobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF6E5]/95 backdrop-blur-md border-t-2 border-[#5A2E14]/20 px-4 py-3 shadow-[0_-6px_20px_rgba(42,23,16,0.15)]">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#F8D08C] border-2 border-[#5A2E14] py-3 px-4 text-xs font-black uppercase tracking-wider text-[#2A1710] shadow-[0_3px_0_#5A2E14] active:translate-y-0.5 active:shadow-[0_1px_0_#5A2E14] transition-all"
        >
          <MessageCircle className="size-4 shrink-0 text-[#2A1710]" />
          <span>WhatsApp us</span>
        </a>

        <a
          href={`tel:${siteConfig.contact.phoneTel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#5A2E14] bg-[#FFFDF8] py-3 px-5 text-xs font-black uppercase tracking-wider text-[#2A1710] shadow-[0_3px_0_#5A2E14] active:translate-y-0.5 active:shadow-[0_1px_0_#5A2E14] transition-all"
        >
          <Phone className="size-4 shrink-0 text-[#A8481C]" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
