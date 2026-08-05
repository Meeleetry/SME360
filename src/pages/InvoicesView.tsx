import React, { useState } from 'react';
import { FileText, Plus, Search, Eye, CheckCircle2, Clock, AlertCircle, Printer, X } from 'lucide-react';
import { Invoice } from '../types';

interface InvoicesViewProps {
  invoices: Invoice[];
  onUpdateStatus: (id: string, status: Invoice['status']) => void;
  onOpenModal: () => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  onUpdateStatus,
  onOpenModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  const filtered = invoices.filter((inv) => filter === 'all' || inv.status === filter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Invoicing & Client Billing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create professional tax invoices, line item breakdowns, and status tracking.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Invoice Status Filters:</span>
        <div className="flex items-center gap-2">
          {(['all', 'paid', 'pending', 'overdue'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                filter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {inv.invoiceNumber}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{inv.customerName}</p>
                    <p className="text-[10px] text-slate-400">{inv.customerEmail}</p>
                  </td>
                  <td className="p-4 text-slate-500">{inv.issueDate}</td>
                  <td className="p-4 text-slate-500">{inv.dueDate}</td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-white">${inv.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : inv.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setPreviewInvoice(inv)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Preview / Print Invoice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => onUpdateStatus(inv.id, 'paid')}
                        className="px-2 py-1 text-[10px] font-bold rounded bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-base">Invoice Preview - {previewInvoice.invoiceNumber}</span>
              </div>
              <button onClick={() => setPreviewInvoice(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Invoice Header */}
            <div className="flex justify-between items-start text-xs">
              <div>
                <p className="font-extrabold text-lg text-indigo-600 dark:text-indigo-400">SME360 AI Enterprise</p>
                <p className="text-slate-500">Global Financial Operations Hub</p>
                <p className="text-slate-500">support@sme360.ai | +1 (800) 555-3600</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-sm">{previewInvoice.invoiceNumber}</p>
                <p className="text-slate-500">Issue Date: {previewInvoice.issueDate}</p>
                <p className="text-slate-500">Due Date: {previewInvoice.dueDate}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bill To:</span>
              <p className="font-bold text-sm mt-0.5">{previewInvoice.customerName}</p>
              <p className="text-slate-500">{previewInvoice.customerEmail}</p>
            </div>

            {/* Items Table */}
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="p-2">Description</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Unit Price</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {previewInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-medium">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.unitPrice.toLocaleString()}</td>
                    <td className="p-2 text-right font-bold">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="text-right space-y-1 text-xs border-t border-slate-200 dark:border-slate-800 pt-4">
              <p className="text-slate-500">Subtotal: ${previewInvoice.subtotal.toLocaleString()}</p>
              <p className="text-slate-500">Tax (5%): ${previewInvoice.tax.toLocaleString()}</p>
              <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                Total Due: ${previewInvoice.total.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
