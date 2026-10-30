# Josie Footies: Luxury Storefront

Static, dependency-free storefront built from the Stitch design export (`DESIGN.md`, `code.html`, `screen.png`).

## Run locally

    npm install        # only needed to rebuild CSS
    npm run build      # compiles Tailwind to assets/css/styles.css
    npm run serve      # or open index.html directly in a browser

## Structure

- `index.html`: page markup (hero, philosophy, collection, departments, heritage, campaign, newsletter, footer, drawers and modals)
- `assets/js/products.js`: product catalogue (name, price, sizes, colours, description). Edit here to add or change products.
- `assets/js/images.js`: every image URL in one place. Swap for your own hosted photos.
- `assets/js/app.js`: filters, quick view with size selection, bag, wishlist, search, checkout, client care panels
- `tailwind.config.js` and `src/input.css`: design tokens from DESIGN.md (0px radius, no blur shadows), set in Lato

## Notes

- The images are hosted on Google's Stitch preview CDN and may expire. Download them into `assets/img/` and update `images.js` before launch.
- Checkout sends a formatted order (items, sizes, total, delivery details) to the WhatsApp concierge (+234 806 694 0895). Connect Paystack for direct card payment when ready.
- The newsletter form validates the email but does not store it yet. Connect it to Mailchimp, Brevo, or similar.
- Bag and wishlist persist in the visitor's browser (localStorage).
- Deploy anywhere static: Netlify, Vercel, GitHub Pages, cPanel.
