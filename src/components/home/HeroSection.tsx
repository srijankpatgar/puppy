import Link from "next/link";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { TeddyBuddy } from "@/components/common/TeddyBuddy";

const heroLineup = [
  {
    name: "Max",
    slug: "maltipoo-max-male",
    image: "/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
  },
  {
    name: "Korean Teacup Maltipoo",
    slug: "korean-teacup-maltipoo-female",
    image: "/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg",
  },
  {
    name: "Korean Teacup Poodle",
    slug: "korean-teacup-poodle-female",
    image: "/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg",
  },
  {
    name: "Maltipoo & Cavapoo",
    slug: "maltipoo-cavapoo-male",
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
  },
  {
    name: "Toy Poodle",
    slug: "toy-poodle-male-female",
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
  },
  {
    name: "Maltipoo",
    slug: "maltipoo-female-2",
    image: "/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="gutter flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-block font-scrawl text-lg sm:text-xl text-toffee tracking-wide mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          every puppy is family
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cocoa max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-500">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subhead */}
        <p className="mt-5 max-w-2xl text-base sm:text-xl text-cocoa-soft leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/puppies"
            className="w-full sm:w-auto rounded-full bg-honey px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-cocoa shadow-sm hover:bg-honey-soft hover:shadow-md transition-all active:scale-95 text-center"
          >
            View available puppies
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-cocoa hover:border-toffee hover:text-toffee hover:bg-cocoa/5 transition-all text-center"
          >
            <MessageCircle className="size-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Hero Lineup Strip */}
        <div className="mt-14 w-full max-w-5xl">
          <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar">
            {heroLineup.map((pup) => (
              <Link
                key={pup.slug}
                href={`/puppies/${pup.slug}`}
                className="group flex flex-col items-center shrink-0 w-24 sm:w-28 text-center"
              >
                <div className="relative size-18 sm:size-22 rounded-full overflow-hidden border-2 border-cocoa/15 p-0.5 group-hover:border-honey transition-colors shadow-sm bg-white">
                  <div className="relative size-full rounded-full overflow-hidden">
                    <Image
                      src={pup.image}
                      alt={pup.name}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="mt-2 text-xs font-semibold text-cocoa group-hover:text-toffee transition-colors truncate max-w-full">
                  {pup.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Pomeranian Feature Banner with Blinking Teddy Peeking Over */}
        <div className="relative mt-20 sm:mt-24 w-full max-w-5xl">
          {/* Skin-coloured puppy blinking and peeking over the quilt banner */}
          <div className="absolute -top-20 sm:-top-28 left-8 sm:left-14 z-20 w-32 sm:w-44 filter drop-shadow-[0_8px_16px_rgba(42,23,14,0.18)]">
            <TeddyBuddy pose="peek" facing="right" />
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-cocoa/10">
            <Image
              src="/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg"
              alt="Adorable teacup Pomeranian puppy at TeddyPups Dubai"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
