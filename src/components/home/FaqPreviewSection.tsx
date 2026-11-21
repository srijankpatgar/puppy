import Link from "next/link";
import { Accordion } from "@/components/common/Accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import faqData from "@/data/faq.json";

export function FaqPreviewSection() {
  // Use first 3 questions from dataset
  const previewItems = faqData.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-milk/50 border-t border-cocoa/10">
      <div className="gutter max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 font-scrawl text-toffee text-base mb-1">
              <HelpCircle className="size-4" />
              <span>got questions?</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa">
              Questions, answered
            </h2>
          </div>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group transition-colors"
          >
            <span>Read all questions</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Accordion */}
        <div className="bg-white rounded-3xl border border-cocoa/10 p-6 sm:p-10 shadow-sm">
          <Accordion items={previewItems} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
