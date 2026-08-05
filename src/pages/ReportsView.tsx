import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Share2,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';
import { DashboardSummary } from '../types';

interface ReportsViewProps {
  summary: DashboardSummary | null;
  currentModule: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ summary, currentModule }) => {
  const [reportType, setReportType] = useState<'pnl' | 'tax' | 'receivables' | 'inventory'>('pnl');
  const [dateRange, setDateRange] = useState('Q3 2026');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportTitleMap = {
    pnl: 'Comprehensive P&L & Financial Statement',
    tax: 'Federal & State Tax Compliance Audit Trail',
    receivables: 'Customer Receivables & Outstanding Aging Report',
    inventory: 'SKU Inventory Valuation & Stock Turnover Analysis',
  };

  const handleDownloadReport = () => {
    const reportData = {
      title: reportTitleMap[reportType],
      generatedAt: new Date().toISOString(),
      period: dateRange,
      module: currentModule,
      metrics: {
        totalRevenue: summary?.revenue || 128430.50,
        totalExpenses: summary?.expenses || 42200,
        netProfit: summary?.netProfit || 86230.50,
        customerCount: summary?.customerCount || 1248,
        inventorySKUs: summary?.inventoryCount || 8422,
      },
      auditHash: `AUDIT-SME360-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SME360_${reportType.toUpperCase()}_Report_${dateRange.replace(/\s+/g, '_')}.json`;
    a.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Executive Audit & Financial Reports
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
              Official Records
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate, preview, and download compliance-ready financial statements, P&L audits, and tax reports.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Official Report</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Official SME360 audit file exported successfully to your downloads!</span>
        </div>
      )}

      {/* Report Configuration & Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Type Selectors */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Report Format</p>

            {[
              { id: 'pnl', label: 'P&L Statement', icon: FileSpreadsheet },
              { id: 'tax', label: 'Tax Audit Trail', icon: FileText },
              { id: 'receivables', label: 'Customer Aging', icon: Clock },
              { id: 'inventory', label: 'Stock Valuation', icon: Calendar },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = reportType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setReportType(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reporting Period</p>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border-0 outline-none font-medium"
            >
              <option>Q3 2026 (Current Quarter)</option>
              <option>Q2 2026</option>
              <option>Full Year 2025</option>
              <option>Year to Date (YTD 2026)</option>
            </select>
          </div>
        </div>

        {/* Right 3 Cols: Report Live Preview Paper Document */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {dateRange}
                </span>
                <span className="text-xs text-slate-400">Generated on {new Date().toLocaleDateString()}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {reportTitleMap[reportType]}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadReport}
                className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                title="Print / Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Report Summary Numbers Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Statement Ledger Summary</h3>

            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Financial Category</th>
                    <th className="p-3">Audit Reference</th>
                    <th className="p-3">Recorded Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-medium">Gross Commercial Inflow</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">REF-REV-2026-Q3</td>
                    <td className="p-3 font-bold text-emerald-600">${(summary?.revenue || 128430.50).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-bold">Verified</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Operating Expenses & Vendor Cost</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">REF-EXP-2026-Q3</td>
                    <td className="p-3 font-bold text-rose-600">${(summary?.expenses || 42200).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-bold">Audited</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Payroll Disbursements</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">REF-PAY-2026-Q3</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">$38,500.00</td>
                    <td className="p-3"><span className="px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-bold">Processed</span></td>
                  </tr>
                  <tr className="bg-indigo-50/50 dark:bg-indigo-950/30 font-bold">
                    <td className="p-3 text-indigo-900 dark:text-indigo-200">Net Operating Surplus</td>
                    <td className="p-3 font-mono text-[11px] text-indigo-700 dark:text-indigo-400">NET-ACC-2026</td>
                    <td className="p-3 text-indigo-600 dark:text-indigo-400">${(summary?.netProfit || 86230.50).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 text-[10px] bg-indigo-600 text-white rounded font-bold">Finalized</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
            <span>Official SME360 AI Enterprise Document</span>
            <span className="font-mono">Verification Key: SME360-SEC-99482-OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
