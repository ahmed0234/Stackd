"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";

interface StackData {
  id: "og" | "fire" | "melt" | "smoke";
  name: string;
  sloganPre: string;
  sloganHighlight: string;
  sloganPost: string;
  subtitle: string;
  burgerImage: string;
  sideImage: string;
  color: string;
  glowColor: string;
  glowStrong: string;
  shadowGlow: string;
}

const STACKS: Record<string, StackData> = {
  og: {
    id: "og",
    name: "OG Stack",
    sloganPre: "Every Layer Hits ",
    sloganHighlight: "Different.",
    sloganPost: "",
    subtitle:
      "Our signature masterwork. Dual custom-blend smashed patties, caramelized edges, melted cheddar, and secret Stack Sauce on toasted artisan brioche.",
    burgerImage: "/Stacks/Og stack.png",
    sideImage: "/Fries/Classic loaded.png",
    color: "#F5C400",
    glowColor: "rgba(245, 196, 0, 0.12)",
    glowStrong: "rgba(245, 196, 0, 0.35)",
    shadowGlow: "0 0 50px rgba(245, 196, 0, 0.22)",
  },
  fire: {
    id: "fire",
    name: "Fire Stack",
    sloganPre: "Ignite Your Ultimate ",
    sloganHighlight: "Craving.",
    sloganPost: "",
    subtitle:
      "Crafted for culinary thrill-seekers. Dual custom-blend smashed patties, melted pepper jack, fire-charred jalapeños, and our legendary signature fire nectar.",
    burgerImage: "/Stacks/Fire stack.png",
    sideImage: "/Fries/Fire loaded.png",
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.12)",
    glowStrong: "rgba(239, 68, 68, 0.35)",
    shadowGlow: "0 0 50px rgba(239, 68, 68, 0.22)",
  },
  melt: {
    id: "melt",
    name: "Melt Stack",
    sloganPre: "Drowned in Liquid ",
    sloganHighlight: "Luxury.",
    sloganPost: "",
    subtitle:
      "A decadent gold standard. Dual hand-pressed patties blanketed in premium hot melted cheddar cheese sauce, sweet caramelized onions, and signature Stack Spread.",
    burgerImage: "/Stacks/Melt stack.png",
    sideImage: "/Fries/Full stackd fries.png",
    color: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.12)",
    glowStrong: "rgba(249, 115, 22, 0.35)",
    shadowGlow: "0 0 50px rgba(249, 115, 22, 0.22)",
  },
  smoke: {
    id: "smoke",
    name: "Smoke Stack",
    sloganPre: "Pure. Bold. ",
    sloganHighlight: "Uncompromising.",
    sloganPost: "",
    subtitle:
      "The peak of smoky luxury. Dual flame-seared patties stacked with thick hardwood smoked bacon, crispy golden onion rings, sharp cheddar, and rich sweet hickory BBQ glaze.",
    burgerImage: "/Stacks/Smoke stack.png",
    sideImage: "/Fries/Smoke loaded.png",
    color: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.12)",
    glowStrong: "rgba(217, 119, 6, 0.35)",
    shadowGlow: "0 0 50px rgba(217, 119, 6, 0.22)",
  },
};

