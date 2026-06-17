'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════════════
   Layer Data & Content
   ═══════════════════════════════════════════════════════════════ */

const LAYERS = [
  {
    id: 1,
    tagline: "Layer 01 — Top Bun",
    headline: "Every Great Stack Starts With Intention.",
    desc: "A soft, toasted artisanal sesame bun, baked fresh and sliced with precision. The crown that holds the masterpieces together.",
    img: "/story/top_bun.png",
    accent: "Sesame Crown"
  },
  {
    id: 2,
    tagline: "Layer 02 — Premium Patty",
    headline: "Built Fresh. Never Rushed.",
    desc: "100% premium angus beef, custom blend, smashed and seared on a smoking hot griddle to seal in ultimate caramelization.",
    img: "/story/beef_patty.png",
    accent: "Smashed Angus"
  },
  {
    id: 3,
    tagline: "Layer 03 — Melted Cheese",
    headline: "Layers Worth Craving.",
    desc: "A thick layer of real cheddar cheese, draped carefully and melted to gooey, golden perfection over the hot patty.",
    img: "/story/melted_cheese.png",
    accent: "Gooey Cheddar"
  },
  {
    id: 4,
    tagline: "Layer 04 — Signature Sauce",
    headline: "The Difference Is In The Details.",
    desc: "A rich, creamy signature STACKD sauce, blending smoke, tang, and heat to elevate every single bite.",
    img: "/story/signature_sauce.png",
    accent: "Secret Recipe"
  },
  {
    id: 5,
    tagline: "Layer 05 — Loaded Fries",
    headline: "Loaded Without Limits.",
    desc: "Crispy, hand-cut golden fries loaded with cheese and seasoning, scattering to complete the ultimate meal composition.",
    img: "/story/loaded_fries.png",
    accent: "Crispy Cascade"
  },
  {
    id: 6,
    tagline: "Final Scene — The Masterpiece",
    headline: "Your Stack Is Complete.",
    desc: "Crafted ingredient by ingredient. Built obsession by obsession. The ultimate fast-casual luxury dining experience.",
    img: "/story/assembled_burger.png",
    accent: "STACKD Burger"
  }
]

