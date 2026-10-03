import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    settings,
    language,
    t
  } = useStore();

  if (!isOpen) return null;

  const freeDeliveryDiff = settings.freeDeliveryThreshold - cartSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                {t('cart.title')}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} {t('cart.itemsCount')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery progress meter */}
          <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 text-xs">
            {cartSubtotal >= settings.freeDeliveryThreshold ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{t('cart.freeDeliveryNotice')}</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>{t('cart.addMoreForFree', { amount: formatKip(freeDeliveryDiff) })}</span>
                  <span className="font-bold text-stone-900 font-mono">
                    {Math.round((cartSubtotal / settings.freeDeliveryThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-900 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100)}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">{t('cart.empty')}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {language === 'lo'
                      ? 'ເລືອກຊື້ເກີບ ແລະ ເສື້ອຜ້າແຟຊັ່ນຄຸນນະພາບດີໄດ້ເລີຍ'
                      : 'Explore our footwear and clothing collection'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
                >
                  {t('cart.startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const displayName = language === 'lo' ? item.nameLA : item.nameEN;
                return (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    <img
                      src={item.image}
                      alt={displayName}
                      className="w-18 h-18 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                          {displayName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title={t('cart.removeItem')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{item.color}</span>
                        <span>·</span>
                        <span className="font-semibold text-stone-700">Size: {item.size}</span>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-stone-600" />
                          </button>
                          <span className="px-2.5 text-xs font-bold font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-1 hover:bg-stone-200 disabled:opacity-30 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-stone-600" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-sm font-extrabold text-stone-950 font-mono tabular-nums">
                          {formatKip(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Calculations and Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-stone-900 font-mono tabular-nums">
                    {formatKip(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.deliveryFee')}</span>
                  <span className="font-bold font-mono tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatKip(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-950">
                  <span>{t('cart.total')}</span>
                  <span className="font-mono tabular-nums text-lg">{formatKip(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-stone-900 text-white font-extrabold rounded-xl hover:bg-stone-800 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <span>{t('cart.proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-500 font-medium">
                {language === 'lo'
                  ? 'ບໍ່ຈຳເປັນຕ້ອງລົງທະບຽນ · ຊຳລະຜ່ານ BCEL One QR ງ່າຍດາຍ'
                  : 'No account needed · Instant payment via BCEL One QR'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
