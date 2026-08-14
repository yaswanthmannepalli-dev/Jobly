import { getSiteContent } from "@/app/actions/cms";
import CMSClient from "./CMSClient";

export default async function CMSPage() {
  const heroContent = await getSiteContent("hero", {
    title: "Land the career\nyou deserve"
  });

  const newsletterContent = await getSiteContent("newsletter", {
    title: "Never miss a great opportunity",
    subtitle: "One email, once a day. Only the roles worth your time — zero spam, unsubscribe anytime."
  });

  const whyNxtContent = await getSiteContent("whyNxt", {
    title: "Why NXT?",
    points: [
      { title: "Refreshed every 24 hours", text: "Our team reviews and adds new roles daily so you’re never looking at stale listings." },
      { title: "Apply in seconds", text: "No 10-step forms. See a role, click through, and land directly on the company’s application page." },
      { title: "Quality over quantity", text: "We list dozens of hand-picked roles, not thousands of duplicates. Every listing earns its spot." },
      { title: "Zero sign-up required", text: "Browse, filter, and save jobs without creating an account. Your privacy comes first." }
    ]
  });

  const footerContent = await getSiteContent("footer", {
    tagline: "Curated careers for ambitious professionals. Built in India, for the world. Stop scrolling through noise, start finding signal.",
    copyright: "© " + new Date().getFullYear() + " NXT. All rights reserved.",
    developer: "Designed & Developed by Tekloria Solutions"
  });

  const seoContent = await getSiteContent("seo", {
    title: "NXT — Opportunity Starts Here",
    description: "Discover handpicked job opportunities from great companies, updated daily. No login required.",
  });

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Content Management</h1>
      <p className="text-muted mb-8 max-w-2xl">
        Update the text and configuration for your public website here. Changes are saved instantly to the live site.
      </p>

      <CMSClient 
        initialHero={heroContent} 
        initialNewsletter={newsletterContent} 
        initialWhyNxt={whyNxtContent} 
        initialFooter={footerContent} 
        initialSeo={seoContent}
      />
    </div>
  );
}
