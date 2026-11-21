"use client";

import { useEffect, useRef, useState } from "react";
import { TeddyBuddy } from "./TeddyBuddy";

export function ScrollTeddyCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("welcome");
  const [isMinimized, setIsMinimized] = useState(false);
  const [companionPose, setCompanionPose] = useState<"sit" | "walk">("sit");
  const [facingDir, setFacingDir] = useState<"left" | "right">("right");

  const lastScrollY = useRef(0);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = totalScroll > 0 ? (current / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine facing direction and trigger walking stride
      const dy = current - lastScrollY.current;
      if (Math.abs(dy) > 1.5) {
        setCompanionPose("walk");
        if (dy > 0) {
          setFacingDir("right");
        } else {
          setFacingDir("left");
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
