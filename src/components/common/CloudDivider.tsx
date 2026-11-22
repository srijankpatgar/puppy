"use client";

interface CloudDividerProps {
  position?: "top" | "bottom";
  fill?: string;
  className?: string;
  flip?: boolean;
}

export function CloudDivider({
  position = "bottom",
  fill = "#FFF6E5",
  className = "",
  flip = false,
}: CloudDividerProps) {
  // Semicircle bumps with a dashed stitch line inside as specified in the reference
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${
        position === "top" ? "-mt-1" : "-mb-1"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-7 sm:h-10 lg:h-14 block ${
          position === "top" ? "rotate-180" : ""
        } ${flip ? "-scale-x-100" : ""}`}
      >
        {/* Scalloped Semicircle Cloud Bumps */}
        <path
          d="M0 54 C50 54 60 12 120 12 C180 12 190 54 240 54 C290 54 300 12 360 12 C420 12 430 54 480 54 C530 54 540 12 600 12 C660 12 670 54 720 54 C770 54 780 12 840 12 C900 12 910 54 960 54 C1010 54 1020 12 1080 12 C1140 12 1150 54 1200 54 C1250 54 1260 12 1320 12 C1380 12 1390 54 1440 54 V0 H0 V54 Z"
          fill={fill}
        />
        {/* Outer subtle edge stroke */}
        <path
          d="M0 54 C50 54 60 12 120 12 C180 12 190 54 240 54 C290 54 300 12 360 12 C420 12 430 54 480 54 C530 54 540 12 600 12 C660 12 670 54 720 54 C770 54 780 12 840 12 C900 12 910 54 960 54 C1010 54 1020 12 1080 12 C1140 12 1150 54 1200 54 C1250 54 1260 12 1320 12 C1380 12 1390 54 1440 54"
          stroke="rgba(42, 23, 16, 0.12)"
          strokeWidth="2"
          fill="none"
        />
        {/* Dashed Stitch Line inside the bumps */}
        <path
          d="M0 48 C50 48 60 18 120 18 C180 18 190 48 240 48 C290 48 300 18 360 18 C420 18 430 48 480 48 C530 48 540 18 600 18 C660 18 670 48 720 48 C770 48 780 18 840 18 C900 18 910 48 960 48 C1010 48 1020 18 1080 18 C1140 18 1150 48 1200 48 C1250 48 1260 18 1320 18 C1380 18 1390 48 1440 48"
          stroke="rgba(42, 23, 16, 0.28)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
