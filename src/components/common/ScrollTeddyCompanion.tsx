"use client";

import { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

const PAW_PATH_D =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

interface Footprint {
  id: number;
  offset: number;
  rot: number;
}

export function ScrollTeddyCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("welcome");
  const [isMinimized, setIsMinimized] = useState(false);
  const [companionPose, setCompanionPose] = useState<"sit" | "walk">("sit");
  const [facingDir, setFacingDir] = useState<"left" | "right">("right");
  const [footprints, setFootprints] = useState<Footprint[]>([]);

  const lastScrollY = useRef(0);
  const scrollAccum = useRef(0);
  const stepCount = useRef(0);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = totalScroll > 0 ? (current / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine facing direction and trigger walking stride
      const dy = current - lastScrollY.current;
      scrollAccum.current += Math.abs(dy);

      if (Math.abs(dy) > 1.5) {
        setCompanionPose("walk");
        if (dy > 0) {
          setFacingDir("right");
        } else {
          setFacingDir("left");
        }

        // Stamp footsteps every 42px of scroll movement
        if (scrollAccum.current >= 42) {
          scrollAccum.current = 0;
          stepCount.current += 1;
          const side = stepCount.current % 2 === 0 ? 1 : -1;
          const newFp: Footprint = {
            id: Date.now() + Math.random(),
            offset: side * 14,
            rot: (dy > 0 ? 8 : -8) + side * 12,
          };

          setFootprints((prev) => [...prev.slice(-7), newFp]);

          // Footprints stay visible for 2.6 seconds, matching the reference site
          setTimeout(() => {
            setFootprints((prev) => prev.filter((fp) => fp.id !== newFp.id));
          }, 2600);
        }
      }
      lastScrollY.current = current;

      // Debounce returning to sit pose when scrolling pauses
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        setCompanionPose("sit");
      }, 350);

      // Section tracker
      if (progress < 15) {
        setCurrentSection("welcome");
      } else if (progress < 35) {
        setCurrentSection("doors");
      } else if (progress < 55) {
        setCurrentSection("showroom");
      } else if (progress < 75) {
        setCurrentSection("journey");
      } else if (progress < 90) {
        setCurrentSection("families");
      } else {
        setCurrentSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    };
  }, []);

  const getSectionMessage = () => {
    switch (currentSection) {
      case "welcome":
        return "welcome to dubai!";
      case "doors":
        return "knock on a door!";
      case "showroom":
        return "open the big doors!";
      case "journey":
        return "safe korea flights!";
      case "families":
        return "so many happy pups!";
      case "contact":
        return "say hi on whatsapp!";
      default:
        return "woof! follow me!";
    }
  };

  return (
    <aside
      aria-label="Teddy Companion"
      className="hidden md:flex fixed bottom-6 left-6 z-40 items-end gap-2 pointer-events-auto select-none"
    >
      <div className="relative group">
        {/* Footprint Trail Stamped Behind Puppy on Scroll (Visible for 2.6s) */}
        <div className="absolute -left-12 bottom-1 w-20 h-8 pointer-events-none overflow-visible flex items-center justify-end">
          {footprints.map((fp) => (
            <svg
              key={fp.id}
              viewBox="0 0 64 64"
              className="absolute size-4.5 fill-toffee"
              style={{
                transform: `translateX(${fp.offset}px) rotate(${fp.rot}deg)`,
                animation: "tp-print-step 2.6s ease-out forwards",
              }}
            >
              <path d={PAW_PATH_D} />
            </svg>
          ))}
        </div>

        {/* Toggle Minimize Button */}
        <button
          type="button"
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -top-3 -right-2 z-30 size-5 rounded-full bg-cocoa text-milk text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          title={isMinimized ? "Show Teddy" : "Minimize Teddy"}
        >
          {isMinimized ? "+" : "−"}
        </button>

        {!isMinimized ? (
          <div className="relative flex flex-col items-center">
            {/* Scroll Context Bubble */}
            <div className="mb-1 rounded-2xl border-2 border-cocoa bg-milk px-3.5 py-1 text-xs font-scrawl font-bold text-cocoa shadow-md animate-in fade-in zoom-in-95 duration-200">
              <span>{getSectionMessage()}</span>
              {/* Little down arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b-2 border-r-2 border-cocoa bg-milk" />
            </div>

            {/* Teddy Character with Walking Stride & Sitting Poses */}
            <div className="w-24 sm:w-28 filter drop-shadow-[0_8px_16px_rgba(42,23,14,0.18)]">
              <TeddyBuddy
                pose={companionPose}
                facing={facingDir}
                showBubble={false}
              />
            </div>

            {/* Scroll Track Progress Bar Under Paws */}
            <div className="w-20 h-1.5 rounded-full bg-cocoa/15 overflow-hidden mt-1">
              <div
                className="h-full bg-toffee transition-all duration-150 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
              />
            </div>
          </div>
        ) : (
          /* Minimized Paw Pill */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1.5 rounded-full bg-milk border-2 border-cocoa px-3 py-1.5 text-xs font-scrawl font-bold text-cocoa shadow-md hover:bg-honey transition-colors"
          >
            <span>🐾 Teddy</span>
          </button>
        )}
      </div>
    </aside>
  );
}
