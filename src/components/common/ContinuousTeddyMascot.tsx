"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// TIMINGS & EASING CONSTANTS (TECH RULES COMPLIANT)
// ============================================================================
export const HERO_PATROL_INTERVAL = 3200; // ms between idle arch hops
export const BLINK_INTERVAL = 3400; // ms
export const EAR_WIGGLE_INTERVAL = 2900; // ms
export const ARCH_LIFT_PX = 8; // lift arch by 8px when mascot is under it
export const TAG_ROTATE_DEG = -4; // tilted white pill tag

export type MascotPose =
  | "head-peek"
  | "running"
  | "falling"
  | "sitting"
  | "in-basket";

interface ContinuousTeddyMascotProps {
  heroActiveArch: number;
  onSelectHeroArch: (index: number) => void;
  puppyBreeds: { name: string; breed: string }[];
}

export function ContinuousTeddyMascot({
  heroActiveArch,
  onSelectHeroArch,
  puppyBreeds,
}: ContinuousTeddyMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [currentPose, setCurrentPose] = useState<MascotPose>("head-peek");
  const [isBlinking, setIsBlinking] = useState(false);
  const [earWiggle, setEarWiggle] = useState(false);
  const [tagText, setTagText] = useState("");
  const [tagVisible, setTagVisible] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<string>("hero");
  const [basketClicked, setBasketClicked] = useState(false);
  const patrolTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Periodic blinking & ear wiggling loops
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, BLINK_INTERVAL);

    const earInterval = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 500);
    }, EAR_WIGGLE_INTERVAL);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(earInterval);
    };
  }, []);

  // 2. Hero Idle Patrol: every ~3s slides to another arch and springs its tag
  const patrolToArch = useCallback(
    (targetIndex: number) => {
      const archSlot = document.querySelector(
        `[data-arch-slot="${targetIndex}"]`
      ) as HTMLElement | null;
      if (!archSlot || !mascotRef.current) return;

      const rect = archSlot.getBoundingClientRect();
      const breedInfo = puppyBreeds[targetIndex] || {
        name: "Max",
        breed: "Maltipoo",
      };

      // Set tag info
      setTagText(breedInfo.breed);
      setTagVisible(true);
      onSelectHeroArch(targetIndex);

      // Smooth slide to target arch
      gsap.to(mascotRef.current, {
        x: rect.left + rect.width / 2 - 70,
        y: rect.top - 55,
        duration: 0.65,
        ease: "power2.out",
      });
    },
    [puppyBreeds, onSelectHeroArch]
  );

  // Initialize and run patrol loop when user is at the top (hero section)
  useEffect(() => {
    const startPatrol = () => {
      patrolTimerRef.current = setInterval(() => {
        if (window.scrollY > 150) return; // Only patrol when in hero
        const nextIndex = (heroActiveArch + 1) % puppyBreeds.length;
        patrolToArch(nextIndex);
      }, HERO_PATROL_INTERVAL);
    };

    startPatrol();
    return () => {
      if (patrolTimerRef.current) clearInterval(patrolTimerRef.current);
    };
  }, [heroActiveArch, puppyBreeds.length, patrolToArch]);

  // When external arch hover happens, immediately slide mascot to it
  useEffect(() => {
    if (window.scrollY < 150) {
      patrolToArch(heroActiveArch);
    }
  }, [heroActiveArch, patrolToArch]);

  // 3. MASTER SCROLLTRIGGER TIMELINE (Ties mascot to slots across the whole page)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      if (!mascotRef.current) return;

      // Master scroll timeline
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onUpdate: (self) => {
            const p = self.progress;

            // Pose state machine based on scroll progress
            if (p < 0.08) {
              setCurrentPose("head-peek");
              setCurrentSlot("hero");
            } else if (p >= 0.08 && p < 0.14) {
              setCurrentPose("running");
              setCurrentSlot("hero-edge");
            } else if (p >= 0.14 && p < 0.22) {
              setCurrentPose("falling");
              setCurrentSlot("doors-descent");
            } else if (p >= 0.22 && p < 0.38) {
              setCurrentPose("head-peek");
              setCurrentSlot("doors");
            } else if (p >= 0.38 && p < 0.54) {
              setCurrentPose("sitting");
              setCurrentSlot("imported");
            } else if (p >= 0.54 && p < 0.70) {
              setCurrentPose("sitting");
              setCurrentSlot("twoways");
            } else if (p >= 0.70 && p < 0.82) {
              setCurrentPose("head-peek");
              setCurrentSlot("steps");
            } else if (p >= 0.82 && p < 0.92) {
              setCurrentPose("head-peek");
              setCurrentSlot("faq");
            } else {
              setCurrentPose("in-basket");
              setCurrentSlot("footer");
            }
          },
        },
      });

      // Query slot elements
      const doorsSlot = document.querySelector(
        '[data-mascot-slot="doors-bottom-left"]'
      );
      const importedSlot = document.querySelector(
        '[data-mascot-slot="imported-bottom-right"]'
      );
      const twoWaysSlot = document.querySelector(
        '[data-mascot-slot="twoways-bottom-right"]'
      );
      const stepsSlot = document.querySelector(
        '[data-mascot-slot="steps-step2"]'
      );
      const faqSlot = document.querySelector(
        '[data-mascot-slot="faq-bottom-right"]'
      );
      const footerSlot = document.querySelector(
        '[data-mascot-slot="footer-basket"]'
      );

      // Sequence scrubbed animations
      // Stage 1: Pop out of arches into running pose along scalloped edge
      masterTL
        .to(mascotRef.current, {
          y: "+=120",
          x: "-=180",
          rotation: 0,
          scale: 0.95,
          duration: 0.1,
          ease: "power1.inOut",
        })
        // Stage 2: Turn to vertical falling/sliding pose down toward LEFT passing "Meet the pups"
        .to(mascotRef.current, {
          y: "+=380",
          x: "8vw",
          rotation: -65,
          scale: 0.9,
          duration: 0.12,
          ease: "power2.inOut",
        })
        // Stage 3: Lands in bottom-left corner of doors section, half hidden behind first door card
        .to(mascotRef.current, {
          x: "10vw",
          y: "+=360",
          rotation: 0,
          scale: 1,
          duration: 0.15,
          ease: "back.out(1.5)",
        })
        // Stage 4: Transitions to "Imported for you" slot at bottom-right
        .to(mascotRef.current, {
          x: "72vw",
          y: "+=780",
          rotation: 0,
          scale: 1,
          duration: 0.18,
          ease: "power2.out",
        })
        // Stage 5: Transitions to "Two ways" showroom slot at bottom-right beside button
        .to(mascotRef.current, {
          x: "68vw",
          y: "+=740",
          rotation: 0,
          scale: 1.05,
          duration: 0.16,
          ease: "power2.out",
        })
        // Stage 6: Transitions to Steps section at bottom-left behind Step 2
        .to(mascotRef.current, {
          x: "16vw",
          y: "+=680",
          rotation: 0,
          scale: 1,
          duration: 0.14,
          ease: "power2.out",
        })
        // Stage 7: Transitions to FAQ / Night wall slot at bottom-right
        .to(mascotRef.current, {
          x: "74vw",
          y: "+=620",
          rotation: 0,
          scale: 1,
          duration: 0.12,
          ease: "power2.out",
        })
        // Stage 8: Runs in across "Home, at last." and JUMPS into wicker basket (arc jump + squash)
        .to(mascotRef.current, {
          x: "48vw",
          y: "+=580",
          rotation: 0,
          duration: 0.1,
          ease: "power1.in",
        })
        .to(mascotRef.current, {
          x: "50vw",
          y: "-=45",
          scaleY: 1.15,
          scaleX: 0.9,
          duration: 0.05,
          ease: "power2.out",
        })
        .to(mascotRef.current, {
          x: "50vw",
          y: "+=45",
          scaleY: 0.85,
          scaleX: 1.15,
          duration: 0.05,
          ease: "bounce.out",
        })
        .to(mascotRef.current, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.03,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Tilted White Pill Tag above active arch (in Hero) */}
      <div
        ref={tagRef}
        className={`fixed z-30 transition-all duration-300 pointer-events-none ${
          tagVisible && currentSlot === "hero"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90"
        }`}
        style={{
          transform: `rotate(${TAG_ROTATE_DEG}deg)`,
          left: "50%",
          top: "43%",
          transformOrigin: "center",
        }}
      >
        <div className="bg-[#FFFFFF] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border-[1.5px] border-[#2A1710] shadow-md whitespace-nowrap">
          {tagText || "Korean Teacup Maltipoo"}
        </div>
      </div>

      {/* CONTINUOUS TEDDY MASCOT ELEMENT */}
      <div
        ref={mascotRef}
        className={`absolute w-28 sm:w-36 h-auto cursor-pointer pointer-events-auto transition-transform ${
          currentPose === "in-basket" ? "tp-basket-bob" : ""
        }`}
        style={{
          left: "50%",
          top: "48%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "bottom center",
        }}
        onClick={() => {
          if (currentPose === "in-basket") {
            setBasketClicked((prev) => !prev);
          }
        }}
      >
        {/* Woof bubble when clicked inside basket */}
        {currentPose === "in-basket" && basketClicked && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3 py-1 rounded-full border-2 border-[#5A2E14] shadow-lg whitespace-nowrap animate-bounce">
            woof! 🐾
          </div>
        )}

        {/* POSE 1: HEAD-PEEK (Hero idle, doors bottom-left, steps, FAQ) */}
        {currentPose === "head-peek" && (
          <svg viewBox="0 0 240 180" className="w-full h-auto overflow-visible">
            {/* Floppy Left & Right Ears */}
            <ellipse
              cx="54"
              cy="70"
              rx="24"
              ry="44"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="4"
              transform={`rotate(${earWiggle ? 18 : 12} 54 70)`}
              className="transition-transform duration-300"
            />
            <ellipse
              cx="186"
              cy="70"
              rx="24"
              ry="44"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="4"
              transform={`rotate(${earWiggle ? -18 : -12} 186 70)`}
              className="transition-transform duration-300"
            />

            {/* Head circle */}
            <circle
              cx="120"
              cy="76"
              r="56"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="4.5"
            />
            <circle
              cx="120"
              cy="26"
              r="18"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="4"
            />

            {/* Cream Snout */}
            <ellipse cx="120" cy="94" rx="28" ry="22" fill="#FFF6E5" />
            {/* Rosy Cheeks */}
            <circle cx="82" cy="88" r="8" fill="#F9B9A6" opacity="0.8" />
            <circle cx="158" cy="88" r="8" fill="#F9B9A6" opacity="0.8" />

            {/* Blinking Eyes */}
            {isBlinking ? (
              <g stroke="#2A1710" strokeWidth="3.5" strokeLinecap="round">
                <line x1="92" y1="68" x2="104" y2="68" />
                <line x1="136" y1="68" x2="148" y2="68" />
              </g>
            ) : (
              <g>
                <ellipse cx="98" cy="68" rx="6" ry="7" fill="#2A1710" />
                <ellipse cx="142" cy="68" rx="6" ry="7" fill="#2A1710" />
                <circle cx="96" cy="66" r="2.2" fill="#FFFFFF" />
                <circle cx="140" cy="66" r="2.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Dark Nose & Tongue */}
            <path
              d="M112 88 Q120 83 128 88 Q125 96 120 97 Q115 96 112 88 Z"
              fill="#2A1710"
            />
            <path
              d="M120 97 v5 M114 102 q6 6 12 0"
              stroke="#2A1710"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Collar with golden heart tag */}
            <path
              d="M80 134 Q120 152 160 134 L160 144 Q120 162 80 144 Z"
              fill="#A8481C"
              stroke="#2A1710"
              strokeWidth="3"
            />
            <circle
              cx="120"
              cy="154"
              r="6"
              fill="#FBE3B4"
              stroke="#2A1710"
              strokeWidth="2"
            />

            {/* Paws Resting on Ledge */}
            <ellipse
              cx="84"
              cy="150"
              rx="14"
              ry="10"
              fill="#FFF6E5"
              stroke="#2A1710"
              strokeWidth="3.5"
            />
            <ellipse
              cx="156"
              cy="150"
              rx="14"
              ry="10"
              fill="#FFF6E5"
              stroke="#2A1710"
              strokeWidth="3.5"
            />
          </svg>
        )}

        {/* POSE 2: RUNNING (Horizontal body, legs stretched) */}
        {currentPose === "running" && (
          <svg viewBox="0 0 160 100" className="w-full h-auto overflow-visible">
            {/* Back Legs (stretched) */}
            <rect
              x="24"
              y="55"
              width="8"
              height="26"
              rx="4"
              fill="#C27D2E"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(35 28 55)"
            />
            <rect
              x="42"
              y="55"
              width="8"
              height="26"
              rx="4"
              fill="#C27D2E"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(-30 46 55)"
            />

            {/* Wagging Tail */}
            <ellipse
              cx="16"
              cy="42"
              rx="12"
              ry="8"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(-30 16 42)"
            />

            {/* Horizontal Body */}
            <ellipse
              cx="54"
              cy="50"
              rx="34"
              ry="20"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3"
            />

            {/* Front Legs (stretched) */}
            <rect
              x="72"
              y="58"
              width="8"
              height="26"
              rx="4"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(-40 76 58)"
            />
            <rect
              x="92"
              y="58"
              width="8"
              height="26"
              rx="4"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(35 96 58)"
            />

            {/* Head */}
            <circle
              cx="98"
              cy="34"
              r="22"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3"
            />
            {/* Trailing Ears */}
            <ellipse
              cx="82"
              cy="26"
              rx="8"
              ry="18"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(45 82 26)"
            />
            <ellipse
              cx="114"
              cy="26"
              rx="8"
              ry="18"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(-20 114 26)"
            />

            {/* Eye & Smile */}
            <circle cx="106" cy="30" r="3" fill="#2A1710" />
            <circle cx="104.5" cy="28.5" r="1" fill="#FFFFFF" />
            <ellipse cx="114" cy="36" rx="4" ry="2.5" fill="#2A1710" />
          </svg>
        )}

        {/* POSE 3: FALLING / VERTICAL SLIDE */}
        {currentPose === "falling" && (
          <svg viewBox="0 0 120 150" className="w-full h-auto overflow-visible">
            {/* Head pointed down */}
            <ellipse
              cx="60"
              cy="48"
              rx="22"
              ry="32"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3"
            />
            {/* Paws trailing up */}
            <rect
              x="42"
              y="10"
              width="8"
              height="24"
              rx="4"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(15 46 10)"
            />
            <rect
              x="70"
              y="10"
              width="8"
              height="24"
              rx="4"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2"
              transform="rotate(-15 74 10)"
            />

            {/* Floppy upward ears */}
            <ellipse
              cx="38"
              cy="80"
              rx="9"
              ry="22"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(-30 38 80)"
            />
            <ellipse
              cx="82"
              cy="80"
              rx="9"
              ry="22"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(30 82 80)"
            />

            {/* Head looking down */}
            <circle
              cx="60"
              cy="100"
              r="24"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3"
            />
            <ellipse cx="60" cy="108" rx="12" ry="9" fill="#FFF6E5" />
            <circle cx="52" cy="98" r="3" fill="#2A1710" />
            <circle cx="68" cy="98" r="3" fill="#2A1710" />
            <ellipse cx="60" cy="106" rx="3.5" ry="2" fill="#2A1710" />
          </svg>
        )}

        {/* POSE 4: SITTING (Full body sitting upright with collar) */}
        {currentPose === "sitting" && (
          <svg viewBox="0 0 140 160" className="w-full h-auto overflow-visible">
            {/* Tail */}
            <ellipse
              cx="22"
              cy="126"
              rx="12"
              ry="8"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(-30 22 126)"
            />

            {/* Sitting Haunches */}
            <ellipse
              cx="44"
              cy="128"
              rx="22"
              ry="16"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
            />
            <ellipse
              cx="96"
              cy="128"
              rx="22"
              ry="16"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
            />

            {/* Body */}
            <ellipse
              cx="70"
              cy="98"
              rx="26"
              ry="32"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3"
            />

            {/* Front Legs */}
            <rect
              x="54"
              y="110"
              width="8"
              height="30"
              rx="4"
              fill="#FFF6E5"
              stroke="#2A1710"
              strokeWidth="2.5"
            />
            <rect
              x="78"
              y="110"
              width="8"
              height="30"
              rx="4"
              fill="#FFF6E5"
              stroke="#2A1710"
              strokeWidth="2.5"
            />

            {/* Head */}
            <circle
              cx="70"
              cy="48"
              r="30"
              fill="#F8D08C"
              stroke="#2A1710"
              strokeWidth="3.5"
            />
            {/* Ears */}
            <ellipse
              cx="38"
              cy="42"
              rx="12"
              ry="24"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(12 38 42)"
            />
            <ellipse
              cx="102"
              cy="42"
              rx="12"
              ry="24"
              fill="#E4A352"
              stroke="#2A1710"
              strokeWidth="2.5"
              transform="rotate(-12 102 42)"
            />

            {/* Snout & Eyes */}
            <ellipse cx="70" cy="58" rx="14" ry="11" fill="#FFF6E5" />
            <circle cx="58" cy="44" r="3.5" fill="#2A1710" />
            <circle cx="82" cy="44" r="3.5" fill="#2A1710" />
            <ellipse cx="70" cy="54" rx="4" ry="2.5" fill="#2A1710" />
            <circle cx="50" cy="54" r="4" fill="#F9B9A6" opacity="0.8" />
            <circle cx="90" cy="54" r="4" fill="#F9B9A6" opacity="0.8" />
          </svg>
        )}

        {/* POSE 5: IN-BASKET (Final Footer Element) */}
        {currentPose === "in-basket" && (
          <svg viewBox="0 0 160 140" className="w-full h-auto overflow-visible">
            {/* Puppy inside basket */}
            <g className={basketClicked ? "-translate-y-2" : ""}>
              {/* Ears */}
              <ellipse
                cx="50"
                cy="40"
                rx="14"
                ry="26"
                fill="#E4A352"
                stroke="#2A1710"
                strokeWidth="3"
                className="tp-basket-ear"
                style={{ transformOrigin: "50px 30px" }}
              />
              <ellipse
                cx="110"
                cy="40"
                rx="14"
                ry="26"
                fill="#E4A352"
                stroke="#2A1710"
                strokeWidth="3"
                className="tp-basket-ear"
                style={{ transformOrigin: "110px 30px", animationDelay: "0.2s" }}
              />

              {/* Head */}
              <circle
                cx="80"
                cy="46"
                r="32"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="3.5"
              />
              <circle
                cx="80"
                cy="18"
                r="10"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2.5"
              />

              {/* Snout */}
              <ellipse cx="80" cy="56" rx="16" ry="12" fill="#FFF6E5" />
              <circle cx="58" cy="52" r="5" fill="#F9B9A6" opacity="0.8" />
              <circle cx="102" cy="52" r="5" fill="#F9B9A6" opacity="0.8" />

              {/* Eyes */}
              {isBlinking ? (
                <g stroke="#2A1710" strokeWidth="3" strokeLinecap="round">
                  <line x1="62" y1="42" x2="74" y2="42" />
                  <line x1="86" y1="42" x2="98" y2="42" />
                </g>
              ) : (
                <g>
                  <circle cx="68" cy="42" r="3.5" fill="#2A1710" />
                  <circle cx="92" cy="42" r="3.5" fill="#2A1710" />
                  <circle cx="67" cy="40.5" r="1.2" fill="#FFFFFF" />
                  <circle cx="91" cy="40.5" r="1.2" fill="#FFFFFF" />
                </g>
              )}

              {/* Nose & Smile */}
              <ellipse cx="80" cy="52" rx="4.5" ry="3" fill="#2A1710" />
              {basketClicked ? (
                <path
                  d="M 74 58 Q 80 68 86 58 Z"
                  fill="#E98C8C"
                  stroke="#2A1710"
                  strokeWidth="2"
                />
              ) : (
                <path
                  d="M 80 55 v 3 M 76 58 q 4 4 8 0"
                  stroke="#2A1710"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              )}

              {/* Paws on rim */}
              <ellipse
                cx="56"
                cy="80"
                rx="11"
                ry="7"
                fill="#FFF6E5"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
              <ellipse
                cx="104"
                cy="80"
                rx="11"
                ry="7"
                fill="#FFF6E5"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
            </g>

            {/* Wicker Basket */}
            <g>
              <ellipse
                cx="80"
                cy="82"
                rx="52"
                ry="11"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="3.5"
              />
              <ellipse cx="80" cy="82" rx="46" ry="7" fill="#8E3F15" />
              <path
                d="M 32 82 L 44 124 C 46 130 52 134 60 134 L 100 134 C 108 134 114 130 116 124 L 128 82 Z"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="3.5"
              />
              <path
                d="M 40 98 Q 80 106 120 98 M 43 114 Q 80 122 117 114"
                stroke="#8E3F15"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 58 84 L 54 132 M 80 84 L 80 134 M 102 84 L 106 132"
                stroke="#8E3F15"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
