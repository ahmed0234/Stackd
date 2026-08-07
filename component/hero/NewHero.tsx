"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import { PRODUCTS, Product } from "@/component/menu/MenuSection";
import { usePremadeStackAddToCart } from "@/hooks/usePremadeStackAddToCart";
import { getProductListPrice } from "@/component/stacks/stackPricing";
import {
  formatByoPrice,
  formatByoStackPriceFrom,
  getByoWrapPrice,
} from "@/component/build/buildYourOwnPricing";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function NewHero() {
  // Navigation states for Trending Swiper
  const [trendingSwiper, setTrendingSwiper] = useState<SwiperClass | null>(null);
  const [isTrendingBeginning, setIsTrendingBeginning] = useState(true);
  const [isTrendingEnd, setIsTrendingEnd] = useState(false);

  // Navigation states for Featured Swiper
  const [featuredSwiper, setFeaturedSwiper] = useState<SwiperClass | null>(null);
  const [isFeaturedBeginning, setIsFeaturedBeginning] = useState(true);
  const [isFeaturedEnd, setIsFeaturedEnd] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { requestAddToCart, sizeModal } = usePremadeStackAddToCart(
    (product, size) => {
      const suffix = size ? ` (${size})` : "";
      setToastMessage(`✓ Added ${product.name}${suffix} to cart!`);
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    },
  );

  const handleAddToCart = (product: Product) => {
    requestAddToCart(product);
  };

  const signatureStacks = PRODUCTS.filter((p) => p.category === "stacks");
  const trendingProducts = signatureStacks.slice(0, 5);

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* ─── 1. MAIN HERO DISPLAY AREA ────────────────────────────────────── */}
      <div className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Full-Bleed Main Hero Background Image with Responsive Mobile Fire Focus */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="/herobackground.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[75%_center] sm:object-[65%_center] md:object-center scale-105 filter brightness-105 contrast-110 transition-all duration-700"
            sizes="100vw"
          />

          {/* Expanded Fiery Ambient Glow spreading fire across hero section */}
          <div className="absolute top-1/4 right-0 sm:right-1/6 w-[650px] sm:w-[950px] h-[550px] sm:h-[800px] bg-[radial-gradient(circle,rgba(245,196,0,0.25)_0%,rgba(239,68,68,0.2)_35%,rgba(249,115,22,0.12)_60%,transparent_80%)] rounded-full blur-[100px] pointer-events-none z-10 animate-pulse" style={{ animationDuration: "6s" }} />

          {/* Floating Ember Sparks Layer 1 */}
          <motion.div
            animate={{ y: [-15, 15, -15], opacity: [0.3, 0.9, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-12 left-1/4 w-3 h-3 rounded-full bg-brand blur-[1px] shadow-[0_0_15px_#F5C400] pointer-events-none z-10"
          />
          {/* Floating Ember Sparks Layer 2 */}
          <motion.div
            animate={{ y: [15, -15, 15], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-orange-500 blur-[1px] shadow-[0_0_12px_#F97316] pointer-events-none z-10"
          />
          {/* Floating Ember Sparks Layer 3 */}
          <motion.div
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.7, 0.2] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-yellow-400 blur-[1px] shadow-[0_0_10px_#FACC15] pointer-events-none z-10"
          />

          {/* Balanced Atmospheric Gradients allowing flames to shine through while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/65 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 z-10 pointer-events-none" />
        </div>

        {/* Hero Main Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-10 lg:gap-14">
          {/* Top Hero Split Grid: Left Text & Right Prominent Hero Burger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Side: Headline, Buttons & Moved Feature Badges */}
            <div className="lg:col-span-6 flex flex-col text-left items-start z-30">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-5"
              >
                <span className="text-xs">🔥</span>
                <span className="text-[10px] sm:text-xs font-poppins font-black uppercase tracking-widest text-brand">
                  HOT & FRESH STACKS
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col"
              >
                <h1 className="font-poppins font-black text-5xl sm:text-7xl lg:text-[76px] xl:text-[88px] uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                  CRAVE IT.
                </h1>
                <h1 className="font-poppins font-black text-5xl sm:text-7xl lg:text-[76px] xl:text-[88px] uppercase tracking-tighter leading-[0.9] text-brand drop-shadow-[0_10px_35px_rgba(245,196,0,0.35)] mt-1">
                  STACK IT.
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm sm:text-base lg:text-lg text-white/75 font-sans mt-5 max-w-lg leading-relaxed"
              >
                Premium ingredients. Signature flavors.{" "}
                <span className="text-brand font-black underline decoration-brand/40 decoration-2 underline-offset-4">
                  Made fresh
                </span>
                , stacked high, and served hot.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center gap-4 mt-7"
              >
                <Link
                  href="#menu"
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-brand text-[#0a0a0a] font-poppins font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 shadow-[0_4px_25px_rgba(245,196,0,0.4)] hover:shadow-[0_6px_35px_rgba(245,196,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer no-underline"
                >
                  <span>ORDER NOW</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="#menu"
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.15] hover:border-brand/60 text-white hover:text-brand font-poppins font-bold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer no-underline"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 8h10" />
                    <path d="M7 12h10" />
                    <path d="M7 16h10" />
                  </svg>
                  <span>VIEW MENU</span>
                </Link>
              </motion.div>

              {/* ── FEATURE BADGES (MOVED BACK TO HERO MAIN CONTENT) ────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-9 w-full max-w-xl p-4 rounded-2xl sm:rounded-3xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-xl grid grid-cols-3 gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              >
                {/* Feature 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                    <span className="text-base">⚡</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs font-poppins font-black uppercase text-white tracking-wider leading-tight">
                      FRESHLY MADE
                    </span>
                    <span className="text-[9px] text-white/50 font-sans">
                      To Order
                    </span>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2.5 border-l border-white/[0.06] pl-2.5 sm:pl-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                    <span className="text-base">🛵</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs font-poppins font-black uppercase text-white tracking-wider leading-tight">
                      FAST DELIVERY
                    </span>
                    <span className="text-[9px] text-white/50 font-sans">
                      30–40 Mins
                    </span>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2.5 border-l border-white/[0.06] pl-2.5 sm:pl-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                    <span className="text-base">🛡️</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs font-poppins font-black uppercase text-white tracking-wider leading-tight">
                      PREMIUM QUALITY
                    </span>
                    <span className="text-[9px] text-white/50 font-sans">
                      Always Best
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Featured Melt Stack Hero Product */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center z-20 py-4 lg:py-0">
              {/* Backlight Ambient Warm Glow */}
              <div className="absolute w-[350px] sm:w-[500px] lg:w-[560px] h-[350px] sm:h-[500px] lg:h-[560px] bg-[radial-gradient(circle,rgba(245,196,0,0.25)_0%,rgba(249,115,22,0.15)_45%,transparent_70%)] rounded-full blur-[70px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }} />

              {/* Floating Warm Ember Sparks */}
              <motion.div
                animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 right-10 w-2.5 h-2.5 rounded-full bg-brand blur-[1px] shadow-[0_0_12px_#F5C400] pointer-events-none z-10"
              />

              {/* Handwritten Style Annotation Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-0 right-12 sm:right-20 z-30 hidden sm:flex items-center gap-2 pointer-events-none"
              >
                <span className="font-sans font-bold text-white/90 text-sm tracking-wider italic rotate-[-6deg] drop-shadow-md">
                  Melt Stack
                </span>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F5C400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-[45deg]">
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </motion.div>

              {/* Golden Bestseller Round Seal Badge */}
              <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 12, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute top-4 sm:top-2 right-2 sm:right-4 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-brand/80 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(245,196,0,0.35)] pointer-events-none"
              >
                <span className="text-brand text-[10px] sm:text-xs">👑</span>
                <span className="font-poppins font-black text-[9px] sm:text-[10px] uppercase text-white tracking-widest leading-none mt-0.5">
                  BEST
                </span>
                <span className="font-poppins font-black text-[9px] sm:text-[10px] uppercase text-brand tracking-widest leading-none">
                  SELLER
                </span>
              </motion.div>

              {/* Melt Stack Burger Image Frame */}
              <div className="relative w-full max-w-[480px] sm:max-w-[580px] lg:max-w-[650px] aspect-[16/11] flex items-center justify-center z-10 group">
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/95 blur-2xl rounded-[100%] z-0 pointer-events-none" />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "spring", damping: 22 }}
                  className="relative w-full h-full z-10 transition-transform duration-500 hover:scale-105"
                >
                  <Image
                    src="/Stacks/Melt.webp"
                    alt="Signature Melt Stack Burger"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 750px"
                    className="object-contain filter brightness-105 contrast-105 drop-shadow-[0_25px_45px_rgba(0,0,0,0.88)]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── SEAMLESS INTEGRATED HERO EXTENSION SECTION ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full rounded-[32px] bg-gradient-to-r from-[#141414]/95 via-[#181818]/90 to-[#141414]/95 border border-white/[0.1] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch relative overflow-hidden"
          >
            {/* Top Border Accent Glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent pointer-events-none" />

            {/* ── LEFT COLUMN: 2 LARGE PREMIUM "BUILD YOUR OWN" CARDS ──────── */}
            <div className="xl:col-span-6 flex flex-col gap-4 border-b xl:border-b-0 xl:border-r border-white/[0.08] pb-6 xl:pb-0 xl:pr-8 relative z-10 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">✨</span>
                <span className="font-poppins font-black text-xs uppercase tracking-widest text-brand">
                  CUSTOM CRAFTED MEALS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {/* 1. BUILD YOUR OWN STACK CARD */}
                <Link
                  href="/build"
                  className="group relative flex flex-col justify-between rounded-[24px] bg-gradient-to-b from-[#1c1a14] via-[#161512] to-[#111111] border-2 border-brand/35 hover:border-brand p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(245,196,0,0.22)] text-left no-underline overflow-hidden"
                >
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-brand text-[#0a0a0a] shadow-md">
                      CUSTOM STACK
                    </span>
                  </div>

                  {/* Large Product Image */}
                  <div className="relative w-full h-36 sm:h-40 my-2 flex items-center justify-center">
                    <div className="absolute w-28 h-28 bg-brand/15 rounded-full blur-2xl pointer-events-none" />
                    <Image
                      src="/Stacks/Og.webp"
                      alt="Build Your Own Stack"
                      fill
                      sizes="220px"
                      className="object-contain group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>

                  {/* Text Details & CTA */}
                  <div className="flex flex-col mt-2">
                    <h3 className="font-poppins font-black text-base sm:text-lg text-white uppercase tracking-wide group-hover:text-brand transition-colors">
                      BUILD YOUR STACK
                    </h3>
                    <p className="text-xs text-white/50 font-sans line-clamp-2 mt-1 leading-relaxed">
                      Custom Angus beef, brioche bun, melty cheeses & drizzles.
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-poppins font-black text-sm text-brand">
                        {formatByoStackPriceFrom()}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-brand text-[#0a0a0a] font-poppins font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md group-hover:scale-105 transition-transform">
                        <span>BUILD NOW</span>
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>

                {/* 2. BUILD YOUR OWN WRAP CARD */}
                <Link
                  href="/build-wrap"
                  className="group relative flex flex-col justify-between rounded-[24px] bg-gradient-to-b from-[#1c1a14] via-[#161512] to-[#111111] border-2 border-brand/35 hover:border-brand p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(245,196,0,0.22)] text-left no-underline overflow-hidden"
                >
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-brand text-[#0a0a0a] shadow-md">
                      CUSTOM WRAP
                    </span>
                  </div>

                  {/* Large Product Image */}
                  <div className="relative w-full h-36 sm:h-40 my-2 flex items-center justify-center">
                    <div className="absolute w-28 h-28 bg-brand/15 rounded-full blur-2xl pointer-events-none" />
                    <Image
                      src="/Wraps/buildyourownwrap.webp"
                      alt="Build Your Own Wrap"
                      fill
                      sizes="220px"
                      className="object-contain group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>

                  {/* Text Details & CTA */}
                  <div className="flex flex-col mt-2">
                    <h3 className="font-poppins font-black text-base sm:text-lg text-white uppercase tracking-wide group-hover:text-brand transition-colors">
                      BUILD YOUR WRAP
                    </h3>
                    <p className="text-xs text-white/50 font-sans line-clamp-2 mt-1 leading-relaxed">
                      Warm tortilla loaded with tender chicken, cheeses & sauces.
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-poppins font-black text-sm text-brand">
                        {formatByoPrice(getByoWrapPrice())}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-brand text-[#0a0a0a] font-poppins font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md group-hover:scale-105 transition-transform">
                        <span>BUILD NOW</span>
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN: LARGER "TRENDING RIGHT NOW" CAROUSEL ────────── */}
            <div className="xl:col-span-6 flex flex-col justify-between gap-4 min-w-0">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand text-[#0a0a0a] font-poppins font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(245,196,0,0.3)]">
                  <span>Our Stacks</span>
                  <span className="text-sm">&rarr;</span>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => trendingSwiper?.slidePrev()}
                    disabled={isTrendingBeginning}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all backdrop-blur-md cursor-pointer select-none ${
                      isTrendingBeginning
                        ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-30"
                        : "border-white/10 text-white bg-white/[0.04] hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-md"
                    }`}
                    title="Previous Trending"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => trendingSwiper?.slideNext()}
                    disabled={isTrendingEnd}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all backdrop-blur-md cursor-pointer select-none ${
                      isTrendingEnd
                        ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-30"
                        : "border-white/10 text-white bg-white/[0.04] hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-md"
                    }`}
                    title="Next Trending"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Significantly Larger Trending Cards Swiper - Contained within Right Column */}
              <div className="relative w-full overflow-hidden rounded-[20px] p-1 -m-1">
                <Swiper
                  modules={[Navigation]}
                  onSwiper={(swiper) => {
                    setTrendingSwiper(swiper);
                    setIsTrendingBeginning(swiper.isBeginning);
                    setIsTrendingEnd(swiper.isEnd);
                  }}
                  onSlideChange={(swiper) => {
                    setIsTrendingBeginning(swiper.isBeginning);
                    setIsTrendingEnd(swiper.isEnd);
                  }}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  grabCursor={true}
                  breakpoints={{
                    640: { slidesPerView: 1.8, spaceBetween: 16 },
                    1024: { slidesPerView: 2.1, spaceBetween: 18 },
                  }}
                  className="w-full"
                >
                  {trendingProducts.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                      <div className="p-4 sm:p-5 rounded-[24px] bg-[#121212] border border-white/[0.09] hover:border-brand/50 backdrop-blur-xl flex flex-col justify-between gap-4 transition-all duration-300 hover:scale-[1.02] shadow-2xl group text-left h-full min-h-[240px]">
                        {/* Top Info Header */}
                        <div className="flex items-center justify-between">
                          <span className="font-poppins font-black text-sm sm:text-base text-white uppercase tracking-wide truncate">
                            {product.name}
                          </span>
                          <span className="text-xs font-sans font-bold text-brand">
                            ⭐ 4.9
                          </span>
                        </div>

                        {/* Significantly Larger Product Food Image */}
                        <div className="relative w-full h-32 sm:h-36 flex items-center justify-center my-1">
                          <div
                            className="absolute w-24 h-24 rounded-full blur-xl pointer-events-none opacity-15"
                            style={{ backgroundColor: product.accentColor }}
                          />
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="200px"
                            className="object-contain group-hover:scale-108 transition-transform duration-300"
                          />
                        </div>

                        {/* Price & Add Action Row */}
                        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-poppins font-bold uppercase text-white/40 block">
                              Price
                            </span>
                            <span className="font-poppins font-black text-base sm:text-lg text-white">
                              {(() => {
                                const { amount, showFromPrefix } =
                                  getProductListPrice(product);
                                return showFromPrefix
                                  ? `From Rs ${amount.toLocaleString()}`
                                  : `Rs ${amount.toLocaleString()}`;
                              })()}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-10 h-10 rounded-full bg-brand hover:bg-brand-dim text-[#0a0a0a] font-black text-lg flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(245,196,0,0.25)] hover:scale-110 active:scale-90 cursor-pointer"
                            title={`Add ${product.name} to cart`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Feedback Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[1300] px-5 py-3 rounded-2xl bg-brand text-[#0a0a0a] font-poppins font-black text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(245,196,0,0.4)] flex items-center gap-2"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {sizeModal}
    </section>
  );
}