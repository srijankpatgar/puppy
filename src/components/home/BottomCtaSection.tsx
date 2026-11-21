import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, MapPin } from "lucide-react";

export function BottomCtaSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-cocoa/10 overflow-hidden bg-gradient-to-b from-milk to-[#faf5ec]">
      <div className="gutter max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white border border-cocoa/15 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Photo Column */}
          <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-full min-h-[320px] bg-cocoa/5">
            <Image
              src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
              alt="Max, waiting inside TeddyPups Dubai"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Text & CTAs Column */}
          <div className="md:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <span className="font-scrawl text-toffee text-lg">welcome home</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cocoa mt-2">
              Ready to meet your new best friend?
            </h2>
            <p className="mt-4 text-cocoa-soft text-sm sm:text-base leading-relaxed">
              Bring home a healthy, happy teacup or designer puppy with expert
              guidance every step of the way. We help you find the right match and
              ensure a smooth, safe delivery across the UAE.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-honey px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft active:scale-95 transition-all text-center"
              >
                <MessageCircle className="size-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa hover:border-toffee hover:text-toffee hover:bg-cocoa/5 active:scale-95 transition-all text-center"
              >
                <MapPin className="size-4" />
                <span>Visit &amp; contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
