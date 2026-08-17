# NXT Platform — Design System & Engineering Guidelines (`DESIGN.md`)

## 1. Core Principles & Philosophy
This document establishes the official UI/UX design specifications and architectural guidelines for the NXT platform. All future component development, page layouts, and system enhancements **must strictly conform** to these standards.

- **Minimalist Precision**: Uncluttered, purpose-driven layouts with balanced spatial hierarchy.
- **Flat Surface Aesthetic**: Zero heavy drop-shadows or gradients; structural definition is achieved via subtle contrast and thin borders.
- **Predictable Performance**: Fast, zero-lag micro-interactions with immediate feedback.

---

## 2. Layout & Spacing System

### Section Alignment & Container Widths
- **Primary Container**: `max-w-6xl` (1152px) or `max-w-7xl` (1280px) centered with `mx-auto`.
- **Horizontal Padding**: `px-4 sm:px-6 md:px-8` (responsive edge alignment).
- **Vertical Section Spacing**: Equal, minimal gaps between major sections (`py-8 sm:py-12`). Avoid excessive vertical whitespace.
- **Grid & Flex Gaps**: Standardized gap scales (`gap-4 sm:gap-6`).

---

## 3. Typography & Micro-Copy

### Headings
- **Weight**: Thin to medium boldness (`font-medium` or `font-semibold`). **Do not use heavy, bulky weights (`font-black` or `font-extrabold`).**
- **Sizing**: Responsive, scaled to section proportions (`text-xl sm:text-2xl md:text-3xl`).
- **Sizing Balance**: Must fit cleanly inside section headers without awkward line wrapping.

### Body & Paragraph Text
- **Alignment**: Paragraphs use justified alignment (`text-justify`) for clean visual block edges.
- **Line Height**: `leading-relaxed` (1.625) for comfortable legibility.
- **Micro-copy**: Keep headings, subtexts, and section descriptions short, direct, and user-friendly.

### Contextual Color System
- **Primary Text**: High-contrast neutral (`text-foreground` / `text-slate-900` / `text-slate-100`).
- **Secondary / Muted Text**: Subtle neutral (`text-slate-500` / `text-slate-400`).
- **Error Messages**: `text-rose-600` (light mode) / `text-rose-400` (dark mode) with subtle error surface `bg-rose-500/10` and `border-rose-500/20`.
- **Success Messages**: `text-emerald-600` / `text-emerald-400` with subtle emerald surface `bg-emerald-500/10`.
- **Warning / Info**: `text-amber-600` / `text-sky-600` respectively.

---

## 4. Color Palette & Surface Rules

### Color Tone
- Use balanced, minimal deep darks and clean soft lights.
- **Strict Rule on Gradients**: **DO NOT USE GRADIENTS** for backgrounds, text, or buttons. Use solid, refined surface colors.

### Borders
- **Thickness**: Thin borders (`border` / `border-[1px]`).
- **Coloring**: Silver or grey contrasting against surface background (`border-slate-200` in light mode, `border-slate-800` / `border-zinc-800` in dark mode).

---

## 5. Components & Corner Radius Specifications

### Component Dimensions & Radius Rules
- **Cards**: Must strictly use **`5px` corner radius** (`rounded-[5px]`).
- **Buttons**:
  - Standard Action / Form Buttons: Must strictly use **`6px` corner radius** (`rounded-[6px]`).
  - Pill Action Buttons (where explicitly designated): Fully rounded (`rounded-full`).
- **Inputs & Selects**: `6px` corner radius (`rounded-[6px]`).

### Shadow & Elevation Policy
- **No Drop Shadows**: **Do not use heavy drop shadows (`shadow-md`, `shadow-xl`, `shadow-2xl`).**
- Use flat surfaces with thin silver/grey borders for elevation definition.

### Transitions & Hover Effects
- **Speed & Efficiency**: Fast, smooth micro-transitions (`transition-colors duration-150` or `transition-all duration-150`).
- **Hover Behavior**: Subtle background tint or border contrast shift on hover. No layout jumping or excessive scale shifts.

---

## 6. Loaders & Feedback Strategy

### Contextual Loader Hierarchy
- **Data Card Grids & Lists**: Use skeleton loaders matching card shape (`rounded-[5px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse`).
- **Action Buttons & Form Submissions**: Use small inline spinners (`animate-spin size-4`).
- **Navigation Headers, Footers & Filter Bars**: **Keep completely static without loaders** during background data fetches.

---

## 7. Error Handling UI Components

### Error States
- **Network / API Failures**: Display inline or section-level error card with an explicit retry action button (`rounded-[6px]`).
- **Form / Auth Validation**: Inline error text (`text-rose-500 text-xs mt-1`) placed directly beneath input field.
- **Empty Data States**: Clean empty state cards with helpful micro-copy and reset action.

---

## 8. Full-Stack Data Flow & Architecture

- **Server Components**: Default to Server Components for data fetching using parallel `Promise.all()`.
- **Caching**: Wrap static & CMS data lookups in `unstable_cache` and React `cache()`.
- **Non-Blocking Client Actions**: Client-side analytics, page tracking, and non-critical updates must execute asynchronously without blocking page transitions.
