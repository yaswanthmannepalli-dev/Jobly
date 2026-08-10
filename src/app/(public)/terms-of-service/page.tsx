import type { Metadata } from "next";
import { getSiteContent } from "@/app/actions/cms";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Terms and Conditions | NXT.",
  description: "Terms and Conditions and usage for NXT..",
};

const DEFAULT_TERMS = `Last updated: ${new Date().toLocaleDateString()}

## 1. Acceptance of Terms
By accessing or using NXT.'s services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you may not access our services.

## 2. Description of Service
NXT. provides a platform connecting job seekers with employers. We do not guarantee employment or the accuracy of job listings provided by third parties.

## 3. User Accounts
When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account and must keep your password secure.

## 4. Acceptable Use
You agree not to use our services for any illegal or unauthorized purpose. You must not attempt to hack, destabilize, or adapt our website.

## 5. Termination
We reserve the right to suspend or terminate your account at any time for violations of these Terms and Conditions.

## 6. Contact Us
For any questions regarding these Terms, please contact contact@nxt.com.`;

export default async function TermsOfServicePage() {
  const content = await getSiteContent("termsOfService", DEFAULT_TERMS);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Terms and Conditions</h1>
        
        <div className="prose prose-slate dark:prose-invert prose-purple max-w-none text-muted">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
