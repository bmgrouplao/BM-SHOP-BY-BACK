import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  Sparkles,
  Type,
  Layout,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  PackageCheck,
  MessageSquare,
  Plus,
  Trash2,
  ListFilter,
  Check,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import enDefaults from '../locales/en.json';
import loDefaults from '../locales/lo.json';

interface EditableItem {
  key: string;
  category: string;
  categoryLabel: string;
  label: string;
  description?: string;
  defaultEN: string;
  defaultLA: string;
  multiline?: boolean;
}

const EDITABLE_FIELDS: EditableItem[] = [
  // 1. HERO SECTION
  {
    key: 'hero.kicker',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Hero Top Badge (Kicker)',
    description: 'Prominent badge at the very top of hero banner',
    defaultEN: enDefaults.hero.kicker,
    defaultLA: loDefaults.hero.kicker
  },
  {
    key: 'hero.headline',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Main Headline',
    description: 'Prominent headline on the homepage hero banner',
    defaultEN: enDefaults.hero.headline,
    defaultLA: loDefaults.hero.headline
  },
  {
    key: 'hero.subheading',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Hero Subheading',
    description: 'Supporting tagline under the main headline',
    defaultEN: enDefaults.hero.subheading,
    defaultLA: loDefaults.hero.subheading
  },
  {
    key: 'hero.shopMen',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Shop Men Button',
    description: 'Primary button text in hero banner',
    defaultEN: enDefaults.hero.shopMen,
    defaultLA: loDefaults.hero.shopMen
  },
  {
    key: 'hero.shopWomen',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Shop Women Button',
    description: 'Secondary button text in hero banner',
    defaultEN: enDefaults.hero.shopWomen,
    defaultLA: loDefaults.hero.shopWomen
  },
  {
    key: 'hero.propQuality',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Trust Bullet 1 (Quality)',
    description: 'Quality guarantee checkmark in hero',
    defaultEN: enDefaults.hero.propQuality,
    defaultLA: loDefaults.hero.propQuality
  },
  {
    key: 'hero.propPayment',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Trust Bullet 2 (Payment)',
    description: 'Payment checkmark in hero',
    defaultEN: enDefaults.hero.propPayment,
    defaultLA: loDefaults.hero.propPayment
  },
  {
    key: 'hero.propNoLogin',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Trust Bullet 3 (No Login)',
    description: 'Guest checkout checkmark in hero',
    defaultEN: enDefaults.hero.propNoLogin,
    defaultLA: loDefaults.hero.propNoLogin
  },
  {
    key: 'hero.propShipping',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Trust Bullet 4 (Delivery)',
    description: 'Nationwide delivery checkmark in hero',
    defaultEN: enDefaults.hero.propShipping,
    defaultLA: loDefaults.hero.propShipping
  },
  {
    key: 'hero.bannerTitle',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Floating Card Title',
    description: 'Title on the overlay card over the hero image',
    defaultEN: enDefaults.hero.bannerTitle,
    defaultLA: loDefaults.hero.bannerTitle
  },
  {
    key: 'hero.bannerSubtitle',
    category: 'hero',
    categoryLabel: 'Hero Section',
    label: 'Floating Card Subtitle',
    description: 'Subtitle on the overlay card over the hero image',
    defaultEN: enDefaults.hero.bannerSubtitle,
    defaultLA: loDefaults.hero.bannerSubtitle
  },

  // 2. NAVIGATION & TABS
  {
    key: 'common.shopName',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Shop Brand Name',
    description: 'Header logo text',
    defaultEN: enDefaults.common.shopName,
    defaultLA: loDefaults.common.shopName
  },
  {
    key: 'common.tagline',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Shop Sub-tagline',
    description: 'Sub-tagline under brand logo',
    defaultEN: enDefaults.common.tagline,
    defaultLA: loDefaults.common.tagline
  },
  {
    key: 'nav.home',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Home Tab',
    description: 'Navigation link for Home page',
    defaultEN: enDefaults.nav.home,
    defaultLA: loDefaults.nav.home
  },
  {
    key: 'common.men',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Men Department Tab',
    description: 'Header link & filter label for Men',
    defaultEN: enDefaults.common.men,
    defaultLA: loDefaults.common.men
  },
  {
    key: 'common.women',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Women Department Tab',
    description: 'Header link & filter label for Women',
    defaultEN: enDefaults.common.women,
    defaultLA: loDefaults.common.women
  },
  {
    key: 'common.shoes',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Shoes Category Tab',
    description: 'Header link & filter label for Shoes',
    defaultEN: enDefaults.common.shoes,
    defaultLA: loDefaults.common.shoes
  },
  {
    key: 'common.clothing',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Clothing Category Tab',
    description: 'Header link & filter label for Clothing',
    defaultEN: enDefaults.common.clothing,
    defaultLA: loDefaults.common.clothing
  },
  {
    key: 'nav.newArrivals',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'New Arrivals Tab',
    description: 'Header link for New Arrivals',
    defaultEN: enDefaults.nav.newArrivals,
    defaultLA: loDefaults.nav.newArrivals
  },
  {
    key: 'common.sale',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Sale Badge / Tab',
    description: 'Promotional sale button and filter label',
    defaultEN: enDefaults.common.sale,
    defaultLA: loDefaults.common.sale
  },
  {
    key: 'common.trackOrder',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Track Order Link',
    description: 'Header and mobile link for order lookup',
    defaultEN: enDefaults.common.trackOrder,
    defaultLA: loDefaults.common.trackOrder
  },
  {
    key: 'common.cart',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Cart Button Label',
    description: 'Header cart button and mobile nav label',
    defaultEN: enDefaults.common.cart,
    defaultLA: loDefaults.common.cart
  },
  {
    key: 'common.searchPlaceholder',
    category: 'navigation',
    categoryLabel: 'Navigation & Tabs',
    label: 'Search Input Placeholder',
    description: 'Text inside header search input',
    defaultEN: enDefaults.common.searchPlaceholder,
    defaultLA: loDefaults.common.searchPlaceholder
  },

  // 3. CATEGORIES & HOMEPAGE SECTIONS
  {
    key: 'categories.title',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Category Section Title',
    description: 'Main heading above category cards',
    defaultEN: enDefaults.categories.title,
    defaultLA: loDefaults.categories.title
  },
  {
    key: 'categories.menTitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Men Card Title',
    description: 'Title on Men category card',
    defaultEN: enDefaults.categories.menTitle,
    defaultLA: loDefaults.categories.menTitle
  },
  {
    key: 'categories.menSubtitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Men Card Subtitle',
    description: 'Short description on Men card',
    defaultEN: enDefaults.categories.menSubtitle,
    defaultLA: loDefaults.categories.menSubtitle
  },
  {
    key: 'categories.womenTitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Women Card Title',
    description: 'Title on Women category card',
    defaultEN: enDefaults.categories.womenTitle,
    defaultLA: loDefaults.categories.womenTitle
  },
  {
    key: 'categories.womenSubtitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Women Card Subtitle',
    description: 'Short description on Women card',
    defaultEN: enDefaults.categories.womenSubtitle,
    defaultLA: loDefaults.categories.womenSubtitle
  },
  {
    key: 'categories.shoesTitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Shoes Card Title',
    description: 'Title on Shoes category card',
    defaultEN: enDefaults.categories.shoesTitle,
    defaultLA: loDefaults.categories.shoesTitle
  },
  {
    key: 'categories.shoesSubtitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Shoes Card Subtitle',
    description: 'Short description on Shoes card',
    defaultEN: enDefaults.categories.shoesSubtitle,
    defaultLA: loDefaults.categories.shoesSubtitle
  },
  {
    key: 'categories.clothingTitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Clothing Card Title',
    description: 'Title on Clothing category card',
    defaultEN: enDefaults.categories.clothingTitle,
    defaultLA: loDefaults.categories.clothingTitle
  },
  {
    key: 'categories.clothingSubtitle',
    category: 'categories',
    categoryLabel: 'Categories & Cards',
    label: 'Clothing Card Subtitle',
    description: 'Short description on Clothing card',
    defaultEN: enDefaults.categories.clothingSubtitle,
    defaultLA: loDefaults.categories.clothingSubtitle
  },

  // 4. STORE SECTIONS & HEADLINES
  {
    key: 'sections.newArrivals',
    category: 'sections',
    categoryLabel: 'Store Collections',
    label: 'New Arrivals Heading',
    description: 'Section title for new products',
    defaultEN: enDefaults.sections.newArrivals,
    defaultLA: loDefaults.sections.newArrivals
  },
  {
    key: 'sections.popularProducts',
    category: 'sections',
    categoryLabel: 'Store Collections',
    label: 'Popular Products Heading',
    description: 'Section title for best sellers',
    defaultEN: enDefaults.sections.popularProducts,
    defaultLA: loDefaults.sections.popularProducts
  },
  {
    key: 'sections.curatedGenerations',
    category: 'sections',
    categoryLabel: 'Store Collections',
    label: 'Universal Generations Heading',
    description: 'Inclusive style section title',
    defaultEN: enDefaults.sections.curatedGenerations,
    defaultLA: loDefaults.sections.curatedGenerations
  },
  {
    key: 'sections.curatedSub',
    category: 'sections',
    categoryLabel: 'Store Collections',
    label: 'Universal Generations Subtitle',
    description: 'Explanation of fashion for all ages',
    defaultEN: enDefaults.sections.curatedSub,
    defaultLA: loDefaults.sections.curatedSub
  },

  // 5. PRODUCT DETAILS & SIZING
  {
    key: 'product.selectSize',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Select Size Label',
    description: 'Label above size options',
    defaultEN: enDefaults.product.selectSize,
    defaultLA: loDefaults.product.selectSize
  },
  {
    key: 'product.selectColor',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Select Color Label',
    description: 'Label above color swatches',
    defaultEN: enDefaults.product.selectColor,
    defaultLA: loDefaults.product.selectColor
  },
  {
    key: 'product.addToCart',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Add to Cart Button',
    description: 'Primary button in product view and quick add',
    defaultEN: enDefaults.product.addToCart,
    defaultLA: loDefaults.product.addToCart
  },
  {
    key: 'product.buyNow',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Buy Now Button',
    description: 'Direct checkout action button',
    defaultEN: enDefaults.product.buyNow,
    defaultLA: loDefaults.product.buyNow
  },
  {
    key: 'common.inStock',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'In Stock Badge',
    description: 'Indicator when sizes/items are available',
    defaultEN: enDefaults.common.inStock,
    defaultLA: loDefaults.common.inStock
  },
  {
    key: 'common.outOfStock',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Out of Stock Badge',
    description: 'Indicator when item or size is sold out',
    defaultEN: enDefaults.common.outOfStock,
    defaultLA: loDefaults.common.outOfStock
  },
  {
    key: 'common.viewDetails',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'View Details Button',
    description: 'Product card action button to open gallery',
    defaultEN: enDefaults.common.viewDetails,
    defaultLA: loDefaults.common.viewDetails
  },
  {
    key: 'product.deliveryDetail',
    category: 'product',
    categoryLabel: 'Product & Sizing',
    label: 'Delivery & Shipping Details',
    description: 'Delivery timeline text in product details',
    defaultEN: enDefaults.product.deliveryDetail,
    defaultLA: loDefaults.product.deliveryDetail,
    multiline: true
  },

  // 6. CART & BAG
  {
    key: 'cart.title',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Cart Drawer Title',
    description: 'Header title on the shopping cart drawer',
    defaultEN: enDefaults.cart.title,
    defaultLA: loDefaults.cart.title
  },
  {
    key: 'cart.empty',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Empty Cart Message',
    description: 'Text shown when cart has no items',
    defaultEN: enDefaults.cart.empty,
    defaultLA: loDefaults.cart.empty
  },
  {
    key: 'cart.subtotal',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Cart Subtotal Label',
    description: 'Subtotal calculation row',
    defaultEN: enDefaults.cart.subtotal,
    defaultLA: loDefaults.cart.subtotal
  },
  {
    key: 'cart.deliveryFee',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Delivery Fee Label',
    description: 'Shipping fee row in cart and checkout',
    defaultEN: enDefaults.cart.deliveryFee,
    defaultLA: loDefaults.cart.deliveryFee
  },
  {
    key: 'cart.total',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Total Label',
    description: 'Grand total calculation row',
    defaultEN: enDefaults.cart.total,
    defaultLA: loDefaults.cart.total
  },
  {
    key: 'common.freeDelivery',
    category: 'cart',
    categoryLabel: 'Cart & Bag',
    label: 'Free Delivery Offer Banner',
    description: 'Top banner notifying about free delivery',
    defaultEN: enDefaults.common.freeDelivery,
    defaultLA: loDefaults.common.freeDelivery
  },

  // 7. CHECKOUT & PAYMENT SAFETY
  {
    key: 'checkout.safetyNotice',
    category: 'checkout',
    categoryLabel: 'Checkout & QR Safety',
    label: 'Payment Safety Warning Notice',
    description: 'Warning notice to verify account name before paying',
    defaultEN: enDefaults.checkout.safetyNotice,
    defaultLA: loDefaults.checkout.safetyNotice,
    multiline: true
  },
  {
    key: 'checkout.paymentTitle',
    category: 'checkout',
    categoryLabel: 'Checkout & QR Safety',
    label: 'QR Payment Screen Title',
    description: 'Heading on payment QR screen',
    defaultEN: enDefaults.checkout.paymentTitle,
    defaultLA: loDefaults.checkout.paymentTitle
  },
  {
    key: 'checkout.stepInstruction',
    category: 'checkout',
    categoryLabel: 'Checkout & QR Safety',
    label: 'Payment Steps Instruction',
    description: 'Step-by-step guidance on how to scan and transfer',
    defaultEN: enDefaults.checkout.stepInstruction,
    defaultLA: loDefaults.checkout.stepInstruction,
    multiline: true
  },
  {
    key: 'checkout.uploadProofTitle',
    category: 'checkout',
    categoryLabel: 'Checkout & QR Safety',
    label: 'Upload Payment Proof Heading',
    description: 'Heading on slip upload area',
    defaultEN: enDefaults.checkout.uploadProofTitle,
    defaultLA: loDefaults.checkout.uploadProofTitle
  },
  {
    key: 'checkout.submitOrder',
    category: 'checkout',
    categoryLabel: 'Checkout & QR Safety',
    label: 'Submit Order Button',
    description: 'Final button to confirm order placement',
    defaultEN: enDefaults.checkout.submitOrder,
    defaultLA: loDefaults.checkout.submitOrder
  },

  // 8. ORDER TRACKING & TIMELINE
  {
    key: 'tracking.title',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Tracking Page Title',
    description: 'Main heading on Track Order page',
    defaultEN: enDefaults.tracking.title,
    defaultLA: loDefaults.tracking.title
  },
  {
    key: 'tracking.subtitle',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Tracking Subtitle',
    description: 'Instructional text for order lookup',
    defaultEN: enDefaults.tracking.subtitle,
    defaultLA: loDefaults.tracking.subtitle
  },
  {
    key: 'tracking.statusSubmitted',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Order Submitted',
    description: 'Timeline step 1',
    defaultEN: enDefaults.tracking.statusSubmitted,
    defaultLA: loDefaults.tracking.statusSubmitted
  },
  {
    key: 'tracking.statusPaymentVerified',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Payment Verified',
    description: 'Timeline step 2',
    defaultEN: enDefaults.tracking.statusPaymentVerified,
    defaultLA: loDefaults.tracking.statusPaymentVerified
  },
  {
    key: 'tracking.statusConfirmed',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Order Confirmed',
    description: 'Timeline step 3',
    defaultEN: enDefaults.tracking.statusConfirmed,
    defaultLA: loDefaults.tracking.statusConfirmed
  },
  {
    key: 'tracking.statusPreparing',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Preparing Order',
    description: 'Timeline step 4',
    defaultEN: enDefaults.tracking.statusPreparing,
    defaultLA: loDefaults.tracking.statusPreparing
  },
  {
    key: 'tracking.statusReady',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Ready for Delivery',
    description: 'Timeline step 5',
    defaultEN: enDefaults.tracking.statusReady,
    defaultLA: loDefaults.tracking.statusReady
  },
  {
    key: 'tracking.statusOut',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Out for Delivery',
    description: 'Timeline step 6',
    defaultEN: enDefaults.tracking.statusOut,
    defaultLA: loDefaults.tracking.statusOut
  },
  {
    key: 'tracking.statusDelivered',
    category: 'tracking',
    categoryLabel: 'Order Tracking & Statuses',
    label: 'Status: Delivered',
    description: 'Timeline step 7',
    defaultEN: enDefaults.tracking.statusDelivered,
    defaultLA: loDefaults.tracking.statusDelivered
  },

  // 9. TRUST SECTION
  {
    key: 'trust.title',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Section Title',
    description: 'Headline for "Why Shop with BM SHOP?"',
    defaultEN: enDefaults.trust.title,
    defaultLA: loDefaults.trust.title
  },
  {
    key: 'trust.subtitle',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Section Subtitle',
    description: 'Subheading for trust benefits',
    defaultEN: enDefaults.trust.subtitle,
    defaultLA: loDefaults.trust.subtitle
  },
  {
    key: 'trust.item1',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Item 1 (Quality Inspection)',
    description: 'Quality guarantee point',
    defaultEN: enDefaults.trust.item1,
    defaultLA: loDefaults.trust.item1
  },
  {
    key: 'trust.item2',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Item 2 (No Registration)',
    description: 'Easy order point',
    defaultEN: enDefaults.trust.item2,
    defaultLA: loDefaults.trust.item2
  },
  {
    key: 'trust.item3',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Item 3 (QR BCEL One)',
    description: 'Secure payment point',
    defaultEN: enDefaults.trust.item3,
    defaultLA: loDefaults.trust.item3
  },
  {
    key: 'trust.item4',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Item 4 (Nationwide Shipping)',
    description: 'Fast delivery point',
    defaultEN: enDefaults.trust.item4,
    defaultLA: loDefaults.trust.item4
  },
  {
    key: 'trust.item5',
    category: 'trust',
    categoryLabel: 'Trust Section',
    label: 'Trust Item 5 (Lao Customer Care)',
    description: 'Customer service point',
    defaultEN: enDefaults.trust.item5,
    defaultLA: loDefaults.trust.item5
  },

  // 10. REVIEWS & TESTIMONIALS
  {
    key: 'reviews.title',
    category: 'reviews',
    categoryLabel: 'Customer Reviews',
    label: 'Reviews Section Title',
    description: 'Headline for customer reviews',
    defaultEN: enDefaults.reviews.title,
    defaultLA: loDefaults.reviews.title
  },
  {
    key: 'reviews.subtitle',
    category: 'reviews',
    categoryLabel: 'Customer Reviews',
    label: 'Reviews Subtitle',
    description: 'Subheading for customer reviews',
    defaultEN: enDefaults.reviews.subtitle,
    defaultLA: loDefaults.reviews.subtitle
  },
  {
    key: 'reviews.leaveReview',
    category: 'reviews',
    categoryLabel: 'Customer Reviews',
    label: 'Write Review Button',
    description: 'Button allowing customers to submit a review',
    defaultEN: enDefaults.reviews.leaveReview,
    defaultLA: loDefaults.reviews.leaveReview
  },

  // 11. FOOTER & ABOUT
  {
    key: 'footer.about',
    category: 'footer',
    categoryLabel: 'Footer & Support',
    label: 'About BM SHOP in Footer',
    description: 'Brand description paragraph in footer',
    defaultEN: enDefaults.footer.about,
    defaultLA: loDefaults.footer.about,
    multiline: true
  },
  {
    key: 'footer.customerService',
    category: 'footer',
    categoryLabel: 'Footer & Support',
    label: 'Customer Service Heading',
    description: 'Heading in footer',
    defaultEN: enDefaults.footer.customerService,
    defaultLA: loDefaults.footer.customerService
  },
  {
    key: 'footer.rights',
    category: 'footer',
    categoryLabel: 'Footer & Support',
    label: 'Copyright Notice',
    description: 'Copyright statement at bottom of website',
    defaultEN: enDefaults.footer.rights,
    defaultLA: loDefaults.footer.rights
  }
];

