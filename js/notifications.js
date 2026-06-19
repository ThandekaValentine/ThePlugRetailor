/**
 * THE PLUG RETAILOR – Notification System
 * Lightweight toast notifications (no dependencies)
 */

const Notifications = (() => {
  // Inject container once
  function _getContainer() {
    let c = document.getElementById('tpr-toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'tpr-toast-container';
      c.setAttribute('aria-live', 'polite');
      c.setAttribute('aria-atomic', 'false');
      document.body.appendChild(c);
    }
    return c;
  }

  /**
   * Show a toast notification
   * @param {string} message  - Text to display
   * @param {'success'|'error'|'info'|'warning'} type
   * @param {number} duration - ms before auto-dismiss (0 = sticky)
   */
  function show(message, type = 'info', duration = 3500) {
    const container = _getContainer();
    const toast     = document.createElement('div');
    toast.className = `tpr-toast tpr-toast--${type}`;

    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    toast.innerHTML = `
      <span class="tpr-toast__icon">${icons[type] ?? 'ℹ'}</span>
      <span class="tpr-toast__msg">${message}</span>
      <button class="tpr-toast__close" aria-label="Dismiss">×</button>
    `;

    // Dismiss on close button
    toast.querySelector('.tpr-toast__close').addEventListener('click', () => _dismiss(toast));
