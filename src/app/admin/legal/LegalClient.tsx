"use client";

import { useState } from "react";
import { updateSiteContent } from "@/app/actions/cms";
import { Loader2, Save } from "lucide-react";

export default function LegalClient({ 
  initialPrivacyPolicy, 
  initialTermsOfService, 
  initialCookiePolicy 
}: { 
  initialPrivacyPolicy: string, 
  initialTermsOfService: string, 
  initialCookiePolicy: string 
}) {
  const [privacyPolicy, setPrivacyPolicy] = useState(initialPrivacyPolicy);
  const [termsOfService, setTermsOfService] = useState(initialTermsOfService);
  const [cookiePolicy, setCookiePolicy] = useState(initialCookiePolicy);
  
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [savingTerms, setSavingTerms] = useState(false);
  const [savingCookie, setSavingCookie] = useState(false);
  
  const [privacyMessage, setPrivacyMessage] = useState("");
  const [termsMessage, setTermsMessage] = useState("");
  const [cookieMessage, setCookieMessage] = useState("");

  const handleSavePrivacy = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPrivacy(true);
    setPrivacyMessage("");
    const res = await updateSiteContent("privacyPolicy", privacyPolicy);
    setSavingPrivacy(false);
    if (res.success) setPrivacyMessage(res.message || "Success");
    else setPrivacyMessage(res.error || "Failed");
    setTimeout(() => setPrivacyMessage(""), 3000);
  };

  const handleSaveTerms = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTerms(true);
    setTermsMessage("");
    const res = await updateSiteContent("termsOfService", termsOfService);
    setSavingTerms(false);
    if (res.success) setTermsMessage(res.message || "Success");
    else setTermsMessage(res.error || "Failed");
    setTimeout(() => setTermsMessage(""), 3000);
  };

  const handleSaveCookie = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCookie(true);
    setCookieMessage("");
    const res = await updateSiteContent("cookiePolicy", cookiePolicy);
    setSavingCookie(false);
    if (res.success) setCookieMessage(res.message || "Success");
    else setCookieMessage(res.error || "Failed");
    setTimeout(() => setCookieMessage(""), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Privacy Policy Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Privacy Policy</h2>
        </div>
        <form onSubmit={handleSavePrivacy} className="p-6 flex flex-col gap-4">
          <div>
            <textarea 
              value={privacyPolicy} 
              onChange={e => setPrivacyPolicy(e.target.value)} 
              className="w-full px-4 py-4 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple font-mono text-sm resize-y"
              rows={15}
              required 
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{privacyMessage}</p>
            <button 
              type="submit" 
              disabled={savingPrivacy}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingPrivacy ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingPrivacy ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Terms of Service Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Terms and Conditions</h2>
        </div>
        <form onSubmit={handleSaveTerms} className="p-6 flex flex-col gap-4">
          <div>
            <textarea 
              value={termsOfService} 
              onChange={e => setTermsOfService(e.target.value)} 
              className="w-full px-4 py-4 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple font-mono text-sm resize-y"
              rows={15}
              required 
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{termsMessage}</p>
            <button 
              type="submit" 
              disabled={savingTerms}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingTerms ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingTerms ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Cookie Policy Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Cookie Policy</h2>
        </div>
        <form onSubmit={handleSaveCookie} className="p-6 flex flex-col gap-4">
          <div>
            <textarea 
              value={cookiePolicy} 
              onChange={e => setCookiePolicy(e.target.value)} 
              className="w-full px-4 py-4 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple font-mono text-sm resize-y"
              rows={15}
              required 
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{cookieMessage}</p>
            <button 
              type="submit" 
              disabled={savingCookie}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingCookie ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingCookie ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
