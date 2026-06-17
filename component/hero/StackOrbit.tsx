'use client'

import { motion } from 'motion/react'

/* ─── Floating abstract "stack" layer bars ───────────────────── */
const LAYERS = [
  { x: 320, y: 295, w: 160, h: 16, opacity: 0.4, dur: 5, delay: 0 },
  { x: 290, y: 335, w: 220, h: 12, opacity: 0.3, dur: 6.5, delay: 0.7 },
  { x: 305, y: 370, w: 190, h: 22, opacity: 0.55, dur: 4.5, delay: 0.3 },
  { x: 330, y: 408, w: 140, h: 10, opacity: 0.25, dur: 7, delay: 1.2 },
  { x: 295, y: 440, w: 210, h: 18, opacity: 0.45, dur: 5.5, delay: 0.5 },
  { x: 325, y: 478, w: 150, h: 14, opacity: 0.35, dur: 6, delay: 1 },
]

/* ─── Orbital energy dots ────────────────────────────────────── */
const ORBITAL_DOTS = [
  { radius: 180, angle: 0, size: 3, dur: 24, opacity: 0.7 },
  { radius: 180, angle: 2.1, size: 2, dur: 30, opacity: 0.5 },
  { radius: 260, angle: 0.8, size: 2.5, dur: 36, opacity: 0.55 },
  { radius: 260, angle: 4.0, size: 1.8, dur: 42, opacity: 0.4 },
  { radius: 340, angle: 2.5, size: 2, dur: 50, opacity: 0.3 },
  { radius: 340, angle: 5.3, size: 1.5, dur: 55, opacity: 0.25 },
]

/* ─── Energy arc trails ──────────────────────────────────────── */
const ARCS = [
  { d: 'M 290 345 Q 400 300 510 345', opacity: 0.12, dur: 3 },
  { d: 'M 275 425 Q 400 470 525 425', opacity: 0.08, dur: 4 },
  { d: 'M 340 275 Q 400 245 460 275', opacity: 0.1, dur: 3.5 },
  { d: 'M 310 505 Q 400 535 490 505', opacity: 0.06, dur: 4.5 },
]

/* ─── Spark particles (deterministic positions) ──────────────── */
const SPARKS = Array.from({ length: 6 }, (_, i) => ({
  cx: 400 + (155 + i * 32) * Math.cos((i / 6) * Math.PI * 2 + 0.3),
  cy: 400 + (155 + i * 32) * Math.sin((i / 6) * Math.PI * 2 + 0.3),
  dur: 3.5 + i * 0.4,
  delay: i * 0.7,
}))

/* ─── Orbit ring configs ─────────────────────────────────────── */
const RINGS = [
  { r: 180, dash: '6 14', w: 1, opacity: 0.12, dur: 35, dir: 1 },
  { r: 260, dash: '4 18', w: 0.75, opacity: 0.08, dur: 50, dir: -1 },
  { r: 340, dash: '10 22', w: 0.5, opacity: 0.04, dur: 70, dir: 1 },
]

export default function StackOrbit() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <motion.svg
        viewBox="0 0 800 800"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-[min(92vw,600px)] h-[min(92vw,600px)] md:w-[min(80vw,740px)] md:h-[min(80vw,740px)]"
      >
        <defs>
          {/* Core radial glow */}
          <radialGradient id="sg-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,196,0,0.15)" />
            <stop offset="50%" stopColor="rgba(245,196,0,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Soft glow for layers */}
          <filter id="sg-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow for orbital dots */}
          <filter id="sg-dot-glow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Subtle structural crosshairs ─────────── */}
        <line
          x1="400" y1="180" x2="400" y2="620"
          stroke="rgba(255,255,255,0.015)"
          strokeWidth="0.5"
        />
        <line
          x1="180" y1="400" x2="620" y2="400"
          stroke="rgba(255,255,255,0.015)"
          strokeWidth="0.5"
        />

        {/* ── Central Core Glow ────────────────────── */}
        <motion.circle
          cx={400}
          cy={400}
          fill="url(#sg-core)"
          animate={{ r: [160, 190, 160], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Concentric Orbit Rings ───────────────── */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={400}
            cy={400}
            r={ring.r}
            stroke={`rgba(245,196,0,${ring.opacity})`}
            strokeWidth={ring.w}
            fill="none"
            strokeDasharray={ring.dash}
            animate={{ rotate: 360 * ring.dir }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '400px 400px' }}
          />
        ))}

        {/* ── Floating Stack Layer Bars ─────────────── */}
        {LAYERS.map((l, i) => (
          <motion.rect
            key={`layer-${i}`}
            x={l.x}
            width={l.w}
            height={l.h}
            rx={l.h / 2}
            fill={`rgba(245,196,0,${l.opacity * 0.25})`}
            stroke={`rgba(245,196,0,${l.opacity * 0.3})`}
            strokeWidth="0.5"
            filter="url(#sg-glow)"
            animate={{
              y: [l.y, l.y - 10, l.y],
              x: [l.x, l.x + (i % 2 === 0 ? 5 : -5), l.x],
              opacity: [l.opacity, l.opacity + 0.15, l.opacity],
            }}
            transition={{
              duration: l.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: l.delay,
            }}
          />
        ))}

        {/* ── Orbiting Energy Dots ──────────────────── */}
        {ORBITAL_DOTS.map((d, i) => (
          <motion.g
            key={`od-${i}`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: d.dur, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '400px 400px' }}
          >
            <circle
              cx={400 + d.radius * Math.cos(d.angle)}
              cy={400 + d.radius * Math.sin(d.angle)}
              r={d.size}
              fill={`rgba(245,196,0,${d.opacity})`}
              filter="url(#sg-dot-glow)"
            />
          </motion.g>
        ))}

        {/* ── Flowing Energy Arcs ──────────────────── */}
        {ARCS.map((a, i) => (
          <motion.path
            key={`arc-${i}`}
            d={a.d}
            stroke={`rgba(245,196,0,${a.opacity})`}
            strokeWidth="1"
            fill="none"
            strokeDasharray="6 10"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: a.dur, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* ── Spark Particles ──────────────────────── */}
        {SPARKS.map((s, i) => (
          <motion.circle
            key={`spark-${i}`}
            cx={s.cx}
            cy={s.cy}
            fill="rgba(245,196,0,0.5)"
            animate={{ opacity: [0, 0.7, 0], r: [0, 2.2, 0] }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: s.delay,
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}
