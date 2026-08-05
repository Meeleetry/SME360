import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { MarketplaceVendor } from '../types';

interface MarketplaceViewProps {
  vendors: MarketplaceVendor[];
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ vendors }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [orderedId, setOrderedId] = useState<string | null>(null);

  const categories = ['All', 'Legal', 'Marketing', 'Logistics', 'Cloud & IT'];

  const filtered = vendors.filter(
    (v) => selectedCategory === 'All' || v.category === selectedCategory
  );

  const handleOrder = (id: string) => {
    setOrderedId(id);
    setTimeout(() => setOrderedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            Verified B2B SME Marketplace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pre-vetted corporate legal, logistics, marketing, and cybersecurity vendors with exclusive SME rates.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((ven) => {
          const isOrdered = orderedId === ven.id;

          return (
            <div
              key={ven.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all relative"
            >
              <div>
                {ven.badge && (
                  <span className="inline-block px-2 py-0.5 mb-2 text-[9px] font-bold rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {ven.badge}
                  </span>
                )}

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{ven.title}</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{ven.vendor}</p>

                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{ven.rating}</span>
                  <span className="text-slate-400 text-[10px] font-normal">({ven.reviewCount} reviews)</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{ven.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Starting at</span>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white">${ven.startingPrice}</p>
                </div>

                <button
                  onClick={() => handleOrder(ven.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isOrdered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                >
                  {isOrdered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Quote Sent</span>
                    </>
                  ) : (
                    <>
                      <span>Get Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
