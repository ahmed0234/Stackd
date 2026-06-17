"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import NavActions from "./NavActions";
import BuildYourStackCTA from "./BuildYourStackCTA";
import NavLogo from "./NavLogo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(11, 11, 11, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 48px rgba(0,0,0,0.55)" : "none",
          transition:
            "padding 0.4s ease, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Ambient glow strip */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(245,196,0,0.4), transparent)",
              pointerEvents: "none",
            }}
          />
        )}

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Logo */}
          <NavLogo />

          {/* Right Actions & Menu Trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Desktop Actions */}
            <div
              className="hidden md:flex"
              style={{ alignItems: "center", gap: 8 }}
            >
              <NavActions cartCount={cartCount} />
              <BuildYourStackCTA />
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden" style={{ alignItems: "center" }}>
              <NavActions cartCount={cartCount} compact />
            </div>

            {/* Premium Hamburger (Mobile Only) */}
            <div className="flex md:hidden">
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((p) => !p)}
                style={{
                  width: 44,
                  height: 44,
                  background: menuOpen
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.04)",
                  border: menuOpen
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!menuOpen) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!menuOpen) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }
                }}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            cartCount={cartCount}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="2"
        x2="20"
        y2="2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={
          open
            ? { rotate: 45, y: 6, x1: 0, y1: 2, x2: 20, y2: 2 }
            : { rotate: 0, y: 0 }
        }
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line
        x1="0"
        y1="8"
        x2="20"
        y2="8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="0"
        y1="14"
        x2="20"
        y2="14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
