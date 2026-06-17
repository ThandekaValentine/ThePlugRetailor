/**
 * THE PLUG RETAILOR – Cart Manager
 * Handles cart & wishlist via localStorage
 */

const Cart = (() => {
  const CART_KEY      = 'tpr_cart';
  const WISHLIST_KEY  = 'tpr_wishlist';
  const VIEWED_KEY    = 'tpr_recently_viewed';

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const _load  = key => JSON.parse(localStorage.getItem(key) || '[]');
  const _save  = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  // ─── Cart ──────────────────────────────────────────────────────────────────
  function getCart() { return _load(CART_KEY); }

  function addToCart(product) {
    const cart  = getCart();
    const idx   = cart.findIndex(i => i.id === product.id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    _save(CART_KEY, cart);
    _updateCartBadge();
    return cart;
  }

  function removeFromCart(productId) {
    const cart = getCart().filter(i => i.id !== productId);
    _save(CART_KEY, cart);
    _updateCartBadge();
    return cart;
  }

  function updateQty(productId, qty) {
    const cart = getCart();
    const idx  = cart.findIndex(i => i.id === productId);
    if (idx > -1) {
      if (qty <= 0) return removeFromCart(productId);
      cart[idx].qty = qty;
      _save(CART_KEY, cart);
      _updateCartBadge();
    }
    return getCart();
  }

  function clearCart() {
    _save(CART_KEY, []);
    _updateCartBadge();
  }

  function getCartTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCartCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function _updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ─── Wishlist ──────────────────────────────────────────────────────────────
  function getWishlist() { return _load(WISHLIST_KEY); }

  function toggleWishlist(product) {
    const list  = getWishlist();
    const idx   = list.findIndex(i => i.id === product.id);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(product);
    }
    _save(WISHLIST_KEY, list);
    return idx === -1; // true = added
  }

  function isWishlisted(productId) {
    return getWishlist().some(i => i.id === productId);
  }

  // ─── Recently Viewed ───────────────────────────────────────────────────────
  function addRecentlyViewed(product) {
    let list = _load(VIEWED_KEY).filter(i => i.id !== product.id);
    list.unshift(product);
    if (list.length > 8) list = list.slice(0, 8);
    _save(VIEWED_KEY, list);
  }

  function getRecentlyViewed() { return _load(VIEWED_KEY); }

  // ─── Init (update badge on page load) ─────────────────────────────────────
  function init() {
    document.addEventListener('DOMContentLoaded', _updateCartBadge);
  }

  return {
    getCart, addToCart, removeFromCart, updateQty, clearCart,
    getCartTotal, getCartCount,
    getWishlist, toggleWishlist, isWishlisted,
    addRecentlyViewed, getRecentlyViewed,
    init,
  };
})();

Cart.init();
