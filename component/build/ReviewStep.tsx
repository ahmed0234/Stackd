"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { BunOption, ProteinOption, VeggieOption, CheeseOption, SauceOption } from "./ingredients";

interface ReviewStepProps {
  bun: BunOption | null;
  protein: ProteinOption | null;
  veggies: VeggieOption[];
  cheese: CheeseOption | null;
  sauces: SauceOption[];
  price: number;
}

export default function ReviewStep({ bun, protein, veggies, cheese, sauces, price }: ReviewStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-3xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-xl relative overflow-hidden shadow-card text-left"
    >
      {/* Decorative top border sweep */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand to-transparent" />

      <h3 className="font-poppins font-black text-xl uppercase tracking-wider text-white mb-6 border-b border-white/[0.04] pb-4">
        Your Custom Creation
      </h3>

      <div className="space-y-5 text-sm font-sans">
        {/* Bun Summary */}
        <div className="flex items-start gap-4 py-2 border-b border-white/[0.02] last:border-0">
          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/50 text-base font-black relative overflow-hidden select-none">
            {bun ? (
              <Image src={bun.image} alt="" fill style={{ objectFit: "contain" }} className="p-1" />
            ) : (
              "🍞"
            )}
          </div>
          <div>
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest block mb-0.5">
              ARTISAN BASE
            </span>
            <span className="font-poppins font-bold text-white uppercase text-xs">
              {bun?.name || "No Bun Selected"}
            </span>
            <p className="text-[10px] text-white/45 mt-0.5">{bun?.description}</p>
          </div>
        </div>

        {/* Protein Summary */}
        <div className="flex items-start gap-4 py-2 border-b border-white/[0.02] last:border-0">
          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/50 text-base font-black relative overflow-hidden select-none">
            {protein ? (
              <Image src={protein.image} alt="" fill style={{ objectFit: "contain" }} className="p-1.5" />
            ) : (
              "🍖"
            )}
          </div>
          <div>
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest block mb-0.5">
              PROTEIN FILLING
            </span>
            <span className="font-poppins font-bold text-white uppercase text-xs">
              {protein?.name || "No Protein Selected"}
            </span>
            <p className="text-[10px] text-white/45 mt-0.5">{protein?.description}</p>
          </div>
        </div>

        {/* Cheese Summary */}
        <div className="flex items-start gap-4 py-2 border-b border-white/[0.02] last:border-0">
          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/50 text-base font-black relative overflow-hidden select-none">
            {cheese ? (
              <Image src={cheese.image} alt="" fill style={{ objectFit: "contain" }} className="p-1" />
            ) : (
              "🧀"
            )}
          </div>
          <div>
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest block mb-0.5">
              CHEESE LAYER
            </span>
            <span className="font-poppins font-bold text-white uppercase text-xs">
              {cheese?.name || "No Cheese Added"}
            </span>
            <p className="text-[10px] text-white/45 mt-0.5">
              {cheese ? cheese.description : "Light and crisp without cheese toppings."}
            </p>
          </div>
        </div>

        {/* Veggies Summary */}
        <div className="flex items-start gap-4 py-2 border-b border-white/[0.02] last:border-0">
          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/40 text-lg font-black select-none">
            🥗
          </div>
          <div>
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest block mb-0.5">
              FRESH VEGGIES
            </span>
            {veggies.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {veggies.map((veg) => (
                  <span
                    key={veg.id}
                    className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/70"
                  >
                    {veg.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-poppins font-bold text-white/40 uppercase text-xs">
                No Veggies Added
              </span>
            )}
          </div>
        </div>

        {/* Sauces Summary */}
        <div className="flex items-start gap-4 py-2 border-b border-white/[0.02] last:border-0">
          <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/40 text-lg font-black select-none">
            🌶️
          </div>
          <div>
            <span className="text-[10px] font-poppins font-bold uppercase text-white/30 tracking-widest block mb-0.5">
              SIGNATURE SAUCES
            </span>
            {sauces.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {sauces.map((sauce) => (
                  <span
                    key={sauce.id}
                    className="px-2 py-0.5 rounded-md text-[9px] font-poppins font-black uppercase tracking-wider bg-brand/10 border border-brand/20 text-brand"
                  >
                    {sauce.name}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-poppins font-bold text-white/40 uppercase text-xs">
                No Sauces Added
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-dashed border-white/10 flex justify-between items-baseline">
        <span className="text-xs font-poppins font-bold uppercase text-white/30 tracking-widest">
          CONFIGURATOR PRICE
        </span>
        <span className="font-poppins font-black text-2xl text-white">
          Rs {price.toLocaleString()} PKR
        </span>
      </div>
    </motion.div>
  );
}
