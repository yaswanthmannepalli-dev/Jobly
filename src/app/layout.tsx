import type { Metadata } from "next";
import { Sora, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import PageTracker from "@/components/PageTracker";
import PageTransition from "@/components/PageTransition";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
});

import { getSiteContent } from "@/app/actions/cms";
import { ThemeProvider } from "@/components/ThemeProvider";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteContent("seo", {
    title: "NXT — Opportunity Starts Here",
    description: "Discover handpicked job opportunities from great companies, updated daily. No login required.",
  });
  return {
    title: seo.title,
    description: seo.description,
  };
}

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('nxt-theme');
      var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", sora.variable, inter.variable, "font-sans", geist.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-150">
        <ThemeProvider>
          <PageTracker />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
