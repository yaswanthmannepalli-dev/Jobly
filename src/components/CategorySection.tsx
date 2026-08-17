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

const icons: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
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
  categories: { id: string; name: string; icon: string }[];
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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-10 flex flex-col gap-2"
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Browse by category
        </h2>
        <p className="text-sm text-muted sm:text-base text-justify leading-relaxed">
          Skip the endless scrolling. Zero in on your speciality and find what fits.
        </p>
      </motion.div>

      <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {categories.slice(0, 8).map((category, i) => {
          const Icon = icons[category.icon] || Code2;
          const count = jobs.filter((j) => j.category === category.name).length;
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
              onClick={() => handleCategoryClick(category.name)}
              disabled={isNavigating}
              className="group flex min-w-[136px] shrink-0 flex-col items-start gap-3 rounded-[5px] border border-line bg-surface/50 p-5 text-left transition-colors duration-150 hover:border-purple/40 hover:bg-surface sm:min-w-0 cursor-pointer"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-line bg-surface transition-colors duration-150 group-hover:bg-surface-2">
                <Icon size={19} className="text-purple" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{category.name}</p>
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
