"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export interface SizeOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: "stacks" | "wraps" | "fries" | "drinks";
  image: string;
  description: string;
  price: number;
  tags?: string[];
  accentColor: string;
  sizes?: SizeOption[];
}

export const PRODUCTS: Product[] = [
  // Category: Stacks
  {
    id: "og-stack",
    name: "OG Stack",
    category: "stacks",
    image: "/Stacks/Og stack.png",
    description: "Double smashed Angus beef, cheddar cheese, crispy pickles, secret stack sauce, toasted brioche bun.",
    price: 1299,
    tags: ["Popular"],
    accentColor: "#F5C400",
  },
  {
    id: "fire-stack",
    name: "Fire Stack",
    category: "stacks",
    image: "/Stacks/Fire stack.png",
    description: "Double smash beef, melted pepper jack, grilled jalapeños, spicy hot house fire sauce.",
    price: 1399,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },
  {
    id: "melt-stack",
    name: "Melt Stack",
    category: "stacks",
    image: "/Stacks/Melt stack.png",
    description: "Double hand-pressed patties smothered in hot cheddar sauce, grilled caramelized onions.",
    price: 1349,
    tags: ["Cheese Bomb"],
    accentColor: "#F97316",
  },
  {
    id: "smoke-stack",
    name: "Smoke Stack",
    category: "stacks",
    image: "/Stacks/Smoke stack.png",
    description: "Double patties, crispy smoked bacon, golden thick-cut onion rings, hickory BBQ sauce.",
    price: 1449,
    tags: ["Popular"],
    accentColor: "#D97706",
  },
  {
    id: "byo-stack",
    name: "Build Your Own Stack",
    category: "stacks",
    image: "/Stacks/Make your own.png",
    description: "Your stack, your rules. Choose number of patties, fresh toppings, cheeses, and custom signature sauces.",
    price: 1199,
    tags: ["Customizable"],
    accentColor: "#A855F7",
  },

  // Category: Wraps
  {
    id: "classic-wrap",
    name: "Classic Stack Wrap",
    category: "wraps",
    image: "/Wraps/Classic wrap.png",
    description: "Crispy hand-breaded chicken tenders, shredded crisp lettuce, cheddar, and classic mayo in a toasted flour tortilla.",
    price: 999,
    accentColor: "#22C55E",
  },
  {
    id: "loaded-wrap",
    name: "Loaded Crunch Wrap",
    category: "wraps",
    image: "/Wraps/Loaded wrap.png",
    description: "Double smash beef, crispy loaded fries inside, melted cheddar, ranch sauce in a warm toasted wrap.",
    price: 1099,
    tags: ["Must Try"],
    accentColor: "#3B82F6",
  },
  {
    id: "spicy-wrap",
    name: "Spicy Tender Wrap",
    category: "wraps",
    image: "/Wraps/Spicy wraps.png",
    description: "Spicy chicken tenders, charred jalapeño slices, house fire sauce, pepper jack cheese.",
    price: 1049,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },

  // Category: Fries
  {
    id: "classic-loaded",
    name: "Classic Loaded Fries",
    category: "fries",
    image: "/Fries/Classic loaded.png",
    description: "Golden skin-on fries topped with cheese sauce, crispy smoked bacon bits, and signature stack sauce.",
    price: 699,
    tags: ["Bestseller"],
    accentColor: "#F5C400",
  },
  {
    id: "fire-loaded",
    name: "Fire Loaded Fries",
    category: "fries",
    image: "/Fries/Fire loaded.png",
    description: "Golden fries dusted in hot spices, hot cheese sauce, fresh jalapeños, fire sauce drizzle.",
    price: 749,
    tags: ["Spicy"],
    accentColor: "#EF4444",
  },
  {
    id: "full-stackd-fries",
    name: "Full Stackd Fries",
    category: "fries",
    image: "/Fries/Full stackd fries.png",
    description: "A loaded meal of crispy fries, chopped smash beef patties, melted cheese, pickles, stack sauce.",
    price: 899,
    tags: ["Meal Size"],
    accentColor: "#F97316",
  },
  {
    id: "smoke-loaded",
    name: "Smoke Loaded Fries",
    category: "fries",
    image: "/Fries/Smoke loaded.png",
    description: "Crispy fries loaded with slow-cooked pulled pork, smoked bacon, cheddar, BBQ drizzle.",
    price: 799,
    accentColor: "#D97706",
  },

  // Category: Drinks
  {
    id: "pepsi",
    name: "Pepsi",
    category: "drinks",
    image: "/Drinks/Pepsi.png",
    description: "Chilled classic Pepsi, the perfect accompaniment to your heavy stack.",
    price: 199,
    accentColor: "#004B87",
    sizes: [
      { label: "500ml", price: 120 },
      { label: "1L", price: 180 },
      { label: "1.5L", price: 220 },
      { label: "2.25L", price: 280 },
      { label: "2.5L", price: 310 }
    ],
  },
  {
    id: "7up",
    name: "7UP",
    category: "drinks",
    image: "/Drinks/7up.png",
    description: "Crisp, clean, refreshing lemon-lime carbonated soda.",
    price: 199,
    accentColor: "#009639",
    sizes: [
      { label: "500ml", price: 120 },
      { label: "1L", price: 180 },
      { label: "1.5L", price: 220 },
      { label: "2.25L", price: 280 },
      { label: "2.5L", price: 310 }
    ],
  },
  {
    id: "mirinda",
    name: "Mirinda",
    category: "drinks",
    image: "/Drinks/Mirinda.png",
    description: "Bright and bubbly orange soda full of sweet citrus flavor.",
    price: 199,
    accentColor: "#F47A20",
    sizes: [
      { label: "500ml", price: 120 },
      { label: "1L", price: 180 },
      { label: "1.5L", price: 220 },
      { label: "2.25L", price: 280 },
      { label: "2.5L", price: 310 }
    ],
  },
  {
    id: "mountain-dew",
    name: "Mountain Dew",
    category: "drinks",
    image: "/Drinks/MountainDew.png",
    description: "Energizing citrus blast to keep your stack building sessions alive.",
    price: 199,
    accentColor: "#00A859",
    sizes: [
      { label: "500ml", price: 120 },
      { label: "1L", price: 180 },
      { label: "1.5L", price: 220 },
      { label: "2.25L", price: 280 },
      { label: "2.5L", price: 310 }
    ],
  },
  {
    id: "mineral-water",
    name: "Mineral Water",
    category: "drinks",
    image: "/Drinks/MineralWater.png",
    description: "Pure, clean, refreshing spring water to wash down your stacks.",
    price: 149,
    accentColor: "#00B2E2",
    sizes: [
      { label: "500ml", price: 60 },
      { label: "1L", price: 90 },
      { label: "1.5L", price: 120 },
      { label: "2.25L", price: 160 },
      { label: "2.5L", price: 180 }
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
  const [activeCategory, setActiveCategory] = useState<"stacks" | "wraps" | "fries" | "drinks">("stacks");
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeItemCompletely = useCartStore((state) => state.removeItemCompletely);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClearCart = useCallback(() => {
    clearCart();
    setIsExpanded(false);
  }, [clearCart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const cartSummary = useMemo(() => {
    const totalCount = Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      transition: { type: "spring", stiffness: 120, damping: 16 } 
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.25 } },
  };

  return (
    <section 
      id="menu"
      className="relative w-full py-24 bg-dark-primary overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--color-dark-primary) 0%, var(--color-dark-secondary) 100%)",
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
            Hand pressed Stacks, loaded fries, and signature drinks. Tap a category below and add item to your order stack.
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
                        color: isActive ? "#0a0a0a" : "rgba(255, 255, 255, 0.55)",
                      }}
                    >
                      {/* Active Backdrop Slider */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryTab"
                          className="absolute inset-0 rounded-xl bg-brand z-0 shadow-[0_4px_16px_rgba(245,196,0,0.3)]"
                          transition={{ type: "spring", stiffness: 350, damping: 26 }}
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
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
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
                              <p className="text-[9px] text-white/40 font-sans mt-0.5">
                                Rs {item.price.toLocaleString()} &times; {item.quantity}
                              </p>
                            </div>

                            {/* Inline quantity controller */}
                            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] p-0.5 rounded-full h-7">
                              <button
                                onClick={() => removeItem(item.id, item.size)}
                                className="w-5.5 h-5.5 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white transition-colors cursor-pointer"
                              >
                                <MinusIcon width={6} height={6} />
                              </button>
                              <span className="font-poppins font-bold text-[10px] text-white min-w-[10px] text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addItem(item.id, item.size)}
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
                      animate={isExpanded ? { rotate: 180, y: 0 } : { 
                        rotate: 0,
                        y: [0, -3, 0]
                      }}
                      transition={isExpanded ? { duration: 0.25 } : {
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 0.25 }
                      }}
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

function ProductCard({ product, cart, onAdd, onRemove, variants }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [activeSize, setActiveSize] = useState<string | undefined>(() => product.sizes?.[0]?.label);

  // Sync activeSize when product changes to avoid state leaks
  useEffect(() => {
    if (product.sizes) {
      setActiveSize(product.sizes[0]?.label);
    } else {
      setActiveSize(undefined);
    }
  }, [product.id, product.sizes]);

  const currentSizeKey = activeSize ? `${product.id}::${activeSize}` : product.id;
  const quantity = cart[currentSizeKey]?.quantity || 0;

  const currentPrice = activeSize && product.sizes
    ? (product.sizes.find((s) => s.label === activeSize)?.price ?? product.price)
    : product.price;

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
          opacity: hovered ? 0.18 : 0.05
        }}
      />

      {/* Floating Tag (e.g. Popular, Spicy, etc.) */}
      {product.tags?.map((tag) => (
        <div 
          key={tag}
          className="absolute top-4 left-4 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider font-poppins z-20"
          style={{
            backgroundColor: tag === "Spicy" ? "#EF4444" : "rgba(255,255,255,0.08)",
            border: tag === "Spicy" ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,255,255,0.1)",
            color: "#FFFFFF"
          }}
        >
          {tag}
        </div>
      ))}

      {/* Food Visual Frame */}
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
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "contain" }}
            priority={product.category === "stacks"}
          />
        </motion.div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-grow p-5 text-left">
        <h3 className="font-poppins font-black text-lg text-white leading-tight uppercase tracking-wide">
          {product.name}
        </h3>
        
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
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
          {product.id === "byo-stack" ? (
            <span className="font-poppins font-bold text-xs text-white/40 uppercase tracking-wider">
              Customizable
            </span>
          ) : (
            <span className="font-poppins font-black text-lg text-white">
              Rs {currentPrice.toLocaleString()}
            </span>
          )}

          <div className="relative flex items-center h-10">
            {product.id === "byo-stack" ? (
              <motion.a
                key="build-btn"
                href="/build"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[10px] font-poppins font-black uppercase text-[#0a0a0a] bg-brand shadow-[0_4px_12px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_20px_rgba(245,196,0,0.4)] transition-all duration-300 cursor-pointer select-none"
              >
                <span>Build</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11c0-2.2 2-4 4.5-4h9c2.5 0 4.5 1.8 4.5 4v1H3v-1z" />
      <path d="M21 16H3c-1.1 0-2 .9-2 2s.9 2 2 2h18c1.1 0 2-.9 2-2s-.9-2-2-2z" />
      <path d="M4 14h16" />
    </svg>
  );
}

function WrapIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="14" height="14" rx="4" transform="rotate(45 12 12)" />
      <path d="M9 9l6 6" />
    </svg>
  );
}

function FriesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
      <path d="M5 8h12v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <line x1="9" y1="2" x2="9" y2="8" />
    </svg>
  );
}

function PlusIcon({ width = 12, height = 12, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ width = 12, height = 12, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon({ width = 14, height = 14, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function ChevronUpIcon({ width = 12, height = 12, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
