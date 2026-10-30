---
name: Josie Footies Luxury Editorial
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#755a28'
  on-secondary: '#ffffff'
  secondary-container: '#ffdb9d'
  on-secondary-container: '#795e2b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#858383'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea7'
  secondary-fixed-dim: '#e5c285'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5b4312'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.14em
  label-md:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.18em
  label-sm:
    fontFamily: Manrope
    fontSize: 9px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.22em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 3rem
  space-xl: 6rem
---

## Brand & Style

This design system establishes a high-fashion digital salon bridging pan-African luxury sensibilities with modern European minimalism. Inspired by the restraint of The Row, the architectural volume of Bottega Veneta, the sun-drenched sunlit warmth of Jacquemus, and the sharp poise of Saint Laurent, the experience evokes quiet confidence, cultural gravity, and structural elegance.

### Emotional Target
The user feels like they are browsing an archival art catalogue or an exclusive Parisian-Dakar atelier. The atmosphere is calm, unapologetic, and aspirational. Every interaction reinforces the ethos: *"In every step you take, be bold."*

### Aesthetic Language
- **Minimalist Editorial Structure:** Ultra-wide white/ivory margins, deliberate asymmetric composition, and monumental typographic contrast.
- **Architectural Edge:** Strict, razor-sharp forms (zero border-radius), whisper-weight wirelines, and expansive negative space that lets artisanal leatherwork, textures, and silhouettes take primary focus.
- **Controlled Opulence:** Champagne gold is used strictly as a structural accent (monograms, rule lines, focal tags) rather than decorative sprawl, preserving genuine prestige.

## Colors

The palette balances monumental obsidian blacks against organic ivory and soft stone, accented with calculated flashes of champagne gold.

### Roles & Application
- **Obsidian Black (`#111111`):** Primary canvas for text, structural boundaries, and bold CTA surfaces. Represents timeless couture grounding.
- **Warm Ivory (`#F7F5F0`):** Default application background. Provides a tactile, unbleached linen quality that softens pure digital white into gallery warmth.
- **Champagne Gold (`#C6A56B`):** Reserved exclusively for high-tier emphasis: luxury certification badges, edition numbering, delicate hover states, and micro-rules. Never applied to large surface fills.
- **Deep Charcoal (`#292929`):** Secondary text, subtle card framing, footer backgrounds, and inverted surface treatments.
- **Soft Stone (`#E8E5DF`):** Secondary container backgrounds, product card podiums, and low-contrast dividing lines.

### Color Hierarchy Rules
- Surface-to-background contrast relies on natural shifts between Warm Ivory and Soft Stone.
- Interactive states prioritize high-contrast inversion (e.g., Warm Ivory text on Obsidian Black backdrops) over saturated color shifts.

## Typography

The typographical pairing creates an immediate dynamic tension: high-contrast, editorial serif headlines (`Playfair Display`) paired against pristine, functional grotesque sans-serif (`Manrope`).

### Rules & Formatting
- **Display Treatment:** Headlines embrace editorial casing—primarily Title Case or Sentence Case for display headings to maintain literary poise. 
- **Tracking & Caps:** All `label-*` styles must be rendered in full uppercase with expanded letter-spacing (`0.14em` to `0.22em`).
- **Body Restraint:** Long-form product descriptions use `body-lg` with a light weight (`300`) to evoke publication-grade storytelling.
- **Editorial Microcopy:** Currency, SKU numbers, category tags, and system labels are strictly locked to `label-md` or `label-sm`.

## Layout & Spacing

The layout philosophy mirrors high-fashion print publishing, prioritizing generous negative space, intentional rhythm, and asymmetry over dense utility.

### Grid Framework
- **Desktop (12 Columns):** Fluid layout with maximum canvas constraint at `1680px`. `4rem` outer canvas margins, `2rem` gutters. Content frequently spans asymmetric groupings (e.g., 7-column oversized imagery against 5-column offset editorial text).
- **Tablet (8 Columns):** `2.5rem` margins, `1.5rem` gutters. Staggered grid collapsing to structured alternates.
- **Mobile (4 Columns):** `1.5rem` margins, `1rem` gutters. High-impact single-column stacks with edge-to-edge product viewports.

### Spacing Cadence
- **Section Intervals:** Major editorial transitions employ `space-xl` (`6rem`) to force breathability between collections.
- **Component Breathing Room:** Form fields, interactive buttons, and navigation nodes maintain vertical paddings through `space-md` (`1.5rem`), ensuring tactile precision for mobile and desktop cursors.