export default function CraftedLayerSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Detect if mobile view
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hook into scroll progress of the entire container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll progress for cleaner animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  })

  /* ─────────────────────────────────────────────────────────────
     Scroll-linked calculations for active step
     ───────────────────────────────────────────────────────────── */
  const [activeIndex, setActiveIndex] = useState(0)

  // Track scroll values in state to update active index dynamically
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      // Map scroll progress [0, 1] to 6 sections
      // 0.0 - 0.16 (Layer 1)
      // 0.16 - 0.33 (Layer 2)
      // 0.33 - 0.50 (Layer 3)
      // 0.50 - 0.66 (Layer 4)
      // 0.66 - 0.83 (Layer 5)
      // 0.83 - 1.0 (Final Scene)
      if (val < 0.16) {
        setActiveIndex(0)
      } else if (val < 0.33) {
        setActiveIndex(1)
      } else if (val < 0.50) {
        setActiveIndex(2)
      } else if (val < 0.66) {
        setActiveIndex(3)
      } else if (val < 0.83) {
        setActiveIndex(4)
      } else {
        setActiveIndex(5)
      }
    })
    return () => unsubscribe()
  }, [smoothProgress])

  /* ─────────────────────────────────────────────────────────────
     Desktop Ingredient Motion Values
     ───────────────────────────────────────────────────────────── */
  // Top Bun: falls from high above (-600px) down to its final stacked position (-80px)
  const topBunY = useTransform(smoothProgress, [0, 0.2], [-600, -80])
  const topBunOpacity = useTransform(smoothProgress, [0, 0.08, 0.83, 0.88], [0, 1, 1, 0])

  // Beef Patty: slides up from bottom (+600px) to its final position (+100px)
  const pattyY = useTransform(smoothProgress, [0.12, 0.32], [600, 100])
  const pattyOpacity = useTransform(smoothProgress, [0.12, 0.20, 0.83, 0.88], [0, 1, 1, 0])

  // Melted Cheese: slides in from right/bottom (+500px) to its final position (+40px)
  const cheeseY = useTransform(smoothProgress, [0.28, 0.48], [500, 40])
  const cheeseOpacity = useTransform(smoothProgress, [0.28, 0.36, 0.83, 0.88], [0, 1, 1, 0])

  // Signature Sauce: slides down from above (-300px) to its final position (-20px)
  const sauceY = useTransform(smoothProgress, [0.44, 0.64], [-300, -20])
  const sauceOpacity = useTransform(smoothProgress, [0.44, 0.52, 0.83, 0.88], [0, 1, 1, 0])

  // Loaded Fries: slides up from bottom (+400px) to its final position (+160px)
  const friesY = useTransform(smoothProgress, [0.60, 0.80], [400, 160])
  const friesOpacity = useTransform(smoothProgress, [0.60, 0.68, 0.83, 0.88], [0, 1, 1, 0])

  // Flying fries (Subtle explosion)
  // Fry 1: flying top-left
  const fry1X = useTransform(smoothProgress, [0.65, 0.82], [0, -180])
  const fry1Y = useTransform(smoothProgress, [0.65, 0.82], [160, -120])
  const fry1Rotate = useTransform(smoothProgress, [0.65, 0.82], [0, 45])
  const fry1Scale = useTransform(smoothProgress, [0.65, 0.80], [0, 0.4])
  const fry1Opacity = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [0, 1, 1, 0])

  // Fry 2: flying top-right
  const fry2X = useTransform(smoothProgress, [0.65, 0.82], [0, 190])
  const fry2Y = useTransform(smoothProgress, [0.65, 0.82], [160, -160])
  const fry2Rotate = useTransform(smoothProgress, [0.65, 0.82], [0, -35])
  const fry2Scale = useTransform(smoothProgress, [0.65, 0.80], [0, 0.45])
  const fry2Opacity = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [0, 1, 1, 0])

  // Fry 3: flying bottom-left
  const fry3X = useTransform(smoothProgress, [0.65, 0.82], [0, -210])
  const fry3Y = useTransform(smoothProgress, [0.65, 0.82], [160, 200])
  const fry3Rotate = useTransform(smoothProgress, [0.65, 0.82], [0, 15])
  const fry3Scale = useTransform(smoothProgress, [0.65, 0.80], [0, 0.38])
  const fry3Opacity = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [0, 1, 1, 0])

  // Fry 4: flying bottom-right
  const fry4X = useTransform(smoothProgress, [0.65, 0.82], [0, 200])
  const fry4Y = useTransform(smoothProgress, [0.65, 0.82], [160, 220])
  const fry4Rotate = useTransform(smoothProgress, [0.65, 0.82], [0, -60])
  const fry4Scale = useTransform(smoothProgress, [0.65, 0.80], [0, 0.42])
  const fry4Opacity = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [0, 1, 1, 0])

  // Assembled Burger (Final Reveal): fades in at the very end
  const assembledOpacity = useTransform(smoothProgress, [0.82, 0.90], [0, 1])
  const assembledScale = useTransform(smoothProgress, [0.82, 0.92], [0.8, 1])
  const assembledY = useTransform(smoothProgress, [0.82, 0.92], [50, 0])

  // Dynamic Glow
  const glowOpacity = useTransform(smoothProgress, [0.82, 0.92], [0, 0.6])
  const glowScale = useTransform(smoothProgress, [0.82, 0.92], [0.5, 1.2])

  /* ─────────────────────────────────────────────────────────────
     Mobile-Specific Ingredient Motion Values
     ───────────────────────────────────────────────────────────── */
  // Scale down translation distances to fit the smaller 40vh canvas
  const topBunYMob = useTransform(smoothProgress, [0, 0.2], [-180, -25])
  const pattyYMob = useTransform(smoothProgress, [0.12, 0.32], [180, 25])
  const cheeseYMob = useTransform(smoothProgress, [0.28, 0.48], [150, 10])
  const sauceYMob = useTransform(smoothProgress, [0.44, 0.64], [-100, -5])
  const friesYMob = useTransform(smoothProgress, [0.60, 0.80], [150, 45])

  // Mobile flying fries
  const fry1XMob = useTransform(smoothProgress, [0.65, 0.82], [0, -75])
  const fry1YMob = useTransform(smoothProgress, [0.65, 0.82], [45, -50])
  const fry2XMob = useTransform(smoothProgress, [0.65, 0.82], [0, 75])
  const fry2YMob = useTransform(smoothProgress, [0.65, 0.82], [45, -60])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[var(--color-dark-primary)]"
      style={{ height: '450vh' }}
      id="crafted-story"
    >
      {/* ── Background Aesthetics ────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Radial Yellow Glow */}
        <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.02)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[60%] right-1/4 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.015)_0%,transparent_70%)] blur-3xl" />

        {/* Ambient grids/strokes */}
        <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="story-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#story-grid)" />
        </svg>

        {/* Dynamic Curved Flavor Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1920 1080" fill="none">
          {/* Path 1 */}
          <motion.path 
            d="M -100 200 Q 300 100, 600 300 T 1300 200 T 2020 400" 
            stroke="var(--color-brand)" 
            strokeWidth="0.5" 
            strokeDasharray="4 8"
            opacity="0.15"
            style={{ pathLength: 1 }}
          />
          {/* Path 2 */}
          <motion.path 
            d="M -100 800 Q 400 900, 960 700 T 2020 800" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="0.5" 
            opacity="0.2"
          />
        </svg>
      </div>

      {/* ── STICKY VIEWPORT CONTAINER ────────────────────────────── */}
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* ── LEFT SIDE: TEXT STORYBOARD (Desktop) ─────────────────── */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center p-12 lg:p-24 relative z-20">
          <div className="relative w-full max-w-xl h-[400px]">
            {LAYERS.map((layer, index) => {
              const isActive = activeIndex === index
              
              return (
                <motion.div
                  key={layer.id}
                  className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isActive ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } : { opacity: 0, y: -30, transition: { duration: 0.4 } }}
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-brand)] mb-3">
                    {layer.tagline}
                  </span>
                  <h2 
                    className="text-white text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tight"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {layer.headline}
                  </h2>
                  <p className="text-[rgba(255,255,255,0.6)] text-lg lg:text-xl font-light leading-relaxed mb-8">
                    {layer.desc}
                  </p>

                  {/* CTA on Final Scene */}
                  {index === 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <a 
                        href="#menu" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-brand)] text-black font-extrabold rounded-full transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(245,196,0,0.4)] group"
                      >
                        Build Your Stack
                        <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT SIDE: BURGER CANVAS (Desktop) ─────────────────── */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center relative bg-transparent z-10">
          {/* Active SVG Connector Overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 960 1080">
            {/* Top Bun Line */}
            <motion.path 
              d="M 120 540 C 250 540, 320 460, 480 460"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={activeIndex === 0 ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Patty Line */}
            <motion.path 
              d="M 120 540 C 250 540, 320 640, 480 640"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={activeIndex === 1 ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Cheese Line */}
            <motion.path 
              d="M 120 540 C 250 540, 320 580, 480 580"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={activeIndex === 2 ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Sauce Line */}
            <motion.path 
              d="M 120 540 C 250 540, 320 520, 480 520"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={activeIndex === 3 ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Fries Line */}
            <motion.path 
              d="M 120 540 C 250 540, 320 700, 480 700"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={activeIndex === 4 ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Glowing endpoint dots */}
            {activeIndex < 5 && (
              <motion.circle 
                cx="120" 
                cy="540" 
                r="5" 
                fill="var(--color-brand)"
                animate={{ r: [5, 8, 5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </svg>

          {/* Canvas Wrapper */}
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            
            {/* Final Scene Glow background */}
            <motion.div
              style={{
                position: 'absolute',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,196,0,0.18) 0%, transparent 70%)',
                opacity: glowOpacity,
                scale: glowScale,
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* Individual Ingredient Layers */}
            
            {/* Layer 1: Top Bun */}
            <motion.div 
              style={{ y: topBunY, opacity: topBunOpacity, position: 'absolute', zIndex: 6, mixBlendMode: 'lighten' }}
              className="w-[340px] h-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/story/top_bun.png" 
                alt="Top Bun" 
                fill 
                className="object-contain" 
                sizes="340px"
                priority
              />
              <div className="absolute right-0 top-[20%] bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-[var(--color-brand)] font-bold tracking-widest uppercase pointer-events-none">
                Sesame Bun
              </div>
            </motion.div>

            {/* Layer 4: Signature Sauce */}
            <motion.div 
              style={{ y: sauceY, opacity: sauceOpacity, position: 'absolute', zIndex: 5, mixBlendMode: 'lighten' }}
              className="w-[340px] h-[340px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/story/signature_sauce.png" 
                alt="Signature Sauce" 
                fill 
                className="object-contain scale-95" 
                sizes="340px"
              />
              <div className="absolute left-[-20px] top-[40%] bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-[var(--color-brand)] font-bold tracking-widest uppercase pointer-events-none">
                House Sauce
              </div>
            </motion.div>

            {/* Layer 3: Melted Cheese */}
            <motion.div 
              style={{ y: cheeseY, opacity: cheeseOpacity, position: 'absolute', zIndex: 4, mixBlendMode: 'lighten' }}
              className="w-[340px] h-[340px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/story/melted_cheese.png" 
                alt="Melted Cheese" 
                fill 
                className="object-contain scale-[0.98]" 
                sizes="340px"
              />
              <div className="absolute right-[-10px] bottom-[35%] bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-[var(--color-brand)] font-bold tracking-widest uppercase pointer-events-none">
                Cheddar Cheese
              </div>
            </motion.div>

            {/* Layer 2: Beef Patty */}
            <motion.div 
              style={{ y: pattyY, opacity: pattyOpacity, position: 'absolute', zIndex: 3, mixBlendMode: 'lighten' }}
              className="w-[340px] h-[340px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
            >
              <Image 
                src="/story/beef_patty.png" 
                alt="Beef Patty" 
                fill 
                className="object-contain scale-[0.95]" 
                sizes="340px"
              />
              <div className="absolute left-[-20px] bottom-[20%] bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-[var(--color-brand)] font-bold tracking-widest uppercase pointer-events-none">
                Angus Patty
              </div>
            </motion.div>

            {/* Layer 5: Loaded Fries */}
            <motion.div 
              style={{ y: friesY, opacity: friesOpacity, position: 'absolute', zIndex: 2, mixBlendMode: 'lighten' }}
              className="w-[340px] h-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/story/loaded_fries.png" 
                alt="Loaded Fries" 
                fill 
                className="object-contain scale-90" 
                sizes="340px"
              />
              <div className="absolute right-[10%] bottom-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] text-[var(--color-brand)] font-bold tracking-widest uppercase pointer-events-none">
                Loaded Fries
              </div>
            </motion.div>

            {/* Flying fries elements (Explosion details) */}
            <motion.div style={{ x: fry1X, y: fry1Y, rotate: fry1Rotate, scale: fry1Scale, opacity: fry1Opacity, position: 'absolute', zIndex: 2, width: 80, height: 80, mixBlendMode: 'lighten' }}>
              <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="80px" />
            </motion.div>
            <motion.div style={{ x: fry2X, y: fry2Y, rotate: fry2Rotate, scale: fry2Scale, opacity: fry2Opacity, position: 'absolute', zIndex: 2, width: 90, height: 90, mixBlendMode: 'lighten' }}>
              <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="90px" />
            </motion.div>
            <motion.div style={{ x: fry3X, y: fry3Y, rotate: fry3Rotate, scale: fry3Scale, opacity: fry3Opacity, position: 'absolute', zIndex: 2, width: 75, height: 75, mixBlendMode: 'lighten' }}>
              <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="75px" />
            </motion.div>
            <motion.div style={{ x: fry4X, y: fry4Y, rotate: fry4Rotate, scale: fry4Scale, opacity: fry4Opacity, position: 'absolute', zIndex: 2, width: 85, height: 85, mixBlendMode: 'lighten' }}>
              <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="85px" />
            </motion.div>

            {/* Final Fully Assembled Burger Image */}
            <motion.div 
              style={{ opacity: assembledOpacity, scale: assembledScale, y: assembledY, position: 'absolute', zIndex: 10, mixBlendMode: 'lighten' }}
              className="w-[420px] h-[420px] drop-shadow-[0_30px_60px_rgba(245,196,0,0.25)]"
            >
              <Image 
                src="/story/assembled_burger.png" 
                alt="STACKD Burger Complete" 
                fill 
                className="object-contain" 
                sizes="420px"
              />
            </motion.div>

          </div>
        </div>

        {/* ── MOBILE LAYOUT (Under md) ────────────────────────────── */}
        <div className="flex md:hidden flex-col w-full h-full justify-between pb-8">
          
          {/* STICKY TOP CONTAINER (Burger Canvas) */}
          <div className="w-full h-[40vh] min-h-[280px] flex items-center justify-center relative bg-[var(--color-dark-secondary)] border-b border-white/5 overflow-hidden z-20">
            {/* Glow backing */}
            <motion.div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,196,0,0.15) 0%, transparent 70%)',
                opacity: glowOpacity,
                scale: glowScale,
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* Mobile Canvas Wrapper */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center scale-90">
              
              {/* Layer 1: Top Bun */}
              <motion.div 
                style={{ y: topBunYMob, opacity: topBunOpacity, position: 'absolute', zIndex: 6, mixBlendMode: 'lighten' }}
                className="w-[180px] h-[180px]"
              >
                <Image src="/story/top_bun.png" alt="Top Bun" fill className="object-contain" sizes="180px" priority />
              </motion.div>

              {/* Layer 4: Signature Sauce */}
              <motion.div 
                style={{ y: sauceYMob, opacity: sauceOpacity, position: 'absolute', zIndex: 5, mixBlendMode: 'lighten' }}
                className="w-[180px] h-[180px]"
              >
                <Image src="/story/signature_sauce.png" alt="Signature Sauce" fill className="object-contain scale-95" sizes="180px" />
              </motion.div>

              {/* Layer 3: Melted Cheese */}
              <motion.div 
                style={{ y: cheeseYMob, opacity: cheeseOpacity, position: 'absolute', zIndex: 4, mixBlendMode: 'lighten' }}
                className="w-[180px] h-[180px]"
              >
                <Image src="/story/melted_cheese.png" alt="Melted Cheese" fill className="object-contain scale-[0.98]" sizes="180px" />
              </motion.div>

              {/* Layer 2: Beef Patty */}
              <motion.div 
                style={{ y: pattyYMob, opacity: pattyOpacity, position: 'absolute', zIndex: 3, mixBlendMode: 'lighten' }}
                className="w-[180px] h-[180px]"
              >
                <Image src="/story/beef_patty.png" alt="Beef Patty" fill className="object-contain scale-[0.95]" sizes="180px" />
              </motion.div>

              {/* Layer 5: Loaded Fries */}
              <motion.div 
                style={{ y: friesYMob, opacity: friesOpacity, position: 'absolute', zIndex: 2, mixBlendMode: 'lighten' }}
                className="w-[180px] h-[180px]"
              >
                <Image src="/story/loaded_fries.png" alt="Loaded Fries" fill className="object-contain scale-90" sizes="180px" />
              </motion.div>

              {/* Mobile flying fries */}
              <motion.div style={{ x: fry1XMob, y: fry1YMob, scale: fry1Scale, opacity: fry1Opacity, position: 'absolute', zIndex: 2, width: 40, height: 40, mixBlendMode: 'lighten' }}>
                <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="40px" />
              </motion.div>
              <motion.div style={{ x: fry2XMob, y: fry2YMob, scale: fry2Scale, opacity: fry2Opacity, position: 'absolute', zIndex: 2, width: 45, height: 45, mixBlendMode: 'lighten' }}>
                <Image src="/story/loaded_fries.png" alt="Exploding Fry" fill className="object-contain" sizes="45px" />
              </motion.div>

              {/* Final Assembled Burger */}
              <motion.div 
                style={{ opacity: assembledOpacity, scale: assembledScale, y: assembledY, position: 'absolute', zIndex: 10, mixBlendMode: 'lighten' }}
                className="w-[230px] h-[230px] drop-shadow-[0_20px_40px_rgba(245,196,0,0.2)]"
              >
                <Image src="/story/assembled_burger.png" alt="STACKD Burger Complete" fill className="object-contain" sizes="230px" />
              </motion.div>

            </div>
          </div>

          {/* SCROLLING BOTTOM CONTAINER (Text Cards) */}
          <div className="w-full h-[50vh] overflow-y-auto px-6 relative z-10 flex items-center justify-center">
            <div className="relative w-full max-w-md h-[220px] flex items-center">
              {LAYERS.map((layer, index) => {
                const isActive = activeIndex === index
                
                return (
                  <motion.div
                    key={layer.id}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : { opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-brand)] mb-1">
                      {layer.tagline}
                    </span>
                    <h2 
                      className="text-white text-2xl font-black leading-snug mb-3 tracking-tight"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {layer.headline}
                    </h2>
                    <p className="text-[rgba(255,255,255,0.6)] text-sm font-light leading-relaxed mb-4">
                      {layer.desc}
                    </p>

                    {index === 5 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <a 
                          href="#menu" 
                          className="inline-flex items-center justify-center w-full px-6 py-3 bg-[var(--color-brand)] text-black font-extrabold text-sm rounded-full transition-all duration-300 active:scale-95"
                        >
                          Build Your Stack
                        </a>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
