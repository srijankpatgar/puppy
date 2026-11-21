import type { Metadata } from "next";
import faqData from "@/data/faq.json";
import { FaqClient } from "./FaqClient";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Questions & answers",
  description:
    "Find answers to frequently asked questions about TeddyPups teacup puppies, health certificates, Korea imports, showroom visits, and delivery across Dubai and the UAE.",
};

export default function FaqPage() {
  return (
    <main className="py-12 sm:py-20 flex-1">
      <div className="gutter space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
            <HelpCircle className="size-4" />
            <span>everything you need to know</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cocoa">
            Questions &amp; answers
          </h1>
          <p className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp &mdash;
            our team is available 24/7.
          </p>
        </div>

        {/* Client Searchable Accordions */}
        <FaqClient initialFaqs={faqData} />
      </div>
    </main>
  );
}
