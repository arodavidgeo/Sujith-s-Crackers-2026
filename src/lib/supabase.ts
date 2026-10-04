import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL Schema for Supabase PostgreSQL Database with RLS:
 * 
 * -- 1. Products Table
 * CREATE TABLE IF NOT EXISTS products (
 *   id TEXT PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   image TEXT NOT NULL,
 *   original_price NUMERIC NOT NULL,
 *   offer_price NUMERIC NOT NULL,
 *   stock INTEGER NOT NULL DEFAULT 0,
 *   is_available BOOLEAN DEFAULT true,
 *   unit_info TEXT,
 *   safety_info TEXT,
 *   delivery_info TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Enable RLS
 * ALTER TABLE products ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
 * CREATE POLICY "Admin manage products" ON products FOR ALL USING (auth.role() = 'authenticated');
 * 
 * -- 2. Orders Table
 * CREATE TABLE IF NOT EXISTS orders (
 *   id TEXT PRIMARY KEY,
 *   customer_name TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   address TEXT NOT NULL,
 *   city TEXT NOT NULL,
 *   pincode TEXT NOT NULL,
 *   landmark TEXT,
 *   notes TEXT,
 *   items JSONB NOT NULL,
 *   subtotal NUMERIC NOT NULL,
 *   delivery_fee NUMERIC NOT NULL,
 *   total NUMERIC NOT NULL,
 *   payment_status TEXT NOT NULL DEFAULT 'Payment Pending',
 *   order_status TEXT NOT NULL DEFAULT 'Payment Pending',
 *   utr_number TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Enable RLS
 * ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Customers view own orders by phone" ON orders FOR SELECT USING (true);
 * CREATE POLICY "Customers create orders" ON orders FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Admin manage orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
 * 
 * -- 3. Shop Settings Table
 * CREATE TABLE IF NOT EXISTS shop_settings (
 *   id TEXT PRIMARY KEY DEFAULT 'default',
 *   business_name TEXT NOT NULL,
 *   phone TEXT NOT NULL,
 *   upi_id TEXT NOT NULL,
 *   location_url TEXT NOT NULL,
 *   free_delivery_threshold NUMERIC NOT NULL,
 *   standard_delivery_fee NUMERIC NOT NULL,
 *   owner_notification_email TEXT,
 *   delivery_zones TEXT,
 *   contact_email TEXT,
 *   opening_hours TEXT,
 *   license_number TEXT,
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Public read settings" ON shop_settings FOR SELECT USING (true);
 * CREATE POLICY "Admin update settings" ON shop_settings FOR ALL USING (auth.role() = 'authenticated');
 */
