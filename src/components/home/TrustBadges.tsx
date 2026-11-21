import { ShieldCheck, HeartPulse, Clock, Globe } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Vet-checked & healthy",
    description:
      "Every puppy comes vaccinated, dewormed, and with a verified health certificate.",
  },
  {
    icon: HeartPulse,
    title: "Korea to Dubai, safely",
    description:
      "Trusted breeders, safe travel, and premium care from start to finish.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description:
      "Always here to help, from choosing your puppy to post-delivery support.",
  },
  {
    icon: Globe,
    title: "Trusted by families worldwide",
    description: "Puppies delivered to loving homes all around the world.",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 sm:py-24 bg-milk/60 border-t border-cocoa/10">
      <div className="gutter">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-scrawl text-toffee text-lg">puppy passport</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa mt-2">
            Why families trust TeddyPups
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col p-6 sm:p-8 rounded-3xl bg-white border border-cocoa/10 shadow-sm hover:border-honey hover:shadow-md transition-all duration-300"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-honey/20 text-toffee mb-6 shadow-sm">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-cocoa">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
