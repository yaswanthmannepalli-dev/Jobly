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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", sora.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PageTracker />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
