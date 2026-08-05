import React, { useState } from 'react';
import { X, Plus, User, FileText, Wallet, Package, UserCheck } from 'lucide-react';
import { Customer, Transaction, Product, Employee, InvoiceItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* --- ADD CUSTOMER MODAL --- */
interface AddCustomerModalProps extends ModalProps {
  onAdd: (customer: Partial<Customer>) => void;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: name || 'New Client',
      company: company || 'Enterprise Corp',
      email: email || 'contact@client.com',
      phone: phone || '+1 (555) 019-2831',
      status: 'Active',
      totalSpent: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900 dark:text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Add New CRM Customer</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium mb-1">Contact Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Lumina Tech Global"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@luminatech.com"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- ADD TRANSACTION MODAL --- */
interface AddTransactionModalProps extends ModalProps {
  onAdd: (tx: Partial<Transaction>) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Operating Expense');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      description: description || 'Miscellaneous Expense',
      amount: parseFloat(amount) || 250,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
      reference: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900 dark:text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Record Financial Transaction</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium mb-1">Transaction Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-2 rounded-xl font-bold uppercase transition-all ${
                  type === 'income' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                + Income
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-2 rounded-xl font-bold uppercase transition-all ${
                  type === 'expense' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                - Expense
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. AWS Cloud Hosting Fee"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Amount ($ USD)</label>
            <input
              type="number"
              required
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="450.00"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            >
              <option>Software & SaaS</option>
              <option>Operating Expense</option>
              <option>Consulting Revenue</option>
              <option>Equipment & Supplies</option>
              <option>Marketing & Ads</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Record Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- CREATE INVOICE MODAL --- */
interface AddInvoiceModalProps extends ModalProps {
  customers: Customer[];
  onAdd: (invoice: any) => void;
}

export const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ isOpen, onClose, customers, onAdd }) => {
  const [customerName, setCustomerName] = useState(customers[0]?.name || 'Apex Client');
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Quarterly Strategic Advisory', quantity: 1, unitPrice: 2500, amount: 2500 },
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [...prev, { description: 'Additional Consulting', quantity: 1, unitPrice: 500, amount: 500 }]);
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      item.amount = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
    }
    updated[index] = item;
    setItems(updated);
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.amount, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.name === customerName);
    onAdd({
      customerName,
      customerEmail: cust?.email || 'billing@client.com',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      items,
      subtotal,
      tax,
      total,
      status: 'pending',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Generate Client Invoice</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium mb-1">Select Customer</label>
            <select
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-indigo-500 outline-none"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.company})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-slate-700 dark:text-slate-300">Invoice Items</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>

            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  className="col-span-6 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg outline-none"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                  className="col-span-2 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg outline-none"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                  className="col-span-4 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg outline-none font-bold"
                />
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl space-y-1 text-right">
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p>Tax (5%): ${tax.toLocaleString()}</p>
            <p className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
              Total Invoice: ${total.toLocaleString()}
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* --- ADD PRODUCT MODAL --- */
interface AddProductModalProps extends ModalProps {
  onAdd: (product: Partial<Product>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: name || 'Enterprise Router X',
      sku: sku || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      category,
      price: parseFloat(price) || 299,
      cost: parseFloat(cost) || 150,
      stock: parseInt(stock) || 50,
      unit: 'units',
      reorderPoint: 10,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900 dark:text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Add Product to Inventory</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart IoT Gateway Hub"
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium mb-1">SKU Code</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="SKU-808"
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none"
              >
                <option>Hardware</option>
                <option>SaaS Licenses</option>
                <option>Consulting Hours</option>
                <option>Office Gear</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-medium mb-1">Retail Price ($)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="299"
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none font-bold"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Unit Cost ($)</label>
              <input
                type="number"
                required
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="150"
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Initial Stock</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="25"
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
