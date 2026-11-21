import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const tabs = [
    { label: "Home", href: "/" },
    { label: "Puppies", href: "/puppies" },
    { label: "Happy families", href: "/happy-families" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="py-16 sm:py-24 flex-1 flex items-center justify-center">
      <div className="gutter max-w-xl mx-auto text-center">
        {/* Flyer Card */}
        <div className="rounded-3xl bg-white border-2 border-dashed border-cocoa/20 p-8 sm:p-12 shadow-lg relative overflow-hidden">
          {/* Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/80 border border-amber-200/60 rotate-1 shadow-xs" />

          {/* Heading */}
          <span className="font-scrawl text-xl sm:text-2xl text-toffee block mb-1">
            have you seen this page?
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cocoa">
            : this page has wandered off
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-cocoa-soft">
            Looks like this link took a little nap or ran off to chase a tennis ball.
          </p>

          {/* Adorable Missing Puppy Picture */}
          <div className="relative size-44 sm:size-52 mx-auto my-6 rounded-2xl overflow-hidden border border-cocoa/15 shadow-sm bg-cocoa/5">
            <Image
              src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
              alt="Cute puppy looking puzzled"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>

          {/* Tear-off pull tabs */}
          <div className="mt-8 pt-6 border-t border-dashed border-cocoa/20">
            <span className="font-scrawl text-sm text-cocoa-soft block mb-4">
              if found, take a tab:
            </span>

            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="rounded-xl border border-cocoa/20 bg-milk px-3.5 py-2 text-xs font-bold text-cocoa hover:border-toffee hover:text-toffee hover:bg-honey/15 transition-all shadow-xs"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-toffee hover:text-toffee-deep group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
