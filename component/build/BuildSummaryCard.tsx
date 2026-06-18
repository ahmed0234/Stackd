"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BunOption, ProteinOption, VeggieOption, CheeseOption, SauceOption } from "./ingredients";

interface BuildSummaryCardProps {
  selectedBun: BunOption | null;
  selectedProtein: ProteinOption | null;
  selectedVeggies: VeggieOption[];
  selectedCheese: CheeseOption | null;
  selectedSauces: SauceOption[];
  currentStep: number;
  fixedPrice: number;
}

export default function BuildSummaryCard({
  selectedBun,
  selectedProtein,
  selectedVeggies,
  selectedCheese,
  selectedSauces,
  currentStep,
  fixedPrice,
}: BuildSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Spacing and Spacers Progress calculation
  const calculateProgress = () => {
    let progress = 0;
    if (selectedBun) progress += 20;
    if (selectedProtein) progress += 20;
    if (currentStep > 3 || selectedVeggies.length > 0) progress += 20;
    if (currentStep > 4 || selectedCheese !== null) progress += 20;
    if (currentStep > 5 || selectedSauces.length > 0) progress += 20;
    return Math.min(progress, 100);
  };

  const progress = calculateProgress();

  // Dynamic Layer count
  const layerCount =
    (selectedBun ? 2 : 0) +
    (selectedProtein ? 1 : 0) +
    (selectedCheese ? 1 : 0) +
    selectedVeggies.length +
    selectedSauces.length;

  const renderChecklist = () => (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">Step Checklist</span>
        <span className="font-poppins font-black text-brand">{progress}% Completed</span>
      </div>
      
      {/* Sleek Progress Bar */}
      <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-brand rounded-full"
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 pt-2">
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className={selectedBun ? "text-brand" : "text-white/20"}>
            {selectedBun ? "✓" : "○"}
          </span>
          <span className={selectedBun ? "text-white/80" : "text-white/30"}>Artisan Bun</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className={selectedProtein ? "text-brand" : "text-white/20"}>
            {selectedProtein ? "✓" : "○"}
          </span>
          <span className={selectedProtein ? "text-white/80" : "text-white/30"}>Protein Filling</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className={(currentStep > 3 || selectedVeggies.length > 0) ? "text-brand" : "text-white/20"}>
            {(currentStep > 3 || selectedVeggies.length > 0) ? "✓" : "○"}
          </span>
          <span className={(currentStep > 3 || selectedVeggies.length > 0) ? "text-white/80" : "text-white/30"}>Fresh Veggies</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className={(currentStep > 4 || selectedCheese !== null) ? "text-brand" : "text-white/20"}>
            {(currentStep > 4 || selectedCheese !== null) ? "✓" : "○"}
          </span>
          <span className={(currentStep > 4 || selectedCheese !== null) ? "text-white/80" : "text-white/30"}>Melty Cheese</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className={(currentStep > 5 || selectedSauces.length > 0) ? "text-brand" : "text-white/20"}>
            {(currentStep > 5 || selectedSauces.length > 0) ? "✓" : "○"}
          </span>
          <span className={(currentStep > 5 || selectedSauces.length > 0) ? "text-white/80" : "text-white/30"}>Signature Sauces</span>
        </div>
      </div>
    </div>
  );

  const renderIngredientSummary = () => (
    <div className="space-y-3 pt-4 border-t border-white/[0.04]">
      <span className="text-[10px] font-poppins font-black text-white/30 uppercase tracking-widest block">
        Active Ingredients
      </span>
      <div className="max-h-40 overflow-y-auto space-y-1.5 text-xs font-sans pr-1 scrollbar-none">
        {selectedBun && (
          <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
            <span className="text-white/40">Artisan Bun</span>
            <span className="text-white font-medium">{selectedBun.name}</span>
          </div>
        )}
        {selectedProtein && (
          <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
            <span className="text-white/40">Protein</span>
            <span className="text-white font-medium">{selectedProtein.name}</span>
          </div>
        )}
        {selectedCheese && (
          <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
            <span className="text-white/40">Cheese</span>
            <span className="text-white font-medium">{selectedCheese.name}</span>
          </div>
        )}
        {selectedVeggies.length > 0 && (
          <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-1.5">
            <span className="text-white/40">Veggies ({selectedVeggies.length})</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {selectedVeggies.map((v) => (
                <span key={v.id} className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60">
                  {v.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {selectedSauces.length > 0 && (
          <div className="flex flex-col gap-1 border-b border-white/[0.02] pb-1.5">
            <span className="text-white/40">Sauces ({selectedSauces.length})</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {selectedSauces.map((s) => (
                <span key={s.id} className="bg-brand/10 border border-brand/20 px-1.5 py-0.5 rounded text-[10px] text-brand">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {!selectedBun && !selectedProtein && (
          <p className="text-white/30 text-[11px] leading-relaxed italic">
            Select layers to begin building your stack summary...
          </p>
        )}
      </div>
    </div>
  );

  const renderLayerCounter = () => (
    <div className="space-y-2.5 pt-4 border-t border-white/[0.04]">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
        <span className="font-poppins font-black text-xs uppercase text-white tracking-wide">
          {layerCount} Layers Configured
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {selectedBun && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
            🍞 Artisan Base
          </span>
        )}
        {selectedProtein && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
            🔥 Seared Protein
          </span>
        )}
        {selectedCheese && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
            🧀 Creamy Melt
          </span>
        )}
        {selectedVeggies.length > 0 && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/60">
            🥬 Fresh Greens: {selectedVeggies.length}
          </span>
        )}
        {selectedSauces.length > 0 && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-brand/10 border border-brand/20 text-brand">
            🌶️ Sauces Active: {selectedSauces.length}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Sidebar version */}
      <div className="hidden lg:block w-full p-6 rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl relative overflow-hidden shadow-card text-left">
        {/* Glow accent */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand to-transparent" />

        <h3 className="font-poppins font-black text-lg uppercase tracking-wider text-white mb-5">
          Your STACKD Summary
        </h3>

        <div className="space-y-5">
          {renderChecklist()}
          {renderIngredientSummary()}
          {renderLayerCounter()}

          <div className="pt-5 border-t border-dashed border-white/10 flex justify-between items-baseline">
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest">
              Total Price
            </span>
            <span className="font-poppins font-black text-xl text-white">
              Rs {fixedPrice} PKR
            </span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Collapsible bottom drawer sheet */}
      <div className="block lg:hidden w-full relative z-[190]">
        {/* Collapse Trigger Toggle Header */}
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className="px-4 py-3 bg-dark-secondary border-t border-white/[0.06] backdrop-blur-2xl flex items-center justify-between cursor-pointer select-none text-left shadow-[0_-4px_16px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-poppins font-black text-xs text-[#0a0a0a]">
              {layerCount}
            </div>
            <div>
              <span className="font-poppins font-bold text-xs uppercase text-white tracking-wide block">
                Your STACKD Summary
              </span>
              <span className="text-[9px] text-white/40 block mt-0.5">
                Rs {fixedPrice} PKR | {progress}% Done
              </span>
            </div>
          </div>
          <button className="text-[10px] font-poppins font-black uppercase text-brand tracking-wider flex items-center gap-1">
            <span>{isExpanded ? "Collapse ▾" : "Expand Summary ▴"}</span>
          </button>
        </div>

        {/* Collapsible Details Drawer Body */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Internal Backdrop just below trigger but above main content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
                className="fixed inset-0 bg-black z-[-1] cursor-pointer"
              />

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-dark-secondary/95 border-t border-white/[0.04] p-5 space-y-4 overflow-y-auto max-h-[300px] text-left scrollbar-none"
              >
                {renderChecklist()}
                {renderIngredientSummary()}
                {renderLayerCounter()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
