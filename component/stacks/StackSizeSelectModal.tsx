"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { Product } from "@/component/menu/MenuSection";
import { STACK_BREAD_SIZE_OPTIONS } from "./stackBreadSizeOptions";
import type { StackBreadSize } from "./stackSizes";
import { formatStackPriceFrom } from "./stackPricing";

const cardVariants = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
  hover: {
    y: -3,
    scale: 1.02,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

interface StackSizeSelectModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSelectSize: (size: StackBreadSize) => void;
}

export default function StackSizeSelectModal({
  isOpen,
  product,
  onClose,
  onSelectSize,
}: StackSizeSelectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pendingSize, setPendingSize] = useState<StackBreadSize | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setPendingSize(null);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSizePick = useCallback(
    (size: StackBreadSize) => {
      setPendingSize(size);
      window.setTimeout(() => {
        onSelectSize(size);
        setPendingSize(null);
      }, 220);
    },
    [onSelectSize],
  );

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.button
            type="button"
            aria-label="Close size selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="stack-size-title"
            initial={isMobile ? { y: "100%" } : { y: "100%", x: "-50%", opacity: 0.6 }}
            animate={
              isMobile
                ? { y: 0 }
                : { y: "-50%", x: "-50%", opacity: 1 }
            }
            exit={isMobile ? { y: "100%" } : { y: "100%", x: "-50%", opacity: 0 }}
            style={
              isMobile
                ? { bottom: 0, left: 0, right: 0 }
                : { top: "50%", left: "50%" }
            }
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className={`fixed z-[310] w-full bg-dark-secondary/[0.97] border-brand/25 backdrop-blur-2xl shadow-[0_-16px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ${
              isMobile
                ? "border-t rounded-t-[28px] max-h-[92vh]"
                : "border rounded-[28px] max-h-[90vh] md:max-w-lg"
            }`}
          >
            {isMobile && (
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-3 flex-shrink-0" />
            )}

            <div className="overflow-y-auto px-5 sm:px-6 pb-6 pt-2 sm:pt-5 scrollbar-none">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex-shrink-0 overflow-hidden"
                    style={{
                      boxShadow: `0 0 32px ${product.accentColor}22`,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-poppins font-black uppercase tracking-[0.2em] text-brand mb-1">
                      Choose size
                    </p>
                    <h2
                      id="stack-size-title"
                      className="font-poppins font-black text-lg sm:text-xl text-white uppercase tracking-wide truncate"
                    >
                      {product.name}
                    </h2>
                    <p className="text-xs text-white/45 font-sans mt-0.5">
                      {formatStackPriceFrom()}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-white/50 text-xs sm:text-sm text-center mb-5 font-sans leading-relaxed">
                Pick your bread length before we stack it up.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STACK_BREAD_SIZE_OPTIONS.map((option, index) => {
                  const isSelected = pendingSize === option.id;
                  const themeColor = isSelected ? "#F5C400" : "rgba(255, 255, 255, 0.45)";

                  return (
                    <motion.button
                      type="button"
                      key={option.id}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSizePick(option.id)}
                      disabled={pendingSize !== null}
                      className={`cursor-pointer p-5 sm:p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group min-h-[200px] justify-center disabled:opacity-80 ${
                        isSelected
                          ? "border-brand shadow-[0_0_28px_rgba(245,196,0,0.25)] bg-brand/[0.04]"
                          : "border-white/[0.08] hover:border-white/25 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white/50">
                        {option.length}
                      </span>

                      <div className="relative h-16 flex items-center justify-center mb-4">
                        {option.icon(themeColor)}
                      </div>

                      <h3 className="font-poppins font-black text-base uppercase text-white tracking-wide flex items-center gap-2 mb-1.5">
                        {option.name}
                        {isSelected && <span className="text-brand text-xs">✓</span>}
                      </h3>
                      <p className="font-poppins font-black text-sm text-brand mb-1.5">
                        Rs {option.price.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans max-w-[220px]">
                        {option.desc}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
