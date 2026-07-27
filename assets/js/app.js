/**
 * App.js - Core application logic, Layout Injection, Event Listeners
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme first to prevent flash
  Theme.init();
  
  // 2. Inject Layout (Sidebar & Navbar) if we are not on login page
  const isLoginPage = window.location.pathname.includes('login.html');
  if (!isLoginPage) {
    App.renderLayout();
  }
  
  // 3. Setup Global Event Listeners
  App.setupEventListeners();
  
  // 4. Update Notifications Badge
  App.updateNotificationsBadge();
});

const App = {
  renderLayout() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const navbarContainer = document.getElementById('navbar-container');
    
    const path = window.location.pathname;
    // Handle root url
    const page = path === '/' || path.endsWith('dairy-sales-management/') ? 'index.html' : path.split('/').pop();
    
    if (sidebarContainer) {
      sidebarContainer.innerHTML = `
        <aside class="sidebar" id="sidebar">
          <div class="sidebar-header">
            <div class="logo-icon"><i class="ph ph-drop"></i></div>
            <span class="logo-text">Premium Dairy</span>
          </div>
          
          <nav class="sidebar-nav">
            <div class="nav-label">Overview</div>
            <a href="/index.html" class="nav-item ${page === 'index.html' || page === 'dashboard.html' ? 'active' : ''}">
              <i class="ph ph-squares-four"></i>
              <span>Dashboard</span>
            </a>
            <a href="/pages/analytics.html" class="nav-item ${page === 'analytics.html' ? 'active' : ''}">
              <i class="ph ph-chart-pie"></i>
              <span>Analytics</span>
            </a>
            
            <div class="nav-label">Store</div>
            <a href="/pages/new-sale.html" class="nav-item ${page === 'new-sale.html' ? 'active' : ''}">
              <i class="ph ph-shopping-cart"></i>
              <span>New Sale</span>
            </a>
            <a href="/pages/sales.html" class="nav-item ${page === 'sales.html' ? 'active' : ''}">
              <i class="ph ph-receipt"></i>
              <span>Sales History</span>
            </a>
            <a href="/pages/customers.html" class="nav-item ${page === 'customers.html' ? 'active' : ''}">
              <i class="ph ph-users"></i>
              <span>Customers</span>
            </a>
            
            <div class="nav-label">Management</div>
            <a href="/pages/products.html" class="nav-item ${page === 'products.html' || page === 'add-product.html' ? 'active' : ''}">
              <i class="ph ph-package"></i>
              <span>Products</span>
            </a>
            <a href="/pages/inventory.html" class="nav-item ${page === 'inventory.html' ? 'active' : ''}">
              <i class="ph ph-stack"></i>
              <span>Inventory</span>
              <span class="nav-badge" id="sidebar-stock-badge" style="display:none">0</span>
            </a>
            <a href="/pages/reports.html" class="nav-item ${page === 'reports.html' ? 'active' : ''}">
              <i class="ph ph-file-text"></i>
              <span>Reports</span>
            </a>
            
            <div style="flex:1"></div>
            
            <a href="/pages/settings.html" class="nav-item ${page === 'settings.html' ? 'active' : ''}">
              <i class="ph ph-gear"></i>
              <span>Settings</span>
            </a>
            <a href="/pages/help.html" class="nav-item ${page === 'help.html' ? 'active' : ''}">
              <i class="ph ph-question"></i>
              <span>Help Center</span>
            </a>
          </nav>
        </aside>
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
      `;
    }
    
    if (navbarContainer) {
      const user = Storage.getUser();
      navbarContainer.innerHTML = `
        <header class="navbar">
          <div class="navbar-left">
            <button class="btn-icon" id="toggle-sidebar" title="Toggle Sidebar">
              <i class="ph ph-list text-xl"></i>
            </button>
            <div class="search-container ml-4">
              <i class="ph ph-magnifying-glass input-icon text-lg" style="left: 1rem"></i>
              <input type="text" class="search-input" id="global-search" placeholder="Search anything... (Press ⌘K)">
              <span class="search-shortcut">⌘K</span>
            </div>
          </div>
          
          <div class="navbar-right">
            <button class="btn-icon" id="theme-toggle" title="Toggle Theme">
              <i id="theme-icon" class="ph ${Storage.getSettings().theme === 'dark' ? 'ph-sun' : 'ph-moon'} text-xl"></i>
            </button>
            <a href="/pages/notifications.html" class="btn-icon" style="position:relative">
              <i class="ph ph-bell text-xl"></i>
              <span id="nav-notif-badge" class="nav-badge" style="position:absolute; top:-2px; right:-2px; display:none;">0</span>
            </a>
            <a href="/pages/profile.html" class="profile-menu">
              <img src="${user.avatar}" alt="Avatar" class="avatar avatar-sm">
              <div class="profile-info">
                <span class="profile-name">${user.name}</span>
                <span class="profile-role">${user.role}</span>
              </div>
            </a>
          </div>
        </header>
      `;
    }
  },
  
  setupEventListeners() {
    // Sidebar Toggles
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.toggle('mobile-open');
        } else {
          sidebar.classList.toggle('collapsed');
        }
      });
    }
    
    if (overlay && sidebar) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
      });
    }
    
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => Theme.toggle());
    }
    
    // Command Palette (Ctrl+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        if (searchInput) searchInput.focus();
      }
    });

    // Global Search Handling Simulation
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          Utils.showToast('Search', `Searching for "${e.target.value}"... (Demo)`, 'warning');
          e.target.value = '';
          e.target.blur();
        }
      });
    }
  },
  
  updateNotificationsBadge() {
    const notifs = Storage.getNotifications().filter(n => !n.read).length;
    const badge = document.getElementById('nav-notif-badge');
    if (badge) {
      if (notifs > 0) {
        badge.textContent = notifs;
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
    }
    
    // Low stock badge
    const lowStock = Storage.getProducts().filter(p => p.stock < 20).length;
    const stockBadge = document.getElementById('sidebar-stock-badge');
    if (stockBadge) {
      if (lowStock > 0) {
        stockBadge.textContent = lowStock;
        stockBadge.style.display = 'inline-block';
      } else {
        stockBadge.style.display = 'none';
      }
    }
  }
};
