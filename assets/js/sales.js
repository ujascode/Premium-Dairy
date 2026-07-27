/**
 * Sales.js - Logic for Sales History
 */

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initSalesPage();
  }, 50);
});

let allSales = [];

function initSalesPage() {
  allSales = Storage.getSales();
  renderSalesTable(allSales);
  
  document.getElementById('search-sales')?.addEventListener('input', handleSalesFilters);
  document.getElementById('filter-status')?.addEventListener('change', handleSalesFilters);
  // Date filtering can be complex, skipping exact logic for dummy implementation
}

function handleSalesFilters() {
  const searchTerm = document.getElementById('search-sales').value.toLowerCase();
  const status = document.getElementById('filter-status').value;
  
  const filtered = allSales.filter(s => {
    const matchSearch = s.id.toLowerCase().includes(searchTerm) || s.customerName.toLowerCase().includes(searchTerm);
    const matchStatus = status === 'all' || s.status === status;
    return matchSearch && matchStatus;
  });
  
  renderSalesTable(filtered);
}

function renderSalesTable(sales) {
  const tbody = document.getElementById('sales-tbody');
  if (!tbody) return;
  
  document.getElementById('total-items').textContent = sales.length;
  document.getElementById('page-end').textContent = Math.min(10, sales.length);
  
  if (sales.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center" style="padding: 3rem;">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="ph ph-receipt"></i></div>
            <h3>No sales found</h3>
            <p class="text-secondary">Try adjusting your filters or create a new invoice.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = sales.map(s => {
    let statusBadge = 'badge-success';
    if (s.status === 'Pending') statusBadge = 'badge-warning';
    if (s.status === 'Cancelled') statusBadge = 'badge-danger';
    
    return `
      <tr>
        <td class="font-medium text-brand">${s.id}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="avatar avatar-sm">${s.customerName.charAt(0)}</div>
            <span>${s.customerName}</span>
          </div>
        </td>
        <td>${Utils.formatDateTime(s.date)}</td>
        <td>
          <div class="flex items-center gap-1 text-secondary">
            <i class="ph ${s.paymentMethod === 'Card' ? 'ph-credit-card' : (s.paymentMethod === 'Cash' ? 'ph-money' : 'ph-bank')}"></i>
            ${s.paymentMethod}
          </div>
        </td>
        <td class="font-bold">${Utils.formatCurrency(s.total)}</td>
        <td><span class="badge ${statusBadge}">${s.status}</span></td>
        <td class="actions">
          <button class="btn-icon" title="View Invoice" onclick="viewInvoice('${s.id}')"><i class="ph ph-eye"></i></button>
          <button class="btn-icon" title="Print Invoice"><i class="ph ph-printer"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function viewInvoice(id) {
  Utils.showToast('Info', `Viewing invoice ${id}...`, 'success');
}
