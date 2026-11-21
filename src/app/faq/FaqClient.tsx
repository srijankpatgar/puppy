"use client";

import { useState } from "react";
import { Accordion } from "@/components/common/Accordion";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Search, MessageCircle, HelpCircle, X } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqClientProps {
  initialFaqs: FaqItem[];
}

export function FaqClient({ initialFaqs }: FaqClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = initialFaqs.filter((item) => {
    const q = item.question.toLowerCase();
    const a = item.answer.toLowerCase();
    const s = searchQuery.toLowerCase().trim();
    return q.includes(s) || a.includes(s);
  });

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cocoa-soft">
          <Search className="size-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="sniff out a question..."
          className="w-full pl-11 pr-10 py-4 rounded-2xl bg-white border border-cocoa/20 text-cocoa placeholder:text-cocoa-soft/60 focus:outline-none focus:border-honey focus:ring-2 focus:ring-honey/30 text-sm sm:text-base shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-cocoa-soft hover:text-cocoa"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Note Counter */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-cocoa-soft font-semibold px-1">
        <span>
          {filteredFaqs.length} {filteredFaqs.length === 1 ? "note" : "notes"} on the board
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-toffee hover:underline"
          >
            Show all
          </button>
        )}
      </div>

      {/* Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="bg-white rounded-3xl border border-cocoa/10 p-6 sm:p-10 shadow-sm">
          <Accordion items={filteredFaqs} defaultOpenIndex={0} />
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-cocoa/10 p-8">
          <div className="size-12 rounded-full bg-honey/30 mx-auto flex items-center justify-center text-toffee mb-3">
            <HelpCircle className="size-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-cocoa">
            No matching questions found
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-cocoa-soft">
            Try a different search term or message us directly on WhatsApp.
          </p>
        </div>
      )}

      {/* Bottom "Ask your own question" card */}
      <div className="rounded-3xl bg-honey/15 border border-honey/30 p-8 sm:p-10 text-center space-y-4 shadow-sm">
        <span className="font-scrawl text-toffee text-lg">still curious?</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cocoa">
          Ask your own question
        </h2>
        <p className="text-cocoa-soft text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Can&apos;t find what you&apos;re looking for? Message our concierge team on
          WhatsApp — we are available 24/7.
        </p>
        <div className="pt-2">
          <a
            href={getWhatsAppUrl("Hi TeddyPups! I have a question about adoption that wasn't covered in the FAQ.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-cocoa shadow hover:bg-honey-soft transition-colors"
          >
            <MessageCircle className="size-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
