import type { Metadata } from "next";
import { getSiteContent } from "@/app/actions/cms";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Cookie Policy | NXT.",
  description: "How we use cookies and similar technologies on NXT..",
};

const DEFAULT_COOKIE = `Last updated: ${new Date().toLocaleDateString()}

## 1. What Are Cookies?
Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.

## 2. How We Use Cookies
We use cookies for the following purposes:
- **Essential Cookies**: Required for the basic functioning of the site.
- **Analytics Cookies**: To understand how visitors interact with our website.
- **Preference Cookies**: To remember your settings and preferences.

## 3. Managing Cookies
Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.

## 4. Contact Us
If you have questions about our use of cookies, contact us at contact@nxt.com.`;

export default async function CookiePolicyPage() {
  const content = await getSiteContent("cookiePolicy", DEFAULT_COOKIE);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Cookie Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert prose-purple max-w-none text-muted">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
