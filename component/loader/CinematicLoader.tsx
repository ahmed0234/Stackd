"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion";

/* ─────────────────────────────────────────────────────────────────
   Module-level flag: resets on full page refresh, but persists
   during Next.js client-side SPA navigation.
────────────────────────────────────────────────────────────────── */
let _hasPlayedThisLoad = false;

/* ─── Ember Data for Pure SVG Ember Particles ─────────────────── */
const EMBERS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: 3 + ((i * 7.1) % 94),
  bottom: 1 + ((i * 4.3) % 28),
  size: 3 + ((i * 1.3) % 8),
  opacity: 0.35 + ((i * 0.04) % 0.55),
  delay: (i * 0.1) % 1.4,
  duration: 1.8 + ((i * 0.14) % 1.6),
  driftX: -35 + ((i * 5.3) % 70),
  glow: 8 + ((i * 2) % 16),
}));

/* ─── SVG Letter Stroke Paths (Sequential S-T-A-C-K-D) ───────── */
const LETTER_PATHS = [
  // S
  { id: "S", d: "M 180 75 C 160 55, 115 55, 115 90 C 115 125, 175 125, 175 160 C 175 195, 130 195, 110 175", length: 320 },
  // T
  { id: "T", d: "M 215 65 L 305 65 M 260 65 L 260 185", length: 220 },
  // A
  { id: "A", d: "M 335 185 L 380 65 L 425 185 M 352 142 L 408 142", length: 340 },
  // C
  { id: "C", d: "M 520 75 C 495 55, 450 65, 450 125 C 450 185, 495 195, 520 175", length: 290 },
  // K
  { id: "K", d: "M 550 65 L 550 185 M 620 65 L 552 125 L 625 185", length: 330 },
  // D
  { id: "D", d: "M 655 65 L 655 185 M 655 65 C 750 65, 750 185, 655 185", length: 350 },
];

