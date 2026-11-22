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
  const [isBlinking, setIsBlinking] = useState(false);
  const [earWiggle, setEarWiggle] = useState(false);

  // Natural blinking & ear wiggle loops
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200);

    const earTimer = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 550);
    }, 4500);

    return () => {
      clearInterval(blinkTimer);
      clearInterval(earTimer);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className={`relative inline-block select-none ${className}`}
    >
      {/* Optional Speech Bubble above mascot */}
      {speechBubble && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
          <div className="bg-[#FFF6E5] text-[#2A1710] font-scrawl text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full border-2 border-[#2A1710] shadow-md transform -rotate-2">
            {speechBubble}
          </div>
        </div>
      )}

      {/* POSE 1: HEAD-PEEK (Matches reference hero, doors, steps, porch) */}
      {pose === "head-peek" && (
        <svg
          viewBox="0 0 200 170"
          className="w-full h-auto overflow-visible"
        >
          {/* Floppy Left Ear */}
          <path
            d="M 45 60 C 22 75 14 110 32 135 C 44 148 64 142 66 122 C 68 102 62 76 45 60 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="transition-transform duration-300"
            style={{
              transformOrigin: "52px 65px",
              transform: earWiggle ? "rotate(14deg)" : "rotate(0deg)",
            }}
          />

          {/* Floppy Right Ear */}
          <path
            d="M 155 60 C 178 75 186 110 168 135 C 156 148 136 142 134 122 C 132 102 138 76 155 60 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="transition-transform duration-300"
            style={{
              transformOrigin: "148px 65px",
              transform: earWiggle ? "rotate(-14deg)" : "rotate(0deg)",
            }}
          />

          {/* Top Bun / Pom-pom */}
          <g>
            <circle cx="100" cy="30" r="18" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />
            <circle cx="92" cy="24" r="10" fill="#F6BE68" />
            <circle cx="108" cy="24" r="10" fill="#F6BE68" />
            <circle cx="100" cy="20" r="11" fill="#F6BE68" />
          </g>

          {/* Head with Puffy Curly Scalloped Silhouette */}
          <path
            d="
              M 65 60
              C 52 50 42 70 42 85
              C 40 102 52 118 64 125
              C 76 132 90 135 100 135
              C 110 135 124 132 136 125
              C 148 118 160 102 158 85
              C 158 70 148 50 135 60
              C 125 45 115 42 100 42
              C 85 42 75 45 65 60 Z
            "
            fill="#F6BE68"
            stroke="#2A1710"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />

          {/* Cream / Ivory Snout */}
          <ellipse cx="100" cy="98" rx="26" ry="20" fill="#FFF4E0" />

          {/* Rosy Pink Cheeks */}
          <ellipse cx="68" cy="95" rx="9" ry="7" fill="#FFAAA6" opacity="0.85" />
          <ellipse cx="132" cy="95" rx="9" ry="7" fill="#FFAAA6" opacity="0.85" />

          {/* Eyes (Blinking vs Kawaii Shine) */}
          {isBlinking ? (
            <g stroke="#2A1710" strokeWidth="3.8" strokeLinecap="round" fill="none">
              <path d="M 76 80 Q 84 87 92 80" />
              <path d="M 108 80 Q 116 87 124 80" />
            </g>
          ) : (
            <g>
              <ellipse cx="84" cy="78" rx="7.5" ry="8.5" fill="#2A1710" />
              <ellipse cx="116" cy="78" rx="7.5" ry="8.5" fill="#2A1710" />
              {/* Double White Highlights */}
              <circle cx="81.5" cy="75" r="2.8" fill="#FFFFFF" />
              <circle cx="86.5" cy="80.5" r="1.3" fill="#FFFFFF" />
              <circle cx="113.5" cy="75" r="2.8" fill="#FFFFFF" />
              <circle cx="118.5" cy="80.5" r="1.3" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose & Smile */}
          <path
            d="M 93 92 Q 100 87 107 92 Q 104 99 100 100 Q 96 99 93 92 Z"
            fill="#2A1710"
          />
          <path
            d="M 100 100 v 4 M 94 104 q 6 6 12 0"
            stroke="#2A1710"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 97 106 q 3 5 6 0"
            fill="#FFAAA6"
            stroke="#2A1710"
            strokeWidth="1.5"
          />

          {/* Brown Leather Collar with Golden Heart Tag */}
          <path
            d="M 72 130 Q 100 144 128 130 L 128 138 Q 100 152 72 138 Z"
            fill="#4A2311"
            stroke="#2A1710"
            strokeWidth="2.8"
          />
          <path
            d="M 96 142 L 100 148 L 104 142 Q 104 139 100 140 Q 96 139 96 142 Z"
            fill="#F8D08C"
            stroke="#2A1710"
            strokeWidth="1.8"
          />

          {/* Front Paws resting on ledge */}
          <ellipse cx="68" cy="148" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
          <line x1="64" y1="147" x2="64" y2="154" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
          <line x1="72" y1="147" x2="72" y2="154" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />

          <ellipse cx="132" cy="148" rx="14" ry="9" fill="#FFF4E0" stroke="#2A1710" strokeWidth="3" />
          <line x1="128" y1="147" x2="128" y2="154" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
          <line x1="136" y1="147" x2="136" y2="154" stroke="#2A1710" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {/* POSE 2: SITTING (Matches reference showroom crop & imported section) */}
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
            strokeWidth="3.8"
            strokeLinejoin="round"
          />

          {/* Cream Snout */}
          <ellipse cx="170" cy="86" rx="22" ry="16" fill="#FFF4E0" />
          <ellipse cx="142" cy="84" rx="8" ry="6" fill="#FFAAA6" opacity="0.85" />
          <ellipse cx="198" cy="84" rx="8" ry="6" fill="#FFAAA6" opacity="0.85" />

          {/* Eyes */}
          {isBlinking ? (
            <g stroke="#2A1710" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 150 72 Q 157 78 164 72" />
              <path d="M 176 72 Q 183 78 190 72" />
            </g>
          ) : (
            <g>
              <ellipse cx="157" cy="70" rx="6.5" ry="7.5" fill="#2A1710" />
              <ellipse cx="183" cy="70" rx="6.5" ry="7.5" fill="#2A1710" />
              <circle cx="155" cy="67.5" r="2.4" fill="#FFFFFF" />
              <circle cx="181" cy="67.5" r="2.4" fill="#FFFFFF" />
            </g>
          )}

          {/* Nose & Smile */}
          <path d="M 165 82 Q 170 78 175 82 Q 173 87 170 88 Q 167 87 165 82 Z" fill="#2A1710" />
          <path d="M 170 88 v 3 M 165 91 q 5 5 10 0" stroke="#2A1710" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Collar */}
          <path d="M 148 112 Q 170 124 192 112 L 192 119 Q 170 131 148 119 Z" fill="#4A2311" stroke="#2A1710" strokeWidth="2.5" />
          <circle cx="170" cy="125" r="4.5" fill="#F8D08C" stroke="#2A1710" strokeWidth="1.8" />

          {/* Paws */}
          <ellipse cx="154" cy="148" rx="12" ry="8" fill="#FFF4E0" stroke="#2A1710" strokeWidth="2.8" />
          <ellipse cx="186" cy="148" rx="12" ry="8" fill="#FFF4E0" stroke="#2A1710" strokeWidth="2.8" />
        </svg>
      )}

      {/* POSE 3: IN-BASKET (Matches reference footer wicker tub crop) */}
      {pose === "in-basket" && (
        <svg
          viewBox="0 0 220 180"
          className="w-full h-auto overflow-visible"
        >
          {/* Left Tassel hanging on basket rim */}
          <g>
            <path d="M 38 88 L 36 122 M 42 88 L 42 124 M 46 88 L 48 122" stroke="#A8682A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="42" cy="88" r="6" fill="#8E3F15" stroke="#2A1710" strokeWidth="2" />
          </g>

          {/* Puppy Head & Paws inside basket */}
          <g
            className="tp-basket-puppy"
            style={{
              animation: "basketBob 2.4s ease-in-out infinite",
            }}
          >
            {/* Top Bun */}
            <circle cx="110" cy="24" r="14" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.2" />

            {/* Floppy Left & Right Ears */}
            <path
              d="M 68 45 C 50 58 45 84 58 102 C 66 112 80 108 82 94 C 84 80 78 58 68 45 Z"
              fill="#EFA952"
              stroke="#2A1710"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M 152 45 C 170 58 175 84 162 102 C 154 112 140 108 138 94 C 136 80 142 58 152 45 Z"
              fill="#EFA952"
              stroke="#2A1710"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* Head */}
            <ellipse cx="110" cy="58" rx="36" ry="34" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.4" />
            <ellipse cx="110" cy="70" rx="20" ry="14" fill="#FFF4E0" />
            <ellipse cx="88" cy="68" rx="7" ry="5" fill="#FFAAA6" opacity="0.85" />
            <ellipse cx="132" cy="68" rx="7" ry="5" fill="#FFAAA6" opacity="0.85" />

            {/* Eyes */}
            {isBlinking ? (
              <g stroke="#2A1710" strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M 94 56 Q 100 62 106 56" />
                <path d="M 114 56 Q 120 62 126 56" />
              </g>
            ) : (
              <g>
                <ellipse cx="100" cy="55" rx="6" ry="7" fill="#2A1710" />
                <ellipse cx="120" cy="55" rx="6" ry="7" fill="#2A1710" />
                <circle cx="98" cy="53" r="2.2" fill="#FFFFFF" />
                <circle cx="118" cy="53" r="2.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Nose & Smile */}
            <ellipse cx="110" cy="66" rx="4.5" ry="3.5" fill="#2A1710" />
            <path d="M 110 70 v 3 M 106 73 q 4 4 8 0" stroke="#2A1710" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Paws on rim */}
            <ellipse cx="82" cy="88" rx="10" ry="7" fill="#FFF4E0" stroke="#2A1710" strokeWidth="2.5" />
            <ellipse cx="138" cy="88" rx="10" ry="7" fill="#FFF4E0" stroke="#2A1710" strokeWidth="2.5" />
          </g>

          {/* Wicker Tub Basket (plaid woven pattern from reference) */}
          <g>
            {/* Basket Rim */}
            <ellipse cx="110" cy="90" rx="76" ry="14" fill="#D99144" stroke="#2A1710" strokeWidth="3.8" />
            <ellipse cx="110" cy="90" rx="68" ry="9" fill="#5A2E14" />

            {/* Basket Body */}
            <path
              d="
                M 36 90
                L 50 148
                C 54 158 64 164 76 164
                L 144 164
                C 156 164 166 158 170 148
                L 184 90
                Z
              "
              fill="#D99144"
              stroke="#2A1710"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* Basket Weave Grid Lines */}
            <g stroke="#9E5D20" strokeWidth="2.2" fill="none">
              {/* Horizontal Weaves */}
              <path d="M 42 110 Q 110 120 178 110" />
              <path d="M 46 130 Q 110 140 174 130" />
              <path d="M 52 148 Q 110 156 168 148" />

              {/* Vertical Ribs */}
              <line x1="68" y1="92" x2="78" y2="164" />
              <line x1="94" y1="94" x2="98" y2="164" />
              <line x1="126" y1="94" x2="122" y2="164" />
              <line x1="152" y1="92" x2="142" y2="164" />
            </g>
          </g>
        </svg>
      )}

      {/* POSE 4: TROTTING / RUNNING (for preloader & motion sequences) */}
      {pose === "trotting" && (
        <svg
          viewBox="0 0 200 150"
          className="w-full h-auto overflow-visible"
        >
          {/* Tail wagging */}
          <g
            style={{
              transformOrigin: "40px 95px",
              animation: "tailWag 0.6s ease-in-out infinite alternate",
            }}
          >
            <circle cx="32" cy="88" r="14" fill="#F6BE68" stroke="#2A1710" strokeWidth="3" />
          </g>

          {/* Trotting Body */}
          <ellipse cx="90" cy="100" rx="46" ry="24" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />

          {/* Head */}
          <circle cx="140" cy="65" r="28" fill="#F6BE68" stroke="#2A1710" strokeWidth="3.5" />
          <circle cx="140" cy="35" r="12" fill="#F6BE68" stroke="#2A1710" strokeWidth="3" />

          {/* Floppy Ear */}
          <path
            d="M 120 50 C 105 65 100 85 112 100 C 120 110 132 104 134 92 Z"
            fill="#EFA952"
            stroke="#2A1710"
            strokeWidth="3"
          />

          {/* Cream Snout */}
          <ellipse cx="152" cy="74" rx="16" ry="12" fill="#FFF4E0" />
          <circle cx="156" cy="70" r="3.5" fill="#2A1710" />
          <circle cx="140" cy="60" r="4" fill="#2A1710" />
          <circle cx="138" cy="58" r="1.5" fill="#FFFFFF" />

          {/* Collar */}
          <rect x="122" y="86" width="16" height="6" rx="2" fill="#4A2311" stroke="#2A1710" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}