## Elevation & Depth

In alignment with minimalist luxury codes, drop shadows and artificial elevations are strictly avoided. Depth is achieved purely through **tonal planes, razor-thin outlines, and optical layering**.

### Spatial Techniques
- **Zero Blur Shadows:** No standard CSS blur box-shadows. Elevation is flat and architectural.
- **Surface Layering:** Content cards sit directly on Warm Ivory or utilize Soft Stone (`#E8E5DF`) backgrounds to denote a change in plane.
- **Hairline Framing:** Visual separation uses a single `1px` solid border in Soft Stone (`#E8E5DF`) or Deep Charcoal (`#292929`) at low opacities (`15%-25%`).
- **Overlapping Planes:** Editorial imagery and typographic badges employ physical CSS overlaps (e.g., overlapping elements with negative margins) to create dimensional hierarchy without digital faux-lighting.
- **Glass Overlays:** Floating action elements (such as persistent bottom buy bars on mobile) use Warm Ivory with 90% opacity and an ultra-subtle backdrop filter blur (`8px`) bounded by a `1px` obsidian hairline rule.

## Shapes

The design system enforces a uncompromising architectural standard: **absolute sharpness (`0px` border radius across all UI elements)**.

### Architectural Rules
- **No Curves:** Buttons, inputs, modals, image containers, chips, and toast messages feature absolute `0px` corners.
- **Structural Integrity:** The pure rectangle communicates European precision and modernist African brutalist architecture, honoring the crafted silhouette of luxury footwear.
- **Aspect Ratios:** Visual media is locked to strict ratios:
  - Editorial Lookbook: `4:5` vertical portrait.
  - Footwear Detail Grid: `1:1` square or `3:4` vertical portrait.
  - Hero Campaign Banner: `16:9` or `21:9` widescreen bleed.

## Components

### Buttons
- **Primary:** Solid Obsidian Black (`#111111`) fill, Warm Ivory (`#F7F5F0`) uppercase text (`label-md`), `0px` radius, `1.25rem` vertical and `3rem` horizontal padding. Hover: transitions to Deep Charcoal (`#292929`) with a subtle `1px` inner Champagne Gold border.
- **Secondary / Outline:** Transparent fill, `1px` Obsidian Black border, Obsidian Black text. Hover: Solid Obsidian Black fill with Warm Ivory text.
- **Tertiary (Editorial Link):** Underlined text with a `1px` Champagne Gold baseline offset by `6px`. Hover: baseline shifts to Obsidian Black with animated horizontal wipe.

### Chips & Badges
- **Collection Badges:** Transparent background, `1px` hairline border in Soft Stone, uppercase `label-sm` tracking.
- **Status / Limited Edition:** Solid Soft Stone (`#E8E5DF`) fill with Deep Charcoal text, zero border, zero radius.

### Form Inputs & Text Fields
- **Fields:** Bottom-line border only (`1px` solid Soft Stone). Warm Ivory background. On focus: border shifts to Obsidian Black (`1px`), label floats upward with `label-sm` tracking.
- **Error State:** Subtle muted terracotta line indicator with `body-sm` helper text beneath.

### Checkboxes & Radios
- **Checkbox:** `16px x 16px` square, `1px` solid Obsidian Black, `0px` radius. Active state fills solid Obsidian Black with a crisp ivory geometric checkmark.
- **Radio Button:** `16px x 16px` outer square with a centered `8px x 8px` solid inner obsidian square when selected.

### Product & Editorial Cards
- **Product Card:** Clean vertical hierarchy: `3:4` unbordered image container sitting on Soft Stone (`#E8E5DF`), followed by `space-sm` gap to headline (`headline-sm`), category indicator in Champagne Gold (`label-sm`), and price (`body-md`).
- **Interactive State:** Hover activates a silent cross-fade to secondary editorial angle; no scale or transform jumping.

### Bespoke Domain Components
- **Size Selector:** Grid of square buttons (`48px x 48px`), `1px` Soft Stone outlines. Out-of-stock items feature a single razor-thin diagonal slash. Selected state: solid Obsidian Black fill with Warm Ivory text.
- **Couture Footwear Accordion:** Full-width collapsible drawers for "Materials & Provenance", "Artisanal Fit", and "Care Guide", bounded by top and bottom hairline borders, toggled via a geometric `+` / `−` glyph.