import {
  AuthState,
  Customer,
  Transaction,
  Product,
  Invoice,
  Employee,
  ComplianceItem,
  FundingOpportunity,
  MarketplaceVendor,
  DashboardSummary,
} from '../types';

const API_BASE = '/api';

export const api = {
  // Auth
  async login(email: string, password: string): Promise<AuthState> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid email or password');
    const data = await res.json();
    return {
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    };
  },

  async register(name: string, email: string, companyName: string, password: string): Promise<AuthState> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, companyName, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    return {
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    };
  },

  // Dashboard
  async getDashboardSummary(): Promise<DashboardSummary> {
    const res = await fetch(`${API_BASE}/dashboard/summary`);
    if (!res.ok) throw new Error('Failed to fetch dashboard summary');
    return res.json();
  },

  // CRM
  async getCustomers(): Promise<Customer[]> {
    const res = await fetch(`${API_BASE}/crm/customers`);
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },

  async addCustomer(customer: Partial<Customer>): Promise<Customer> {
    const res = await fetch(`${API_BASE}/crm/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!res.ok) throw new Error('Failed to add customer');
    return res.json();
  },

  async deleteCustomer(id: string): Promise<void> {
    await fetch(`${API_BASE}/crm/customers/${id}`, { method: 'DELETE' });
  },

  // Accounting
  async getTransactions(): Promise<Transaction[]> {
    const res = await fetch(`${API_BASE}/accounting/transactions`);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  },

  async addTransaction(tx: Partial<Transaction>): Promise<Transaction> {
    const res = await fetch(`${API_BASE}/accounting/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    });
    if (!res.ok) throw new Error('Failed to add transaction');
    return res.json();
  },

  async deleteTransaction(id: string): Promise<void> {
    await fetch(`${API_BASE}/accounting/transactions/${id}`, { method: 'DELETE' });
  },

  // Inventory
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/inventory/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async addProduct(product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/inventory/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to add product');
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/inventory/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${API_BASE}/inventory/products/${id}`, { method: 'DELETE' });
  },

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    const res = await fetch(`${API_BASE}/invoices`);
    if (!res.ok) throw new Error('Failed to fetch invoices');
    return res.json();
  },

  async createInvoice(invoice: Partial<Invoice>): Promise<Invoice> {
    const res = await fetch(`${API_BASE}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });
    if (!res.ok) throw new Error('Failed to create invoice');
    return res.json();
  },

  async updateInvoiceStatus(id: string, status: Invoice['status']): Promise<Invoice> {
    const res = await fetch(`${API_BASE}/invoices/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update invoice status');
    return res.json();
  },

  // Payroll
  async getEmployees(): Promise<Employee[]> {
    const res = await fetch(`${API_BASE}/payroll/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  async addEmployee(emp: Partial<Employee>): Promise<Employee> {
    const res = await fetch(`${API_BASE}/payroll/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emp),
    });
    if (!res.ok) throw new Error('Failed to add employee');
    return res.json();
  },

  async runPayroll(): Promise<{ message: string; totalDisbursed: number }> {
    const res = await fetch(`${API_BASE}/payroll/run`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to execute payroll run');
    return res.json();
  },

  // Compliance
  async getComplianceItems(): Promise<ComplianceItem[]> {
    const res = await fetch(`${API_BASE}/compliance`);
    if (!res.ok) throw new Error('Failed to fetch compliance items');
    return res.json();
  },

  async updateComplianceStatus(id: string, status: string): Promise<ComplianceItem> {
    const res = await fetch(`${API_BASE}/compliance/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update compliance status');
    return res.json();
  },

  // Funding
  async getFundingOpportunities(): Promise<FundingOpportunity[]> {
    const res = await fetch(`${API_BASE}/funding`);
    if (!res.ok) throw new Error('Failed to fetch funding opportunities');
    return res.json();
  },

  async applyForFunding(id: string): Promise<FundingOpportunity> {
    const res = await fetch(`${API_BASE}/funding/${id}/apply`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to apply for funding');
    return res.json();
  },

  // Marketplace
  async getMarketplaceVendors(): Promise<MarketplaceVendor[]> {
    const res = await fetch(`${API_BASE}/marketplace`);
    if (!res.ok) throw new Error('Failed to fetch marketplace vendors');
    return res.json();
  },

  // AI Chat (Gemini)
  async askAIAssistant(message: string, context?: any): Promise<string> {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });
    if (!res.ok) throw new Error('Failed to get AI response');
    const data = await res.json();
    return data.reply;
  },
};