export default function Hero() {
  const [activeStack, setActiveStack] = useState<
    "og" | "fire" | "melt" | "smoke"
  >("og");
  const activeData = STACKS[activeStack];

  // Mouse tilt tracking (Parallax)
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth parallax movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transforms for the burger 3D tilt
  const burgerRotateX = useTransform(springY, [-300, 300], [12, -12]);
  const burgerRotateY = useTransform(springX, [-300, 300], [-12, 12]);
  const burgerTranslateX = useTransform(springX, [-300, 300], [-15, 15]);
  const burgerTranslateY = useTransform(springY, [-300, 300], [-15, 15]);

  // Transforms for background depth items (floats in opposite direction or exaggerated)
  const sideRotate = useTransform(springX, [-300, 300], [-20, 20]);
  const sideTranslateX = useTransform(springX, [-300, 300], [25, -25]);
  const sideTranslateY = useTransform(springY, [-300, 300], [25, -25]);

  // Transforms for the left ambient glow blob (subtle opposite direction shifting)
  const leftBlobTranslateX = useTransform(springX, [-300, 300], [20, -20]);
  const leftBlobTranslateY = useTransform(springY, [-300, 300], [20, -20]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      const px = e.clientX - centerX;
      const py = e.clientY - centerY;
      mouseX.set(px);
      mouseY.set(py);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Magnetic primary button ref
  const primaryButtonRef = useRef<HTMLAnchorElement>(null);
  const btnMouseX = useMotionValue(0);
  const btnMouseY = useMotionValue(0);
  const btnSpringX = useSpring(btnMouseX, { stiffness: 220, damping: 18 });
  const btnSpringY = useSpring(btnMouseY, { stiffness: 220, damping: 18 });
  const [btnHovered, setBtnHovered] = useState(false);

  const handleBtnMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = primaryButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      btnMouseX.set(dx * 0.3);
      btnMouseY.set(dy * 0.3);
    },
    [btnMouseX, btnMouseY],
  );

  const handleBtnMouseLeave = useCallback(() => {
    btnMouseX.set(0);
    btnMouseY.set(0);
    setBtnHovered(false);
  }, [btnMouseX, btnMouseY]);

  const handleStartOrder = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-20"
      style={{
        background:
          "radial-gradient(circle at 80% 50%, var(--color-dark-secondary) 0%, var(--color-dark-primary) 70%)",
      }}
      aria-label="Welcome to STACKD"
    >
      {/* Prefetching container for instantaneous toggles */}
      <div
        className="absolute width-0 height-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {Object.values(STACKS).map((stack) => (
          <div key={stack.id}>
            <Image
              src={stack.burgerImage}
              alt=""
              width={100}
              height={100}
              priority
            />
            <Image
              src={stack.sideImage}
              alt=""
              width={100}
              height={100}
              priority
            />
          </div>
        ))}
      </div>

      {/* Ambient background grid and grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
        style={{
          backgroundImage: `
            radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)
          `,
          backgroundSize: "24px 24px, 48px 48px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay select-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Big Faded STACKD Wordmark in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[15vw] font-black text-white/[0.015] tracking-wider leading-none select-none uppercase font-poppins"
        >
          STACKD
        </motion.span>
      </div>

      {/* Left Ambient Glow Blob (Behind Text Column) */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${activeData.glowStrong} 0%, transparent 65%)`,
          scale: [1, 1.1, 0.95, 1],
        }}
        style={{
          x: leftBlobTranslateX,
          y: leftBlobTranslateY,
        }}
        transition={{
          background: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full blur-[100px] pointer-events-none left-[-15%] top-[10%] md:left-[-10%] md:top-[8%] lg:left-[-5%] lg:top-[5%] z-0 select-none opacity-80 md:opacity-90"
      />

      {/* Dynamic Ambient Glow Blob */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${activeData.glowColor} 0%, transparent 60%)`,
          scale: [1, 1.08, 1],
        }}
        transition={{
          background: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[60px] pointer-events-none right-[-10%] top-[10%] lg:right-[5%] lg:top-[15%] z-0"
      />

      {/* Layout Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Content & Branding */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Dynamic Slogan Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md mb-6"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: activeData.color }}
              />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-white/60 font-poppins">
                Where Cravings Get STACKD
              </span>
            </motion.div>

            {/* Massive Bold Headline */}
            <div className="relative min-h-[120px] md:min-h-[150px] lg:min-h-[190px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeStack}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight uppercase text-white"
                >
                  {activeData.sloganPre}
                  <span
                    className="transition-colors duration-500"
                    style={{
                      color: activeData.color,
                      textShadow: `0 0 35px ${activeData.glowStrong}`,
                    }}
                  >
                    {activeData.sloganHighlight}
                  </span>
                  {activeData.sloganPost}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Supporting Text */}
            <div className="relative min-h-[72px] sm:min-h-[56px] mt-4 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStack}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/70 text-base sm:text-lg md:text-xl font-sans leading-relaxed"
                >
                  {activeData.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Call to Actions (CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA (Magnetic, Shimmering) */}
              <motion.a
                ref={primaryButtonRef}
                href="#menu"
                onClick={handleStartOrder}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-2xl font-poppins font-extrabold text-sm uppercase tracking-wide text-[#0a0a0a] select-none overflow-hidden transition-all duration-300"
                style={{
                  x: btnSpringX,
                  y: btnSpringY,
                  backgroundColor: activeData.color,
                  boxShadow: btnHovered
                    ? `0 0 0 2px ${activeData.color}55, 0 12px 32px -4px ${activeData.color}45`
                    : `0 4px 16px -2px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Shiny sweep effect */}
                <motion.div
                  initial={{ x: "-120%", skewX: -20 }}
                  animate={btnHovered ? { x: "240%" } : { x: "-120%" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 w-[60%] h-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.48) 50%, transparent 100%)",
                  }}
                />

                <span>Start Your Order</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: btnHovered ? "translateX(4px)" : "none" }}
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="/build"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-auto rounded-2xl font-poppins font-bold text-sm uppercase tracking-wide text-white border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300 overflow-hidden group"
              >
                {/* Subtle border trail effect */}
                <span
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    padding: 1,
                    background: `linear-gradient(135deg, ${activeData.color} 0%, transparent 50%, ${activeData.color} 100%)`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-[-2px]"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Build Your Own Stack</span>
              </motion.a>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-12 w-full pt-8 border-t border-white/[0.06] flex flex-wrap gap-y-6 gap-x-8 items-center justify-center lg:justify-start"
            >
              {/* Trust Signal 1: Crafted Layer By Layer */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-brand group-hover:border-brand/30 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3L4 9v11a1 1 0 001 1h14a1 1 0 001-1V9l-8-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left font-sans">
                  <div className="text-xs font-bold text-white leading-tight">
                    Crafted Layer By Layer
                  </div>
                  <div className="text-[10px] text-white/50">
                    Signature STACKD Recipe
                  </div>
                </div>
              </div>

              {/* Trust Signal 2: Service */}
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-brand group-hover:border-brand/30 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left font-sans">
                  <div className="text-xs font-bold text-white leading-tight">
                    Served Hot & Fresh
                  </div>
                  <div className="text-[10px] text-white/50">
                    Express stack delivery
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Interactive Burger Showcase Window */}
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] flex items-center justify-center z-10">
              {/* Parallax elements */}
              <motion.div
                style={{
                  rotateX: burgerRotateX,
                  rotateY: burgerRotateY,
                  x: burgerTranslateX,
                  y: burgerTranslateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                {/* Secondary side item: Deep-of-field blurred floating Fries */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`side-${activeStack}`}
                    style={{
                      rotate: sideRotate,
                      x: sideTranslateX,
                      y: sideTranslateY,
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: 0.45,
                      scale: 0.75,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                    }}
                    className="absolute left-[-15%] bottom-[5%] w-[160px] h-[160px] pointer-events-none select-none blur-[2px] z-0"
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeData.sideImage}
                        alt="Tasty Side Item"
                        fill
                        sizes="160px"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Main Burger Stack */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`burger-${activeStack}`}
                    initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.45, rotate: 20 }}
                    transition={{
                      opacity: { duration: 0.45 },
                      scale: { type: "spring", stiffness: 100, damping: 15 },
                      rotate: { type: "spring", stiffness: 100, damping: 18 },
                    }}
                    className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] filter drop-shadow-[0_24px_50px_rgba(0,0,0,0.65)] select-none z-10"
                    style={{
                      transform: "translateZ(50px)",
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -16, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-full h-full"
                    >
                      {/* Shadow underneath */}
                      <div
                        className="absolute bottom-[-15px] left-[10%] right-[10%] h-[30px] rounded-full blur-[25px] opacity-[0.4] mix-blend-multiply transition-colors duration-500"
                        style={{
                          background: activeData.color,
                        }}
                      />
                      <Image
                        src={activeData.burgerImage}
                        alt={activeData.name}
                        fill
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 420px"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Splash light/spark decoration */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-color-dodge transition-colors duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${activeData.color}44 0%, transparent 60%)`,
                  }}
                />
              </motion.div>
            </div>

            {/* Stack Selection Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 relative flex items-center justify-center max-w-full p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl z-20"
              style={{
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                {(
                  Object.keys(STACKS) as Array<"og" | "fire" | "melt" | "smoke">
                ).map((key) => {
                  const item = STACKS[key];
                  const isActive = activeStack === key;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveStack(key)}
                      className="relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 text-xs font-poppins font-extrabold uppercase tracking-wider text-white select-none transition-all duration-300"
                      style={{
                        color: isActive ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {/* Active Background Slide */}
                      {isActive && (
                        <motion.div
                          layoutId="activeBg"
                          className="absolute inset-0 rounded-xl z-0"
                          style={{
                            background: item.color,
                            boxShadow: `0 4px 16px ${item.glowStrong}`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      )}

                      {/* Stack mini image */}
                      <span className="relative w-6 h-6 z-10 flex-shrink-0">
                        <Image
                          src={item.burgerImage}
                          alt={item.name}
                          fill
                          sizes="24px"
                          style={{ objectFit: "contain" }}
                        />
                      </span>

                      <span className="relative z-10 hidden sm:inline">
                        {item.name}
                      </span>
                      <span className="relative z-10 inline sm:hidden">
                        {item.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 hidden lg:block">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Scroll to Explore
          </span>
          <div className="w-[18px] h-[30px] rounded-full border border-white/20 flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
