# 🛍 The Plug Retailor

**South Africa's home for premium local brands – new and pre-loved.**

A fully responsive, production-ready e-commerce marketplace built entirely with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no backend, no database. Designed to run immediately on **GitHub Pages**.

---

## 📁 Project Structure

```
the-plug-retailor/
│
├── index.html          → Home page (hero, featured products, brands, testimonials, FAQ, newsletter)
├── products.html        → Full product catalogue with search, filters, sorting, categories
├── gallery.html         → Image gallery with lightbox viewer and filtering
├── cart.html             → Shopping cart (view, edit, remove items)
├── checkout.html         → Customer & delivery details form
├── payment.html           → Payment method selection + order placement + success screen
├── contact.html           → Contact form, social links, map, FAQ
├── returns.html            → Return & Refund Policy
├── terms.html               → Terms & Conditions
├── privacy.html               → POPIA-compliant Privacy Policy
│
├── css/
│   └── style.css        → All site styling (responsive, dark mode, SA flag colour palette)
│
├── js/
│   ├── config.js         → EmailJS keys, WhatsApp number, delivery fees, store details
│   ├── script.js           → Product data, shared UI behaviours (dark mode, nav, loader, etc.)
│   ├── cart.js               → Cart & wishlist management (Local Storage)
│   ├── checkout.js             → Order building, order numbers, EmailJS sending
│   └── notifications.js          → Toast notification system
│
├── images/
│   └── placeholders/      → (Optional) folder for your own product images
│
└── README.md
```

---

## 🚀 Deployment to GitHub Pages

1. **Create a new repository** on GitHub (e.g. `the-plug-retailor`).
2. **Upload all files**, keeping the exact folder structure above. The easiest way:
   - On GitHub, click **Add file → Upload files**
   - Drag the entire project folder contents in (or use `git push` if you're comfortable with Git)
3. Go to your repository's **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select the **`main`** branch and **`/ (root)`** folder, then click **Save**.
6. Wait 1–2 minutes. Your site will be live at:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```
7. Visit the URL — the site should work immediately, including cart, wishlist, dark mode, and all pages.

> 💡 All file paths in this project are **relative**, so it will work correctly whether deployed at the root of a domain or in a subfolder (like GitHub Pages project sites).

---

## ⚙️ Required Configuration (Before Going Live)

Open **`js/config.js`** and replace the following placeholders:

| Placeholder | Replace With |
|---|---|
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `your-email@example.com` | Your store's order-notification email address |
| `27XXXXXXXXX` | Your WhatsApp number (digits only, with country code, no `+` or spaces) |
| `MAPS_EMBED_URL` | Your real Google Maps embed URL |
| Social media `#` links | Your actual Facebook, Instagram, TikTok, X profile URLs |

### 📧 Setting Up EmailJS (for order notification emails)

Since this site has no backend, **EmailJS** is used to send an email to the store owner whenever a customer completes checkout.

1. Sign up for a free account at [https://www.emailjs.com](https://www.emailjs.com)
2. Create an **Email Service** (e.g. connect your Gmail account) → copy the **Service ID**
3. Create an **Email Template** with variables matching those sent from `checkout.js`:
   ```
   {{order_number}}, {{order_date}}, {{customer_name}}, {{customer_email}},
   {{customer_phone}}, {{customer_address}}, {{order_items}},
   {{delivery_method}}, {{delivery_cost}}, {{subtotal}}, {{total}}, {{to_email}}
   ```
4. Copy your **Template ID** and your account's **Public Key** (under Account → API Keys)
5. Paste all three values into `js/config.js`
6. The EmailJS SDK is already linked in `payment.html` via CDN — no extra installation needed.

> ⚠️ If EmailJS is not configured, the site will still work perfectly for browsing, cart, and checkout — it will simply skip sending the notification email (a console warning will appear, and the order success screen will still display normally with a generated order number).

---

## ✨ Features Included

- **100% South African brand storefront** — new & pre-loved products side by side
- **Product catalogue** with search, category filters, price filters, and sorting (price, newest, popularity)
- **Wishlist** (persisted via Local Storage)
- **Shopping cart** — supports mixed new + pre-loved items, quantity adjustment, delivery estimate
- **Multi-step checkout** — delivery details → delivery method → payment → order confirmation
- **Order numbers** auto-generated in the format `TP123456`
- **EmailJS order notification emails** sent automatically to the store owner
- **Floating WhatsApp support button** on every page
- **Image gallery** with lightbox viewer, keyboard navigation, and filtering
- **Dark mode toggle** (remembers preference + respects system setting)
- **Mobile-responsive navigation menu**
- **Back-to-top button**
- **Page loading animation**
- **Recently viewed products**
- **Newsletter subscription** (stored locally)
- **Contact form** with validation
- **Return & Refund Policy, Terms & Conditions, POPIA-compliant Privacy Policy**
- **Toast notification system** for user feedback (add to cart, wishlist, errors, etc.)
- Fully **semantic HTML5**, accessible markup (ARIA labels, roles, keyboard navigation)
- **CSS Grid & Flexbox** responsive layouts — works on mobile, tablet, and desktop
- South African flag–inspired colour palette used professionally throughout

---

## 🎨 Customising Products

All product data lives in **`js/script.js`** inside the `PRODUCTS` array. Each product object looks like:

```js
{
  id: 'p001',
  name: 'Soweto Classic Tee',
  brand: 'Ubuntu Threads',
  category: 'shirts',          // shirts, caps, tracksuits, shoes, hoodies, jackets, jeans, accessories, watches, bags
  condition: 'new',             // 'new' or 'pre-loved'
  condRating: 'Like New',       // only for pre-loved: Like New, Excellent, Good, Fair
  price: 499,
  rating: 4.8,
  popular: true,
  image: 'https://...',         // replace with your own product photo URL or local path
  badge: 'Best Seller'          // optional sticker label, or null
}
```

To add, remove, or edit products, simply edit this array — the entire site (home page, products page, gallery, cart) reads from this single source of truth.

To use your **own images** instead of the Unsplash placeholders, place image files inside `images/placeholders/` and update each product's `image` value to a relative path, e.g. `images/placeholders/tee-001.jpg`.

---

## 🧪 Testing Locally

Since the site uses only static files, you can simply open `index.html` in your browser. For best results (especially for relative paths and Local Storage), serve it with a simple local server:

```bash
# Python 3
python -m http.server 8000

# Then visit:
http://localhost:8000
```

---

## 🛠 Technology Used

- HTML5 (semantic markup)
- CSS3 (Flexbox, Grid, custom properties, dark mode via `data-theme`)
- Vanilla JavaScript (ES6+, no frameworks or build tools)
- Browser Local Storage & Session Storage (cart, wishlist, orders, dark mode preference)
- EmailJS (client-side email notifications)

No React, Vue, Angular, Node.js, databases, or backend servers are used anywhere in this project — making it 100% compatible with GitHub Pages hosting.

---

## 📜 License

This project was custom-built for **The Plug Retailor**. All brand names, products, and testimonials used in the demo data are fictional placeholders for demonstration purposes.

---

**Proudly South African 🇿🇦 — Built for local brands, by design.**
