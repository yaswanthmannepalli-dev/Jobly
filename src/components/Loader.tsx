"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nxt:");
    if (seen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with sessionStorage, client-only by design
    setVisible(true);
    sessionStorage.setItem("nxt:", "1");
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight font-[var(--font-sora)]">
            <span>NXT.</span>
            <motion.span
              className="inline-block h-2.5 w-2.5 rounded-full bg-purple"
              animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
