'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'

export default function BuildYourStackCTA() {
  const [hovered, setHovered] = useState(false)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  // Magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    mouseX.set(dx * 0.28)
    mouseY.set(dy * 0.28)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }, [mouseX, mouseY])

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginLeft: 8 }}
    >
      <motion.a
        ref={buttonRef}
        href="/build"
        aria-label="Build Your Stack — Start your order"
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 22px',
          borderRadius: 14,
          textDecoration: 'none',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 13.5,
          letterSpacing: '-0.01em',
          color: '#0a0a0a',
          userSelect: 'none',
          overflow: 'hidden',
          // Layered background
          background: 'var(--color-brand)',
          boxShadow: hovered
            ? '0 0 0 1px rgba(245,196,0,0.5), 0 0 32px rgba(245,196,0,0.35), 0 8px 24px rgba(0,0,0,0.45)'
            : '0 0 0 1px rgba(245,196,0,0.3), 0 4px 16px rgba(0,0,0,0.35)',
          transition: 'box-shadow 0.3s ease',
        }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Animated shine sweep */}
        <motion.div
          aria-hidden="true"
          initial={{ x: '-120%', skewX: -15 }}
          animate={hovered ? { x: '220%' } : { x: '-120%' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
            pointerEvents: 'none',
            skewX: -15,
          }}
        />

        {/* Ambient glow orb */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: hovered ? [0.5, 0.9, 0.5] : 0,
            scale: hovered ? [1, 1.4, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 16,
            background: 'radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.2) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Border trail animation */}
        <motion.div
          aria-hidden="true"
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 14,
            padding: 1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(245,196,0,0.2) 50%, rgba(255,255,255,0.6) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          }}
        />

        {/* Stack icon */}
        <motion.span
          animate={hovered ? { rotate: [0, -10, 10, 0], y: [0, -2, 0] } : {}}
          transition={{ duration: 0.45 }}
          style={{ display: 'flex', alignItems: 'center' }}
          aria-hidden="true"
        >
          <StackIcon />
        </motion.span>

        {/* Label */}
        <span style={{ position: 'relative', zIndex: 1 }}>Build Your Stack</span>

        {/* Arrow */}
        <motion.span
          animate={hovered ? { x: 3 } : { x: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}
          aria-hidden="true"
        >
          <ArrowIcon />
        </motion.span>
      </motion.a>
    </motion.div>
  )
}

function StackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
