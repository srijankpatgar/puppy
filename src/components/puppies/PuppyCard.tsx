import Link from "next/link";
import Image from "next/image";
import { Puppy } from "@/types/puppy";
import { Video } from "lucide-react";

interface PuppyCardProps {
  puppy: Puppy;
  priority?: boolean;
}

export function PuppyCard({ puppy, priority = false }: PuppyCardProps) {
  const hasVideo = puppy.media.some((m) => m.kind === "video");

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      className="group flex flex-col rounded-2xl bg-white/70 border border-cocoa/10 overflow-hidden shadow-sm hover:shadow-md hover:border-honey/60 transition-all duration-300"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cocoa/5">
        <Image
          src={puppy.cover.url}
          alt={puppy.cover.alt || `${puppy.name}, ${puppy.breed}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover size-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center rounded-full bg-milk/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-cocoa shadow-sm">
            {puppy.status === "available" ? (
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>
            ) : (
              <span className="text-toffee font-medium">Gone Home ♥</span>
            )}
          </span>

          {hasVideo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cocoa/75 backdrop-blur px-2 py-1 text-[11px] font-medium text-milk shadow-sm">
              <Video className="size-3 text-honey" />
              <span>Video</span>
            </span>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-cocoa group-hover:text-toffee transition-colors">
              {puppy.name}
            </h3>
            {puppy.origin?.name && (
              <span className="text-[11px] uppercase tracking-wider font-semibold text-cocoa-soft/70">
                {puppy.origin.name}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs sm:text-sm text-cocoa-soft">
            {puppy.breed}
            {puppy.genderLabel ? `, ${puppy.genderLabel.toLowerCase()}` : ""}
            {puppy.age && puppy.age !== "Adopted" ? `, ${puppy.age}` : ""}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-cocoa/5 flex items-center justify-between text-xs font-semibold text-toffee">
          <span>View profile</span>
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
