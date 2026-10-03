import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onBuyNow: (product: Product, color: string, size: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow
}) => {
  const { language, t, addToCart, favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(product.id);

  // States
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.nameEN || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Available in-stock sizes for the selected color (Sold out sizes completely disappear!)
  const availableSizes = (
    product.variants
      ? product.variants
          .filter((v) => (selectedColor ? v.color === selectedColor : true) && v.stock > 0)
          .map((v) => v.size)
      : product.sizes
  );

  const [selectedSize, setSelectedSize] = useState<string>(() => availableSizes[0] || '');

  // Keep selected size valid if selectedColor changes
  React.useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes, selectedSize]);

  const displayName = language === 'lo' ? product.nameLA : product.nameEN;
  const displayDesc = language === 'lo' ? product.descriptionLA : product.descriptionEN;

  // Variant matching
  const currentVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const availableStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = availableSizes.length === 0 || availableStock <= 0;

  // Multi-picture gallery: Combine mainImage, images object, and gallery array
  const allImagesMap = new Map<string, { id: string; url: string; label: string }>();

  if (product.mainImage) {
    allImagesMap.set(product.mainImage, {
      id: 'main',
      url: product.mainImage,
      label: language === 'lo' ? 'ຮູບຫຼັກ' : 'Main'
    });
  }

  // Object images
  Object.entries(product.images || {}).forEach(([key, url]) => {
    if (url && typeof url === 'string' && url.trim().length > 0) {
      if (!allImagesMap.has(url)) {
        allImagesMap.set(url, {
          id: key,
          url,
          label: t(`product.${key}View`) !== `product.${key}View` ? t(`product.${key}View`) : key
        });
      }
    }
  });

  // Additional gallery pictures
  (product.gallery || []).forEach((url, idx) => {
    if (url && typeof url === 'string' && url.trim().length > 0) {
      if (!allImagesMap.has(url)) {
        allImagesMap.set(url, {
          id: `gallery_${idx}`,
          url,
          label: language === 'lo' ? `ມຸມ ${allImagesMap.size + 1}` : `Photo ${allImagesMap.size + 1}`
        });
      }
    }
  });

  const availableImages = Array.from(allImagesMap.values());
  const activeImage = availableImages[activeImageIndex] || availableImages[0] || { url: product.mainImage, label: 'Main' };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : availableImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < availableImages.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100/90 text-stone-800 hover:bg-stone-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery (Multi-picture support) */}
          <div className="md:col-span-6 bg-stone-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            {/* Main Stage */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs flex items-center justify-center group">
              <img
                src={activeImage.url}
                alt={displayName}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next navigation arrows when multiple pictures exist */}
              {availableImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    aria-label="Previous photo"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-stone-800 hover:bg-white active:scale-95 transition-all opacity-80 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    aria-label="Next photo"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-stone-800 hover:bg-white active:scale-95 transition-all opacity-80 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                {product.isNew && (
                  <span className="bg-stone-900 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-xs">
                    {t('common.new')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-red-700 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-xs">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Picture counter pill */}
              {availableImages.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>
                    {activeImageIndex + 1} / {availableImages.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail View Switcher with all added pictures */}
            {availableImages.length > 1 && (
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      activeImageIndex === idx
                        ? 'border-stone-900 ring-2 ring-stone-900/20 scale-102 shadow-xs'
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-stone-900/80 text-white text-[9px] text-center font-bold py-0.5 truncate px-0.5">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
                  <span>{product.brand} · SKU: {product.sku}</span>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="flex items-center gap-1 text-stone-700 hover:text-red-600 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
                    <span className="text-xs">{isFav ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 leading-snug">
                  {displayName}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-stone-950 font-mono tabular-nums">
                    {formatKip(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                      {formatKip(product.oldPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {displayDesc}
              </p>

              {/* Color Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>{t('product.selectColor')}:</span>
                  <span className="text-stone-500">
                    {product.colors.find((c) => c.nameEN === selectedColor)?.[language === 'lo' ? 'nameLA' : 'nameEN']}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.nameEN}
                      onClick={() => setSelectedColor(c.nameEN)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedColor === c.nameEN
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{language === 'lo' ? c.nameLA : c.nameEN}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector: Show ONLY available in-stock sizes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>{t('product.selectSize')}:</span>
                  <span className="text-stone-500">
                    {availableSizes.length > 0 && availableStock > 0
                      ? `${availableStock} ${language === 'lo' ? 'ຊິ້ນພ້ອມສົ່ງ' : 'available'}`
                      : t('common.outOfStock')}
                  </span>
                </div>

                {availableSizes.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {availableSizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`py-2 text-center text-xs font-bold rounded-xl border transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                    {language === 'lo'
                      ? 'ສີນີ້ສິນຄ້າໝົດແລ້ວ ກະລຸນາເລືອກສີອື່ນ'
                      : 'This color is currently out of stock. Please select another color.'}
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-stone-800">{t('product.quantity')}:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold font-mono tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                    disabled={quantity >= availableStock}
                    className="p-2 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Delivery and Trust mini pills */}
              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>{t('product.deliveryDetail')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'lo'
                      ? 'ກວດສອບສິນຄ້າກ່ອນສົ່ງ ແລະ ຊຳລະເງິນຜ່ານ BCEL One'
                      : 'Authenticity guaranteed with secure BCEL One QR'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              {addedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{t('product.addedToCart')}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="py-3.5 px-4 bg-stone-100 text-stone-900 border border-stone-300 font-bold rounded-xl hover:bg-stone-200 active:scale-98 transition-all disabled:opacity-40 text-xs sm:text-sm"
                >
                  {isOutOfStock ? t('common.outOfStock') : t('product.addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="py-3.5 px-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 active:scale-98 transition-all shadow-md disabled:opacity-40 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                >
                  <span>{t('product.buyNow')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
