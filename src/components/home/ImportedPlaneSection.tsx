"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// ============================================================================
// TIMINGS & CONSTANTS
// ============================================================================
const PIN_DISTANCE = "+=1200"; // 1.2 screens of scrubbed pinning
const SIGN_DROP_DURATION = 0.9;
const PATH_STROKE_WIDTH = 3.5;

export function ImportedPlaneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const arrowSignRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dubaiPinRef = useRef<SVGGElement>(null);
  const cloudPuffsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (pathRef.current) pathRef.current.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      if (
        !pinContainerRef.current ||
        !arrowSignRef.current ||
        !planeRef.current ||
        !pathRef.current ||
        !dubaiPinRef.current
      ) {
        return;
      }

      // 1. Wooden Arrow-Shaped Signboard drops in with short swing
      gsap.fromTo(
        arrowSignRef.current,
        { y: -70, opacity: 0, rotate: -6 },
        {
          y: 0,
          opacity: 1,
          rotate: -2,
          duration: SIGN_DROP_DURATION,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Measure path length for stroke-dashoffset drawing
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 2. Pinned Timeline (1.2 screens)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top top",
          end: PIN_DISTANCE,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Plane flies Korea (lower left) to Dubai (right) along curve
      tl.to(
        planeRef.current,
        {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
          duration: 1,
        },
        0
      )
        // Dotted path draws behind it
        .to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        // Gentle bobbing & cloud puffs
        .fromTo(
          cloudPuffsRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 0.8, scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 },
          0.3
        )
        // Dubai pin pulses on arrival
        .fromTo(
          dubaiPinRef.current,
          { scale: 0.8, opacity: 0.6 },
          { scale: 1.45, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.88
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F8D08C] text-[#2A1710] overflow-hidden select-none"
    >
      <CloudDivider position="top" fill="#FFF6E5" className="absolute top-0 inset-x-0" />

      <div
        ref={pinContainerRef}
        className="min-h-screen flex flex-col items-center justify-between py-16 sm:py-20 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto"
      >
        {/* Wooden ARROW-SHAPED Signboard "Imported for you" pointing RIGHT, rotate -2deg */}
        <div
          ref={arrowSignRef}
          className="relative mt-8 sm:mt-12 flex flex-col items-center text-center"
        >
          {/* Hanging Ropes */}
          <div className="flex justify-between w-48 sm:w-60 -mb-2 z-0">
            <div className="w-1.5 h-6 bg-[#5A2E14] rounded-t-full shadow-xs" />
            <div className="w-1.5 h-6 bg-[#5A2E14] rounded-t-full shadow-xs" />
          </div>

          {/* Arrow-Shaped Signboard pointing RIGHT */}
          <div
            className="relative z-10 pl-8 pr-12 sm:pl-10 sm:pr-14 py-3 sm:py-4 bg-gradient-to-r from-[#A8481C] to-[#8E3F15] text-[#FFF6E5] border-3 border-[#2A1710] shadow-[0_6px_0_#5A2E14]"
            style={{
              clipPath:
                "polygon(0% 0%, calc(100% - 24px) 0%, 100% 50%, calc(100% - 24px) 100%, 0% 100%)",
              transform: "rotate(-2deg)",
            }}
          >
            <span className="font-display font-black text-2xl sm:text-4xl text-[#FFF6E5] tracking-wide block drop-shadow-sm">
              Imported for you ➔
            </span>
          </div>
        </div>

        {/* SVG Flight Map: Dotted Brown Curve from Korea (lower LEFT) to Dubai (RIGHT) */}
        <div className="w-full max-w-4xl aspect-[16/9] sm:aspect-[21/9] my-4 relative flex items-center justify-center">
          <svg
            viewBox="0 0 1000 440"
            className="w-full h-full overflow-visible select-none drop-shadow-sm"
          >
            {/* Dotted Brown Curve: Korea (160, 340) up and over to Dubai (840, 160) */}
            <path
              ref={pathRef}
              id="korea-to-dubai-curve"
              d="M 160 340 C 320 80, 680 40, 840 160"
              fill="none"
              stroke="#5A2E14"
              strokeWidth={PATH_STROKE_WIDTH}
              strokeDasharray="8 8"
              strokeLinecap="round"
            />

            {/* Cloud Puffs */}
            <g ref={cloudPuffsRef} opacity="0">
              <circle cx="480" cy="85" r="14" fill="#FFFDF8" opacity="0.9" />
              <circle cx="500" cy="80" r="18" fill="#FFFDF8" opacity="0.95" />
              <circle cx="520" cy="85" r="14" fill="#FFFDF8" opacity="0.9" />
            </g>

            {/* KOREA Departure Pin (lower LEFT: 160, 340) */}
            <g transform="translate(160, 340)">
              <circle r="16" fill="#A8481C" opacity="0.25" />
              <circle r="10" fill="#A8481C" stroke="#2A1710" strokeWidth="2" />
              <circle r="3.5" fill="#FFF6E5" />
              {/* Label */}
              <g transform="translate(0, 24)">
                <rect
                  x="-36"
                  y="-12"
                  width="72"
                  height="22"
                  rx="11"
                  fill="#FFF6E5"
                  stroke="#2A1710"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  className="font-display font-extrabold text-[11px]"
                  fill="#2A1710"
                >
                  🇰🇷 Korea
                </text>
              </g>
            </g>

            {/* DUBAI Arrival Pin (RIGHT: 840, 160) */}
            <g transform="translate(840, 160)">
              <g ref={dubaiPinRef}>
                <circle r="28" fill="#FFF6E5" opacity="0.4" />
                <circle r="18" fill="#5A2E14" opacity="0.2" />
              </g>
              <circle r="12" fill="#2A1710" stroke="#FFF6E5" strokeWidth="2" />
              <circle r="4" fill="#F8D08C" />
              {/* Label */}
              <g transform="translate(0, -24)">
                <rect
                  x="-36"
                  y="-12"
                  width="72"
                  height="22"
                  rx="11"
                  fill="#2A1710"
                  stroke="#F8D08C"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  className="font-display font-extrabold text-[11px]"
                  fill="#FFF6E5"
                >
                  🇦🇪 Dubai
                </text>
              </g>
            </g>

            {/* Cartoon Airplane with Puppy Face Peeking inside Round Window */}
            <g
              ref={planeRef}
              transform="translate(160, 340)"
              style={{ transformOrigin: "center" }}
            >
              {/* White rounded fuselage */}
              <path
                d="M -26 -5 C -30 -5 -36 -2 -38 0 C -36 2 -30 5 -26 5 L 22 5 C 32 5 38 2 38 0 C 38 -2 32 -5 22 -5 Z"
                fill="#FFFDF8"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
              {/* Brown-orange wings */}
              <path
                d="M -4 -5 L -14 -22 C -16 -25 -12 -26 -8 -25 L 10 -5 Z"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="2"
              />
              <path
                d="M -4 5 L -14 22 C -16 25 -12 26 -8 25 L 10 5 Z"
                fill="#A8481C"
                stroke="#2A1710"
                strokeWidth="2"
              />
              {/* Tail Fin */}
              <path
                d="M -28 -5 L -38 -18 C -40 -20 -37 -21 -34 -20 L -24 -5 Z"
                fill="#C27D2E"
                stroke="#2A1710"
                strokeWidth="2"
              />
              {/* Round window with puppy face inside */}
              <circle
                cx="4"
                cy="0"
                r="8"
                fill="#87CEEB"
                stroke="#2A1710"
                strokeWidth="1.8"
              />
              {/* Cute puppy face inside window */}
              <g transform="translate(4, 1) scale(0.55)">
                <ellipse cx="-6" cy="-4" rx="3" ry="5" fill="#C27D2E" />
                <ellipse cx="6" cy="-4" rx="3" ry="5" fill="#C27D2E" />
                <circle cx="0" cy="0" r="7" fill="#F8D08C" />
                <circle cx="-2.5" cy="-1" r="1.2" fill="#2A1710" />
                <circle cx="2.5" cy="-1" r="1.2" fill="#2A1710" />
                <ellipse cx="0" cy="2" rx="1.5" ry="1" fill="#2A1710" />
              </g>
            </g>
          </svg>
        </div>

        {/* Copy + Button "See imported puppies" with mascot slot anchor */}
        <div
          data-mascot-slot="imported-bottom-right"
          className="relative flex flex-col items-center gap-4 text-center max-w-xl mx-auto mb-6 z-10"
        >
          <p className="text-sm sm:text-base text-[#5A2E14] leading-relaxed font-medium">
            Exclusive Korean teacup puppies, delivered. Order from the world&apos;s
            most reputable breeders and let us handle the import.
          </p>

          <Link
            href="/puppies?origin=imported"
            className="btn-chunky py-3.5 px-8 text-sm sm:text-base shadow-[0_5px_0_#5A2E14] flex items-center justify-center gap-2"
          >
            <span>See imported puppies</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#FFF6E5" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
