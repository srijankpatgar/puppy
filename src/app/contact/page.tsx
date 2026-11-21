import type { Metadata } from "next";
import puppiesData from "@/data/puppies.json";
import { Puppy } from "@/types/puppy";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ContactForm } from "@/components/common/ContactForm";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visit & contact",
  description:
    "Get in touch with TeddyPups in Downtown Dubai. Book a showroom appointment, inquire about teacup puppies, or message our concierge 24/7 on WhatsApp.",
};

export default function ContactPage() {
  const allPuppies = puppiesData as Puppy[];

  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <Sparkles className="size-4" />
            <span>we&apos;d love to meet you</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            Get in touch with us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
            Have questions about our puppies or adoption process? Fill out the
            form below or message our team directly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column: Letter-Style Form */}
          <div className="lg:col-span-7">
            <ContactForm puppies={allPuppies} />
          </div>

          {/* Right Column: Showroom Visit & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Details Card */}
            <div className="rounded-3xl bg-white border border-cocoa/15 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="font-scrawl text-toffee text-base">
                  our showroom
                </span>
                <h2 className="font-display text-2xl font-bold text-cocoa mt-0.5">
                  Visit us in Downtown Dubai
                </h2>
                <p className="text-xs sm:text-sm text-cocoa-soft mt-1 leading-relaxed">
                  Come spend unhurried time bonding with our available puppies
                  in a clean, relaxing boutique lounge.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-cocoa font-medium">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-honey/20 text-toffee flex items-center justify-center shrink-0">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cocoa-soft block">
                      Location
                    </span>
                    <span>{siteConfig.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-honey/20 text-toffee flex items-center justify-center shrink-0">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cocoa-soft block">
                      Opening Hours
                    </span>
                    <span>{siteConfig.contact.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-honey/20 text-toffee flex items-center justify-center shrink-0">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cocoa-soft block">
                      Phone
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phoneTel}`}
                      className="hover:text-toffee"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-honey/20 text-toffee flex items-center justify-center shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-cocoa-soft block">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-toffee break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl("Hi TeddyPups! I'd like to book an appointment to visit your Downtown Dubai showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-honey py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
                >
                  <MessageCircle className="size-4" />
                  <span>Book appointment on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
