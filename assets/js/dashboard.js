/**
 * Dashboard.js - Controller for the Dashboard page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Give layout a moment to render
  setTimeout(() => {
    initDashboard();
  }, 50);

  // Re-render charts on theme change
  window.addEventListener('themeChanged', () => {
    if (window.revenueChart) window.revenueChart.destroy();
    if (window.salesChart) window.salesChart.destroy();
    renderDashboardCharts();
  });
});

function initDashboard() {
  const stats = Storage.getDashboardStats();
  
  // Update Overview Cards
  document.getElementById('dash-today-rev').textContent = Utils.formatCurrency(stats.todayRevenue);
  document.getElementById('dash-today-ord').textContent = stats.todayOrders;
  document.getElementById('dash-total-rev').textContent = Utils.formatCurrency(stats.totalRevenue);
  document.getElementById('dash-total-ord').textContent = stats.totalOrders;
  
  // Render Charts
  renderDashboardCharts();
  
  // Render Lists
  renderTopProducts();
  renderRecentOrders();
}

function renderDashboardCharts() {
  // Weekly Revenue Mock Data
  window.revenueChart = Charts.renderLineChart(
    'revenueChart', 
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
    [12000, 19000, 15000, 25000, 22000, 30000, 18500],
    'Revenue',
    'success'
  );
  
  // Weekly Sales Mock Data
  window.salesChart = Charts.renderBarChart(
    'salesChart',
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [65, 59, 80, 81, 56, 120, 42],
    'Orders'
  );
}

function renderTopProducts() {
  const container = document.getElementById('top-products-list');
  if (!container) return;

  const products = Storage.getProducts().slice(0, 5); // Just grab top 5
  
  container.innerHTML = products.map((p, i) => `
    <div class="list-item stagger-${i+1}" style="animation: slideUp 0.4s ease-out forwards; opacity:0; transform:translateY(10px)">
      <div class="item-info">
        <div class="item-img"><i class="ph ph-package"></i></div>
        <div class="item-details">
          <h4>${p.name}</h4>
          <p>${p.category}</p>
        </div>
      </div>
      <div class="item-meta">
        <h4>${Utils.formatCurrency(p.price)}</h4>
        <p class="${p.stock < 20 ? 'text-danger' : 'text-success'}">${p.stock} in stock</p>
      </div>
    </div>
  `).join('');
}

function renderRecentOrders() {
  const tbody = document.getElementById('recent-orders-tbody');
  if (!tbody) return;

  const sales = Storage.getSales().slice(0, 6);
  
  tbody.innerHTML = sales.map(s => {
    let statusBadge = 'badge-success';
    if (s.status === 'Pending') statusBadge = 'badge-warning';
    if (s.status === 'Cancelled') statusBadge = 'badge-danger';
    
    return `
      <tr>
        <td class="font-medium">${s.id}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="avatar avatar-sm">${s.customerName.charAt(0)}</div>
            <span>${s.customerName}</span>
          </div>
        </td>
        <td>${Utils.formatDateTime(s.date)}</td>
        <td class="font-medium">${Utils.formatCurrency(s.total)}</td>
        <td><span class="badge ${statusBadge}">${s.status}</span></td>
        <td class="actions">
          <button class="btn-icon" title="View Invoice"><i class="ph ph-eye"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}
