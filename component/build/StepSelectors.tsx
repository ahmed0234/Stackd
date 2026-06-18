"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  BUNS,
  PROTEINS,
  VEGGIES,
  CHEESES,
  SAUCES,
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
interface BunSelectorProps {
  selectedBun: BunOption | null;
  onSelect: (bun: BunOption) => void;
}

export function BunSelector({ selectedBun, onSelect }: BunSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {BUNS.map((bun) => {
        const isSelected = selectedBun?.id === bun.id;

        return (
          <motion.div
            key={bun.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelect(bun)}
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
              {bun.size === "Full" ? "12-Inch" : "6-Inch"}
            </span>

            {/* Visual Frame */}
            <div className="relative w-full h-32 flex items-center justify-center mb-4 select-none">
              <div className="relative w-[90%] h-[90%] filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={bun.image}
                  alt={bun.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Typography */}
            <div className="w-full text-left">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight flex items-center gap-2">
                {bun.name}
                {isSelected && <span className="text-brand text-xs">✓</span>}
              </h3>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans mt-2 line-clamp-2">
                {bun.description}
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
  selectedProtein: ProteinOption | null;
  onSelect: (protein: ProteinOption) => void;
}

export function ProteinSelector({ selectedProtein, onSelect }: ProteinSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {PROTEINS.map((protein) => {
        const isSelected = selectedProtein?.id === protein.id;

        return (
          <motion.div
            key={protein.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelect(protein)}
            className={`cursor-pointer p-4 rounded-2xl border bg-white/[0.01] backdrop-blur-md flex gap-4 items-center text-left transition-all duration-300 relative overflow-hidden group select-none ${
              isSelected
                ? "border-brand shadow-[0_0_24px_rgba(245,196,0,0.15)] bg-brand/[0.02]"
                : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            {/* Visual Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden shadow-inner group-hover:bg-white/[0.04] transition-colors">
              <div className="relative w-[92%] h-[92%] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] group-hover:scale-108 transition-transform duration-300">
                <Image
                  src={protein.image}
                  alt={protein.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Typography Details */}
            <div className="flex-grow min-w-0">
              <h3 className="font-poppins font-black text-sm uppercase text-white tracking-wide leading-tight flex items-center gap-2">
                {protein.name}
                {isSelected && <span className="text-brand text-xs">✓</span>}
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
            <div className="relative w-16 h-16 sm:w-[76px] sm:h-[76px] flex items-center justify-center mb-2 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
              <Image
                src={veg.image}
                alt={veg.name}
                fill
                sizes="(max-width: 640px) 64px, 76px"
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
              <div className="relative w-[88%] h-[88%] filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:scale-106 transition-transform duration-300">
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
