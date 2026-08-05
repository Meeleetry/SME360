import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Users,
  Wallet,
  Package,
  FileText,
  UserCheck,
  ShieldCheck,
  Banknote,
  ShoppingBag,
  User,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  setCurrentModule: (module: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  lowStockCount?: number;
  pendingComplianceCount?: number;
}

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ai-assistant', label: 'AI Business Advisor', icon: Bot, badge: 'Gemini 3.6' },
  { id: 'accounting', label: 'Accounting & P&L', icon: Wallet },
  { id: 'crm', label: 'CRM & Clients', icon: Users },
  { id: 'inventory', label: 'Inventory & SKUs', icon: Package },
  { id: 'invoices', label: 'Invoices & Billing', icon: FileText },
  { id: 'payroll', label: 'Payroll & Staff', icon: UserCheck },
  { id: 'compliance', label: 'Compliance & Audits', icon: ShieldCheck },
  { id: 'funding', label: 'Funding & Grants', icon: Banknote },
  { id: 'marketplace', label: 'B2B Marketplace', icon: ShoppingBag },
];

export const secondaryItems = [
  { id: 'profile', label: 'Company Profile', icon: User },
  { id: 'settings', label: 'Settings & Security', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  setCurrentModule,
  mobileOpen,
  setMobileOpen,
  isOpen,
  setIsOpen,
  lowStockCount = 0,
  pendingComplianceCount = 0,
}) => {
  const isMobileOpen = mobileOpen ?? isOpen ?? false;
  const handleClose = () => {
    if (setMobileOpen) setMobileOpen(false);
    if (setIsOpen) setIsOpen(false);
  };

  const handleSelect = (id: string) => {
    setCurrentModule(id);
    handleClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-slate-300 z-50 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSelect('dashboard')}>
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <span className="font-bold text-white text-xl tracking-tight leading-none block">
                SME360 <span className="text-xs text-indigo-400 font-semibold">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-tight mt-0.5">Enterprise Operations</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            const isLowStock = item.id === 'inventory' && lowStockCount > 0;
            const isPendingComp = item.id === 'compliance' && pendingComplianceCount > 0;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-indigo-400/20 text-indigo-300 border border-indigo-400/30">
                    {item.badge}
                  </span>
                )}

                {isLowStock && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Low Stock Warning" />
                )}

                {isPendingComp && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500/20 text-rose-300 font-bold">
                    {pendingComplianceCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
            Management
          </div>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Account Usage AI Credits Box */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-medium">Account Usage</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full mb-2 overflow-hidden">
              <div className="w-3/4 h-full bg-indigo-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>750 / 1000 AI Credits</span>
              <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => handleSelect('ai-assistant')}>Upgrade</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

