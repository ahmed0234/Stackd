"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export interface SizeOption {
  label: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: "stacks" | "wraps" | "fries" | "drinks" | "deals";
  image: string;
  description: string;
  price: number;
  tags?: string[];
  accentColor: string;
  sizes?: SizeOption[];
  includes?: string[];
}

export const PRODUCTS: Product[] = [
  // Category: Stacks
  {
    id: "fire-stack",
    name: "Fire Stack",
    category: "stacks",
    image: "/Stacks/Fire.png",
    description:
      "Double smash beef, melted pepper jack, grilled jalapeños, spicy hot house fire sauce.",
    price: 499,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },
  {
    id: "melt-stack",
    name: "Melt Stack",
    category: "stacks",
    image: "/Stacks/Melt.png",
    description:
      "Double hand-pressed patties smothered in hot cheddar sauce, grilled caramelized onions.",
    price: 549,
    tags: ["Cheese Bomb"],
    accentColor: "#F97316",
  },
  {
    id: "og-stack",
    name: "OG Stack",
    category: "stacks",
    image: "/Stacks/Og.png",
    description:
      "Double smashed Angus beef, cheddar cheese, crispy pickles, secret stack sauce, toasted brioche bun.",
    price: 449,
    tags: ["Popular"],
    accentColor: "#F5C400",
  },
  {
    id: "royal-stack",
    name: "Royal Stack",
    category: "stacks",
    image: "/Stacks/Royal.png",
    description:
      "Triple smashed Angus beef patties, premium golden cheddar cheese, sweet caramelized onions, and our rich signature truffle glaze.",
    price: 599,
    tags: ["Signature"],
    accentColor: "#6366F1",
  },
  {
    id: "smoke-stack",
    name: "Smoke Stack",
    category: "stacks",
    image: "/Stacks/Smoke.png",
    description:
      "Double patties, crispy smoked bacon, golden thick-cut onion rings, hickory BBQ sauce.",
    price: 499,
    tags: ["Popular"],
    accentColor: "#D97706",
  },
  {
    id: "byo-stack",
    name: "Build Your Own Stack",
    category: "stacks",
    image: "/Stacks/Build your own.png",
    description:
      "Your stack, your rules. Choose number of patties, fresh toppings, cheeses, and custom signature sauces.",
    price: 650,
    tags: ["Customizable"],
    accentColor: "#A855F7",
  },

  // Category: Wraps
  {
    id: "fire-wrap",
    name: "Fire Wrap",
    category: "wraps",
    image: "/Wraps/firewrap.png",
    description:
      "Spicy chicken tenders, melted pepper jack cheese, charred jalapeños, and house fire sauce in a warm tortilla.",
    price: 499,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },
  {
    id: "melted-wrap",
    name: "Melted Wrap",
    category: "wraps",
    image: "/Wraps/meltedwrap.png",
    description:
      "Double smash beef smothered in hot cheddar cheese sauce, caramelized onions, wrapped to perfection.",
    price: 520,
    tags: ["Cheese Bomb"],
    accentColor: "#F97316",
  },
  {
    id: "og-wrap",
    name: "OG Wrap",
    category: "wraps",
    image: "/Wraps/ogwrap.png",
    description:
      "Double smashed Angus beef, cheddar cheese, crispy pickles, and secret stack sauce in a warm toasted wrap.",
    price: 449,
    tags: ["Popular"],
    accentColor: "#F5C400",
  },
  {
    id: "royale-wrap",
    name: "Royale Wrap",
    category: "wraps",
    image: "/Wraps/royalewrap.png",
    description:
      "Triple smashed beef patties, premium golden cheddar, sweet caramelized onions, and rich signature truffle glaze.",
    price: 599,
    tags: ["Signature"],
    accentColor: "#6366F1",
  },
  {
    id: "byo-wrap",
    name: "Build Your Own Wrap",
    category: "wraps",
    image: "/Wraps/buildyourownwrap.png",
    description:
      "Your wrap, your rules. Choose your tortilla base, fresh crisp veggies, grilled proteins, and signature drizzles.",
    price: 550,
    tags: ["Customizable"],
    accentColor: "#A855F7",
  },

  // Category: Fries
  {
    id: "full-stackd-fries",
    name: "Full Stackd Fries",
    category: "fries",
    image: "/Fries/Fullstackdfries.png",
    description:
      "A loaded meal of crispy fries, chopped smash beef patties, melted cheese, pickles, and signature stack sauce.",
    price: 449,
    tags: ["Meal Size"],
    accentColor: "#F97316",
  },
  {
    id: "chilli-cheese-fries",
    name: "Chilli Cheese Fries",
    category: "fries",
    image: "/Fries/chillicheesefries.png",
    description:
      "Golden fries smothered in hot beef chilli, jalapeños, and melted pepper jack cheese.",
    price: 349,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },
  {
    id: "plain-fries",
    name: "Plain Fries",
    category: "fries",
    image: "/Fries/plain fries.png",
    description:
      "Crispy, hand-cut golden skin-on fries seasoned to perfection with signature stack spice.",
    price: 199,
    tags: ["Classic"],
    accentColor: "#F5C400",
  },

  // Category: Drinks
  {
    id: "pepsi",
    name: "Pepsi",
    category: "drinks",
    image: "/Drinks/Pepsi/500ml.png",
    description:
      "Chilled classic Pepsi (340ML), the perfect accompaniment to your heavy stack.",
    price: 120,
    accentColor: "#004B87",
    sizes: [
      { label: "340ML", price: 120, image: "/Drinks/Pepsi/500ml.png" },
    ],
  },
  {
    id: "sprite",
    name: "Sprite",
    category: "drinks",
    image: "/Drinks/Sprite/500.png",
    description:
      "Crisp, clean, refreshing lemon-lime carbonated soda (340ML) with a splash of bubble.",
    price: 120,
    accentColor: "#00B2E2",
    sizes: [
      { label: "340ML", price: 120, image: "/Drinks/Sprite/500.png" },
    ],
  },
  {
    id: "mineral-water",
    name: "Mineral Water",
    category: "drinks",
    image: "/Drinks/Water/500.png",
    description:
      "Pure, clean, refreshing spring water (340ML) to wash down your stacks.",
    price: 90,
    accentColor: "#00B2E2",
    sizes: [
      { label: "340ML", price: 90, image: "/Drinks/Water/500.png" },
    ],
  },
  // Category: Deals
  {
    id: "solo-meal-deal",
    name: "Solo Meal Deal",
    category: "deals",
    image: "/Deals/SoloMealDeal.png",
    description:
      "Perfect for one! Choice of any signature burger or wrap, paired with crispy fries and a 340ML refreshing drink.",
    price: 699,
    tags: ["Bestseller", "Save Rs 120"],
    accentColor: "#F5C400",
    includes: [
      "1x Signature Stack or Wrap",
      "1x Plain Fries",
      "1x 340ML Drink",
    ],
  },
  {
    id: "duo-stack-deal",
    name: "Duo Stack Deal",
    category: "deals",
    image: "/Deals/DuoStackDeal.png",
    description:
      "Made for two! Choice of two signature burgers or wraps, a large portion of loaded fries, and two chilled 340ML drinks.",
    price: 1299,
    tags: ["Popular", "Save Rs 200"],
    accentColor: "#22C55E",
    includes: [
      "2x Signature Stacks or Wraps",
      "1x Chilli Cheese Fries",
      "2x 340ML Drinks",
    ],
  },
  {
    id: "full-stack-meal-deal",
    name: "Full Stack Meal Deal",
    category: "deals",
    image: "/Deals/FullStackMealDeal.png",
    description:
      "The complete STACKD experience! Includes three signature burgers or wraps, two portions of loaded fries, and three 340ML drinks.",
    price: 1299,
    tags: ["Best Value", "Save Rs 350"],
    accentColor: "#EF4444",
    includes: [
      "1x Signature Stacks or Wraps",
      "1x Chilli Cheese Fries",
      "1x 340ML Drink",
    ],
  },
  {
    id: "stackd-share-box",
    name: "Stackd Share Box",
    category: "deals",
    image: "/Deals/StacdShareBox.png",
    description:
      "The ultimate party box! Four signature burgers or wraps, two large loaded fries, four chilled 340ML drinks, and extra dipping sauces.",
    price: 2499,
    tags: ["Big Value", "Save Rs 500"],
    accentColor: "#F97316",
    includes: [
      "4x Any Signature Stack or Wrap",
      "1x Full Stackd Fries",
      "4x 340ML Drinks",
      "Extra Signature Sauces",
    ],
  },
];

