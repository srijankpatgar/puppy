/**
 * Global site configuration
 * Single source of truth for contact details, brand info, and navigation links.
 */

export const siteConfig = {
  name: "TeddyPups U.A.E.",
  tagline: "every puppy is family",
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  url: "https://puppy.instabizweb.com",

  // Single phone & WhatsApp number used across the entire site
  contact: {
    phone: "+91 8660247358",
    phoneTel: "+918660247358",
    whatsappNumber: "918660247358", // digits only for wa.me links
    whatsappDisplay: "+91 8660247358",
    email: "srijanpatgar@gmail.com",
    address: "Downtown Dubai, United Arab Emirates",
    showroomCity: "Dubai",
    openingHours: "Daily 10:00 AM – 9:00 PM (By appointment)",
  },

  // Social media channels
  socials: {
    instagram: "https://www.instabizweb.com/",
    tiktok: "https://www.instabizweb.com/",
    facebook: "https://www.instabizweb.com/",
  },

  // Main navigation links
  nav: [
    { label: "Home", href: "/" },
    { label: "Puppies", href: "/puppies" },
    { label: "Happy families", href: "/happy-families" },
    { label: "How it works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "Visit & contact", href: "/contact" },
  ],

  // Footer explore links
  footerExplore: [
    { label: "Available puppies", href: "/puppies" },
    { label: "Gone home", href: "/gone-home" },
    { label: "Happy families", href: "/happy-families" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Delivery & collection", href: "/how-it-works#delivery" },
    { label: "FAQ", href: "/faq" },
    { label: "Visit & contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
