import type { Metadata } from "next";
import { getSiteContent } from "@/app/actions/cms";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Privacy Policy | NXT.",
  description: "Our Privacy Policy outlines how we collect, use, and protect your data.",
};

const DEFAULT_PRIVACY = `Last updated: ${new Date().toLocaleDateString()}

## 1. Information We Collect
We collect information you provide directly to us, such as when you create or modify your account, apply for jobs, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.

## 2. How We Use Your Information
We may use the information we collect about you to:
- Provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages;
- Perform internal operations, including, for example, to prevent fraud and abuse of our Services; to troubleshoot software bugs and operational problems; to conduct data analysis, testing, and research; and to monitor and analyze usage and activity trends;
- Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of NXT. and other companies, where permissible and according to local applicable laws; and to process contest, sweepstake, or other promotion entries and fulfill any related awards;
- Personalize and improve the Services, including to provide or recommend features, content, social connections, referrals, and advertisements.

## 3. Sharing of Information
We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
- With employers and recruiters when you apply for a job;
- With third parties to provide you a service you requested through a partnership or promotional offering made by a third party or us;
- With the general public if you submit content in a public forum, such as blog comments, social media posts, or other features of our Services that are viewable by the general public;
- With third parties with whom you choose to let us share information, for example other apps or websites that integrate with our API or Services, or those with an API or Service with which we integrate;

## 4. Security
We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.

## 5. Contact Us
If you have any questions about this Privacy Statement, please contact us at contact@nxt.com.`;

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent("privacyPolicy", DEFAULT_PRIVACY);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert prose-purple max-w-none text-muted">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
