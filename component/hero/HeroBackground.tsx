'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   HeroBackground
   
   A layered, subtle background system for the Hero Section.
   Every element is deliberately low-contrast to preserve
   readability and avoid competing with the main content.

   Layer order (bottom → top):
   1. Base solid background
   2. Large blurred accent orbs (slow ambient drift)
   3. Faint SVG dot grid (radial mask fade)
   4. Diagonal light streak (slow sweep animation)
   5. Grain / noise texture overlay
   6. Radial vignette (edge darkening)
   ═══════════════════════════════════════════════════════════════ */

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  /* Orbs drift very slightly on scroll for a parallax feel */
  const orb1Y = useTransform(scrollY, [0, 600], [0, 60])
  const orb2Y = useTransform(scrollY, [0, 600], [0, -40])
  const streakY = useTransform(scrollY, [0, 600], [0, 30])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* ── Layer 1: Base atmospheric radial glow ──────────────── */}
      {/*
        The primary top-centre brand glow. Already existed but we
        deepen it here as a dedicated layer for clarity.
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 55% at 50% -10%, rgba(245,196,0,0.055) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,196,0,0.018) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 88% 75%, rgba(245,196,0,0.013) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Layer 2: Large drifting accent orbs ────────────────── */}
      {/*
        Two huge, heavily blurred circles that breathe slowly.
        They move on a long loop to keep the background feeling alive.
        Opacity is extremely low — they read as ambient lighting,
        not as visible shapes.
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-18%',
          left: '-10%',
          width: '65vw',
          height: '65vw',
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,196,0,0.045) 0%, rgba(245,196,0,0.008) 45%, transparent 70%)',
          filter: 'blur(80px)',
          y: orb1Y,
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '-22%',
          right: '-15%',
          width: '55vw',
          height: '55vw',
          maxWidth: 780,
          maxHeight: 780,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,196,0,0.03) 0%, rgba(245,196,0,0.005) 45%, transparent 70%)',
          filter: 'blur(100px)',
          y: orb2Y,
        }}
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── Layer 3: Faint SVG dot grid ────────────────────────── */}
      {/*
        A 32×32 grid of 1px dots, masked with a radial gradient so
        it fades to invisible at the edges. Gives a subtle
        technical / product-design depth without feeling like a
        background pattern.
      */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-dot-grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.75" fill="rgba(255,255,255,0.055)" />
          </pattern>

          {/* Radial mask: opaque in corners, transparent in centre
              so the grid doesn't distract from the focal content   */}
          <radialGradient id="hero-grid-mask" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="55%"  stopColor="black" stopOpacity="0" />
            <stop offset="78%"  stopColor="black" stopOpacity="0.45" />
            <stop offset="100%" stopColor="black" stopOpacity="0.85" />
          </radialGradient>

          <mask id="hero-grid-fade">
            <rect width="100%" height="100%" fill="white" />
            <rect width="100%" height="100%" fill="url(#hero-grid-mask)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#hero-dot-grid)"
          mask="url(#hero-grid-fade)"
        />
      </svg>

      {/* ── Layer 4: Diagonal light streak ─────────────────────── */}
      {/*
        A single thin diagonal shimmer that sweeps very slowly
        across the viewport — barely visible, like light catching
        a glossy surface. Adds movement without distraction.
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-30%',
          width: '160%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,196,0,0.12) 30%, rgba(255,255,255,0.08) 50%, rgba(245,196,0,0.12) 70%, transparent 100%)',
          transform: 'rotate(-35deg)',
          transformOrigin: 'center center',
          y: streakY,
        }}
        animate={{ x: ['-10%', '10%', '-10%'], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* A second, even fainter streak at a different angle */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '-40%',
          width: '180%',
          height: '0.5px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,196,0,0.06) 40%, rgba(245,196,0,0.06) 60%, transparent 100%)',
          transform: 'rotate(20deg)',
          transformOrigin: 'center center',
        }}
        animate={{ x: ['5%', '-5%', '5%'], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />

      {/* ── Layer 5: Grain / noise texture ─────────────────────── */}
      {/*
        CSS SVG-based noise filter applied as an overlay.
        Adds tactility and a high-end print/analogue feel.
        Opacity is very low — it reads subconsciously.
      */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.025,
          mixBlendMode: 'overlay',
        }}
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* ── Layer 6: Edge vignette ──────────────────────────────── */}
      {/*
        Deep radial vignette that darkens the four edges.
        Creates a cinematic, stage-lit feel — as if the hero
        content is being spotlit from above.
      */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 85% at 50% 40%, transparent 40%, rgba(8,8,8,0.55) 80%, rgba(4,4,4,0.85) 100%)',
        }}
      />

      {/* ── Layer 7: Bottom bleed-out gradient ─────────────────── */}
      {/*
        Ensures the hero section transitions cleanly into the
        next section — no hard edge.
      */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background:
            'linear-gradient(to top, var(--color-dark-primary) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
