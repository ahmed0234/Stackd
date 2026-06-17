'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavLogo() {
  return (
    <Link
      href="/"
      aria-label="STACKD — Go to home"
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}
      >
        {/* Glow behind logo */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: -6,
            borderRadius: 16,
            background: 'radial-gradient(ellipse at center, rgba(245,196,0,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(6px)',
          }}
        />

        {/* Logo image */}
        <div
          style={{
            position: 'relative',
            width: 44,
            height: 44,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(245,196,0,0.25)',
            boxShadow: '0 2px 16px rgba(245,196,0,0.15)',
          }}
        >
          <Image
            src="/Logo.jpeg"
            alt="STACKD logo"
            fill
            sizes="44px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Brand wordmark */}
        <div style={{ lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              display: 'block',
            }}
          >
            STACK
            <span style={{ color: 'var(--color-brand)' }}>D</span>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Premium Eats
          </span>
        </div>
      </motion.div>
    </Link>
  )
}
