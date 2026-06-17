'use client'

import { useState, useRef, RefObject } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Menu', href: '/menu', hasDropdown: true },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
]

interface NavLinksProps {
  menuDropdownOpen: boolean
  onMenuToggle: () => void
  dropdownRef: RefObject<HTMLDivElement | null>
}

export default function NavLinks({ menuDropdownOpen, onMenuToggle, dropdownRef }: NavLinksProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div
      ref={dropdownRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        position: 'relative',
      }}
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const isMenuOpen = item.hasDropdown && menuDropdownOpen
        const isHovered = hoveredItem === item.label

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
            onHoverStart={() => setHoveredItem(item.label)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            {item.hasDropdown ? (
              <button
                onClick={onMenuToggle}
                aria-expanded={menuDropdownOpen}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: 'none',
                  background: isMenuOpen
                    ? 'rgba(245,196,0,0.08)'
                    : isHovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 14.5,
                  letterSpacing: '-0.01em',
                  color: isActive || isMenuOpen
                    ? 'var(--color-brand)'
                    : isHovered
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {item.label}
                <motion.span
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
                >
                  <ChevronIcon />
                </motion.span>

                {/* Hover underline */}
                <NavUnderline visible={isHovered || isMenuOpen} brand={isMenuOpen} />
              </button>
            ) : (
              <Link
                href={item.href}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '9px 16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  background: isHovered
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
                  transition: 'background 0.2s ease',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 14.5,
                  letterSpacing: '-0.01em',
                  color: isActive
                    ? 'var(--color-brand)'
                    : isHovered
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {item.label}
                <NavUnderline visible={isHovered || isActive} brand={isActive} />
              </Link>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

function NavUnderline({ visible, brand }: { visible: boolean; brand?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        bottom: 4,
        left: 16,
        right: 16,
        height: 2,
        borderRadius: 1,
        background: brand
          ? 'var(--color-brand)'
          : 'rgba(255,255,255,0.35)',
        transformOrigin: 'left center',
        boxShadow: brand ? '0 0 8px rgba(245,196,0,0.6)' : 'none',
      }}
    />
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
