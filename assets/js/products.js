/**
 * Products.js - Logic for Products Management Page
 */

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initProductsPage();
  }, 50);
});

let allProducts = [];

function initProductsPage() {
  allProducts = Storage.getProducts();
  
  // Populate Categories Filter
  const categories = Storage.getCategories();
  const catFilter = document.getElementById('filter-category');
  if (catFilter) {
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      catFilter.appendChild(opt);
    });
  }
  
  renderProductsTable(allProducts);
  
  // Setup Event Listeners for Filters
  document.getElementById('search-products')?.addEventListener('input', handleFilters);
  document.getElementById('filter-category')?.addEventListener('change', handleFilters);
  document.getElementById('filter-status')?.addEventListener('change', handleFilters);
  
  document.getElementById('confirm-delete-btn')?.addEventListener('click', confirmDeleteProduct);
}

function handleFilters() {
  const searchTerm = document.getElementById('search-products').value.toLowerCase();
  const category = document.getElementById('filter-category').value;
  const status = document.getElementById('filter-status').value;
  
  const filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm);
    const matchCat = category === 'all' || p.category === category;
    const matchStatus = status === 'all' || p.status === status;
    return matchSearch && matchCat && matchStatus;
  });
  
  renderProductsTable(filtered);
}

function renderProductsTable(products) {
  const tbody = document.getElementById('products-tbody');
  if (!tbody) return;
  
  document.getElementById('total-items').textContent = products.length;
  document.getElementById('page-end').textContent = Math.min(10, products.length);
  
  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center" style="padding: 3rem;">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="ph ph-package"></i></div>
            <h3>No products found</h3>
            <p class="text-secondary">Try adjusting your filters or search query.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = products.map(p => {
    let statusBadge = 'badge-success';
    if (p.status === 'Low Stock') statusBadge = 'badge-warning';
    if (p.status === 'Out of Stock') statusBadge = 'badge-danger';
    
    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="product-img"><i class="ph ph-package"></i></div>
            <div class="font-medium">${p.name}</div>
          </div>
        </td>
        <td class="text-secondary">${p.sku}</td>
        <td>${p.category}</td>
        <td class="font-medium">${Utils.formatCurrency(p.price)}</td>
        <td class="text-secondary">${Utils.formatCurrency(p.cost)}</td>
        <td>
          <span class="${p.stock < 20 ? 'text-danger font-medium' : ''}">${p.stock}</span>
        </td>
        <td><span class="badge ${statusBadge}">${p.status}</span></td>
        <td class="text-secondary">${Utils.formatDate(p.added)}</td>
        <td class="actions">
          <button class="btn-icon" title="Edit" onclick="editProduct('${p.id}')"><i class="ph ph-pencil-simple"></i></button>
          <button class="btn-icon text-danger" title="Delete" onclick="openDeleteModal('${p.id}', '${p.name}')"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function editProduct(id) {
  // In a real app we would pass id via URL or state
  Utils.showToast('Edit Product', 'Navigating to edit product page...', 'warning');
  setTimeout(() => window.location.href = `add-product.html?id=${id}`, 500);
}

function openDeleteModal(id, name) {
  document.getElementById('delete-product-id').value = id;
  document.getElementById('delete-product-name').textContent = name;
  document.getElementById('delete-modal').classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function confirmDeleteProduct() {
  const id = document.getElementById('delete-product-id').value;
  Storage.deleteProduct(id);
  closeModal('delete-modal');
  Utils.showToast('Product Deleted', 'The product has been removed successfully.', 'success');
  
  // Refresh data
  allProducts = Storage.getProducts();
  handleFilters();
}
