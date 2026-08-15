"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export interface DipChoice {
  id: string;
  name: string;
  image: string;
  desc: string;
  accent: string;
}

export const ZINGER_DIP_OPTIONS: DipChoice[] = [
  {
    id: "garlic-mayo",
    name: "Garlic Mayo",
    image: "/BuildYourStack/Sauces/GarlicMayo.webp",
    desc: "Creamy whipped mayonnaise infused with rich roasted garlic.",
    accent: "#F5C400",
  },
  {
    id: "honey-mustard",
    name: "Honey Mustard",
    image: "/BuildYourStack/Sauces/Honey Mustard.webp",
    desc: "Perfect harmony of sweet pure honey and zesty mustard.",
    accent: "#EAB308",
  },
  {
    id: "chipotle",
    name: "Chipotle",
    image: "/BuildYourStack/Sauces/Chipotle.webp",
    desc: "Smoky, creamy chipotle pepper blend with a gentle kick.",
    accent: "#EA580C",
  },
  {
    id: "bbq",
    name: "BBQ",
    image: "/BuildYourStack/Sauces/BBQ.webp",
    desc: "Rich, deep-smoked hickory BBQ sauce with molasses notes.",
    accent: "#9A3412",
  },
  {
    id: "nachos-cheese",
    name: "Nachos Cheese Sauce",
    image: "/BuildYourStack/Cheese/Nachoscheesesauce.webp",
    desc: "Rich, velvety melted cheddar cheese sauce for dipping.",
    accent: "#F59E0B",
  },
  {
    id: "buffalo",
    name: "Buffalo",
    image: "/BuildYourStack/Sauces/Buffalo.webp",
    desc: "Fiery, tangy cayenne pepper sauce with a buttery finish.",
    accent: "#EF4444",
  },
  {
    id: "thousand-island",
    name: "Thousand Island",
    image: "/BuildYourStack/Sauces/Thousand.webp",
    desc: "Creamy classic thousand island dressing with relish notes.",
    accent: "#FB7185",
  },
  {
    id: "mustard",
    name: "Mustard",
    image: "/BuildYourStack/Sauces/Mustard.webp",
    desc: "Classic sharp, tangy yellow mustard with bold spice.",
    accent: "#CA8A04",
  },
];

interface ZingerDipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedDipName: string) => void;
}

