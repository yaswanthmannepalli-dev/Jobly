"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MagneticArrow({ size = 36 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/arrow flex items-center justify-center rounded-full border border-line bg-white transition-colors group-hover/row:border-purple/40 group-hover/row:bg-purple-tint"
      style={{ width: size, height: size }}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <ArrowUpRight
          size={size * 0.5}
          className="text-foreground/70 transition-colors group-hover/row:text-purple"
          strokeWidth={2}
        />
      </motion.div>
    </div>
  );
}
