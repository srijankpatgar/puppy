"use client";

import { useEffect, useRef, useState } from "react";

// Official SVG path for the TeddyPups paw footprint trail
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
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
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

    // Helper to stamp a cute paw print at (x, y)
    const stampPaw = (x: number, y: number, customAngle?: number) => {
      const angle =
        customAngle !== undefined
          ? customAngle
          : (Math.random() - 0.5) * 0.6 - Math.PI / 14;

      prints.push({
        x,
        y,
        angle,
        born: performance.now(),
      });

      if (prints.length > 28) prints.shift();

      if (!isLoopActive) {
        isLoopActive = true;
        animId = requestAnimationFrame(render);
      }
    };

    // Canvas render loop for fading brown paw footsteps
    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = now - p.born;
        if (age > 1300) {
          prints.splice(i, 1);
          continue;
        }
        const fade = age < 700 ? 1 : 1 - (age - 700) / 600;
        ctx.globalAlpha = 0.42 * fade * fade;
        ctx.setTransform(0.24 * dpr, 0, 0, 0.24 * dpr, p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = "#8E3F15"; // Warm brown dog paw stamp
        ctx.fill(pawPath);
      }

      if (prints.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isLoopActive = false;
      }
    };

    // Track mouse position to stamp footprint trail (laptop/desktop)
    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      if ("pointerType" in e && e.pointerType === "touch") return; // handled by touch

      const x = e.clientX;
      const y = e.clientY;

      if (Number.isNaN(lastX)) {
        lastX = x;
        lastY = y;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      distAccum += Math.hypot(dx, dy);

      // Stamp a subtle brown paw step every 45 pixels of movement
      if (distAccum >= 45) {
        distAccum = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        stepSign = -stepSign;
        const offset = 8 * stepSign;

        stampPaw(x + Math.cos(angle) * offset, y + Math.sin(angle) * offset, angle);
      }

      lastX = x;
      lastY = y;
    };

    // Touch tap support for mobile phones & tablets
    const onTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        stampPaw(t.clientX, t.clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isSupported) return null;

  return (
    /* Footprints Canvas Trail */
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] size-full"
    />
  );
}
