/**
 * THE PLUG RETAILOR – Main Script
 * Product data, shared UI behaviours, dark mode, nav, back-to-top, loading
 */

// ─── Product Catalogue ────────────────────────────────────────────────────────
const PRODUCTS = [
  // NEW PRODUCTS
  { id: 'p001', name: 'Soweto Classic Tee', brand: 'Ubuntu Threads', category: 'shirts',      condition: 'new',      price: 499,  rating: 4.8, popular: true,  image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80', badge: 'Best Seller' },
  { id: 'p002', name: 'Joburg Snapback',    brand: 'Kasi Kulture',   category: 'caps',         condition: 'new',      price: 299,  rating: 4.6, popular: true,  image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', badge: 'New' },
  { id: 'p003', name: 'Cape Town Tracksuit',brand: 'Mzansi Active',  category: 'tracksuits',   condition: 'new',      price: 1299, rating: 4.9, popular: true,  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', badge: 'Hot' },
  { id: 'p004', name: 'Safari Runner',      brand: 'Veld Kicks',     category: 'shoes',        condition: 'new',      price: 1599, rating: 4.7, popular: false, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', badge: null },
  { id: 'p005', name: 'Madiba Hoodie',      brand: 'Ubuntu Threads', category: 'hoodies',      condition: 'new',      price: 799,  rating: 4.8, popular: true,  image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', badge: 'New' },
  { id: 'p006', name: 'Highveld Jacket',    brand: 'Mzansi Active',  category: 'jackets',      condition: 'new',      price: 1199, rating: 4.5, popular: false, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80', badge: null },
  { id: 'p007', name: 'Ubuntu Slim Jeans',  brand: 'Kasi Kulture',   category: 'jeans',        condition: 'new',      price: 899,  rating: 4.6, popular: false, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', badge: null },
  { id: 'p008', name: 'Ndebele Bracelet',   brand: 'Roots Craft Co', category: 'accessories',  condition: 'new',      price: 199,  rating: 4.9, popular: true,  image: 'https://images.unsplash.com/photo-1573408301185-9519f94815b6?w=400&q=80', badge: 'Best Seller' },
  { id: 'p009', name: 'Karoo Chronograph',  brand: 'Time ZA',        category: 'watches',      condition: 'new',      price: 3499, rating: 4.8, popular: true,  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', badge: 'Premium' },
  { id: 'p010', name: 'Savanna Tote',       brand: 'Roots Craft Co', category: 'bags',         condition: 'new',      price: 649,  rating: 4.7, popular: false, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', badge: null },
  { id: 'p011', name: 'Township Graphic Tee',brand:'Kasi Kulture',   category: 'shirts',       condition: 'new',      price: 449,  rating: 4.5, popular: false, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80', badge: null },
  { id: 'p012', name: 'Protea Sneaker',     brand: 'Veld Kicks',     category: 'shoes',        condition: 'new',      price: 1299, rating: 4.9, popular: true,  image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80', badge: 'New' },

  // PRE-LOVED PRODUCTS
  { id: 'p013', name: 'Vintage Ubuntu Tee', brand: 'Ubuntu Threads', category: 'shirts',       condition: 'pre-loved', condRating: 'Like New',  price: 199, rating: 4.6, popular: false, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', badge: 'Like New' },
  { id: 'p014', name: 'Retro Kasi Cap',     brand: 'Kasi Kulture',   category: 'caps',          condition: 'pre-loved', condRating: 'Excellent', price: 129, rating: 4.4, popular: false, image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&q=80', badge: 'Excellent' },
  { id: 'p015', name: 'Active Tracksuit',   brand: 'Mzansi Active',  category: 'tracksuits',    condition: 'pre-loved', condRating: 'Good',      price: 599, rating: 4.3, popular: false, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', badge: 'Good' },
  { id: 'p016', name: 'Classic Runner PL',  brand: 'Veld Kicks',     category: 'shoes',         condition: 'pre-loved', condRating: 'Like New',  price: 749, rating: 4.7, popular: true,  image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80', badge: 'Like New' },
  { id: 'p017', name: 'Wool Hoodie PL',     brand: 'Ubuntu Threads', category: 'hoodies',       condition: 'pre-loved', condRating: 'Excellent', price: 349, rating: 4.5, popular: false, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&q=80', badge: 'Excellent' },
  { id: 'p018', name: 'Winter Jacket PL',   brand: 'Mzansi Active',  category: 'jackets',       condition: 'pre-loved', condRating: 'Good',      price: 499, rating: 4.2, popular: false, image: 'https://images.unsplash.com/photo-1520975867-c5d14c07d0be?w=400&q=80', badge: 'Good' },
  { id: 'p019', name: 'Denim Slim PL',      brand: 'Kasi Kulture',   category: 'jeans',         condition: 'pre-loved', condRating: 'Excellent', price: 399, rating: 4.5, popular: true,  image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80', badge: 'Excellent' },
  { id: 'p020', name: 'Beaded Necklace PL', brand: 'Roots Craft Co', category: 'accessories',   condition: 'pre-loved', condRating: 'Like New',  price: 89,  rating: 4.7, popular: false, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', badge: 'Like New' },
  { id: 'p021', name: 'Field Watch PL',     brand: 'Time ZA',        category: 'watches',       condition: 'pre-loved', condRating: 'Good',      price: 1299,rating: 4.4, popular: false, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80', badge: 'Good' },
  { id: 'p022', name: 'Leather Tote PL',    brand: 'Roots Craft Co', category: 'bags',          condition: 'pre-loved', condRating: 'Fair',      price: 289, rating: 4.1, popular: false, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=400&q=80', badge: 'Fair' },
  { id: 'p023', name: 'Graphic Print Tee PL',brand:'Ubuntu Threads', category: 'shirts',        condition: 'pre-loved', condRating: 'Excellent', price: 159, rating: 4.5, popular: true,  image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80', badge: 'Excellent' },
  { id: 'p024', name: 'Premium Sneaker PL', brand: 'Veld Kicks',     category: 'shoes',         condition: 'pre-loved', condRating: 'Like New',  price: 899, rating: 4.8, popular: true,  image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80', badge: 'Like New' },
];

const BRANDS = [
  { name: 'Ubuntu Threads', tagline: 'Authentic African streetwear since 2018', icon: '🧵' },
  { name: 'Kasi Kulture',   tagline: 'Township-inspired fashion for the bold',   icon: '🎨' },
  { name: 'Mzansi Active',  tagline: 'Performance gear built for SA athletes',   icon: '⚡' },
  { name: 'Veld Kicks',     tagline: 'SA-crafted footwear, proudly local',        icon: '👟' },
  { name: 'Roots Craft Co', tagline: 'Handmade accessories inspired by heritage', icon: '🌿' },
  { name: 'Time ZA',        tagline: 'Precision timepieces made in Mzansi',      icon: '⌚' },
];

// ─── Product Card Builder ─────────────────────────────────────────────────────
function buildProductCard(p, compact = false) {
  const wishlisted = Cart.isWishlisted(p.id);
  const condLabel  = p.condition === 'new' ? 'New' : 'Pre-Loved';
  const condClass  = p.condition === 'new' ? 'badge--new' : 'badge--preloved';

  return `
    <article class="product-card${compact ? ' product-card--compact' : ''}" data-id="${p.id}" tabindex="0" aria-label="${p.name} by ${p.brand}">
      <div class="product-card__img-wrap">
        ${p.badge ? `<span class="product-card__sticker">${p.badge}</span>` : ''}
        <span class="product-card__cond ${condClass}">${condLabel}</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400/007749/FFB612?text=TPR'">
        <button class="product-card__wish ${wishlisted ? 'active' : ''}"
                aria-label="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
                onclick="handleWishlist(event,'${p.id}')">
          ${wishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${p.brand}</p>
        <h3 class="product-card__name">${p.name}</h3>
        ${p.condRating ? `<span class="product-card__cond-rating">${p.condRating}</span>` : ''}
        <div class="product-card__footer">
          <span class="product-card__price">R${p.price.toLocaleString('en-ZA')}</span>
          <button class="btn btn--primary btn--sm" onclick="handleAddToCart(event,'${p.id}')">
            Add to Cart
          </button>
        </div>
      </div>
    </article>`;
}

// ─── Cart / Wishlist Event Handlers ──────────────────────────────────────────
function handleAddToCart(e, productId) {
  e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  Cart.addToCart(p);
  Notifications.success(`"${p.name}" added to cart!`);
}

function handleWishlist(e, productId) {
  e.stopPropagation();
  const p    = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const added = Cart.toggleWishlist(p);
  const btn   = e.currentTarget;
  btn.textContent = added ? '♥' : '♡';
  btn.classList.toggle('active', added);
  Notifications[added ? 'info' : 'warning'](
    added ? `"${p.name}" saved to wishlist.` : `"${p.name}" removed from wishlist.`
  );
}

// ─── Dark Mode ────────────────────────────────────────────────────────────────
function initDarkMode() {
  const btn  = document.getElementById('darkModeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('tpr_dark_mode');

  const apply = dark => {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (btn) btn.setAttribute('aria-pressed', dark);
    if (btn) btn.textContent = dark ? '☀' : '☾';
    localStorage.setItem('tpr_dark_mode', dark ? '1' : '0');
  };

  // Respect system preference if no saved setting
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved !== null ? saved === '1' : prefersDark);

  if (btn) btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') !== 'dark');
  });
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('nav__menu--open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('nav__menu--open');
      toggle.setAttribute('aria-expanded', false);
      toggle.textContent = '☰';
    })
  );
}

// ─── Back to Top ──────────────────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── Loading Animation ────────────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    loader.classList.add('loader--done');
    setTimeout(() => loader.remove(), 400);
  });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      const subs = JSON.parse(localStorage.getItem('tpr_subscribers') || '[]');
      if (subs.includes(email)) {
        Notifications.info('You are already subscribed!');
      } else {
        subs.push(email);
        localStorage.setItem('tpr_subscribers', JSON.stringify(subs));
        Notifications.success('Thanks for subscribing! 🎉');
        form.reset();
      }
    });
  });
}

// ─── Shared Init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileNav();
  initBackToTop();
  initLoader();
  initNewsletter();
});
