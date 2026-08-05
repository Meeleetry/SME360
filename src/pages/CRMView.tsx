import React, { useState } from 'react';
import { Users, Search, Plus, Trash2, Mail, Phone, Building2, UserPlus } from 'lucide-react';
import { Customer } from '../types';

interface CRMViewProps {
  customers: Customer[];
  onAddCustomer: (customer: Partial<Customer>) => void;
  onDeleteCustomer: (id: string) => void;
  onOpenModal: () => void;
}

export const CRMView: React.FC<CRMViewProps> = ({
  customers,
  onDeleteCustomer,
  onOpenModal,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Lead' | 'Inactive'>('All');

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalSpentAll = customers.reduce((acc, curr) => acc + curr.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            CRM & Client Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track leads, client order histories, and enterprise deal stages.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* CRM Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pipeline LTV</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">${totalSpentAll.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-500 font-bold">Across {customers.length} Accounts</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Retainers</span>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {customers.filter((c) => c.status === 'Active').length} Clients
          </p>
          <span className="text-[10px] text-slate-400">Generating monthly recurring revenue</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">New Leads This Month</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">
            {customers.filter((c) => c.status === 'Lead').length} Leads
          </p>
          <span className="text-[10px] text-slate-400">Ready for follow-up</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Active', 'Lead', 'Inactive'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Company</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{cust.name}</td>
                  <td className="p-4 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cust.company}</span>
                  </td>
                  <td className="p-4 space-y-0.5">
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{cust.email}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{cust.phone}</span>
                    </p>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">${cust.totalSpent.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        cust.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : cust.status === 'Lead'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onDeleteCustomer(cust.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
