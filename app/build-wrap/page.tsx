"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

// Configurator Components (Reused from custom builder)
import { ProteinOption, VeggieOption, CheeseOption, SauceOption } from "@/component/build/ingredients";
import BuildSummaryCard from "@/component/build/BuildSummaryCard";
import { ProteinSelector, VeggieSelector, CheeseSelector, SauceSelector } from "@/component/build/StepSelectors";
import ReviewStep from "@/component/build/ReviewStep";
import UpsellDrawer from "@/component/build/UpsellDrawer";
import {
  formatByoPrice,
  getByoWrapPrice,
} from "@/component/build/buildYourOwnPricing";

const STEPS = [
  { num: 1, title: "Protein", desc: "Choose filling" },
  { num: 2, title: "Cheese", desc: "Select cheese" },
  { num: 3, title: "Veggies", desc: "Add crunch" },
  { num: 4, title: "Sauces", desc: "Flavor kick" },
  { num: 5, title: "Review", desc: "Review wrap" },
];

export default function BuildWrapPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Ingredients State
  const [selectedProteins, setSelectedProteins] = useState<ProteinOption[]>([]);
  const [selectedVeggies, setSelectedVeggies] = useState<VeggieOption[]>([]);
  const [selectedCheese, setSelectedCheese] = useState<CheeseOption | null>(null);
  const [selectedSauces, setSelectedSauces] = useState<SauceOption[]>([]);

  // Cart & Drawer States
  const addCustomItem = useCartStore((state) => state.addCustomItem);
  const cartItems = useCartStore((state) => state.items);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center text-white/50 font-poppins text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span>Setting up prep table...</span>
        </div>
      </div>
    );
  }

  // Next / Prev Navigation
  const handleNext = () => {
    // Validation: step 1 requires protein selection
    if (currentStep === 1 && selectedProteins.length === 0) return;

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Ingredient Toggles
  const handleProteinToggle = (protein: ProteinOption) => {
    setSelectedProteins((prev) =>
      prev.some((p) => p.id === protein.id)
        ? prev.filter((p) => p.id !== protein.id)
        : [...prev, protein]
    );
  };

  const handleVeggieToggle = (veg: VeggieOption) => {
    setSelectedVeggies((prev) =>
      prev.some((v) => v.id === veg.id)
        ? prev.filter((v) => v.id !== veg.id)
        : [...prev, veg]
    );
  };

  const handleSauceToggle = (sauce: SauceOption) => {
    setSelectedSauces((prev) =>
      prev.some((s) => s.id === sauce.id)
        ? prev.filter((s) => s.id !== sauce.id)
        : [...prev, sauce]
    );
  };

  // Add Custom Wrap to Zustand Cart
  const handleCompleteWrap = () => {
    if (selectedProteins.length === 0) return;

    const customCount =
      Object.values(cartItems).filter((item) => item.id === "byo-wrap").length + 1;
    const sizeName = `Custom Wrap #${customCount}`;
    const timestampKey = `byo-wrap::${Date.now()}`;

    const proteinName = selectedProteins.map((p) => p.name).join(", ");

    const customCartItem = {
      id: "byo-wrap",
      key: timestampKey,
      name: "Build Your Own Wrap",
      image: "/Wraps/buildyourownwrap.webp",
      price: getByoWrapPrice(),
      size: sizeName,
      quantity: 1,
      accentColor: "#A855F7",
      customization: {
        bun: "Warm Flour Tortilla",
        protein: proteinName,
        veggies: selectedVeggies.map((v) => v.name),
        cheese: selectedCheese ? selectedCheese.name : null,
        sauces: selectedSauces.map((s) => s.name),
      },
    };

    // Store in Zustand cart
    addCustomItem(customCartItem);

    // Open upsell modal
    setIsUpsellOpen(true);
  };

  // Form step validation
  const isNextDisabled = () => {
    if (currentStep === 1 && selectedProteins.length === 0) return true;
    return false;
  };

  return (
    <div
      className="min-h-screen w-full bg-dark-primary pt-32 pb-52 md:pb-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-dark-primary) 0%, var(--color-dark-secondary) 100%)",
      }}
    >
      {/* Background Blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none left-[-15%] top-[10%] z-0"
        style={{ background: "var(--color-brand)" }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none right-[-15%] bottom-[10%] z-0"
        style={{ background: "#A855F7" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10 text-left">
        {/* Navigation back */}
        <Link
          href="/#menu"
          className="inline-flex items-center gap-2 text-xs font-poppins font-black uppercase tracking-wider text-brand/80 hover:text-brand hover:translate-x-[-4px] transition-all duration-300 mb-4 cursor-pointer"
        >
          &larr; Back to Menu
        </Link>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-8">
            <span className="px-3 py-1 rounded-full bg-brand/[0.08] border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest font-poppins mb-4 inline-block">
              Wrap Architect
            </span>
            <h1 className="text-4xl sm:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-none mb-4">
              Build Your Own <span className="text-brand">WRAP</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
              Craft your signature wrap layer by layer. Choose your grilled chicken and protein fillings, melty cheese, crunchy fresh veggies, and signature drizzles wrapped tight in a warm toasted tortilla.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full lg:w-auto p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center justify-between lg:justify-end gap-6 min-w-[240px] shadow-card">
              <div className="text-left">
                <span className="text-[9px] font-poppins font-black text-white/30 uppercase tracking-widest block">
                  Fixed Wrap Price
                </span>
                <span className="font-poppins font-black text-white text-2xl">
                  {formatByoPrice(getByoWrapPrice())} PKR
                </span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-brand/10 text-brand text-[10px] font-poppins font-black uppercase tracking-widest border border-brand/20">
                Custom Choice
              </div>
            </div>
          </div>
        </div>

        {/* Steps Progress Indicator bar */}
        <div className="relative w-full mb-12">
          {/* Timeline indicator: full steps grid on desktop/tablet */}
          <div className="hidden md:block relative w-full">
            {/* Progress bar background line */}
            <div className="absolute top-[22px] left-8 right-8 h-[2px] bg-white/[0.04] z-0" />

            {/* Progress bar filled line */}
            <div
              className="absolute top-[22px] left-8 h-[2px] bg-brand z-0 transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep - 1) / (STEPS.length - 1)) * 90}%`,
              }}
            />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {STEPS.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <div
                    key={step.num}
                    onClick={() => {
                      // Validation check before jumping
                      if (step.num > 1 && selectedProteins.length === 0) return;
                      setCurrentStep(step.num);
                    }}
                    className={`flex flex-col items-start text-left cursor-pointer group ${
                      isActive ? "pointer-events-none" : ""
                    }`}
                  >
                    {/* Step Bubble Circle */}
                    <div
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-poppins font-black text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-brand border-brand text-[#0a0a0a] shadow-[0_0_16px_rgba(245,196,0,0.3)]"
                          : isCompleted
                          ? "bg-white/[0.04] border-brand text-brand"
                          : "bg-dark-primary border-white/[0.08] text-white/30 group-hover:border-white/20 group-hover:text-white/50"
                      }`}
                    >
                      {isCompleted ? "✓" : step.num}
                    </div>

                    {/* Labels */}
                    <div className="mt-2 select-none">
                      <span
                        className={`text-[10px] font-poppins font-black uppercase tracking-wide block transition-colors duration-300 ${
                          isActive ? "text-brand" : "text-white/70"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-[9px] text-white/30 block mt-0.5">{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile compact step row */}
          <div className="block md:hidden bg-white/[0.01] border border-white/[0.05] p-4 rounded-2xl relative z-10 text-left select-none">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-brand font-poppins font-black uppercase tracking-wider">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-white/40 font-poppins text-[10px] font-bold uppercase tracking-wider">
                {STEPS[currentStep - 1].title}
              </span>
            </div>
            {/* Linear Progress bar */}
            <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02]">
              <div
                className="h-full bg-brand rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-white/30 font-sans mt-2">
              Next: {currentStep < STEPS.length ? STEPS[currentStep].title : "Add to order"}
            </p>
          </div>
        </div>

        {/* Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Configurator selectors column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-poppins font-black uppercase tracking-widest text-brand block mb-2">
                  {currentStep === 5 ? "Step 5 of 5" : `Step ${currentStep} of 4`}
                </span>
                <h2 className="text-2xl font-poppins font-black uppercase tracking-wide text-white mb-6">
                  {currentStep === 1 && "Choose Your Protein / Filling"}
                  {currentStep === 2 && "Choose Melty Cheese"}
                  {currentStep === 3 && "Select Fresh Veggies"}
                  {currentStep === 4 && "Drizzle Signature Sauces"}
                  {currentStep === 5 && "Review Your Creation"}
                </h2>

                {/* Render appropriate step sub-component */}
                <div className="w-full">
                  {currentStep === 1 && (
                    <ProteinSelector selectedProteins={selectedProteins} onToggle={handleProteinToggle} />
                  )}
                  {currentStep === 2 && (
                    <CheeseSelector selectedCheese={selectedCheese} onSelect={setSelectedCheese} />
                  )}
                  {currentStep === 3 && (
                    <VeggieSelector selectedVeggies={selectedVeggies} onToggle={handleVeggieToggle} />
                  )}
                  {currentStep === 4 && (
                    <SauceSelector selectedSauces={selectedSauces} onToggle={handleSauceToggle} />
                  )}
                  {currentStep === 5 && (
                    <ReviewStep
                      bun={null}
                      selectedProteins={selectedProteins}
                      veggies={selectedVeggies}
                      cheese={selectedCheese}
                      sauces={selectedSauces}
                      price={getByoWrapPrice()}
                      isWrap={true}
                    />
                  )}
                </div>
              </div>

              {/* Bottom Nav triggers (visible only on desktop/tablet) */}
              <div className="mt-8 pt-6 border-t border-white/[0.04] hidden lg:flex items-center justify-between w-full select-none">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-poppins font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                    currentStep === 1 ? "opacity-30 pointer-events-none" : ""
                  }`}
                >
                  &larr; Back
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className={`px-8 py-3.5 rounded-xl font-poppins font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer select-none ${
                      isNextDisabled()
                        ? "bg-white/[0.03] border border-white/[0.06] text-white/20 cursor-not-allowed"
                        : "bg-brand text-[#0a0a0a] shadow-[0_4px_16px_rgba(245,196,0,0.25)] hover:scale-102"
                    }`}
                  >
                    Next Step &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteWrap}
                    className="px-8 py-3.5 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_20px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_30px_rgba(245,196,0,0.45)] hover:scale-102 transition-all duration-300 cursor-pointer select-none animate-pulse"
                  >
                    🚀 Complete My Wrap
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right / Sticky Sidebar column (visible only on desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <BuildSummaryCard
              selectedProteins={selectedProteins}
              selectedVeggies={selectedVeggies}
              selectedCheese={selectedCheese}
              selectedSauces={selectedSauces}
              currentStep={currentStep}
              fixedPrice={getByoWrapPrice()}
              isWrap={true}
            />
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Panel (visible only on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-[190] bg-dark-secondary border-t border-white/[0.08] backdrop-blur-2xl lg:hidden flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        {/* Collapsible Mobile summary drawer */}
        <BuildSummaryCard
          selectedProteins={selectedProteins}
          selectedVeggies={selectedVeggies}
          selectedCheese={selectedCheese}
          selectedSauces={selectedSauces}
          currentStep={currentStep}
          fixedPrice={getByoWrapPrice()}
          isWrap={true}
        />

        {/* Mobile Sticky Navigation Buttons */}
        <div className="px-6 py-4 flex items-center justify-between w-full bg-dark-secondary/95 border-t border-white/[0.04] select-none gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3.5 rounded-xl border border-white/10 text-white/70 font-poppins font-extrabold text-xs uppercase tracking-wider flex-grow text-center transition-all duration-300 cursor-pointer select-none ${
              currentStep === 1 ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            &larr; Back
          </button>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className={`px-8 py-3.5 rounded-xl font-poppins font-extrabold text-xs uppercase tracking-wider flex-grow text-center flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none ${
                isNextDisabled()
                  ? "bg-white/[0.03] border border-white/[0.06] text-white/20 cursor-not-allowed"
                  : "bg-brand text-[#0a0a0a] shadow-[0_4px_16px_rgba(245,196,0,0.25)]"
              }`}
            >
              Next Step &rarr;
            </button>
          ) : (
            <button
              onClick={handleCompleteWrap}
              className="px-8 py-3.5 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-extrabold text-xs uppercase tracking-widest flex-grow text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,196,0,0.25)] transition-all duration-300 cursor-pointer select-none"
            >
              Complete My Wrap
            </button>
          )}
        </div>
      </div>

      {/* Upsell slide up Drawer modal */}
      <UpsellDrawer
        isOpen={isUpsellOpen}
        onClose={() => setIsUpsellOpen(false)}
        customization={{
          bun: "Warm Flour Tortilla",
          protein: selectedProteins.map((p) => p.name).join(", "),
          veggies: selectedVeggies.map((v) => v.name),
          cheese: selectedCheese ? selectedCheese.name : null,
          sauces: selectedSauces.map((s) => s.name),
        }}
        price={getByoWrapPrice()}
      />
    </div>
  );
}
