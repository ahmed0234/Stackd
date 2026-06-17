'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import BuildYourStackCTA from './BuildYourStackCTA'
import NavActions from './NavActions'

const MOBILE_NAV = [
  { label: 'Menu', href: '/menu', emoji: '🍔' },
  { label: 'Deals', href: '/deals', emoji: '🔥' },
  { label: 'About', href: '/about', emoji: '✨' },
  { label: 'Stacks', href: '/menu/stacks', emoji: '🥞', sub: true },
  { label: 'Wraps', href: '/menu/wraps', emoji: '🌯', sub: true },
  { label: 'Loaded Fries', href: '/menu/fries', emoji: '🍟', sub: true },
  { label: 'Drinks', href: '/menu/drinks', emoji: '🥤', sub: true },
]

interface MobileMenuProps {
  cartCount: number
  onClose: () => void
}

export default function MobileMenu({ cartCount, onClose }: MobileMenuProps) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '88%',
          maxWidth: 400,
          background: 'rgba(13,13,13,0.98)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: 'radial-gradient(ellipse at top right, rgba(245,196,0,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: '64px 28px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                margin: '0 0 6px',
              }}
            >
              Navigation
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'white',
                margin: 0,
              }}
            >
              STACK<span style={{ color: 'var(--color-brand)' }}>D</span>
            </p>
          </motion.div>
        </div>

        {/* Nav Links */}
        <nav
          aria-label="Mobile navigation"
          style={{ flex: 1, overflow: 'auto', padding: '20px 16px' }}
        >
          {/* Main links */}
          <div style={{ marginBottom: 8 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                padding: '0 12px 8px',
                margin: 0,
              }}
            >
              Main
            </p>
            {MOBILE_NAV.filter((i) => !i.sub).map((item, i) => (
              <MobileNavItem key={item.label} item={item} index={i} onClose={onClose} />
            ))}
          </div>

          {/* Category links */}
          <div style={{ marginTop: 16 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                padding: '0 12px 8px',
                margin: 0,
              }}
            >
              Menu
            </p>
            {MOBILE_NAV.filter((i) => i.sub).map((item, i) => (
              <MobileNavItem key={item.label} item={item} index={i + 4} onClose={onClose} />
            ))}
          </div>
        </nav>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '20px 20px 32px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* Full-width CTA */}
          <Link
            href="/build"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 20px',
              borderRadius: 14,
              textDecoration: 'none',
              background: 'var(--color-brand)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.01em',
              color: '#0a0a0a',
              boxShadow: '0 4px 24px rgba(245,196,0,0.28)',
            }}
          >
            <span style={{ fontSize: 17 }} aria-hidden="true">🥞</span>
            Build Your Stack
            <span aria-hidden="true">→</span>
          </Link>

          {/* Quick actions row */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/cart"
              onClick={onClose}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 12,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--color-text-secondary)',
              }}
            >
              🛍 Cart
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 12,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--color-text-secondary)',
              }}
            >
              👤 Account
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

interface MobileNavItemData {
  label: string
  href: string
  emoji: string
  sub?: boolean
}

function MobileNavItem({
  item,
  index,
  onClose,
}: {
  item: MobileNavItemData
  index: number
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '13px 12px',
          borderRadius: 12,
          textDecoration: 'none',
          color: 'var(--color-text-secondary)',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(245,196,0,0.07)'
          el.style.color = 'white'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'transparent'
          el.style.color = 'var(--color-text-secondary)'
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {item.emoji}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: item.sub ? 14 : 16,
            letterSpacing: '-0.01em',
          }}
        >
          {item.label}
        </span>
        <span
          style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </motion.div>
  )
}
