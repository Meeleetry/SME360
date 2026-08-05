import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  initialCustomers,
  initialTransactions,
  initialProducts,
  initialInvoices,
  initialEmployees,
  initialComplianceItems,
  initialFunding,
  initialMarketplace,
} from './src/data/initialData.js';
import { Customer, Transaction, Product, Invoice, Employee, ComplianceItem, FundingOpportunity } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Persistence Engine initialized with rich sample data
let customersStore: Customer[] = [...initialCustomers];
let transactionsStore: Transaction[] = [...initialTransactions];
let productsStore: Product[] = [...initialProducts];
let invoicesStore: Invoice[] = [...initialInvoices];
let employeesStore: Employee[] = [...initialEmployees];
let complianceStore: ComplianceItem[] = [...initialComplianceItems];
let fundingStore: FundingOpportunity[] = [...initialFunding];

// Initialize Gemini Client lazily or safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Demo user login verification
  const demoUser = {
    id: 'user-demo-1',
    email: email.toLowerCase(),
    name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()) || 'Alex Rivera',
    companyName: 'Apex SME Innovations Ltd',
    role: 'admin' as const,
    currency: 'USD',
  };

  const fakeJwtToken = `sme360_jwt_${Date.now()}_${Buffer.from(email).toString('base64')}`;

  return res.json({
    user: demoUser,
    token: fakeJwtToken,
    message: 'Authentication successful',
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, companyName, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    name,
    companyName: companyName || `${name}'s Company`,
    role: 'admin' as const,
    currency: 'USD',
  };

  const token = `sme360_jwt_${Date.now()}_${Buffer.from(email).toString('base64')}`;

  return res.json({
    user: newUser,
    token,
    message: 'Registration successful',
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  return res.json({
    user: {
      id: 'user-demo-1',
      email: 'alex.rivera@sme360.ai',
      name: 'Alex Rivera',
      companyName: 'Apex SME Innovations Ltd',
      role: 'admin',
      currency: 'USD',
    },
  });
});

// ==========================================
// DASHBOARD SUMMARY ROUTE
// ==========================================
app.get('/api/dashboard/summary', (req, res) => {
  const revenue = transactionsStore
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactionsStore
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = revenue - expenses;
  const customerCount = customersStore.length;
  const inventoryCount = productsStore.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockCount = productsStore.filter((p) => p.stock <= p.reorderPoint).length;

  const salesTrend = [
    { month: 'Jan', sales: 24000, expenses: 14000, profit: 10000 },
    { month: 'Feb', sales: 28500, expenses: 16200, profit: 12300 },
    { month: 'Mar', sales: 32000, expenses: 18000, profit: 14000 },
    { month: 'Apr', sales: 29000, expenses: 15500, profit: 13500 },
    { month: 'May', sales: 36500, expenses: 19800, profit: 16700 },
    { month: 'Jun', sales: 41000, expenses: 21000, profit: 20000 },
    { month: 'Jul', sales: 44200, expenses: 22400, profit: 21800 },
    { month: 'Aug', sales: revenue || 48000, expenses: expenses || 23500, profit: netProfit || 24500 },
  ];

  return res.json({
    revenue,
    expenses,
    netProfit,
    customerCount,
    inventoryCount,
    lowStockCount,
    recentInvoices: invoicesStore.slice(0, 5),
    recentCustomers: customersStore.slice(0, 5),
    salesTrend,
  });
});

// ==========================================
// CRM MODULE ROUTES
// ==========================================
app.get('/api/crm/customers', (req, res) => {
  res.json(customersStore);
});

app.post('/api/crm/customers', (req, res) => {
  const { name, company, email, phone, status } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Customer name and email are required' });
  }

  const newCustomer: Customer = {
    id: `cust-${Date.now()}`,
    name,
    company: company || 'Independent',
    email,
    phone: phone || '+1 (555) 000-0000',
    status: status || 'Lead',
    totalSpent: 0,
    lastOrderDate: 'N/A',
    createdAt: new Date().toISOString().split('T')[0],
  };

  customersStore.unshift(newCustomer);
  res.status(201).json(newCustomer);
});

