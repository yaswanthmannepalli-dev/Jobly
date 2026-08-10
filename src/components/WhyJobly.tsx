"use client";

import { motion } from "framer-motion";
import { CalendarClock, Zap, Gem, ShieldOff } from "lucide-react";

const points = [
  {
    icon: CalendarClock,
    title: "Refreshed every 24 hours",
    text: "Our team reviews and adds new roles daily so you\u2019re never looking at stale listings.",
  },
  {
    icon: Zap,
    title: "Apply in seconds",
    text: "No 10-step forms. See a role, click through, and land directly on the company\u2019s application page.",
  },
  {
    icon: Gem,
    title: "Quality over quantity",
    text: "We list dozens of hand-picked roles, not thousands of duplicates. Every listing earns its spot.",
  },
  {
    icon: ShieldOff,
    title: "Zero sign-up required",
    text: "Browse, filter, and save jobs without creating an account. Your privacy comes first.",
  },
];

export default function WhyJobly({ content }: { content?: any }) {
  const c = content || {
    title: "Why Jobly?",
    points: [
      { title: "Refreshed every 24 hours", text: "Our team reviews and adds new roles daily so you’re never looking at stale listings." },
      { title: "Apply in seconds", text: "No 10-step forms. See a role, click through, and land directly on the company’s application page." },
      { title: "Quality over quantity", text: "We list dozens of hand-picked roles, not thousands of duplicates. Every listing earns its spot." },
      { title: "Zero sign-up required", text: "Browse, filter, and save jobs without creating an account. Your privacy comes first." }
    ]
  };

  const icons = [CalendarClock, Zap, Gem, ShieldOff];

  return (
    <section className="bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl whitespace-pre-line"
        >
          {c.title}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.points.map((p: any, i: number) => {
            const Icon = icons[i] || CalendarClock;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-tint">
                  <Icon size={19} className="text-purple" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground whitespace-pre-line">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted whitespace-pre-line">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
