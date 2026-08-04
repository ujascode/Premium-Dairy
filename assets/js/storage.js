/**
 * Storage.js - Manages LocalStorage CRUD operations and Dummy Data
 */

const STORAGE_KEY = "dairy_sales_db";

const defaultData = {
  settings: {
    businessName: "Premium Dairy",
    currency: "₹",
    taxRate: 18,
    theme: "light",
    notifications: true,
  },
  user: {
    name: "Admin User",
    role: "Store Manager",
    email: "ujas.code@gmail.com",
    avatar:
      "https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff",
  },
  products: [
    {
      id: "P001",
      name: "Fresh Organic Milk (1L)",
      category: "Milk",
      price: 65,
      cost: 45,
      stock: 150,
      status: "In Stock",
      sku: "MILK-001",
      added: "2026-07-01",
    },
    {
      id: "P002",
      name: "Premium Butter (500g)",
      category: "Butter",
      price: 250,
      cost: 180,
      stock: 45,
      status: "Low Stock",
      sku: "BUTT-001",
      added: "2026-07-05",
    },
    {
      id: "P003",
      name: "Greek Yogurt (400g)",
      category: "Yogurt",
      price: 85,
      cost: 55,
      stock: 200,
      status: "In Stock",
      sku: "YOG-001",
      added: "2026-07-10",
    },
    {
      id: "P004",
      name: "Aged Cheddar Cheese (200g)",
      category: "Cheese",
      price: 450,
      cost: 300,
      stock: 12,
      status: "Low Stock",
      sku: "CHZ-001",
      added: "2026-07-12",
    },
    {
      id: "P005",
      name: "Chocolate Milk (250ml)",
      category: "Milk",
      price: 40,
      cost: 25,
      stock: 0,
      status: "Out of Stock",
      sku: "MILK-002",
      added: "2026-07-15",
    },
    {
      id: "P006",
      name: "Paneer (200g)",
      category: "Cheese",
      price: 90,
      cost: 60,
      stock: 85,
      status: "In Stock",
      sku: "PNR-001",
      added: "2026-07-20",
    },
    {
      id: "P007",
      name: "Heavy Cream (1L)",
      category: "Cream",
      price: 320,
      cost: 240,
      stock: 30,
      status: "In Stock",
      sku: "CRM-001",
      added: "2026-07-22",
    },
    {
      id: "P008",
      name: "Cow Ghee (1L)",
      category: "Butter",
      price: 650,
      cost: 480,
      stock: 55,
      status: "In Stock",
      sku: "GHEE-001",
      added: "2026-07-25",
    },
  ],
  categories: ["Milk", "Butter", "Cheese", "Yogurt", "Cream", "Ice Cream"],
  customers: [
    {
      id: "C001",
      name: "Ujas Patel",
      email: "ujas@gmail.com",
      phone: "+91 98765 43210",
      totalPurchases: 15400,
      lastOrder: "2026-07-28",
      status: "Active",
    },
    {
      id: "C002",
      name: "Raj Desai",
      email: "raj@example.com",
      phone: "+91 87654 32109",
      totalPurchases: 8900,
      lastOrder: "2026-07-25",
      status: "Active",
    },
    {
      id: "C003",
      name: "Subh Patel",
      email: "subh@example.com",
      phone: "+91 76543 21098",
      totalPurchases: 45200,
      lastOrder: "2026-07-27",
      status: "Active",
    },
    {
      id: "C004",
      name: "Bakers Delight",
      email: "supply@bakers.com",
      phone: "+91 65432 10987",
      totalPurchases: 125000,
      lastOrder: "2026-07-28",
      status: "Active",
    },
  ],
  sales: [
    {
      id: "INV-1001",
      customerId: "C001",
      customerName: "Ujas Patel",
      date: "2026-07-28T10:30:00Z",
      items: [{ productId: "P001", qty: 2, price: 65 }],
      subtotal: 130,
      tax: 23.4,
      total: 153.4,
      status: "Paid",
      paymentMethod: "Card",
    },
    {
      id: "INV-1002",
      customerId: "C003",
      customerName: "Raj Desai",
      date: "2026-07-28T11:15:00Z",
      items: [{ productId: "P007", qty: 5, price: 320 }],
      subtotal: 1600,
      tax: 288,
      total: 1888,
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-1003",
      customerId: "C002",
      customerName: "Subh Patel",
      date: "2026-07-28T14:20:00Z",
      items: [{ productId: "P004", qty: 1, price: 450 }],
      subtotal: 450,
      tax: 81,
      total: 531,
      status: "Pending",
      paymentMethod: "Cash",
    },
    {
      id: "INV-1004",
      customerId: "C004",
      customerName: "Bakers Delight",
      date: "2026-07-27T09:00:00Z",
      items: [{ productId: "P002", qty: 10, price: 250 }],
      subtotal: 2500,
      tax: 450,
      total: 2950,
      status: "Paid",
      paymentMethod: "Card",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Aged Cheddar Cheese is running low.",
      type: "warning",
      read: false,
      time: "2h ago",
    },
    {
      id: 2,
      title: "New Big Order",
      message: "Bakers Delight placed an order for ₹2950.",
      type: "success",
      read: false,
      time: "5h ago",
    },
  ],
};