app.put('/api/crm/customers/:id', (req, res) => {
  const { id } = req.params;
  const index = customersStore.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  customersStore[index] = { ...customersStore[index], ...req.body };
  res.json(customersStore[index]);
});

app.delete('/api/crm/customers/:id', (req, res) => {
  const { id } = req.params;
  customersStore = customersStore.filter((c) => c.id !== id);
  res.json({ message: 'Customer deleted successfully' });
});

// ==========================================
// ACCOUNTING ROUTES
// ==========================================
app.get('/api/accounting/transactions', (req, res) => {
  res.json(transactionsStore);
});

app.post('/api/accounting/transactions', (req, res) => {
  const { type, amount, category, description, reference } = req.body;
  if (!amount || !category) {
    return res.status(400).json({ error: 'Amount and category are required' });
  }

  const newTx: Transaction = {
    id: `tx-${Date.now()}`,
    type: type || 'expense',
    amount: Number(amount),
    category,
    date: new Date().toISOString().split('T')[0],
    description: description || '',
    reference: reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Completed',
  };

  transactionsStore.unshift(newTx);
  res.status(201).json(newTx);
});

app.delete('/api/accounting/transactions/:id', (req, res) => {
  const { id } = req.params;
  transactionsStore = transactionsStore.filter((t) => t.id !== id);
  res.json({ message: 'Transaction deleted successfully' });
});

// ==========================================
// INVENTORY ROUTES
// ==========================================
app.get('/api/inventory/products', (req, res) => {
  res.json(productsStore);
});

app.post('/api/inventory/products', (req, res) => {
  const { sku, name, category, price, cost, stock, reorderPoint, unit } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const newProd: Product = {
    id: `prod-${Date.now()}`,
    sku: sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
    name,
    category: category || 'General',
    price: Number(price),
    cost: Number(cost || price * 0.6),
    stock: Number(stock || 0),
    reorderPoint: Number(reorderPoint || 10),
    unit: unit || 'pcs',
  };

  productsStore.unshift(newProd);
  res.status(201).json(newProd);
});

app.put('/api/inventory/products/:id', (req, res) => {
  const { id } = req.params;
  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  productsStore[index] = { ...productsStore[index], ...req.body };
  res.json(productsStore[index]);
});

app.delete('/api/inventory/products/:id', (req, res) => {
  const { id } = req.params;
  productsStore = productsStore.filter((p) => p.id !== id);
  res.json({ message: 'Product deleted successfully' });
});

// ==========================================
// INVOICING ROUTES
// ==========================================
app.get('/api/invoices', (req, res) => {
  res.json(invoicesStore);
});

app.post('/api/invoices', (req, res) => {
  const { customerName, customerEmail, dueDate, items, notes } = req.body;
  if (!customerName || !items || !items.length) {
    return res.status(400).json({ error: 'Customer details and items are required' });
  }

  const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);
  const tax = subtotal * 0.05; // 5% default tax
  const total = subtotal + tax;

  const newInvoice: Invoice = {
    id: `inv-${Date.now()}`,
    invoiceNumber: `INV-2026-${String(invoicesStore.length + 1).padStart(3, '0')}`,
    customerId: `cust-${Date.now()}`,
    customerName,
    customerEmail: customerEmail || 'billing@client.com',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    items,
    subtotal,
    tax,
    total,
    status: 'pending',
    notes: notes || 'Thank you for your business.',
  };

  invoicesStore.unshift(newInvoice);
  res.status(201).json(newInvoice);
});

app.put('/api/invoices/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const invoice = invoicesStore.find((i) => i.id === id);
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  invoice.status = status;
  res.json(invoice);
});

// ==========================================
// PAYROLL ROUTES
// ==========================================
app.get('/api/payroll/employees', (req, res) => {
  res.json(employeesStore);
});

