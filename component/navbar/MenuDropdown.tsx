'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

const MENU_CATEGORIES = [
  {
    id: 'stacks',
    label: 'Stacks',
    description: 'Our signature layered creations',
    emoji: '🥞',
    href: '/menu/stacks',
    accent: '#F5C400',
    items: ['Classic Stack', 'Double Stack', 'OG Stack', 'Beast Mode'],
  },
  {
    id: 'wraps',
    label: 'Wraps',
    description: 'Stuffed & rolled to perfection',
    emoji: '🌯',
    href: '/menu/wraps',
    accent: '#FF9F43',
    items: ['Crispy Chicken', 'Smash Wrap', 'Veggie Deluxe'],
  },
  {
    id: 'fries',
    label: 'Loaded Fries',
    description: 'Golden, crispy, loaded heavy',
    emoji: '🍟',
    href: '/menu/fries',
    accent: '#EE5A24',
    items: ['Cheese Bomb', 'BBQ Pulled', 'Bacon Chilli'],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    description: 'Cold sips to cool you down',
    emoji: '🥤',
    href: '/menu/drinks',
    accent: '#48dbfb',
    items: ['Lemonade', 'Iced Tea', 'Milkshakes', 'Sodas'],
  },
  {
    id: 'toppings',
    label: 'Toppings',
    description: 'Build it exactly how you want',
    emoji: '✨',
    href: '/menu/toppings',
    accent: '#a29bfe',
    items: ['Cheese Blends', 'Sauces', 'Extras', 'Jalapeños'],
  },
]

const FEATURED = {
  title: 'The OG Stack',
  tag: '🔥 Fan Favourite',
  description: 'Double smash patty, secret sauce, pickles, caramelised onions on a brioche bun.',
  price: '£9.95',
  href: '/menu/stacks/og-stack',
}

interface MenuDropdownProps {
  onClose: () => void
}

export default function MenuDropdown({ onClose }: MenuDropdownProps) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id)

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role="region"
      aria-label="Menu categories"
      style={{
        position: 'absolute',
        top: 'calc(100% + 56px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 720,
        maxWidth: 'calc(100vw - 48px)',
        background: 'rgba(14, 14, 14, 0.95)',
        backdropFilter: 'blur(32px) saturate(160%)',
        WebkitBackdropFilter: 'blur(32px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        boxShadow: '0 24px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,196,0,0.06)',
        overflow: 'hidden',
        zIndex: 999,
      }}
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(245,196,0,0.5), transparent)',
        }}
      />

      <div style={{ display: 'flex', height: 360 }}>
        {/* Left — Categories */}
        <div
          style={{
            width: 230,
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            padding: '20px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              padding: '0 8px 8px',
              margin: 0,
            }}
          >
            Categories
          </p>

          {MENU_CATEGORIES.map((cat, i) => {
            const isActive = activeCategory === cat.id
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={cat.href}
                  onClick={onClose}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    background: isActive
                      ? 'rgba(245,196,0,0.08)'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(245,196,0,0.15)'
                      : '1px solid transparent',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: isActive
                        ? `rgba(${hexToRgb(cat.accent)}, 0.15)`
                        : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 17,
                      flexShrink: 0,
                      transition: 'background 0.18s ease',
                    }}
                    aria-hidden="true"
                  >
                    {cat.emoji}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 13.5,
                        color: isActive ? 'var(--color-brand)' : 'var(--color-text-primary)',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.18s ease',
                      }}
                    >
                      {cat.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        color: 'var(--color-text-muted)',
                        marginTop: 1,
                      }}
                    >
                      {cat.description}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Middle — Items */}
        <div
          style={{
            flex: 1,
            padding: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {MENU_CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 12px',
                }}
              >
                {cat.label}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                }}
              >
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={`${cat.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 12px',
                        borderRadius: 10,
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 13,
                        color: 'var(--color-text-secondary)',
                        letterSpacing: '-0.01em',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(cat.accent)}, 0.07)`
                        ;(e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(cat.accent)}, 0.2)`
                        ;(e.currentTarget as HTMLElement).style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: cat.accent,
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                        aria-hidden="true"
                      />
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href={cat.href}
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 'auto',
                  paddingTop: 16,
                  fontFamily: 'var(--font-display)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--color-brand)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                View all {cat.label} →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right — Featured card */}
        <div
          style={{
            width: 188,
            flexShrink: 0,
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              margin: '0 0 12px',
            }}
          >
            Featured
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={FEATURED.href}
              onClick={onClose}
              style={{
                display: 'block',
                borderRadius: 14,
                overflow: 'hidden',
                textDecoration: 'none',
                background: 'linear-gradient(145deg, rgba(245,196,0,0.12) 0%, rgba(245,196,0,0.04) 100%)',
                border: '1px solid rgba(245,196,0,0.18)',
                padding: 14,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(145deg, rgba(245,196,0,0.18) 0%, rgba(245,196,0,0.07) 100%)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,196,0,0.3)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(145deg, rgba(245,196,0,0.12) 0%, rgba(245,196,0,0.04) 100%)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,196,0,0.18)'
              }}
            >
              {/* Emoji hero */}
              <div
                style={{
                  width: '100%',
                  height: 90,
                  borderRadius: 10,
                  background: 'rgba(245,196,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 46,
                  marginBottom: 12,
                }}
                aria-hidden="true"
              >
                🥞
              </div>

              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(245,196,0,0.15)',
                  border: '1px solid rgba(245,196,0,0.25)',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--color-brand)',
                  letterSpacing: '0.04em',
                  marginBottom: 8,
                }}
              >
                {FEATURED.tag}
              </span>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: 'white',
                  letterSpacing: '-0.01em',
                  marginBottom: 6,
                }}
              >
                {FEATURED.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.45,
                  marginBottom: 12,
                }}
              >
                {FEATURED.description}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 18,
                  color: 'var(--color-brand)',
                }}
              >
                {FEATURED.price}
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Fresh ingredients · Halal certified · Made to order
        </span>
        <Link
          href="/menu"
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 12.5,
            color: 'var(--color-brand)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          Full Menu →
        </Link>
      </div>
    </motion.div>
  )
}

// Utility: convert hex to rgb string for rgba()
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
