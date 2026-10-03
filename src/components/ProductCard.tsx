import React from 'react';
import { Heart, Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onQuickAdd }) => {
  const { language, favorites, toggleFavorite, t } = useStore();
  const isFav = favorites.includes(product.id);

  const displayName = language === 'lo' ? product.nameLA : product.nameEN;

  // Show ONLY sizes that have stock > 0. Sold-out sizes disappear!
  const inStockSizes = Array.from(
    new Set(
      product.variants
        ? product.variants.filter((v) => v.stock > 0).map((v) => v.size)
        : product.sizes
    )
  );
  const isAvailable = inStockSizes.length > 0 && product.inStock;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200">
      {/* Image container */}
      <div className="relative aspect-4/3 sm:aspect-square bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.mainImage}
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled graceful fallback container
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Top Badges (Small, clean badges as per Section 2 & 13) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-stone-900 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs">
              {t('common.new')}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="bg-red-700 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs">
              -{product.discountPercent}%
            </span>
          ) : product.isSale ? (
            <span className="bg-red-700 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs">
              {t('common.sale')}
            </span>
          ) : null}
          {product.isPopular && !product.isNew && (
            <span className="bg-amber-500 text-stone-950 text-[11px] font-black px-2 py-0.5 rounded tracking-wide shadow-xs">
              {t('common.popular')}
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-red-600 hover:scale-110 active:scale-95 transition-all shadow-xs z-10"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full py-2.5 px-4 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold rounded-xl shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('common.viewDetails')}</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Subcategory unboxed metadata */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.subcategory}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm sm:text-base font-bold text-stone-900 line-clamp-2 mt-1 cursor-pointer hover:text-stone-700 leading-snug"
          >
            {displayName}
          </h3>

          {/* Color previews */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={language === 'lo' ? c.nameLA : c.nameEN}
                className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400 font-medium">+{product.colors.length - 4}</span>
            )}
            <span className="text-xs text-stone-600 ml-1 font-medium">
              {product.colors.map(c => language === 'lo' ? c.nameLA : c.nameEN).join(' · ')}
            </span>
          </div>

          {/* Size labels: Show only available in-stock sizes */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap min-h-6">
            {inStockSizes.length > 0 ? (
              <>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'lo' ? (product.category === 'shoes' ? 'ເບີທີ່ມີ:' : 'ໄຊສ໌ທີ່ມີ:') : 'Sizes:'}
                </span>
                {inStockSizes.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-800 rounded border border-stone-200"
                  >
                    {s}
                  </span>
                ))}
                {inStockSizes.length > 5 && (
                  <span className="text-xs text-stone-500 font-medium">
                    +{inStockSizes.length - 5}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {t('common.outOfStock')}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-stone-950 font-mono tracking-tight tabular-nums">
                {formatKip(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-stone-500 line-through tabular-nums font-mono">
                  {formatKip(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            {isAvailable ? (
              <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t('common.inStock')}</span>
              </div>
            ) : (
              <div className="text-[11px] font-medium text-red-600 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>{t('common.outOfStock')}</span>
              </div>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => onQuickAdd(product)}
            disabled={!isAvailable}
            aria-label="Add to cart"
            className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 active:scale-95 transition-all shrink-0 shadow-xs disabled:opacity-30 disabled:pointer-events-none"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