app.post('/api/payroll/employees', (req, res) => {
  const { name, email, role, department, salary } = req.body;
  if (!name || !salary) {
    return res.status(400).json({ error: 'Employee name and salary are required' });
  }

  const sal = Number(salary);
  const tax = sal * 0.15;

  const newEmp: Employee = {
    id: `emp-${Date.now()}`,
    name,
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@sme360.ai`,
    role: role || 'Staff Member',
    department: department || 'General',
    salary: sal,
    taxDeductions: tax,
    netPay: sal - tax,
    paymentStatus: 'Pending',
    joinDate: new Date().toISOString().split('T')[0],
  };

  employeesStore.unshift(newEmp);
  res.status(201).json(newEmp);
});

app.post('/api/payroll/run', (req, res) => {
  employeesStore = employeesStore.map((emp) => ({
    ...emp,
    paymentStatus: 'Paid',
  }));

  const totalDisbursed = employeesStore.reduce((acc, curr) => acc + curr.netPay, 0);

  // Record transaction in accounting
  transactionsStore.unshift({
    id: `tx-${Date.now()}`,
    type: 'expense',
    amount: totalDisbursed,
    category: 'Payroll',
    date: new Date().toISOString().split('T')[0],
    description: `Automated SME360 Payroll Run (${employeesStore.length} staff)`,
    reference: `PAY-RUN-${Date.now().toString().slice(-4)}`,
    status: 'Completed',
  });

  res.json({ message: 'Payroll run processed successfully', totalDisbursed, count: employeesStore.length });
});

// ==========================================
// COMPLIANCE, FUNDING & MARKETPLACE
// ==========================================
app.get('/api/compliance', (req, res) => {
  res.json(complianceStore);
});

app.put('/api/compliance/:id', (req, res) => {
  const { id } = req.params;
  const item = complianceStore.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  item.status = req.body.status || 'compliant';
  res.json(item);
});

app.get('/api/funding', (req, res) => {
  res.json(fundingStore);
});

app.post('/api/funding/:id/apply', (req, res) => {
  const { id } = req.params;
  const fund = fundingStore.find((f) => f.id === id);
  if (!fund) return res.status(404).json({ error: 'Funding opportunity not found' });
  fund.status = 'applied';
  res.json(fund);
});

app.get('/api/marketplace', (req, res) => {
  res.json(initialMarketplace);
});

// ==========================================
// AI ASSISTANT CHAT ROUTE (GEMINI 3.6 FLASH)
// ==========================================
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent fallback advisory if no API key is set yet
      return res.json({
        reply: `**[SME360 AI Business Advisor]**\n\nBased on your financial overview:\n- Current Revenue: **$${context?.revenue || '48,200'}**\n- Expenses: **$${context?.expenses || '22,400'}**\n- Profit Margin: **${context?.profitMargin || '53.5%'}**\n\n💡 **Key Advisor Insight:**\n1. **Cash Flow Optimization:** You have $3,360 in overdue invoices. Sending an automated payment reminder could immediately improve liquid capital by 7%.\n2. **Inventory Efficiency:** 1 item (Biometric Access Sensor) is approaching reorder threshold.\n3. **Tax Strategy:** Leverage available SME equipment depreciation deductions before Q3 closing.\n\n*(Note: Configure your \`GEMINI_API_KEY\` in Settings > Secrets for live dynamic model queries.)*`,
      });
    }

    const systemInstruction = `
You are SME360 AI, an elite AI Business Advisor and Virtual Chief Financial Officer for small and medium enterprises (SMEs).
Your goal is to provide concise, data-driven, practical advice on finance, cashflow, tax compliance, marketing, CRM, inventory, payroll, and funding opportunities.
Maintain a professional, encouraging, and structured tone using bullet points and clear key takeaways.
When analyzing data, suggest concrete, actionable steps the SME founder can take right inside SME360 AI.
`;

    const promptText = `
Business Metrics Context:
- Revenue: $${context?.revenue || 48200}
- Expenses: $${context?.expenses || 22400}
- Net Profit: $${context?.netProfit || 25800}
- Total Customers: ${context?.customerCount || 5}
- Low Stock Items: ${context?.lowStockCount || 1}

User Question: ${message}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I analyzed your request. Here are key insights for your SME growth.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini AI Chat Error:', error);
    return res.status(500).json({
      error: 'Failed to generate AI response',
      details: error?.message || 'Unexpected AI service error',
    });
  }
});

// ==========================================
// VITE / STATIC PRODUCTION HANDLER
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SME360 AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
