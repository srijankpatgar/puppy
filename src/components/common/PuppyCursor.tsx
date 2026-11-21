"use client";

import { useEffect, useRef, useState } from "react";

// Official SVG path for the TeddyPups paw footprint
const PAW_PATH_D =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

interface PawPrint {
  x: number;
  y: number;
  angle: number;
  born: number;
}

export function PuppyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on desktop screens with a mouse / fine pointer
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsSupported(true);
    document.documentElement.classList.add("has-custom-cursor");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pawPath = new Path2D(PAW_PATH_D);
    const prints: PawPrint[] = [];
    let dpr = 1;
    let animId = 0;
    let isLoopActive = false;
    let lastX = NaN;
    let lastY = NaN;
    let distAccum = 0;
    let stepSign = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    // Canvas render loop for fading paw prints
    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = now - p.born;
        if (age > 1000) {
          prints.splice(i, 1);
          continue;
        }
        const fade = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.42 * fade * fade;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = "#c2622b"; // Authentic brand toffee color
        ctx.fill(pawPath);
      }

      if (prints.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isLoopActive = false;
      }
    };

    // Track mouse position and velocity
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      // Update interactive custom cursor element
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, input, select, textarea, [role='button'], .tp-door__link, [data-interactive='true']")
      );
      setIsHovering(isInteractive);

      // Record steps for paw trail
      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      distAccum += Math.hypot(dx, dy);

      if (distAccum >= 46) {
        distAccum = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        stepSign = -stepSign;
        const offset = 7 * stepSign;

        prints.push({
          x: e.clientX + Math.cos(angle) * offset + 14,
          y: e.clientY + Math.sin(angle) * offset + 16,
          angle,
          born: performance.now(),
        });

        if (prints.length > 14) prints.shift();

        if (!isLoopActive) {
          isLoopActive = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!isSupported) return null;

  return (
    <>
      {/* Background canvas for footsteps */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] size-full"
      />

      {/* Real-time custom puppy paw pointer */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[80] -ml-4 -mt-4 will-change-transform transition-opacity duration-200"
      >
        <div
          className={`size-9 flex items-center justify-center transition-transform duration-150 ease-out drop-shadow-[0_2px_8px_rgba(42,23,14,0.35)] ${
            isClicking
              ? "scale-85 rotate-[-8deg]"
              : isHovering
              ? "scale-125 rotate-[12deg]"
              : "scale-100 rotate-0"
          }`}
        >
          <svg
            viewBox="0 0 64 64"
            className="size-full"
            fill={isHovering ? "#c2622b" : "#2a170e"}
          >
            {/* Paw Base & Pad */}
            <path
              d={PAW_PATH_D}
              className="transition-colors duration-200"
            />
            {/* Inner highlights on paw beans */}
            <circle cx="32" cy="44" r="3" fill="#f2be6b" opacity="0.65" />
            <circle cx="15" cy="30" r="1.5" fill="#f2be6b" opacity="0.65" />
            <circle cx="24" cy="17" r="1.5" fill="#f2be6b" opacity="0.65" />
            <circle cx="40" cy="17" r="1.5" fill="#f2be6b" opacity="0.65" />
            <circle cx="49" cy="30" r="1.5" fill="#f2be6b" opacity="0.65" />
          </svg>
        </div>
      </div>
    </>
  );
}
