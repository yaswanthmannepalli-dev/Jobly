"use client";

import { motion } from "framer-motion";

export default function NxtLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40"
    >
      {/* 
        The SVG Circle Ring 
        We use a spinning SVG with a gradient stroke to create a premium, futuristic loader.
      */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
        }}
      >
        <defs>
          <linearGradient id="nxt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124, 92, 252, 1)" />
            <stop offset="50%" stopColor="rgba(124, 92, 252, 0.4)" />
            <stop offset="100%" stopColor="rgba(124, 92, 252, 0)" />
          </linearGradient>
        </defs>
        
        {/* Background track (optional, but keep it clean without it for now) */}
        {/* <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(124, 92, 252, 0.05)" strokeWidth="2" /> */}

        {/* Foreground animated ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#nxt-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          // Dash array creates the gap/partially drawn effect
          strokeDasharray="200 100"
        />
      </motion.svg>

      {/* Center Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">
          NXT<span className="text-purple">.</span>
        </span>
      </div>
    </motion.div>
  );
}
