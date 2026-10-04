import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  IndianRupee, 
  Clock, 
  Warehouse, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  Settings as SettingsIcon, 
  ExternalLink, 
  Save, 
  Layers, 
  RefreshCw,
  Search,
  Filter,
  Eye,
  AlertCircle
} from 'lucide-react';
import { Order, Product, ShopSettings, OrderStatus, PaymentStatus, ProductCategory } from '../types';
import { 
  getStoredOrders, 
  saveStoredOrder, 
  getStoredProducts, 
  saveStoredProduct, 
  deleteStoredProduct, 
  getStoredSettings, 
  saveStoredSettings,
  INITIAL_CATEGORIES
} from '../lib/storage';
import { useCart } from '../context/CartContext';
import { generateWhatsAppOrderMessage } from '../lib/notifications';

interface AdminPageProps {
  onNavigateToStore: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateToStore }) => {
  const { refreshSettings } = useCart();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'categories' | 'settings'>('dashboard');

  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [settings, setSettings] = useState<ShopSettings>(getStoredSettings);

  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings Feedback
  const [settingsSaved, setSettingsSaved] = useState(false);

  const reloadData = () => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    setSettings(getStoredSettings());
    refreshSettings();
  };

  // Real Database Metrics (NO fake data!)
  const todayStr = new Date().toISOString().split('T')[0];

  const todayOrders = useMemo(() => {
    return orders.filter(o => o.created_at.startsWith(todayStr));
  }, [orders, todayStr]);

  const todayRevenue = useMemo(() => {
    return todayOrders.reduce((sum, o) => sum + o.total, 0);
  }, [todayOrders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const pendingVerificationOrders = useMemo(() => {
    return orders.filter(o => o.payment_status === 'Payment Verification' || o.payment_status === 'Payment Pending');
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter(p => p.stock < 20);
  }, [products]);

  // Order Actions
  const handleUpdateOrderStatus = (orderId: string, newOrderStatus: OrderStatus, newPaymentStatus?: PaymentStatus) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;

    const updated: Order = {
      ...target,
      order_status: newOrderStatus,
      payment_status: newPaymentStatus || target.payment_status,
      updated_at: new Date().toISOString()
    };

    saveStoredOrder(updated);
    reloadData();
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder(updated);
    }
  };

  // Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    saveStoredProduct(editingProduct);
    reloadData();
    setEditingProduct(null);
    setIsNewProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteStoredProduct(id);
      reloadData();
    }
  };

  const openNewProductModal = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: `sc-prod-${Date.now()}`,
      name: '',
      description: '',
      category: 'Ground Crackers',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSoWBk6bghq3jk4MgZD6NonTcHqpAtnv7qmicWlN5LlnNLEhtFrKbe7BulglI13B2CZ3lKOylBM8kB_8GiOvWdnWlW9-hZtjI0LTatGDBIAPdHa4hk3ZLaD0p1VnZN-DnL30Ej4DUZLXd83xhpBO5bLlLYy1NxfytDkJwABc3hvT2bvHmy2RexQtN1Aj2DmpN7PycE0UYlPR1_8ZxHQRSCCGwoSxefj-pYbecF7Zk4qorruxAy1T28Vw',
      original_price: 500,
      offer_price: 350,
      stock: 50,
      is_available: true,
      unit_info: 'Standard Box',
      safety_info: 'Light at safe distance on flat ground.',
      delivery_info: 'Standard safe packaging.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  };

  // Settings Actions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    refreshSettings();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Filtered Orders List
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderFilter !== 'all' && o.order_status !== orderFilter && o.payment_status !== orderFilter) {
        return false;
      }
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customer_name.toLowerCase().includes(q);
        const matchPhone = o.phone.includes(q);
        const matchUtr = o.utr_number ? o.utr_number.toLowerCase().includes(q) : false;
        if (!matchId && !matchName && !matchPhone && !matchUtr) return false;
      }
      return true;
    });
  }, [orders, orderFilter, orderSearch]);

  return (
    <div className="min-h-screen bg-cream-canvas -mt-20">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-night-navy z-50 hidden lg:flex flex-col pt-6 pb-6 text-cream-canvas shadow-xl">
        <div className="px-6 mb-8 flex items-center gap-3">
          <img
            alt="Brand Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V_AeblyAJbFpEZuUAWXlxGu9B3UTPIrU2-H_SKBwaVk_nZ3VQ2-dM_SJhKXi5s3sdaRczHFQGP-Kq8ldtFKx04HvvxCDOh1_o3JNNfR5J71It9RcgH0MmEAfxgXOPYNhdSVs_qGiL8yG4QzdAHXySvayEfBcdg90JwdQ_rMq9MTs5vIuKMyu-Kf6q2GUTxsSYhSD3NHJp6iOP9_GWH6jaW-FV4lmAew6Ix0i_bbpLkM7AWFRzrkg4bBnXU"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-base text-white font-bold leading-none">
              Owner Depot
            </span>
            <span className="font-mono text-xs text-diwali-gold mt-1">
              Admin Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'dashboard'
                ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                : 'text-surface-variant hover:bg-white/10 hover:text-white'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Overview &amp; Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                : 'text-surface-variant hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders &amp; Payments</span>
            </div>
            {pendingVerificationOrders.length > 0 && (
              <span className="bg-alert-red text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {pendingVerificationOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'products'
                ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                : 'text-surface-variant hover:bg-white/10 hover:text-white'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Products &amp; Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'categories'
                ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                : 'text-surface-variant hover:bg-white/10 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'settings'
                ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                : 'text-surface-variant hover:bg-white/10 hover:text-white'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </nav>

        <div className="px-4 mt-auto">
          <button
            onClick={onNavigateToStore}
            className="w-full text-center py-2.5 text-surface-variant hover:text-diwali-gold text-xs font-semibold transition-colors border border-white/10 rounded-xl"
          >
            ← Return to Public Store
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-pure-surface border-b border-soft-border sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-headline-sm text-base sm:text-lg text-night-navy font-bold">
              Operations Center
            </span>
            <span className="font-mono text-xs bg-cream-canvas text-charcoal-ink px-2.5 py-1 rounded-full border border-soft-border">
              {settings.business_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reloadData}
              className="p-2 rounded-lg bg-cream-canvas hover:bg-surface-container text-night-navy transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToStore}
              className="text-xs bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-3.5 py-2 rounded-lg transition-all"
            >
              View Public Website
            </button>
          </div>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="lg:hidden bg-pure-surface border-b border-soft-border p-3 overflow-x-auto flex gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-diwali-gold text-charcoal-ink' : 'bg-cream-canvas text-charcoal-ink'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-diwali-gold text-charcoal-ink' : 'bg-cream-canvas text-charcoal-ink'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'products' ? 'bg-diwali-gold text-charcoal-ink' : 'bg-cream-canvas text-charcoal-ink'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-diwali-gold text-charcoal-ink' : 'bg-cream-canvas text-charcoal-ink'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content Views */}
        <main className="p-4 sm:p-8 flex flex-col gap-6 max-w-7xl w-full">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-6">
              {/* Context Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Real Database Metrics
                  </span>
                  <h1 className="font-headline-md text-xl font-bold text-night-navy">
                    Dispatch &amp; Financial Reconciliation
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="bg-cream-canvas hover:bg-surface-container text-night-navy px-3 py-1.5 rounded-lg text-xs font-bold border border-soft-border"
                  >
                    View All Orders
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards (Real Database Values) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1: Today's Orders */}
                <div className="bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-slate text-xs font-bold uppercase tracking-wider">
                    <span>Today's Orders</span>
                    <ShoppingBag className="w-5 h-5 text-night-navy" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-extrabold text-night-navy">
                      {todayOrders.length}
                    </span>
                    <span className="text-xs text-muted-slate">Bookings</span>
                  </div>
                  <p className="text-[11px] text-muted-slate mt-2">
                    Total lifetime orders: {orders.length}
                  </p>
                </div>

                {/* Metric 2: Today's Revenue */}
                <div className="bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-slate text-xs font-bold uppercase tracking-wider">
                    <span>Today's Revenue</span>
                    <IndianRupee className="w-5 h-5 text-diwali-gold" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-mono text-3xl font-extrabold text-night-navy">
                      ₹{todayRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-slate mt-2">
                    Lifetime total: ₹{totalRevenue.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Metric 3: Verification Queue */}
                <div className="bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-alert-red text-xs font-bold uppercase tracking-wider">
                    <span>Pending Verification</span>
                    <Clock className="w-5 h-5 text-alert-red" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-extrabold text-alert-red">
                      {pendingVerificationOrders.length}
                    </span>
                    <span className="text-xs text-charcoal-ink font-semibold">Orders Pending</span>
                  </div>
                  <button
                    onClick={() => {
                      setOrderFilter('Payment Verification');
                      setActiveTab('orders');
                    }}
                    className="text-[11px] text-primary hover:underline text-left mt-2 font-bold"
                  >
                    Action Queue →
                  </button>
                </div>

                {/* Metric 4: Low Stock */}
                <div className="bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-slate text-xs font-bold uppercase tracking-wider">
                    <span>Low Stock SKUs</span>
                    <Warehouse className="w-5 h-5 text-primary" />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-extrabold text-night-navy">
                      {lowStockProducts.length}
                    </span>
                    <span className="text-xs text-alert-red font-semibold">&lt; 20 units left</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-[11px] text-primary hover:underline text-left mt-2 font-bold"
                  >
                    Manage Inventory →
                  </button>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-5">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-soft-border">
                  <h2 className="font-headline-sm text-base font-bold text-night-navy">
                    Recent Customer Orders
                  </h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-muted-slate py-6 text-center">
                    No orders in database yet. Values reflect actual state.
                  </p>
                ) : (
                  <div className="divide-y divide-soft-border/50">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-night-navy">{o.id}</span>
                            <span className="text-muted-slate">•</span>
                            <span className="font-semibold">{o.customer_name}</span>
                            <span className="text-muted-slate">(+91 {o.phone})</span>
                          </div>
                          <span className="text-muted-slate mt-0.5">{o.city} • {o.items.length} items</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-night-navy text-sm">
                            ₹{o.total.toLocaleString('en-IN')}
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-cream-canvas font-semibold border border-soft-border">
                            {o.order_status}
                          </span>
                          <button
                            onClick={() => {
                              setViewingOrder(o);
                              setActiveTab('orders');
                            }}
                            className="bg-cream-canvas hover:bg-surface-container px-2.5 py-1 rounded font-semibold text-night-navy"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6">
              {/* Header & Filter Controls */}
              <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-5 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-headline-md text-xl font-bold text-night-navy">
                      Live Orders &amp; Payment Clearance
                    </h1>
                    <p className="text-xs text-muted-slate mt-0.5">
                      Verify UPI transactions, confirm bookings, and manage delivery progress.
                    </p>
                  </div>

                  {/* Search by UTR or Customer */}
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-muted-slate absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search UTR, Order ID, Phone..."
                      className="w-full bg-cream-canvas text-xs pl-9 pr-3 py-2 rounded-xl border border-soft-border focus:outline-none focus:border-diwali-gold font-mono"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  {['all', 'Payment Verification', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setOrderFilter(f)}
                      className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
                        orderFilter === f
                          ? 'bg-diwali-gold text-charcoal-ink'
                          : 'bg-cream-canvas text-charcoal-ink hover:bg-surface-container border border-soft-border'
                      }`}
                    >
                      {f === 'all' ? 'All Orders' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-cream-canvas text-muted-slate font-mono uppercase tracking-wider border-b border-soft-border">
                      <tr>
                        <th className="py-3 px-4">Order ID &amp; Time</th>
                        <th className="py-3 px-4">Customer &amp; Phone</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Payment &amp; UTR</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-soft-border/50">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-muted-slate">
                            No matching orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(o => (
                          <tr key={o.id} className="hover:bg-cream-canvas/30 transition-colors">
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-night-navy block">{o.id}</span>
                              <span className="text-[11px] text-muted-slate">
                                {new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-night-navy block">{o.customer_name}</span>
                              <span className="font-mono text-muted-slate">+91 {o.phone}</span>
                              <span className="text-[11px] text-muted-slate block">{o.city}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold">{o.items.length} Varieties</span>
                              <span className="text-[11px] text-muted-slate block truncate max-w-[140px]">
                                {o.items.map(i => i.product_name).join(', ')}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-night-navy">
                              ₹{o.total.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                                o.payment_status === 'Payment Received'
                                  ? 'bg-success-green/15 text-success-green'
                                  : 'bg-diwali-gold/20 text-charcoal-ink'
                              }`}>
                                {o.payment_status}
                              </span>
                              {o.utr_number ? (
                                <span className="block font-mono text-[11px] text-charcoal-ink mt-0.5 select-all">
                                  UTR: {o.utr_number}
                                </span>
                              ) : (
                                <span className="block text-[11px] text-muted-slate mt-0.5">
                                  No UTR entered
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-semibold px-2 py-0.5 rounded bg-cream-canvas border border-soft-border">
                                {o.order_status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {o.payment_status !== 'Payment Received' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(o.id, 'Confirmed', 'Payment Received')}
                                    className="bg-success-green hover:opacity-90 text-white px-2.5 py-1 rounded text-xs font-bold"
                                    title="Verify & Mark Payment Received"
                                  >
                                    Verify
                                  </button>
                                )}
                                <a
                                  href={generateWhatsAppOrderMessage(o, settings)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded bg-cream-canvas hover:bg-surface-container text-success-green border border-soft-border"
                                  title="WhatsApp Customer"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => setViewingOrder(o)}
                                  className="p-1 rounded bg-cream-canvas hover:bg-surface-container text-night-navy border border-soft-border"
                                  title="View Order Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Detail Modal */}
              {viewingOrder && (
                <div className="fixed inset-0 z-50 bg-night-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-pure-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-soft-border max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-soft-border mb-4">
                      <div>
                        <span className="font-mono text-xs text-primary font-bold">Manage Order</span>
                        <h3 className="font-headline-sm text-lg font-bold text-night-navy">
                          {viewingOrder.id}
                        </h3>
                      </div>
                      <button onClick={() => setViewingOrder(null)} className="p-1 rounded text-muted-slate">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="p-3 bg-cream-canvas rounded-xl border border-soft-border space-y-1">
                        <p><strong className="text-night-navy">Customer:</strong> {viewingOrder.customer_name} (+91 {viewingOrder.phone})</p>
                        <p><strong className="text-night-navy">Address:</strong> {viewingOrder.address}, {viewingOrder.city} - {viewingOrder.pincode}</p>
                        {viewingOrder.landmark && <p><strong className="text-night-navy">Landmark:</strong> {viewingOrder.landmark}</p>}
                        {viewingOrder.notes && <p><strong className="text-night-navy">Notes:</strong> {viewingOrder.notes}</p>}
                        <p><strong className="text-night-navy">UTR Number:</strong> <span className="font-mono font-bold text-night-navy">{viewingOrder.utr_number || 'None'}</span></p>
                      </div>

                      {/* Items */}
                      <div>
                        <span className="font-bold text-night-navy block mb-1.5">Products:</span>
                        <div className="border border-soft-border rounded-xl divide-y divide-soft-border/40 overflow-hidden">
                          {viewingOrder.items.map((it, idx) => (
                            <div key={idx} className="p-2 flex justify-between">
                              <span>{it.product_name} x{it.quantity}</span>
                              <span className="font-mono font-bold">₹{it.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between font-bold text-sm text-night-navy pt-2">
                          <span>Total:</span>
                          <span className="font-mono">₹{viewingOrder.total}</span>
                        </div>
                      </div>

                      {/* Status Modification Controls */}
                      <div className="p-4 bg-surface-container-low rounded-xl border border-soft-border space-y-3">
                        <span className="font-bold text-night-navy block">Update Fulfillment Status:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'Confirmed', 'Payment Received')}
                            className="bg-success-green hover:opacity-90 text-white py-2 px-3 rounded-lg font-bold text-center"
                          >
                            Mark Confirmed
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'Preparing')}
                            className="bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink py-2 px-3 rounded-lg font-bold text-center"
                          >
                            Mark Preparing
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'Out for Delivery')}
                            className="bg-night-navy hover:bg-secondary text-white py-2 px-3 rounded-lg font-bold text-center"
                          >
                            Out for Delivery
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'Delivered')}
                            className="bg-cream-canvas hover:bg-surface-container text-success-green py-2 px-3 rounded-lg font-bold text-center border border-success-green/40"
                          >
                            Mark Delivered
                          </button>
                        </div>
                        <button
                          onClick={() => handleUpdateOrderStatus(viewingOrder.id, 'Cancelled')}
                          className="w-full text-center text-alert-red hover:underline text-[11px] pt-1"
                        >
                          Cancel This Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTS INVENTORY */}
          {activeTab === 'products' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border">
                <div>
                  <h1 className="font-headline-md text-xl font-bold text-night-navy">
                    Products &amp; Stock Master
                  </h1>
                  <p className="text-xs text-muted-slate mt-0.5">
                    Add new festival SKUs, adjust wholesale offer prices, and manage physical stock.
                  </p>
                </div>
                <button
                  onClick={openNewProductModal}
                  className="bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-cream-canvas text-muted-slate font-mono uppercase tracking-wider border-b border-soft-border">
                      <tr>
                        <th className="py-3 px-4">Product Name &amp; Category</th>
                        <th className="py-3 px-4">Original MRP</th>
                        <th className="py-3 px-4">Offer Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-soft-border/50">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-cream-canvas/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover bg-cream-canvas shrink-0 border border-soft-border"
                              />
                              <div>
                                <span className="font-bold text-night-navy block">{p.name}</span>
                                <span className="text-[11px] text-muted-slate font-mono">{p.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-muted-slate line-through">
                            ₹{p.original_price}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-night-navy">
                            ₹{p.offer_price}
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              p.stock < 20 ? 'bg-error-container text-alert-red' : 'bg-cream-canvas text-charcoal-ink'
                            }`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[11px] font-bold ${p.is_available ? 'text-success-green' : 'text-alert-red'}`}>
                              {p.is_available ? 'Available' : 'Disabled'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setIsNewProduct(false);
                                  setEditingProduct(p);
                                }}
                                className="p-1.5 rounded bg-cream-canvas hover:bg-surface-container text-night-navy border border-soft-border"
                                title="Edit Product"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 rounded bg-cream-canvas hover:bg-error-container text-alert-red border border-soft-border"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Modal */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 bg-night-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-pure-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-soft-border max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-soft-border mb-4">
                      <h3 className="font-headline-sm text-base font-bold text-night-navy">
                        {isNewProduct ? 'Add New Cracker SKU' : `Edit: ${editingProduct.name}`}
                      </h3>
                      <button onClick={() => setEditingProduct(null)} className="p-1 rounded text-muted-slate">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-muted-slate font-bold uppercase mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-semibold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-muted-slate font-bold uppercase mb-1">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                            className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-semibold focus:outline-none"
                          >
                            {INITIAL_CATEGORIES.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-muted-slate font-bold uppercase mb-1">Unit Info</label>
                          <input
                            type="text"
                            value={editingProduct.unit_info || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, unit_info: e.target.value })}
                            placeholder="e.g. Box of 10"
                            className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-semibold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-muted-slate font-bold uppercase mb-1">MRP Price (₹)</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.original_price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, original_price: Number(e.target.value) })}
                            className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-mono font-bold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-muted-slate font-bold uppercase mb-1">Offer Price (₹)</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.offer_price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, offer_price: Number(e.target.value) })}
                            className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-mono font-bold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-muted-slate font-bold uppercase mb-1">Stock Left</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.stock}
                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                            className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink font-mono font-bold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-muted-slate font-bold uppercase mb-1">Image URL</label>
                        <input
                          type="url"
                          required
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink focus:outline-none font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-muted-slate font-bold uppercase mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-cream-canvas border border-soft-border text-charcoal-ink focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="is_available"
                          checked={editingProduct.is_available}
                          onChange={(e) => setEditingProduct({ ...editingProduct, is_available: e.target.checked })}
                          className="w-4 h-4 rounded text-primary accent-[#F4B51B]"
                        />
                        <label htmlFor="is_available" className="text-charcoal-ink font-bold">
                          Active &amp; Available for purchase
                        </label>
                      </div>

                      <div className="pt-3 border-t border-soft-border flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 rounded-lg bg-cream-canvas text-charcoal-ink font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-diwali-gold text-charcoal-ink font-bold shadow-sm"
                        >
                          Save Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="flex flex-col gap-6">
              <div className="bg-pure-surface p-5 rounded-2xl shadow-sm border border-soft-border">
                <h1 className="font-headline-md text-xl font-bold text-night-navy mb-1">
                  Product Categories
                </h1>
                <p className="text-xs text-muted-slate mb-4">
                  Active festival categories configured for the storefront catalog.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {INITIAL_CATEGORIES.map(cat => {
                    const count = products.filter(p => p.category === cat).length;
                    return (
                      <div key={cat} className="p-4 bg-cream-canvas rounded-xl border border-soft-border flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-night-navy block">{cat}</span>
                          <span className="text-xs text-muted-slate">{count} Active Products</span>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-pure-surface border border-soft-border font-bold">
                          Enabled
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-6">
              <div className="bg-pure-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-soft-border">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-soft-border">
                  <div>
                    <h1 className="font-headline-md text-xl font-bold text-night-navy">
                      Store Settings &amp; Configuration
                    </h1>
                    <p className="text-xs text-muted-slate mt-0.5">
                      Configure owner alerts, UPI accounts, delivery limits, and contact details.
                    </p>
                  </div>
                  {settingsSaved && (
                    <span className="text-xs text-success-green font-bold bg-success-green/15 px-3 py-1.5 rounded-full">
                      Settings Saved!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5 text-xs max-w-2xl">
                  {/* Business Name */}
                  <div>
                    <label className="block text-muted-slate font-bold uppercase mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={settings.business_name}
                      onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border text-charcoal-ink font-bold focus:outline-none"
                    />
                  </div>

                  {/* Owner Contact Phone & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-slate font-bold uppercase mb-1">Contact &amp; WhatsApp Phone</label>
                      <input
                        type="tel"
                        required
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border font-mono font-bold text-charcoal-ink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-slate font-bold uppercase mb-1">Merchant UPI ID (VPA)</label>
                      <input
                        type="text"
                        required
                        value={settings.upi_id}
                        onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border font-mono font-bold text-charcoal-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Threshold & Fee */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted-slate font-bold uppercase mb-1">Free Delivery Threshold (₹)</label>
                      <input
                        type="number"
                        required
                        value={settings.free_delivery_threshold}
                        onChange={(e) => setSettings({ ...settings, free_delivery_threshold: Number(e.target.value) })}
                        className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border font-mono font-bold text-charcoal-ink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-slate font-bold uppercase mb-1">Standard Delivery Fee (₹)</label>
                      <input
                        type="number"
                        required
                        value={settings.standard_delivery_fee}
                        onChange={(e) => setSettings({ ...settings, standard_delivery_fee: Number(e.target.value) })}
                        className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border font-mono font-bold text-charcoal-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Owner Notification Email (Section 20 Requirement!) */}
                  <div>
                    <label className="block text-muted-slate font-bold uppercase mb-1">
                      Owner Notification Email (Configure to receive order alerts)
                    </label>
                    <input
                      type="email"
                      placeholder="owner@sujithscracker.com"
                      value={settings.owner_notification_email}
                      onChange={(e) => setSettings({ ...settings, owner_notification_email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border text-charcoal-ink focus:outline-none font-mono"
                    />
                    <p className="text-[11px] text-muted-slate mt-1">
                      New order summaries will be dispatched to this email address once configured.
                    </p>
                  </div>

                  {/* Google Maps Location URL */}
                  <div>
                    <label className="block text-muted-slate font-bold uppercase mb-1">Shop Google Maps URL</label>
                    <input
                      type="url"
                      required
                      value={settings.location_url}
                      onChange={(e) => setSettings({ ...settings, location_url: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border text-charcoal-ink focus:outline-none font-mono text-[11px]"
                    />
                  </div>

                  {/* Delivery Zones */}
                  <div>
                    <label className="block text-muted-slate font-bold uppercase mb-1">Configured Delivery Zones</label>
                    <input
                      type="text"
                      value={settings.delivery_zones}
                      onChange={(e) => setSettings({ ...settings, delivery_zones: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-cream-canvas border border-soft-border text-charcoal-ink focus:outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-8 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
