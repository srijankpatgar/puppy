"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Authentic 5-step footprint positions and rotations from reference
const FOOTPRINT_STEPS = [
  { left: 18, top: 6, rot: 14, delay: 0.16 },
  { left: 27, top: -4, rot: 6, delay: 0.28 },
  { left: 36, top: 7, rot: 18, delay: 0.4 },
  { left: 45, top: -3, rot: 4, delay: 0.52 },
  { left: 54, top: 6, rot: 16, delay: 0.64 },
];

const PAW_PATH_D =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

// Running legs paths
const LEG_NEAR = "M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z";
const LEG_FAR = "M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z";

export function RouteCurtain() {
  const pathname = usePathname();
  const [curtainState, setCurtainState] = useState<"intro" | "lifting" | "idle" | "covering" | "covered">("intro");
  const prevPathname = useRef(pathname);

  // Initial page load intro animation
  useEffect(() => {
    // Reveal site after 1.15 seconds
    const liftTimer = setTimeout(() => {
      setCurtainState("lifting");
    }, 1150);

    const idleTimer = setTimeout(() => {
      setCurtainState("idle");
    }, 1650);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // Listen for route changes
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // Trigger transition curtain on route navigation
    setCurtainState("covering");
    const liftTimer = setTimeout(() => {
      setCurtainState("lifting");
    }, 450);

    const idleTimer = setTimeout(() => {
      setCurtainState("idle");
    }, 950);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(idleTimer);
    };
  }, [pathname]);

  if (curtainState === "idle") return null;

  return (
    <div
      className="tp-curtain"
      data-state={curtainState}
      aria-hidden="true"
    >
      <div className="tp-curtain__blanket">
        {/* Scalloped top edge */}
        <svg
          className="tp-curtain__edge tp-curtain__edge--top"
          width="100%"
          height="40"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="tp-curtain-scallop-top"
              width="76"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40V27A38 25 0 0 1 76 27V40Z"
                fill="#fbe3b4"
              />
              <path
                d="M0 27A38 25 0 0 1 76 27"
                fill="none"
                stroke="#2a170e"
                strokeWidth="3"
              />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2a170e"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.42"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-top)" />
        </svg>

        {/* Center Running Puppy Stage */}
        <div className="tp-curtain__stage">
          {/* Stamped Paw Prints along the runner's path */}
          <div className="tp-curtain__prints">
            {FOOTPRINT_STEPS.map((step, idx) => (
              <svg
                key={idx}
                viewBox="0 0 64 64"
                className="tp-curtain__print"
                style={{
                  left: `${step.left}%`,
                  top: `${step.top}px`,
                  transform: `rotate(${step.rot}deg)`,
                  animationDelay: `${step.delay}s`,
                }}
              >
                <path d={PAW_PATH_D} />
              </svg>
            ))}
          </div>

          {/* Running Puppy Character (tp-runner) with SHAKING TAIL */}
          <div className="tp-curtain__runner">
            <svg
              viewBox="0 0 300 240"
              className="tp-runner w-full h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Ground Shadow */}
              <ellipse
                cx="150"
                cy="230"
                rx="86"
                ry="7"
                fill="#2a170e"
                opacity="0.12"
                className="tp-runner__shadow"
              />

              <g className="tp-runner__body">
                {/* Back Far Leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--bf"
                  style={{ transformOrigin: "94px 192px" }}
                >
                  <path d={LEG_FAR} fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
                  <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
                </g>

                {/* Front Far Leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--ff"
                  style={{ transformOrigin: "168px 192px" }}
                >
                  <path d={LEG_FAR} fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
                  <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
                </g>

                {/* Shaking & Wagging Tail */}
                <g
                  className="tp-runner__tail"
                  style={{ transformOrigin: "84px 150px" }}
                >
                  <path d="M86 152 C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="72" cy="132" r="14" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
                </g>

                {/* Back Near Leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--bn"
                  style={{ transformOrigin: "110px 194px" }}
                >
                  <path d={LEG_NEAR} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
                  <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
                </g>

                {/* Fluffy Body */}
                <ellipse cx="148" cy="170" rx="60" ry="34" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
                <circle cx="188" cy="164" r="28" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />

                {/* Front Near Leg */}
                <g
                  className="tp-runner__leg tp-runner__leg--fn"
                  style={{ transformOrigin: "186px 194px" }}
                >
                  <path d={LEG_NEAR} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
                  <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
                </g>

                {/* Bobbing Head */}
                <g className="tp-runner__head">
                  {/* Collar & Golden Tag */}
                  <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" />
                  <circle cx="212" cy="162" r="6" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2" />

                  {/* Floppy Left & Right Ears */}
                  <ellipse cx="166" cy="108" rx="16" ry="30" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" className="tp-runner__ear" style={{ transformOrigin: "174px 82px" }} />
                  <ellipse cx="258" cy="108" rx="16" ry="30" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" className="tp-runner__ear tp-runner__ear--r" style={{ transformOrigin: "250px 82px" }} />

                  {/* Head */}
                  <ellipse cx="212" cy="98" rx="46" ry="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
                  <circle cx="212" cy="56" r="14" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />

                  {/* Cream Snout & Rosy Cheeks */}
                  <ellipse cx="212" cy="118" rx="22" ry="18" fill="#fbe3b4" />
                  <circle cx="182" cy="114" r="6" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="242" cy="114" r="6" fill="#f9b9a6" opacity="0.85" />

                  {/* Happy Smiling Eyes */}
                  <path d="M188 98 Q195 88 202 98 M222 98 Q229 88 236 98" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />

                  {/* Dark Nose & Tongue */}
                  <ellipse cx="212" cy="114" rx="7" ry="5" fill="#2a170e" />
                  <path d="M212 119 v5 M207 124 q5 7 10 0" stroke="#2a170e" strokeWidth="2.4" fill="none" />
                  <path d="M208 126 q4 8 8 0" fill="#e98c8c" stroke="#2a170e" strokeWidth="2" />
                </g>
              </g>
            </svg>
          </div>

          {/* Note Under Runner */}
          <div className="tp-curtain__note text-center">
            <p className="font-scrawl text-lg sm:text-2xl text-[#5A2E14] font-bold">
              hey, just a min…
            </p>
            <p className="font-scrawl text-xs sm:text-sm text-[#A8481C] font-semibold -mt-1 tracking-wide">
              every puppy is family
            </p>
          </div>
        </div>

        {/* Scalloped bottom edge */}
        <svg
          className="tp-curtain__edge tp-curtain__edge--bottom"
          width="100%"
          height="40"
          preserveAspectRatio="none"
        >
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-top)" />
        </svg>
      </div>
    </div>
  );
}