const CATEGORIES = [
  { id: "stacks", label: "Stacks", icon: BurgerIcon },
  { id: "wraps", label: "Wraps", icon: WrapIcon },
  { id: "fries", label: "Fries", icon: FriesIcon },
  { id: "drinks", label: "Drinks", icon: DrinksIcon },
] as const;

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<
    "stacks" | "wraps" | "fries" | "drinks"
  >("stacks");
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeItemCompletely = useCartStore(
    (state) => state.removeItemCompletely,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClearCart = useCallback(() => {
    clearCart();
    setIsExpanded(false);
  }, [clearCart]);

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => p.category === activeCategory);
    const regular = list.filter(
      (p) =>
        !p.id.startsWith("byo-") &&
        !p.tags?.includes("Customizable") &&
        !p.name.toLowerCase().includes("build your own")
    );
    const byo = list.filter(
      (p) =>
        p.id.startsWith("byo-") ||
        p.tags?.includes("Customizable") ||
        p.name.toLowerCase().includes("build your own")
    );
    return [...regular, ...byo];
  }, [activeCategory]);

  const cartSummary = useMemo(() => {
    const totalCount = Object.values(items).reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalPrice = Object.values(items).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return { totalCount, totalPrice };
  }, [items]);

  // Framer Motion staggered entrance configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.25 } },
  };

  return (
    <section
      id="menu"
      className="relative w-full py-24 bg-dark-primary overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-dark-primary) 0%, var(--color-dark-secondary) 100%)",
      }}
    >
      {/* Background Glow Ring */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none left-[-10%] top-[30%] z-0"
        style={{ background: "var(--color-brand)" }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none right-[-10%] bottom-[10%] z-0"
        style={{ background: "#EF4444" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-3 py-1 rounded-full bg-brand/[0.08] border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest font-poppins mb-4"
          >
            Appetite Architect
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-none"
          >
            Order Your <span className="text-brand">Cravings</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/60 mt-4 text-base sm:text-lg font-sans leading-relaxed"
          >
            Hand pressed Stacks, loaded fries, and signature drinks. Tap a
            category below and add item to your order stack.
          </motion.p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-col items-center w-full mb-16">
          <div className="relative w-full max-w-xl flex items-center justify-center">
            {/* Right edge fade gradient on mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[var(--color-dark-primary)] via-[var(--color-dark-primary)]/70 to-transparent pointer-events-none z-20 sm:hidden rounded-r-2xl" />

            <div className="relative flex items-center p-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl max-w-full overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 sm:gap-2.5 flex-nowrap pr-8 sm:pr-0">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const IconComponent = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="relative px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-poppins font-extrabold uppercase tracking-widest transition-all duration-300 select-none cursor-pointer flex-shrink-0"
                      style={{
                        color: isActive
                          ? "#0a0a0a"
                          : "rgba(255, 255, 255, 0.55)",
                      }}
                    >
                      {/* Active Backdrop Slider */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryTab"
                          className="absolute inset-0 rounded-xl bg-brand z-0 shadow-[0_4px_16px_rgba(245,196,0,0.3)]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 26,
                          }}
                        />
                      )}

                      <span className="relative z-10 flex items-center">
                        <IconComponent />
                      </span>
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden justify-center items-center gap-1.5 mt-3 text-[10px] font-bold text-brand/50 uppercase tracking-widest select-none pointer-events-none">
            <span>Swipe to explore menu</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              &rarr;
            </motion.span>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={items}
                onAdd={(size) => addItem(product.id, size)}
                onRemove={(size) => removeItem(product.id, size)}
                variants={cardVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Order Bar & Cart Drawer */}
      <AnimatePresence>
        {cartSummary.totalCount > 0 && (
          <motion.div
            layout
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-32px)] max-w-md bg-dark-secondary/[0.94] border border-brand/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Expanded Cart Items List Drawer */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 pt-5 pb-2 border-b border-white/[0.04] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-poppins font-black text-xs text-white uppercase tracking-wider">
                      Order Summary
                    </span>
                    <button
                      onClick={handleClearCart}
                      className="text-[10px] font-poppins font-black uppercase tracking-wider text-white/40 hover:text-red-500 transition-colors cursor-pointer select-none"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Cart Items List */}
                  <div className="max-h-56 overflow-y-auto pr-1 flex flex-col scrollbar-none">
                    <AnimatePresence mode="popLayout">
                      {Object.values(items).map((item) => {
                        const displayName = item.size
                          ? `${item.name} (${item.size})`
                          : item.name;

                        return (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, height: 0, y: 15 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -15 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 24,
                            }}
                            className="flex items-center gap-3 py-2 border-b border-white/[0.02] last:border-0 overflow-hidden"
                          >
                            {/* Thumbnail */}
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/[0.03] flex-shrink-0 flex items-center justify-center border border-white/[0.06]">
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="32px"
                                style={{ objectFit: "contain" }}
                              />
                            </div>

                            {/* Name & Subtotal */}
                            <div className="flex-grow text-left">
                              <h4 className="font-poppins font-bold text-xs text-white leading-tight line-clamp-1">
                                {displayName}
                              </h4>
                              {item.customization && (
                                <p className="text-[8px] text-brand font-sans mt-0.5 line-clamp-1">
                                  {item.customization.bun} |{" "}
                                  {item.customization.protein}
                                </p>
                              )}
                              {item.dealConfiguration && (
                                <div className="text-[8.5px] text-brand font-sans mt-0.5 leading-tight text-left">
                                  <div className="line-clamp-1">
                                    🍔 Stacks: {item.dealConfiguration.stacks.join(", ")}
                                  </div>
                                  {item.dealConfiguration.drinks.length > 0 && (
                                    <div className="line-clamp-1">
                                      🥤 Drinks: {item.dealConfiguration.drinks.map(d => `${d.name} (${d.size})`).join(", ")}
                                    </div>
                                  )}
                                </div>
                              )}
                              <p className="text-[9px] text-white/40 font-sans mt-0.5">
                                Rs {item.price.toLocaleString()} &times;{" "}
                                {item.quantity}
                              </p>
                            </div>

                            {/* Inline quantity controller */}
                            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] p-0.5 rounded-full h-7">
                              <button
                                onClick={() => removeItem(item.key)}
                                className="w-5.5 h-5.5 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors cursor-pointer"
                              >
                                <MinusIcon width={6} height={6} />
                              </button>
                              <span className="font-poppins font-bold text-[10px] text-white min-w-[10px] text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addItem(item.key)}
                                className="w-5.5 h-5.5 rounded-full flex items-center justify-center bg-brand text-[#0a0a0a] hover:bg-brand/90 transition-colors cursor-pointer"
                              >
                                <PlusIcon width={6} height={6} />
                              </button>
                            </div>

                            {/* Delete trash button */}
                            <button
                              onClick={() => removeItemCompletely(item.key)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-red-500 hover:bg-white/[0.04] transition-all cursor-pointer flex-shrink-0"
                              title="Remove item"
                            >
                              <TrashIcon width={12} height={12} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Order Summary Control */}
            <div className="px-5 py-4 flex items-center justify-between">
              {/* Left Info: Clickable Toggle Drawer */}
              <div
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex items-center gap-3 cursor-pointer select-none group px-3 py-2 -ml-3 rounded-2xl hover:bg-white/[0.04] active:bg-white/[0.08] transition-all duration-300"
              >
                <div className="relative w-10 h-10 rounded-xl bg-brand flex items-center justify-center font-poppins font-black text-sm text-[#0a0a0a] shadow-[0_4px_12px_rgba(245,196,0,0.25)] animate-pulse">
                  {cartSummary.totalCount}
                </div>
                <div className="text-left font-sans">
                  <div
                    className="text-[10px] font-bold text-white/70 group-hover:text-brand uppercase tracking-widest leading-none flex items-center gap-2 transition-colors duration-300"
                    style={{
                      textShadow: "group-hover:0 0 8px rgba(245, 196, 0, 0.4)",
                    }}
                  >
                    {/* Active Pulsing Indicator Dot */}
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand"></span>
                    </span>
                    <span>Your Stack</span>
                    <motion.span
                      animate={
                        isExpanded
                          ? { rotate: 180, y: 0 }
                          : {
                              rotate: 0,
                              y: [0, -3, 0],
                            }
                      }
                      transition={
                        isExpanded
                          ? { duration: 0.25 }
                          : {
                              y: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                              rotate: { duration: 0.25 },
                            }
                      }
                      className="inline-flex items-center text-brand"
                    >
                      <ChevronUpIcon width={10} height={10} />
                    </motion.span>
                  </div>
                  <div className="text-base font-black text-white leading-tight font-poppins mt-1">
                    Rs {cartSummary.totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Right Order CTA */}
              <Link
                href="/cart"
                className="px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-[#0a0a0a] font-poppins font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:scale-103 active:scale-97 transform"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Product Card Component
   ─────────────────────────────────────────────────────────────────────────── */
interface ProductCardProps {
  product: Product;
  cart: Record<string, CartItem>;
  onAdd: (size?: string) => void;
  onRemove: (size?: string) => void;
  variants: any;
}

function ProductCard({
  product,
  cart,
  onAdd,
  onRemove,
  variants,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [activeSize, setActiveSize] = useState<string | undefined>(
    () => product.sizes?.[0]?.label,
  );

  // Sync activeSize when product changes to avoid state leaks
  useEffect(() => {
    if (product.sizes) {
      setActiveSize(product.sizes[0]?.label);
    } else {
      setActiveSize(undefined);
    }
  }, [product.id, product.sizes]);

  const currentSizeKey = activeSize
    ? `${product.id}::${activeSize}`
    : product.id;
  const quantity = cart[currentSizeKey]?.quantity || 0;

  const currentPrice =
    activeSize && product.sizes
      ? (product.sizes.find((s) => s.label === activeSize)?.price ??
        product.price)
      : product.price;

  const currentImage =
    activeSize && product.sizes
      ? (product.sizes.find((s) => s.label === activeSize)?.image ??
        product.image)
      : product.image;

  return (
    <motion.div
      variants={variants}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand/20 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-card"
    >
      {/* Decorative Glow Blob */}
      <div
        className="absolute w-24 h-24 rounded-full blur-[24px] pointer-events-none top-4 right-4 opacity-5 transition-opacity duration-300"
        style={{
          backgroundColor: product.accentColor,
          opacity: hovered ? 0.18 : 0.05,
        }}
      />

      {/* Floating Tag (e.g. Popular, Spicy, etc.) */}
      {product.tags?.map((tag) => (
        <div
          key={tag}
          className="absolute top-4 left-4 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider font-poppins z-20"
          style={{
            backgroundColor:
              tag === "Spicy" ? "#EF4444" : "rgba(255,255,255,0.08)",
            border:
              tag === "Spicy"
                ? "1px solid rgba(239, 68, 68, 0.3)"
                : "1px solid rgba(255,255,255,0.1)",
            color: "#FFFFFF",
          }}
        >
          {tag}
        </div>
      ))}

      {/* Food Visual Frame */}
      {product.id === "byo-wrap" || product.id === "byo-stack" ? (
        <Link
          href={product.id === "byo-wrap" ? "/build-wrap" : "/build"}
          className="relative w-full h-48 mt-4 flex items-center justify-center z-10 overflow-hidden select-none cursor-pointer"
        >
          <motion.div
            animate={{
              scale: hovered ? 1.06 : 1,
              rotate: hovered ? 2 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[85%] h-[85%]"
          >
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: "contain" }}
              priority={product.category === "stacks"}
            />
          </motion.div>
        </Link>
      ) : (
        <div className="relative w-full h-48 mt-4 flex items-center justify-center z-10 overflow-hidden select-none">
          <motion.div
            animate={{
              scale: hovered ? 1.06 : 1,
              rotate: hovered ? 2 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[85%] h-[85%]"
          >
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: "contain" }}
              priority={product.category === "stacks"}
            />
          </motion.div>
        </div>
      )}

      {/* Product Content Details */}
      <div className="flex flex-col flex-grow p-5 text-left">
        {product.id === "byo-wrap" || product.id === "byo-stack" ? (
          <Link href={product.id === "byo-wrap" ? "/build-wrap" : "/build"}>
            <h3 className="font-poppins font-black text-lg text-white leading-tight uppercase tracking-wide hover:text-brand transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3 className="font-poppins font-black text-lg text-white leading-tight uppercase tracking-wide">
            {product.name}
          </h3>
        )}

        <p className="text-xs text-white/50 leading-relaxed font-sans mt-2 line-clamp-2 min-h-[32px] flex-grow">
          {product.description}
        </p>

        {/* Size Selection Pill Bar */}
        {product.sizes && (
          <div className="mt-4 flex flex-col gap-2">
            <span className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/40">
              Select Size
            </span>
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              {product.sizes.map((size) => {
                const isSelected = activeSize === size.label;
                return (
                  <button
                    key={size.label}
                    onClick={() => setActiveSize(size.label)}
                    className={`relative px-2.5 py-1.5 rounded-lg text-[10px] font-poppins font-black uppercase tracking-wider flex-grow text-center transition-all duration-300 cursor-pointer select-none ${
                      isSelected
                        ? "text-[#0a0a0a]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId={`activeSize-${product.id}`}
                        className="absolute inset-0 rounded-lg bg-brand shadow-[0_2px_8px_rgba(245,196,0,0.2)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                    <span className="relative z-10">{size.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Add Trigger Row */}
        <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
          {product.id === "byo-stack" || product.id === "byo-wrap" ? (
            <span className="font-poppins font-bold text-xs text-white/40 uppercase tracking-wider">
              Customizable
            </span>
          ) : (
            <span className="font-poppins font-black text-lg text-white">
              Rs {currentPrice.toLocaleString()}
            </span>
          )}

          <div className="relative flex items-center h-10">
            {product.id === "byo-stack" || product.id === "byo-wrap" ? (
              <Link
                key="build-btn"
                href={product.id === "byo-wrap" ? "/build-wrap" : "/build"}
                className="px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[10px] font-poppins font-black uppercase text-[#0a0a0a] bg-brand shadow-[0_4px_12px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_20px_rgba(245,196,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
              >
                <span>Build</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <AnimatePresence mode="wait">
                {quantity === 0 ? (
                  <motion.button
                    key="add-btn"
                    onClick={() => onAdd(activeSize)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2.5 rounded-full flex items-center gap-1 text-[10px] font-poppins font-black uppercase text-[#0a0a0a] bg-brand shadow-[0_4px_12px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_20px_rgba(245,196,0,0.4)] transition-all duration-300 cursor-pointer select-none"
                  >
                    <PlusIcon width={10} height={10} />
                    <span>Add</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="qty-ctrl"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] px-2 py-1 rounded-full h-full"
                  >
                    <button
                      onClick={() => onRemove(activeSize)}
                      className="w-6.5 h-6.5 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      <MinusIcon width={10} height={10} />
                    </button>
                    <span className="font-poppins font-extrabold text-xs text-white min-w-[14px] text-center select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onAdd(activeSize)}
                      className="w-6.5 h-6.5 rounded-full flex items-center justify-center bg-brand text-[#0a0a0a] hover:bg-brand/90 transition-colors cursor-pointer"
                    >
                      <PlusIcon width={10} height={10} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Icons
   ─────────────────────────────────────────────────────────────────────────── */
function BurgerIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11c0-2.2 2-4 4.5-4h9c2.5 0 4.5 1.8 4.5 4v1H3v-1z" />
      <path d="M21 16H3c-1.1 0-2 .9-2 2s.9 2 2 2h18c1.1 0 2-.9 2-2s-.9-2-2-2z" />
      <path d="M4 14h16" />
    </svg>
  );
}

function WrapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="4"
        transform="rotate(45 12 12)"
      />
      <path d="M9 9l6 6" />
    </svg>
  );
}

function FriesIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 10V21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
      <path d="M3 10h18" />
      <path d="M8 10V3" />
      <path d="M12 10V2" />
      <path d="M16 10V3" />
    </svg>
  );
}

function DrinksIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
      <path d="M5 8h12v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <line x1="9" y1="2" x2="9" y2="8" />
    </svg>
  );
}

function PlusIcon({
  width = 12,
  height = 12,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({
  width = 12,
  height = 12,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon({
  width = 14,
  height = 14,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function ChevronUpIcon({
  width = 12,
  height = 12,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
