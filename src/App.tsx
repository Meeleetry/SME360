import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AuthPages } from './pages/AuthPages';
import { DashboardView } from './pages/DashboardView';
import { AIAssistantView } from './pages/AIAssistantView';
import { CRMView } from './pages/CRMView';
import { AccountingView } from './pages/AccountingView';
import { InventoryView } from './pages/InventoryView';
import { InvoicesView } from './pages/InvoicesView';
import { PayrollView } from './pages/PayrollView';
import { ComplianceView } from './pages/ComplianceView';
import { FundingView } from './pages/FundingView';
import { MarketplaceView } from './pages/MarketplaceView';
import { SettingsView } from './pages/SettingsView';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import {
  AddCustomerModal,
  AddTransactionModal,
  AddInvoiceModal,
  AddProductModal,
} from './components/Modals';

import {
  initialCustomers,
  initialTransactions,
  initialProducts,
  initialInvoices,
  initialEmployees,
  initialComplianceItems,
  initialFunding as initialFundingOpportunities,
  initialMarketplace as initialVendors,
} from './data/initialData';

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
} from './types';

export const App: React.FC = () => {
  // Navigation / Auth Mode State
  const [viewState, setViewState] = useState<'landing' | 'auth' | 'app'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [auth, setAuth] = useState<AuthState | null>(null);

  // App Layout State
  const [currentModule, setCurrentModule] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Modals
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Operational Data State
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(initialComplianceItems);
  const [fundingOpportunities, setFundingOpportunities] = useState<FundingOpportunity[]>(initialFundingOpportunities);
  const [vendors] = useState<MarketplaceVendor[]>(initialVendors);

  // Sync Dark Mode class with <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Login / Registration Success
  const handleAuthSuccess = (newAuth: AuthState) => {
    setAuth(newAuth);
    setViewState('app');
    setCurrentModule('dashboard');
  };

  const handleLogout = () => {
    setAuth(null);
    setViewState('landing');
  };

  // Calculations for Dashboard Summary
  const revenueTotal = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesTotal = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfitTotal = revenueTotal - expensesTotal;
  const lowStockCount = products.filter((p) => p.stock <= p.reorderPoint).length;

  const dashboardSummary = {
    revenue: revenueTotal,
    expenses: expensesTotal,
    netProfit: netProfitTotal,
    customerCount: customers.length,
    inventoryCount: products.reduce((sum, p) => sum + p.stock, 0),
    lowStockCount,
    recentInvoices: invoices.slice(0, 5),
    recentCustomers: customers.slice(0, 5),
    salesTrend: [
      { month: 'Jan', sales: 24000, expenses: 14000, profit: 10000 },
      { month: 'Feb', sales: 28500, expenses: 16200, profit: 12300 },
      { month: 'Mar', sales: 32000, expenses: 18000, profit: 14000 },
      { month: 'Apr', sales: 29000, expenses: 15500, profit: 13500 },
      { month: 'May', sales: 36500, expenses: 19800, profit: 16700 },
      { month: 'Jun', sales: 41000, expenses: 21000, profit: 20000 },
      { month: 'Jul', sales: 44200, expenses: 22400, profit: 21800 },
      { month: 'Aug', sales: revenueTotal, expenses: expensesTotal, profit: netProfitTotal },
    ],
  };

  // Handler functions for adding/deleting data
  const handleAddCustomer = (custData: Partial<Customer>) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: custData.name || 'New Client',
      company: custData.company || 'Enterprise Corp',
      email: custData.email || 'client@corp.com',
      phone: custData.phone || '+1 555-0000',
      status: custData.status || 'Active',
      totalSpent: custData.totalSpent || 0,
      lastOrderDate: 'Just now',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddTransaction = (txData: Partial<Transaction>) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      description: txData.description || 'Transaction',
      amount: txData.amount || 100,
      type: txData.type || 'expense',
      category: txData.category || 'General',
      date: txData.date || new Date().toISOString().split('T')[0],
      reference: txData.reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddInvoice = (invData: any) => {
    const cust = customers.find((c) => c.name === invData.customerName);
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-00${invoices.length + 1}`,
      customerId: cust?.id || 'cust-1',
      customerName: invData.customerName,
      customerEmail: invData.customerEmail,
      issueDate: invData.issueDate,
      dueDate: invData.dueDate,
      items: invData.items,
      subtotal: invData.subtotal,
      tax: invData.tax,
      total: invData.total,
      status: invData.status,
    };
    setInvoices((prev) => [newInv, ...prev]);

    // Record as Income in Accounting
    handleAddTransaction({
      description: `Invoice Payment: ${newInv.invoiceNumber}`,
      amount: newInv.total,
      type: 'income',
      category: 'Consulting Revenue',
      reference: newInv.invoiceNumber,
    });
  };

  const handleUpdateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
  };

  const handleAddProduct = (prodData: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sku: prodData.sku || 'SKU-NEW',
      name: prodData.name || 'New Product',
      category: prodData.category || 'Hardware',
      price: prodData.price || 100,
      cost: prodData.cost || 50,
      stock: prodData.stock || 10,
      unit: prodData.unit || 'units',
      reorderPoint: prodData.reorderPoint || 5,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRunPayroll = () => {
    const totalPayroll = employees.reduce((sum, e) => sum + e.netPay, 0);
    handleAddTransaction({
      description: `Monthly Staff Payroll Disbursement (${employees.length} employees)`,
      amount: totalPayroll,
      type: 'expense',
      category: 'Operating Expense',
      reference: `PAYROLL-${new Date().getMonth() + 1}-2026`,
    });

    setEmployees((prev) => prev.map((e) => ({ ...e, paymentStatus: 'Paid' })));
  };

  const handleUpdateComplianceStatus = (id: string, status: string) => {
    setComplianceItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: status as any } : item))
    );
  };

  const handleApplyFunding = (id: string) => {
    setFundingOpportunities((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'applied' } : f))
    );
  };

  // Render Views
  if (viewState === 'landing') {
    return (
      <LandingPage
        onLogin={() => {
          setAuthMode('login');
          setViewState('auth');
        }}
        onRegister={() => {
          setAuthMode('register');
          setViewState('auth');
        }}
        onDemoLogin={() => {
          handleAuthSuccess({
            token: 'demo-jwt-token-sme360',
            isAuthenticated: true,
            user: {
              id: 'usr-1',
              name: 'Alex Rivera',
              email: 'alex.rivera@sme360.ai',
              companyName: 'Apex SME Innovations',
              role: 'admin',
              currency: 'USD ($)',
            },
          });
        }}
      />
    );
  }

  if (viewState === 'auth') {
    return (
      <AuthPages
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
        onBackToLanding={() => setViewState('landing')}
      />
    );
  }

  const currentModuleNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    'ai-assistant': 'AI Business Advisor',
    accounting: 'Accounting',
    crm: 'CRM',
    inventory: 'Inventory',
    invoices: 'Invoicing',
    payroll: 'Payroll',
    compliance: 'Compliance',
    funding: 'Funding & Grants',
    marketplace: 'Marketplace',
    profile: 'Company Profile',
    settings: 'Settings',
  };

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        currentModule={currentModule}
        setCurrentModule={setCurrentModule}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 lg:pl-64">
        <Header
          user={auth?.user || null}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setMobileOpen={setIsSidebarOpen}
          setCurrentModule={setCurrentModule}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={handleLogout}
          currentModuleName={currentModuleNameMap[currentModule] || 'Overview'}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {currentModule === 'dashboard' && (
            <DashboardView
              summary={dashboardSummary}
              setCurrentModule={setCurrentModule}
              onOpenNewInvoiceModal={() => setIsInvoiceModalOpen(true)}
              onOpenNewCustomerModal={() => setIsCustomerModalOpen(true)}
              onOpenNewExpenseModal={() => setIsTransactionModalOpen(true)}
            />
          )}

          {currentModule === 'ai-assistant' && (
            <AIAssistantView summary={dashboardSummary} />
          )}

          {currentModule === 'crm' && (
            <CRMView
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              onOpenModal={() => setIsCustomerModalOpen(true)}
            />
          )}

          {currentModule === 'accounting' && (
            <AccountingView
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onOpenModal={() => setIsTransactionModalOpen(true)}
            />
          )}

          {currentModule === 'inventory' && (
            <InventoryView
              products={products}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onOpenModal={() => setIsProductModalOpen(true)}
            />
          )}

          {currentModule === 'invoices' && (
            <InvoicesView
              invoices={invoices}
              onUpdateStatus={handleUpdateInvoiceStatus}
              onOpenModal={() => setIsInvoiceModalOpen(true)}
            />
          )}

          {currentModule === 'payroll' && (
            <PayrollView
              employees={employees}
              onRunPayroll={handleRunPayroll}
              onOpenModal={() => setIsCustomerModalOpen(true)}
            />
          )}

          {currentModule === 'compliance' && (
            <ComplianceView
              items={complianceItems}
              onUpdateStatus={handleUpdateComplianceStatus}
            />
          )}

          {currentModule === 'funding' && (
            <FundingView
              opportunities={fundingOpportunities}
              onApply={handleApplyFunding}
            />
          )}

          {currentModule === 'marketplace' && (
            <MarketplaceView vendors={vendors} />
          )}

          {currentModule === 'settings' && (
            <SettingsView
              user={auth?.user || null}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
        </main>
      </div>

      {/* Global Action Modals */}
      <AddCustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <AddTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      <AddInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        customers={customers}
        onAdd={handleAddInvoice}
      />

      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default App;
