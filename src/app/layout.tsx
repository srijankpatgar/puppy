import type { Metadata } from "next";
import { Fraunces, Figtree, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { PuppyCursor } from "@/components/common/PuppyCursor";
import { ScrollTeddyCompanion } from "@/components/common/ScrollTeddyCompanion";
import { RouteCurtain } from "@/components/common/RouteCurtain";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    template: "%s | TeddyPups U.A.E.",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_AE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${shantell.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-milk text-cocoa font-sans flex flex-col selection:bg-honey/30">
        <RouteCurtain />
        <PuppyCursor />
        <ScrollTeddyCompanion />
        <SiteHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
        <StickyMobileBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
