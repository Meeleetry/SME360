import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Bot,
  Wallet,
  Users,
  Package,
  FileText,
  Banknote,
  Building2,
  ChevronRight,
  Star,
} from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onDemoClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginClick,
  onRegisterClick,
  onDemoClick,
}) => {
  const [employeesCount, setEmployeesCount] = useState(12);
  const [monthlyRevenue, setMonthlyRevenue] = useState(45000);

  // ROI Math
  const estimatedHoursSaved = Math.round(employeesCount * 8.5);
  const estimatedMoneySaved = Math.round(monthlyRevenue * 0.14);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            SME360 <span className="text-indigo-400">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Core Modules
          </a>
          <a href="#roi-calculator" className="hover:text-white transition-colors">
            ROI Calculator
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onDemoClick}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <span>Try Live Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next-Gen Enterprise OS for Small & Medium Businesses</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          The Complete AI-Powered Platform to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300">Run & Scale Your SME</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unify Accounting, CRM, Inventory, Invoicing, Payroll, Compliance, and Funding into a single intelligent operational workspace guided by Gemini AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onDemoClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Launch Interactive Demo</span>
          </button>
        </div>

        {/* Dashboard Preview Glass Card */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden p-4 sm:p-8 text-left max-w-5xl mx-auto">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 ml-2 font-mono">sme360.ai/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                Live Status: 100% Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Monthly Revenue</span>
              <p className="text-2xl font-bold text-white mt-1">$48,200</p>
              <span className="text-[10px] text-emerald-400 font-bold">↑ +14.2% vs last month</span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Operating Expenses</span>
              <p className="text-2xl font-bold text-white mt-1">$22,400</p>
              <span className="text-[10px] text-emerald-400 font-bold">↓ -4.1% efficiency gain</span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Net Profit Margin</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">53.5%</p>
              <span className="text-[10px] text-slate-400">$25,800 net gain</span>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">AI CFO Insights</span>
              <p className="text-xs font-semibold text-indigo-300 mt-1">1 Invoice Overdue Reminder</p>
              <span className="text-[10px] text-indigo-400 font-medium">Auto-followup ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            9 Operational Modules in One Unified Platform
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Eliminate fragmented software tools. SME360 AI connects all facets of your enterprise into an automated workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Virtual AI CFO</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by Gemini 3.6 Flash. Ask complex questions about cashflow projections, tax deductions, and growth strategies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Accounting & P&L</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated income and expense categorization, balance sheets, and real-time net margin calculations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">CRM & Client Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lead status tracking, client contact profiles, lifetime order history, and deal stage pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Inventory & Stock</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SKU management, reorder point alerts, cost margin analysis, and stock level notifications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Invoices & Billing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate custom PDF invoices, track payment statuses (Paid/Pending/Overdue), and issue payment links.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Compliance & Funding</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay ahead of tax & labor regulations, and apply for matched SME government grants and capital loans.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-16 px-6 lg:px-12 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Calculate Your SME Time & Cost Savings</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              See how much operational manual labor SME360 AI saves your team each month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Number of Team Members</span>
                  <span className="text-indigo-400 font-bold">{employeesCount} employees</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={employeesCount}
                  onChange={(e) => setEmployeesCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Estimated Monthly Revenue</span>
                  <span className="text-indigo-400 font-bold">${monthlyRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center space-y-4 text-center sm:text-left">
              <div>
                <span className="text-xs text-slate-400">Estimated Hours Saved / Month</span>
                <p className="text-3xl font-extrabold text-white mt-1">{estimatedHoursSaved} Hours</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Estimated Cost Optimization</span>
                <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                  ${estimatedMoneySaved.toLocaleString()} / mo
                </p>
              </div>
              <button
                onClick={onRegisterClick}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Claim Your Efficiency Gains
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Transparent, Simple Pricing for Growing SMEs
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            All plans include full database access, JWT security, and Gemini 3.6 Flash AI advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starter</span>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-white">$29</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Ideal for micro-enterprises and freelancers starting out.</p>
              <ul className="space-y-3 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to 3 Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> CRM & Invoicing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> 100 AI Assistant Credits
                </li>
              </ul>
            </div>
            <button
              onClick={onRegisterClick}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth Plan (Featured) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/60 border-2 border-indigo-500 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Growth</span>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-white">$79</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">Complete suite for scaling small & medium businesses.</p>
              <ul className="space-y-3 text-xs text-slate-200 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> All 9 Core Modules Included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Gemini AI CFO Queries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Automated Payroll & Funding Hub
                </li>
              </ul>
            </div>
            <button
              onClick={onDemoClick}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-indigo-600/30"
            >
              Launch Growth Workspace
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise</span>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-white">$199</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Custom multi-entity architecture & dedicated CPA review.</p>
              <ul className="space-y-3 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom Prisma DB Sync
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated Account Manager
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> 24/7 Priority SLA Support
                </li>
              </ul>
            </div>
            <button
              onClick={onRegisterClick}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              Contact Enterprise Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-12 px-6 lg:px-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white text-xs">S</div>
            <span>SME360 AI</span>
          </div>
          <p>© 2026 SME360 AI Inc. Ready for VS Code local run, Prisma & GitHub export.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#features" className="hover:text-white">
              Privacy
            </a>
            <a href="#features" className="hover:text-white">
              Terms
            </a>
            <a href="#features" className="hover:text-white">
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