export default function CinematicLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const smokeOverlayRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const flameTipRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const fillTextRef = useRef<HTMLDivElement>(null);

  const [flamePos, setFlamePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (_hasPlayedThisLoad) {
      if (rootRef.current) rootRef.current.style.display = "none";
      return;
    }
    _hasPlayedThisLoad = true;

    const root = rootRef.current;
    if (!root) return;

    root.style.display = "block";
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function runTimeline() {
      if (cancelled) return;

      /* ── 1. Atmosphere Fade In ────────────────────────────── */
      if (bgOverlayRef.current) {
        animate(bgOverlayRef.current, { opacity: [0, 1] }, { duration: 0.4, easing: "ease-out" });
      }
      if (smokeOverlayRef.current) {
        animate(
          smokeOverlayRef.current,
          { opacity: [0, 0.6], scale: [0.85, 1.15], x: [-40, 30] },
          { duration: 2.2, easing: "ease-out" }
        );
      }

      await wait(200);
      if (cancelled) return;

      /* ── 2. Sequential Letter Stroke Forging (S -> T -> A -> C -> K -> D) ── */
      const letterDuration = 180; // ms per letter

      for (let i = 0; i < LETTER_PATHS.length; i++) {
        if (cancelled) break;

        const pathEl = pathRefs.current[i];
        if (pathEl) {
          const totalLen = pathEl.getTotalLength();
          pathEl.style.strokeDasharray = `${totalLen}`;
          pathEl.style.strokeDashoffset = `${totalLen}`;
          pathEl.style.opacity = "1";

          // Animate stroke draw
          animate(
            pathEl,
            { strokeDashoffset: [totalLen, 0] },
            { duration: letterDuration / 1000, easing: [0.4, 0, 0.2, 1] }
          );

          // Track traveling flame tip position along stroke
          const startTime = performance.now();
          const trackFlame = () => {
            if (cancelled || !pathEl) return;
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1, elapsed / letterDuration);
            try {
              const pt = pathEl.getPointAtLength(progress * totalLen);
              setFlamePos({
                x: (pt.x / 800) * 100,
                y: (pt.y / 250) * 100,
              });
            } catch {
              // fallback
            }

            if (progress < 1) {
              requestAnimationFrame(trackFlame);
            }
          };
          requestAnimationFrame(trackFlame);
        }

        await wait(letterDuration + 15);
      }

      setFlamePos(null);
      if (cancelled) return;

      /* ── 3. Molten Metal Cooling -> Solid Fill Reveal ───── */
      if (fillTextRef.current) {
        animate(
          fillTextRef.current,
          {
            opacity: [0, 1],
            color: ["#F5C400", "#FF6B00", "#D97706", "#E2E8F0", "#FFFFFF"],
          },
          { duration: 0.55, easing: "ease-out" }
        );
      }

      await wait(320);
      if (cancelled) return;

      /* ── 4. Cinematic Light Sweep Across STACKD ──────────── */
      if (lightSweepRef.current) {
        animate(
          lightSweepRef.current,
          {
            opacity: [0, 0.95, 0],
            x: ["-60%", "120%"],
          },
          { duration: 0.52, easing: "ease-in-out" }
        );
      }

      await wait(420);
      if (cancelled) return;

      /* ── 5. Zoom-Mask Transition into Homepage ───────────── */
      if (root) {
        animate(
          root,
          {
            scale: [1, 1.75, 3.5],
            opacity: [1, 0.85, 0],
            filter: ["blur(0px)", "blur(3px)", "blur(12px)"],
          },
          { duration: 0.62, easing: [0.7, 0, 0.3, 1] }
        );
      }

      await wait(580);
      if (cancelled) return;

      if (root) {
        root.style.display = "none";
      }
    }

    runTimeline();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "#060606",
        overflow: "hidden",
        willChange: "transform, opacity, filter",
      }}
    >
      {/* ── 1. Pure CSS/SVG Background Atmosphere & Texture ── */}
      <div
        ref={bgOverlayRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          willChange: "opacity",
        }}
      >
        {/* Deep Charcoal Dark Radial Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, #121212 0%, #080808 60%, #020202 100%)",
          }}
        />

        {/* Soft Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 22%, rgba(0,0,0,0.88) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Warm Ambient Fire Glow Tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(245,196,0,0.15) 0%, rgba(255,107,0,0.05) 45%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Dynamic Micro Noise Filter (Pure SVG embedded) */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.04,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        >
          <filter id="loaderNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#loaderNoise)" />
        </svg>
      </div>

      {/* ── 2. Pure CSS Drifting Background Smoke Flares ──────── */}
      <div
        ref={smokeOverlayRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "15%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,196,0,0.12) 0%, rgba(255,69,0,0.04) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── 3. Floating Pure SVG Embers ──────────────────────── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {EMBERS.map((e) => (
          <PureEmberParticle key={e.id} ember={e} />
        ))}
      </div>

      {/* ── 4. Main STACKD Logo Stage ───────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justify: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(780px, 88vw)",
            aspectRatio: "800 / 250",
          }}
        >
          {/* SVG Stroke Forging Layer */}
          <svg
            viewBox="0 0 800 250"
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            <defs>
              <linearGradient id="fireGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5C400" />
                <stop offset="50%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              <filter id="strokeGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {LETTER_PATHS.map((item, idx) => (
              <path
                key={item.id}
                ref={(el) => { pathRefs.current[idx] = el; }}
                d={item.d}
                fill="none"
                stroke="url(#fireGlowGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#strokeGlow)"
                style={{
                  opacity: 0,
                  willChange: "stroke-dashoffset",
                }}
              />
            ))}
          </svg>

          {/* Traveling Flame / Ember Tip */}
          {flamePos && (
            <div
              ref={flameTipRef}
              style={{
                position: "absolute",
                left: `${flamePos.x}%`,
                top: `${flamePos.y}%`,
                width: "28px",
                height: "28px",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(circle, #FFFFFF 15%, #F5C400 55%, #FF4500 100%)",
                boxShadow: "0 0 22px 9px rgba(245,196,0,0.9), 0 0 44px 18px rgba(255,69,0,0.55)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />
          )}

          {/* Solid Cooling Metallic Typographic Text Layer */}
          <div
            ref={fillTextRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justify: "center",
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 11vw, 110px)",
              letterSpacing: "0.18em",
              color: "#FFFFFF",
              opacity: 0,
              textTransform: "uppercase",
              textShadow: "0 0 35px rgba(245,196,0,0.38), 0 0 70px rgba(255,107,0,0.2)",
              willChange: "opacity, color",
            }}
          >
            STACKD
          </div>

          {/* Golden Light Sweep Overlay */}
          <div
            ref={lightSweepRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "35%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(245,196,0,0.65) 50%, rgba(255,255,255,0.95) 70%, transparent 100%)",
              transform: "skewX(-25deg)",
              filter: "blur(6px)",
              opacity: 0,
              pointerEvents: "none",
              mixBlendMode: "screen",
              zIndex: 30,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Pure SVG/CSS Ember Particle ────────────────────────────── */
type Ember = typeof EMBERS[number];

function PureEmberParticle({ ember }: { ember: Ember }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctrl = animate(
      el,
      {
        y: ["0%", `${-120 - ((ember.id * 7) % 80)}%`],
        x: ["0px", `${ember.driftX}px`],
        opacity: [0, ember.opacity, ember.opacity * 0.7, 0],
        scale: [0.6, 1, 1.15, 0.4],
      },
      {
        duration: ember.duration,
        delay: ember.delay,
        easing: "ease-out",
        repeat: Infinity,
        repeatDelay: 0.2 + ((ember.id * 0.08) % 0.8),
      }
    );
    return () => ctrl.stop();
  }, [ember]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${ember.left}%`,
        bottom: `${ember.bottom}%`,
        width: `${ember.size}px`,
        height: `${ember.size}px`,
        borderRadius: "50%",
        background: "radial-gradient(circle, #FFFFFF 15%, #F5C400 60%, #FF4500 100%)",
        boxShadow: `0 0 ${ember.glow}px rgba(245,196,0,0.9), 0 0 ${ember.glow * 1.8}px rgba(255,69,0,0.5)`,
        opacity: 0,
        willChange: "transform, opacity",
        pointerEvents: "none",
      }}
    />
  );
}
