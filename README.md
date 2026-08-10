# Jobly

A no-login job discovery site. Browse handpicked jobs, search instantly, bookmark without an account, and apply through the original source.

## Stack
- **Next.js 16** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** for styling (design tokens in `src/app/globals.css`)
- **Framer Motion** for entrance/scroll/hover choreography
- **GSAP** for the hero's continuous floating-card loop + cursor parallax
- **lucide-react** for icons

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Where things live
- `src/lib/types.ts` — the `Job` shape (id, title, company, skills, applicationUrl, status, etc.)
- `src/lib/data.ts` — mock job data (`jobs` array) + helpers (`timeAgo`, `deadlineLabel`, `getJobById`, `getFeaturedJob`). **Swap this for your real data source** (CMS, JSON file, API) — every component renders from this array, nothing is hardcoded per-job.
- `src/hooks/useSavedJobs.ts` — localStorage-backed bookmarking (no auth)
- `src/components/` — Hero, SearchBar (signature light-expand interaction), JobRow/JobList, CategorySection, JobOfTheDay, WhyJobly, Newsletter, MagneticArrow, BookmarkButton, Loader
- `src/app/page.tsx` — homepage, owns search + category filter state
- `src/app/jobs/[id]/page.tsx` + `JobDetailsClient.tsx` — job details (20-sec overview, "before you apply", apply CTA)
- `src/app/saved/page.tsx` — saved jobs view

## Adding a job
Add an object to the `jobs` array in `src/lib/data.ts` matching the `Job` type. It will automatically appear at the top of "Latest Job Openings" (sorted by `postedAt`), in its category, and — if `featured: true` — become eligible for "Today's opportunity".

## Notes for further dev (Antigravity / IDE)
- Company logos currently resolve via `https://logo.clearbit.com/{domain}` — replace with your own asset pipeline whenever convenient (`next.config.ts` already whitelists the domain).
- The job-details "route transition" is an elegant staged fade/slide-in rather than a true shared-element morph — wiring a real card→page morph across App Router navigations needs either the View Transitions API (`next.config.ts` → `experimental.viewTransition`) or a persisted layout; flagged here as the natural next step.
- `prefers-reduced-motion` is respected globally via `globals.css`.
- Keyboard: `/` opens search, `Esc` closes it.
