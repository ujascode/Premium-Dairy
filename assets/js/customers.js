/**
 * Customers.js - Logic for Customers Management
 */

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initCustomersPage();
  }, 50);
});

let allCustomers = [];

function initCustomersPage() {
  allCustomers = Storage.getCustomers();
  renderCustomersTable(allCustomers);
  
  document.getElementById('search-customers')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCustomers.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.email.toLowerCase().includes(term) || 
      c.phone.includes(term)
    );
    renderCustomersTable(filtered);
  });
  
  document.getElementById('add-customer-form')?.addEventListener('submit', handleAddCustomer);
}

function renderCustomersTable(customers) {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;
  
  if (customers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center" style="padding: 3rem;">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="ph ph-users"></i></div>
            <h3>No customers found</h3>
            <p class="text-secondary">Try adjusting your search query.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = customers.map(c => `
    <tr>
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">${c.name.charAt(0)}</div>
          <div class="font-medium">${c.name}</div>
        </div>
      </td>
      <td>
        <div class="flex flex-col gap-1">
          <span class="text-sm"><i class="ph ph-envelope text-tertiary"></i> ${c.email}</span>
          <span class="text-sm"><i class="ph ph-phone text-tertiary"></i> ${c.phone}</span>
        </div>
      </td>
      <td class="font-medium">${Utils.formatCurrency(c.totalPurchases)}</td>
      <td class="text-secondary">${Utils.formatDate(c.lastOrder)}</td>
      <td><span class="badge badge-success">${c.status}</span></td>
      <td class="actions">
        <button class="btn-icon" title="View Profile" onclick="viewCustomer('${c.id}')"><i class="ph ph-eye"></i></button>
        <button class="btn-icon" title="Edit"><i class="ph ph-pencil-simple"></i></button>
      </td>
    </tr>
  `).join('');
}

function handleAddCustomer(e) {
  e.preventDefault();
  
  const newCust = {
    id: Utils.generateId('C'),
    name: document.getElementById('c-name').value,
    email: document.getElementById('c-email').value,
    phone: document.getElementById('c-phone').value,
    totalPurchases: 0,
    lastOrder: '',
    status: 'Active'
  };
  
  const db = Storage.getDb();
  db.customers.push(newCust);
  Storage.saveDb(db);
  
  allCustomers = Storage.getCustomers();
  renderCustomersTable(allCustomers);
  
  document.getElementById('add-customer-modal').classList.remove('active');
  document.getElementById('add-customer-form').reset();
  
  Utils.showToast('Success', 'Customer added successfully', 'success');
}

function viewCustomer(id) {
  Utils.showToast('Info', 'Customer profile view is under development.', 'warning');
}
