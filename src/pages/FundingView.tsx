import React from 'react';
import { Banknote, Sparkles, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { FundingOpportunity } from '../types';

interface FundingViewProps {
  opportunities: FundingOpportunity[];
  onApply: (id: string) => void;
}

export const FundingView: React.FC<FundingViewProps> = ({ opportunities, onApply }) => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Banknote className="w-5 h-5 text-indigo-500" />
            SME Funding & Capital Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            AI-matched non-dilutive government grants, working capital loans, and equity investors.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>AI Eligibility Matcher Active</span>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {opportunities.map((fund) => {
          const isApplied = fund.status === 'applied';

          return (
            <div
              key={fund.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Match Score Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase">
                  {fund.type}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" />
                  <span>{fund.matchScore}% Match</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{fund.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{fund.provider}</p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Funding:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">${fund.maxAmount.toLocaleString()}</span>
                  </div>
                  {fund.interestRate && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Interest Terms:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{fund.interestRate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Application Deadline:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{fund.deadline}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{fund.description}</p>
              </div>

              <div>
                {isApplied ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Application Under Review</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onApply(fund.id)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30"
                  >
                    <span>Apply for Funding Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
