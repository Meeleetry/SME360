import React, { useState } from 'react';
import { UserCheck, Plus, Play, CheckCircle2, DollarSign, Building2 } from 'lucide-react';
import { Employee } from '../types';

interface PayrollViewProps {
  employees: Employee[];
  onRunPayroll: () => void;
  onOpenModal: () => void;
}

export const PayrollView: React.FC<PayrollViewProps> = ({
  employees,
  onRunPayroll,
  onOpenModal,
}) => {
  const [running, setRunning] = useState(false);
  const [payrollDone, setPayrollDone] = useState(false);

  const totalMonthlyPayroll = employees.reduce((sum, e) => sum + e.salary, 0);
  const totalTaxWithheld = employees.reduce((sum, e) => sum + e.taxDeductions, 0);
  const totalNetDisbursed = employees.reduce((sum, e) => sum + e.netPay, 0);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      onRunPayroll();
      setRunning(false);
      setPayrollDone(true);
      setTimeout(() => setPayrollDone(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-500" />
            Payroll & Staff Operations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated tax withholding, salary disbursements, and staff records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenModal}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{running ? 'Processing Disburse...' : 'Run Monthly Payroll'}</span>
          </button>
        </div>
      </div>

      {payrollDone && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="text-xs font-bold">
            Payroll executed successfully! Disbursed ${totalNetDisbursed.toLocaleString()} net salary across {employees.length} employees. Entry recorded in Accounting.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Monthly Gross Salary</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            ${totalMonthlyPayroll.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Across {employees.length} core team members</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tax & Payroll Deductions</span>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
            ${totalTaxWithheld.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Automated 15% statutory rate</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Net Take-Home Disburse</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            ${totalNetDisbursed.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-500 font-bold">Ready for direct bank payout</span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Employee Name</th>
                <th className="p-4">Role & Department</th>
                <th className="p-4">Gross Salary</th>
                <th className="p-4">Tax Deductions</th>
                <th className="p-4">Net Salary</th>
                <th className="p-4">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <p>{emp.name}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{emp.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{emp.role}</p>
                    <p className="text-[10px] text-slate-400">{emp.department}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">${emp.salary.toLocaleString()}</td>
                  <td className="p-4 font-medium text-rose-600 dark:text-rose-400">-${emp.taxDeductions.toLocaleString()}</td>
                  <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400">${emp.netPay.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                        emp.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {emp.paymentStatus}
                    </span>
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
