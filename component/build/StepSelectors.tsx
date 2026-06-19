"use client";

import { motion, AnimatePresence } from "motion/react";
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

/* ─────────────────────────────────────────────────────────────────────────────
   Step 6: Toast Preference Selector (NEW)
   ─────────────────────────────────────────────────────────────────────────── */
interface ToastSelectorProps {
  selectedToast: "Toasted" | "Not Toasted" | null;
  onSelect: (toast: "Toasted" | "Not Toasted") => void;
}

export function ToastSelector({ selectedToast, onSelect }: ToastSelectorProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-4 select-none">
      {/* Centered Heading */}
      <h3 className="font-poppins font-black text-2xl sm:text-3xl text-white uppercase text-center mb-2 tracking-wide">
        How Would You Like Your Stack?
      </h3>
      <p className="text-white/50 text-xs sm:text-sm text-center mb-8 font-sans max-w-md leading-relaxed">
        Choose your final customization finish. Warm toasted crunch or soft fresh preparation.
      </p>

      {/* Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-2">
        {/* 1. Toasted Option */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={() => onSelect("Toasted")}
          className={`cursor-pointer p-6 sm:p-8 rounded-3xl border bg-white/[0.01] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group min-h-[220px] justify-center ${
            selectedToast === "Toasted"
              ? "border-brand shadow-[0_0_32px_rgba(245,196,0,0.2)] bg-brand/[0.03]"
              : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
          }`}
        >
          {/* Animated Glow Accent */}
          {selectedToast === "Toasted" && (
            <motion.div
              layoutId="toastGlow"
              className="absolute inset-0 bg-brand/[0.01] pointer-events-none"
            />
          )}

          {/* Icon visual using SVG for premium micro-animation */}
          <div className="relative w-16 h-16 flex items-center justify-center mb-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl group-hover:scale-105 transition-transform duration-300">
            {/* Animated Fire Flame SVG */}
            <motion.svg
              animate={selectedToast === "Toasted" ? { y: [0, -3, 0], scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke={selectedToast === "Toasted" ? "#F5C400" : "rgba(255,255,255,0.4)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </motion.svg>
          </div>

          <h4 className="font-poppins font-black text-lg uppercase text-white tracking-wide flex items-center gap-2 mb-2">
            🔥 Toasted
            {selectedToast === "Toasted" && <span className="text-brand text-sm">✓</span>}
          </h4>
          <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[220px]">
            Crispy, warm, and lightly toasted for extra texture and flavor.
          </p>
        </motion.div>

        {/* 2. Not Toasted Option */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={() => onSelect("Not Toasted")}
          className={`cursor-pointer p-6 sm:p-8 rounded-3xl border bg-white/[0.01] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group min-h-[220px] justify-center ${
            selectedToast === "Not Toasted"
              ? "border-brand shadow-[0_0_32px_rgba(245,196,0,0.2)] bg-brand/[0.03]"
              : "border-white/[0.06] hover:border-white/20 hover:bg-white/[0.03]"
          }`}
        >
          {/* Animated Glow Accent */}
          {selectedToast === "Not Toasted" && (
            <motion.div
              layoutId="toastGlow"
              className="absolute inset-0 bg-brand/[0.01] pointer-events-none"
            />
          )}

          {/* Icon visual using SVG for premium micro-animation */}
          <div className="relative w-16 h-16 flex items-center justify-center mb-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl group-hover:scale-105 transition-transform duration-300">
            {/* Animated Twinkling Sparkles SVG */}
            <motion.svg
              animate={selectedToast === "Not Toasted" ? { rotate: [0, 15, 0], scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke={selectedToast === "Not Toasted" ? "#F5C400" : "rgba(255,255,255,0.4)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            >
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.22-6.78l-2.12 2.12m-9.9 9.9l-2.12 2.12m14.14 0l-2.12-2.12M6.34 6.34l-2.12-2.12" />
            </motion.svg>
          </div>

          <h4 className="font-poppins font-black text-lg uppercase text-white tracking-wide flex items-center gap-2 mb-2">
            ✨ Not Toasted
            {selectedToast === "Not Toasted" && <span className="text-brand text-sm">✓</span>}
          </h4>
          <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[220px]">
            Soft, fresh, and served exactly as prepared.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
