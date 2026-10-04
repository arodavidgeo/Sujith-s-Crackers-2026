export type ProductCategory =
  | 'Ground Crackers'
  | 'Sparklers'
  | 'Aerial Crackers'
  | 'Sound Crackers'
  | 'Fancy Crackers'
  | 'Gift Boxes';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string;
  original_price: number;
  offer_price: number;
  stock: number;
  is_available: boolean;
  unit_info?: string;
  safety_info?: string;
  delivery_info?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentStatus = 
  | 'Payment Pending'
  | 'Payment Verification'
  | 'Payment Received';

export type OrderStatus =
  | 'Payment Pending'
  | 'Payment Verification'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  category: string;
  price: number;
  original_price: number;
  quantity: number;
}

export interface Order {
  id: string; // e.g. SC-2026-0001
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  utr_number?: string;
  created_at: string;
  updated_at: string;
}

export interface ShopSettings {
  business_name: string;
  phone: string;
  upi_id: string;
  location_url: string;
  free_delivery_threshold: number;
  standard_delivery_fee: number;
  owner_notification_email: string;
  delivery_zones: string;
  contact_email: string;
  opening_hours: string;
  license_number: string;
}
