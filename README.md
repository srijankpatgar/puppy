# TeddyPups U.A.E. — Complete Brand Clone

A pixel-faithful, responsive clone of **TeddyPups U.A.E.** (a Dubai luxury teacup puppy boutique and concierge brand), built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

> [!IMPORTANT]
> **Educational & Assignment Disclaimer**: All branding, trademarks, copy, design assets, and media belong to the original copyright owners (`TeddyPups U.A.E.` / reference site `https://puppy.instabizweb.com`). This project was developed strictly as an educational technical assignment and portfolio clone.

---

## Live Features & Architecture

1. **Pixel-Faithful Typography & Theme Tokens**:
   - **Serif Display**: *Fraunces* for luxury editorial titles and headings.
   - **Modern Sans**: *Figtree* for crisp, clean UI reading and metadata.
   - **Handwritten / Scrawl**: *Shantell Sans* for playful brand accents (*"every puppy is family"*, *"where to, friend?"*, *"one ticket home"*).
   - **Color Palette**: `milk` (`#fffdf8`), `cocoa` (`#2a170e`), `honey` (`#f2be6b`), `toffee` (`#c2622b`), `blush` (`#f9cdbf`), and `sky` (`#bfddf5`).

2. **Self-Contained Local Assets (Zero Hotlinking)**:
   - 158+ authentic puppy photographs, showroom pictures, client family portraits, brand logos, and local video clips downloaded directly into `/public/media/` and `/public/brand/`.

