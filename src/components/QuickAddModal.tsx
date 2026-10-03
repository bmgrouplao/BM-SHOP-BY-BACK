import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';

interface QuickAddModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ product, onClose }) => {
  const { language, t, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.nameEN || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Available in-stock sizes for the selected color (Sold out sizes disappear)
  const availableSizes = (
    product.variants
      ? product.variants
          .filter((v) => (selectedColor ? v.color === selectedColor : true) && v.stock > 0)
          .map((v) => v.size)
      : product.sizes
  );

  const [selectedSize, setSelectedSize] = useState<string>(() => availableSizes[0] || '');

  React.useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes, selectedSize]);

  const displayName = language === 'lo' ? product.nameLA : product.nameEN;

  const handleAdd = () => {
    if (availableSizes.length === 0) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-stone-200 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <img
              src={product.mainImage}
              alt={displayName}
              className="w-14 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-sm font-bold text-stone-900 line-clamp-1">{displayName}</h3>
              <p className="text-base font-black text-stone-950 font-mono tabular-nums">
                {formatKip(product.price)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-4 space-y-4">
          {/* Colors */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-700">{t('product.selectColor')}</span>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.nameEN}
                  onClick={() => setSelectedColor(c.nameEN)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                    selectedColor === c.nameEN
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-800'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-stone-300"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{language === 'lo' ? c.nameLA : c.nameEN}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizes: Show only available in-stock sizes */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-700">{t('product.selectSize')}</span>
            {availableSizes.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-center text-xs font-bold rounded-xl border transition-all ${
                      selectedSize === s
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium text-center">
                {t('common.outOfStock')}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleAdd}
            disabled={added || availableSizes.length === 0}
            className="w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm text-sm disabled:opacity-30 disabled:pointer-events-none"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t('product.addedToCart')}</span>
              </>
            ) : (
              <span>{availableSizes.length > 0 ? t('product.addToCart') : t('common.outOfStock')}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
