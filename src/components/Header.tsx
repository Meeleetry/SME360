import React, { useState } from 'react';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  Sparkles,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  setMobileOpen?: (open: boolean) => void;
  setCurrentModule?: (module: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentModuleName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onToggleSidebar,
  setMobileOpen,
  setCurrentModule,
  darkMode,
  setDarkMode,
  currentModuleName = 'Overview',
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'reports'>('overview');

  const handleOpenMobile = () => {
    if (onToggleSidebar) onToggleSidebar();
    if (setMobileOpen) setMobileOpen(true);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'JD';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 shrink-0 transition-colors">
      {/* Left Navigation Tabs & Mobile Toggle */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <button
          onClick={handleOpenMobile}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`h-16 px-1 transition-colors flex items-center font-semibold ${
              activeTab === 'overview'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {currentModuleName || 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`h-16 px-1 transition-colors flex items-center ${
              activeTab === 'analytics'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`h-16 px-1 transition-colors flex items-center ${
              activeTab === 'reports'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Right Controls: Search, Theme, AI Button, Notifications, User Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-slate-100 dark:bg-slate-800 rounded-lg py-1.5 pl-8 pr-4 text-xs w-48 border-0 ring-0 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick AI Advisor Launch */}
          {setCurrentModule && (
            <button
              onClick={() => setCurrentModule('ai-assistant')}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ask AI CFO</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                </div>
                <div className="py-2 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Invoice Paid</p>
                      <p className="text-[10px] text-slate-500">Inv #842 - $1,240.00 received from Sarah</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Low Stock Alert</p>
                      <p className="text-[10px] text-slate-500">Wireless Keyboards (2 left in inventory)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Avatar Block */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-semibold text-xs shrink-0 border border-indigo-200/50 dark:border-indigo-800/50">
              {getInitials(user?.name)}
            </div>
            <div className="text-xs text-left hidden sm:block">
              <p className="font-semibold leading-none text-slate-900 dark:text-white">
                {user?.name || 'Alex Rivera'}
              </p>
              <p className="text-slate-400 dark:text-slate-500 mt-1 capitalize text-[10px]">
                {user?.role || 'Admin'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'Alex Rivera'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@sme360.ai'}</p>
              </div>

              <div className="py-1">
                {setCurrentModule && (
                  <>
                    <button
                      onClick={() => {
                        setCurrentModule('profile');
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Company Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentModule('settings');
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>System Settings</span>
                    </button>
                  </>
                )}
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

