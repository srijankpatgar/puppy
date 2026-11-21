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
- **Tailwind v4 Theme Integration**: Tailwind v4 uses standard `@theme` declarations rather than `tailwind.config.js`; adjusted configuration directly into `globals.css` with CSS variables for seamless font and color resolution.
