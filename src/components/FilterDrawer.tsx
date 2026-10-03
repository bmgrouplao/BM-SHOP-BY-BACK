import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { FilterState } from '../types';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  totalMatches
}) => {
  const { language, t } = useStore();

  if (!isOpen) return null;

  const handleReset = () => {
    setFilters({
      search: '',
      gender: '',
      category: '',
      subcategory: '',
      brand: '',
      size: '',
      color: '',
      inStockOnly: false,
      onSaleOnly: false
    });
  };

  const sizesList = ['36', '37', '38', '39', '40', '41', '42', '43', '44', 'S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-150">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">{t('filter.title')}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('filter.clearAll')}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            {/* Gender / Target */}
            <div className="space-y-2">
              <label className="font-bold text-stone-800 uppercase tracking-wider block">
                {t('filter.gender')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '', label: t('common.all') },
                  { id: 'men', label: t('common.men') },
                  { id: 'women', label: t('common.women') }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilters((prev) => ({ ...prev, gender: item.id }))}
                    className={`py-2 text-center rounded-xl border font-bold transition-all ${
                      filters.gender === item.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="font-bold text-stone-800 uppercase tracking-wider block">
                {t('filter.category')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '', label: t('common.all') },
                  { id: 'shoes', label: t('common.shoes') },
                  { id: 'clothing', label: t('common.clothing') }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilters((prev) => ({ ...prev, category: item.id }))}
                    className={`py-2 text-center rounded-xl border font-bold transition-all ${
                      filters.category === item.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="font-bold text-stone-800 uppercase tracking-wider block">
                {t('filter.size')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {sizesList.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, size: prev.size === s ? '' : s }))
                    }
                    className={`py-2 text-center rounded-xl border font-bold transition-all ${
                      filters.size === s
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox toggles */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, onSaleOnly: e.target.checked }))
                  }
                  className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                />
                <span className="font-bold text-stone-800">{t('filter.onSaleOnly')}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                  }
                  className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                />
                <span className="font-bold text-stone-800">{t('filter.inStockOnly')}</span>
              </label>
            </div>
          </div>

          {/* Footer action */}
          <div className="p-5 border-t border-stone-200 bg-stone-50">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 active:scale-98 transition-all text-xs shadow-md"
            >
              {t('filter.apply')} ({totalMatches})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
