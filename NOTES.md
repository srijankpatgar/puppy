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
