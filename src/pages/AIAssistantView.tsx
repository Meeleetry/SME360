import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  TrendingUp,
  FileText,
  DollarSign,
  Briefcase,
  Lightbulb,
} from 'lucide-react';
import { api } from '../services/api';
import { ChatMessage, DashboardSummary } from '../types';

interface AIAssistantViewProps {
  summary: DashboardSummary | null;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ summary }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am your SME360 Virtual CFO & Business Advisor, powered by Gemini 3.6 Flash.\n\nI have analyzed your current workspace metrics:\n- **Revenue**: $${summary?.revenue?.toLocaleString() || '48,200'}\n- **Expenses**: $${summary?.expenses?.toLocaleString() || '22,400'}\n- **Net Profit**: $${summary?.netProfit?.toLocaleString() || '25,800'} (53.5% margin)\n- **Overdue Invoices**: 1 ($3,360)\n\nHow can I help accelerate your SME growth today? Select a quick prompt below or ask any question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promptPills = [
    {
      label: 'Cash Flow Analysis',
      icon: TrendingUp,
      prompt: 'Analyze my current cashflow metrics and give me 3 actionable ways to optimize working capital this month.',
    },
    {
      label: 'Draft Overdue Invoice Email',
      icon: FileText,
      prompt: 'Draft a firm, polite follow-up email for David Chen regarding overdue invoice INV-2026-003 ($3,360).',
    },
    {
      label: 'Tax Deduction Strategy',
      icon: DollarSign,
      prompt: 'What are the top tax deduction strategies available for an SME with $48,000 monthly revenue?',
    },
    {
      label: 'SME Growth Marketing',
      icon: Briefcase,
      prompt: 'Propose a low-cost, high-conversion growth marketing campaign for our B2B consulting services.',
    },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const replyText = await api.askAIAssistant(query, {
        revenue: summary?.revenue || 48200,
        expenses: summary?.expenses || 22400,
        netProfit: summary?.netProfit || 25800,
        customerCount: summary?.customerCount || 5,
        lowStockCount: summary?.lowStockCount || 1,
      });

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: 'I encountered an issue connecting to the Gemini AI engine. Please verify your GEMINI_API_KEY in Settings or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Top Advisor Header */}
      <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">SME360 AI Virtual CFO</h2>
              <span className="px-2 py-0.5 text-[9px] rounded-full bg-indigo-500/30 text-indigo-300 font-bold border border-indigo-400/30">
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Contextual financial intelligence & operational automation</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg-reset',
                sender: 'assistant',
                text: 'Chat session reset. Ask me anything about your SME finances, CRM, or tax strategies!',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl group relative ${isUser ? 'order-1' : 'order-2'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/60'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/40 dark:border-slate-700/40 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 italic py-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Gemini 3.6 Flash is analyzing financial context...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Pills */}
      <div className="px-4 py-2 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Quick Tasks:
          </span>
          {promptPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.prompt)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-xs"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SME360 AI anything (e.g., 'How can I reduce tax liabilities for Q3?')..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white rounded-xl outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
