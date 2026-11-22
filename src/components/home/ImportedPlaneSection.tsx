"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CloudDivider } from "@/components/common/CloudDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// ============================================================================
// TIMINGS & DISTANCE CONSTANTS (TECH RULES COMPLIANT)
// ============================================================================
const PIN_SCROLL_DISTANCE = "+=1000";
const SIGN_SWING_DURATION = 1.2;
const PATH_STROKE_WIDTH = 4;
const PLANE_SCALE = 1;

export function ImportedPlaneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const signboardRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dubaiPulseRef = useRef<SVGGElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = "0";
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = "1";
        ctaRef.current.style.transform = "none";
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (
        !triggerRef.current ||
        !planeRef.current ||
        !pathRef.current ||
        !dubaiPulseRef.current ||
        !ctaRef.current ||
        !signboardRef.current
      ) {
        return;
      }

      // 1. Signboard drop-in and gentle swing
      gsap.fromTo(
        signboardRef.current,
        { y: -80, opacity: 0, rotate: -6 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: SIGN_SWING_DURATION,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Measure total path length for accurate stroke-dashoffset scrub
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 2. Timeline pinned to scroll for the Korea to Dubai flight
      const flightTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: PIN_SCROLL_DISTANCE,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate plane along SVG flight path curve & draw dotted path behind it
      flightTimeline
        .to(
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
        .to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        // Dubai pin pulses on arrival (at ~85% progress)
        .fromTo(
          dubaiPulseRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1.4, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.85
        )
        // CTA button fades and springs in
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 24, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
          0.88
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-quilt-caramel text-[#2A1710] overflow-hidden"
    >
      <CloudDivider position="top" fill="#FFF6E5" className="absolute top-0 inset-x-0" />

      <div
        ref={triggerRef}
        className="min-h-screen flex flex-col items-center justify-between py-16 sm:py-24 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto"
      >
        {/* Wooden Signboard "Imported for you" */}
        <div
          ref={signboardRef}
          className="relative mt-8 sm:mt-12 flex flex-col items-center text-center select-none"
        >
          {/* Hanging Ropes */}
          <div className="flex justify-between w-48 sm:w-64 -mb-3 z-0">
            <div className="w-1.5 h-8 bg-[#5A2E14] rounded-t-full shadow-xs" />
            <div className="w-1.5 h-8 bg-[#5A2E14] rounded-t-full shadow-xs" />
          </div>

          {/* Wooden Board */}
          <div className="relative z-10 px-8 sm:px-12 py-3 sm:py-4 rounded-2xl bg-gradient-to-b from-[#A8481C] to-[#8E3F15] border-3 border-[#2A1710] shadow-[0_8px_0_#5A2E14] tp-signboard-swing">
            <span className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFF6E5] tracking-wide drop-shadow-md block">
              Imported for you
            </span>
            <span className="font-scrawl text-sm sm:text-base text-[#F8D08C] font-semibold block mt-0.5">
              from champion Korean bloodlines to your arms
            </span>
          </div>
        </div>

        {/* SVG Flight Map Area (Korea to Dubai) */}
        <div className="w-full max-w-4xl aspect-[16/9] sm:aspect-[21/9] my-6 relative flex items-center justify-center">
          <svg
            viewBox="0 0 1000 440"
            className="w-full h-full overflow-visible select-none drop-shadow-sm"
          >
            {/* Background Subtle Continental Outlines */}
            <g opacity="0.12" fill="#5A2E14">
              {/* Arabian Peninsula */}
              <path d="M 160 270 Q 220 280 250 340 Q 200 390 140 360 Q 120 310 160 270 Z" />
              {/* Asia Mainland & Korea Peninsula */}
              <path d="M 640 120 Q 750 100 840 110 Q 880 180 820 220 Q 760 200 700 170 Z" />
            </g>

            {/* Dotted Curved Flight Trajectory: Korea (800, 140) to Dubai (200, 310) */}
            <path
              ref={pathRef}
              id="korea-dubai-curve"
              d="M 800 140 C 650 40, 380 90, 200 310"
              fill="none"
              stroke="#5A2E14"
              strokeWidth={PATH_STROKE_WIDTH}
              strokeDasharray="8 8"
              strokeLinecap="round"
            />

            {/* Seoul, Korea Departure Pin */}
            <g transform="translate(800, 140)">
              {/* Ripple aura */}
              <circle r="22" fill="#A8481C" opacity="0.18" />
              <circle r="14" fill="#A8481C" stroke="#2A1710" strokeWidth="2.5" />
              <circle r="5" fill="#FFF6E5" />
              {/* City Label Tag */}
              <g transform="translate(0, -28)">
                <rect
                  x="-42"
                  y="-14"
                  width="84"
                  height="26"
                  rx="13"
                  fill="#FFF6E5"
                  stroke="#2A1710"
                  strokeWidth="2"
                  className="shadow-sm"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="font-display font-bold text-xs"
                  fill="#2A1710"
                >
                  🇰🇷 Korea
                </text>
              </g>
            </g>

            {/* Dubai Arrival Pin with Golden Pulsing Rings */}
            <g transform="translate(200, 310)">
              {/* Pulsing ring indicator */}
              <g ref={dubaiPulseRef}>
                <circle r="36" fill="#F8D08C" opacity="0.35" />
                <circle r="24" fill="#F8D08C" opacity="0.65" />
              </g>
              <circle r="15" fill="#F8D08C" stroke="#2A1710" strokeWidth="2.5" />
              <circle r="6" fill="#2A1710" />
              {/* City Label Tag */}
              <g transform="translate(0, 34)">
                <rect
                  x="-42"
                  y="-14"
                  width="84"
                  height="26"
                  rx="13"
                  fill="#2A1710"
                  stroke="#F8D08C"
                  strokeWidth="2"
                  className="shadow-md"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="font-display font-bold text-xs"
                  fill="#FFF6E5"
                >
                  🇦🇪 Dubai
                </text>
              </g>
            </g>

            {/* Cartoon Airplane with Puppy Face Peeking from the Round Window */}
            <g
              ref={planeRef}
              transform="translate(800, 140) scale(1)"
              style={{ transformOrigin: "center" }}
            >
              {/* Plane Shadow */}
              <ellipse
                cx="0"
                cy="18"
                rx="28"
                ry="7"
                fill="#2A1710"
                opacity="0.18"
              />

              {/* White Airplane Body */}
              <path
                d="M -30 -6 C -34 -6 -40 -3 -42 0 C -40 3 -34 6 -30 6 L 24 6 C 36 6 44 2 44 0 C 44 -2 36 -6 24 -6 Z"
                fill="#FFFDF8"
                stroke="#2A1710"
                strokeWidth="2.5"
              />

              {/* Caramel Wings */}
              {/* Top wing */}
              <path
                d="M -4 -6 L -16 -24 C -18 -27 -14 -28 -10 -27 L 12 -6 Z"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
              {/* Bottom wing */}
              <path
                d="M -4 6 L -16 24 C -18 27 -14 28 -10 27 L 12 6 Z"
                fill="#E4A352"
                stroke="#2A1710"
                strokeWidth="2.5"
              />
              {/* Tail Fin */}
              <path
                d="M -32 -6 L -44 -20 C -46 -22 -43 -23 -40 -22 L -28 -6 Z"
                fill="#F8D08C"
                stroke="#2A1710"
                strokeWidth="2.5"
              />

              {/* Round Cabin Window */}
              <circle
                cx="6"
                cy="0"
                r="9"
                fill="#87CEEB"
                stroke="#2A1710"
                strokeWidth="2"
              />

              {/* Adorable Puppy Face inside Cabin Window */}
              <g transform="translate(6, 1) scale(0.65)">
                {/* Ears */}
                <ellipse cx="-8" cy="-5" rx="3.5" ry="6" fill="#C27D2E" />
                <ellipse cx="8" cy="-5" rx="3.5" ry="6" fill="#C27D2E" />
                {/* Head */}
                <circle cx="0" cy="0" r="8" fill="#F8D08C" />
                {/* Snout */}
                <ellipse cx="0" cy="3" rx="4" ry="3" fill="#FFF6E5" />
                {/* Eyes */}
                <circle cx="-3" cy="-1" r="1.2" fill="#2A1710" />
                <circle cx="3" cy="-1" r="1.2" fill="#2A1710" />
                {/* Tiny nose */}
                <ellipse cx="0" cy="2" rx="1.5" ry="1" fill="#2A1710" />
              </g>
            </g>
          </svg>
        </div>

        {/* Action Button revealed on arrival */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center gap-3 text-center mb-8"
        >
          <p className="font-scrawl text-base sm:text-lg text-[#5A2E14] font-semibold max-w-md">
            Safe pet nanny flights, temperature-controlled, direct to UAE
          </p>
          <Link
            href="/puppies?origin=imported"
            className="btn-chunky text-center flex items-center justify-center gap-2.5 text-base sm:text-lg shadow-[0_6px_0_#5A2E14]"
          >
            <span>See imported puppies</span>
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      <CloudDivider position="bottom" fill="#FFF6E5" className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