3. **Single Source of Truth Configuration**:
   - Single configuration file [`src/config/site.ts`](file:///C:/Users/Kushal/.gemini/antigravity/scratch/teddypups-uae/src/config/site.ts) holding all phone numbers, WhatsApp digits, showroom hours, addresses, emails, and links across the entire application.

4. **Interactive Multi-Filter Puppies Directory (`/puppies`)**:
   - Filter by **Breed** (*Maltipoo*, *Pomeranian*, *Poodle*, *Cavapoo*, *Shih Tzu*).
   - Filter by **Origin** (*Dubai Showroom* vs. *Korean Import*).
   - Filter by **Gender** (*Boy* vs. *Girl*).
   - Sort by *Featured*, *Name A-Z*, or *Age*.
   - Complete two-way URL query-param synchronization (`?breed=maltipoo&origin=local`).

5. **Dynamic Puppy Profile Page (`/puppies/[slug]`)**:
   - Pre-rendered static pages for all 42 puppies using `generateStaticParams`.
   - Media gallery viewer with thumbnail carousel and local HTML5 video playback with poster support.
   - TeddyPups Passport & Health Guarantee specs (licensed vet health certification, microchip, vaccination).
   - Direct WhatsApp enquiry button generating pre-filled messages with the puppy's name, breed, and direct URL.
   - Related puppies recommendation carousel.

6. **Authentic Gone-Home Flight Tickets (`/gone-home`)**:
   - 27 adopted puppies rendered as boarding tickets with route markers (`TeddyPups ──> home ♥`) and ticket stubs.

7. **How It Works (`/how-it-works`)**:
   - 4 comprehensive stages: Two ways home, Our puppy promise, Delivery & collection (`#delivery`), and Why choose us.

8. **Searchable FAQ (`/faq`)**:
   - Real-time client-side search input (*"sniff out a question..."*) with dynamic note counter and animated accordions.

9. **Conversational Contact Page (`/contact`)**:
   - Fill-in-the-blank letter form with puppy selector and seamless WhatsApp handoff.
   - Downtown Dubai showroom opening hours (Daily 10:00 AM – 9:00 PM), address, and direct call buttons.

10. **Custom 404 Page (`/not-found`)**:
    - Authentic "missing puppy flyer" design with tear-off pull tabs back to main sections.

11. **Responsive Mobile Shell**:
    - Animated slide-over mobile drawer (*"where to, friend?"*).
    - Fixed sticky bottom mobile bar with WhatsApp and Call buttons.
    - Desktop floating WhatsApp concierge button.

---

## Project Structure

```
teddypups-uae/
├── public/
│   ├── brand/
│   │   └── logo.png                # Official brand logo
│   └── media/                      # 158 local puppy photos, showroom assets & videos
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, header, footer & mobile bars
│   │   ├── page.tsx                # Homepage (8 sections matching reference/home.md)
│   │   ├── not-found.tsx           # Custom missing-puppy flyer 404 page
│   │   ├── globals.css             # Tailwind v4 theme tokens & custom font mappings
│   │   ├── puppies/
│   │   │   ├── page.tsx            # Available puppies directory
│   │   │   ├── PuppiesContent.tsx  # URL-synced filter & grid component
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic puppy profile with media viewer & specs
│   │   ├── gone-home/
│   │   │   └── page.tsx            # Flight-ticket adopted puppies showcase
│   │   ├── how-it-works/
│   │   │   └── page.tsx            # Adoption concierge guide & #delivery anchor
│   │   ├── faq/
│   │   │   ├── page.tsx            # Frequently asked questions page
│   │   │   └── FaqClient.tsx       # Live client-side search & accordion filter
│   │   ├── contact/
│   │   │   └── page.tsx            # Showroom hours, address & appointment booking
│   │   └── happy-families/
│   │       └── page.tsx            # Client stories & 64-moments photo wall
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx      # Sticky navigation bar & mobile menu trigger
│   │   │   ├── MobileMenu.tsx      # Slide-out drawer with "where to, friend?" overlay
│   │   │   ├── SiteFooter.tsx      # Full footer with explore columns & copyright
│   │   │   └── StickyMobileBar.tsx # Fixed bottom bar on mobile (WhatsApp + Call)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx     # Hero banner, CTAs & horizontal puppy lineup
│   │   │   ├── MeetThePups.tsx     # 15 available puppy cards + Meet them all card
│   │   │   ├── TwoWaysSection.tsx  # Showroom vs Imported split cards
│   │   │   ├── PuppyJourney.tsx    # 3-step concierge adoption & WhatsApp chat widget
│   │   │   ├── TrustBadges.tsx     # 4 trust pillars & puppy passport
│   │   │   ├── HappyFamiliesSection.tsx # Featured review & 8 photo story cards
│   │   │   ├── FaqPreviewSection.tsx    # 3 preview accordions
│   │   │   └── BottomCtaSection.tsx     # Final conversion banner with Max's portrait
│   │   ├── puppies/
│   │   │   ├── PuppyCard.tsx       # Reusable puppy card with status badges & age
│   │   │   ├── PuppyFilters.tsx    # Dropdown & pill filters for breed/origin/gender/sort
│   │   │   └── PuppyGallery.tsx    # Photo & local video playback viewer
│   │   └── common/
│   │       ├── Accordion.tsx       # Accessible collapsible accordion
│   │       ├── ContactForm.tsx     # Conversational letter-style contact form
│   │       └── FloatingWhatsApp.tsx# Desktop floating concierge chat trigger
│   ├── config/
│   │   └── site.ts                 # SINGLE SOURCE OF TRUTH (Phone, WhatsApp, Email, Address)
│   ├── data/
│   │   ├── puppies.json            # 42 authentic puppy profiles
│   │   ├── faq.json                # 9 categorized FAQ questions & answers
│   │   └── reviews.json            # Client testimonial & photo stories
│   ├── types/
│   │   └── puppy.ts                # TypeScript interfaces (Puppy, Media, Filters)
│   └── lib/
│       ├── utils.ts                # Tailwind class merger
│       └── whatsapp.ts             # Centralized WhatsApp URL generators
├── data/
│   └── puppies.json                # Root-level mirror
├── NOTES.md                        # Running architectural decisions & challenges log
├── README.md                       # Setup guide, structure & project disclosure
├── postcss.config.mjs              # PostCSS configuration for Tailwind v4
└── package.json
```

---

## Setup & Running Locally

### Prerequisites
- **Node.js**: v18.18+ or v20+ (Node v25 supported)
- **npm** (or pnpm / yarn)

### 1. Installation
```bash
# Navigate to project directory
cd teddypups-uae

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## AI Tools & Development Workflow
- **Google Antigravity**: Autonomous multi-phase software engineering agent for project scaffolding, asset pipeline automation, DOM extraction, component synthesis, and build validation.
- **DeepMind Gemini Models**: Code generation, TypeScript interface modeling, and layout fidelity optimization.
