# Development Notes & Decisions Log

## Phase 1: Setup, Data & Assets

### Objectives
- Initialize Next.js (App Router) + TypeScript + Tailwind CSS project.
- Configure brand typography (Fraunces, Figtree, Shantell Sans) and extracted design tokens.
- Establish centralized site configuration (`src/config/site.ts`) for single phone/WhatsApp number.
- Extract and compile all 42 puppy profiles (15 available + 27 gone-home) into `data/puppies.json`.
- Download all static assets (images, videos, logo) to `/public` to eliminate external hotlinking.
- Establish baseline project build and git repository.

### Technical Decisions
1. **Next.js 16 + Tailwind CSS 4**:
   - Leveraged `@theme` in CSS to declare brand colors (`milk`, `cocoa`, `honey`, `toffee`, `blush`, `sky`) and custom font mappings.
   - Configured `next/font/google` for `Fraunces`, `Figtree`, and `Shantell_Sans` with CSS variable injection to prevent FOIT (Flash of Invisible Text) and ensure zero external runtime layout shifts.

2. **Centralized Contact Configuration**:
   - All contact information (phone number, WhatsApp click-to-chat digits, email, showroom address) is managed exclusively in `src/config/site.ts`.
   - Built helper functions in `src/lib/whatsapp.ts` to generate consistent click-to-chat URLs and pre-formatted inquiry text strings for specific puppies.

3. **Data Schema & Local Asset Strategy**:
   - Inspected Next.js RSC streams and SSR hydration payloads from the live reference site to retrieve 100% authentic puppy metadata, including breed, age, gender, focal points, videos, and image paths.
   - Crawled and saved 158 media assets directly into `public/media/` and `public/brand/` preserving relative URLs so no image or video is hotlinked.
   - Unified both available showroom/imported puppies and adopted gone-home puppies in `data/puppies.json` (and `src/data/puppies.json`).

### Challenges & Resolutions
- **RSC Payload Extraction**: The live site dynamically hid adopted puppies on client navigation until hydration; resolved by extracting the full HTML SSR tree for `/gone-home` and parsing all 27 ticket badges.
- **Turbopack Windows Node 25 Upstream Panic**: Turbopack crashed when loading CSS processors due to a known Node 25 Windows IPC process termination issue. Resolved by installing `@tailwindcss/postcss` with `postcss.config.mjs` and configuring Webpack for clean, stable, fast production builds.

---

## Phase 2: Layout Components

### Objectives
- Build responsive `SiteHeader` with brand identity and desktop/tablet navigation.
- Implement animated `MobileMenu` slide-over drawer with the reference's *"where to, friend?"* overlay.
- Build `SiteFooter` matching exact columns (Home at last, Explore, Say hello, Social pills, Copyright).
- Build `StickyMobileBar` with one-tap WhatsApp and Phone Call actions for mobile users.
- Integrate layout components in `RootLayout`.

### Technical Decisions
1. **Accessibility & Responsive Navigation**:
   - `MobileMenu` traps focus and disables background scroll while open. Closes automatically on route changes or `Escape` key press.
   - Sticky header uses `backdrop-blur` with subtle opacity for smooth content scroll beneath.
2. **Mobile UX**:
   - Bottom padding added to footer on mobile to ensure content isn't obscured by `StickyMobileBar`.

---

## Phase 3: Homepage Implementation

### Objectives
- Implement all 8 distinct sections from `reference/home.md`:
  1. `HeroSection`: Tagline, headline, CTA buttons, horizontal avatar chip lineup carousel, and Pomeranian hero feature banner.
  2. `MeetThePups`: 15 authentic puppy cards with availability status indicators and "Meet them all" card.
  3. `TwoWaysSection`: Showroom visit ("Puppies in Dubai") vs. Concierge import ("Imported for you").
  4. `PuppyJourney`: 3-step numbered adoption flow plus interactive WhatsApp chat widget simulation with breed selector chips and showroom photo grid.
  5. `TrustBadges`: 4 key trust pillars (Vet-checked & healthy, Korea to Dubai safely, 24/7 Support, Worldwide Trust).
  6. `HappyFamiliesSection`: Testimonial quote from Sarah M. in Dubai and 8 client story photo cards.
  7. `FaqPreviewSection`: Interactive accordion answering top 3 adoption questions with direct link to full FAQ.
  8. `BottomCtaSection`: Final conversion card with Max's portrait and showroom visit CTAs.

### Technical Decisions
- Extracted and modularized each section into `src/components/home/` and built reusable `PuppyCard` and `Accordion` components.
- Maintained 100% adherence to authentic copy, URLs, and image paths from `reference/home.md`.

---

## Phase 4: Puppies Pages (`/puppies`, `/puppies/[slug]`, `/gone-home`)

### Objectives
- Build `/puppies` directory with multi-parameter URL-synced filters (`breed`, `origin`, `gender`, `sort`).
- Build `/puppies/[slug]` dynamic profile page with media viewer (photos + local video playback), puppy passport health guarantee, and pre-filled WhatsApp inquiry generator.
- Build `/gone-home` adopted puppies gallery featuring authentic flight-ticket cards.

### Technical Decisions
1. **Static Pre-rendering (`generateStaticParams`)**:
   - Pre-generated static pages for all 42 puppies, enabling instant page loads without client-side rendering spinners.
2. **Interactive Video & Media Gallery**:
   - Built `PuppyGallery` with an active media viewer and thumbnail carousel strip.
   - For puppies with local video clips (e.g. Max), rendered HTML5 `<video controls playsInline poster={...}>` with local MP4 playback.
3. **URL Search Parameter State Sync**:
   - Utilized Next.js `useSearchParams` wrapped inside `<Suspense>` on `/puppies` to ensure seamless bookmarking, sharing, and deep-linking (e.g., `/puppies?origin=local`, `/puppies?breed=maltipoo`).

---

## Phase 5: Remaining Pages (`/how-it-works`, `/faq`, `/contact`, `/happy-families`)

### Objectives
- Implement `/how-it-works` with step-by-step concierge process, Korea import logistics, showroom visit guide, and `#delivery` collection anchor.
- Implement `/faq` with live search ("sniff out a question"), note counter, full 9-question accordion list, and direct question prompt.
- Implement `/contact` with interactive letter-style enquiry form, showroom address, hours, and WhatsApp appointment booking.
- Implement `/happy-families` with client testimonial spotlight and 64-moments photo wall.

### Technical Decisions
1. **Interactive Client Search in FAQ**:
   - Developed `FaqClient` allowing instant, zero-latency filtering across questions and answers simultaneously.
2. **Creative Letter-Style Contact Form**:
   - Implemented `ContactForm` matching the reference site's conversational letter format, with live state binding and preformatted WhatsApp forward handoff.

---

## Phase 6 & 7: Forms, 404, Polish & Pixel Fidelity

### Objectives
- Create custom 404 missing puppy flyer page (`src/app/not-found.tsx`) with tear-off pull tabs back to main sections.
- Create desktop floating WhatsApp concierge trigger (`src/components/common/FloatingWhatsApp.tsx`).
- Full responsive audit across mobile, tablet, and desktop viewports.
- Production build validation with zero errors.

### Technical Decisions
1. **Missing Puppy Flyer 404 Aesthetic**:
   - Replicated the authentic missing-puppy flyer design with torn paper pull-tabs at the bottom.
2. **Device-Specific WhatsApp CTAs**:
   - Handled cleanly between mobile viewports (`StickyMobileBar` at bottom) and desktop viewports (`FloatingWhatsApp` in corner with tooltip hover).
