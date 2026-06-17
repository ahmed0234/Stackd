'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react'

/* ═══════════════════════════════════════════════════════════════
   Content Definitions
   ═══════════════════════════════════════════════════════════════ */

const CARDS = [
  {
    id: '01',
    title: 'Premium Ingredients',
    subtitle: 'Sourced for Excellence',
    desc: 'We don’t compromise. Every ingredient is hand-selected from top suppliers, ensuring peak freshness, texture, and flavor in every bite.',
    // A subtle SVG visual for the card background
    visual: (
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" className="opacity-40">
        <circle cx="200" cy="200" r="120" stroke="rgba(245,196,0,0.1)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="80" stroke="rgba(245,196,0,0.15)" strokeWidth="1" />
        <path d="M200 80 L200 320 M80 200 L320 200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <motion.circle 
          cx="200" cy="80" r="4" fill="var(--color-brand)" 
          animate={{ cy: [80, 320, 80], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    )
  },
  {
    id: '02',
    title: 'Built Fresh',
    subtitle: 'Made to Order',
    desc: 'No heat lamps. No microwaves. Your stack is built the moment you order it, searing the flavor in on our high-temp smash grills.',
    visual: (
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" className="opacity-40">
        <path d="M100 250 Q 200 150 300 250" stroke="rgba(245,196,0,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 270 Q 200 190 280 270" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M140 290 Q 200 230 260 290" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <motion.path 
          d="M100 250 Q 200 150 300 250" 
          stroke="var(--color-brand)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="100 300"
          animate={{ strokeDashoffset: [400, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Loaded Without Limits',
    subtitle: 'Maximum Flavor',
    desc: 'Generous portions, dripping sauces, and perfectly melted cheese. We build stacks that defy gravity and demand two hands.',
    visual: (
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" className="opacity-40">
        <rect x="150" y="100" width="100" height="20" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="130" y="140" width="140" height="15" rx="4" fill="rgba(245,196,0,0.1)" />
        <rect x="140" y="175" width="120" height="40" rx="8" fill="rgba(255,255,255,0.03)" />
        <rect x="130" y="235" width="140" height="15" rx="4" fill="rgba(245,196,0,0.1)" />
        <rect x="150" y="270" width="100" height="20" rx="4" fill="rgba(255,255,255,0.05)" />
        <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="135" y="190" width="130" height="10" rx="2" fill="var(--color-brand)" opacity="0.5" />
        </motion.g>
      </svg>
    )
  },
  {
    id: '04',
    title: 'Engineered For Cravings',
    subtitle: 'Perfectly Balanced',
    desc: 'The perfect ratio of bun to meat, the right crunch of fresh lettuce, the exact tang of our signature sauce. It’s science, but delicious.',
    visual: (
      <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" className="opacity-40">
        <polygon points="200,100 300,150 300,250 200,300 100,250 100,150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
        <polygon points="200,120 280,165 280,235 200,280 120,235 120,165" stroke="rgba(245,196,0,0.15)" strokeWidth="1" fill="none" />
        <motion.polygon 
          points="200,140 260,175 260,225 200,260 140,225 140,175" 
          stroke="var(--color-brand)" 
          strokeWidth="1" 
          fill="rgba(245,196,0,0.02)" 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>
    )
  }
]

/* ═══════════════════════════════════════════════════════════════
   Card Component
   ═══════════════════════════════════════════════════════════════ */

function ValueCard({ card, index }: { card: typeof CARDS[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" })
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for the card content
  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -50])
  const springY = useSpring(yOffset, { stiffness: 50, damping: 15 })

  // Staggered animation delays based on index (though they appear mostly sequentially on scroll)
  const delay = 0.1

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-6xl mx-auto mb-32 md:mb-48 group"
    >
      {/* Connector Line (except for the last item) */}
      {index !== CARDS.length - 1 && (
        <motion.div 
          className="absolute left-6 md:left-[140px] top-[100%] w-px h-32 md:h-48 bg-gradient-to-b from-[rgba(245,196,0,0.2)] to-transparent origin-top hidden md:block"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
      )}

      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16">
        
        {/* Large Number / Identity Area */}
        <div className="w-full md:w-1/3 flex flex-col md:items-end justify-start pt-4 relative z-10 pl-6 md:pl-0">
          <motion.div 
            style={{ y: springY }}
            className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.05)]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {card.id}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            className="text-[var(--color-brand)] font-medium tracking-[0.2em] uppercase text-sm mt-[-20px] md:mt-[-40px] md:mr-4 z-20"
          >
            {card.subtitle}
          </motion.div>
        </div>

        {/* Visual / Abstract Area */}
        <div className="w-full md:w-2/3 relative rounded-[32px] overflow-hidden bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl p-8 md:p-16 min-h-[300px] md:min-h-[400px] flex flex-col justify-center transition-colors duration-500 group-hover:bg-[rgba(255,255,255,0.025)] group-hover:border-[rgba(245,196,0,0.15)]">
          
          {/* Subtle Glow on Hover */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* SVG Visual Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
             {card.visual}
          </div>

          <div className="relative z-10 max-w-lg">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.4 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              {card.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.5 }}
              className="text-lg md:text-xl text-[rgba(255,255,255,0.6)] leading-relaxed"
            >
              {card.desc}
            </motion.p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Philosophy Section — Main Component
   ═══════════════════════════════════════════════════════════════ */

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 px-4 md:px-8 overflow-hidden"
      style={{
        background: 'var(--color-dark-primary)'
      }}
    >
      {/* ── Background Continuity ────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(245,196,0,0.03) 0%, transparent 60%),
            radial-gradient(circle at 10% 40%, rgba(245,196,0,0.015) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(245,196,0,0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />
      
      {/* Noise Texture Continuity */}
       <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.025,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="philosophy-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#philosophy-noise)" />
      </svg>

      {/* ── Section Header ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto mb-24 md:mb-40 pl-6 md:pl-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 
            className="text-[clamp(32px,5vw,64px)] font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Built <span className="text-[var(--color-brand)]">Different.</span>
          </h2>
          <p className="text-xl text-[rgba(255,255,255,0.5)] max-w-2xl font-light">
            We tore down the standard fast-food playbook to build something better. Here is how we engineer the perfect stack.
          </p>
        </motion.div>
      </div>

      {/* ── Cards List ────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {CARDS.map((card, index) => (
          <ValueCard key={card.id} card={card} index={index} />
        ))}
      </div>
      
    </section>
  )
}
