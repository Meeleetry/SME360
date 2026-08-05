import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, Building2, Calendar } from 'lucide-react';
import { ComplianceItem } from '../types';

interface ComplianceViewProps {
  items: ComplianceItem[];
  onUpdateStatus: (id: string, status: string) => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({ items, onUpdateStatus }) => {
  const compliantCount = items.filter((i) => i.status === 'compliant').length;
  const scorePercent = Math.round((compliantCount / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            Compliance & Regulatory Audit Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated statutory tax calendars, ESG audits, and department compliance scorecards.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-950/60 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-800">
          <div className="text-right">
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
              Compliance Score
            </p>
            <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{scorePercent}%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            {scorePercent >= 80 ? 'A+' : 'B'}
          </div>
        </div>
      </div>

      {/* Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const isDone = item.status === 'compliant';
          const isPending = item.status === 'pending';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                    {item.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                      isDone
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : isPending
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{item.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {item.authority}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Due: {item.dueDate}
                  </span>
                </div>
              </div>

              {!isDone && (
                <button
                  onClick={() => onUpdateStatus(item.id, 'compliant')}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Regulatory Clearance Complete</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
