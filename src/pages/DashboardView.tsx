import React from 'react';
import {
  Wallet,
  TrendingUp,
  Users,
  Package,
  Plus,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  UserPlus,
  BellRing,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { DashboardSummary } from '../types';

interface DashboardViewProps {
  summary: DashboardSummary | null;
  setCurrentModule: (module: string) => void;
  onOpenNewInvoiceModal: () => void;
  onOpenNewCustomerModal: () => void;
  onOpenNewExpenseModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  setCurrentModule,
  onOpenNewInvoiceModal,
  onOpenNewCustomerModal,
  onOpenNewExpenseModal,
}) => {
  const revenue = summary?.revenue || 128430.50;
  const expenses = summary?.expenses || 42200;
  const netProfit = summary?.netProfit || revenue - expenses;
  const customerCount = summary?.customerCount || 1248;
  const inventoryCount = summary?.inventoryCount || 8422;
  const lowStockCount = summary?.lowStockCount || 12;

  const chartData = summary?.salesTrend || [
    { month: 'Jan', sales: 42000, expenses: 14000 },
    { month: 'Feb', sales: 58000, expenses: 16200 },
    { month: 'Mar', sales: 49000, expenses: 18000 },
    { month: 'Apr', sales: 82000, expenses: 15500 },
    { month: 'May', sales: 94000, expenses: 19800 },
    { month: 'Jun', sales: 104000, expenses: 21000 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Title & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time performance metrics and AI enterprise insights</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenNewInvoiceModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
          <button
            onClick={onOpenNewCustomerModal}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 px-3.5 py-2 rounded-lg text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-4 h-4 text-slate-500" />
            <span>Add Customer</span>
          </button>
          <button
            onClick={() => setCurrentModule('ai-assistant')}
            className="bg-slate-900 dark:bg-indigo-950 text-indigo-300 border border-slate-800 dark:border-indigo-800 hover:bg-slate-800 px-3.5 py-2 rounded-lg text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Report</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue"
          value={`$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="12.4% vs last month"
          isPositive={true}
          icon={Wallet}
          color="emerald"
          onClick={() => setCurrentModule('accounting')}
        />

        <MetricCard
          title="Profit Margin"
          value="32.5%"
          change="2.1% vs last month"
          isPositive={true}
          icon={TrendingUp}
          color="indigo"
          onClick={() => setCurrentModule('accounting')}
        />

        <MetricCard
          title="Active Customers"
          value={customerCount.toLocaleString()}
          change="48 new today"
          isPositive={true}
          icon={Users}
          color="blue"
          onClick={() => setCurrentModule('crm')}
        />

        <MetricCard
          title="Inventory Items"
          value={inventoryCount.toLocaleString()}
          change={`${lowStockCount} low stock alerts`}
          isPositive={false}
          icon={Package}
          color="amber"
          onClick={() => setCurrentModule('inventory')}
        />
      </div>

      {/* Main Grid: Revenue Growth Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Revenue Growth</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Historical trajectory and revenue forecasting</p>
            </div>
            <select className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 outline-none">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This Year (2026)</option>
            </select>
          </div>

          <div className="flex-1 w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[380px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <span className="text-[10px] text-slate-400 font-medium">Live Feed</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Invoice Paid</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Inv #842 - $1,240.00</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">New CRM Lead</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Sarah Jenkins - Inbound Web</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Low Stock Alert</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Wireless Keyboards (2 left)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Profile Update</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Admin changed tax settings</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">AI Optimization</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Payroll process streamlined</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Invoices & Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Invoices</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Latest customer billing activity</p>
            </div>
            <button
              onClick={() => setCurrentModule('invoices')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="pb-3">Invoice #</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {summary?.recentInvoices?.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 font-medium">{inv.customerName}</td>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">${inv.total.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          inv.status === 'paid'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                            : inv.status === 'pending'
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Customer Activity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Top clients by lifetime value</p>
            </div>
            <button
              onClick={() => setCurrentModule('crm')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {summary?.recentCustomers?.map((cust) => (
              <div
                key={cust.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {cust.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{cust.name}</p>
                    <p className="text-[10px] text-slate-500">{cust.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">${cust.totalSpent.toLocaleString()}</p>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      cust.status === 'Active'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cust.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

