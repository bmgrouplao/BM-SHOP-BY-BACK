import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onOpenCart: () => void;
  onNavigate: (view: string, filterParams?: any) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onNavigate, currentView }) => {
  const { language, setLanguage, t, fontSize, setFontSize, cart, favorites, pendingPaymentsCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop', { search: searchQuery.trim() });
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-stone-300">
              {language === 'lo' ? 'ຈັດສົ່ງຟຣີທົ່ວປະເທດ ເມື່ອຊື້ຄົບ ₭500,000' : 'Free nationwide delivery across Laos on orders over ₭500,000'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-stone-400 text-xs">
            <button
              onClick={() => onNavigate('tracking')}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('common.trackOrder')}</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('common.admin')}</span>
              {pendingPaymentsCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {pendingPaymentsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header: One-row, 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group flex flex-col focus:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
                BM SHOP
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-600 font-semibold -mt-1">
                {language === 'lo' ? 'ເກີບ & ເສື້ອຜ້າ' : 'Shoes & Clothing'}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Text with subtle hover) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-stone-700">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-stone-900 transition-colors py-1 relative ${
                currentView === 'home' ? 'text-stone-950 font-bold border-b-2 border-stone-900' : ''
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => onNavigate('shop', { gender: 'men' })}
              className="hover:text-stone-900 transition-colors py-1"
            >
              {t('common.men')}
            </button>
            <button
              onClick={() => onNavigate('shop', { gender: 'women' })}
              className="hover:text-stone-900 transition-colors py-1"
            >
              {t('common.women')}
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'shoes' })}
              className="hover:text-stone-900 transition-colors py-1"
            >
              {t('common.shoes')}
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'clothing' })}
              className="hover:text-stone-900 transition-colors py-1"
            >
              {t('common.clothing')}
            </button>
            <button
              onClick={() => onNavigate('shop', { isNew: true })}
              className="hover:text-stone-900 transition-colors py-1"
            >
              {t('nav.newArrivals')}
            </button>
            <button
              onClick={() => onNavigate('shop', { onSaleOnly: true })}
              className="text-red-700 hover:text-red-800 transition-colors py-1 font-bold"
            >
              {t('common.sale')}
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Language, Font Scaler, Favorites, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher: Flags only (Lao 🇱🇦 & English 🇬🇧) */}
            <div className="flex items-center bg-stone-100/90 border border-stone-300 rounded-xl p-1 gap-1 shadow-2xs">
              <button
                onClick={() => setLanguage('lo')}
                aria-label="ພາສາລາວ (Lao)"
                title="ພາສາລາວ (Lao)"
                className={`flex items-center justify-center p-1.5 sm:px-2 sm:py-1.5 rounded-lg transition-all ${
                  language === 'lo'
                    ? 'bg-white shadow-xs ring-1 ring-stone-900/15 scale-105'
                    : 'opacity-55 hover:opacity-100 hover:bg-stone-200/60'
                }`}
              >
                {/* Lao Flag */}
                <svg className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-xs overflow-hidden shadow-2xs shrink-0 border border-black/10" viewBox="0 0 600 400">
                  <rect width="600" height="400" fill="#CE1126" />
                  <rect y="100" width="600" height="200" fill="#002868" />
                  <circle cx="300" cy="200" r="80" fill="#FFFFFF" />
                </svg>
              </button>

              <button
                onClick={() => setLanguage('en')}
                aria-label="English"
                title="English"
                className={`flex items-center justify-center p-1.5 sm:px-2 sm:py-1.5 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-white shadow-xs ring-1 ring-stone-900/15 scale-105'
                    : 'opacity-55 hover:opacity-100 hover:bg-stone-200/60'
                }`}
              >
                {/* UK / English Flag */}
                <svg className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-xs overflow-hidden shadow-2xs shrink-0 border border-black/10" viewBox="0 0 60 30">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
              </button>
            </div>

            {/* Font size accessibility toggle (Middle-age accessibility requirement) */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              title={fontSize === 'normal' ? 'Enlarge text size' : 'Normal text size'}
              className="hidden sm:flex items-center justify-center w-8 h-8 text-xs font-bold border border-stone-300 bg-white hover:bg-stone-100 rounded-lg text-stone-700 transition-colors"
            >
              {fontSize === 'normal' ? 'A+' : 'A'}
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => onNavigate('favorites')}
              aria-label="View favorites"
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors hidden sm:block"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </button>

            {/* Cart Button with Count */}
            <button
              onClick={onOpenCart}
              aria-label="Open Cart"
              className="flex items-center gap-2 px-3.5 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 active:scale-98 transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{t('common.cart')}</span>
              {cartItemsCount > 0 && (
                <span className="bg-amber-400 text-stone-950 text-xs font-black px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="bg-white border-t border-stone-200 px-4 py-3 shadow-md animate-in fade-in slide-in-from-top duration-150">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.searchPlaceholder')}
                  autoFocus
                  className="w-full pl-11 pr-24 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800"
                >
                  {language === 'lo' ? 'ຄົ້ນຫາ' : 'Search'}
                </button>
              </form>

              {/* Suggestions */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs text-stone-500">
                <span className="font-semibold text-stone-700">
                  {language === 'lo' ? 'ຄຳຄົ້ນຍອດນິຍົມ:' : 'Popular:'}
                </span>
                {['Nike', 'ເກີບຜູ້ຊາຍ', 'ເສື້ອເຊີ້ດ', 'Linen Blazer', 'Loafers', 'ຂະໜາດ 42'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      onNavigate('shop', { search: term });
                      setSearchOpen(false);
                    }}
                    className="hover:text-stone-900 hover:underline bg-stone-100 px-2 py-0.5 rounded text-stone-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBFBF9] border-t border-stone-200 px-5 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-stone-800">
              <button
                onClick={() => {
                  onNavigate('shop', { gender: 'men' });
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-900"
              >
                {t('common.men')}
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', { gender: 'women' });
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-900"
              >
                {t('common.women')}
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', { category: 'shoes' });
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-900"
              >
                {t('common.shoes')}
              </button>
              <button
                onClick={() => {
                  onNavigate('shop', { category: 'clothing' });
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-900"
              >
                {t('common.clothing')}
              </button>
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-2">
              <button
                onClick={() => {
                  onNavigate('tracking');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-stone-100 text-stone-900 font-semibold text-sm"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-stone-600" />
                  {t('common.trackOrder')}
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-stone-100 text-stone-900 font-semibold text-sm"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  {t('common.adminPortal')}
                </span>
                {pendingPaymentsCount > 0 && (
                  <span className="bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full text-xs">
                    {pendingPaymentsCount} Pending
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
