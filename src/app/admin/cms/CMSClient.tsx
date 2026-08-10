"use client";

import { useState } from "react";
import { updateSiteContent } from "@/app/actions/cms";
import { Loader2, Save } from "lucide-react";

export default function CMSClient({ initialHero, initialNewsletter, initialWhyJobly, initialFooter, initialSeo }: any) {
  const [hero, setHero] = useState(initialHero);
  const [newsletter, setNewsletter] = useState(initialNewsletter);
  const [whyJobly, setWhyJobly] = useState(initialWhyJobly);
  const [footer, setFooter] = useState(initialFooter);
  const [seo, setSeo] = useState(initialSeo);
  
  const [savingHero, setSavingHero] = useState(false);
  const [savingNewsletter, setSavingNewsletter] = useState(false);
  const [savingWhyJobly, setSavingWhyJobly] = useState(false);
  const [savingFooter, setSavingFooter] = useState(false);
  const [savingSeo, setSavingSeo] = useState(false);
  
  const [heroMessage, setHeroMessage] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [whyJoblyMessage, setWhyJoblyMessage] = useState("");
  const [footerMessage, setFooterMessage] = useState("");
  const [seoMessage, setSeoMessage] = useState("");

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    setHeroMessage("");
    const res = await updateSiteContent("hero", hero);
    setSavingHero(false);
    if (res.success) setHeroMessage(res.message || "Success");
    else setHeroMessage(res.error || "Failed");
    setTimeout(() => setHeroMessage(""), 3000);
  };

  const handleSaveNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingNewsletter(true);
    setNewsletterMessage("");
    const res = await updateSiteContent("newsletter", newsletter);
    setSavingNewsletter(false);
    if (res.success) setNewsletterMessage(res.message || "Success");
    else setNewsletterMessage(res.error || "Failed");
    setTimeout(() => setNewsletterMessage(""), 3000);
  };

  const handleSaveWhyJobly = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingWhyJobly(true);
    setWhyJoblyMessage("");
    const res = await updateSiteContent("whyJobly", whyJobly);
    setSavingWhyJobly(false);
    if (res.success) setWhyJoblyMessage(res.message || "Success");
    else setWhyJoblyMessage(res.error || "Failed");
    setTimeout(() => setWhyJoblyMessage(""), 3000);
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingFooter(true);
    setFooterMessage("");
    const res = await updateSiteContent("footer", footer);
    setSavingFooter(false);
    if (res.success) setFooterMessage(res.message || "Success");
    else setFooterMessage(res.error || "Failed");
    setTimeout(() => setFooterMessage(""), 3000);
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSeo(true);
    setSeoMessage("");
    const res = await updateSiteContent("seo", seo);
    setSavingSeo(false);
    if (res.success) setSeoMessage(res.message || "Success");
    else setSeoMessage(res.error || "Failed");
    setTimeout(() => setSeoMessage(""), 3000);
  };

  const updateWhyJoblyPoint = (index: number, field: string, value: string) => {
    const newPoints = [...whyJobly.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setWhyJobly({ ...whyJobly, points: newPoints });
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Hero Section Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Hero Section</h2>
          <p className="text-sm text-muted">The main banner at the top of the homepage.</p>
        </div>
        <form onSubmit={handleSaveHero} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input 
              type="text" 
              value={hero.title} 
              onChange={e => setHero({...hero, title: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subheadline</label>
            <textarea 
              value={hero.subtitle} 
              onChange={e => setHero({...hero, subtitle: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              rows={3}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Value</label>
              <input 
                type="text" 
                value={hero.stats1} 
                onChange={e => setHero({...hero, stats1: e.target.value})} 
                className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 1 Label</label>
              <input 
                type="text" 
                value={hero.stats1Label} 
                onChange={e => setHero({...hero, stats1Label: e.target.value})} 
                className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Value</label>
              <input 
                type="text" 
                value={hero.stats2} 
                onChange={e => setHero({...hero, stats2: e.target.value})} 
                className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stat 2 Label</label>
              <input 
                type="text" 
                value={hero.stats2Label} 
                onChange={e => setHero({...hero, stats2Label: e.target.value})} 
                className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Image URL</label>
            <input 
              type="text" 
              value={hero.imageUrl || ""} 
              onChange={e => setHero({...hero, imageUrl: e.target.value})} 
              placeholder="/images/Hero image.png"
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple mb-1"
            />
            <p className="text-xs text-muted font-medium flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Recommended Image Size: 800px (Width) x 800px (Height). Use transparent PNG for best results.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{heroMessage}</p>
            <button 
              type="submit" 
              disabled={savingHero}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingHero ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingHero ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Why Jobly Section Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Why Jobly Section</h2>
          <p className="text-sm text-muted">The features and benefits section.</p>
        </div>
        <form onSubmit={handleSaveWhyJobly} className="p-6 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Section Title</label>
            <input 
              type="text" 
              value={whyJobly.title} 
              onChange={e => setWhyJobly({...whyJobly, title: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              required 
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-sm border-b border-line pb-2">Feature Points</h3>
            {whyJobly.points.map((point: any, idx: number) => (
              <div key={idx} className="p-4 border border-line rounded-lg bg-surface/20 flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Point {idx + 1} Title</label>
                  <input 
                    type="text" 
                    value={point.title} 
                    onChange={e => updateWhyJoblyPoint(idx, "title", e.target.value)} 
                    className="w-full px-3 py-1.5 border border-line rounded-md text-sm"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Point {idx + 1} Text</label>
                  <textarea 
                    value={point.text} 
                    onChange={e => updateWhyJoblyPoint(idx, "text", e.target.value)} 
                    className="w-full px-3 py-1.5 border border-line rounded-md text-sm"
                    rows={2}
                    required 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{whyJoblyMessage}</p>
            <button 
              type="submit" 
              disabled={savingWhyJobly}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingWhyJobly ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingWhyJobly ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Newsletter Section Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Newsletter Section</h2>
          <p className="text-sm text-muted">The email collection banner at the bottom of the homepage.</p>
        </div>
        <form onSubmit={handleSaveNewsletter} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input 
              type="text" 
              value={newsletter.title} 
              onChange={e => setNewsletter({...newsletter, title: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subheadline</label>
            <textarea 
              value={newsletter.subtitle} 
              onChange={e => setNewsletter({...newsletter, subtitle: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              rows={3}
              required 
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{newsletterMessage}</p>
            <button 
              type="submit" 
              disabled={savingNewsletter}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingNewsletter ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingNewsletter ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Footer Section Form */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="bg-surface px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-lg">Footer Section</h2>
          <p className="text-sm text-muted">The bottom navigation and information.</p>
        </div>
        <form onSubmit={handleSaveFooter} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tagline</label>
            <textarea 
              value={footer.tagline} 
              onChange={e => setFooter({...footer, tagline: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              rows={2}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Copyright Text</label>
            <input 
              type="text" 
              value={footer.copyright} 
              onChange={e => setFooter({...footer, copyright: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Developer Credits</label>
            <input 
              type="text" 
              value={footer.developer} 
              onChange={e => setFooter({...footer, developer: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              required 
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{footerMessage}</p>
            <button 
              type="submit" 
              disabled={savingFooter}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingFooter ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingFooter ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Global SEO Section */}
      <section className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
        <div className="border-b border-line px-6 py-4 bg-surface/50">
          <h2 className="text-lg font-bold text-foreground">Global SEO Settings</h2>
          <p className="text-sm text-muted">Update the meta title and description for search engines.</p>
        </div>
        <form onSubmit={handleSaveSeo} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Title</label>
            <input 
              type="text" 
              value={seo.title || ""} 
              onChange={e => setSeo({...seo, title: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea 
              rows={3}
              value={seo.description || ""} 
              onChange={e => setSeo({...seo, description: e.target.value})} 
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple resize-none"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-green-600 font-medium">{seoMessage}</p>
            <button 
              type="submit" 
              disabled={savingSeo}
              className="flex items-center gap-2 bg-purple text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 disabled:opacity-70 transition"
            >
              {savingSeo ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {savingSeo ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