export default function ZingerDipModal({
  isOpen,
  onClose,
  onConfirm,
}: ZingerDipModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDipId, setSelectedDipId] = useState<string | null>(null);

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
      setSelectedDipId(null);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelectDip = (id: string) => {
    setSelectedDipId(id);
  };

  const handleConfirm = () => {
    if (!selectedDipId) return;
    const dip = ZINGER_DIP_OPTIONS.find((d) => d.id === selectedDipId);
    if (dip) {
      onConfirm(dip.name);
      onClose();
    }
  };

  if (!mounted) return null;

  const selectedDip = ZINGER_DIP_OPTIONS.find((d) => d.id === selectedDipId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close dip selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="zinger-dip-title"
            initial={
              isMobile
                ? { y: "100%" }
                : { y: "100%", x: "-50%", opacity: 0.6 }
            }
            animate={
              isMobile
                ? { y: 0 }
                : { y: "-50%", x: "-50%", opacity: 1 }
            }
            exit={
              isMobile
                ? { y: "100%" }
                : { y: "100%", x: "-50%", opacity: 0 }
            }
            style={
              isMobile
                ? { bottom: 0, left: 0, right: 0 }
                : { top: "50%", left: "50%" }
            }
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className={`fixed z-[310] w-full bg-[#121212]/[0.98] border-brand/30 backdrop-blur-2xl shadow-[0_-16px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col ${
              isMobile
                ? "border-t rounded-t-[28px] max-h-[92vh]"
                : "border rounded-[28px] max-h-[88vh] md:max-w-2xl"
            }`}
          >
            {/* Mobile Drag Indicator */}
            {isMobile && (
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-3 flex-shrink-0" />
            )}

            {/* Header Section */}
            <div className="px-5 sm:px-6 pt-3 sm:pt-6 pb-4 border-b border-white/[0.06] flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-brand/30 flex-shrink-0 overflow-hidden shadow-[0_0_20px_rgba(245,196,0,0.2)]">
                    <Image
                      src="/appetizer/ZingerStrips.webp"
                      alt="Zinger Strips"
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/25 text-brand text-[9px] font-poppins font-black uppercase tracking-wider mb-1">
                      <span>✨</span> 1 Free Dip Included
                    </div>
                    <h2
                      id="zinger-dip-title"
                      className="font-poppins font-black text-lg sm:text-xl text-white uppercase tracking-wide truncate"
                    >
                      Chicken Strips
                    </h2>
                    <p className="text-xs text-white/50 font-sans">
                      Rs 349 • Served with stacked crispy fries/chips
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Free Dip Callout Notice */}
              <div className="mt-3.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-brand/[0.08] via-brand/[0.04] to-transparent border border-brand/20 flex items-center gap-2.5 text-left">
                <span className="text-base sm:text-lg flex-shrink-0">🥣</span>
                <p className="text-[11px] sm:text-xs text-white/80 font-sans leading-relaxed">
                  <strong className="text-brand font-poppins uppercase tracking-wide">
                    Free Dipping Sauce:
                  </strong>{" "}
                  One dip is included for free with your Zinger Strips. Please choose <strong>1 dip</strong> below.
                </p>
              </div>
            </div>

            {/* Scrollable Dip Options Grid */}
            <div className="overflow-y-auto px-5 sm:px-6 py-4 flex-grow scrollbar-none">
              <div className="flex items-center justify-between mb-3 text-left">
                <span className="font-poppins font-black text-xs uppercase tracking-wider text-white/70">
                  Select Dipping Sauce (Choose 1)
                </span>
                {selectedDip ? (
                  <span className="text-[11px] font-sans font-bold text-green-400 flex items-center gap-1">
                    ✓ {selectedDip.name} selected
                  </span>
                ) : (
                  <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-brand/70 animate-pulse">
                    Selection Required
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {ZINGER_DIP_OPTIONS.map((dip) => {
                  const isSelected = selectedDipId === dip.id;

                  return (
                    <div
                      key={dip.id}
                      onClick={() => handleSelectDip(dip.id)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-250 flex items-center gap-3.5 border select-none text-left group ${
                        isSelected
                          ? "border-brand bg-brand/[0.08] shadow-[0_0_24px_rgba(245,196,0,0.22)] scale-[1.01]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      {/* Dip Thumbnail */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/40 border border-white/[0.08] flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{ backgroundColor: dip.accent }}
                        />
                        <Image
                          src={dip.image}
                          alt={dip.name}
                          fill
                          sizes="56px"
                          className="object-contain p-1 group-hover:scale-108 transition-transform duration-200"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-grow min-w-0 pr-6">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4
                            className={`font-poppins font-black text-xs sm:text-sm uppercase tracking-wide truncate ${
                              isSelected ? "text-brand" : "text-white group-hover:text-white/90"
                            }`}
                          >
                            {dip.name}
                          </h4>
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-poppins font-black uppercase tracking-wider bg-brand text-[#0a0a0a]">
                            FREE
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-white/45 font-sans line-clamp-2 leading-relaxed">
                          {dip.desc}
                        </p>
                      </div>

                      {/* Custom Radio Button Indicator */}
                      <div
                        className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "border-brand bg-brand text-[#0a0a0a] shadow-[0_0_10px_rgba(245,196,0,0.5)]"
                            : "border-white/20 bg-white/[0.02] group-hover:border-white/40"
                        }`}
                      >
                        {isSelected && (
                          <span className="text-[10px] font-black leading-none">✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06] bg-black/40 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="text-left font-sans">
                <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/40 block">
                  Total (1 Item + Free Dip)
                </span>
                <span className="font-poppins font-black text-lg sm:text-xl text-white">
                  Rs 349
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedDipId}
                className={`px-6 py-3 rounded-xl font-poppins font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 select-none ${
                  selectedDipId
                    ? "bg-brand hover:bg-brand-dim text-[#0a0a0a] shadow-[0_4px_20px_rgba(245,196,0,0.35)] hover:scale-103 active:scale-97 cursor-pointer"
                    : "bg-white/[0.06] text-white/30 border border-white/[0.06] cursor-not-allowed"
                }`}
              >
                <span>{selectedDipId ? "Add to Cart" : "Select a Dip"}</span>
                {selectedDipId && <span>&rarr;</span>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
