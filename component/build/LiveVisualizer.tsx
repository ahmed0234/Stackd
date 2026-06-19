"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BunOption, ProteinOption, VeggieOption, CheeseOption, SauceOption } from "./ingredients";

// Helper component for cropped & rotated ingredient layers (defined at module level for stable rendering and proper exit animations)
interface IngredientLayerProps {
  id: string;
  src: string;
  alt: string;
  offsetY: number;
  zIndex: number;
}

const IngredientLayer = ({
  id,
  src,
  alt,
  offsetY,
  zIndex,
}: IngredientLayerProps) => (
  <motion.div
    key={id}
    initial={{ y: offsetY - 300, opacity: 0, scale: 0.7, rotate: -5 }}
    animate={{
      y: offsetY,
      opacity: 1,
      scale: 1,
      rotate: 0,
    }}
    exit={{ y: offsetY + 250, opacity: 0, scale: 0.7, rotate: 5 }}
    transition={{
      type: "spring",
      stiffness: 140,
      damping: 14,
    }}
    className="absolute w-[280px] sm:w-[320px] h-[55px] sm:h-[60px] pointer-events-none select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
    style={{ zIndex }}
  >
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 3.5 + Math.random() * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-full h-full relative overflow-hidden rounded-full border border-white/[0.04]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="320px"
        style={{
          objectFit: "cover",
          transform: "rotate(90deg) scale(1.6)", // rotates the vertical metal pan 90deg and scales to hide borders!
        }}
        priority
      />
    </motion.div>
  </motion.div>
);

interface LiveVisualizerProps {
  selectedBun: BunOption | null;
  selectedProteins: ProteinOption[];
  selectedVeggies: VeggieOption[];
  selectedCheese: CheeseOption | null;
  selectedSauces: SauceOption[];
}

export default function LiveVisualizer({
  selectedBun,
  selectedProteins,
  selectedVeggies,
  selectedCheese,
  selectedSauces,
}: LiveVisualizerProps) {
  // Calculate relative vertical offsets for a beautiful exploded-view stack
  const getOffsets = () => {
    let currentY = 110; // Bottom bun baseline
    const offsets: Record<string, number> = {};

    offsets["bottom-bun"] = currentY;

    selectedProteins.forEach((protein) => {
      currentY -= 45;
      offsets[`protein-${protein.id}`] = currentY;
    });

    if (selectedCheese) {
      currentY -= 25;
      offsets["cheese"] = currentY;
    }

    selectedVeggies.forEach((veg, idx) => {
      currentY -= 25;
      offsets[`veg-${veg.id}`] = currentY;
    });

    selectedSauces.forEach((sauce, idx) => {
      currentY -= 20;
      offsets[`sauce-${sauce.id}`] = currentY;
    });

    currentY -= 45;
    offsets["top-bun"] = currentY;

    return { offsets, height: 320 };
  };

  const { offsets } = getOffsets();

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center bg-white/[0.01] border border-white/[0.04] rounded-3xl backdrop-blur-xl overflow-hidden shadow-inner">
      {/* Decorative inner glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <AnimatePresence mode="popLayout">
        {!selectedBun ? (
          <motion.div
            key="empty-placeholder"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4 text-center px-6 max-w-xs z-10"
          >
            <div className="w-16 h-16 rounded-full border border-dashed border-brand/30 flex items-center justify-center animate-pulse">
              <span className="text-2xl text-brand">🍞</span>
            </div>
            <h3 className="font-poppins font-black uppercase text-white/80 tracking-wide text-sm">
              Start Your Masterpiece
            </h3>
            <p className="text-xs text-white/40 leading-relaxed font-sans">
              Choose a fresh bread in Step 1 to lay the foundation of your custom STACK.
            </p>
          </motion.div>
        ) : (
          <div className="relative w-[340px] h-[360px] flex items-center justify-center">
            {/* 1. Bottom Bun (Clipped bottom 50%) */}
            <motion.div
              key="bottom-bun"
              initial={{ y: 200, opacity: 0, scale: 0.8 }}
              animate={{
                y: offsets["bottom-bun"] || 110,
                opacity: 1,
                scale: 1,
              }}
              exit={{ y: 200, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              className="absolute w-[290px] sm:w-[330px] h-[65px] sm:h-[75px] pointer-events-none select-none z-10 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative overflow-hidden"
              >
                <div
                  className="w-full h-[130px] sm:h-[150px] relative"
                  style={{
                    clipPath: "inset(50% 0% 0% 0%)",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Image
                    src={selectedBun.image}
                    alt="Bottom Bun"
                    fill
                    sizes="330px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* 2. Protein Layers */}
            {selectedProteins.map((protein, index) => (
              <IngredientLayer
                id={`protein-${protein.id}`}
                key={`protein-${protein.id}`}
                src={protein.image}
                alt={protein.name}
                offsetY={offsets[`protein-${protein.id}`] || 0}
                zIndex={20 + index}
              />
            ))}

            {/* 3. Cheese Layer */}
            {selectedCheese && (
              <IngredientLayer
                id={`cheese-${selectedCheese.id}`}
                src={selectedCheese.image}
                alt={selectedCheese.name}
                offsetY={offsets["cheese"] || 0}
                zIndex={30}
              />
            )}

            {/* 4. Veggie Layers */}
            {selectedVeggies.map((veg, index) => (
              <IngredientLayer
                id={`veg-${veg.id}`}
                src={veg.image}
                alt={veg.name}
                offsetY={offsets[`veg-${veg.id}`] || 0}
                zIndex={40 + index}
              />
            ))}

            {/* 5. Sauce Layers */}
            {selectedSauces.map((sauce, index) => (
              <IngredientLayer
                id={`sauce-${sauce.id}`}
                src={sauce.image}
                alt={sauce.name}
                offsetY={offsets[`sauce-${sauce.id}`] || 0}
                zIndex={60 + index}
              />
            ))}

            {/* 6. Top Bun (Clipped top 50%) */}
            <motion.div
              key="top-bun"
              initial={{ y: -300, opacity: 0, scale: 0.8 }}
              animate={{
                y: offsets["top-bun"] || -85,
                opacity: 1,
                scale: 1,
              }}
              exit={{ y: -300, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 14,
                delay: 0.05,
              }}
              className="absolute w-[290px] sm:w-[330px] h-[65px] sm:h-[75px] pointer-events-none select-none z-[100] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative overflow-hidden"
              >
                <div
                  className="w-full h-[130px] sm:h-[150px] relative"
                  style={{
                    clipPath: "inset(0% 0% 50% 0%)",
                  }}
                >
                  <Image
                    src={selectedBun.image}
                    alt="Top Bun"
                    fill
                    sizes="330px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* In-visualization protein status hint */}
            {selectedProteins.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute text-[10px] font-poppins font-black uppercase text-brand/40 border border-brand/10 bg-brand/[0.02] px-3 py-1 rounded-full pointer-events-none z-30"
                style={{ y: 15 }}
              >
                Insert Protein Here
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
