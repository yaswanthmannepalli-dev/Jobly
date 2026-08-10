"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  PenTool,
  Megaphone,
  BarChart3,
  Handshake,
  LifeBuoy,
} from "lucide-react";
import { Job } from "@/lib/types";

const icons: Record<string, any> = {
  code: Code2,
  pen: PenTool,
  megaphone: Megaphone,
  chart: BarChart3,
  handshake: Handshake,
  "life-buoy": LifeBuoy,
};

export default function CategorySection({
  jobs,
  categories,
}: {
  jobs: Job[];
  categories: any[];
}) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCategoryClick = (catName: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    router.push(`/categories/${catName.toLowerCase()}`);
  };

  return (
    <section id="categories" className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-10 flex flex-col gap-2"
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Browse by category
        </h2>
        <p className="text-sm text-muted sm:text-base">
          Skip the endless scrolling. Zero in on your speciality and find what fits.
        </p>
      </motion.div>

      <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const Icon = icons[cat.icon] || Code2;
          const count = jobs.filter((j) => j.category === cat.name).length;
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
              onClick={() => handleCategoryClick(cat.name)}
              disabled={isNavigating}
              className="group flex min-w-[136px] shrink-0 flex-col items-start gap-3 rounded-2xl border px-5 py-5 text-left transition-colors sm:min-w-0 border-line bg-white hover:border-purple/30 hover:bg-surface cursor-pointer"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface transition-colors group-hover:bg-white"
              >
                <Icon size={19} className="text-purple" strokeWidth={1.7} />
              </motion.span>
              <div>
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="text-xs text-muted group-hover:text-purple-dark">
                  {count} open roles
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
