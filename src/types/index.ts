export type Language = 'en' | 'lo';

export interface ProductColor {
  nameEN: string;
  nameLA: string;
  hex: string;
}

export interface ProductVariant {
  color: string;
  size: string;
  stock: number;
}

export interface ProductImages {
  side?: string;
  front?: string;
  back?: string;
  sole?: string;
  detail?: string;
  model?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  sku: string;
  nameEN: string;
  nameLA: string;
  descriptionEN: string;
  descriptionLA: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  gender: 'men' | 'women' | 'unisex';
  category: 'shoes' | 'clothing';
  subcategory: string;
  brand: string;
  mainImage: string;
  images: ProductImages;
  gallery?: string[];
  colors: ProductColor[];
  sizes: string[];
  variants: ProductVariant[];
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  isSale: boolean;
  featured: boolean;
  active: boolean;
  targetAge?: 'all' | 'young' | 'mature';
}

export interface CartItem {
  id: string; // unique item cart key: productId_color_size
  productId: string;
  sku: string;
  nameEN: string;
  nameLA: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  maxStock: number;
}

export interface CustomerDeliveryInfo {
  name: string;
  phone: string;
  province: string;
  district: string;
  village: string;
  address: string;
  deliveryNote?: string;
  gps?: {
    latitude: number;
    longitude: number;
  };
}

export type PaymentStatus = 'pending_verification' | 'verified' | 'not_confirmed';

export type OrderStatus =
  | 'waiting_payment'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderVerification {
  verifiedBy?: string;
  verifiedAt?: string;
  adminNote?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerDeliveryInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'qr';
  paymentProofUrl: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  verification?: OrderVerification;
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  shopName: string;
  bankName: string;
  accountOwner: string;
  accountNumber: string;
  qrCodeImage: string;
  fixedDeliveryFee: number;
  freeDeliveryThreshold: number;
  phone: string;
  whatsappNumber?: string;
  address: string;
  facebook: string;
  tiktok: string;
  reservationDurationHours: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  approved: boolean;
  ageGroup?: string;
}

export interface FilterState {
  search: string;
  gender: string;
  category: string;
  subcategory: string;
  brand: string;
  minPrice?: number;
  maxPrice?: number;
  size: string;
  color: string;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}
