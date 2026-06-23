'use client'

import { useState, useEffect, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'

import { PRODUCTS, Product } from '@/component/menu/MenuSection'
import { DealCard, MealDealConfigurator } from '@/component/menu/MealDeals'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ============================================================================
// CONFIGURATION: TEST BYPASS TOGGLE
// Set to 'true' to bypass localStorage and show the popup on every page refresh.
// Set to 'false' for production mode (once per day persistence).
// ============================================================================
const BYPASS_PERSISTENCE = true

export default function DealsPopup() {
  const [show, setShow] = useState(false)
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [activeConfigureDeal, setActiveConfigureDeal] = useState<Product | null>(null)

  // Sync navigation states when slides change
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  // Filter deals products from common source of truth
  const dealProducts = PRODUCTS.filter((p) => p.category === 'deals')

  // Check LocalStorage on mount for daily session persistence
  useEffect(() => {
    if (BYPASS_PERSISTENCE) {
      const timer = setTimeout(() => {
        setShow(true)
      }, 800)
      return () => clearTimeout(timer)
    }

    const today = new Date().toDateString()
    const lastShown = localStorage.getItem('stackd_deal_popup_last_shown')
    
    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setShow(true)
        localStorage.setItem('stackd_deal_popup_last_shown', today)
      }, 1000) // 1 second delay for standard unobtrusive load
      return () => clearTimeout(timer)
    }
  }, [])

  // Lock scrolling when either popup or configurator is open
  useEffect(() => {
    const isConfiguratorOpen = activeConfigureDeal !== null
    if (show || isConfiguratorOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [show, activeConfigureDeal])

  const handleClose = () => {
    setShow(false)
  }

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>) => {
    handleClose()
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById('menu')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 w-full h-full z-[1100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Dark backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 w-full h-full bg-black/85 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ y: -100, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -100, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-gradient-to-b from-[#141414] to-[#0a0a0a] rounded-[28px] border border-white/[0.08] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] md:max-h-[85vh] lg:max-h-none"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white/50 hover:text-white flex items-center justify-center transition-all duration-300 z-50 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                title="Close popup"
              >
                <FaTimes size={14} />
              </button>

              {/* Left Column: Visual Brand Intro */}
              <div className="w-full md:w-[35%] p-5 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06] bg-gradient-to-br from-[#161616] to-[#0d0d0d] relative overflow-hidden flex-shrink-0">
                {/* Ambient visual glow inside left panel */}
                <div
                  className="absolute w-44 h-44 rounded-full blur-[64px] opacity-10 pointer-events-none -left-10 -bottom-10"
                  style={{ background: 'var(--color-brand)' }}
                />

                <div className="relative z-10 text-left">
                  <div className="inline-flex px-2.5 py-1 rounded-full bg-brand/[0.08] border border-brand/20 text-brand text-[9px] font-black uppercase tracking-widest font-poppins mb-2 sm:mb-3">
                    🔥 Grab a Deal Before You Decide
                  </div>
                  <h2 className="font-poppins font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight leading-none m-0">
                    Craving Big? <br />
                    Freshly <span className="text-brand">Stacked.</span>
                  </h2>
                  <p className="hidden md:block font-sans text-[11px] text-white/55 mt-2.5 leading-relaxed">
                    Don't just order food—design it. Customize your hand-pressed Angus beef patties, choose your signature sauces, and combine them with loaded fries & cold sips for the ultimate value.
                  </p>
                  
                  {/* STEP-BY-STEP ROADMAP (Hidden on Mobile, Visible on Desktop) */}
                  <div className="hidden md:flex flex-col gap-3 p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] mt-5 font-sans">
                    <span className="font-poppins font-black text-[9px] text-brand tracking-widest uppercase block mb-1">
                      How to STACK
                    </span>
                    
                    {/* Step 1 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-brand text-[#0a0a0a] text-[9.5px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_8px_rgba(245,196,0,0.3)]">
                        1
                      </div>
                      <div>
                        <h4 className="text-[11.5px] font-bold text-white m-0 uppercase tracking-wide">Choose Your Deal</h4>
                        <p className="text-[9.5px] text-white/50 m-0 mt-0.5 leading-tight">Pick a value combo from the carousel</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-white/10 text-white text-[9.5px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="text-[11.5px] font-bold text-white/90 m-0 uppercase tracking-wide">Customize Options</h4>
                        <p className="text-[9.5px] text-white/50 m-0 mt-0.5 leading-tight">Select your signature stacks & drinks</p>
                      </div>
                    </div>

                    {/* Step-3 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-white/10 text-white text-[9.5px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="text-[11.5px] font-bold text-white/90 m-0 uppercase tracking-wide">Checkout & Eat</h4>
                        <p className="text-[9.5px] text-white/50 m-0 mt-0.5 leading-tight">Add deal directly to your order tray</p>
                      </div>
                    </div>
                  </div>

                  {/* TRUST BADGES ROW (Hidden on Mobile, Visible on Desktop) */}
                  <div className="hidden md:flex items-center justify-between gap-1 mt-5 border-t border-white/[0.04] pt-4">
                    <div className="flex flex-col items-center gap-0.5 flex-1">
                      <span className="text-[10px] text-brand">🍔</span>
                      <span className="text-[8px] font-bold text-white/45 uppercase tracking-wider">Custom Stacks</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 flex-1">
                      <span className="text-[10px] text-brand">⚡</span>
                      <span className="text-[8px] font-bold text-white/45 uppercase tracking-wider">Fast Kitchen</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <div className="flex flex-col items-center gap-0.5 flex-1">
                      <span className="text-[10px] text-brand">🇵🇰</span>
                      <span className="text-[8px] font-bold text-white/45 uppercase tracking-wider">Rawalpindi Only</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block relative z-10 mt-6 md:mt-0">
                  <Link
                    href="/#menu"
                    onClick={handleMenuClick}
                    className="w-full py-3 rounded-xl bg-white hover:bg-white/90 text-[#0a0a0a] font-poppins font-extrabold text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:scale-102 cursor-pointer no-underline block"
                  >
                    Start Building Your Meal
                  </Link>
                </div>
              </div>

              {/* Right Column: Carousel Swiper */}
              <div className="w-full md:w-[65%] p-5 md:p-8 flex flex-col justify-center overflow-hidden min-w-0 relative">
                {/* Header row with Title (No overlap arrows) */}
                <div className="flex items-center justify-between mb-3 md:mb-4 border-b border-white/[0.04] pb-2 md:pb-3">
                  <span className="font-sans text-[10px] font-black tracking-widest text-white/35 uppercase">
                    Swipe to explore STACKD specials
                  </span>
                </div>

                {/* Slider Swiper Wrapper (Includes absolute positioned arrows) */}
                <div className="relative w-full px-0 md:px-5">
                  {/* Floating Navigation Arrows - Center vertically on carousel borders with brand theme */}
                  <button
                    onClick={() => swiperRef?.slidePrev()}
                    disabled={isBeginning}
                    className={`absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md z-30 select-none ${
                      isBeginning
                        ? 'border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-0 pointer-events-none'
                        : 'border-brand/40 text-brand bg-black/85 hover:bg-brand hover:border-brand hover:text-[#0a0a0a] cursor-pointer hover:scale-110 active:scale-90 shadow-[0_4px_16px_rgba(245,196,0,0.18)]'
                    }`}
                    title="Previous Deal"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    onClick={() => swiperRef?.slideNext()}
                    disabled={isEnd}
                    className={`absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md z-30 select-none ${
                      isEnd
                        ? 'border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-0 pointer-events-none'
                        : 'border-brand/40 text-brand bg-black/85 hover:bg-brand hover:border-brand hover:text-[#0a0a0a] cursor-pointer hover:scale-110 active:scale-90 shadow-[0_4px_16px_rgba(245,196,0,0.18)]'
                    }`}
                    title="Next Deal"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  <Swiper
                    modules={[Navigation, Pagination]}
                    onSwiper={(swiper) => {
                      setSwiperRef(swiper)
                      setIsBeginning(swiper.isBeginning)
                      setIsEnd(swiper.isEnd)
                    }}
                    onSlideChange={handleSlideChange}
                    spaceBetween={16}
                    slidesPerView={1}
                    grabCursor={true}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 1.15 },
                      1024: { slidesPerView: 1.25 },
                    }}
                    className="mySwiper !overflow-visible !pb-4"
                  >
                    {dealProducts.map((product) => (
                      <SwiperSlide key={product.id} className="h-auto">
                        <div className="px-0.5 py-0.5 h-full">
                          <DealCard
                            product={product}
                            onConfigure={() => setActiveConfigureDeal(product)}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Mobile View Full Menu Link */}
                <div className="mt-4 w-full md:hidden flex justify-center pb-2">
                  <Link
                    href="/#menu"
                    onClick={handleMenuClick}
                    className="text-xs font-poppins font-bold text-white/55 hover:text-brand hover:border-brand transition-all duration-200 uppercase tracking-widest no-underline border-b border-white/20 pb-0.5"
                  >
                    Or Explore Full Menu
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customizable Deal Configurator Overlay */}
      <AnimatePresence>
        {activeConfigureDeal && (
          <MealDealConfigurator
            activeDeal={activeConfigureDeal}
            onClose={() => {
              setActiveConfigureDeal(null)
            }}
            onSuccess={() => {
              setActiveConfigureDeal(null)
              handleClose() // Close both configurator and deals popup upon adding to cart
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
