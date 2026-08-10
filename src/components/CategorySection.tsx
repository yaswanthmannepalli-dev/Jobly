"use client";

import { motion } from "framer-motion";
import {
  Code2,
  PenTool,
  Megaphone,
  BarChart3,
  Handshake,
  LifeBuoy,
} from "lucide-react";
import { Job, JobCategory } from "@/lib/types";

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
  active,
  onSelect,
}: {
  jobs: Job[];
  categories: any[];
  active: JobCategory | null;
  onSelect: (c: JobCategory | null) => void;
}) {
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
          const Icon = icons[cat.icon];
          const count = jobs.filter((j) => j.category === cat.name).length;
          const isActive = active === cat.name;
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
              onClick={() => onSelect(isActive ? null : (cat.name as JobCategory))}
              className={`group flex min-w-[136px] shrink-0 flex-col items-start gap-3 rounded-2xl border px-5 py-5 text-left transition-colors sm:min-w-0 ${
                isActive
                  ? "border-purple/50 bg-purple-tint"
                  : "border-line bg-white hover:border-purple/30 hover:bg-surface"
              }`}
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isActive ? "bg-white" : "bg-surface"
                }`}
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
