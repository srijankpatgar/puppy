import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-cocoa">
        {siteConfig.name}
      </h1>
      <p className="font-scrawl text-xl text-toffee mt-3">
        {siteConfig.tagline}
      </p>
      <p className="max-w-md text-cocoa-soft mt-4">
        {siteConfig.description}
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/puppies"
          className="rounded-full bg-honey hover:bg-honey-soft px-6 py-3 font-semibold text-cocoa transition-colors"
        >
          View Available Puppies
        </a>
      </div>
    </main>
  );
}
