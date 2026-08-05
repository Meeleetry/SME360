import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  subtitle?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'blue' | 'rose';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white tracking-tight">
        {value}
      </p>

      {change && (
        <p
          className={`text-xs font-medium mt-2 flex items-center gap-1 ${
            isPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-amber-600 dark:text-amber-400'
          }`}
        >
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{change}</span>
        </p>
      )}

      {subtitle && !change && (
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

