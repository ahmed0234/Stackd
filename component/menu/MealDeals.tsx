"use client";

import { useState, useMemo, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS, Product } from "@/component/menu/MenuSection";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Choices Constants
const STACKS_CHOICES = [
  {
    id: "fire-stack",
    name: "Fire Stack",
    image: "/Stacks/Fire.webp",
    desc: "Double smash beef, pepper jack, grilled jalapeños, fire sauce",
  },
  {
    id: "melt-stack",
    name: "Melt Stack",
    image: "/Stacks/Melt.webp",
    desc: "Double patties, hot cheddar sauce, caramelized onions",
  },
  {
    id: "zinger-stack",
    name: "Zinger Stack",
    image: "/Stacks/zingerstack.webp",
    desc: "Crispy zinger fillet, melted cheddar, signature zinger sauce",
  },
  {
    id: "royal-stack",
    name: "Royal Stack",
    image: "/Stacks/Royal.webp",
    desc: "Triple patties, premium cheddar, sweet caramelized onions, truffle aioli",
  },
  {
    id: "smoke-stack",
    name: "Smoke Stack",
    image: "/Stacks/Smoke.webp",
    desc: "Double patties, bacon, onion rings, BBQ sauce",
  },
  {
    id: "fire-wrap",
    name: "Fire Wrap",
    image: "/Wraps/firewrap.webp",
    desc: "Spicy chicken tenders, pepper jack, jalapeños, fire sauce",
  },
  {
    id: "melted-wrap",
    name: "Melted Wrap",
    image: "/Wraps/meltedwrap.webp",
    desc: "Double smash beef, hot cheddar sauce, caramelized onions",
  },
  {
    id: "zinger-wrap",
    name: "Zinger Wrap",
    image: "/Wraps/zingerwrap.webp",
    desc: "Crispy zinger chicken, cheddar cheese, spicy zinger sauce",
  },
  {
    id: "smoke-wrap",
    name: "Smoke Wrap",
    image: "/Wraps/smokewrap.webp",
    desc: "Smoky grilled chicken, crispy bacon, cheddar, BBQ glaze",
  },
  {
    id: "royale-wrap",
    name: "Royale Wrap",
    image: "/Wraps/royalewrap.webp",
    desc: "Triple smashed beef, golden cheddar, truffle glaze",
  },
];

const DRINKS_CHOICES = [
  {
    id: "pepsi",
    name: "Pepsi",
    image: "/Drinks/Pepsi/500ml.webp",
  },
  {
    id: "sprite",
    name: "Sprite",
    image: "/Drinks/Sprite/500.webp",
  },
  {
    id: "water",
    name: "Mineral Water",
    image: "/Drinks/Water/500.webp",
  },
];

const DEAL_REQUIREMENTS: Record<string, { stacks: number; drinks: number }> = {
  "solo-meal-deal": { stacks: 1, drinks: 1 },
  "duo-stack-deal": { stacks: 2, drinks: 2 },
  "azadi-box": { stacks: 2, drinks: 2 },
  "full-stack-meal-deal": { stacks: 3, drinks: 3 },
  "stackd-share-box": { stacks: 4, drinks: 4 },
};

