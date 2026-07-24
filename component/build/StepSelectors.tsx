"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  BREADS,
  PROTEINS,
  VEGGIES,
  CHEESES,
  SAUCES,
  BreadOption,
  BunOption,
  ProteinOption,
  VeggieOption,
  CheeseOption,
  SauceOption,
} from "./ingredients";

// Card animation variants
const cardVariants = {
  initial: { opacity: 0, y: 15, scale: 0.96 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 }
  },
  hover: { 
    y: -4, 
    scale: 1.02,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  tap: { scale: 0.98 },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Step 1: Bun Selector
   ─────────────────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────────────────
   Step 1: Bread Size Selector (NEW)
   ─────────────────────────────────────────────────────────────────────────── */
interface BreadSizeSelectorProps {
  selectedSize: "6 Inches" | "Foot Long" | null;
  onSelect: (size: "6 Inches" | "Foot Long") => void;
}

export function BreadSizeSelector({ selectedSize, onSelect }: BreadSizeSelectorProps) {
  const sizes = [
    {
      id: "6 Inches",
      name: "6 Inches",
      desc: "Perfect snack size, split in half.",
      icon: (color: string) => (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="56" height="20" rx="10" fill="none" stroke={color} strokeWidth="2.5" />
          <line x1="16" y1="5" x2="16" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="30" y1="5" x2="30" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="44" y1="5" x2="44" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
      length: "6\" / ~15cm"
    },
    {
      id: "Foot Long",
      name: "Foot Long",
      desc: "For the big hunger. The legendary 12-inch full size.",
      icon: (color: string) => (
        <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="96" height="20" rx="10" fill="none" stroke={color} strokeWidth="2.5" />
          <line x1="20" y1="5" x2="20" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="38" y1="5" x2="38" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="56" y1="5" x2="56" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="74" y1="5" x2="74" y2="25" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
      length: "12\" / ~30cm"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-4 select-none">
      <h3 className="font-poppins font-black text-2xl sm:text-3xl text-white uppercase text-center mb-2 tracking-wide">
        Select Your Bread Size
      </h3>
      <p className="text-white/50 text-xs sm:text-sm text-center mb-8 font-sans max-w-md leading-relaxed">
        Choose the perfect length for your appetite.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-2">
        {sizes.map((s) => {
          const isSelected = selectedSize === s.id;
          const themeColor = isSelected ? "#F5C400" : "rgba(255, 255, 255, 0.4)";

          return (
            <motion.div
              key={s.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSelect(s.id as "6 Inches" | "Foot Long")}
              className={`cursor-pointer p-6 sm:p-8 rounded-3xl border bg-white/[0.01] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group min-h-[220px] justify-center ${
                isSelected
                  ? "border-brand shadow-[0_0_32px_rgba(245,196,0,0.2)] bg-brand/[0.03]"
                  : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
              }`}
            >
              {isSelected && (
                <div className="absolute inset-0 pointer-events-none bg-brand/[0.01] shadow-inner" />
              )}

              <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white/50 group-hover:text-white/80 transition-colors">
                {s.length}
              </span>

              <div className="relative h-20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                {s.icon(themeColor)}
              </div>

              <h4 className="font-poppins font-black text-lg uppercase text-white tracking-wide flex items-center gap-2 mb-2">
                {s.name}
                {isSelected && <span className="text-brand text-xs">✓</span>}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[220px]">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 2: Bun Selector
   ─────────────────────────────────────────────────────────────────────────── */
interface BunSelectorProps {
  selectedBreadType: BreadOption | null;
  selectedBreadSize: "6 Inches" | "Foot Long" | null;
  onSelect: (bread: BreadOption) => void;
}

export function BunSelector({ selectedBreadType, selectedBreadSize, onSelect }: BunSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {BREADS.map((bread) => {
        const isSelected = selectedBreadType?.id === bread.id;
        const imageUrl = selectedBreadSize === "Foot Long" ? bread.imageFootLong : bread.image6Inch;

        return (
          <motion.div
            key={bread.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelect(bread)}
            className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group select-none ${
              isSelected
                ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            {/* Selected Indicator Glow */}
            {isSelected && (
              <div className="absolute inset-0 pointer-events-none bg-brand/[0.01] shadow-inner" />
            )}

            {/* Bun size tag */}
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white/50 group-hover:text-white/80 transition-colors">
              {selectedBreadSize || "Length"}
            </span>

            {/* Visual Frame */}
            <div className="relative w-full h-40 sm:h-48 flex items-center justify-center mb-4 select-none">
              <div className="relative w-[95%] h-[95%] filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={imageUrl}
                  alt={bread.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Typography */}
            <div className="w-full text-left">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight flex items-center gap-2">
                {bread.name}
                {isSelected && <span className="text-brand text-xs">✓</span>}
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans mt-2 line-clamp-2">
                {bread.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 2: Protein Selector
   ─────────────────────────────────────────────────────────────────────────── */
interface ProteinSelectorProps {
  selectedProteins: ProteinOption[];
  onToggle: (protein: ProteinOption) => void;
}

export function ProteinSelector({ selectedProteins, onToggle }: ProteinSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {PROTEINS.map((protein) => {
        const isSelected = selectedProteins.some((p) => p.id === protein.id);

        return (
          <motion.div
            key={protein.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onToggle(protein)}
            className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex gap-4 items-center text-left transition-all duration-300 relative overflow-hidden group select-none ${
              isSelected
                ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            {/* Checkbox badge */}
            <div className={`absolute top-3 right-3 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-300 ${
              isSelected 
                ? "bg-brand border-brand text-[#0a0a0a]" 
                : "border-white/20 bg-white/[0.02]"
            }`}>
              {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
            </div>

            {/* Visual Container */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden shadow-inner group-hover:bg-white/[0.04] transition-colors">
              <div className="relative w-[92%] h-[92%] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] group-hover:scale-108 transition-transform duration-300">
                <Image
                  src={protein.image}
                  alt={protein.name}
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Typography Details */}
            <div className="flex-grow min-w-0 pr-6">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight flex items-center gap-2">
                {protein.name}
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans mt-2 line-clamp-2">
                {protein.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 3: Veggies Selector (Multiselect)
   ─────────────────────────────────────────────────────────────────────────── */
interface VeggieSelectorProps {
  selectedVeggies: VeggieOption[];
  onToggle: (veggie: VeggieOption) => void;
}

export function VeggieSelector({ selectedVeggies, onToggle }: VeggieSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
      {VEGGIES.map((veg) => {
        const isSelected = selectedVeggies.some((v) => v.id === veg.id);

        return (
          <motion.div
            key={veg.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onToggle(veg)}
            className={`cursor-pointer p-3 rounded-xl border bg-white/[0.01] backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 relative select-none ${
              isSelected
                ? "border-brand shadow-[0_0_16px_rgba(245,196,0,0.12)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.02]"
            }`}
          >
            {/* Checkbox badge */}
            <div className={`absolute top-2 right-2 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-300 ${
              isSelected 
                ? "bg-brand border-brand text-[#0a0a0a]" 
                : "border-white/20 bg-white/[0.02]"
            }`}>
              {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
            </div>

            {/* Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-2 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <Image
                src={veg.image}
                alt={veg.name}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <h3 className="font-poppins font-black text-xs uppercase text-white tracking-wide leading-none">
              {veg.name}
            </h3>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 4: Cheese Selector
   ─────────────────────────────────────────────────────────────────────────── */
interface CheeseSelectorProps {
  selectedCheese: CheeseOption | null;
  onSelect: (cheese: CheeseOption | null) => void;
}

export function CheeseSelector({ selectedCheese, onSelect }: CheeseSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {/* 1. None Option */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={() => onSelect(null)}
        className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[180px] transition-all duration-300 relative select-none ${
          selectedCheese === null
            ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
            : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
        }`}
      >
        <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/40 mb-4 text-xl">
          ∅
        </div>
        <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide">
          No Cheese
        </h3>
        <p className="text-[10px] text-white/40 font-sans mt-2">
          Skip cheese additions.
        </p>
      </motion.div>

      {/* Cheese list options */}
      {CHEESES.map((cheese) => {
        const isSelected = selectedCheese?.id === cheese.id;

        return (
          <motion.div
            key={cheese.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelect(cheese)}
            className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group select-none ${
              isSelected
                ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            {/* Image visual */}
            <div className="relative w-full h-24 flex items-center justify-center mb-4 select-none">
              <div className="relative w-[75%] h-[75%] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={cheese.image}
                  alt={cheese.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="w-full text-left">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight flex items-center gap-2">
                {cheese.name}
                {isSelected && <span className="text-brand text-xs">✓</span>}
              </h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-sans mt-1.5 line-clamp-2">
                {cheese.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Step 5: Sauces Selector (Multiselect)
   ─────────────────────────────────────────────────────────────────────────── */
interface SauceSelectorProps {
  selectedSauces: SauceOption[];
  onToggle: (sauce: SauceOption) => void;
}

export function SauceSelector({ selectedSauces, onToggle }: SauceSelectorProps) {
  const getIntensityColor = (intensity: "Mild" | "Medium" | "High") => {
    switch (intensity) {
      case "Mild":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Medium":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "High":
        return "bg-red-500/10 text-red-400 border-red-500/20";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {SAUCES.map((sauce) => {
        const isSelected = selectedSauces.some((s) => s.id === sauce.id);

        return (
          <motion.div
            key={sauce.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onToggle(sauce)}
            className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex gap-4 items-center text-left transition-all duration-300 relative overflow-hidden group select-none ${
              isSelected
                ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            {/* Selection indicator checkbox */}
            <div className={`absolute top-3 right-3 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-300 ${
              isSelected 
                ? "bg-brand border-brand text-[#0a0a0a]" 
                : "border-white/20 bg-white/[0.02]"
            }`}>
              {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
            </div>

            {/* Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden shadow-inner">
              <div className="relative w-[98%] h-[98%] filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:scale-106 transition-transform duration-300">
                <Image
                  src={sauce.image}
                  alt={sauce.name}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-grow min-w-0 pr-6">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight">
                {sauce.name}
              </h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-sans mt-1">
                {sauce.flavor}
              </p>
              
              <div className="flex gap-2 mt-2 items-center">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${getIntensityColor(sauce.intensity)}`}>
                  {sauce.intensity} Kick
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

