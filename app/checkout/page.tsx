"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, useCartItemsList, useCartTotal, useCartCount } from "@/store/useCartStore";
import { BUSINESS_CONFIG } from "@/config/business";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartItemsList();
  const totalPrice = useCartTotal();
  const totalCount = useCartCount();
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to cart if empty
  useEffect(() => {
    if (mounted && items.length === 0 && !isSubmitting) {
      router.push("/cart");
    }
  }, [items, mounted, router, isSubmitting]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center text-white/50 font-poppins text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span>Setting up kitchen counter...</span>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: "name" | "phone" | "address", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", address: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Pakistani phone number validation
    const cleanPhone = formData.phone.replace(/[\s-]/g, ""); // Strip spaces/dashes
    const phoneRegex = /^((\+92)?(92)?(0)?3[0-9]{9})$/;
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Invalid Pakistani phone number (e.g. 03001234567)";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatWhatsAppMessage = (name: string, phone: string, address: string) => {
    const border = "━━━━━━━━━━━━━━";
    let msg = `${border}\n🍔 STACKD ORDER\n\nName:\n${name}\n\nPhone:\n${phone}\n\nAddress:\n${address}\n\n${border}\n\nORDER ITEMS\n\n`;
    
    items.forEach((item) => {
      const variantSuffix = item.size ? ` (${item.size})` : "";
      msg += `${item.quantity}x ${item.name}${variantSuffix}\n`;
      if (item.customization) {
        msg += `   • Bun: ${item.customization.bun}\n`;
        msg += `   • Protein: ${item.customization.protein}\n`;
        if (item.customization.toast) {
          msg += `   • Toast: ${item.customization.toast}\n`;
        }
        msg += `   • Cheese: ${item.customization.cheese || "None"}\n`;
        if (item.customization.veggies.length > 0) {
          msg += `   • Veggies: ${item.customization.veggies.join(", ")}\n`;
        }
        if (item.customization.sauces.length > 0) {
          msg += `   • Sauces: ${item.customization.sauces.join(", ")}\n`;
        }
        msg += `\n`;
      }
    });
    
    msg += `\n${border}\n\nTOTAL\n\n₨ ${totalPrice.toLocaleString()}\n\n${border}\n\nPlease confirm my order.\n${border}`;
    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    const msg = formatWhatsAppMessage(formData.name.trim(), cleanPhone, formData.address.trim());
    const encoded = encodeURIComponent(msg);
    
    // Redirect to WhatsApp Business API
    const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encoded}`;
    
    setTimeout(() => {
      window.location.href = waUrl;
      clearCart();
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-dark-primary flex flex-col items-center justify-center text-white text-center p-6 font-poppins relative overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-0 animate-pulse"
          style={{ background: "var(--color-brand)" }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6 relative z-10"
        >
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand/20 blur-[25px] rounded-full" 
            />
            <span className="text-5xl relative z-10">🚀</span>
          </div>
          <h2 className="text-3xl font-poppins font-black uppercase tracking-wide">
            Order Compiled!
          </h2>
          <p className="text-white/60 max-w-sm font-sans text-sm leading-relaxed">
            Redirecting to WhatsApp to send your burger specifications. Just press <strong>Send</strong> on your chat screen.
          </p>
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-brand"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // Real-time phone check to show checkmarks
  const cleanPhoneInput = formData.phone.replace(/[\s-]/g, "");
  const isPhoneValid = /^((\+92)?(92)?(0)?3[0-9]{9})$/.test(cleanPhoneInput);

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
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-poppins font-black uppercase tracking-wider text-brand/80 hover:text-brand hover:translate-x-[-4px] transition-all duration-300 mb-4 cursor-pointer"
          >
            &larr; Back to Cart
          </Link>
          <h1 className="text-4xl sm:text-5xl font-poppins font-black uppercase text-white tracking-tight leading-none">
            Frictionless <span className="text-brand">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden shadow-card">
              
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
              
              <h2 className="font-poppins font-black text-xl text-white uppercase tracking-wide mb-6 text-left">
                Customer Information
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/50">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. John Doe"
                    className={`px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white font-sans text-sm focus:outline-none transition-all duration-300 ${
                      errors.name 
                        ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]" 
                        : formData.name.trim() !== ""
                        ? "border-green-500/30 focus:border-green-500 focus:shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                        : "border-white/[0.08] focus:border-brand focus:shadow-[0_0_12px_rgba(245,196,0,0.15)]"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[10px] font-poppins font-bold uppercase text-red-500 mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="phone" className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/50">
                      Phone Number (Pakistani Mobile)
                    </label>
                    {isPhoneValid && (
                      <span className="text-[9px] font-poppins font-black uppercase text-green-500 tracking-widest flex items-center gap-1 animate-pulse">
                        ✓ Valid Format
                      </span>
                    )}
                  </div>
                  <input
                    id="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="e.g. 03001234567 or 0317 1511108"
                    className={`px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white font-sans text-sm focus:outline-none transition-all duration-300 ${
                      errors.phone 
                        ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]" 
                        : isPhoneValid
                        ? "border-green-500/30 focus:border-green-500 focus:shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                        : formData.phone.trim() !== ""
                        ? "border-white/[0.12] focus:border-brand focus:shadow-[0_0_12px_rgba(245,196,0,0.15)]"
                        : "border-white/[0.08] focus:border-brand focus:shadow-[0_0_12px_rgba(245,196,0,0.15)]"
                    }`}
                  />
                  {errors.phone ? (
                    <span className="text-[10px] font-poppins font-bold uppercase text-red-500 mt-1">
                      {errors.phone}
                    </span>
                  ) : (
                    <span className="text-[9px] text-white/30 font-sans">
                      Must start with 03 (e.g. 03xx xxxxxxx), 11 digits total.
                    </span>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-[10px] font-poppins font-bold uppercase tracking-wider text-white/50">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={4}
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="e.g. Apartment 3B, House 124, Street 14, Phase 5 DHA, Lahore"
                    className={`px-4 py-3 rounded-xl bg-white/[0.03] border text-white font-sans text-sm focus:outline-none transition-all duration-300 resize-none ${
                      errors.address 
                        ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]" 
                        : formData.address.trim() !== ""
                        ? "border-green-500/30 focus:border-green-500 focus:shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                        : "border-white/[0.08] focus:border-brand focus:shadow-[0_0_12px_rgba(245,196,0,0.15)]"
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[10px] font-poppins font-bold uppercase text-red-500 mt-1">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* Hidden submit trigger */}
                <button type="submit" className="hidden" />

              </form>
            </div>
          </div>

          {/* Final Review Section */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden shadow-card text-left flex flex-col">
              
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
              
              <h3 className="font-poppins font-black text-lg text-white uppercase tracking-wide mb-6">
                Order Review
              </h3>

              {/* Items List Preview */}
              <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-none mb-6 border-b border-white/[0.04] pb-6">
                {items.map((item) => {
                  const displayName = item.size
                    ? `${item.name} (${item.size})`
                    : item.name;

                  return (
                    <div key={item.key} className="flex items-center gap-3 py-1.5">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/[0.02] flex-shrink-0 flex items-center justify-center border border-white/[0.06]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="40px"
                          style={{ objectFit: "contain" }}
                          className="p-0.5"
                        />
                      </div>
                      <div className="flex-grow text-left">
                        <h4 className="font-poppins font-bold text-xs text-white leading-tight line-clamp-1">
                          {displayName}
                        </h4>
                        {item.customization && (
                          <div className="text-[9px] text-white/45 font-sans mt-1 space-y-0.5">
                            <div>Bun: {item.customization.bun} | Protein: {item.customization.protein}{item.customization.toast ? ` | Toast: ${item.customization.toast}` : ""}</div>
                            {item.customization.cheese && <div>Cheese: {item.customization.cheese}</div>}
                            {item.customization.veggies.length > 0 && <div className="line-clamp-1">Veggies: {item.customization.veggies.join(", ")}</div>}
                            {item.customization.sauces.length > 0 && <div className="line-clamp-1">Sauces: {item.customization.sauces.join(", ")}</div>}
                          </div>
                        )}
                        <p className="text-[10px] text-brand font-sans mt-1">
                          Rs {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-white/50 block font-sans">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-poppins font-bold text-xs text-white block">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Summary Details */}
              <div className="flex flex-col gap-3.5 text-xs font-sans mb-6">
                <div className="flex justify-between text-white/50">
                  <span>Subtotal</span>
                  <span className="font-poppins font-bold text-white">Rs {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Delivery Charges</span>
                  <span className="font-poppins font-bold text-brand uppercase tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-base border-t border-white/[0.04] pt-4 font-poppins font-black text-white uppercase">
                  <span>Grand Total</span>
                  <span>Rs {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Placement CTA */}
              <button 
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-brand text-[#0a0a0a] font-poppins font-extrabold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,196,0,0.25)] hover:shadow-[0_4px_30px_rgba(245,196,0,0.4)] hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                Place Order via WhatsApp
              </button>

              <div className="mt-4 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] text-[10px] text-white/40 leading-relaxed font-sans text-center">
                💬 Placing this order will bundle your choices and open WhatsApp with a ready message. Simply tap send inside WhatsApp to complete the order.
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
