"use client";


const companies = [
  { name: "Google", domain: "google.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Apple", domain: "apple.com" },
  { name: "Meta", domain: "facebook.com" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "Spotify", domain: "spotify.com" },
  { name: "Adobe", domain: "adobe.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Shopify", domain: "shopify.com" },
  { name: "Atlassian", domain: "atlassian.com" },
  { name: "Figma", domain: "figma.com" },
  { name: "GitHub", domain: "github.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Zoom", domain: "zoom.us" },
  { name: "Uber", domain: "uber.com" },
  { name: "Airbnb", domain: "airbnb.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
];

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

export default function LogoMarquee() {
  const logos = [...companies, ...companies];

  return (
    <section className="overflow-hidden py-4 sm:py-5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-track">
          <div className="marquee-scroll">
            {logos.map((c, i) => (
              <img
                key={`${c.name}-${i}`}
                src={favicon(c.domain)}
                alt={c.name}
                width={64}
                height={64}
                className="mx-6 h-16 w-16 shrink-0 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
