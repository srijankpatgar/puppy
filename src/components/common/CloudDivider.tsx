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
  // Scalloped cloud edge matching reference
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${
        position === "top" ? "-mt-1" : "-mb-1"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-6 sm:h-9 lg:h-12 block ${
          position === "top" ? "rotate-180" : ""
        } ${flip ? "-scale-x-100" : ""}`}
      >
        <path
          d="M0 48C60 48 80 16 144 16C208 16 228 48 288 48C348 48 368 16 432 16C496 16 516 48 576 48C636 48 656 16 720 16C784 16 804 48 864 48C924 48 944 16 1008 16C1072 16 1092 48 1152 48C1212 48 1232 16 1296 16C1360 16 1380 48 1440 48V0H0V48Z"
          fill={fill}
        />
        {/* Subtle decorative bottom border line */}
        <path
          d="M0 48C60 48 80 16 144 16C208 16 228 48 288 48C348 48 368 16 432 16C496 16 516 48 576 48C636 48 656 16 720 16C784 16 804 48 864 48C924 48 944 16 1008 16C1072 16 1092 48 1152 48C1212 48 1232 16 1296 16C1360 16 1380 48 1440 48"
          stroke="rgba(42, 23, 16, 0.08)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
