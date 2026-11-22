"use client";

import { useEffect, useState } from "react";

export type TeddyPose = "head-peek" | "sitting" | "in-basket" | "standing" | "trotting";

interface TeddyMascotProps {
  pose?: TeddyPose;
  className?: string;
  speechBubble?: string;
  onClick?: () => void;
}

export function TeddyMascot({
  pose = "head-peek",
  className = "",
  speechBubble,
  onClick,
}: TeddyMascotProps) {
  const [earWiggle, setEarWiggle] = useState(false);

  // Ear wiggle loop every ~4.2s (blinking is handled via CSS .mascot-eye)
  useEffect(() => {
    const earTimer = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 550);
    }, 4200);

    return () => clearInterval(earTimer);
  }, []);

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
    >
      {/* Optional Speech Bubble above mascot */}
      {speechBubble && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border-2 border-[#2A1710] shadow-[0_3px_0_#2A1710] transform -rotate-2">
            {speechBubble}
          </div>
        </div>
      )}

      {/* POSE 1: HEAD-PEEK (1:1 with reference hero crop_y521.jpg, doors, steps, porch) */}
      {pose === "head-peek" && (
        <svg
          viewBox="0 0 220 190"
          className="w-full h-auto overflow-visible drop-shadow-md"
        >
          {/* Floppy Left Ear with Scalloped Edges */}
          <path
            d="M 50 65 C 24 78 12 114 30 142 C 44 156 66 150 70 128 C 72 108 66 82 50 65 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.6"
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-out"
            style={{
              transformOrigin: "58px 72px",
              transform: earWiggle ? "rotate(12deg)" : "rotate(0deg)",
            }}
          />

          {/* Floppy Right Ear with Scalloped Edges */}
          <path
            d="M 170 65 C 196 78 208 114 190 142 C 176 156 154 150 150 128 C 148 108 154 82 170 65 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.6"
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-out"
            style={{
              transformOrigin: "162px 72px",
              transform: earWiggle ? "rotate(-12deg)" : "rotate(0deg)",
            }}
          />

          {/* Top Bun / Pom-pom with Scalloped Curls */}
          <g>
            <circle cx="110" cy="34" r="20" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.6" />
            <circle cx="100" cy="26" r="12" fill="#F6BE68" />
            <circle cx="120" cy="26" r="12" fill="#F6BE68" />
            <circle cx="110" cy="20" r="12" fill="#F6BE68" />
          </g>

          {/* Golden Curly Head Silhouette */}
          <path
            d="
              M 70 68
              C 54 56 42 78 42 95
              C 40 114 54 132 68 140
              C 82 148 98 152 110 152
              C 122 152 138 148 152 140
              C 166 132 180 114 178 95
              C 178 78 166 56 150 68
              C 140 50 128 46 110 46
              C 92 46 80 50 70 68 Z
            "
            fill="#F6BE68"
            stroke="#2A1710"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />

          {/* Soft Cream / Ivory Snout */}
          <ellipse cx="110" cy="110" rx="30" ry="24" fill="#FFF4E0" />

          {/* Cute Rosy Pink Cheeks */}
          <circle cx="75" cy="106" r="9" fill="#FFAAA6" opacity="0.85" />
          <circle cx="145" cy="106" r="9" fill="#FFAAA6" opacity="0.85" />

          {/* Big Kawaii Eyes: CSS-animated Blinking via .mascot-eye */}
          <g>
            {/* Left Eye */}
            <g className="mascot-eye mascot-eye-left">
              <ellipse cx="92" cy="88" rx="8.5" ry="9.5" fill="#2A1710" />
              <circle cx="89" cy="84" r="3.2" fill="#FFFFFF" />
              <circle cx="95" cy="91" r="1.5" fill="#FFFFFF" />
            </g>
            {/* Right Eye */}
            <g className="mascot-eye mascot-eye-right">
              <ellipse cx="128" cy="88" rx="8.5" ry="9.5" fill="#2A1710" />
              <circle cx="125" cy="84" r="3.2" fill="#FFFFFF" />
              <circle cx="131" cy="91" r="1.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* Black Cute Nose & Smile */}
          <path
            d="M 102 103 Q 110 97 118 103 Q 115 111 110 112 Q 105 111 102 103 Z"
            fill="#2A1710"
          />
          <path
            d="M 110 112 v 5 M 103 117 q 7 7 14 0"
            stroke="#2A1710"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tongue */}
          <path
            d="M 107 119 q 3 6 6 0"
            fill="#FFAAA6"
            stroke="#2A1710"
            strokeWidth="1.8"
          />

          {/* Brown Leather Collar with Golden Heart Tag */}
          <path
            d="M 78 144 Q 110 160 142 144 L 142 153 Q 110 169 78 153 Z"
            fill="#4A2311"
            stroke="#2A1710"
            strokeWidth="3.2"
          />
          <path
            d="M 106 158 L 110 165 L 114 158 Q 114 154 110 155 Q 106 154 106 158 Z"
            fill="#F8D08C"
            stroke="#2A1710"
            strokeWidth="2"
          />

          {/* Front Golden Paws resting on bottom cloud/scallop edge */}
          <g>
            {/* Left Paw */}
            <ellipse cx="74" cy="166" rx="16" ry="10" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3.4" />
            <line x1="70" y1="164" x2="70" y2="173" stroke="#2A1710" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="78" y1="164" x2="78" y2="173" stroke="#2A1710" strokeWidth="2.2" strokeLinecap="round" />

            {/* Right Paw */}
            <ellipse cx="146" cy="166" rx="16" ry="10" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3.4" />
            <line x1="142" y1="164" x2="142" y2="173" stroke="#2A1710" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="150" y1="164" x2="150" y2="173" stroke="#2A1710" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {/* POSE 2: SITTING (Matches showroom & imported section) */}
      {pose === "sitting" && (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-auto overflow-visible"
        >
          {/* Fluffy Pom-pom Cloud Tail at the back */}
          <g
            className="transition-transform duration-300"
            style={{
              transformOrigin: "45px 125px",
              animation: "tailWag 1.2s ease-in-out infinite alternate",
            }}
          >
            <circle cx="36" cy="120" r="16" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />
            <circle cx="28" cy="114" r="10" fill="#F6BE68" />
            <circle cx="44" cy="114" r="10" fill="#F6BE68" />
            <circle cx="36" cy="108" r="11" fill="#F6BE68" />
          </g>

          {/* Golden Body */}
          <ellipse
            cx="100"
            cy="138"
            rx="58"
            ry="28"
            fill="#F6BE68"
            stroke="#2A1710"
            strokeWidth="3.5"
          />

          {/* Floppy Left Ear */}
          <path
            d="M 125 55 C 105 70 98 100 114 122 C 124 134 142 128 144 110 C 146 92 140 70 125 55 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Floppy Right Ear */}
          <path
            d="M 215 55 C 235 70 242 100 226 122 C 216 134 198 128 196 110 C 194 92 200 70 215 55 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Top Bun */}
          <circle cx="170" cy="28" r="16" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />

          {/* Head */}
          <path
            d="
              M 140 55
              C 128 45 120 62 120 76
              C 118 92 128 106 140 112
              C 150 118 162 120 170 120
              C 178 120 190 118 200 112
              C 212 106 222 92 220 76
              C 220 62 212 45 200 55
              C 192 42 182 40 170 40
              C 158 40 148 42 140 55 Z
            "
            fill="#F6BE68"
            stroke="#2A1710"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Cream Snout */}
          <ellipse cx="170" cy="90" rx="22" ry="16" fill="#FFF4E0" />

          {/* Cheeks */}
          <ellipse cx="144" cy="86" rx="7" ry="5.5" fill="#FFAAA6" opacity="0.85" />
          <ellipse cx="196" cy="86" rx="7" ry="5.5" fill="#FFAAA6" opacity="0.85" />

          {/* Blinking Eyes via CSS .mascot-eye */}
          <g>
            <g className="mascot-eye mascot-eye-left">
              <ellipse cx="156" cy="72" rx="6" ry="7" fill="#2A1710" />
              <circle cx="154" cy="69" r="2.2" fill="#FFFFFF" />
            </g>
            <g className="mascot-eye mascot-eye-right">
              <ellipse cx="184" cy="72" rx="6" ry="7" fill="#2A1710" />
              <circle cx="182" cy="69" r="2.2" fill="#FFFFFF" />
            </g>
          </g>

          {/* Nose & Smile */}
          <ellipse cx="170" cy="86" rx="6" ry="4" fill="#2A1710" />
          <path d="M 170 90 v 3 M 165 93 q 5 5 10 0" stroke="#2A1710" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Sitting Paws */}
          <ellipse cx="148" cy="154" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
          <line x1="144" y1="152" x2="144" y2="159" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
          <line x1="152" y1="152" x2="152" y2="159" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />

          <ellipse cx="192" cy="154" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
          <line x1="188" y1="152" x2="188" y2="159" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
          <line x1="196" y1="152" x2="196" y2="159" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* POSE 3: IN-BASKET (Matches footer tub basket) */}
      {pose === "in-basket" && (
        <svg
          viewBox="0 0 240 220"
          className="w-full h-auto overflow-visible"
        >
          {/* Fluffy Head peeking from basket */}
          <g style={{ animation: "basketBob 3s ease-in-out infinite" }}>
            {/* Floppy Left Ear */}
            <path
              d="M 55 65 C 32 78 24 112 42 136 C 54 148 74 142 76 122 C 78 102 72 78 55 65 Z"
              fill="#EFA952"
              stroke="#2A1710"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Floppy Right Ear */}
            <path
              d="M 165 65 C 188 78 196 112 178 136 C 166 148 146 142 144 122 C 142 102 148 78 165 65 Z"
              fill="#EFA952"
              stroke="#2A1710"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Top Bun */}
            <circle cx="110" cy="32" r="18" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />

            {/* Head */}
            <path
              d="
                M 75 62
                C 62 52 52 72 52 87
                C 50 104 62 120 74 127
                C 86 134 100 137 110 137
                C 120 137 134 134 146 127
                C 158 120 170 104 168 87
                C 168 72 158 52 145 62
                C 135 47 125 44 110 44
                C 95 44 85 47 75 62 Z
              "
              fill="#F6BE68"
              stroke="#2A1710"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* Snout */}
            <ellipse cx="110" cy="100" rx="26" ry="20" fill="#FFF4E0" />

            {/* Cheeks */}
            <ellipse cx="78" cy="97" rx="9" ry="7" fill="#FFAAA6" opacity="0.85" />
            <ellipse cx="142" cy="97" rx="9" ry="7" fill="#FFAAA6" opacity="0.85" />

            {/* Blinking Eyes via CSS .mascot-eye */}
            <g>
              <g className="mascot-eye mascot-eye-left">
                <ellipse cx="94" cy="80" rx="7.5" ry="8.5" fill="#2A1710" />
                <circle cx="91.5" cy="77" r="2.8" fill="#FFFFFF" />
              </g>
              <g className="mascot-eye mascot-eye-right">
                <ellipse cx="126" cy="80" rx="7.5" ry="8.5" fill="#2A1710" />
                <circle cx="123.5" cy="77" r="2.8" fill="#FFFFFF" />
              </g>
            </g>

            {/* Nose & Smile */}
            <ellipse cx="110" cy="95" rx="7" ry="5" fill="#2A1710" />
            <path d="M 110 100 v 4 M 104 104 q 6 6 12 0" stroke="#2A1710" strokeWidth="2.8" strokeLinecap="round" fill="none" />

            {/* Paws resting on wicker rim */}
            <ellipse cx="78" cy="138" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
            <ellipse cx="142" cy="138" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
          </g>

          {/* Wicker Tub Basket Body */}
          <g>
            {/* Basket Rim */}
            <ellipse cx="120" cy="144" rx="86" ry="16" fill="#C27D2E" stroke="#2A1710" strokeWidth="3.8" />
            <ellipse cx="120" cy="140" rx="80" ry="12" fill="#E4A352" stroke="#2A1710" strokeWidth="2" />

            {/* Basket Tapered Base */}
            <path
              d="M 38 144 L 56 200 C 58 206 66 210 76 210 L 164 210 C 174 210 182 206 184 200 L 202 144 Z"
              fill="#A8621D"
              stroke="#2A1710"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* Woven Cross-Hatch Lines */}
            <path
              d="
                M 60 152 L 170 198
                M 80 148 L 180 184
                M 180 152 L 70 198
                M 160 148 L 60 184
                M 50 170 L 190 170
                M 55 190 L 185 190
              "
              stroke="#2A1710"
              strokeWidth="2.4"
              opacity="0.35"
              fill="none"
            />
          </g>
        </svg>
      )}
    </div>
  );
}
