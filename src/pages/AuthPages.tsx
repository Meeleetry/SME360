import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Lock, Mail, User as UserIcon, Building2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { AuthState } from '../types';

interface AuthPagesProps {
  initialMode?: 'login' | 'register';
  onAuthSuccess: (auth: AuthState) => void;
  onBackToLanding: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  initialMode = 'login',
  onAuthSuccess,
  onBackToLanding,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('alex.rivera@sme360.ai');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Rivera');
  const [companyName, setCompanyName] = useState('Apex SME Innovations');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const auth = await api.login(email, password);
        onAuthSuccess(auth);
      } else {
        const auth = await api.register(name, email, companyName, password);
        onAuthSuccess(auth);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoQuickLogin = async () => {
    setLoading(true);
    try {
      const auth = await api.login('alex.rivera@sme360.ai', 'password123');
      onAuthSuccess(auth);
    } catch (err: any) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl shadow-indigo-500/30">
          S
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {mode === 'login' ? 'Sign in to SME360 AI' : 'Create Your SME Account'}
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          {mode === 'login'
            ? 'Access your unified enterprise dashboard & AI Advisor'
            : 'Get started with all 9 operational modules'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 shadow-2xl rounded-2xl sm:px-10">
          {/* Quick Demo Login Pill */}
          <div className="mb-6 p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Try Demo Account</p>
                <p className="text-[10px] text-slate-400">Instant access with pre-filled sample data</p>
              </div>
            </div>
            <button
              onClick={handleDemoQuickLogin}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              Quick Login
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Apex SME Innovations"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sme360.ai"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all mt-2"
            >
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Dashboard'
                : 'Complete Registration'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-slate-400">
                Don't have an SME account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
