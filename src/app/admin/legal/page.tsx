import { getSiteContent } from "@/app/actions/cms";
import LegalClient from "./LegalClient";

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

const DEFAULT_TERMS = `Last updated: ${new Date().toLocaleDateString()}

## 1. Acceptance of Terms
By accessing or using NXT.'s services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access our services.

## 2. Description of Service
NXT. provides a platform connecting job seekers with employers. We do not guarantee employment or the accuracy of job listings provided by third parties.

## 3. User Accounts
When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account and must keep your password secure.

## 4. Acceptable Use
You agree not to use our services for any illegal or unauthorized purpose. You must not attempt to hack, destabilize, or adapt our website.

## 5. Termination
We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service.

## 6. Contact Us
For any questions regarding these Terms, please contact contact@nxt.com.`;

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

export default async function LegalPage() {
  const privacyPolicy = await getSiteContent("privacyPolicy", DEFAULT_PRIVACY);
  const termsOfService = await getSiteContent("termsOfService", DEFAULT_TERMS);
  const cookiePolicy = await getSiteContent("cookiePolicy", DEFAULT_COOKIE);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Legal Content (CMS)</h1>
        <p className="text-muted mt-2">Manage the content of your public Legal pages here.</p>
        <p className="text-sm text-purple mt-1 font-medium bg-purple-tint px-3 py-1.5 rounded-md inline-block">Supports Markdown formatting (# Headers, **Bold**, - Lists, etc.)</p>
      </div>

      <LegalClient 
        initialPrivacyPolicy={privacyPolicy}
        initialTermsOfService={termsOfService}
        initialCookiePolicy={cookiePolicy}
      />
    </div>
  );
}
