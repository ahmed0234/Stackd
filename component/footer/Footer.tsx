"use client";

import { motion } from "motion/react";
import NavLogo from "@/component/navbar/NavLogo";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
} from "react-icons/fa";

// ─── Social Media Configurations ─────────────────────────────────────

const SOCIALS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/923171511108", // Placeholder link
    icon: FaWhatsapp,
    glowColor: "rgba(37, 211, 102, 0.15)",
    hoverColor: "#25D366",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/stackd.inc?igsh=MWYxMGh6cGYyZmdxcg==",
    icon: FaInstagram,
    glowColor: "rgba(225, 48, 108, 0.15)",
    hoverColor: "#E1306C",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@stackd.inc?_r=1&_t=ZS-97SbtXYEttJ",
    icon: FaTiktok,
    glowColor: "rgba(254, 44, 85, 0.15)",
    hoverColor: "#FE2C55",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-6 md:pt-8"
      style={{ contentVisibility: "auto" }}
    >
      {/* Tight, Elegant Glassmorphic Card */}
      <div
        className="relative w-full rounded-2xl md:rounded-[20px] overflow-hidden py-4 px-6 md:py-5 md:px-8 border transition-all duration-500"
        style={{
          background: "var(--color-glass)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(245, 196, 0, 0.10)", // Minimal border utilizing STACKD gold
          boxShadow: "var(--shadow-nav)",
        }}
      >
        {/* Top reflection line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-[15%] right-[15%] h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245, 196, 0, 0.18), transparent)",
          }}
        />

        {/* Top Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-between mb-4 md:mb-5">
          {/* Left Side: Clickable STACKD Logo */}
          <div className="flex justify-center md:justify-start">
            <NavLogo />
          </div>

          {/* Center Section: Compact Social Icons Capsule with label */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-sans text-[10px] font-bold tracking-widest text-white/30 uppercase select-none">
              Socials
            </span>
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.04]"
              style={{
                background: "rgba(255, 255, 255, 0.015)",
              }}
            >
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit STACKD on ${social.name}`}
                  whileHover="hover"
                  initial="initial"
                  className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300"
                  style={{
                    color: "var(--color-text-secondary)",
                  }}
                  variants={{
                    hover: {
                      scale: 1.1,
                      color: social.hoverColor,
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    },
                  }}
                >
                  {/* Glow circle behind icon on hover */}
                  <motion.div
                    className="absolute inset-[-4px] pointer-events-none rounded-full z-[-1]"
                    style={{
                      background: `radial-gradient(circle at center, ${social.glowColor} 0%, transparent 65%)`,
                    }}
                    variants={{
                      hover: { opacity: 1, scale: 1.1 },
                      initial: { opacity: 0, scale: 0.8 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Section: Compact Location Indicator with label */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className="font-sans text-[10px] font-bold tracking-widest text-white/30 uppercase select-none">
              Location
            </span>
            <div className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors duration-300 cursor-default">
              <span className="font-sans text-xs font-semibold tracking-widest uppercase">
                Rawalpindi
              </span>
              <span
                className="text-[var(--color-brand)] flex items-center"
                aria-hidden="true"
              >
                <FaMapMarkerAlt size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          aria-hidden="true"
          className="w-full h-[1px] mb-4 md:mb-5"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.01))",
          }}
        />

        {/* Bottom Content Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
          {/* Bottom Left: Copyright */}
          <div className="text-white/35 text-center md:text-left font-sans font-medium tracking-wide">
            © {currentYear} STACKD. All rights reserved.
          </div>

          {/* Bottom Right: ~Made by Ahmed Signature */}
          <div className="flex items-center">
            <a
              href="https://ahmedhportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center py-0.5 overflow-visible text-white/35 hover:text-white transition-colors duration-300 select-none cursor-pointer"
            >
              <span className="relative z-10 font-sans tracking-widest font-semibold">
                ~Made by Ahmed
              </span>

              {/* Dynamic Underline reveal */}
              <span
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--color-brand)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  boxShadow: "0 0 6px var(--color-brand)",
                }}
              />

              {/* Glow highlight */}
              <span className="absolute inset-0 bg-[var(--color-brand)] opacity-0 group-hover:opacity-[0.06] blur-sm transition-opacity duration-300 rounded-sm -z-10" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
