"use client";

import { useEffect, useRef, useState } from "react";

// --- Mathematical curve generator for Teddy's fluffy silhouette ---
function generateFluff(cx: number, cy: number, rx: number, ry: number, points: number, amp: number, rotOffset = -Math.PI / 2, deg = 0) {
  const rad = (deg * Math.PI) / 180;
  const pt = (angle: number, bump: number) => {
    const x = Math.cos(angle) * (rx + bump);
    const y = Math.sin(angle) * (ry + (ry / rx) * bump);
    return `${(cx + x * Math.cos(rad) - y * Math.sin(rad)).toFixed(1)} ${(
      cy +
      x * Math.sin(rad) +
      y * Math.cos(rad)
    ).toFixed(1)}`;
  };
  let d = "";
  for (let i = 0; i < points; i++) {
    const a1 = rotOffset + (i / points) * Math.PI * 2;
    const a2 = rotOffset + ((i + 1) / points) * Math.PI * 2;
    const mid = (a1 + a2) / 2;
    d += `${i === 0 ? `M${pt(a1, 0)}` : ""}Q${pt(mid, 2.1 * amp)} ${pt(a2, 0)}`;
  }
  return `${d}Z`;
}

// Key pivot coordinates
const PIVOT_BODY = [196, 206] as const;
const PIVOT_HEAD = [212, 100] as const;
const PIVOT_FN = [186, 194] as const;
const PIVOT_FF = [168, 192] as const;
const PIVOT_BN = [110, 194] as const;
const PIVOT_BF = [94, 192] as const;
const PIVOT_TAIL = [84, 150] as const;
const PIVOT_EAR_L = [174, 82] as const;
const PIVOT_EAR_R = [250, 82] as const;