const Storage = {
  init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  },

  getDb() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  },

  saveDb(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Specific getters
  getSettings: () => Storage.getDb().settings,
  getUser: () => Storage.getDb().user,
  getProducts: () => Storage.getDb().products,
  getCategories: () => Storage.getDb().categories,
  getCustomers: () => Storage.getDb().customers,
  getSales: () => Storage.getDb().sales,
  getNotifications: () => Storage.getDb().notifications,

  // Specific setters
  updateSettings(settings) {
    const db = this.getDb();
    db.settings = { ...db.settings, ...settings };
    this.saveDb(db);
  },

  updateUser(user) {
    const db = this.getDb();
    db.user = { ...db.user, ...user };
    this.saveDb(db);
  },

  // CRUD operations
  addProduct(product) {
    const db = this.getDb();
    product.id = "P" + String(db.products.length + 1).padStart(3, "0");
    product.added = new Date().toISOString().split("T")[0];
    db.products.push(product);
    this.saveDb(db);
    return product;
  },

  updateProduct(id, updates) {
    const db = this.getDb();
    const index = db.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...updates };
      this.saveDb(db);
      return true;
    }
    return false;
  },

  deleteProduct(id) {
    const db = this.getDb();
    db.products = db.products.filter((p) => p.id !== id);
    this.saveDb(db);
  },

  addSale(sale) {
    const db = this.getDb();
    const invCount = db.sales.length + 1;
    sale.id = "INV-" + String(invCount + 1000);
    sale.date = new Date().toISOString();
    db.sales.unshift(sale); // Add to beginning

    // Deduct stock
    sale.items.forEach((item) => {
      const prodIndex = db.products.findIndex((p) => p.id === item.productId);
      if (prodIndex !== -1) {
        db.products[prodIndex].stock -= item.qty;
        if (db.products[prodIndex].stock <= 0) {
          db.products[prodIndex].stock = 0;
          db.products[prodIndex].status = "Out of Stock";
        } else if (db.products[prodIndex].stock < 20) {
          db.products[prodIndex].status = "Low Stock";
        }
      }
    });

    // Update customer total purchases
    const custIndex = db.customers.findIndex((c) => c.id === sale.customerId);
    if (custIndex !== -1) {
      db.customers[custIndex].totalPurchases += sale.total;
      db.customers[custIndex].lastOrder = sale.date.split("T")[0];
    }

    this.saveDb(db);
    return sale;
  },

  markNotificationRead(id) {
    const db = this.getDb();
    const n = db.notifications.find((n) => n.id === id);
    if (n) {
      n.read = true;
      this.saveDb(db);
    }
  },

  // Dashboard Analytics Helper
  getDashboardStats() {
    const db = this.getDb();
    const today = new Date().toISOString().split("T")[0];

    const todaySales = db.sales.filter((s) => s.date.startsWith(today));
    const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);

    const totalOrders = db.sales.length;
    const totalRevenue = db.sales.reduce((sum, s) => sum + s.total, 0);

    return {
      todayRevenue,
      todayOrders: todaySales.length,
      totalOrders,
      totalRevenue,
      activeCustomers: db.customers.length,
      lowStockCount: db.products.filter((p) => p.stock < 20 && p.stock > 0)
        .length,
      outOfStockCount: db.products.filter((p) => p.stock === 0).length,
    };
  },
};

// Auto init on load
Storage.init();
