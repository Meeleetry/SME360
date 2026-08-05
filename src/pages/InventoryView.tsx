import React, { useState } from 'react';
import { Package, Search, Plus, AlertTriangle, Trash2, Edit3 } from 'lucide-react';
import { Product } from '../types';

interface InventoryViewProps {
  products: Product[];
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onOpenModal: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onOpenModal,
}) => {
  const [search, setSearch] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = products.filter((p) => p.stock <= p.reorderPoint);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-500" />
            Inventory & SKU Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time stock tracking, cost margins, and low stock automated reorder alerts.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Low Stock Alert Banner */}
      {lowStock.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold">Low Stock Warning: {lowStock.length} Product(s) Below Reorder Threshold</p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300">
                {lowStock.map((p) => `${p.name} (${p.stock} left)`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU, or category..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-slate-900 dark:text-white rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">SKU</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price / Cost</th>
                <th className="p-4">Margin</th>
                <th className="p-4">Stock Quantity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((prod) => {
                const margin = prod.price - prod.cost;
                const marginPercent = ((margin / prod.price) * 100).toFixed(0);
                const isLow = prod.stock <= prod.reorderPoint;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{prod.sku}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{prod.name}</td>
                    <td className="p-4 font-medium">{prod.category}</td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white">${prod.price}</span>
                      <span className="text-[10px] text-slate-400 block">Cost: ${prod.cost}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">${margin}</span>
                      <span className="text-[10px] text-slate-400 block">({marginPercent}%)</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateProduct(prod.id, { stock: Math.max(0, prod.stock - 1) })}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span
                          className={`font-bold text-sm min-w-[2.5rem] text-center ${
                            isLow ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {prod.stock} {prod.unit}
                        </span>
                        <button
                          onClick={() => onUpdateProduct(prod.id, { stock: prod.stock + 1 })}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                        {isLow && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
