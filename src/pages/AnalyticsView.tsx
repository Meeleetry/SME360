import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  PieChart as PieChartIcon,
  Users,
  Wallet,
  Package,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DashboardSummary } from '../types';

interface AnalyticsViewProps {
  summary: DashboardSummary | null;
  currentModule: string;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ summary, currentModule }) => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'ytd' | '1y'>('90d');

  const performanceData = [
    { name: 'Jan', revenue: 42000, target: 40000, margin: 48 },
    { name: 'Feb', revenue: 58000, target: 50000, margin: 52 },
    { name: 'Mar', revenue: 49000, target: 50000, margin: 49 },
    { name: 'Apr', revenue: 82000, target: 65000, margin: 58 },
    { name: 'May', revenue: 94000, target: 80000, margin: 61 },
    { name: 'Jun', revenue: 104000, target: 90000, margin: 64 },
  ];

  const categoryBreakdown = [
    { name: 'SaaS Subscriptions', value: 45, color: '#6366f1' },
    { name: 'Consulting Services', value: 30, color: '#10b981' },
    { name: 'Hardware Hardware SKUs', value: 15, color: '#f59e0b' },
    { name: 'Support Contracts', value: 10, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-500" />
              Advanced Business Analytics & KPIs
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase">
              {currentModule} View
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time business telemetry, sales conversion velocity, and financial target tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
            {(['30d', '90d', 'ytd', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Target Attainment</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">115.5%</p>
          <p className="text-xs font-medium text-emerald-600 mt-2">↑ +15.5% over Q3 goal</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Avg Deal Size</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">$12,450</p>
          <p className="text-xs font-medium text-emerald-600 mt-2">↑ +8.2% vs last quarter</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Customer Acquisition Cost</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">$342.00</p>
          <p className="text-xs font-medium text-emerald-600 mt-2">↓ -12% marketing spend efficiency</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">LTV / CAC Ratio</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">4.8x</p>
          <p className="text-xs font-medium text-indigo-600 mt-2">Healthy enterprise benchmark</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actual vs Target Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[360px] flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Revenue vs Target Performance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Comparison of forecasted targets vs actual closed revenue</p>

          <div className="flex-1 w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual Revenue" />
                <Bar dataKey="target" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Target Goal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[360px] flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Revenue Stream Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Contribution by business product line</p>

          <div className="flex-1 min-h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {categoryBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
