'use client'

import { useState, useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from 'motion/react'
import StackOrbit from './StackOrbit'
import HeroBackground from './HeroBackground'

/* ═══════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════ */

const HEADLINE_L1 = ['Every', 'Layer']
const HEADLINE_L2 = ['Earns', 'Its', 'Place.']

const TRUST_ITEMS = ['Fresh Daily', 'Halal Certified', 'Made To Order']

/* Pre-computed ambient particles (SSR-safe, no Math.random) */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${((i * 7.1 + 4.5) % 100).toFixed(1)}%`,
  size: 1.2 + (i % 3) * 0.6,
  dur: 10 + (i % 5) * 3,
  delay: (i * 0.9) % 8,
  startY: 75 + (i % 4) * 7,
}))

/* ═══════════════════════════════════════════════════════════════
   HeroSection — Main Component
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  /* ── Cursor spotlight tracking ──────────────── */
  const cursorPxX = useMotionValue(640)
  const cursorPxY = useMotionValue(400)
  const spotX = useSpring(cursorPxX, { stiffness: 30, damping: 20 })
  const spotY = useSpring(cursorPxY, { stiffness: 30, damping: 20 })
  const spotlightX = useTransform(spotX, (v) => v - 300)
  const spotlightY = useTransform(spotY, (v) => v - 300)

  /* ── Scroll-linked transforms ───────────────── */
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const heroTranslateY = useTransform(scrollY, [0, 600], [0, 100])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      cursorPxX.set(e.clientX - rect.left)
      cursorPxY.set(e.clientY - rect.top)
    },
    [cursorPxX, cursorPxY]
  )

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-dark-primary)',
        opacity: heroOpacity,
        y: heroTranslateY,
      }}
    >
      {/* ── Background System ────────────────────────────────── */}
      <HeroBackground />

      {/* Cursor-following spotlight (desktop only) */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,196,0,0.045) 0%, rgba(245,196,0,0.012) 40%, transparent 65%)',
          pointerEvents: 'none',
          x: spotlightX,
          y: spotlightY,
          zIndex: 1,
        }}
      />

      {/* ── SVG Stack Orbit Animation ───────────────────────── */}
      <StackOrbit />

      {/* ── Main Content ────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 820,
        }}
      >
        {/* Subheading badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '7px 20px',
            borderRadius: 9999,
            background: 'rgba(245,196,0,0.07)',
            border: '1px solid rgba(245,196,0,0.14)',
            marginBottom: 32,
          }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-brand)',
              boxShadow: '0 0 10px rgba(245,196,0,0.6)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245,196,0,0.85)',
            }}
          >
            Premium Stacks
          </span>
        </motion.div>

        {/* ── Headline ──────────────────────────────────────── */}
        <h1
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: 'clamp(42px, 8vw, 82px)',
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            margin: '0 0 26px',
            color: 'white',
          }}
        >
          {/* Line 1: "Every Layer" */}
          <span style={{ display: 'block' }}>
            {HEADLINE_L1.map((word, i) => (
              <motion.span
                key={`l1-${word}`}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 24 }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.55 + i * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2: "Earns Its Place." */}
          <span style={{ display: 'block' }}>
            {HEADLINE_L2.map((word, i) => (
              <motion.span
                key={`l2-${word}`}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 24 }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.81 + i * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.25em',
                  color: word === 'Place.' ? 'var(--color-brand)' : 'white',
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* ── Description ───────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 500,
            margin: '0 0 44px',
          }}
        >
          Precision crafted Stacks, loaded fries, and wraps.
          <br className="hidden sm:inline" />
          {' '}Every ingredient selected. Every layer intentional.
        </motion.p>

        {/* ── CTA Buttons ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row"
          style={{
            gap: 14,
            justifyContent: 'center',
            width: '100%',
            maxWidth: 420,
            marginBottom: 52,
          }}
        >
          <PrimaryCTA />
          <SecondaryCTA />
        </motion.div>

        {/* ── Trust Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    background: 'rgba(245,196,0,0.4)',
                  }}
                />
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Ambient Floating Particles ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: `${p.startY}vh` }}
            animate={{
              opacity: [0, 0.55, 0],
              y: [`${p.startY}vh`, `${p.startY - 55}vh`],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'rgba(245,196,0,0.5)',
              boxShadow: '0 0 6px rgba(245,196,0,0.25)',
            }}
          />
        ))}
      </div>

      {/* ── Scroll Indicator ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: 22,
            height: 34,
            borderRadius: 11,
            border: '1.5px solid rgba(255,255,255,0.12)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 7,
          }}
        >
          <motion.div
            animate={{ y: [0, 9, 0], opacity: [0.8, 0.15, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: 'rgba(245,196,0,0.45)',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Primary CTA — "Build Your Stack"
   Magnetic hover · Shine sweep · Golden glow
   ═══════════════════════════════════════════════════════════════ */

function PrimaryCTA() {
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef<HTMLAnchorElement>(null)

  const mX = useMotionValue(0)
  const mY = useMotionValue(0)
  const sX = useSpring(mX, { stiffness: 200, damping: 18 })
  const sY = useSpring(mY, { stiffness: 200, damping: 18 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = btnRef.current?.getBoundingClientRect()
      if (!rect) return
      mX.set((e.clientX - rect.left - rect.width / 2) * 0.22)
      mY.set((e.clientY - rect.top - rect.height / 2) * 0.22)
    },
    [mX, mY]
  )

  const onLeave = useCallback(() => {
    setHovered(false)
    mX.set(0)
    mY.set(0)
  }, [mX, mY])

  return (
    <motion.a
      ref={btnRef}
      href="/build"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className="w-full sm:w-auto"
      style={{
        x: sX,
        y: sY,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '16px 30px',
        borderRadius: 16,
        background: 'var(--color-brand)',
        color: '#0a0a0a',
        fontFamily: 'var(--font-poppins)',
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 0 0 1px rgba(245,196,0,0.5), 0 0 44px rgba(245,196,0,0.3), 0 12px 32px rgba(0,0,0,0.5)'
          : '0 0 0 1px rgba(245,196,0,0.3), 0 4px 20px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s ease',
        userSelect: 'none',
      }}
    >
      {/* Shine sweep */}
      <motion.div
        aria-hidden="true"
        initial={{ x: '-130%' }}
        animate={hovered ? { x: '250%' } : { x: '-130%' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '45%',
          height: '100%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
          pointerEvents: 'none',
          transform: 'skewX(-15deg)',
        }}
      />

      {/* Ambient glow orb */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: hovered ? [0.4, 0.8, 0.4] : 0,
          scale: hovered ? [1, 1.5, 1] : 1,
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: 18,
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>Build Your Stack</span>

      <motion.span
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Secondary CTA — "Explore Menu"
   Ghost style · Border glow · Arrow animation
   ═══════════════════════════════════════════════════════════════ */

function SecondaryCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href="/menu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="w-full sm:w-auto"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '16px 30px',
        borderRadius: 16,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
        color: hovered ? 'white' : 'rgba(255,255,255,0.65)',
        border: hovered
          ? '1px solid rgba(245,196,0,0.25)'
          : '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'var(--font-poppins)',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        overflow: 'hidden',
        userSelect: 'none',
        boxShadow: hovered ? '0 0 20px rgba(245,196,0,0.08)' : 'none',
      }}
    >
      {/* Subtle shimmer on hover */}
      <motion.div
        aria-hidden="true"
        initial={{ x: '-100%', opacity: 0 }}
        animate={hovered ? { x: '100%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>Explore Menu</span>

      <motion.span
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.a>
  )
}
