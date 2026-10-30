(() => {
  'use strict';

  const IMAGES = window.JF_IMAGES || {};
  const PRODUCTS = window.JF_PRODUCTS || [];
  const WHATSAPP = '2348066940895';
  const FREE_DELIVERY = 100000;
  const STORAGE_KEY = 'jf-store-v1';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const naira = (n) => '₦' + Number(n).toLocaleString('en-NG');
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const imageFor = (p) => IMAGES[p.image] || '';

  // ---------- State (persisted per browser) ----------
  const state = { cart: [], wishlist: [], filter: 'all', qv: null, qvSize: null };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      state.cart = (saved.cart || []).filter((i) => byId(i.id));
      state.wishlist = (saved.wishlist || []).filter(byId);
    } catch (_) { /* storage unavailable: start empty */ }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart, wishlist: state.wishlist })); } catch (_) { /* ignore */ }
  }

  // ---------- Images ----------
  function hydrateImages(root = document) {
    $$('[data-img]', root).forEach((img) => {
      const src = IMAGES[img.dataset.img];
      if (!src) return;
      if (img.hasAttribute('data-hide-on-error')) img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
      img.src = src;
    });
    $$('[data-bg]', root).forEach((el) => {
      const src = IMAGES[el.dataset.bg];
      if (src) el.style.backgroundImage = `url('${src}')`;
    });
  }

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    $('#toast-text').textContent = msg;
    el.classList.remove('translate-y-24', 'opacity-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('translate-y-24', 'opacity-0'), 2800);
  }

  // ---------- Product grid ----------
  const BADGE_TONES = {
    dark: 'bg-obsidian text-ivory',
    gold: 'bg-secondary text-on-secondary',
    light: 'bg-surface-container-highest text-primary',
  };
  const FILTER_COPY = {
    all: 'Foundational footwear and leather pieces handcrafted in studio perfection for bold journeys.',
    shoes: 'Tailored loafers and woven mules, cut on our architectural lasts.',
    sandals: 'Strappy, sculptural sandals for climate and occasion.',
    slippers: 'Sculpted slides and mules with anatomical footbeds and signature brass hardware.',
    bags: 'Hand-finished wristlets and structured pouches cut from full-grain calf hides.',
  };

  function sizeRange(p) {
    return p.sizes ? `EU ${p.sizes[0]} — ${p.sizes[p.sizes.length - 1]}` : (p.sizeLabel || 'One Size');
  }

  function cardHTML(p) {
    const saved = state.wishlist.includes(p.id);
    const badge = p.badge ? `<div class="absolute top-3 left-3 ${BADGE_TONES[p.badge.tone]} px-2.5 py-1 label">${esc(p.badge.text)}</div>` : '';
    return `
      <article class="group flex flex-col bg-surface border border-stone hover:border-charcoal/25 transition-colors duration-300 reveal is-visible" data-product="${p.id}">
        <div class="relative aspect-[3/4] overflow-hidden bg-surface-container">
          <button type="button" class="absolute inset-0 w-full h-full" data-action="quickview" data-id="${p.id}" aria-label="Quick view ${esc(p.name)}">
            <img src="${esc(imageFor(p))}" alt="${esc(p.name)}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </button>
          ${badge}
          <button type="button" class="absolute top-3 right-3 w-9 h-9 glass hairline text-primary flex items-center justify-center" data-action="wishlist" data-id="${p.id}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from' : 'Save to'} wishlist">
            <span class="material-symbols-outlined text-[20px] ${saved ? 'filled text-secondary' : ''}">favorite</span>
          </button>
          <div class="absolute inset-x-0 bottom-0 p-3 glass flex items-center gap-2 lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0 transition-transform duration-300">
            <button type="button" class="flex-1 py-2.5 bg-surface-container-highest hover:bg-surface-container-high text-primary label" data-action="quickview" data-id="${p.id}">Quick View</button>
            <button type="button" class="flex-1 py-2.5 bg-obsidian hover:bg-charcoal text-ivory label transition-colors" data-action="quick-add" data-id="${p.id}">+ Add To Bag</button>
          </div>
        </div>
        <div class="p-space-sm flex flex-col flex-1 justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 text-on-surface-variant label mb-1.5">
              <span>${esc(p.category)}</span>
              <span class="flex items-center gap-1.5" title="Available in ${esc(p.colour)}">${(p.swatches || []).map((c) =>
                `<span class="w-2.5 h-2.5 inline-block border border-outline/40" style="background:${esc(c)}"></span>`).join('')}</span>
            </div>
            <h3 class="font-serif text-[22px] leading-8 text-primary">${esc(p.name)}</h3>
            <p class="text-body-sm text-on-surface-variant mt-1 line-clamp-1">${esc(p.summary)}</p>
          </div>
          <div class="mt-space-sm pt-2 flex items-center justify-between border-t border-stone">
            <span class="text-body-lg font-semibold text-primary">${naira(p.price)}</span>
            <span class="label text-on-surface-variant">${esc(sizeRange(p))}</span>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = state.filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(state.filter));
    $('#product-grid').innerHTML = list.map(cardHTML).join('');
    $('#collection-summary').textContent = FILTER_COPY[state.filter] || FILTER_COPY.all;
    $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === state.filter)));
    $$('.nav-link[data-filter-link]').forEach((a) => {
      const active = state.filter !== 'all' && a.dataset.filterLink === state.filter;
      a.classList.toggle('underline', active);
      a.classList.toggle('text-primary', active);
    });
  }

  function setFilter(f) {
    state.filter = FILTER_COPY[f] ? f : 'all';
    renderGrid();
  }

  // ---------- Cart ----------
  function cartCount() { return state.cart.reduce((n, i) => n + i.qty, 0); }
  function cartTotal() { return state.cart.reduce((n, i) => n + byId(i.id).price * i.qty, 0); }

  function addToCart(id, size) {
    const p = byId(id);
    const key = String(size ?? 'ONE SIZE');
    const line = state.cart.find((i) => i.id === id && i.size === key);
    if (line) line.qty += 1; else state.cart.push({ id, size: key, qty: 1 });
    save();
    renderCart();
    toast(`Added: ${p.name}${p.sizes ? ` (EU ${key})` : ''}`);
    openDrawer('cart');
  }

  function updateQty(id, size, delta) {
    const line = state.cart.find((i) => i.id === id && i.size === size);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) state.cart = state.cart.filter((i) => i !== line);
    save();
    renderCart();
  }

  function renderCart() {
    const total = cartTotal();
    $$('[data-count="cart"]').forEach((el) => { el.textContent = cartCount(); });
    $('#cart-subtotal').textContent = naira(total);
    $('#cart-progress').style.width = Math.min(100, (total / FREE_DELIVERY) * 100) + '%';
    $('#delivery-message').textContent = total >= FREE_DELIVERY
      ? 'Express delivery unlocked ✓'
      : total > 0 ? `${naira(FREE_DELIVERY - total)} from free express:` : 'Nigeria Express Delivery:';

    const box = $('#cart-items');
    if (!state.cart.length) {
      box.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center p-space-md">
          <span class="material-symbols-outlined text-[48px] text-surface-tint mb-space-xs">shopping_bag</span>
          <h3 class="font-serif text-headline-sm text-primary">Your Bag Is Quiet</h3>
          <p class="text-body-sm text-on-surface-variant mt-1 max-w-xs">Explore our latest footwear archive and select a handcrafted pair designed to make your step unforgettable.</p>
          <button type="button" class="mt-space-md btn-primary btn-sm" data-action="browse">Start Browsing</button>
        </div>`;
      return;
    }
    box.innerHTML = state.cart.map((i) => {
      const p = byId(i.id);
      return `
        <div class="flex gap-3 bg-surface p-3 border border-stone">
          <img src="${esc(imageFor(p))}" alt="" class="w-20 h-24 object-cover shrink-0" />
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div class="font-serif text-base leading-6 text-primary">${esc(p.name)}</div>
              <div class="label text-on-surface-variant mt-1">${p.sizes ? `EU Size: ${esc(i.size)}` : 'One Size'} • ${esc(p.colour.split('•')[0].trim())}</div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2">
                <button type="button" class="w-7 h-7 bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary" data-action="qty" data-id="${i.id}" data-size="${esc(i.size)}" data-delta="-1" aria-label="Decrease quantity">−</button>
                <span class="label w-5 text-center tracking-normal">${i.qty}</span>
                <button type="button" class="w-7 h-7 bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary" data-action="qty" data-id="${i.id}" data-size="${esc(i.size)}" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
              <span class="text-body-sm font-semibold text-primary">${naira(p.price * i.qty)}</span>
            </div>
          </div>
          <button type="button" class="self-start text-on-surface-variant hover:text-primary" data-action="qty" data-id="${i.id}" data-size="${esc(i.size)}" data-delta="-${i.qty}" aria-label="Remove ${esc(p.name)}"><span class="material-symbols-outlined text-[18px]">close</span></button>
        </div>`;
    }).join('');
  }

  function orderSummaryText(details) {
    const lines = state.cart.map((i) => {
      const p = byId(i.id);
      return `• ${i.qty} × ${p.name}${p.sizes ? ` (EU ${i.size})` : ''}: ${naira(p.price * i.qty)}`;
    });
    let msg = `Hello Josie Footies Concierge, I would like to place an order:\n\n${lines.join('\n')}\n\nSubtotal: ${naira(cartTotal())}`;
    if (details) {
      msg += `\n\nName: ${details.name}\nPhone: ${details.phone}\nDelivery: ${details.address}, ${details.city}`;
      if (details.notes) msg += `\nNotes: ${details.notes}`;
    }
    return msg;
  }

  function sendToWhatsApp(text) {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  // ---------- Wishlist ----------
  function toggleWishlist(id) {
    const p = byId(id);
    if (state.wishlist.includes(id)) {
      state.wishlist = state.wishlist.filter((x) => x !== id);
      toast('Removed from your private wishlist');
    } else {
      state.wishlist.push(id);
      toast(`Saved: ${p.name}`);
    }
    save();
    renderWishlist();
    renderGrid();
    if (state.qv && state.qv.id === id) syncQVWish();
  }

  function renderWishlist() {
    $$('[data-count="wishlist"]').forEach((el) => { el.textContent = state.wishlist.length; });
    const box = $('#wishlist-items');
    if (!state.wishlist.length) {
      box.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center p-space-md">
          <span class="material-symbols-outlined text-[48px] text-surface-tint mb-space-xs">favorite</span>
          <h3 class="font-serif text-headline-sm text-primary">Nothing Saved Yet</h3>
          <p class="text-body-sm text-on-surface-variant mt-1 max-w-xs">Tap the heart on any piece to keep it here for later.</p>
        </div>`;
      return;
    }
    box.innerHTML = state.wishlist.map((id) => {
      const p = byId(id);
      return `
        <div class="flex gap-3 bg-surface p-3 border border-stone">
          <img src="${esc(imageFor(p))}" alt="" class="w-20 h-24 object-cover shrink-0" />
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div class="label text-secondary">${esc(p.category)}</div>
              <div class="font-serif text-base leading-6 text-primary mt-0.5">${esc(p.name)}</div>
              <div class="text-body-sm font-semibold mt-1">${naira(p.price)}</div>
            </div>
            <div class="flex items-center gap-4 mt-2">
              <button type="button" class="label text-primary underline underline-offset-4 decoration-gold" data-action="quickview" data-id="${p.id}">${p.sizes ? 'Choose Size' : 'Add To Bag'}</button>
              <button type="button" class="label text-on-surface-variant hover:text-primary" data-action="wishlist" data-id="${p.id}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  // ---------- Overlays ----------
  let lastFocus = null;
  function lockScroll(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; }

  function openDrawer(which) {
    closeAll(true);
    lastFocus = document.activeElement;
    const el = $(which === 'cart' ? '#cart-drawer' : '#wishlist-drawer');
    el.classList.remove('translate-x-full');
    el.setAttribute('aria-hidden', 'false');
    $('#scrim').classList.remove('opacity-0', 'pointer-events-none');
    lockScroll(true);
    setTimeout(() => el.querySelector('button')?.focus(), 50);
  }

  function showModal(id) {
    const el = $(id);
    el.classList.remove('hidden');
    el.classList.add('flex');
    lockScroll(true);
  }
  function hideModal(id) {
    const el = $(id);
    el.classList.add('hidden');
    el.classList.remove('flex');
  }

  function closeAll(keepFocus) {
    ['#cart-drawer', '#wishlist-drawer'].forEach((s) => {
      $(s).classList.add('translate-x-full');
      $(s).setAttribute('aria-hidden', 'true');
    });
    $('#scrim').classList.add('opacity-0', 'pointer-events-none');
    ['#quickview', '#search', '#info', '#mobile-menu'].forEach(hideModal);
    $('[data-action="open-menu"]').setAttribute('aria-expanded', 'false');
    state.qv = null;
    lockScroll(false);
    if (!keepFocus && lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
  }

  // ---------- Quick view ----------
  function openQuickView(id, needSize) {
    const p = byId(id);
    if (!p) return;
    closeAll(true);
    lastFocus = document.activeElement;
    state.qv = p;
    state.qvSize = null;
    $('#qv-image').src = imageFor(p);
    $('#qv-image').alt = p.name;
    $('#qv-category').textContent = p.category;
    $('#qv-title').textContent = p.name;
    $('#qv-price').textContent = naira(p.price);
    $('#qv-colour').textContent = p.colour;
    $('#qv-description').textContent = p.description;
    $('#qv-size-block').classList.toggle('hidden', !p.sizes);
    $('#qv-size-hint').classList.toggle('hidden', !needSize);
    $('#qv-sizes').innerHTML = (p.sizes || []).map((s) =>
      `<button type="button" class="size-btn" role="radio" aria-checked="false" aria-pressed="false" data-action="size" data-size="${s}">${s}</button>`
    ).join('');
    syncQVWish();
    showModal('#quickview');
    setTimeout(() => (needSize ? $('#qv-sizes button') : $('#qv-add'))?.focus(), 50);
  }

  function syncQVWish() {
    const saved = state.wishlist.includes(state.qv.id);
    $('#qv-wish span:last-child').textContent = saved ? 'Saved To Wishlist' : 'Save To Wishlist';
    $('#qv-wish .material-symbols-outlined').classList.toggle('filled', saved);
  }

  function selectSize(size) {
    state.qvSize = size;
    $$('#qv-sizes .size-btn').forEach((b) => {
      const on = b.dataset.size === size;
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-checked', String(on));
    });
    $('#qv-size-hint').classList.add('hidden');
  }

  function addFromQuickView() {
    const p = state.qv;
    if (!p) return;
    if (p.sizes && !state.qvSize) {
      $('#qv-size-hint').classList.remove('hidden');
      $('#qv-sizes button')?.focus();
      return;
    }
    addToCart(p.id, p.sizes ? state.qvSize : null);
  }

  // ---------- Search ----------
  function openSearch() {
    closeAll(true);
    lastFocus = document.activeElement;
    showModal('#search');
    const input = $('#search-input');
    input.value = '';
    renderSearch('');
    setTimeout(() => input.focus(), 50);
  }

  function renderSearch(q) {
    const term = q.trim().toLowerCase();
    const hits = term
      ? PRODUCTS.filter((p) => [p.name, p.category, p.colour, p.summary, p.description, ...p.tags].join(' ').toLowerCase().includes(term))
      : PRODUCTS;
    const box = $('#search-results');
    if (!hits.length) {
      box.innerHTML = `<p class="text-body-md text-on-surface-variant">No pieces match “${esc(q)}”. Our concierge can commission it: <a class="underline decoration-gold underline-offset-4" target="_blank" rel="noopener noreferrer" href="https://wa.me/${WHATSAPP}">message the atelier</a>.</p>`;
      return;
    }
    box.innerHTML = `<p class="label text-on-surface-variant mb-space-sm">${term ? `${hits.length} result${hits.length > 1 ? 's' : ''}` : 'The full archive'}</p>
      <div class="grid gap-2">${hits.map((p) => `
        <button type="button" class="flex items-center gap-4 p-2 text-left hover:bg-surface-container transition-colors" data-action="quickview" data-id="${p.id}">
          <img src="${esc(imageFor(p))}" alt="" class="w-14 h-16 object-cover shrink-0" />
          <span class="flex-1 min-w-0"><span class="block label text-secondary">${esc(p.category)}</span><span class="block font-serif text-lg text-primary truncate">${esc(p.name)}</span></span>
          <span class="text-body-sm font-semibold">${naira(p.price)}</span>
        </button>`).join('')}</div>`;
  }

  // ---------- Client care panels ----------
  const SIZE_ROWS = [[38, 5, 6.5, 24.5], [39, 6, 7.5, 25], [40, 6.5, 8, 25.5], [41, 7.5, 9, 26.5], [42, 8, 9.5, 27], [43, 9, 10.5, 27.5], [44, 9.5, 11, 28.5], [45, 10.5, 12, 29], [46, 11.5, 13, 30]];
  const INFO = {
    shipping: {
      eyebrow: 'Client Care',
      title: 'Express Delivery & Shipping',
      body: `
        <p><strong class="text-primary">Lagos:</strong> same-day express on orders confirmed before 12:00, dispatched from our Gbagada studio.</p>
        <p><strong class="text-primary">Ibadan &amp; rest of Nigeria:</strong> 24 to 48 hours via insured courier.</p>
        <p><strong class="text-primary">Worldwide:</strong> 5 to 9 working days, duties calculated at checkout.</p>
        <p>Express delivery within Nigeria is complimentary on orders over ₦100,000. Bespoke and made-to-order pieces ship within 10 to 14 days of your fitting.</p>`,
    },
    sizing: {
      eyebrow: 'Fit & Measurement',
      title: 'Size Guide',
      body: `
        <p>Our lasts run true to EU sizing. Between sizes, we recommend the larger size for loafers and the smaller for sandals.</p>
        <div class="overflow-x-auto"><table class="w-full text-left border-collapse mt-2">
          <thead><tr class="label text-primary">${['EU', 'UK', 'US (M)', 'Foot cm'].map((h) => `<th class="py-2 pr-3 border-b border-charcoal/30">${h}</th>`).join('')}</tr></thead>
          <tbody>${SIZE_ROWS.map((r) => `<tr>${r.map((c) => `<td class="py-1.5 pr-3 border-b border-stone">${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <p>For half sizes, wide or narrow widths, our cobblers craft a bespoke last from your measurements.</p>
        <a class="btn-primary btn-sm mt-2" target="_blank" rel="noopener noreferrer" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Josie Footies, I would like a bespoke sizing consultation.')}">Book Bespoke Sizing</a>`,
    },
    care: {
      eyebrow: 'Provenance',
      title: 'Leather Provenance & Care',
      body: `
        <p>We work in full-grain, vegetable-tanned calf hides that deepen in colour and lustre with wear.</p>
        <p><strong class="text-primary">Daily:</strong> brush off dust with a soft horsehair brush and rest each pair for a day between wears.</p>
        <p><strong class="text-primary">Monthly:</strong> apply a neutral cream conditioner, buff after 10 minutes.</p>
        <p><strong class="text-primary">Rain &amp; heat:</strong> dry naturally away from direct sun; stuff with paper to keep shape.</p>
        <p>Complimentary re-burnishing is available at both ateliers for the life of your piece.</p>`,
    },
    returns: {
      eyebrow: 'Client Care',
      title: 'Returns & Atelier Exchanges',
      body: `
        <p>Unworn pieces in original packaging may be exchanged or returned within 14 days of delivery.</p>
        <p>Size exchanges within Nigeria are collected and redelivered free of charge.</p>
        <p>Bespoke and personalised commissions are final sale, though we will always refit a bespoke pair at no cost.</p>
        <p>To begin, message the concierge with your order details.</p>`,
    },
    'private-client': {
      eyebrow: 'Private Client',
      title: 'The Private Salon',
      body: `
        <p>Our private clients receive first access to atelier drops, archived saved sizes, and a dedicated cordwainer on WhatsApp.</p>
        <p>Your bag and wishlist are already saved on this device.</p>
        <a class="btn-primary btn-sm mt-2" target="_blank" rel="noopener noreferrer" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Josie Footies, I would like to join the private client register.')}">Join Via Concierge</a>`,
    },
  };

  function openInfo(key) {
    const data = key === 'checkout' ? checkoutPanel() : INFO[key];
    if (!data) return;
    const fromQuickView = !$('#quickview').classList.contains('hidden');
    if (!fromQuickView) { closeAll(true); lastFocus = document.activeElement; }
    $('#info-eyebrow').textContent = data.eyebrow;
    $('#info-title').textContent = data.title;
    $('#info-body').innerHTML = data.body;
    showModal('#info');
    setTimeout(() => $('#info [data-action="close-info"]').focus(), 50);
  }

  function checkoutPanel() {
    const summary = state.cart.map((i) => {
      const p = byId(i.id);
      return `<li class="flex justify-between gap-3 py-1.5 border-b border-stone"><span>${i.qty} × ${esc(p.name)}${p.sizes ? ` <span class="label">EU ${esc(i.size)}</span>` : ''}</span><span class="text-primary font-semibold whitespace-nowrap">${naira(p.price * i.qty)}</span></li>`;
    }).join('');
    const total = cartTotal();
    return {
      eyebrow: 'Secure Checkout',
      title: 'Confirm Your Order',
      body: `
        <ul>${summary}</ul>
        <div class="flex justify-between py-2"><span class="label">Subtotal</span><span class="font-serif text-lg text-primary">${naira(total)}</span></div>
        <p class="label">${total >= FREE_DELIVERY ? 'Complimentary express delivery applied' : 'Delivery fee confirmed by concierge'}</p>
        <form id="checkout-form" class="grid gap-2 pt-2" novalidate>
          <input class="field" name="name" required autocomplete="name" placeholder="Full name" />
          <input class="field" name="phone" required type="tel" autocomplete="tel" placeholder="Phone (WhatsApp)" />
          <input class="field" name="address" required autocomplete="street-address" placeholder="Delivery address" />
          <input class="field" name="city" required autocomplete="address-level2" placeholder="City / State" />
          <textarea class="field" name="notes" rows="2" placeholder="Notes for the atelier (optional)"></textarea>
          <p id="checkout-error" class="hidden label text-error">Please complete all required fields.</p>
          <button type="submit" class="btn-primary w-full mt-1"><span class="material-symbols-outlined text-[18px]">lock</span>Confirm &amp; Pay With Concierge</button>
          <p class="text-body-sm">Your concierge will confirm availability and send a secure Paystack link (card, Verve, transfer) on WhatsApp.</p>
        </form>`,
    };
  }

  // ---------- Events ----------
  function onClick(e) {
    const t = e.target.closest('[data-action], [data-filter], [data-filter-link], [data-info]');
    if (!t) return;

    if (t.dataset.filter) { setFilter(t.dataset.filter); return; }

    if (t.dataset.filterLink) {
      e.preventDefault();
      closeAll(true);
      setFilter(t.dataset.filterLink);
      $('#collection').scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', t.dataset.filterLink === 'all' ? '#collection' : `#shop/${t.dataset.filterLink}`);
      return;
    }

    if (t.dataset.info) { openInfo(t.dataset.info); return; }

    const id = t.dataset.id;
    switch (t.dataset.action) {
      case 'open-cart': openDrawer('cart'); break;
      case 'open-wishlist': openDrawer('wishlist'); break;
      case 'open-search': openSearch(); break;
      case 'toggle-theme': toggleTheme(); break;
      case 'close-search':
      case 'close-overlays':
      case 'close-quickview': closeAll(); break;
      case 'close-info':
        hideModal('#info');
        if ($('#quickview').classList.contains('hidden')) closeAll();
        break;
      case 'open-menu':
        closeAll(true);
        showModal('#mobile-menu');
        t.setAttribute('aria-expanded', 'true');
        break;
      case 'close-menu': closeAll(); break;
      case 'quickview': openQuickView(id); break;
      case 'quick-add': {
        const p = byId(id);
        if (p.sizes) openQuickView(id, true); else addToCart(id, null);
        break;
      }
      case 'wishlist': toggleWishlist(id); break;
      case 'size': selectSize(t.dataset.size); break;
      case 'qty': updateQty(id, t.dataset.size, Number(t.dataset.delta)); break;
      case 'browse':
        closeAll(true);
        $('#collection').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'checkout':
        if (!state.cart.length) { toast('Your bag is currently empty'); break; }
        openInfo('checkout');
        break;
      case 'checkout-whatsapp':
        if (!state.cart.length) { toast('Your bag is currently empty'); break; }
        sendToWhatsApp(orderSummaryText());
        break;
    }
  }

  function onSubmit(e) {
    if (e.target.id === 'newsletter-form') {
      e.preventDefault();
      const input = $('#newsletter-email');
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      $('#newsletter-error').classList.toggle('hidden', ok);
      if (!ok) { input.focus(); return; }
      e.target.classList.add('hidden');
      $('#newsletter-success').classList.remove('hidden');
      toast('Welcome to the Josie Footies private salon');
    }
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form).entries());
      const valid = ['name', 'phone', 'address', 'city'].every((k) => (data[k] || '').trim());
      $('#checkout-error').classList.toggle('hidden', valid);
      if (!valid) return;
      sendToWhatsApp(orderSummaryText(data));
      toast('Order sent to your concierge');
    }
  }

  function trapFocus(e) {
    const open = ['#quickview', '#search', '#info', '#mobile-menu'].map((s) => $(s)).filter((el) => !el.classList.contains('hidden')).pop()
      || ['#cart-drawer', '#wishlist-drawer'].map((s) => $(s)).find((el) => el.getAttribute('aria-hidden') === 'false');
    if (!open) return;
    const focusables = $$('a[href], button:not([disabled]), input, textarea, select', open).filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      if (!$('#info').classList.contains('hidden') && !$('#quickview').classList.contains('hidden')) { hideModal('#info'); return; }
      closeAll();
    }
    if (e.key === 'Tab') trapFocus(e);
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
  }

  // Modal backdrops: clicking outside the panel closes.
  function onBackdrop(e) {
    if (e.target.id === 'quickview' || e.target.id === 'search') closeAll();
    if (e.target.id === 'info') {
      hideModal('#info');
      if ($('#quickview').classList.contains('hidden')) closeAll();
    }
  }

  function initReveal() {
    const items = $$('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
  }

  function initHeader() {
    const header = $('#site-header');
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      header.classList.toggle('border-stone', scrolled);
      header.classList.toggle('border-transparent', !scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const heroBg = $('[data-hero-bg]');
    if (heroBg) requestAnimationFrame(() => heroBg.classList.remove('scale-105'));
  }

  // ---------- Theme ----------
  // The <head> script applies the initial theme; this keeps it in sync with the toggle and the OS setting.
  const THEME_KEY = 'jf-theme';
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    $('meta[name="theme-color"]').content = dark ? '#121211' : '#fbf9f4';
    $$('[data-action="toggle-theme"]').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  }

  function toggleTheme() {
    const dark = !document.documentElement.classList.contains('dark');
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (_) { /* ignore */ }
    applyTheme(dark);
  }

  function initTheme() {
    applyTheme(document.documentElement.classList.contains('dark'));
    darkQuery.addEventListener('change', (e) => {
      let saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (_) { /* ignore */ }
      if (!saved) applyTheme(e.matches);
    });
  }

  function initFromHash() {
    const m = location.hash.match(/^#shop\/(\w+)/);
    if (m) {
      setFilter(m[1]);
      setTimeout(() => $('#collection').scrollIntoView(), 100);
    }
  }

  // ---------- Boot ----------
  load();
  initTheme();
  hydrateImages();
  renderGrid();
  renderCart();
  renderWishlist();
  initReveal();
  initHeader();
  initFromHash();
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  document.addEventListener('click', onClick);
  document.addEventListener('submit', onSubmit);
  document.addEventListener('keydown', onKey);
  ['#quickview', '#search', '#info'].forEach((s) => $(s).addEventListener('click', onBackdrop));
  $('#qv-add').addEventListener('click', addFromQuickView);
  $('#qv-wish').addEventListener('click', () => state.qv && toggleWishlist(state.qv.id));
  $('#search-input').addEventListener('input', (e) => renderSearch(e.target.value));
})();
