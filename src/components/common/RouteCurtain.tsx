"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// 5-step footprint positions and rotations from reference
const FOOTPRINT_STEPS = [
  { left: 18, top: 6, rot: 14, delay: 0.16 },
  { left: 27, top: -4, rot: 6, delay: 0.28 },
  { left: 36, top: 7, rot: 18, delay: 0.4 },
  { left: 45, top: -3, rot: 4, delay: 0.52 },
  { left: 54, top: 6, rot: 16, delay: 0.64 },
];

const PAW_PATH_D =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export function RouteCurtain() {
  const pathname = usePathname();
  const [curtainState, setCurtainState] = useState<"intro" | "lifting" | "idle" | "covering" | "covered">("intro");
  const prevPathname = useRef(pathname);

  // Initial page load intro animation
  useEffect(() => {
    const liftTimer = setTimeout(() => {
      setCurtainState("lifting");
    }, 1200);

    const idleTimer = setTimeout(() => {
      setCurtainState("idle");
    }, 1750);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // Listen for route changes to trigger wipe in then out
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    setCurtainState("covering");
    const liftTimer = setTimeout(() => {
      setCurtainState("lifting");
    }, 550);

    const idleTimer = setTimeout(() => {
      setCurtainState("idle");
    }, 1050);

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
                fill="#FFF6E5"
              />
              <path
                d="M0 27A38 25 0 0 1 76 27"
                fill="none"
                stroke="#2A1710"
                strokeWidth="3"
              />
              <path
                d="M11 33A27 19 0 0 1 65 33"
                fill="none"
                stroke="#2A1710"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.4"
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
                <path d={PAW_PATH_D} fill="#A8481C" opacity="0.65" />
              </svg>
            ))}
          </div>

          {/* Running Puppy Character with PROPER TROTTING LEGS and SHAKING TAIL */}
          <div className="tp-curtain__runner">
            <svg
              viewBox="0 0 300 250"
              className="tp-runner w-full h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Ground Shadow */}
              <ellipse
                cx="150"
                cy="234"
                rx="88"
                ry="8"
                fill="#2A1710"
                opacity="0.14"
                className="tp-runner__shadow"
              />

              <g className="tp-runner__dog">
                {/* 1. Far Back Leg (Darker shadow tone, pivoting at hip x=105, y=176) */}
                <g
                  className="tp-runner__leg tp-runner__leg--bf"
                  style={{ transformOrigin: "105px 176px" }}
                >
                  <path
                    d="M 97 176 C 96 188 95 200 93 210 C 91 216 95 222 104 222 C 112 222 116 216 115 210 C 114 200 113 188 112 176 Z"
                    fill="#D98A36"
                    stroke="#2A1710"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="104" cy="220" rx="8" ry="4" fill="#C27320" />
                </g>

                {/* 2. Far Front Leg (Darker shadow tone, pivoting at shoulder x=172, y=176) */}
                <g
                  className="tp-runner__leg tp-runner__leg--ff"
                  style={{ transformOrigin: "172px 176px" }}
                >
                  <path
                    d="M 164 176 C 163 188 162 200 160 210 C 158 216 162 222 171 222 C 179 222 183 216 182 210 C 181 200 180 188 179 176 Z"
                    fill="#D98A36"
                    stroke="#2A1710"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="171" cy="220" rx="8" ry="4" fill="#C27320" />
                </g>

                {/* 3. Shaking Tail */}
                <g className="tp-runner__tail" style={{ transformOrigin: "86px 152px" }}>
                  <path
                    d="M86 152 C80 144 75 138 72 134"
                    stroke="#2A1710"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <ellipse cx="68" cy="124" rx="18" ry="17" fill="#F8D08C" stroke="#2A1710" strokeWidth="3.4" />
                  <circle cx="62" cy="118" r="9" fill="#F8D08C" />
                  <circle cx="74" cy="118" r="9" fill="#F8D08C" />
                </g>

                {/* 4. Golden Fluffy Body */}
                <g className="tp-runner__body">
                  <ellipse cx="140" cy="170" rx="64" ry="36" fill="#F8D08C" stroke="#2A1710" strokeWidth="3.4" />
                  <ellipse cx="192" cy="166" rx="30" ry="32" fill="#F8D08C" stroke="#2A1710" strokeWidth="3.4" />
                </g>

                {/* 5. Near Back Leg (Golden fur, attached to body at hip x=118, y=180) */}
                <g
                  className="tp-runner__leg tp-runner__leg--bn"
                  style={{ transformOrigin: "118px 180px" }}
                >
                  <path
                    d="M 110 180 C 109 192 108 204 106 214 C 104 220 108 226 117 226 C 125 226 129 220 128 214 C 127 204 126 192 125 180 Z"
                    fill="#F8D08C"
                    stroke="#2A1710"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="117" cy="223" rx="8.5" ry="4.5" fill="#FFE3AF" />
                  <line x1="114" y1="219" x2="114" y2="225" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
                  <line x1="120" y1="219" x2="120" y2="225" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* 6. Near Front Leg (Golden fur, attached to body at shoulder x=186, y=180) */}
                <g
                  className="tp-runner__leg tp-runner__leg--fn"
                  style={{ transformOrigin: "186px 180px" }}
                >
                  <path
                    d="M 178 180 C 177 192 176 204 174 214 C 172 220 176 226 185 226 C 193 226 197 220 196 214 C 195 204 194 192 193 180 Z"
                    fill="#F8D08C"
                    stroke="#2A1710"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="185" cy="223" rx="8.5" ry="4.5" fill="#FFE3AF" />
                  <line x1="182" y1="219" x2="182" y2="225" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
                  <line x1="188" y1="219" x2="188" y2="225" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* 7. Bobbing Head */}
                <g className="tp-runner__head">
                  {/* Collar & Golden Tag */}
                  <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#A8481C" stroke="#2A1710" strokeWidth="3" />
                  <circle cx="212" cy="162" r="6" fill="#FBE3B4" stroke="#2A1710" strokeWidth="2" />

                  {/* Floppy Left & Right Ears */}
                  <ellipse cx="166" cy="108" rx="16" ry="30" fill="#E4A352" stroke="#2A1710" strokeWidth="3.4" className="tp-runner__ear" style={{ transformOrigin: "174px 82px" }} />
                  <ellipse cx="258" cy="108" rx="16" ry="30" fill="#E4A352" stroke="#2A1710" strokeWidth="3.4" className="tp-runner__ear tp-runner__ear--r" style={{ transformOrigin: "250px 82px" }} />

                  {/* Head */}
                  <ellipse cx="212" cy="98" rx="46" ry="42" fill="#F8D08C" stroke="#2A1710" strokeWidth="3.4" />
                  <circle cx="212" cy="56" r="14" fill="#F8D08C" stroke="#2A1710" strokeWidth="3" />

                  {/* Cream Snout & Rosy Cheeks */}
                  <ellipse cx="212" cy="118" rx="22" ry="18" fill="#FFF6E5" />
                  <circle cx="182" cy="114" r="6" fill="#F9B9A6" opacity="0.85" />
                  <circle cx="242" cy="114" r="6" fill="#F9B9A6" opacity="0.85" />

                  {/* Happy Smiling Eyes */}
                  <path d="M188 98 Q195 88 202 98 M222 98 Q229 88 236 98" stroke="#2A1710" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />

                  {/* Dark Nose & Tongue */}
                  <ellipse cx="212" cy="114" rx="7" ry="5" fill="#2A1710" />
                  <path d="M212 119 v5 M207 124 q5 7 10 0" stroke="#2A1710" strokeWidth="2.4" fill="none" />
                  <path d="M208 126 q4 8 8 0" fill="#E98C8C" stroke="#2A1710" strokeWidth="2" />
                </g>
              </g>
            </svg>
          </div>

          {/* Note Under Runner: Handwritten "hey, just a min..." + "every puppy is family" */}
          <div className="tp-curtain__note text-center space-y-1 mt-4">
            <p className="font-scrawl text-sm sm:text-base text-[#A8481C] font-bold tracking-wide">
              hey, just a min...
            </p>
            <p className="font-scrawl text-lg sm:text-2xl text-[#5A2E14] font-bold">
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
          <defs>
            <pattern
              id="tp-curtain-scallop-bottom"
              width="76"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0V13A38 25 0 0 0 76 13V0Z"
                fill="#FFF6E5"
              />
              <path
                d="M0 13A38 25 0 0 0 76 13"
                fill="none"
                stroke="#2A1710"
                strokeWidth="3"
              />
              <path
                d="M11 7A27 19 0 0 0 65 7"
                fill="none"
                stroke="#2A1710"
                strokeWidth="1.6"
                strokeDasharray="3.5 5.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-bottom)" />
        </svg>
      </div>
    </div>
  );
}
