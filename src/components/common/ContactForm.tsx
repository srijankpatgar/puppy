"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Puppy } from "@/types/puppy";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  puppies: Puppy[];
}

export function ContactForm({ puppies }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Dubai");
  const [selectedPuppy, setSelectedPuppy] = useState("any puppy (not sure yet)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Construct formatted message
    const formattedMessage = `Hello TeddyPups! My name is ${name || "a puppy lover"}.
Phone: ${phone}
Email: ${email}
City: ${city}
Puppy of interest: ${selectedPuppy}
Notes: ${notes || "Looking for more information."}`;

    // Open WhatsApp with prefilled inquiry
    const url = getWhatsAppUrl(formattedMessage);
    window.open(url, "_blank");
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl bg-white border border-cocoa/15 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-honey/10 rounded-bl-full pointer-events-none" />

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-cocoa">
            Thank you, {name}!
          </h3>
          <p className="text-cocoa-soft text-sm max-w-md mx-auto">
            Your inquiry has been opened in WhatsApp. Our concierge team is
            reviewing your message and will respond right away.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs font-bold text-toffee hover:underline uppercase tracking-wider"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="font-display text-lg sm:text-2xl text-cocoa leading-relaxed">
            Dear TeddyPups, my name is{" "}
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="inline-block border-b-2 border-honey focus:border-toffee bg-transparent px-2 py-0.5 text-cocoa font-bold outline-none placeholder:text-cocoa-soft/40 min-w-[140px]"
            />
            , and you can reach me on{" "}
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 50..."
              className="inline-block border-b-2 border-honey focus:border-toffee bg-transparent px-2 py-0.5 text-cocoa font-bold outline-none placeholder:text-cocoa-soft/40 min-w-[140px]"
            />{" "}
            or by email at{" "}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="inline-block border-b-2 border-honey focus:border-toffee bg-transparent px-2 py-0.5 text-cocoa font-bold outline-none placeholder:text-cocoa-soft/40 min-w-[180px]"
            />
            . I live in{" "}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Dubai / Abu Dhabi"
              className="inline-block border-b-2 border-honey focus:border-toffee bg-transparent px-2 py-0.5 text-cocoa font-bold outline-none placeholder:text-cocoa-soft/40 min-w-[120px]"
            />
            , and I&apos;m curious about{" "}
            <select
              value={selectedPuppy}
              onChange={(e) => setSelectedPuppy(e.target.value)}
              className="inline-block border-b-2 border-honey focus:border-toffee bg-transparent px-2 py-0.5 text-cocoa font-bold outline-none text-base sm:text-xl"
            >
              <option value="any puppy (not sure yet)">
                any puppy (not sure yet)
              </option>
              {puppies
                .filter((p) => p.status === "available")
                .map((p) => (
                  <option key={p.slug} value={`${p.name} (${p.breed})`}>
                    {p.name} ({p.breed})
                  </option>
                ))}
            </select>
            .
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-2"
            >
              Additional notes or questions
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your home, questions about timeline, or preferred visit times..."
              className="w-full rounded-2xl border border-cocoa/20 bg-milk/50 p-4 text-sm text-cocoa placeholder:text-cocoa-soft/50 focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-honey py-4 px-8 text-sm font-bold uppercase tracking-wider text-cocoa shadow-md hover:bg-honey-soft active:scale-95 transition-all"
            >
              <Send className="size-4" />
              <span>Send inquiry via WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
