"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { PRODUCTS, Product } from "@/component/menu/MenuSection";

interface UpsellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customization?: {
    bun: string;
    protein: string;
    veggies: string[];
    cheese: string | null;
    sauces: string[];
  };
  price?: number;
}

export default function UpsellDrawer({ isOpen, onClose, customization, price }: UpsellDrawerProps) {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewStep, setViewStep] = useState<"celebrate" | "upsell">("celebrate");
  const [activeTab, setActiveTab] = useState<"drinks" | "fries" | "wraps">("drinks");

  // SSR Safe mounted state
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset states when drawer opens
  useEffect(() => {
    if (isOpen) {
      setViewStep("celebrate");
      setActiveTab("drinks");
    }
  }, [isOpen]);

  // Auto transition celebration to upsell after 3 seconds
  useEffect(() => {
    if (isOpen && viewStep === "celebrate") {
      const timer = setTimeout(() => {
        setViewStep("upsell");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, viewStep]);

  if (!mounted) return null;

  const handleProceedToCart = () => {
    onClose();
    router.push("/cart");
  };

  const activeProducts = PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleProceedToCart}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] cursor-pointer"
          />

          {/* Drawer/Modal Wrapper */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { y: "100%", x: "-50%" }}
            animate={isMobile ? { y: 0 } : { y: "-50%", x: "-50%" }}
            exit={isMobile ? { y: "100%" } : { y: "100%", x: "-50%" }}
            style={
              isMobile
                ? {
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }
                : {
                    top: "50%",
                    left: "50%",
                  }
            }
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className={`fixed z-[210] w-full bg-dark-secondary/[0.96] border-brand/20 backdrop-blur-2xl shadow-[0_-12px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col ${
              isMobile
                ? "border-t rounded-t-[32px] max-h-[85vh] bottom-0"
                : "border rounded-[32px] max-h-[90vh] md:max-w-3xl"
            }`}
          >
            {/* Top Drag Indicator Line for Mobile */}
            {isMobile && <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-3 flex-shrink-0" />}

            {/* Scrollable Container (Pure block layout to prevent top clipping) */}
            <div className="overflow-y-auto px-4 sm:px-6 pb-6 pt-3 scrollbar-none flex-grow">
              <AnimatePresence mode="wait">
                {viewStep === "celebrate" ? (
                  <motion.div
                    key="celebration-view"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="py-4 sm:py-8 flex flex-col items-center justify-center text-center select-none"
                  >
                    {/* Exciting Success Animation Icon */}
                    <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 15 }}
                        className="w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(245,196,0,0.45)]"
                      >
                        <span className="text-3xl">🎉</span>
                      </motion.div>
                      <motion.span
                        animate={{ y: [-8, 8, -8], x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        className="absolute top-0 left-0 text-lg"
                      >
                        ✨
                      </motion.span>
                      <motion.span
                        animate={{ y: [8, -8, 8], x: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute bottom-2 right-2 text-lg"
                      >
                        🌟
                      </motion.span>
                    </div>

                    <h3 className="font-poppins font-black text-xl sm:text-2xl uppercase tracking-wider text-white mb-2 leading-tight">
                      🎉 Your STACKD Creation Is Ready
                    </h3>
                    <p className="text-[11px] text-white/55 max-w-sm leading-relaxed mb-5 font-sans">
                      Your hand-crafted stack layers have been assembled with perfection. Up next: choose side upgrades!
                    </p>

                    {/* Summary Card */}
                    {customization && (
                      <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md mb-6 text-left">
                        <span className="text-[8px] sm:text-[9px] font-poppins font-black uppercase tracking-widest text-brand block mb-2">
                          Configured Stack Specifications:
                        </span>
                        <div className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed space-y-1">
                          <p>
                            <span className="text-white/30 font-bold uppercase text-[9px] w-20 inline-block">Bun base:</span>
                            <span className="text-white font-semibold">{customization.bun}</span>
                          </p>
                          <p>
                            <span className="text-white/30 font-bold uppercase text-[9px] w-20 inline-block">Protein:</span>
                            <span className="text-white font-semibold">{customization.protein}</span>
                          </p>
                          {customization.cheese && (
                            <p>
                              <span className="text-white/30 font-bold uppercase text-[9px] w-20 inline-block">Cheese:</span>
                              <span className="text-white">{customization.cheese}</span>
                            </p>
                          )}
                          {customization.veggies.length > 0 && (
                            <p className="line-clamp-2">
                              <span className="text-white/30 font-bold uppercase text-[9px] w-20 inline-block">Veggies:</span>
                              <span className="text-white/90">{customization.veggies.join(", ")}</span>
                            </p>
                          )}
                          {customization.sauces.length > 0 && (
                            <p className="line-clamp-2">
                              <span className="text-white/30 font-bold uppercase text-[9px] w-20 inline-block">Sauces:</span>
                              <span className="text-white/90">{customization.sauces.join(", ")}</span>
                            </p>
                          )}
                          {price && (
                            <div className="pt-2 border-t border-white/[0.04] mt-2 flex items-center justify-between">
                              <span className="text-[9px] font-poppins font-black uppercase tracking-wider text-white/40">Base Price</span>
                              <span className="text-white font-poppins font-black">Rs {price}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Transition actions */}
                    <div className="flex flex-col gap-2 w-full max-w-xs sm:max-w-sm">
                      <button
                        onClick={() => setViewStep("upsell")}
                        className="w-full py-3 sm:py-4 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(245,196,0,0.35)] hover:scale-102 flex items-center justify-center gap-2"
                      >
                        <span>Complete Your Meal</span>
                        <span className="text-sm">&rarr;</span>
                      </button>
                      <button
                        onClick={handleProceedToCart}
                        className="w-full py-3 rounded-xl border border-white/5 hover:border-white/10 text-white/40 hover:text-white/80 font-poppins font-extrabold text-[10px] uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                      >
                        Skip & Checkout Stack
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upsells-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="py-2 select-none"
                  >
                    {/* Header info */}
                    <div className="flex flex-col items-center max-w-md mx-auto mb-4 text-center select-none">
                      <span className="text-xl mb-1">🥤🍟🌯</span>
                      <h3 className="font-poppins font-black text-lg sm:text-xl uppercase tracking-wider text-white">
                        Complete Your Meal
                      </h3>
                      <p className="text-[10px] text-white/50 leading-relaxed font-sans max-w-xs mt-1">
                        Upsell your stack with ice-cold beverages, sizzling loaded fries, or wraps.
                      </p>
                    </div>

                    {/* Category Selector Tabs */}
                    <div className="flex justify-center w-full mb-5">
                      <div className="flex items-center p-1 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
                        {(["drinks", "fries", "wraps"] as const).map((tab) => {
                          const isActive = activeTab === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-[10px] font-poppins font-black uppercase tracking-widest transition-all duration-300 cursor-pointer select-none flex-shrink-0 ${
                                isActive ? "text-[#0a0a0a]" : "text-white/60 hover:text-white"
                              }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeUpsellTab"
                                  className="absolute inset-0 rounded-xl bg-brand shadow-[0_2px_10px_rgba(245,196,0,0.25)]"
                                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                                />
                              )}
                              <span className="relative z-10 flex items-center gap-1.5">
                                {tab === "drinks" ? "🥤 Drinks" : tab === "fries" ? "🍟 Fries" : "🌯 Wraps"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Upsell Item Grid (No inner scroll/clipping on mobile, flows naturally) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                      {activeProducts.map((product) => (
                        <UpsellCard
                          key={product.id}
                          product={product}
                          cartItems={cartItems}
                          onAdd={addItem}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>

                    {/* Footer Nav Row */}
                    <div className="mt-5 pt-4 border-t border-white/[0.05] flex flex-col sm:flex-row gap-3 w-full justify-end">
                      <button
                        onClick={handleProceedToCart}
                        className="px-6 py-3 rounded-xl border border-white/5 hover:border-white/10 text-white/60 hover:text-white/90 font-poppins font-extrabold text-[10px] uppercase tracking-wider transition-colors duration-300 cursor-pointer select-none"
                      >
                        Skip & View Cart
                      </button>
                      <button
                        onClick={handleProceedToCart}
                        className="px-8 py-3.5 rounded-xl bg-brand hover:bg-brand/90 text-[#0a0a0a] font-poppins font-black text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(245,196,0,0.25)] hover:scale-102 select-none"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Upsell Card Component (Horizontal on mobile, Vertical on desktop)
   ─────────────────────────────────────────────────────────────────────────── */
function UpsellCard({
  product,
  cartItems,
  onAdd,
  onRemove,
}: {
  product: Product;
  cartItems: Record<string, CartItem>;
  onAdd: (id: string, size?: string) => void;
  onRemove: (id: string, size?: string) => void;
}) {
  const isDrink = product.category === "drinks";
  const [selectedSize, setSelectedSize] = useState<string>("500ml");

  // Determine size specific details
  const activeSizeOpt = product.sizes?.find((s) => s.label === selectedSize);
  const currentImage = isDrink && activeSizeOpt?.image ? activeSizeOpt.image : product.image;
  const currentPrice = isDrink && activeSizeOpt ? activeSizeOpt.price : product.price;

  // Resolve key for quantity
  const currentKey = isDrink ? `${product.id}::${selectedSize}` : product.id;
  const quantity = cartItems[currentKey]?.quantity || 0;

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-brand/20 backdrop-blur-md flex flex-row sm:flex-col justify-between transition-all duration-300 relative overflow-hidden group text-left gap-4 sm:gap-0 sm:min-h-[260px] w-full">
      {/* Decorative Blob */}
      <div
        className="absolute w-20 h-20 rounded-full blur-[24px] pointer-events-none -top-4 -right-4 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"
        style={{ backgroundColor: product.accentColor }}
      />

      {/* Left side (mobile) / Top side (desktop): Image + Details */}
      <div className="flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 flex-grow min-w-0">
        {/* Thumbnail Frame */}
        <div className="relative w-16 h-16 sm:w-full sm:h-28 flex items-center justify-center select-none overflow-hidden flex-shrink-0 mb-0 sm:mb-3.5">
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 group-hover:scale-105 transition-transform duration-300">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="96px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Content Info */}
        <div className="min-w-0 flex-grow text-left">
          <h4 className="font-poppins font-black text-[11px] sm:text-xs md:text-sm text-white uppercase tracking-wide leading-tight line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[9px] sm:text-[10px] text-white/45 font-sans mt-0.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Right side (mobile) / Bottom side (desktop): size selector + price/add action */}
      <div className="flex flex-col justify-center items-end sm:block flex-shrink-0 w-28 sm:w-full">
        {/* Drink Size Toggle segment */}
        {isDrink && product.sizes && (
          <div className="mb-2 sm:mt-3 flex items-center gap-0.5 p-0.5 rounded-lg bg-white/[0.02] border border-white/[0.05] w-full">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size.label;
              return (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`relative py-1 rounded-md text-[8px] font-poppins font-black uppercase tracking-wider flex-grow text-center transition-all duration-300 cursor-pointer select-none ${
                    isSelected ? "text-[#0a0a0a]" : "text-white/50 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`upsellSize-${product.id}`}
                      className="absolute inset-0 rounded-md bg-brand shadow-[0_1px_5px_rgba(245,196,0,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10">{size.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-0 sm:pt-2.5 sm:border-t sm:border-white/[0.04] flex flex-row items-center justify-between gap-2 sm:gap-0 w-full">
          <span className="font-poppins font-black text-[10px] sm:text-xs md:text-sm text-white">
            Rs {currentPrice}
          </span>

          <div className="relative flex items-center h-8">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add-btn"
                  onClick={() => onAdd(product.id, isDrink ? selectedSize : undefined)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-full flex items-center gap-1 text-[8px] sm:text-[9px] font-poppins font-black uppercase text-[#0a0a0a] bg-brand shadow-[0_3px_10px_rgba(245,196,0,0.15)] hover:shadow-[0_3px_15px_rgba(245,196,0,0.3)] transition-all duration-300 cursor-pointer select-none"
                >
                  <span>Add</span>
                </motion.button>
              ) : (
                <motion.div
                  key="qty-ctrl"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-1 py-0.5 rounded-full h-8 bg-white/[0.03] border border-white/[0.06]"
                >
                  <button
                    onClick={() => onRemove(product.id, isDrink ? selectedSize : undefined)}
                    className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-[9px] leading-none font-bold">-</span>
                  </button>
                  <span className="font-poppins font-black text-[9px] text-white min-w-[8px] text-center select-none font-sans">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onAdd(product.id, isDrink ? selectedSize : undefined)}
                    className="w-5 h-5 rounded-full flex items-center justify-center bg-brand text-[#0a0a0a] hover:bg-brand/90 transition-colors cursor-pointer"
                  >
                    <span className="text-[9px] leading-none font-bold">+</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
