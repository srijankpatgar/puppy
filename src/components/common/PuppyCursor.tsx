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
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop screens with a mouse / fine pointer
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsSupported(true);

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

    // Canvas render loop for fading brown paw footsteps
    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = now - p.born;
        if (age > 1200) {
          prints.splice(i, 1);
          continue;
        }
        const fade = age < 700 ? 1 : 1 - (age - 700) / 500;
        ctx.globalAlpha = 0.38 * fade * fade;
        ctx.setTransform(0.24 * dpr, 0, 0, 0.24 * dpr, p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = "#A8481C"; // Authentic brand warm toffee brown
        ctx.fill(pawPath);
      }

      if (prints.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isLoopActive = false;
      }
    };

    // Track mouse position with zero lag
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setIsVisible(true);

      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, .tp-door__link, .cursor-pointer'
        );
        setIsHovering(!!interactive);
      }

      if (Number.isNaN(lastX)) {
        lastX = x;
        lastY = y;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      distAccum += Math.hypot(dx, dy);

      // Stamp a subtle paw step every 48 pixels of movement
      if (distAccum >= 48) {
        distAccum = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        stepSign = -stepSign;
        const offset = 8 * stepSign;

        prints.push({
          x: x + Math.cos(angle) * offset,
          y: y + Math.sin(angle) * offset,
          angle,
          born: performance.now(),
        });

        if (prints.length > 20) prints.shift();

        if (!isLoopActive) {
          isLoopActive = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = x;
      lastY = y;
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isSupported) return null;

  return (
    <>
      {/* 1. Footprints Canvas Trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] size-full"
      />

      {/* 2. Custom Brown Puppy Paw Cursor Element */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform",
        }}
      >
        <div
          className={`relative -top-3 -left-3 size-9 transition-transform duration-150 ease-out ${
            isPressed
              ? "scale-85"
              : isHovering
              ? "scale-125 -rotate-12"
              : "scale-100 rotate-0"
          }`}
        >
          {/* Paw Icon SVG */}
          <svg
            viewBox="0 0 64 64"
            className="size-full drop-shadow-[0_2px_4px_rgba(42,23,14,0.35)]"
          >
            <path
              transform="rotate(-18 32 34)"
              fill={isPressed ? "#2A170E" : "#C2622B"}
              stroke={isPressed ? "#F2BE6B" : "#2A170E"}
              strokeWidth="3.4"
              strokeLinejoin="round"
              d={PAW_PATH_D}
            />
          </svg>
        </div>
      </div>
    </>
  );
}
