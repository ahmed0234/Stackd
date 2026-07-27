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

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedShowcase() {
  const [activeCategory, setActiveCategory] = useState<"all" | "stacks" | "wraps" | "fries" | "drinks">("all");
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
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

  // Curated balanced list of favorites: 3 Wraps, 2 Stacks, 2 Fries, 2 Beverages
  const ALL_FAVORITES_IDS = [
    "royal-stack",
    "fire-wrap",
    "full-stackd-fries",
    "melted-wrap",
    "fire-stack",
    "chilli-cheese-fries",
    "og-wrap",
    "pepsi",
    "sprite",
  ];

  const showcaseProducts =
    activeCategory === "all"
      ? ALL_FAVORITES_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean)
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Background Image & Atmospheric Overlays */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/FeatureShowcaseBackground.png"
          alt="Feature Showcase Background"
          fill
          priority
          className="object-cover object-[center_25%] sm:object-center scale-105 filter brightness-105 contrast-115 transition-all duration-700"
          sizes="100vw"
        />

        {/* Balanced Atmospheric Dark Gradients for Rich Visibility & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.12),transparent_75%)] z-10 pointer-events-none" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-10" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Section Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/[0.08] border border-brand/20 text-brand text-xs font-poppins font-black uppercase tracking-widest mb-3"
            >
              <span>🔥</span> SIGNATURE WRAPS & SIDES
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-tight"
            >
              Explore Our <span className="text-brand">Handcrafted Favorites</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-white/60 font-sans mt-3"
            >
              Signature smash burgers, fresh tortilla wraps, loaded crispy fries, and refreshing ice-cold beverages.
            </motion.p>
          </div>

          {/* Controls: Category Filter Tabs & Navigation Arrows */}
          <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto self-center sm:self-auto lg:self-end">
            {/* Filter Tabs Container */}
            <div className="relative w-full sm:w-auto max-w-full flex items-center justify-start sm:justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-x-auto scrollbar-none">
              {(["all", "stacks", "wraps", "fries", "drinks"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    swiperRef?.slideTo(0);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-poppins font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-brand text-[#0a0a0a] shadow-[0_4px_15px_rgba(245,196,0,0.3)]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {cat === "all" ? "All Favorites" : cat}
                </button>
              ))}
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center justify-end w-full sm:w-auto gap-2">
              <button
                onClick={() => swiperRef?.slidePrev()}
                disabled={isBeginning}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer select-none ${
                  isBeginning
                    ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-30"
                    : "border-white/10 text-white bg-white/[0.04] hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-md"
                }`}
                title="Previous Item"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef?.slideNext()}
                disabled={isEnd}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer select-none ${
                  isEnd
                    ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-30"
                    : "border-white/10 text-white bg-white/[0.04] hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-md"
                }`}
                title="Next Item"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          spaceBetween={22}
          slidesPerView={1.15}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 22 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="mySwiper !overflow-visible !pb-4"
        >
          {showcaseProducts.map((product) => {
            const isBYO =
              product.id.startsWith("byo-") ||
              product.id === "byo-stack" ||
              product.id === "byo-wrap" ||
              product.name.toLowerCase().includes("build your own");

            const targetRoute =
              product.id === "byo-wrap" || product.name.toLowerCase().includes("wrap")
                ? "/build-wrap"
                : "/build";

            return (
              <SwiperSlide key={product.id} className="h-auto">
                <div className="relative flex flex-col h-full rounded-[28px] bg-gradient-to-b from-white/[0.035] via-white/[0.015] to-transparent border border-white/[0.09] hover:border-brand/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-left group">
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-lg text-[9px] font-poppins font-black uppercase tracking-wider bg-black/80 text-brand border border-brand/30 backdrop-blur-md shadow-md">
                      {product.category === "stacks"
                        ? "🍔 STACK"
                        : product.category === "wraps"
                        ? "🌯 WRAP"
                        : product.category === "fries"
                        ? "🍟 FRIES"
                        : "🥤 DRINK"}
                    </span>
                  </div>

                  {/* Product Image Display Frame */}
                  {isBYO ? (
                    <Link
                      href={targetRoute}
                      className="relative w-full aspect-[16/11] bg-[#0c0c0c] flex items-center justify-center p-4 pt-8 border-b border-white/[0.05] overflow-hidden group/img cursor-pointer"
                    >
                      <div
                        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-25"
                        style={{ backgroundColor: product.accentColor || "#F5C400" }}
                      />
                      <div className="relative w-full h-full transition-transform duration-300 group-hover/img:scale-108">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="320px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="relative w-full aspect-[16/11] bg-[#0c0c0c] flex items-center justify-center p-4 pt-8 border-b border-white/[0.05] overflow-hidden">
                      <div
                        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-25"
                        style={{ backgroundColor: product.accentColor || "#F5C400" }}
                      />
                      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-108">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="320px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Product Details & Action */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        {isBYO ? (
                          <Link href={targetRoute} className="no-underline">
                            <h3 className="font-poppins font-black text-base text-white uppercase tracking-wide hover:text-brand transition-colors cursor-pointer">
                              {product.name}
                            </h3>
                          </Link>
                        ) : (
                          <h3 className="font-poppins font-black text-base text-white uppercase tracking-wide">
                            {product.name}
                          </h3>
                        )}
                        <span className="text-[10px] font-sans font-bold text-brand">
                          ⭐ 4.9
                        </span>
                      </div>
                      <p className="text-xs text-white/50 font-sans line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-poppins font-bold uppercase text-white/40 block">
                          {isBYO ? "Custom" : "Price"}
                        </span>
                        <span className="font-poppins font-black text-lg text-white">
                          {(() => {
                            const { amount, showFromPrefix } =
                              getProductListPrice(product);
                            return showFromPrefix
                              ? `From Rs ${amount.toLocaleString()}`
                              : `Rs ${amount.toLocaleString()}`;
                          })()}
                        </span>
                      </div>

                      {isBYO ? (
                        <Link
                          href={targetRoute}
                          className="px-4 py-2.5 rounded-full bg-brand hover:bg-brand-dim text-[#0a0a0a] font-poppins font-black text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-[0_4px_15px_rgba(245,196,0,0.3)] hover:scale-105 active:scale-95 cursor-pointer no-underline"
                          title={`Customize ${product.name}`}
                        >
                          <span>BUILD NOW</span>
                          <span>&rarr;</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2.5 rounded-full bg-brand hover:bg-brand-dim text-[#0a0a0a] font-poppins font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(245,196,0,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                          title={`Add ${product.name} to cart`}
                        >
                          <span>+ ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Toast Notification */}
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
