# TeddyPups U.A.E. Clone

A responsive clone of **TeddyPups U.A.E.** (a Dubai luxury teacup puppy brand), built with Next.js (App Router), TypeScript, and Tailwind CSS.

> [!NOTE]
> **Educational & Assignment Disclaimer**: All branding, trademarks, copy, images, and video assets belong to their respective copyright holders (`TeddyPups U.A.E.` / reference site `https://puppy.instabizweb.com`). This project is developed strictly for educational and portfolio assignment purposes.

---

## Features

- **Pixel-Faithful Design**: Authentic typography (Fraunces serif display, Figtree clean sans, Shantell Sans playful handwriting), exact warm luxury color palette (`milk`, `cocoa`, `honey`, `toffee`, `blush`, `sky`), and brand easings (`ease-silk`, `ease-snap`).
- **Complete Puppy Dataset**: 42 puppy profiles (15 currently available showroom & imported pups + 27 adopted "Gone Home" puppies) stored locally in `data/puppies.json`.
- **Self-Contained Local Assets**: 158+ images, gallery photos, and videos downloaded into `/public/` — zero external hotlinking.
- **Centralized Contact & WhatsApp**: Single configuration file (`src/config/site.ts`) controlling phone numbers, WhatsApp numbers, email, and showroom location site-wide.
- **Dynamic Query Filtering**: Live client and URL-synced filtering on `/puppies` by breed, origin (Local Showroom vs. Imported), gender, and status.
- **Responsive Architecture**: Desktop navigation, interactive mobile drawer ("where to, friend?"), and a sticky mobile bottom CTA bar with direct WhatsApp and Call actions.

---

## Project Structure

```
teddypups-uae/
├── public/
│   ├── brand/              # Logos, favicon, icons
│   └── media/              # Locally stored puppy photos, videos, and showroom assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with fonts, metadata, and global shell
│   │   ├── page.tsx        # Homepage
│   │   ├── puppies/        # Available puppies directory & [slug] profiles
│   │   ├── gone-home/      # Adopted puppies archive
│   │   ├── happy-families/ # Client stories and reviews
│   │   ├── how-it-works/   # Concierge adoption journey & import guide
│   │   ├── faq/            # Interactive accordions
│   │   ├── contact/        # Showroom location & contact forms
│   │   └── globals.css     # Tailwind v4 theme, tokens & font rules
│   ├── components/         # Modular layout, home, and puppy components
│   ├── config/
│   │   └── site.ts         # Single source of truth for site-wide contact info
│   ├── data/
│   │   ├── puppies.json    # Complete puppy records
│   │   ├── faq.json        # Frequently asked questions
│   │   └── reviews.json    # Customer testimonials & gallery stories
│   ├── types/
│   │   └── puppy.ts        # TypeScript definitions
│   └── lib/
│       ├── utils.ts        # Tailwind class merger
│       └── whatsapp.ts     # WhatsApp link & message generators
├── data/
│   └── puppies.json        # Root-level data mirror
├── NOTES.md                # Running log of technical decisions and challenges
└── package.json
```

---

## Setup & Running Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm (or pnpm / yarn)

### Installation
```bash
# Clone or navigate to the repository
cd teddypups-uae

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## AI Tools Used
- **Antigravity AI**: Automated DOM inspection, Next.js RSC payload extraction, styling reverse engineering, and asset pipeline generation.
- **DeepMind Gemini Models**: Architecture design, TypeScript typing, and responsive layout translation.
