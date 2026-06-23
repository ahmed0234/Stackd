'use client'

import { MouseEvent } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  FaUtensils,
  FaFire,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaUser,
  FaBookOpen,
  FaSlidersH,
} from 'react-icons/fa'

interface MobileMenuProps {
  cartCount: number
  onClose: () => void
}

export default function MobileMenu({ cartCount, onClose }: MobileMenuProps) {
  // Smooth scroll handler for same-page section anchors
  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
    targetId?: string
  ) => {
    if (targetId && typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      onClose()
    } else {
      onClose()
    }
  }

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
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
          width: '92%',
          maxWidth: 420,
          background: 'rgba(11,11,11,0.98)',
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
            background: 'radial-gradient(ellipse at top right, rgba(245,196,0,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div className="relative z-10 px-7 pt-16 pb-6 border-b border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
          >
            <p className="font-sans text-[10px] font-black tracking-widest text-white/30 uppercase m-0 mb-1.5">
              Navigation
            </p>
            <p className="font-poppins font-black text-2xl tracking-tighter text-white m-0">
              STACK<span className="text-brand">D</span>
            </p>
          </motion.div>
        </div>

        {/* Main Content Area (Scrollable) */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 pb-10 flex flex-col gap-6 scrollbar-none">
          
          {/* Section: Primary Actions */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[10px] font-black tracking-widest text-white/25 uppercase m-0 mb-1 pl-0.5">
              Order & Customise
            </p>

            {/* ORDER NOW CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.985 }}
              className="w-full"
            >
              <Link
                href="/#menu"
                onClick={(e) => handleItemClick(e, '/#menu', 'menu')}
                className="relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-brand to-[#D97706] shadow-[0_8px_30px_rgba(245,196,0,0.15)] overflow-hidden no-underline group"
              >
                {/* Shiny gloss line animation */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: 'linear',
                    repeatDelay: 1.2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                />

                {/* Icon wrapper */}
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/8 text-[#0a0a0a] text-lg">
                  <FaUtensils />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-poppins font-black text-lg text-[#0a0a0a] uppercase tracking-tight m-0">
                    Order Now
                  </h3>
                  <p className="font-sans font-semibold text-xs text-black/65 mt-0.5 m-0 leading-tight">
                    Satisfy your cravings instantly
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-xl font-bold text-[#0a0a0a] group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </motion.div>

            {/* BUILD YOUR CUSTOM STACKD CARD */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.35 }}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.985 }}
              className="w-full"
            >
              <Link
                href="/build"
                onClick={onClose}
                className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/[0.015] border border-brand/20 hover:border-brand/40 hover:bg-brand/[0.03] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.25)] no-underline group"
              >
                {/* Icon wrapper */}
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand/[0.07] text-brand text-lg">
                  <FaSlidersH />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-poppins font-black text-[15px] text-white tracking-tight m-0">
                    Build Your Custom STACKD
                  </h3>
                  <p className="font-sans text-xs text-white/60 mt-0.5 m-0 leading-tight">
                    Craft a burger masterpiece your way
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-lg text-brand group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </motion.div>

            {/* TWO COLUMN GRID FOR DEALS & CART */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* DEALS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/#meal-deals"
                  onClick={(e) => handleItemClick(e, '/#meal-deals', 'meal-deals')}
                  className="flex flex-col justify-between h-[124px] p-4 rounded-2xl bg-red-500/[0.03] border border-red-500/15 hover:border-red-500/35 hover:bg-red-500/[0.06] transition-all duration-300 no-underline group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/[0.07] text-red-500 text-base">
                    <FaFire />
                  </div>
                  <div>
                    <h4 className="font-poppins font-black text-sm text-white m-0">
                      Hot Deals
                    </h4>
                    <p className="font-sans text-[11px] text-white/45 mt-0.5 m-0 leading-tight">
                      Save on combos
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* CART CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.35 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex flex-col justify-between h-[124px] p-4 rounded-2xl bg-brand/[0.03] border border-brand/15 hover:border-brand/35 hover:bg-brand/[0.06] transition-all duration-300 no-underline group"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand/[0.07] text-brand text-base">
                      <FaShoppingBag />
                    </div>
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-brand text-[#0a0a0a] font-poppins font-extrabold text-[10px] px-2 py-0.5 rounded-lg shadow-[0_0_12px_rgba(245,196,0,0.35)]"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-poppins font-black text-sm text-white m-0">
                      View Cart
                    </h4>
                    <p className="font-sans text-[11px] text-white/45 mt-0.5 m-0 leading-tight">
                      Check active order
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Section: Explore & Navigation */}
          <div className="flex flex-col gap-2.5 mt-2">
            <p className="font-sans text-[10px] font-black tracking-widest text-white/25 uppercase m-0 mb-1 pl-0.5">
              Explore STACKD
            </p>

            {/* MENU LINK */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
              whileHover={{ x: 4 }}
              className="w-full"
            >
              <Link
                href="/#menu"
                onClick={(e) => handleItemClick(e, '/#menu', 'menu')}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl text-white/65 hover:text-white bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.07] hover:bg-white/[0.04] transition-all duration-300 no-underline group"
              >
                <span className="text-white/40 group-hover:text-brand transition-colors duration-300 flex items-center">
                  <FaBookOpen />
                </span>
                <span className="font-poppins font-extrabold text-sm tracking-wide">
                  Full Menu
                </span>
                <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors duration-300 text-xs">
                  →
                </span>
              </Link>
            </motion.div>

            {/* CONTACT US LINK */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.3 }}
              whileHover={{ x: 4 }}
              className="w-full"
            >
              <Link
                href="/#footer"
                onClick={(e) => handleItemClick(e, '/#footer', 'footer')}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl text-white/65 hover:text-white bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.07] hover:bg-white/[0.04] transition-all duration-300 no-underline group"
              >
                <span className="text-white/40 group-hover:text-brand transition-colors duration-300 flex items-center">
                  <FaMapMarkerAlt />
                </span>
                <span className="font-poppins font-extrabold text-sm tracking-wide">
                  Contact Us
                </span>
                <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors duration-300 text-xs">
                  →
                </span>
              </Link>
            </motion.div>

            {/* MY ACCOUNT LINK */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.36, duration: 0.3 }}
              whileHover={{ x: 4 }}
              className="w-full"
            >
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3.5 px-4.5 py-3.5 rounded-xl text-white/65 hover:text-white bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.07] hover:bg-white/[0.04] transition-all duration-300 no-underline group"
              >
                <span className="text-white/40 group-hover:text-brand transition-colors duration-300 flex items-center">
                  <FaUser />
                </span>
                <span className="font-poppins font-extrabold text-sm tracking-wide">
                  My Account
                </span>
                <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors duration-300 text-xs">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