// Path definitions
const PATHS = {
  body: generateFluff(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: generateFluff(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: generateFluff(70, 126, 17, 16, 9, 3.2),
  tailStem: "M86 152 C80 146 76 140 74 136",
  haunch: generateFluff(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw:
    "M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z",
  head: generateFluff(212, 100, 51, 46, 16, 3.6),
  topknot: generateFluff(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: generateFluff(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: generateFluff(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle:
    "M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z",
  nose: "M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z",
  mouth:
    "M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2",
  mouthOpen:
    "M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z",
  tongue: "M207.6 127.4 Q212 136.6 216.4 127.4 Z",
  collar: "M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z",
  tag: "M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z",
  ledgePaws:
    "M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z",
  ledgeToes:
    "M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5",
};

function generateLeg(width: number, len: number) {
  const half = width / 2;
  return `M${-half} -14 C${-half} 4 -12 ${len - 18} -12 ${len - 9} C-12 ${len - 2} -7 ${len} 0 ${len} C9 ${len} 13 ${len - 3} 13 ${len - 9} C13 ${len - 18} ${half} 4 ${half} -14`;
}

const LEGS = {
  front: generateLeg(24, 228 - PIVOT_FN[1]),
  frontFar: generateLeg(22, 228 - PIVOT_FF[1]),
  back: generateLeg(30, 228 - PIVOT_BN[1]),
  backFar: generateLeg(28, 228 - PIVOT_BF[1]),
};

// Pose definitions
export interface PoseData {
  bodyRot: number;
  bodyX: number;
  bodyY: number;
  stretch: number;
  headX: number;
  headY: number;
  headRot: number;
  earL: number;
  earR: number;
  tail: number;
  fn: number;
  ff: number;
  bn: number;
  bf: number;
  sit: number;
  eyes: number;
  happy: number;
  tongue: number;
  mouth: number;
  front: number;
}

const BASE_POSE: PoseData = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

const POSES: Record<string, PoseData> = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
};

const round2 = (val: number) => Math.round(100 * val) / 100;
const rotateStr = (deg: number, pivot: readonly [number, number]) =>
  `rotate(${round2(deg)} ${pivot[0]} ${pivot[1]})`;

interface TeddyBuddyProps {
  pose?: "peek" | "sit" | "stand" | "walk" | "bow" | "hop";
  facing?: "left" | "right";
  className?: string;
  showBubble?: boolean;
  bubbleText?: string;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export function TeddyBuddy({
  pose = "peek",
  facing = "right",
  className = "",
  showBubble = true,
  bubbleText: initialBubbleText,
}: TeddyBuddyProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [speech, setSpeech] = useState(initialBubbleText || (pose === "peek" ? "peekaboo!" : "woof! welcome!"));
  const [isBubbleVisible, setIsBubbleVisible] = useState(showBubble);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // State refs for the continuous physics loop
  const stateRef = useRef({
    currentPose: { ...(POSES[pose] || POSES.peek) },
    targetPose: { ...(POSES[pose] || POSES.peek) },
    facingVal: facing === "left" ? -1 : 1,
    facingTarget: facing === "left" ? -1 : 1,
    time: 0,
    stride: 0,
    strideTarget: 0,
    phase: 0,
    wag: 0.6,
    wagTarget: 0.6,
    gazeX: 0,
    gazeY: 0,
    gazeTarget: { x: 0, y: 0 },
    tilt: 0,
    tiltTarget: 0,
    ear: 0,
    earV: 0,
    bounce: 0,
    bounceV: 0,
    blinkAt: -1,
    nextBlink: 1.2,
    blinkVal: 0,
    woofUntil: 0,
    isPetting: false,
    trickQueue: [] as Array<[number, () => void]>,
  });

  // Keep target pose synced with prop changes
  useEffect(() => {
    stateRef.current.targetPose = { ...(POSES[pose] || POSES.peek) };
  }, [pose]);

  useEffect(() => {
    stateRef.current.facingTarget = facing === "left" ? -1 : 1;
  }, [facing]);

  // Peekaboo entrance on mount if pose === "peek"
  useEffect(() => {
    if (pose === "peek") {
      const now = performance.now() / 1000;
      // Start head dropped below ledge
      stateRef.current.currentPose = { ...POSES.peek, headY: 100 };
      stateRef.current.targetPose = { ...POSES.peek, headY: 100 };

      // Queue peekaboo animation
      stateRef.current.trickQueue = [
        [
          now + 0.15,
          () => {
            stateRef.current.targetPose = { ...POSES.peek };
            stateRef.current.earV += 240;
            stateRef.current.bounceV = -180;
            setSpeech("peekaboo!");
            setIsBubbleVisible(true);
          },
        ],
        [
          now + 2.4,
          () => {
            setSpeech("woof! welcome!");
          },
        ],
      ];
    }
  }, [pose]);

  // Main 60fps Spring & Physics Render Loop
  useEffect(() => {
    let animId = 0;
    let lastT = performance.now();

    const svg = svgRef.current;
    if (!svg) return;

    // Direct element references for zero React re-render overhead at 60fps
    const elRoot = svg.querySelector<SVGGElement>('[data-p="root"]');
    const elBody = svg.querySelector<SVGGElement>('[data-p="body"]');
    const elHead = svg.querySelector<SVGGElement>('[data-p="head"]');
    const elEarL = svg.querySelector<SVGPathElement>('[data-p="earL"]');
    const elEarR = svg.querySelector<SVGPathElement>('[data-p="earR"]');
    const elTail = svg.querySelector<SVGGElement>('[data-p="tail"]');
    const elEyes = svg.querySelector<SVGGElement>('[data-p="eyes"]');
    const elBlink = svg.querySelector<SVGGElement>('[data-p="blink"]');
    const elOpen = svg.querySelector<SVGGElement>('[data-p="open"]');
    const elHappy = svg.querySelector<SVGPathElement>('[data-p="happy"]');
    const elShut = svg.querySelector<SVGPathElement>('[data-p="shut"]');
    const elTongue = svg.querySelector<SVGPathElement>('[data-p="tongue"]');
    const elMouth = svg.querySelector<SVGGElement>('[data-p="mouth"]');
    const elHaunch = svg.querySelector<SVGGElement>('[data-p="haunch"]');
    const elLedge = svg.querySelector<SVGGElement>('[data-p="ledge"]');
    const elFn = svg.querySelector<SVGGElement>('[data-p="fn"]');
    const elFf = svg.querySelector<SVGGElement>('[data-p="ff"]');
    const elBn = svg.querySelector<SVGGElement>('[data-p="bn"]');
    const elBf = svg.querySelector<SVGGElement>('[data-p="bf"]');

    const lerp = (dt: number, speed: number) => 1 - Math.exp(-dt / speed);

    const onPointerMove = (e: MouseEvent) => {
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      const clamped = Math.min(1, dist / 220);
      stateRef.current.gazeTarget = {
        x: (dx / dist) * clamped * stateRef.current.facingTarget,
        y: (dy / dist) * clamped,
      };
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const tick = (nowMs: number) => {
      const dt = Math.min((nowMs - lastT) / 1000, 0.05);
      lastT = nowMs;
      const now = nowMs / 1000;
      const s = stateRef.current;
      s.time = now;

      // Execute queued trick keyframes
      if (s.trickQueue.length > 0 && s.trickQueue[0][0] <= now) {
        const item = s.trickQueue.shift();
        item?.[1]();
      }

      // Smooth pose interpolation
      const cur = s.currentPose;
      const tgt = s.targetPose;
      const poseRate = lerp(dt, 0.16);
      for (const k of Object.keys(cur) as Array<keyof PoseData>) {
        cur[k] += (tgt[k] - cur[k]) * poseRate;
      }

      // Facing transition
      s.facingVal += (s.facingTarget - s.facingVal) * lerp(dt, 0.09);

      // Stride, Wag & Gaze
      s.stride += (s.strideTarget - s.stride) * lerp(dt, 0.12);
      s.wag += (s.wagTarget - s.wag) * lerp(dt, 0.35);
      s.gazeX += (s.gazeTarget.x - s.gazeX) * lerp(dt, 0.08);
      s.gazeY += (s.gazeTarget.y - s.gazeY) * lerp(dt, 0.08);
      s.tilt += (s.tiltTarget + 3 * s.gazeX - s.tilt) * lerp(dt, 0.18);

      // Ear spring physics
      s.earV += (-150 * s.ear - 10 * s.earV) * dt;
      s.ear = Math.max(-28, Math.min(28, s.ear + s.earV * dt));

      // Body bounce spring physics
      s.bounceV += (-260 * s.bounce - 16 * s.bounceV) * dt;
      s.bounce += s.bounceV * dt;

      // Realistic Blink Timer (natural blink every 2.5 - 6s with 18% double-blink chance)
      if (now > s.nextBlink && cur.eyes > 0.5) {
        s.blinkAt = now;
        s.nextBlink = now + 2.4 + 3.8 * Math.random();
        if (Math.random() < 0.18) {
          s.nextBlink = now + 0.32; // Cute double-blink!
        }
      }
      const blinkProgress = (now - s.blinkAt) / 0.15;
      s.blinkVal = blinkProgress >= 0 && blinkProgress <= 1 ? Math.sin(blinkProgress * Math.PI) : 0;

      // Walking phase & tail wag wave
      const isWalking = s.stride > 0.01;
      if (isWalking) s.phase += dt * 8;
      const sinPhase = Math.sin(s.phase);
      const cosPhase = Math.cos(s.phase);
      const stepAmp = 20 + 10 * s.stride;
      const walkBounce = (1 - Math.cos(2 * s.phase)) / 2;

      // Tail Wag calculation
      const wagFreq = 1.6 + 2.8 * s.wag;
      const wagAmp = 6 + 18 * s.wag;
      const tailAngle = cur.tail + Math.sin(now * wagFreq * Math.PI * 2) * wagAmp;

      // Gentle breathing idle wave
      const breathe = Math.sin(2.4 * now) * (isWalking ? 0 : 1);
      const bodyY = cur.bodyY - walkBounce * (2.5 + 4 * s.stride) * (isWalking ? 1 : 0) + 0.6 * breathe + s.bounce;
      const headY = cur.headY + 0.9 * breathe + 1.15 * s.bounce;

      // Direct SVG DOM updates for maximum performance
      if (elRoot) {
        const u = Math.abs(s.facingVal) < 0.02 ? 0.02 * Math.sign(s.facingVal || 1) : s.facingVal;
        elRoot.setAttribute(
          "transform",
          `translate(${150} 0) scale(${round2(u)} 1) translate(${-150} 0)`
        );
      }
      if (elBody) {
        elBody.setAttribute(
          "transform",
          `translate(${round2(cur.bodyX)} ${round2(bodyY)}) ${rotateStr(
            cur.bodyRot + 1.6 * sinPhase * (isWalking ? 1 : 0),
            PIVOT_BODY
          )} translate(${PIVOT_BODY[0]} 0) scale(${round2(cur.stretch)} 1) translate(${-PIVOT_BODY[0]} 0)`
        );
        elBody.setAttribute("opacity", String(round2(1 - cur.front)));
      }
      if (elHead) {
        elHead.setAttribute(
          "transform",
          `translate(${round2(cur.headX)} ${round2(headY)}) ${rotateStr(
            cur.headRot + s.tilt,
            PIVOT_HEAD
          )}`
        );
      }
      if (elEarL) {
        elEarL.setAttribute("transform", rotateStr(cur.earL + s.ear, PIVOT_EAR_L));
      }
      if (elEarR) {
        elEarR.setAttribute("transform", rotateStr(cur.earR - s.ear, PIVOT_EAR_R));
      }
      if (elTail) {
        elTail.setAttribute("transform", rotateStr(tailAngle, PIVOT_TAIL));
      }
      if (elEyes) {
        elEyes.setAttribute("transform", `translate(${round2(3.6 * s.gazeX)} ${round2(2.6 * s.gazeY)})`);
      }
      if (elBlink) {
        // Vertical scale eyelid shut during blink
        elBlink.setAttribute(
          "transform",
          `translate(0 ${round2(98 * s.blinkVal * 0.92)}) scale(1 ${round2(1 - 0.92 * s.blinkVal)})`
        );
      }
      if (elOpen) elOpen.setAttribute("opacity", String(round2(Math.max(0, cur.eyes - cur.happy))));
      if (elHappy) elHappy.setAttribute("opacity", String(round2(Math.min(cur.happy, cur.eyes))));
      if (elShut) elShut.setAttribute("opacity", String(round2(1 - cur.eyes)));
      if (elTongue) elTongue.setAttribute("opacity", String(round2(cur.tongue * (1 - cur.mouth))));
      if (elMouth) elMouth.setAttribute("opacity", String(round2(now < s.woofUntil ? 1 : cur.mouth)));
      if (elHaunch) {
        elHaunch.setAttribute("transform", `translate(0 ${round2(-0.06 * cur.bodyRot)})`);
        elHaunch.setAttribute("opacity", String(round2(cur.sit * (1 - cur.front))));
      }
      if (elLedge) elLedge.setAttribute("opacity", String(round2(cur.front)));

      // Legs walking stride
      if (elFn) elFn.setAttribute("transform", `translate(${PIVOT_FN[0]} ${PIVOT_FN[1]}) rotate(${round2(cur.fn + (isWalking ? sinPhase * stepAmp : 0))})`);
      if (elFf) elFf.setAttribute("transform", `translate(${PIVOT_FF[0]} ${PIVOT_FF[1]}) rotate(${round2(cur.ff + (isWalking ? -sinPhase * stepAmp : 0))})`);
      if (elBn) elBn.setAttribute("transform", `translate(${PIVOT_BN[0]} ${PIVOT_BN[1]}) rotate(${round2(cur.bn + (isWalking ? -sinPhase * stepAmp : 0))})`);
      if (elBf) elBf.setAttribute("transform", `translate(${PIVOT_BF[0]} ${PIVOT_BF[1]}) rotate(${round2(cur.bf + (isWalking ? sinPhase * stepAmp : 0))})`);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  // Interactive Tricks on Click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const s = stateRef.current;
    const now = performance.now() / 1000;

    const tricks = ["love", "woof", "hop", "tilt", "sneeze", "spin", "beg", "bow"] as const;
    const choice = tricks[Math.floor(Math.random() * tricks.length)];

    // Spawn floating red hearts
    if (choice === "love" || choice === "hop" || choice === "woof") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newHearts = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: -10 - i * 15,
      }));
      setHearts((prev) => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 1200);
    }

    if (choice === "love") {
      s.wagTarget = 1;
      s.targetPose = { ...s.targetPose, happy: 1, tongue: 1 };
      s.bounceV = -160;
      s.earV += 220;
      setSpeech("I like you! ❤️");
      setIsBubbleVisible(true);
      s.trickQueue = [
        [
          now + 1.8,
          () => {
            s.wagTarget = 0.6;
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    } else if (choice === "woof") {
      s.woofUntil = now + 0.45;
      s.bounceV = -180;
      s.earV += 280;
      setSpeech("woof woof!");
      setIsBubbleVisible(true);
      s.trickQueue = [
        [
          now + 0.35,
          () => {
            s.bounceV = -120;
            s.earV += 200;
          },
        ],
        [
          now + 1.6,
          () => {
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    } else if (choice === "hop") {
      s.targetPose = { ...POSES.hop };
      s.bounceV = -240;
      s.earV += 320;
      setSpeech("boing!");
      setIsBubbleVisible(true);
      s.trickQueue = [
        [
          now + 0.45,
          () => {
            s.targetPose = { ...POSES.hop };
            s.bounceV = -180;
          },
        ],
        [
          now + 1.1,
          () => {
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    } else if (choice === "tilt") {
      s.tiltTarget = -16;
      setSpeech("hm? 🐾");
      setIsBubbleVisible(true);
      s.trickQueue = [
        [
          now + 0.7,
          () => {
            s.tiltTarget = 14;
          },
        ],
        [
          now + 1.5,
          () => {
            s.tiltTarget = 0;
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    } else if (choice === "sneeze") {
      s.tiltTarget = -8;
      s.trickQueue = [
        [
          now + 0.3,
          () => {
            s.tiltTarget = 12;
            s.earV += 260;
            s.bounceV = -140;
            s.woofUntil = now + 0.4;
            setSpeech("achoo! 🤧");
            setIsBubbleVisible(true);
          },
        ],
        [
          now + 1.2,
          () => {
            s.tiltTarget = 0;
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    } else {
      // Bow or Beg
      s.targetPose = { ...POSES.bow };
      s.wagTarget = 1;
      setSpeech("play with me! 🐶");
      setIsBubbleVisible(true);
      s.trickQueue = [
        [
          now + 1.5,
          () => {
            s.wagTarget = 0.6;
            s.targetPose = { ...(POSES[pose] || POSES.peek) };
          },
        ],
      ];
    }
  };

  const handlePointerEnter = () => {
    stateRef.current.isPetting = true;
    stateRef.current.wagTarget = 1;
    stateRef.current.targetPose.happy = 1;
    stateRef.current.earV += 120;
  };

  const handlePointerLeave = () => {
    stateRef.current.isPetting = false;
    stateRef.current.wagTarget = 0.6;
    stateRef.current.targetPose.happy = 0;
  };

  return (
    <div
      className={`relative inline-block select-none group cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      title="Click me to play tricks!"
    >
      {/* Floating Hearts Animation */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute -top-6 left-1/2 text-2xl text-red-500 animate-in fade-in slide-out-to-top duration-1000 pointer-events-none z-30"
          style={{ transform: `translate(calc(-50% + ${h.x}px), ${h.y}px)` }}
        >
          ❤️
        </span>
      ))}

      {/* Comic Speech Bubble */}
      {isBubbleVisible && (
        <div
          className={`absolute -top-10 ${
            facing === "right" ? "left-3/4 -translate-x-1/2" : "right-3/4 translate-x-1/2"
          } z-20 whitespace-nowrap rounded-2xl border-2 border-cocoa bg-milk px-3.5 py-1 text-xs sm:text-sm font-scrawl font-bold text-cocoa shadow-md transition-all duration-300 pointer-events-none`}
        >
          <span>{speech}</span>
          <div className="absolute -bottom-1.5 left-4 size-2.5 rotate-45 border-b-2 border-r-2 border-cocoa bg-milk" />
        </div>
      )}

      {/* Full Physics Teddy SVG Puppy (ViewBox 300 240) */}
      <svg
        ref={svgRef}
        viewBox="0 0 300 240"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Teddy, the TeddyPups puppy"
      >
        <g data-p="root">
          {/* Ground Soft Shadow */}
          <ellipse
            data-p="shadow"
            cx="150"
            cy="230"
            rx="92"
            ry="7"
            fill="#2a170e"
            opacity="0.12"
          />

          {/* Body & Walking Legs */}
          <g data-p="body">
            {/* Back Far Leg */}
            <g data-p="bf">
              <path d={`${LEGS.backFar}Z`} fill="#e4a352" />
              <path d={LEGS.backFar} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Front Far Leg */}
            <g data-p="ff">
              <path d={`${LEGS.frontFar}Z`} fill="#e4a352" />
              <path d={LEGS.frontFar} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Tail */}
            <g data-p="tail">
              <path d={PATHS.tailStem} stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d={PATHS.tailStem} stroke="#f2be6b" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d={PATHS.tail} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            </g>

            {/* Back Near Leg */}
            <g data-p="bn">
              <path d={`${LEGS.back}Z`} fill="#f2be6b" />
              <path d={LEGS.back} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Body & Chest Fluff */}
            <path d={PATHS.body} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d={PATHS.chest} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Front Near Leg */}
            <g data-p="fn">
              <path d={`${LEGS.front}Z`} fill="#f2be6b" />
              <path d={LEGS.front} stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* Seated Haunch (Visible when sitting) */}
          <g data-p="haunch">
            <path d={PATHS.haunch} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d={PATHS.haunchPaw} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M132 222v5M139 222v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>

          {/* Head, Face & Ears */}
          <g data-p="head">
            {/* Collar & Golden Tag */}
            <path d={PATHS.collar} fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <path d={PATHS.tag} fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Floppy Left & Right Ears */}
            <path data-p="earL" d={PATHS.earL} fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path data-p="earR" d={PATHS.earR} fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Fluffy Head & Topknot */}
            <path d={PATHS.head} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d={PATHS.topknot} fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

            {/* Cream Snout & Rosy Cheeks */}
            <path d={PATHS.muzzle} fill="#fbe3b4" />
            <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
            <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

            {/* Eyes (Blinking & Gaze Tracking) */}
            <g data-p="eyes">
              {/* Normal Round Eyes with Blink Scale */}
              <g data-p="open">
                <g data-p="blink">
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  {/* Highlights */}
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
              </g>

              {/* Happy squint eyes */}
              <path
                data-p="happy"
                d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />

              {/* Sleeping / shut eyes */}
              <path
                data-p="shut"
                d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Dark Puppy Nose */}
            <path d={PATHS.nose} fill="#2a170e" />

            {/* Mouth & Tongue */}
            <path d={PATHS.mouth} stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            <path data-p="tongue" d={PATHS.tongue} fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />

            {/* Barking / Yawning Open Mouth */}
            <g data-p="mouth">
              <path d={PATHS.mouthOpen} fill="#6b2a1c" stroke="#2a170e" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" />
            </g>
          </g>

          {/* Front Paws Over Ledge (Peek Pose) */}
          <g data-p="ledge">
            <path d={PATHS.ledgePaws} fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d={PATHS.ledgeToes} stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
}
