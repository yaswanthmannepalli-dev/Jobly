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
        className="relative overflow-hidden rounded-2xl bg-[#25D366]/10 px-6 py-6 sm:px-8 sm:py-8 border border-[#25D366]/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)]">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Get Jobs Delivered to Your Phone
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Join 50,000+ professionals getting the top 10 remote jobs every morning.
            </p>
          </div>
        </div>

        <Link
          href="https://whatsapp.com/channel/nxt"
          target="_blank"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(37,211,102,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          Join WhatsApp
        </Link>
        
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#25D366]/5 blur-[40px]" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#25D366]/5 blur-[40px]" />
      </motion.div>
    </section>
  );
}
