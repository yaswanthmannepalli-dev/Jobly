import Link from "next/link";

const Facebook = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsApp = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

import { getSiteContent } from "@/app/actions/cms";

export default async function SiteFooter() {
  const c = await getSiteContent("footer", {
    tagline: "Curated careers for ambitious professionals. Built in India, for the world. Stop scrolling through noise, start finding signal.",
    copyright: "© " + new Date().getFullYear() + " NXT. All rights reserved.",
    developer: "Designed & Developed by Tekloria Solutions"
  });

  return (
    <footer id="about" className="relative overflow-hidden border-t border-line bg-surface/60 pt-16 pb-8">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          
          <div className="max-w-xs">
            <span className="text-2xl font-bold tracking-tight">
              NXT<span className="text-purple">.</span>
            </span>
            <p className="mt-4 text-sm text-muted leading-relaxed whitespace-pre-line">
              {c.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-muted hover:text-[#25D366] transition-colors"><WhatsApp size={20} /></a>
              <a href="#" className="text-muted hover:text-[#E1306C] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted hover:text-[#1877F2] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Explore</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li><Link className="link-underline" href="/jobs">Jobs</Link></li>
                <li><Link className="link-underline" href="/categories">Categories</Link></li>
                <li><Link className="link-underline" href="/about">About Us</Link></li>
                <li><Link className="link-underline" href="/saved">Saved Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Legal</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li><Link className="link-underline" href="#">Privacy Policy</Link></li>
                <li><Link className="link-underline" href="#">Terms of Service</Link></li>
                <li><Link className="link-underline" href="#">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-line/50 pt-6 text-xs text-muted">
          <p>{c.copyright}</p>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block">{c.developer}</span>
            <img src="/images/tekloria.jpg" alt="Tekloria Solutions" className="h-8 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Massive Background Logo layered underneath */}
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-end justify-center p-6 sm:p-8 opacity-[0.04]">
        <span className="text-[16vw] font-black leading-none tracking-tighter">
          NXT.
        </span>
      </div>
    </footer>
  );
}
