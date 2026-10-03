import React from 'react';
import { Home, Compass, Heart, ShoppingBag, Search, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string, filterParams?: any) => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenCart
}) => {
  const { t, cart, favorites, language, pendingPaymentsCount } = useStore();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-1.5 px-2 shadow-lg">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentView === 'home'
              ? 'text-stone-950 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {t('nav.home')}
          </span>
        </button>

        {/* 2. Shop */}
        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentView === 'shop'
              ? 'text-stone-950 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Compass className={`w-5 h-5 ${currentView === 'shop' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {t('nav.shop')}
          </span>
        </button>

        {/* 3. Favorites */}
        <button
          onClick={() => onNavigate('favorites')}
          className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentView === 'favorites'
              ? 'text-stone-950 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className={`w-5 h-5 ${currentView === 'favorites' ? 'fill-stone-950 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {t('common.favorites')}
          </span>
          {favorites.length > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-red-600"></span>
          )}
        </button>

        {/* 4. Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 rounded-xl text-stone-500 hover:text-stone-900 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {t('common.cart')}
          </span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 bg-amber-400 text-stone-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* 5. Track Order */}
        <button
          onClick={() => onNavigate('tracking')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentView === 'tracking'
              ? 'text-stone-950 font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Search className={`w-5 h-5 ${currentView === 'tracking' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {language === 'lo' ? 'ຕິດຕາມ' : 'Track'}
          </span>
        </button>
      </div>
    </div>
  );
};
