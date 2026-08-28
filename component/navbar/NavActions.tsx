'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface NavActionsProps {
  cartCount: number
  compact?: boolean
}

export default function NavActions({ cartCount, compact }: NavActionsProps) {
  const [cartHovered, setCartHovered] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {/* Cart */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/cart"
          aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          onMouseEnter={() => setCartHovered(true)}
          onMouseLeave={() => setCartHovered(false)}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: cartHovered
              ? 'rgba(245,196,0,0.08)'
              : 'rgba(255,255,255,0.04)',
            border: cartHovered
              ? '1px solid rgba(245,196,0,0.22)'
              : '1px solid rgba(255,255,255,0.07)',
            textDecoration: 'none',
            color: cartHovered ? 'var(--color-brand)' : 'var(--color-text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          <motion.div
            animate={cartHovered ? { y: [-2, 2, -1, 0], rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CartIcon />
          </motion.div>

          {/* Badge */}
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 7,
                right: 7,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'var(--color-brand)',
                color: '#111',
                fontSize: 9,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                boxShadow: '0 0 8px rgba(245,196,0,0.5)',
              }}
            >
              {cartCount}
            </motion.span>
          )}
        </Link>
      </motion.div>
    </div>
  )
}

function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
