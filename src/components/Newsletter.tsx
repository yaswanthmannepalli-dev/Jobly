"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

import { subscribeUser } from "@/app/actions/subscribe";

export default function Newsletter({ content }: { content?: { title: string; subtitle: string; } }) {
  const c = content || {
    title: "Stay ahead of the curve",
    subtitle: "Best roles, daily. No spam. Unsubscribe anytime."
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
    <section className="relative w-full overflow-hidden bg-surface/50 py-12 sm:py-16 my-8">
      {/* Background Gradient Blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-tint/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {c.title}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base leading-relaxed">
              {c.subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col max-w-md">
            {submitted ? (
              <div className="flex items-center justify-center gap-2 rounded-[6px] border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-600 w-fit">
                <Check size={16} /> You&rsquo;re subscribed
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center gap-2 rounded-[6px] border border-line bg-background p-1.5 pl-4"
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
                    className="shrink-0 rounded-[6px] bg-purple px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-purple/90 active:scale-[0.98] disabled:opacity-70"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {error && <p className="mt-2 text-xs font-medium text-rose-600 bg-rose-500/10 p-2 rounded-[5px] border border-rose-500/20">{error}</p>}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
