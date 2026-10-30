/** Design tokens from DESIGN.md (Josie Footies Luxury Editorial). */

// Themed tokens read RGB channels from CSS variables set in src/input.css (light on :root, dark on .dark),
// so every utility, opacity modifier included, follows the active theme.
const themed = [
  'surface', 'surface-dim', 'surface-bright', 'surface-container-lowest', 'surface-container-low',
  'surface-container', 'surface-container-high', 'surface-container-highest', 'on-surface',
  'on-surface-variant', 'inverse-surface', 'inverse-on-surface', 'outline', 'outline-variant',
  'surface-tint', 'primary', 'on-primary', 'primary-container', 'secondary', 'on-secondary',
  'secondary-container', 'obsidian', 'charcoal', 'ivory', 'stone', 'error',
];

module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  darkMode: 'class',
  theme: {
    // Architectural standard: 0px radius everywhere.
    borderRadius: { none: '0', DEFAULT: '0' },
    extend: {
      colors: {
        ...Object.fromEntries(themed.map((name) => [name, `rgb(var(--c-${name}) / <alpha-value>)`])),
        // Fixed in both themes.
        'secondary-fixed': '#ffdea7',
        'secondary-fixed-dim': '#e5c285',
        gold: '#c6a56b',
        // Photo overlays and modal backdrops stay dark in both themes.
        ink: '#111111',
        paper: '#f7f5f0',
      },
      spacing: {
        'margin-mobile': '1.5rem',
        gutter: '2rem',
        'gutter-mobile': '1rem',
        'space-xs': '0.5rem',
        'space-sm': '1rem',
        'space-md': '1.5rem',
        'space-lg': '3rem',
        'space-xl': '6rem',
        margin: '4rem',
      },
      fontFamily: {
        // Lato throughout: `font-serif` (headlines) and `font-sans` (body) share one family.
        serif: ['Lato', 'system-ui', 'sans-serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-xl-mobile': ['44px', { lineHeight: '52px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg-mobile': ['32px', { lineHeight: '40px', letterSpacing: '0em', fontWeight: '400' }],
        'headline-md': ['32px', { lineHeight: '40px', letterSpacing: '0em', fontWeight: '500' }],
        'headline-sm': ['24px', { lineHeight: '32px', letterSpacing: '0.01em', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '30px', letterSpacing: '0.01em', fontWeight: '300' }],
        'body-md': ['15px', { lineHeight: '24px', letterSpacing: '0.01em', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '18px', letterSpacing: '0.14em', fontWeight: '600' }],
        'label-md': ['11px', { lineHeight: '16px', letterSpacing: '0.18em', fontWeight: '600' }],
        'label-sm': ['9px', { lineHeight: '12px', letterSpacing: '0.22em', fontWeight: '700' }],
      },
      maxWidth: { canvas: '1680px' },
    },
  },
  plugins: [],
};
