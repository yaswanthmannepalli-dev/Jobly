"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

import { subscribeUser } from "@/app/actions/subscribe";

export default function Newsletter({ content }: { content?: { title: string; subtitle: string; } }) {
  const c = content || {
    title: "Never miss a great opportunity",
    subtitle: "One email, once a day. Only the roles worth your time — zero spam, unsubscribe anytime."
  };

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("email", email);
    
    const result = await subscribeUser(formData);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative overflow-hidden rounded-3xl bg-purple px-6 py-10 text-white sm:px-10 sm:py-12"
      >
        <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl whitespace-pre-line">
              {c.title}
            </h2>
            <p className="mt-2 text-sm text-white/80 sm:text-base whitespace-pre-line">
              {c.subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col max-w-md">
            {submitted ? (
              <div className="flex items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium w-fit">
                <Check size={16} /> You&rsquo;re subscribed
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center gap-2 rounded-full bg-white p-1.5 pl-4"
                >
              <Mail size={16} className="shrink-0 text-purple" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
            </>
          )}
        </div>
        </div>
      </motion.div>
    </section>
  );
}
