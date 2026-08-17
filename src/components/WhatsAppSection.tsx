"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[5px] bg-[#25D366]/5 px-6 py-6 sm:px-8 sm:py-8 border border-[#25D366]/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[5px] bg-[#25D366] text-white">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Jobs on WhatsApp, daily
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Top 10 remote roles. Every morning.
            </p>
          </div>
        </div>

        <Link
          href="https://whatsapp.com/channel/nxt"
          target="_blank"
          className="shrink-0 inline-flex items-center gap-2 rounded-[6px] bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#25D366]/90 active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          Join WhatsApp
        </Link>
      </motion.div>
    </section>
  );
}
