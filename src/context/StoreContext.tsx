import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Order,
  StoreSettings,
  CustomerReview,
  Language,
  CustomerDeliveryInfo,
  PaymentStatus,
  OrderStatus
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_REVIEWS } from '../data/initialData';
import enTranslations from '../locales/en.json';
import loTranslations from '../locales/lo.json';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  fontSize: 'normal' | 'large';
  setFontSize: (size: 'normal' | 'large') => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  orders: Order[];
  createOrder: (customer: CustomerDeliveryInfo, paymentProofUrl: string) => Order;
  findOrder: (orderNumber: string, phone: string) => Order | undefined;
  verifyPayment: (orderId: string, adminName: string) => void;
  rejectPayment: (orderId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  reviews: CustomerReview[];
  submitReview: (review: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => void;
  approveReview: (reviewId: string) => void;
  adminAuth: {
    isAuthenticated: boolean;
    user: { email: string; name: string } | null;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
  };
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  pendingPaymentsCount: number;
  customTranslations: {
    en: Record<string, string>;
    lo: Record<string, string>;
  };
  updateCustomTranslations: (lang: Language, updates: Record<string, string>) => void;
  resetCustomTranslations: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Generate sample payment slip SVG data URL for demo order
const DEMO_SLIP_DATA_URL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%23FFFFFF"/><rect x="0" y="0" width="400" height="70" fill="%23B91C1C"/><text x="200" y="42" fill="%23FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">BCEL One Transfer Receipt</text><circle cx="200" cy="120" r="32" fill="%2310B981"/><path d="M188 120 L196 128 L214 110" stroke="%23FFFFFF" stroke-width="4" fill="none" stroke-linecap="round"/><text x="200" y="180" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23111827" text-anchor="middle">ໂອນເງິນສຳເລັດ (Successful)</text><text x="200" y="215" font-family="sans-serif" font-size="26" font-weight="bold" fill="%23B91C1C" text-anchor="middle">₭850,000</text><line x1="40" y1="240" x2="360" y2="240" stroke="%23E5E7EB" stroke-width="1"/><text x="40" y="275" font-family="sans-serif" font-size="13" fill="%236B7280">ຜູ້ຮັບໂອນ (Recipient):</text><text x="40" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%23111827">BM SHOP / BOUNMY S.</text><text x="40" y="335" font-family="sans-serif" font-size="13" fill="%236B7280">ເລກບັນຊີ (Account No):</text><text x="40" y="355" font-family="sans-serif" font-size="14" fill="%23111827">010-12-00-01234567-001</text><text x="40" y="395" font-family="sans-serif" font-size="13" fill="%236B7280">ວັນທີ ແລະ ເວລາ (Date &amp; Time):</text><text x="40" y="415" font-family="sans-serif" font-size="14" fill="%23111827">02/10/2026 18:42:15</text><text x="40" y="455" font-family="sans-serif" font-size="13" fill="%236B7280">ເລກອ້າງອີງ (Ref No):</text><text x="40" y="475" font-family="sans-serif" font-size="14" fill="%23111827">TXN20261002998812</text><rect x="40" y="510" width="320" height="50" rx="8" fill="%23F3F4F6"/><text x="200" y="540" font-family="sans-serif" font-size="12" fill="%234B5563" text-anchor="middle">Verified by Banque Pour Le Commerce Exterieur Lao</text></svg>';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'BM-20261002-0001',
    customer: {
      name: 'Somchai Sisavath',
      phone: '02055551234',
      province: 'Vientiane Capital',
      district: 'Sisattanak',
      village: 'Ban Saphanthong Neua',
      address: 'House No. 142, Unit 8, Near Lao-Itecc Mall',
      deliveryNote: 'Please call 10 mins before arrival.',
      gps: { latitude: 17.9542, longitude: 102.6375 }
    },
    items: [
      {
        id: 'shoe-01_White / Cream_42',
        productId: 'shoe-01',
        sku: 'BM-SH-001',
        nameEN: 'Classic Minimal Leather Sneakers',
        nameLA: 'ເກີບຜ້າໃບໜັງແທ້ ຄລາສສິກ',
        image: INITIAL_PRODUCTS[0].mainImage,
        color: 'White / Cream',
        size: '42',
        quantity: 1,
        price: 850000,
        maxStock: 10
      }
    ],
    subtotal: 850000,
    deliveryFee: 0,
    total: 850000,
    paymentMethod: 'qr',
    paymentProofUrl: DEMO_SLIP_DATA_URL,
    paymentStatus: 'pending_verification',
    orderStatus: 'waiting_payment',
    createdAt: '2026-10-02T17:45:00.000Z',
    updatedAt: '2026-10-02T17:45:00.000Z'
  },
  {
    id: 'ord-002',
    orderNumber: 'BM-20261002-0002',
    customer: {
      name: 'Noy Vongphachanh',
      phone: '02077889900',
      province: 'Vientiane Capital',
      district: 'Chanthabouly',
      village: 'Ban Sihom',
      address: 'Near Wat Sihom, Blue Gate',
      gps: { latitude: 17.9688, longitude: 102.6074 }
    },
    items: [
      {
        id: 'cloth-01_Warm Oat Beige_M',
        productId: 'cloth-01',
        sku: 'BM-CL-001',
        nameEN: 'Tailored Relaxed Linen Blazer',
        nameLA: 'ເສື້ອສູດຜ້າລິນິນ ຊົງທັນສະໄໝ ໃສ່ສະບາຍ',
        image: INITIAL_PRODUCTS[10].mainImage,
        color: 'Warm Oat Beige',
        size: 'M',
        quantity: 1,
        price: 950000,
        maxStock: 8
      }
    ],
    subtotal: 950000,
    deliveryFee: 0,
    total: 950000,
    paymentMethod: 'qr',
    paymentProofUrl: DEMO_SLIP_DATA_URL,
    paymentStatus: 'pending_verification',
    orderStatus: 'waiting_payment',
    createdAt: '2026-10-02T18:10:00.000Z',
    updatedAt: '2026-10-02T18:10:00.000Z'
  },
  {
    id: 'ord-003',
    orderNumber: 'BM-20261001-0042',
    customer: {
      name: 'Keo Mani',
      phone: '02099112233',
      province: 'Luang Prabang',
      district: 'Luang Prabang',
      village: 'Ban Wat That',
      address: 'Behind Night Market, Villa Keo'
    },
    items: [
      {
        id: 'shoe-02_Espresso Brown_42',
        productId: 'shoe-02',
        sku: 'BM-SH-002',
        nameEN: 'Handcrafted Heritage Leather Penny Loafers',
        nameLA: 'ເກີບໜັງໂລບເຟີ ແຮນເມດ ຄຸນນະພາບສູງ',
        image: INITIAL_PRODUCTS[1].mainImage,
        color: 'Espresso Brown',
        size: '42',
        quantity: 1,
        price: 1150000,
        maxStock: 7
      }
    ],
    subtotal: 1150000,
    deliveryFee: 0,
    total: 1150000,
    paymentMethod: 'qr',
    paymentProofUrl: DEMO_SLIP_DATA_URL,
    paymentStatus: 'verified',
    orderStatus: 'out_for_delivery',
    verification: {
      verifiedBy: 'Admin Bounmy',
      verifiedAt: '2026-10-01T15:30:00.000Z'
    },
    createdAt: '2026-10-01T14:20:00.000Z',
    updatedAt: '2026-10-01T15:30:00.000Z'
  }
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bm_shop_lang');
    return saved === 'en' ? 'en' : 'lo';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bm_shop_lang', lang);
    document.documentElement.lang = lang;
  };

  // 2. Font Size scaler for middle-aged adults accessibility
  const [fontSize, setFontSizeState] = useState<'normal' | 'large'>(() => {
    const saved = localStorage.getItem('bm_shop_font_size');
    return saved === 'large' ? 'large' : 'normal';
  });

  const setFontSize = (size: 'normal' | 'large') => {
    setFontSizeState(size);
    localStorage.setItem('bm_shop_font_size', size);
  };

  // 3. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bm_shop_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_products', JSON.stringify(products));
  }, [products]);

  // 4. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bm_shop_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved cart', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_cart', JSON.stringify(cart));
  }, [cart]);

  // 5. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('bm_shop_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved favorites', e);
      }
    }
    return ['shoe-01', 'cloth-01'];
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 6. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bm_shop_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return INITIAL_DEMO_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_orders', JSON.stringify(orders));
  }, [orders]);

  // 7. Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('bm_shop_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
    return INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_settings', JSON.stringify(settings));
  }, [settings]);

  // 8. Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('bm_shop_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reviews', e);
      }
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('bm_shop_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // 9. Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bm_admin_session') === 'true';
  });

  const adminAuth = {
    isAuthenticated: isAdminAuthenticated,
    user: isAdminAuthenticated ? { email: 'admin@bmshop.la', name: 'BM Shop Admin' } : null,
    login: (email: string, pass: string) => {
      // Validate credentials
      if ((email === 'admin@bmshop.la' || email === 'bmshopbyback@gmail.com') && (pass === 'bmshop2026' || pass === 'admin123')) {
        setIsAdminAuthenticated(true);
        localStorage.setItem('bm_admin_session', 'true');
        return true;
      }
      return false;
    },
    logout: () => {
      setIsAdminAuthenticated(false);
      localStorage.removeItem('bm_admin_session');
    }
  };

  // 10. Custom Wording / Translation Overrides (Allows Admin to reconfigure any text in any tab)
  const [customTranslations, setCustomTranslations] = useState<{
    en: Record<string, string>;
    lo: Record<string, string>;
  }>(() => {
    const saved = localStorage.getItem('bm_custom_translations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse custom translations', e);
      }
    }
    return { en: {}, lo: {} };
  });

  const updateCustomTranslations = (lang: Language, updates: Record<string, string>) => {
    setCustomTranslations((prev) => {
      const next = {
        ...prev,
        [lang]: {
          ...prev[lang],
          ...updates
        }
      };
      localStorage.setItem('bm_custom_translations', JSON.stringify(next));
      return next;
    });
  };

  const resetCustomTranslations = () => {
    const empty = { en: {}, lo: {} };
    setCustomTranslations(empty);
    localStorage.removeItem('bm_custom_translations');
  };

  // Translation helper
  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    // 1. Check custom overrides first
    if (customTranslations[language]?.[keyPath] !== undefined && customTranslations[language][keyPath] !== '') {
      let result = customTranslations[language][keyPath];
      if (params) {
        Object.entries(params).forEach(([paramKey, val]) => {
          result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
        });
      }
      return result;
    }

    const translations = language === 'en' ? enTranslations : loTranslations;
    const parts = keyPath.split('.');
    let current: any = translations;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return keyPath; // fallback
      }
    }

    if (typeof current !== 'string') return keyPath;

    let result = current;
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }
    return result;
  };

  // Cart operations
  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    const itemId = `${product.id}_${color}_${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      const variant = product.variants.find((v) => v.color === color && v.size === size);
      const maxStock = variant ? variant.stock : 10;

      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item));
      }

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        sku: product.sku,
        nameEN: product.nameEN,
        nameLA: product.nameLA,
        image: product.mainImage,
        color,
        size,
        quantity: Math.min(quantity, maxStock),
        price: product.price,
        maxStock
      };

      return [...prev, newItem];
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.min(quantity, item.maxStock) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal >= settings.freeDeliveryThreshold || cartSubtotal === 0 ? 0 : settings.fixedDeliveryFee;
  const cartTotal = cartSubtotal + deliveryFee;

  // Create Order
  const createOrder = (customer: CustomerDeliveryInfo, paymentProofUrl: string): Order => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSeq = String(orders.length + 1).padStart(4, '0');
    const orderNumber = `BM-${todayStr}-${randomSeq}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      paymentMethod: 'qr',
      paymentProofUrl,
      paymentStatus: 'pending_verification',
      orderStatus: 'waiting_payment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Inventory reservation/deduction
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedForThisProd = cart.filter((item) => item.productId === prod.id);
        if (orderedForThisProd.length === 0) return prod;

        const updatedVariants = prod.variants.map((v) => {
          const match = orderedForThisProd.find((item) => item.color === v.color && item.size === v.size);
          if (match) {
            const newStock = Math.max(0, v.stock - match.quantity);
            return { ...v, stock: newStock };
          }
          return v;
        });

        const totalStock = updatedVariants.reduce((s, v) => s + v.stock, 0);
        return {
          ...prod,
          variants: updatedVariants,
          inStock: totalStock > 0
        };
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const findOrder = (orderNumber: string, phone: string): Order | undefined => {
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return orders.find(
      (ord) =>
        ord.orderNumber.toUpperCase() === cleanNum &&
        ord.customer.phone.replace(/[^0-9]/g, '').includes(cleanPhone.slice(-7))
    );
  };

  const verifyPayment = (orderId: string, adminName: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus: 'verified' as PaymentStatus,
            orderStatus: 'confirmed' as OrderStatus,
            verification: {
              verifiedBy: adminName,
              verifiedAt: new Date().toISOString(),
              adminNote: 'Payment receipt confirmed via BCEL One.'
            },
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
  };

  const rejectPayment = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus: 'not_confirmed' as PaymentStatus,
            verification: {
              verifiedBy: 'BM Admin',
              verifiedAt: new Date().toISOString(),
              adminNote: reason
            },
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status, updatedAt: new Date().toISOString() } : ord))
    );
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const submitReview = (reviewData: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => {
    const newRev: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      approved: false // requires admin approval
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const approveReview = (reviewId: string) => {
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, approved: true } : r)));
  };

  const pendingPaymentsCount = orders.filter((o) => o.paymentStatus === 'pending_verification').length;

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        fontSize,
        setFontSize,
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        orders,
        createOrder,
        findOrder,
        verifyPayment,
        rejectPayment,
        updateOrderStatus,
        settings,
        updateSettings,
        reviews,
        submitReview,
        approveReview,
        adminAuth,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        pendingPaymentsCount,
        customTranslations,
        updateCustomTranslations,
        resetCustomTranslations
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
