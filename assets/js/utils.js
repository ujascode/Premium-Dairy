/**
 * Utils.js - Shared helper functions
 */

const Utils = {
  // Format currency based on settings
  formatCurrency(amount) {
    const settings = Storage.getSettings();
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount).replace('₹', settings.currency);
  },
  
  // Format Date (e.g. 28 Jul, 2026)
  formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },
  
  // Format DateTime
  formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Generate random ID
  generateId(prefix = 'ID') {
    return prefix + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  },
  
  // Toast Notification System
  showToast(title, message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    let iconClass = 'ph-check-circle';
    if (type === 'error') iconClass = 'ph-warning-circle';
    if (type === 'warning') iconClass = 'ph-info';
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="ph ${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()"><i class="ph ph-x"></i></button>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300); // Wait for transition
    }, 4000);
  },
  
  // Simple HTML sanitizer to prevent XSS in dynamic rendering
  escapeHtml(unsafe) {
    return (unsafe || '').toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }
};
