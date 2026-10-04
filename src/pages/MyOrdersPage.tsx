import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Clock, 
  Receipt, 
  X, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { getStoredOrders, getStoredActivePhone, saveStoredActivePhone } from '../lib/storage';
import { useCart } from '../context/CartContext';
import { generateWhatsAppOrderMessage } from '../lib/notifications';

interface MyOrdersPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ onNavigate }) => {
  const { settings } = useCart();
  const [activePhone, setActivePhone] = useState(getStoredActivePhone);
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const allOrders = getStoredOrders();

  // Filter orders by active customer's phone if provided, else show all session orders or prompt for phone
  const customerOrders = activePhone
    ? allOrders.filter(o => o.phone.includes(activePhone) || activePhone.includes(o.phone))
    : allOrders;

  const handlePhoneLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneInput.replace(/\D/g, '');
    if (clean.length === 10) {
      saveStoredActivePhone(clean);
      setActivePhone(clean);
    }
  };

  const handleClearPhoneFilter = () => {
    saveStoredActivePhone('');
    setActivePhone('');
    setPhoneInput('');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success-green/15 text-success-green border-success-green/30';
      case 'Out for Delivery':
        return 'bg-night-navy text-white border-night-navy';
      case 'Preparing':
        return 'bg-diwali-gold text-charcoal-ink border-diwali-gold';
      case 'Confirmed':
        return 'bg-success-green/15 text-success-green border-success-green/30';
      case 'Payment Verification':
        return 'bg-cream-canvas text-primary border-diwali-gold';
      case 'Cancelled':
        return 'bg-error-container text-alert-red border-error-container';
      default:
        return 'bg-surface-container text-muted-slate border-soft-border';
    }
  };

  const getTimelineSteps = (currentStatus: OrderStatus) => {
    const steps: { label: string; active: boolean; done: boolean }[] = [
      { label: 'Payment Pending', active: false, done: false },
      { label: 'Payment Verification', active: false, done: false },
      { label: 'Confirmed', active: false, done: false },
      { label: 'Preparing', active: false, done: false },
      { label: 'Out for Delivery', active: false, done: false },
      { label: 'Delivered', active: false, done: false },
    ];

    const statusOrder: OrderStatus[] = [
      'Payment Pending',
      'Payment Verification',
      'Confirmed',
      'Preparing',
      'Out for Delivery',
      'Delivered',
    ];

    const currentIndex = statusOrder.indexOf(currentStatus);

    return steps.map((s, idx) => ({
      ...s,
      done: currentIndex > idx,
      active: currentIndex === idx,
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Profile & Header Row */}
      <section className="w-full pt-2 mb-2">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
                Dispatch Status Center
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-night-navy font-bold tracking-tight">
              My Orders
            </h1>
            <p className="text-xs sm:text-sm text-muted-slate mt-1">
              Track your festive crackers parcel verification and delivery status directly.
            </p>
          </div>

          {/* Customer Phone Search / Active Session Indicator */}
          <div className="bg-pure-surface rounded-xl p-3 sm:p-4 shadow-sm border border-soft-border flex flex-wrap items-center gap-3">
            {activePhone ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-xs">
                  <span className="text-muted-slate font-semibold">Active Mobile Number</span>
                  <span className="font-mono font-bold text-night-navy text-sm">+91 {activePhone}</span>
                </div>
                <button
                  onClick={handleClearPhoneFilter}
                  className="text-xs text-primary hover:underline font-semibold ml-2"
                >
                  Change
                </button>
              </div>
            ) : (
              <form onSubmit={handlePhoneLookup} className="flex items-center gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit mobile"
                  className="bg-cream-canvas px-3 py-1.5 rounded-lg text-xs font-mono text-charcoal-ink border border-soft-border focus:outline-none focus:border-diwali-gold w-44"
                />
                <button
                  type="submit"
                  disabled={phoneInput.length !== 10}
                  className="bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                >
                  Find Orders
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Orders Stack */}
      <section className="flex flex-col gap-5">
        {customerOrders.length === 0 ? (
          <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border shadow-sm flex flex-col items-center justify-center">
            <Package className="w-12 h-12 text-muted-slate mb-3 stroke-1" />
            <h3 className="font-headline-sm text-lg font-bold text-night-navy mb-1">
              No orders yet.
            </h3>
            <p className="text-sm text-muted-slate max-w-sm mb-6">
              You haven't placed any festive orders yet. Browse our Sivakasi catalog to light up your Diwali!
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 bg-diwali-gold text-charcoal-ink font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-diwali-gold/90 transition-all text-sm"
            >
              <span>Browse Crackers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          customerOrders.map((order) => {
            const steps = getTimelineSteps(order.order_status);
            return (
              <article
                key={order.id}
                className="w-full bg-pure-surface rounded-2xl shadow-sm border border-soft-border overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                {/* Top Info Banner */}
                <div className="bg-cream-canvas px-5 py-3 border-b border-soft-border flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-night-navy text-sm">{order.id}</span>
                    <span className="text-muted-slate">•</span>
                    <span className="text-muted-slate">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full font-mono font-bold border text-xs ${getStatusBadge(
                        order.order_status
                      )}`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div className="p-5 sm:p-6 flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="text-muted-slate">Deliver to:</span>
                      <span className="font-bold text-night-navy text-sm">{order.customer_name}</span>
                      <span className="text-muted-slate truncate max-w-md">
                        {order.address}, {order.city} - {order.pincode}
                      </span>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <span className="text-xs text-muted-slate">Total Amount:</span>
                      <span className="font-mono text-xl font-bold text-night-navy">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-muted-slate">
                        ({order.items.length} {order.items.length === 1 ? 'Variety' : 'Varieties'})
                      </span>
                    </div>
                  </div>

                  {/* Visual Timeline Spine */}
                  <div className="pt-2 pb-1 overflow-x-auto scrollbar-none">
                    <div className="flex items-center justify-between min-w-[500px] relative px-2">
                      <div className="absolute left-4 right-4 top-3 h-0.5 bg-soft-border -z-0"></div>
                      {steps.map((st, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-sm ${
                              st.done
                                ? 'bg-success-green text-white'
                                : st.active
                                ? 'bg-diwali-gold text-charcoal-ink ring-2 ring-primary/40'
                                : 'bg-surface-container text-muted-slate'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span
                            className={`text-[11px] mt-1.5 whitespace-nowrap font-medium ${
                              st.active
                                ? 'text-primary font-bold'
                                : st.done
                                ? 'text-success-green'
                                : 'text-muted-slate'
                            }`}
                          >
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-3 border-t border-soft-border/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-slate">Payment Status:</span>
                      <span className="font-mono font-semibold text-primary">
                        {order.payment_status}
                      </span>
                      {order.utr_number && (
                        <span className="font-mono text-[11px] text-muted-slate">
                          (UTR: {order.utr_number})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-cream-canvas hover:bg-surface-container text-night-navy font-semibold px-4 py-2 rounded-lg text-xs border border-soft-border transition-colors"
                      >
                        View Full Invoice
                      </button>
                      <a
                        href={generateWhatsAppOrderMessage(order, settings)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-success-green/10 hover:bg-success-green/20 text-success-green font-semibold px-3 py-2 rounded-lg text-xs border border-success-green/30 transition-colors flex items-center gap-1.5"
                      >
                        <span>WhatsApp Support</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-night-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-pure-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-soft-border max-h-[90vh] overflow-y-auto animate-in fade-in-50">
            <div className="flex items-center justify-between pb-4 border-b border-soft-border mb-4">
              <div>
                <span className="font-mono text-xs text-primary font-bold">Order Details</span>
                <h3 className="font-headline-sm text-lg font-bold text-night-navy">
                  Invoice #{selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-muted-slate hover:bg-cream-canvas transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-cream-canvas rounded-xl border border-soft-border">
                <div>
                  <span className="text-muted-slate font-semibold">Customer</span>
                  <p className="font-bold text-night-navy mt-0.5">{selectedOrder.customer_name}</p>
                  <p className="font-mono text-muted-slate">+91 {selectedOrder.phone}</p>
                </div>
                <div>
                  <span className="text-muted-slate font-semibold">Date Placed</span>
                  <p className="font-mono text-night-navy mt-0.5">
                    {new Date(selectedOrder.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-muted-slate font-semibold">Delivery Destination</span>
                <p className="text-night-navy mt-1 leading-snug">
                  {selectedOrder.address}, {selectedOrder.city} - {selectedOrder.pincode}
                </p>
                {selectedOrder.landmark && (
                  <p className="text-muted-slate mt-0.5">Landmark: {selectedOrder.landmark}</p>
                )}
              </div>

              {/* Items Table */}
              <div>
                <span className="text-muted-slate font-semibold block mb-2">Itemized Products</span>
                <div className="divide-y divide-soft-border/50 border border-soft-border rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="p-2.5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-charcoal-ink">{item.product_name}</p>
                        <p className="text-muted-slate font-mono">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-night-navy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-3 bg-cream-canvas rounded-xl border border-soft-border space-y-1.5">
                <div className="flex justify-between text-muted-slate">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-slate">
                  <span>Delivery Fee</span>
                  <span className="font-mono font-semibold">
                    {selectedOrder.delivery_fee === 0 ? 'FREE' : `₹${selectedOrder.delivery_fee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-night-navy pt-2 border-t border-soft-border">
                  <span>Total Amount</span>
                  <span className="font-mono text-base">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Status & UTR */}
              <div className="p-3 bg-pure-surface rounded-xl border border-soft-border flex items-center justify-between">
                <div>
                  <span className="text-muted-slate">Payment Status:</span>
                  <p className="font-bold text-primary font-mono">{selectedOrder.payment_status}</p>
                </div>
                {selectedOrder.utr_number && (
                  <div className="text-right">
                    <span className="text-muted-slate">UTR Reference:</span>
                    <p className="font-mono font-semibold text-night-navy">{selectedOrder.utr_number}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-soft-border flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-night-navy text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Close Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
