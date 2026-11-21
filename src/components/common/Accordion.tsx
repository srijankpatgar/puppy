"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}

export function Accordion({ items, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="divide-y divide-cocoa/10 border-y border-cocoa/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left font-display text-lg sm:text-xl font-semibold text-cocoa hover:text-toffee transition-colors gap-4"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-cocoa/15 bg-milk transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-honey/20 border-honey" : ""
                }`}
              >
                <ChevronDown className="size-4 text-cocoa" />
              </div>
            </button>

            {isOpen && (
              <div className="mt-3 text-sm sm:text-base text-cocoa-soft leading-relaxed pr-8 animate-in fade-in slide-in-from-top-1 duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