export const WordingEditor: React.FC = () => {
  const { customTranslations, updateCustomTranslations, resetCustomTranslations } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedToast, setSavedToast] = useState<boolean>(false);

  // Custom key adder modal state
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [customKeyInput, setCustomKeyInput] = useState<string>('');
  const [customLabelInput, setCustomLabelInput] = useState<string>('');
  const [customLAInput, setCustomLAInput] = useState<string>('');
  const [customENInput, setCustomENInput] = useState<string>('');

  // Draft local edits state: { en: { [key]: value }, lo: { [key]: value } }
  const [draftLA, setDraftLA] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    EDITABLE_FIELDS.forEach((item) => {
      initial[item.key] = customTranslations.lo[item.key] ?? item.defaultLA;
    });
    // Add any existing custom keys from storage
    Object.entries(customTranslations.lo || {}).forEach(([k, v]) => {
      initial[k] = v;
    });
    return initial;
  });

  const [draftEN, setDraftEN] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    EDITABLE_FIELDS.forEach((item) => {
      initial[item.key] = customTranslations.en[item.key] ?? item.defaultEN;
    });
    // Add any existing custom keys from storage
    Object.entries(customTranslations.en || {}).forEach(([k, v]) => {
      initial[k] = v;
    });
    return initial;
  });

  // Track dynamically added keys
  const [dynamicKeys, setDynamicKeys] = useState<Array<{ key: string; label: string }>>(() => {
    const existingDynamic: Array<{ key: string; label: string }> = [];
    const standardKeys = new Set(EDITABLE_FIELDS.map((f) => f.key));
    Object.keys(customTranslations.lo || {}).forEach((k) => {
      if (!standardKeys.has(k)) {
        existingDynamic.push({ key: k, label: k });
      }
    });
    return existingDynamic;
  });

  // All combined items
  const allItems: EditableItem[] = [
    ...EDITABLE_FIELDS,
    ...dynamicKeys.map((dyn) => ({
      key: dyn.key,
      category: 'custom',
      categoryLabel: 'Custom Wording',
      label: dyn.label,
      description: `Custom wording key: ${dyn.key}`,
      defaultEN: '',
      defaultLA: '',
      multiline: true
    }))
  ];

  // Filter items
  const filteredItems = allItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchLabel = item.label.toLowerCase().includes(q);
      const matchKey = item.key.toLowerCase().includes(q);
      const matchLA = (draftLA[item.key] || item.defaultLA).toLowerCase().includes(q);
      const matchEN = (draftEN[item.key] || item.defaultEN).toLowerCase().includes(q);
      if (!matchLabel && !matchKey && !matchLA && !matchEN) return false;
    }
    return true;
  });

  const handleSave = () => {
    updateCustomTranslations('lo', draftLA);
    updateCustomTranslations('en', draftEN);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleResetSingle = (key: string) => {
    const target = allItems.find((i) => i.key === key);
    if (!target) return;
    setDraftLA((prev) => ({ ...prev, [key]: target.defaultLA }));
    setDraftEN((prev) => ({ ...prev, [key]: target.defaultEN }));
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all wording and sentences back to default?')) {
      resetCustomTranslations();
      const freshLA: Record<string, string> = {};
      const freshEN: Record<string, string> = {};
      EDITABLE_FIELDS.forEach((item) => {
        freshLA[item.key] = item.defaultLA;
        freshEN[item.key] = item.defaultEN;
      });
      setDraftLA(freshLA);
      setDraftEN(freshEN);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    }
  };

  const handleAddCustomKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = customKeyInput.trim();
    if (!cleanKey) return;

    setDynamicKeys((prev) => [...prev, { key: cleanKey, label: customLabelInput.trim() || cleanKey }]);
    setDraftLA((prev) => ({ ...prev, [cleanKey]: customLAInput.trim() }));
    setDraftEN((prev) => ({ ...prev, [cleanKey]: customENInput.trim() }));

    // Reset inputs
    setCustomKeyInput('');
    setCustomLabelInput('');
    setCustomLAInput('');
    setCustomENInput('');
    setShowAddCustomModal(false);

    // Save immediately
    updateCustomTranslations('lo', { [cleanKey]: customLAInput.trim() });
    updateCustomTranslations('en', { [cleanKey]: customENInput.trim() });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const categories = [
    { id: 'all', label: 'All Tabs & Wording (ທັງໝົດ)', icon: Layout },
    { id: 'navigation', label: 'Header & Tabs (ແຖບເມນູ)', icon: Type },
    { id: 'hero', label: 'Hero Banner (ແບນເນີຫຼັກ)', icon: Sparkles },
    { id: 'categories', label: 'Category Cards (ບັດໝວດໝູ່)', icon: ShoppingBag },
    { id: 'sections', label: 'Store Collections (ຄໍເລັກຊັ່ນ)', icon: ListFilter },
    { id: 'product', label: 'Product & Sizing (ສິນຄ້າ & ຂະໜາດ)', icon: Tag },
    { id: 'cart', label: 'Cart & Bag (ກະຕ່າສິນຄ້າ)', icon: ShoppingBag },
    { id: 'checkout', label: 'Checkout & QR Safety (ການຊຳລະເງິນ)', icon: CreditCard },
    { id: 'tracking', label: 'Order Tracking (ຕິດຕາມອໍເດີ)', icon: PackageCheck },
    { id: 'trust', label: 'Trust Section (ເຫດຜົນທີ່ຄວນຊື້)', icon: ShieldCheck },
    { id: 'reviews', label: 'Customer Reviews (ຣີວິວ)', icon: MessageSquare },
    { id: 'footer', label: 'Footer & Contacts (ສ່ວນທ້າຍ)', icon: MessageSquare },
    { id: 'custom', label: 'Custom Added (ກຳນົດເອງ)', icon: Plus }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Wording & Sentences Editor (ປັບແຕ່ງຂໍ້ຄວາມທຸກແຖບ)
          </h1>
          <p className="text-xs text-stone-500">
            Reconfigure any wording, button text, sentence, or warning across all tabs in both Lao and English
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAddCustomModal(true)}
            className="px-4 py-2.5 bg-stone-900 text-white hover:bg-stone-800 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Sentence</span>
          </button>

          <button
            onClick={handleResetAll}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {savedToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            ✓ Changes saved! All customized wording and sentences are now live in the store.
          </span>
        </div>
      )}

      {/* Category Tabs & Quick Search */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any sentence, word, or tab label (e.g. ແຟຊັ່ນ, Safety, Style, ຈັດສົ່ງ, ຂະໜາດ)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>
      </div>

      {/* Editable Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const valLA = draftLA[item.key] ?? item.defaultLA;
          const valEN = draftEN[item.key] ?? item.defaultEN;
          const isModified = valLA !== item.defaultLA || valEN !== item.defaultEN;

          return (
            <div
              key={item.key}
              className={`bg-white p-5 rounded-3xl border transition-all ${
                isModified ? 'border-amber-400 ring-2 ring-amber-100 shadow-xs' : 'border-stone-200 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-stone-900 text-sm">{item.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-500">
                      {item.key}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {item.categoryLabel}
                    </span>
                    {isModified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        Customized
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-stone-500 mt-0.5">{item.description}</p>
                  )}
                </div>

                {isModified && (
                  <button
                    onClick={() => handleResetSingle(item.key)}
                    className="text-[11px] font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-1 self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset this sentence</span>
                  </button>
                )}
              </div>

              {/* Lao and English Side-by-side inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 text-xs">
                {/* Lao Input with Lao flag */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800">
                    <svg className="w-4 h-3 rounded-2xs overflow-hidden shadow-2xs border border-black/10" viewBox="0 0 600 400">
                      <rect width="600" height="400" fill="#CE1126" />
                      <rect y="100" width="600" height="200" fill="#002868" />
                      <circle cx="300" cy="200" r="80" fill="#FFFFFF" />
                    </svg>
                    <span>Lao Text (ພາສາລາວ)</span>
                  </div>

                  {item.multiline ? (
                    <textarea
                      rows={3}
                      value={valLA}
                      onChange={(e) =>
                        setDraftLA((prev) => ({ ...prev, [item.key]: e.target.value }))
                      }
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-lao text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 text-xs"
                    />
                  ) : (
                    <input
                      type="text"
                      value={valLA}
                      onChange={(e) =>
                        setDraftLA((prev) => ({ ...prev, [item.key]: e.target.value }))
                      }
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-lao text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 text-xs"
                    />
                  )}
                </div>

                {/* English Input with UK flag */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800">
                    <svg className="w-4 h-3 rounded-2xs overflow-hidden shadow-2xs border border-black/10" viewBox="0 0 60 30">
                      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                    </svg>
                    <span>English Text (EN)</span>
                  </div>

                  {item.multiline ? (
                    <textarea
                      rows={3}
                      value={valEN}
                      onChange={(e) =>
                        setDraftEN((prev) => ({ ...prev, [item.key]: e.target.value }))
                      }
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 text-xs"
                    />
                  ) : (
                    <input
                      type="text"
                      value={valEN}
                      onChange={(e) =>
                        setDraftEN((prev) => ({ ...prev, [item.key]: e.target.value }))
                      }
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 text-xs"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 text-stone-500 text-xs space-y-2">
            <p>No wording matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setCustomKeyInput(searchQuery);
                setShowAddCustomModal(true);
              }}
              className="text-stone-900 font-bold underline hover:no-underline"
            >
              Click here to add "{searchQuery}" as a custom wording item
            </button>
          </div>
        )}
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-4 inset-x-0 bg-stone-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 z-20 border border-stone-700">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Customized wording applies instantly across customer portal and all tabs</span>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-white text-stone-950 font-black rounded-xl text-xs hover:bg-stone-200 transition-all active:scale-98 shadow-md"
        >
          Save All Changes
        </button>
      </div>

      {/* MODAL: Add Custom Wording */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-black text-stone-900">Add Custom Wording or Sentence</h3>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomKeySubmit} className="space-y-3">
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Wording Key Path (e.g. promo.banner or banner.text)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. hero.customNote or nav.promo"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Friendly Label / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Special Holiday Promo Banner"
                  value={customLabelInput}
                  onChange={(e) => setCustomLabelInput(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Lao Text (ພາສາລາວ)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="ໃສ່ຂໍ້ຄວາມພາສາລາວ..."
                  value={customLAInput}
                  onChange={(e) => setCustomLAInput(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-lao text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">English Text (EN)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter English sentence or wording..."
                  value={customENInput}
                  onChange={(e) => setCustomENInput(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold"
                >
                  Add and Save Wording
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
