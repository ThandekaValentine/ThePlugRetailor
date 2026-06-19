/**
 * THE PLUG RETAILOR – Checkout & Order Processing
 */

const Checkout = (() => {
  const ORDER_KEY = 'tpr_last_order';

  // ─── Generate unique order number ─────────────────────────────────────────
  function generateOrderNumber() {
    const n = Math.floor(100000 + Math.random() * 900000);
    return `TP${n}`;
  }

  // ─── Save order to localStorage ───────────────────────────────────────────
  function saveOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    // Also append to order history
    const history = JSON.parse(localStorage.getItem('tpr_order_history') || '[]');
    history.unshift(order);
    localStorage.setItem('tpr_order_history', JSON.stringify(history.slice(0, 50)));
  }

  function getLastOrder() {
    return JSON.parse(localStorage.getItem(ORDER_KEY) || 'null');
  }

  // ─── Format order for email ────────────────────────────────────────────────
  function formatOrderEmail(order) {
    const itemLines = order.items.map(i =>
      `${i.qty} x ${i.name} (${i.brand}) [${i.condition}] – R${(i.price * i.qty).toFixed(2)}`
    ).join('\n');

    return {
      to_email:       CONFIG.STORE_OWNER_EMAIL,
      store_name:     CONFIG.STORE_NAME,
      order_number:   order.orderNumber,
      order_date:     order.date,
      // Customer
      customer_name:  order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      customer_address:`${order.customer.address}, ${order.customer.city}, ${order.customer.province}, ${order.customer.postal}`,
      // Items
      order_items:    itemLines,
      // Delivery
      delivery_method: order.delivery.method,
      delivery_cost:  `R${order.delivery.cost.toFixed(2)}`,
      // Totals
      subtotal:       `R${order.subtotal.toFixed(2)}`,
      total:          `R${order.total.toFixed(2)}`,
    };
  }

  // ─── Send email via EmailJS ────────────────────────────────────────────────
  async function sendOrderEmail(order) {
    if (
      CONFIG.EMAILJS_PUBLIC_KEY  === 'EMAILJS_PUBLIC_KEY' ||
      CONFIG.EMAILJS_SERVICE_ID  === 'EMAILJS_SERVICE_ID' ||
      CONFIG.EMAILJS_TEMPLATE_ID === 'EMAILJS_TEMPLATE_ID'
    ) {
      console.warn('[TPR] EmailJS not configured – skipping email notification.');
      return;
    }

    try {
      emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
      const params = formatOrderEmail(order);
      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, params);
      console.info('[TPR] Order email sent successfully.');
    } catch (err) {
      console.error('[TPR] EmailJS error:', err);
    }
  }

  // ─── Build full order object ───────────────────────────────────────────────
  function buildOrder(customerData, deliveryOption, cartItems, deliveryCost) {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      orderNumber: generateOrderNumber(),
      date:        new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
      customer:    customerData,
      delivery:    { method: deliveryOption, cost: deliveryCost },
      items:       cartItems,
      subtotal,
      total:       subtotal + deliveryCost,
    };
  }

  return { generateOrderNumber, saveOrder, getLastOrder, buildOrder, sendOrderEmail };
})();
