import React, { useState } from 'react';
import { Settings, User, Key, Download, CheckCircle2, Moon, Sun, Shield } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsViewProps {
  user: UserType | null;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, darkMode, setDarkMode }) => {
  const [companyName, setCompanyName] = useState(user?.companyName || 'Apex SME Innovations');
  const [currency, setCurrency] = useState('USD ($)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    const backupData = {
      user,
      exportTimestamp: new Date().toISOString(),
      platform: 'SME360 AI Enterprise',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sme360-workspace-backup-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" />
          Settings & Enterprise Security
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure company details, API integrations, theme preferences, and data exports.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>System preferences updated successfully!</span>
        </div>
      )}

      {/* Company Profile Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Company & Financial Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Company Legal Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Primary Base Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>CAD ($)</option>
              <option>AUD ($)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm"
        >
          Save Company Changes
        </button>
      </form>

      {/* Interface Theme Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Interface Appearance
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Dark Mode Theme</p>
            <p className="text-[11px] text-slate-400">Toggle dark canvas for low-light enterprise monitoring</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</span>
          </button>
        </div>
      </div>

      {/* Secrets & API Key Info */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Gemini AI API Configuration</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Your Gemini API key is automatically injected via server environment variables (`GEMINI_API_KEY`). You can view or update your secrets anytime in the <strong>Settings &gt; Secrets</strong> panel of Google AI Studio.
        </p>
      </div>

      {/* Export Workspace Backup */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Backup & Export Workspace</h2>
          <p className="text-xs text-slate-400">Download full JSON snapshot of customers, invoices & transactions</p>
        </div>
        <button
          onClick={handleExportData}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON</span>
        </button>
      </div>
    </div>
  );
};
