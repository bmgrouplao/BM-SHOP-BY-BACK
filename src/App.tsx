import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCards } from './components/CategoryCards';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickAddModal } from './components/QuickAddModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FilterDrawer } from './components/FilterDrawer';
import { OrderTrackingView } from './components/OrderTrackingView';
import { TrustSection } from './components/TrustSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AdminPortal } from './admin/AdminPortal';
import { Product, FilterState, Order } from './types';
import { Filter, ArrowRight, Sparkles, Heart, Search, Check, RefreshCw } from 'lucide-react';
import { sneakersImg, blazerImg } from './data/initialData';

function StoreApp() {
  const {
    products,
    language,
    t,
    fontSize,
    favorites,
    cart
  } = useStore();

  // Navigation State: 'home' | 'shop' | 'favorites' | 'tracking' | 'admin'
  const [currentView, setCurrentView] = useState<string>('home');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
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

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Active generation perspective filter on homepage (Requirement 6 & 21: young / mature)
  const [activePersonaFilter, setActivePersonaFilter] = useState<'all' | 'young' | 'mature'>('all');

  // Navigation Handler
  const handleNavigate = (view: string, filterParams?: any) => {
    setCurrentView(view);
    if (filterParams) {
      setFilters((prev) => ({
        ...prev,
        ...filterParams
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Buy Now trigger from product detail modal
  const handleBuyNow = () => {
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    if (!p.active) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchNameEN = p.nameEN.toLowerCase().includes(q);
      const matchNameLA = p.nameLA.toLowerCase().includes(q);
      const matchSKU = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchSizes = p.sizes.some((s) => s.toLowerCase().includes(q));
      if (!matchNameEN && !matchNameLA && !matchSKU && !matchBrand && !matchCategory && !matchSub && !matchSizes) {
        return false;
      }
    }
    if (filters.gender && p.gender !== filters.gender && p.gender !== 'unisex') {
      return false;
    }
    if (filters.category && p.category !== filters.category) {
      return false;
    }
    if (filters.subcategory && p.subcategory !== filters.subcategory) {
      return false;
    }
    if (filters.brand && p.brand !== filters.brand) {
      return false;
    }
    if (filters.size && !p.sizes.includes(filters.size)) {
      return false;
    }
    if (filters.inStockOnly && !p.inStock) {
      return false;
    }
    if (filters.onSaleOnly && !p.isSale && !p.discountPercent) {
      return false;
    }
    return true;
  });

  // Home curated sections
  const newArrivals = products.filter((p) => p.isNew && p.active).slice(0, 4);
  const popularItems = products.filter((p) => p.isPopular && p.active).slice(0, 4);
  const shoesItems = products.filter((p) => p.category === 'shoes' && p.active).slice(0, 4);
  const clothingItems = products.filter((p) => p.category === 'clothing' && p.active).slice(0, 4);

  // Filtered by persona on homepage
  const personaFilteredProducts = products
    .filter((p) => p.active)
    .filter((p) => {
      if (activePersonaFilter === 'all') return true;
      return p.targetAge === 'all' || p.targetAge === activePersonaFilter;
    })
    .slice(0, 8);

  // If in Admin portal view
  if (currentView === 'admin') {
    return <AdminPortal onBackToStore={() => setCurrentView('home')} />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <Hero onNavigate={handleNavigate} />

            {/* Category Cards (Horizontal scrolling on mobile) */}
            <CategoryCards
              onSelectCategory={(params) => handleNavigate('shop', params)}
            />

            {/* Section: New Arrivals */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                    {language === 'lo' ? 'ຄໍເລັກຊັ່ນລ່າສຸດ' : 'Just Dropped'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                    {t('sections.newArrivals')}
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop', { isNew: true })}
                  className="text-xs sm:text-sm font-bold text-stone-900 hover:text-stone-600 flex items-center gap-1 transition-colors"
                >
                  <span>{language === 'lo' ? 'ເບິ່ງທັງໝົດ' : 'View All'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {newArrivals.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onQuickAdd={(p) => setQuickAddProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Section: Multi-Generation Showcase (Young Adult & Mature Adult Styling) */}
            <section className="py-12 bg-stone-100/60 border-y border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-amber-800 uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('sections.curatedGenerations')}</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                      {language === 'lo' ? 'ສະໄຕລ໌ສຳລັບໄວໜຸ່ມ ແລະ ໄວຜູ້ໃຫຍ່' : 'Curated for Every Age Group'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      {t('sections.curatedSub')}
                    </p>
                  </div>

                  {/* Persona Tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto text-xs font-bold">
                    <button
                      onClick={() => setActivePersonaFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activePersonaFilter === 'all'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {t('common.all')}
                    </button>
                    <button
                      onClick={() => setActivePersonaFilter('young')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activePersonaFilter === 'young'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {language === 'lo' ? 'ໄວໜຸ່ມ (18–35)' : 'Young Adults (18–35)'}
                    </button>
                    <button
                      onClick={() => setActivePersonaFilter('mature')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        activePersonaFilter === 'mature'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {language === 'lo' ? 'ຜູ້ໃຫຍ່ (36–55+)' : 'Mature Adults (36–55+)'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {personaFilteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onQuickAdd={(p) => setQuickAddProduct(p)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Section: Popular Footwear */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                    {language === 'lo' ? 'ເກີບຍອດນິຍົມ' : 'Featured Shoes'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                    {t('sections.shoesCollection')}
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop', { category: 'shoes' })}
                  className="text-xs sm:text-sm font-bold text-stone-900 hover:text-stone-600 flex items-center gap-1 transition-colors"
                >
                  <span>{language === 'lo' ? 'ເບິ່ງເກີບທັງໝົດ' : 'All Shoes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {shoesItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onQuickAdd={(p) => setQuickAddProduct(p)}
                  />
                ))}
              </div>
            </section>

            {/* Trust Section ("Why Shop with BM SHOP?") */}
            <TrustSection />

            {/* Customer Reviews Section */}
            <CustomerReviewsSection />
          </div>
        )}

        {/* VIEW 2: SHOP / CATALOG */}
        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
            {/* Header and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {filters.category === 'shoes'
                    ? t('common.shoes')
                    : filters.category === 'clothing'
                    ? t('common.clothing')
                    : filters.gender === 'men'
                    ? t('common.men')
                    : filters.gender === 'women'
                    ? t('common.women')
                    : language === 'lo'
                    ? 'ສິນຄ້າທັງໝົດ'
                    : 'All Products'}
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t('filter.resultsFound', { count: filteredProducts.length })}
                </p>
              </div>

              {/* Action Buttons: Filter drawer toggle & Quick reset */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Filter className="w-4 h-4" />
                  <span>{t('filter.title')}</span>
                </button>

                {(filters.gender || filters.category || filters.size || filters.onSaleOnly || filters.search) && (
                  <button
                    onClick={() =>
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
                      })
                    }
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('filter.clearAll')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active filter badges / quick chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-stone-500">Quick Filter:</span>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, gender: prev.gender === 'men' ? '' : 'men' }))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  filters.gender === 'men'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                {t('common.men')}
              </button>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, gender: prev.gender === 'women' ? '' : 'women' }))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  filters.gender === 'women'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                {t('common.women')}
              </button>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: prev.category === 'shoes' ? '' : 'shoes' }))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  filters.category === 'shoes'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                {t('common.shoes')}
              </button>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: prev.category === 'clothing' ? '' : 'clothing' }))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  filters.category === 'clothing'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                {t('common.clothing')}
              </button>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, onSaleOnly: !prev.onSaleOnly }))}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  filters.onSaleOnly
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-stone-200 bg-white text-red-700 hover:border-red-400'
                }`}
              >
                {t('common.sale')} (-%)
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-stone-200">
                <Search className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">
                  {language === 'lo' ? 'ບໍ່ພົບສິນຄ້າທີ່ກົງກັບເງື່ອນໄຂ' : 'No products found'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {language === 'lo'
                    ? 'ລອງປ່ຽນຄຳຄົ້ນຫາ ຫຼື ລ້າງຕົວກັ່ນຕອງເພື່ອເບິ່ງສິນຄ້າທັງໝົດ'
                    : 'Try modifying your search query or clearing applied filters'}
                </p>
                <button
                  onClick={() =>
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
                    })
                  }
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
                >
                  {t('filter.clearAll')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onQuickAdd={(p) => setQuickAddProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: FAVORITES */}
        {currentView === 'favorites' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
            <div className="pb-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {t('common.favorites')}
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  {favorites.length} {language === 'lo' ? 'ລາຍການທີ່ບັນທຶກໄວ້' : 'saved items in your browser'}
                </p>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-stone-200">
                <Heart className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">
                  {language === 'lo' ? 'ຍັງບໍ່ມີສິນຄ້າທີ່ບັນທຶກໄວ້' : 'No favorites saved yet'}
                </h3>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
                >
                  {t('cart.startShopping')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products
                  .filter((p) => favorites.includes(p.id))
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onQuickAdd={(p) => setQuickAddProduct(p)}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ORDER TRACKING */}
        {currentView === 'tracking' && <OrderTrackingView />}
      </main>

      {/* Global Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={handleBuyNow}
        />
      )}

      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order: Order) => {
          // Handled inside modal to show success screen
        }}
      />

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        totalMatches={filteredProducts.length}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation (pinned at bottom for mobile touch users) */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