export default function MealDeals() {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeDeal, setActiveDeal] = useState<Product | null>(null);

  const cart = useCartStore((state) => state.items);

  // Sync navigation states when slides change
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const dealProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === "deals");
  }, []);

  return (
    <section
      id="meal-deals"
      className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Image & Atmospheric Overlays */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/DealsSectionBackground.webp"
          alt="Deals Section Background"
          fill
          priority
          className="object-cover object-[center_35%] sm:object-center scale-110 filter brightness-120 contrast-125 transition-all duration-700"
          sizes="100vw"
        />

        {/* Balanced Atmospheric Dark Gradients for Rich Visibility & Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,196,0,0.12),transparent_75%)] z-10 pointer-events-none" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand/10 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[130px] pointer-events-none z-10" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-brand/[0.08] border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest font-poppins mb-4"
            >
              Best Value
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-tight"
            >
              Meal Deals Made For{" "}
              <span className="text-brand">Bigger Cravings</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-white/60 mt-3 text-sm sm:text-base font-sans leading-relaxed"
            >
              Enjoy complete meals, combos, and family-friendly deals without
              overcomplicating your order. Get more of your STACKD favorites for
              the ultimate value.
            </motion.p>
          </div>
        </div>

        {/* Swiper Slider Wrapper with Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-full px-2 sm:px-0"
        >
          {/* Left Arrow Button (Accessible on both Mobile & Desktop) */}
          <button
            onClick={() => swiperRef?.slidePrev()}
            disabled={isBeginning}
            className={`absolute top-1/2 left-2 md:-left-6 lg:-left-12 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer z-30 select-none ${
              isBeginning
                ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-20"
                : "border-white/10 text-white bg-dark-secondary/80 hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            }`}
            title="Previous Deal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Right Arrow Button (Accessible on both Mobile & Desktop) */}
          <button
            onClick={() => swiperRef?.slideNext()}
            disabled={isEnd}
            className={`absolute top-1/2 right-2 md:-right-6 lg:-right-12 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer z-30 select-none ${
              isEnd
                ? "border-white/5 text-white/20 bg-white/[0.01] cursor-not-allowed opacity-20"
                : "border-white/10 text-white bg-dark-secondary/80 hover:bg-brand hover:border-brand hover:text-[#0a0a0a] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            }`}
            title="Next Deal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => {
              setSwiperRef(swiper);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-deals",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="mySwiper !overflow-visible !pb-12"
          >
            {dealProducts.map((product) => {
              return (
                <SwiperSlide key={product.id} className="h-auto">
                  <DealCard
                    product={product}
                    onConfigure={() => setActiveDeal(product)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Pagination container */}
          <div className="swiper-pagination-deals mt-6 flex justify-center gap-2" />
        </motion.div>
      </div>

      {/* Customizer Modal Overlay */}
      <AnimatePresence>
        {activeDeal && (
          <MealDealConfigurator
            activeDeal={activeDeal}
            onClose={() => setActiveDeal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Deal Card Component
   ─────────────────────────────────────────────────────────────────────────── */
export interface DealCardProps {
  product: Product;
  onConfigure: () => void;
}

export function DealCard({ product, onConfigure }: DealCardProps) {
  const [hovered, setHovered] = useState(false);

  // Extract savings (e.g., "Save Rs 69") and display tag (e.g., "Bestseller")
  const savings = useMemo(() => {
    return product.tags?.find((t) => t.startsWith("Save")) || null;
  }, [product.tags]);

  const badgeTag = useMemo(() => {
    return product.tags?.find((t) => !t.startsWith("Save")) || null;
  }, [product.tags]);

  return (
    <motion.div
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-[24px] bg-white/[0.02] border border-white/[0.06] backdrop-blur-md overflow-hidden transition-all duration-500 select-none cursor-grab active:cursor-grabbing"
      style={{
        boxShadow: hovered
          ? `0 20px 45px -12px ${product.accentColor}25, inset 0 1px 1px rgba(255, 255, 255, 0.05)`
          : "0 8px 32px rgba(0, 0, 0, 0.45)",
        borderColor: hovered
          ? `${product.accentColor}35`
          : "rgba(255, 255, 255, 0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Background Accent glow blob */}
      <div
        className="absolute w-36 h-36 rounded-full blur-[48px] pointer-events-none -top-10 -right-10 transition-opacity duration-500 z-0"
        style={{
          backgroundColor: product.accentColor,
          opacity: hovered ? 0.22 : 0.06,
        }}
      />

      {/* Badges Layout (Overlays Image) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {badgeTag ? (
          <div
            className="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider font-poppins text-white border backdrop-blur-md"
            style={{
              backgroundColor:
                badgeTag === "Limited Time"
                  ? "rgba(239, 68, 68, 0.8)"
                  : "rgba(17, 17, 17, 0.72)",
              borderColor:
                badgeTag === "Limited Time"
                  ? "rgba(239, 68, 68, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {badgeTag}
          </div>
        ) : (
          <div />
        )}

        {savings && (
          <div className="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest font-poppins bg-brand text-[#0a0a0a] shadow-[0_4px_12px_rgba(245,196,0,0.25)]">
            {savings}
          </div>
        )}
      </div>

      {/* Visual Image container (Expanded & Full-bleed width-wise) */}
      <div className="relative w-full aspect-[16/10] bg-[#080808] flex items-center justify-center overflow-hidden z-10 border-b border-white/[0.04] select-none p-3 pb-1">
        {/* Glow behind image */}
        <div
          className="absolute w-40 h-40 rounded-full blur-[48px] opacity-15 transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: product.accentColor }}
        />

        <motion.div
          animate={{
            scale: hovered ? 1.04 : 1,
            rotate: hovered ? 0.5 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative w-full h-full rounded-xl overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>
      </div>

      {/* Details Box */}
      <div className="flex flex-col flex-grow p-6 text-left relative z-10">
        {/* Deal Name */}
        <h3 className="font-poppins font-black text-xl text-white leading-tight uppercase tracking-wide">
          {product.name}
        </h3>

        {/* Price (Positioned directly below title) */}
        <div className="flex items-baseline gap-1 mt-1 mb-4">
          <span className="text-[10px] font-poppins font-bold text-white/40 uppercase tracking-widest">
            Rs
          </span>
          <span className="font-poppins font-black text-2xl text-brand leading-none">
            {product.price.toLocaleString()}
          </span>
        </div>

        {/* "What's Included" bullet list */}
        {product.includes && product.includes.length > 0 && (
          <div className="mb-6 flex-grow">
            <span className="text-[11px] font-poppins font-black text-white/50 uppercase tracking-widest block mb-3">
              Deal Includes
            </span>
            <ul className="space-y-2">
              {product.includes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-white/90 font-sans font-medium"
                >
                  <span className="text-brand font-bold mt-[2px]">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Row */}
        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between h-12">
          <div className="flex flex-col">
            <span className="text-[8px] font-poppins font-bold text-white/30 uppercase tracking-wider">
              Add To Order
            </span>
            <span className="text-[10px] font-sans font-bold text-white/60">
              Satisfy Craving
            </span>
          </div>

          <div className="relative flex items-center h-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfigure();
              }}
              className="px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[9px] font-poppins font-black uppercase text-[#0a0a0a] bg-brand shadow-[0_4px_12px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_20px_rgba(245,196,0,0.4)] hover:scale-104 active:scale-96 transition-all duration-300 cursor-pointer select-none font-extrabold"
            >
              <PlusIcon width={9} height={9} />
              <span>Add Deal</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Premium Deal Configurator Experience (Modal / Bottom Sheet)
   ─────────────────────────────────────────────────────────────────────────── */
export interface MealDealConfiguratorProps {
  activeDeal: Product;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MealDealConfigurator({
  activeDeal,
  onClose,
  onSuccess,
}: MealDealConfiguratorProps) {
  const addCustomItem = useCartStore((state) => state.addCustomItem);

  const req = useMemo(() => {
    return DEAL_REQUIREMENTS[activeDeal.id] || { stacks: 0, drinks: 0 };
  }, [activeDeal]);

  // Selections state
  const [selectedStacks, setSelectedStacks] = useState<string[]>(() =>
    new Array(req.stacks).fill(""),
  );
  const [selectedDrinks, setSelectedDrinks] = useState<
    { name: string; size: string }[]
  >(() => new Array(req.drinks).fill({ name: "", size: "340ML" }));

  const [validationError, setValidationError] = useState<string | null>(null);

  // Lock scrolling on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSelectStack = (index: number, stackName: string) => {
    setSelectedStacks((prev) => {
      const next = [...prev];
      next[index] = stackName;
      return next;
    });
    setValidationError(null);
  };

  const handleSelectDrinkBrand = (index: number, drinkName: string) => {
    setSelectedDrinks((prev) => {
      const next = [...prev];
      next[index] = { name: drinkName, size: "340ML" };
      return next;
    });
    setValidationError(null);
  };

  const isConfigComplete = useMemo(() => {
    const stacksSelected = selectedStacks.every((s) => s !== "");
    const drinksSelected = selectedDrinks.every((d) => d.name !== "");
    return stacksSelected && drinksSelected;
  }, [selectedStacks, selectedDrinks]);

  const handleAddToCart = () => {
    if (!isConfigComplete) {
      setValidationError(
        "Please select all required stacks and drinks choices!",
      );
      return;
    }

    // Create unique key based on selections
    const stackKeyStr = selectedStacks.join("-");
    const drinkKeyStr = selectedDrinks
      .map((d) => `${d.name}_${d.size}`)
      .join("-");
    const customKey = `${activeDeal.id}::${stackKeyStr}::${drinkKeyStr}`;

    const newItem = {
      id: activeDeal.id,
      key: customKey,
      name: activeDeal.name,
      image: activeDeal.image,
      price: activeDeal.price,
      quantity: 1,
      accentColor: activeDeal.accentColor,
      dealConfiguration: {
        stacks: selectedStacks,
        drinks: selectedDrinks,
      },
    };

    addCustomItem(newItem);
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[1200] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
      {/* Dark backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Configurator Dialog Container */}
      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0.5 }}
        transition={{ type: "spring", damping: 30, stiffness: 220 }}
        className="relative w-full max-w-6xl xl:max-w-7xl h-full sm:h-[90vh] lg:h-[86vh] bg-dark-secondary sm:rounded-3xl border border-white/[0.08] flex flex-col overflow-hidden z-10 shadow-[0_24px_70px_rgba(0,0,0,0.9)]"
        style={{
          background:
            "linear-gradient(180deg, var(--color-dark-secondary) 0%, var(--color-dark-primary) 100%)",
        }}
      >
        {/* Header (Sticky top) */}
        <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 bg-dark-secondary/90 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] font-poppins font-black uppercase text-brand tracking-widest block mb-1">
              Customizing Deal
            </span>
            <h2 className="text-xl sm:text-3xl font-poppins font-black text-white uppercase tracking-tight">
              {activeDeal.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] hover:scale-105 transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Two-Column Form Scroll Area */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10 scrollbar-none">
          {/* Left Column: Interactive Choices Form */}
          <div className="flex-grow flex flex-col gap-8 lg:max-w-3xl xl:max-w-4xl">
            {/* Signature Stacks Options */}
            {req.stacks > 0 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base sm:text-xl font-poppins font-black text-white uppercase tracking-wider text-left flex items-center gap-2">
                    <span>🍔</span> Select Stacks or Wraps
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 text-left mt-1 font-sans">
                    Choose which stack or wrap you want for each slot. Mix and
                    match as you like!
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {selectedStacks.map((selectedStack, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3.5 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-poppins font-bold uppercase tracking-wider text-brand">
                          Stack / Wrap Choice #{index + 1}
                        </span>
                        {selectedStack ? (
                          <span className="text-xs font-sans font-bold text-green-400 flex items-center gap-1">
                            ✓ Selected: {selectedStack}
                          </span>
                        ) : (
                          <span className="text-xs font-sans font-bold text-white/30 animate-pulse">
                            ⚠️ Selection required
                          </span>
                        )}
                      </div>

                      {/* Stack selector Grid - Spacious on desktop */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                        {STACKS_CHOICES.map((stack) => {
                          const isSelected = selectedStack === stack.name;
                          return (
                            <div
                              key={stack.id}
                              onClick={() =>
                                handleSelectStack(index, stack.name)
                              }
                              className={`relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center border select-none group h-full justify-between ${
                                isSelected
                                  ? "border-brand bg-brand/[0.06] shadow-[0_0_25px_rgba(245,196,0,0.2)] scale-[1.02]"
                                  : "border-white/[0.07] bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03] hover:scale-[1.01]"
                              }`}
                            >
                              {/* Selected Checkmark Badge */}
                              {isSelected && (
                                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 rounded-full bg-brand text-[#0a0a0a] flex items-center justify-center font-black text-xs shadow-md z-10">
                                  ✓
                                </div>
                              )}
                              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-3 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                <Image
                                  src={stack.image}
                                  alt={stack.name}
                                  fill
                                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 180px"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div className="flex flex-col items-center text-center">
                                <span className="text-xs sm:text-sm lg:text-base font-poppins font-black text-white uppercase tracking-wide leading-snug">
                                  {stack.name}
                                </span>
                                <span className="text-[10px] sm:text-xs text-white/45 leading-relaxed mt-1.5 line-clamp-2 font-sans">
                                  {stack.desc}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider line between Stack and Drinks */}
            {req.stacks > 0 && req.drinks > 0 && (
              <div className="w-full h-[1px] bg-white/[0.04]" />
            )}

            {/* Drinks Options */}
            {req.drinks > 0 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base sm:text-xl font-poppins font-black text-white uppercase tracking-wider text-left flex items-center gap-2">
                    <span>🥤</span> Select Chilled Drinks
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 text-left mt-1 font-sans">
                    Select your beverage choice (served as 340ML).
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {selectedDrinks.map((selectedDrink, index) => (
                    <div key={index} className="flex flex-col gap-4 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-poppins font-bold uppercase tracking-wider text-brand">
                          Drink Choice #{index + 1}
                        </span>
                        {selectedDrink.name ? (
                          <span className="text-xs font-sans font-bold text-green-400 flex items-center gap-1">
                            ✓ Selected: {selectedDrink.name} (340ML)
                          </span>
                        ) : (
                          <span className="text-xs font-sans font-bold text-white/30 animate-pulse">
                            ⚠️ Selection required
                          </span>
                        )}
                      </div>

                      {/* Drink grid selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {DRINKS_CHOICES.map((drink) => {
                          const isSelected = selectedDrink.name === drink.name;

                          return (
                            <div
                              key={drink.id}
                              onClick={() =>
                                handleSelectDrinkBrand(index, drink.name)
                              }
                              className={`relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center border select-none group min-h-[130px] justify-center ${
                                isSelected
                                  ? "border-brand bg-brand/[0.06] shadow-[0_0_25px_rgba(245,196,0,0.2)] scale-[1.02]"
                                  : "border-white/[0.07] bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03] hover:scale-[1.01]"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-brand text-[#0a0a0a] flex items-center justify-center font-black text-[10px] shadow-md z-10">
                                  ✓
                                </div>
                              )}
                              <div className="relative w-14 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 lg:w-20 lg:h-24 mb-2.5 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                <Image
                                  src={drink.image}
                                  alt={drink.name}
                                  fill
                                  sizes="96px"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <span className="text-xs sm:text-sm font-poppins font-black text-white uppercase tracking-wide text-center leading-tight">
                                {drink.name} (340ML)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="w-full lg:w-80 xl:w-96 lg:flex-shrink-0">
            <div className="sticky top-0 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col text-left">
              <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.04]">
                Combo Builder
              </h3>

              {/* Deal Mini Info */}
              <div className="flex gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-lg bg-black/40 overflow-hidden flex-shrink-0 border border-white/5">
                  <Image
                    src={activeDeal.image}
                    alt=""
                    fill
                    sizes="48px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-xs text-white leading-tight uppercase line-clamp-1">
                    {activeDeal.name}
                  </h4>
                  <span className="text-[10px] text-white/45 font-sans line-clamp-2">
                    {activeDeal.description}
                  </span>
                </div>
              </div>

              {/* Selected Choices list */}
              <div className="flex flex-col gap-3 bg-black/30 p-3.5 rounded-xl border border-white/[0.04] mb-4 text-xs">
                <div>
                  <span className="text-[9px] font-poppins font-black text-white/35 uppercase tracking-wider block mb-1">
                    Burgers Selections
                  </span>
                  <ul className="space-y-1">
                    {selectedStacks.map((stack, idx) => (
                      <li
                        key={idx}
                        className="font-sans font-medium text-white/80 flex items-center gap-1.5"
                      >
                        <span className="text-brand">🍔</span>
                        <span>
                          {stack || (
                            <span className="text-white/20 italic">
                              Slot #{idx + 1} empty
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full h-[1px] bg-white/[0.04]" />

                <div>
                  <span className="text-[9px] font-poppins font-black text-white/35 uppercase tracking-wider block mb-1">
                    Drinks Selections
                  </span>
                  <ul className="space-y-1">
                    {selectedDrinks.map((drink, idx) => (
                      <li
                        key={idx}
                        className="font-sans font-medium text-white/80 flex items-center gap-1.5"
                      >
                        <span className="text-brand">🥤</span>
                        <span>
                          {drink.name ? (
                            `${drink.name} (${drink.size})`
                          ) : (
                            <span className="text-white/20 italic">
                              Slot #{idx + 1} empty
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-poppins font-bold uppercase text-center leading-relaxed">
                  {validationError}
                </div>
              )}

              {/* Desktop Pricing & CTA (Hidden on Mobile) */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-[10px] font-poppins font-bold uppercase text-white/40 tracking-wider">
                    Combo Price
                  </span>
                  <span className="font-poppins font-black text-2xl text-white">
                    Rs {activeDeal.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!isConfigComplete}
                  className={`w-full py-3.5 rounded-xl font-poppins font-extrabold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                    isConfigComplete
                      ? "bg-brand text-[#0a0a0a] shadow-[0_4px_15px_rgba(245,196,0,0.3)] hover:shadow-[0_4px_25px_rgba(245,196,0,0.5)] hover:scale-102 cursor-pointer"
                      : "bg-white/[0.04] border border-white/[0.08] text-white/20 cursor-not-allowed"
                  }`}
                >
                  <span>Add Deal to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar (Visible on mobile, hidden on desktop) */}
        <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-[#0c0c0c]/95 border-t border-white/[0.06] backdrop-blur-md p-4 flex flex-col gap-2 z-30">
          {validationError && (
            <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-poppins font-bold uppercase text-center leading-tight">
              {validationError}
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <span className="text-[9px] font-poppins font-bold uppercase text-white/45 tracking-widest block">
                Combo Price
              </span>
              <span className="font-poppins font-black text-lg text-brand leading-none">
                Rs {activeDeal.price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isConfigComplete}
              className={`px-5 py-3 rounded-xl font-poppins font-extrabold text-[10px] uppercase tracking-widest transition-all duration-300 ${
                isConfigComplete
                  ? "bg-brand text-[#0a0a0a] shadow-[0_4px_12px_rgba(245,196,0,0.2)] hover:scale-102 active:scale-98 cursor-pointer"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/25 cursor-not-allowed"
              }`}
            >
              Add Deal to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PlusIcon({
  width = 12,
  height = 12,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
