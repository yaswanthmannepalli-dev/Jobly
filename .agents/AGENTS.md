# NXT Engineering & UI/UX Rules (`AGENTS.md`)

All AI agents working on this project must strictly adhere to the rules defined in [`DESIGN.md`](file:///E:/Jobly/Jobly/DESIGN.md):

## 1. UI & Component Design Rules
- **Corner Radius**:
  - Cards: `rounded-[5px]` (Strictly 5px).
  - Buttons & Inputs: `rounded-[6px]` (Strictly 6px), or `rounded-full` where explicitly designated.
- **Shadows & Gradients**:
  - **NO DROP SHADOWS** (`shadow-md`, `shadow-xl`, etc.).
  - **NO GRADIENTS**. Use flat solid colors with thin silver/grey borders (`border border-slate-200` or `border-slate-800`).
- **Typography**:
  - Headings: Thin to medium boldness (`font-medium` / `font-semibold`). Never use heavy/bulky font weights (`font-black`/`font-extrabold`).
  - Body / Paragraphs: Justified text alignment (`text-justify`), `leading-relaxed`.
  - Micro-copy: Short, simple, minimal, user-friendly copy.
- **Color System**:
  - Use minimal deep darks and clean soft lights.
  - Contextual text & background colors for error (`text-rose-600`, `bg-rose-500/10`), success (`text-emerald-600`, `bg-emerald-500/10`), warning (`text-amber-600`).
- **Transitions & Hover**:
  - Smooth, fast transitions (`transition-colors duration-150`).

## 2. Loading & Error Handling Rules
- **Loaders**:
  - Data card grids & lists: Use skeleton loaders matching card shape (`rounded-[5px] animate-pulse`).
  - Action buttons: Small inline spinners (`animate-spin size-4`).
  - Navigation headers, footers & filters: Keep static without skeleton loaders.
- **Error UI**:
  - Provide explicit error states with recovery retry buttons for network/data failures.

## 3. Data Flow & Performance Rules
- **Server Components & Caching**: Use Server Components with `Promise.all()` for parallel fetching and `unstable_cache` / `React.cache` for data queries.
- **Non-Blocking Client Operations**: Analytics and page tracking must use non-blocking background APIs (`navigator.sendBeacon` / `requestIdleCallback`).
- **3D Components**: Heavy 3D components (like `Lanyard`) must be dynamic (`ssr: false`) and mounted **strictly within their designated section** (e.g. Hero on `/` only), unmounting completely on route changes.
