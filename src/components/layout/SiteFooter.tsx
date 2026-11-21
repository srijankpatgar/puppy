import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="bg-cocoa text-milk pt-16 pb-24 lg:pb-16 mt-auto">
      <div className="gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-milk">
              Home, at last.
            </h3>
            <p className="text-milk/75 max-w-sm text-sm sm:text-base leading-relaxed">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature
              puppies, offering premium services and worldwide shipping.
            </p>
          </div>

          {/* Explore Col */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-scrawl text-lg text-honey">Explore</h4>
            <ul className="space-y-2.5 text-sm text-milk/90">
              {siteConfig.footerExplore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-honey transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Say hello Col */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <h4 className="font-scrawl text-lg text-honey">Say hello</h4>
            <ul className="space-y-2.5 text-sm text-milk/90">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-honey transition-colors"
                >
                  WhatsApp {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all hover:text-honey transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>

            {/* Social pills */}
            <div className="pt-3">
              <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
                {Object.entries(siteConfig.socials).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-milk/30 px-3.5 text-xs font-semibold uppercase tracking-wider text-milk/90 hover:border-honey hover:text-honey transition-colors"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-milk/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-milk/60">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              width={32}
              height={32}
              className="size-8 rounded-full opacity-90"
            />
            <span>&copy; 2026 TeddyPups U.A.E.</span>
          </div>
          <span className="font-scrawl text-sm sm:text-base text-honey/80">
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
