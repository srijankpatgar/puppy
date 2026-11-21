"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

export function ShowroomDoorPortal() {
  const [doorsOpen, setDoorsOpen] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-milk via-[#faf3e6] to-milk border-t border-cocoa/10 overflow-hidden">
      <div className="gutter max-w-5xl mx-auto text-center">
        {/* Eyebrow & Headline */}
        <div className="inline-flex items-center gap-1.5 font-scrawl text-toffee text-lg mb-2">
          <Sparkles className="size-4" />
          <span>exclusive dubai boutique</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cocoa">
          Step into our showroom
        </h2>
        <p className="mt-3 text-sm sm:text-base text-cocoa-soft max-w-xl mx-auto leading-relaxed">
          Open the doors to meet our teacup companions in person at Downtown
          Dubai, or close them to replay the experience.
        </p>

        {/* Interactive Door Control Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setDoorsOpen(!doorsOpen)}
            className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 ${
              doorsOpen
                ? "bg-cocoa text-milk hover:bg-cocoa-soft"
                : "bg-honey text-cocoa hover:bg-honey-soft animate-pulse"
            }`}
          >
            <span>{doorsOpen ? "Close Showroom Doors" : "Knock & Open Doors"}</span>
          </button>

          {doorsOpen && (
            <button
              type="button"
              onClick={() => {
                setDoorsOpen(false);
                setTimeout(() => setDoorsOpen(true), 350);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-cocoa/20 bg-white/80 px-4 py-3 text-xs font-bold text-cocoa hover:border-toffee hover:text-toffee transition-colors shadow-xs"
              title="Replay door animation"
            >
              <RotateCcw className="size-3.5" />
              <span>Replay</span>
            </button>
          )}
        </div>

        {/* 3D Double Door Stage Container */}
        <div className="mt-12 relative mx-auto w-full max-w-2xl [perspective:1400px]">
          {/* Arched Threshold & Outer Arch Frame */}
          <div
            className={`relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-t-[14rem] sm:rounded-t-[18rem] border-4 border-cocoa bg-[#1f110a] shadow-2xl overflow-hidden transition-all duration-700 ${
              doorsOpen
                ? "shadow-[0_0_100px_25px_rgba(242,190,107,0.45)] ring-4 ring-honey/40"
                : "shadow-xl"
            }`}
          >
            {/* Interior Showroom Room Content (Revealed when doors open) */}
            <div className="absolute inset-0 size-full overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none">
              <Image
                src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                alt="TeddyPups Dubai Showroom Interior"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className={`object-cover transition-transform duration-1000 ${
                  doorsOpen ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/40 to-transparent" />

              {/* Welcome Badge & CTA inside room */}
              <div
                className={`relative z-10 space-y-3 transition-all duration-700 delay-300 ${
                  doorsOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <span className="inline-block rounded-full bg-honey/90 backdrop-blur px-4 py-1 text-xs font-bold text-cocoa uppercase tracking-wider shadow-sm">
                  Welcome to Downtown Dubai
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-milk drop-shadow-md">
                  Meet Our Rare Teacup Pups
                </h3>
                <div className="pt-2">
                  <Link
                    href="/puppies"
                    className="inline-flex items-center gap-2 rounded-full bg-milk text-cocoa px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-honey transition-colors shadow-lg"
                  >
                    <span>View all available pups</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Left 3D Door Leaf */}
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 [transform-origin:left_center] border-r border-[#201008] transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.3,1.25,0.45,1)] z-20 pointer-events-auto cursor-pointer"
              style={{
                transform: doorsOpen ? "rotateY(-112deg)" : "rotateY(0deg)",
                background:
                  "repeating-linear-gradient(90deg, transparent 0 calc(33% - 1.5px), rgba(42,23,14,0.3) calc(33% - 1.5px) 33%), linear-gradient(135deg, #a24a1a 0%, #6a3c20 100%)",
              }}
              onClick={() => setDoorsOpen(!doorsOpen)}
              title={doorsOpen ? "Click to close" : "Click to open"}
            >
              {/* Inner Raised Wood Moldings */}
              <div className="absolute inset-4 rounded-tl-[12rem] rounded-bl-lg border-2 border-[#fffdf82e] p-3 flex flex-col justify-between">
                <div className="size-full border border-[#2a170e4d] rounded-tl-[11rem] flex items-center justify-end pr-3">
                  {/* Left Door Brass Pull Handle */}
                  <div className="w-2.5 h-20 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 shadow-md border border-amber-700/60" />
                </div>
              </div>
            </div>

            {/* Right 3D Door Leaf */}
            <div
              className="absolute top-0 bottom-0 right-0 w-1/2 [transform-origin:right_center] border-l border-[#201008] transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.3,1.25,0.45,1)] z-20 pointer-events-auto cursor-pointer"
              style={{
                transform: doorsOpen ? "rotateY(112deg)" : "rotateY(0deg)",
                background:
                  "repeating-linear-gradient(90deg, transparent 0 calc(33% - 1.5px), rgba(42,23,14,0.3) calc(33% - 1.5px) 33%), linear-gradient(225deg, #a24a1a 0%, #6a3c20 100%)",
              }}
              onClick={() => setDoorsOpen(!doorsOpen)}
              title={doorsOpen ? "Click to close" : "Click to open"}
            >
              {/* Inner Raised Wood Moldings */}
              <div className="absolute inset-4 rounded-tr-[12rem] rounded-br-lg border-2 border-[#fffdf82e] p-3 flex flex-col justify-between">
                <div className="size-full border border-[#2a170e4d] rounded-tr-[11rem] flex items-center justify-start pl-3">
                  {/* Right Door Brass Pull Handle */}
                  <div className="w-2.5 h-20 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 shadow-md border border-amber-700/60" />
                </div>
              </div>
            </div>

            {/* Center Golden Brass Paw Crest (Splits when doors open) */}
            <div
              className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 pointer-events-none ${
                doorsOpen
                  ? "opacity-0 scale-75 rotate-12"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            >
              <div className="size-16 sm:size-20 rounded-full bg-gradient-to-br from-amber-200 via-honey to-amber-600 p-1 shadow-2xl border-2 border-amber-800">
                <div className="size-full rounded-full bg-cocoa flex items-center justify-center text-honey">
                  <svg
                    viewBox="0 0 64 64"
                    className="size-8 sm:size-10 fill-honey"
                  >
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Door Base Threshold Stone Step */}
          <div className="h-4 sm:h-5 w-[104%] -ml-[2%] rounded-b-xl bg-gradient-to-r from-amber-700 via-[#dc9a52] to-amber-700 border-2 border-cocoa shadow-md" />
        </div>
      </div>
    </section>
  );
}
