export type UserRole = 'admin' | 'manager' | 'accountant' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: UserRole;
  avatar?: string;
  currency: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Lead' | 'Active' | 'Inactive';
  totalSpent: number;
  lastOrderDate: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  reference: string;
  status: 'Completed' | 'Pending';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  unit: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  taxDeductions: number;
  netPay: number;
  paymentStatus: 'Paid' | 'Pending' | 'Processing';
  joinDate: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  category: 'Tax' | 'ESG' | 'Labor' | 'Audit' | 'Corporate';
  dueDate: string;
  status: 'compliant' | 'pending' | 'action_required' | 'overdue';
  authority: string;
  description: string;
}

export interface FundingOpportunity {
  id: string;
  title: string;
  type: 'Grant' | 'Loan' | 'Equity';
  provider: string;
  maxAmount: number;
  interestRate?: string;
  matchScore: number;
  deadline: string;
  status: 'available' | 'applied' | 'under_review' | 'approved';
  description: string;
}

export interface MarketplaceVendor {
  id: string;
  title: string;
  category: 'Legal' | 'Marketing' | 'Logistics' | 'Cloud & IT' | 'Finance';
  vendor: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  description: string;
  badge?: string;
}

export interface DashboardSummary {
  revenue: number;
  expenses: number;
  netProfit: number;
  customerCount: number;
  inventoryCount: number;
  lowStockCount: number;
  recentInvoices: Invoice[];
  recentCustomers: Customer[];
  salesTrend: Array<{ month: string; sales: number; expenses: number; profit: number }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  promptType?: string;
}
