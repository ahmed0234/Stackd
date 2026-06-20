"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, useCartItemsList, useCartTotal, useCartCount } from "@/store/useCartStore";

export default function CartPage() {
  const router = useRouter();
  const items = useCartItemsList();
  const totalPrice = useCartTotal();
  const totalCount = useCartCount();
  const [mounted, setMounted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeItemCompletely = useCartStore((state) => state.removeItemCompletely);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center text-white/50 font-poppins text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span>Building your stack...</span>
        </div>
      </div>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <div 
      className="min-h-screen w-full bg-dark-primary pt-32 pb-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--color-dark-primary) 0%, var(--color-dark-secondary) 100%)",
      }}
    >
      {/* Background Glow Blobs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none left-[-10%] top-[10%] z-0"
        style={{ background: "var(--color-brand)" }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none right-[-10%] bottom-[20%] z-0"
        style={{ background: "#EF4444" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-poppins font-black uppercase tracking-wider text-brand/80 hover:text-brand hover:translate-x-[-4px] transition-all duration-300 mb-4 cursor-pointer"
          >
            &larr; Back to Menu
          </Link>
          <h1 className="text-4xl sm:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-none">
            Your <span className="text-brand">Craving Stack</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center text-center py-20 px-6 rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl"
            >
              {/* Animated Empty bag container */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand/10 blur-[20px] rounded-full animate-pulse" />
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-brand/60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <h2 className="text-xl font-poppins font-black text-white uppercase tracking-wide">
                Your Stack is Empty
              </h2>
              <p className="text-sm text-white/50 max-w-sm mt-3 font-sans leading-relaxed">
                You haven&apos;t added any stacks, loaded fries, or refreshing drinks to your order yet. Let&apos;s build one!
              </p>
              <Link 
                href="/#menu"
                className="mt-8 px-8 py-3.5 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_30px_rgba(245,196,0,0.4)] hover:scale-102 transition-all duration-300"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const displayName = item.size
                      ? `${item.name} (${item.size})`
                      : item.name;

                    return (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand/20 backdrop-blur-md transition-all duration-300 relative overflow-hidden group shadow-card"
                      >
                        {/* Glow Blob */}
                        <div 
                          className="absolute w-24 h-24 rounded-full blur-[24px] pointer-events-none top-0 right-0 opacity-5 group-hover:opacity-15 transition-opacity duration-300"
                          style={{ backgroundColor: item.accentColor }}
                        />

                        {/* Image Thumbnail */}
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/[0.03] flex-shrink-0 flex items-center justify-center border border-white/[0.06] select-none">
                          <Image
                            src={item.image}
                            alt={displayName}
                            fill
                            sizes="96px"
                            style={{ objectFit: "contain" }}
                            className="p-1 group-hover:scale-106 transition-transform duration-300"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="font-poppins font-black text-lg text-white leading-tight uppercase tracking-wide group-hover:text-brand transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.size && (
                            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                              Size: {item.size}
                            </span>
                          )}

                          {/* Custom Stack Ingredients Details */}
                          {item.customization && (
                            <div className="mt-3 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl flex flex-col gap-2.5 text-[11px] text-white/50 font-sans text-left">
                              <div>
                                <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-0.5">Artisan Bun</strong>
                                <span>{item.customization.bun}</span>
                              </div>
                              <div>
                                <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-0.5">Protein Filling</strong>
                                <span>{item.customization.protein}</span>
                              </div>
                              {item.customization.toast && (
                                <div>
                                  <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-0.5">Toast Preference</strong>
                                  <span>{item.customization.toast === "Toasted" ? "🔥 Toasted" : "✨ Not Toasted"}</span>
                                </div>
                              )}
                              {item.customization.cheese && (
                                <div>
                                  <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-0.5">Melty Cheese</strong>
                                  <span>{item.customization.cheese}</span>
                                </div>
                              )}
                              {item.customization.veggies.length > 0 && (
                                <div>
                                  <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-1">Fresh Veggies</strong>
                                  <div className="flex flex-wrap gap-1">
                                    {item.customization.veggies.map((veg) => (
                                      <span key={veg} className="bg-white/5 px-2 py-0.5 rounded text-[9px] uppercase text-white/60 font-bold border border-white/5">
                                        {veg}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {item.customization.sauces.length > 0 && (
                                <div>
                                  <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-1">Signature Sauces</strong>
                                  <div className="flex flex-wrap gap-1">
                                    {item.customization.sauces.map((sauce) => (
                                      <span key={sauce} className="bg-brand/10 px-2 py-0.5 rounded text-[9px] uppercase text-brand font-bold border border-brand/5">
                                        {sauce}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {item.dealConfiguration && (
                            <div className="mt-3 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl flex flex-col gap-2.5 text-[11px] text-white/50 font-sans text-left">
                              <div>
                                <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-1">Chosen Stacks</strong>
                                <div className="flex flex-col gap-1">
                                  {item.dealConfiguration.stacks.map((stack, idx) => (
                                    <span key={idx} className="text-white font-medium">
                                      🍔 Stack #{idx + 1}: {stack}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              {item.dealConfiguration.drinks.length > 0 && (
                                <div>
                                  <strong className="text-white/70 font-poppins text-[9px] uppercase tracking-wider block mb-1">Chosen Drinks</strong>
                                  <div className="flex flex-col gap-1">
                                    {item.dealConfiguration.drinks.map((drink, idx) => (
                                      <span key={idx} className="text-brand font-bold">
                                        🥤 Drink #{idx + 1}: {drink.name} ({drink.size})
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <p className="text-xs text-white/40 font-sans mt-3">
                            Unit Price: Rs {item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Controls Column */}
                        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                          {/* Subtotal */}
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/30 block mb-0.5">
                              Subtotal
                            </span>
                            <span className="font-poppins font-black text-base text-white">
                              Rs {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          {/* Stepper + Delete Action Row */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] p-1 rounded-full h-9">
                              <button
                                onClick={() => removeItem(item.key)}
                                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors cursor-pointer"
                              >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                              <span className="font-poppins font-extrabold text-xs text-white min-w-[14px] text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addItem(item.key)}
                                className="w-7 h-7 rounded-full flex items-center justify-center bg-brand text-[#0a0a0a] hover:bg-brand/90 transition-colors cursor-pointer"
                              >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                                  <line x1="12" y1="5" x2="12" y2="19" />
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                            </div>

                            <button
                              onClick={() => removeItemCompletely(item.key)}
                              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-white/40 hover:text-red-500 hover:bg-white/[0.05] hover:border-red-500/20 transition-all cursor-pointer"
                              title="Delete Item"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Order Summary Column */}
              <div className="lg:sticky lg:top-24">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden shadow-card text-left">
                  
                  {/* Glassmorphic border glow */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
                  
                  <h3 className="font-poppins font-black text-lg text-white uppercase tracking-wide mb-6">
                    Summary
                  </h3>

                  <div className="flex flex-col gap-4 text-xs font-sans">
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <span className="text-white/50">Total Items Types</span>
                      <span className="font-poppins font-bold text-white">{items.length}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <span className="text-white/50">Total Quantity</span>
                      <span className="font-poppins font-bold text-white">{totalCount}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <span className="text-white/50">Delivery Charges</span>
                      <span className="font-poppins font-bold text-brand uppercase tracking-wider">Free Delivery</span>
                    </div>
                    <div className="flex flex-col gap-1.5 py-4 border-b border-white/[0.04] bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]">
                      <span className="font-poppins font-bold uppercase tracking-wider text-white/30 text-[9px] block">
                        Estimated Delivery Time
                      </span>
                      <p className="text-white/70 font-medium">
                        🚀 Standard delivery in 35-45 minutes.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 mb-6 flex justify-between items-baseline">
                    <span className="text-xs font-poppins font-bold uppercase text-white/40 tracking-wider">
                      Grand Total
                    </span>
                    <span className="font-poppins font-black text-2xl text-white">
                      Rs {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Link 
                    href="/checkout"
                    className="w-full py-4 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-extrabold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_30px_rgba(245,196,0,0.4)] hover:scale-102 transition-all duration-300"
                  >
                    Proceed to Checkout
                  </Link>

                  <p className="text-[10px] text-white/30 text-center font-sans mt-4">
                    Orders will be final confirmed and compiled for you via WhatsApp. No card payment required!
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
