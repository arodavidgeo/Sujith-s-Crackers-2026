import React from 'react';
import { CheckCircle2, Phone, MapPin, Receipt, ArrowRight, ShoppingBag, ShieldCheck, MessageSquare } from 'lucide-react';
import { Order } from '../types';
import { useCart } from '../context/CartContext';
import { generateWhatsAppOrderMessage } from '../lib/notifications';

interface OrderReceivedPageProps {
  order: Order | null;
  onNavigate: (path: string, param?: string) => void;
}

export const OrderReceivedPage: React.FC<OrderReceivedPageProps> = ({ order, onNavigate }) => {
  const { settings } = useCart();

  if (!order) {
    return (
      <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border">
        <p className="text-muted-slate mb-4">No order details found.</p>
        <button
          onClick={() => onNavigate('home')}
          className="bg-diwali-gold text-charcoal-ink font-semibold px-6 py-2.5 rounded-xl"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const whatsappLink = generateWhatsAppOrderMessage(order, settings);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 md:py-10">
      <div className="relative w-full max-w-[760px] flex flex-col items-center">
        {/* Subtle warm glow behind card */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-diwali-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Order Confirmation Card */}
        <div className="w-full bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-6 sm:p-10 flex flex-col items-center text-center">
          {/* Status Mark */}
          <div className="w-16 h-16 rounded-full bg-diwali-gold/20 flex items-center justify-center mb-4 text-primary shadow-sm border border-diwali-gold/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="flex items-center gap-2 mb-1 text-xs text-muted-slate font-mono uppercase tracking-wider">
            <span>Depot Receipt</span>
            <span>•</span>
            <span>{settings.business_name}</span>
          </div>

          <h1 className="font-headline-lg text-3xl font-extrabold text-night-navy tracking-tight">
            Order Received
          </h1>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 rounded-xl bg-cream-canvas text-night-navy border border-soft-border">
            <span className="text-xs text-muted-slate font-semibold uppercase">Order ID</span>
            <span className="font-mono text-base font-bold tracking-tight text-primary">
              {order.id}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm sm:text-base text-charcoal-ink/80 max-w-lg mt-4 leading-relaxed">
            Your order has been received. Our team will verify the payment and contact you to confirm the order.
          </p>

          {/* Status Pill */}
          <div className="mt-4 inline-flex items-center gap-2 bg-cream-canvas px-4 py-2 rounded-full border border-soft-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-charcoal-ink font-semibold tracking-wide">
              Order Submitted • Awaiting Owner Verification
            </span>
          </div>

          {/* Order Summary Breakdown Card */}
          <div className="w-full mt-8 text-left bg-cream-canvas rounded-2xl p-5 sm:p-6 border border-soft-border">
            <div className="flex items-center justify-between pb-3 border-b border-soft-border/70">
              <span className="font-headline-sm text-base font-bold text-night-navy">
                Order Summary
              </span>
              <span className="font-mono text-xs text-muted-slate">
                {new Date(order.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Customer & Destination Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-muted-slate font-semibold uppercase">Customer Details</span>
                <span className="font-bold text-night-navy text-sm">{order.customer_name}</span>
                <span className="font-mono text-charcoal-ink flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-muted-slate" />
                  +91 {order.phone}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-slate font-semibold uppercase">Delivery Destination</span>
                <span className="text-night-navy leading-snug">
                  {order.address},<br />
                  {order.city} - {order.pincode}
                </span>
                {order.landmark && (
                  <span className="text-muted-slate">Landmark: {order.landmark}</span>
                )}
              </div>
            </div>

            {/* Payment Record Row */}
            <div className="rounded-xl bg-pure-surface p-3.5 my-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-soft-border shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-night-navy">
                  <Receipt className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-night-navy">Payment via UPI</span>
                  {order.utr_number && (
                    <span className="font-mono text-[11px] text-muted-slate">
                      Ref / UTR: {order.utr_number}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-center px-2.5 py-1 rounded-full bg-cream-canvas border border-soft-border text-xs font-mono text-primary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{order.payment_status}</span>
              </div>
            </div>

            {/* Items Breakdown */}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-xs text-muted-slate font-semibold uppercase">
                Ordered Fireworks ({order.items.length} Varieties)
              </span>
              <div className="flex flex-col divide-y divide-soft-border/40">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <span className="text-charcoal-ink font-medium">
                      {item.product_name} <span className="font-mono text-muted-slate">x{item.quantity}</span>
                    </span>
                    <span className="font-mono font-bold text-night-navy">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="mt-3 pt-3 border-t border-soft-border flex items-center justify-between bg-pure-surface rounded-xl p-3 border shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-slate">Total Amount</span>
                  <span className="text-xs text-success-green font-semibold">
                    {order.delivery_fee === 0 ? 'Free Express Delivery' : `Delivery: ₹${order.delivery_fee}`}
                  </span>
                </div>
                <span className="font-mono text-2xl font-bold text-night-navy">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps Explainer Timeline */}
          <div className="w-full mt-8 text-left">
            <h3 className="font-headline-sm text-base font-bold text-night-navy mb-4">
              Next Steps &amp; Dispatch Process
            </h3>

            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-soft-border" />

              {/* Step 1 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 mt-0.5 w-5 h-5 rounded-full bg-diwali-gold flex items-center justify-center ring-4 ring-pure-surface text-charcoal-ink font-mono text-xs font-bold">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-night-navy">Payment Check</span>
                  <span className="text-xs text-muted-slate mt-0.5 leading-relaxed">
                    Sujith will cross-verify the bank transaction using your submitted UTR reference number.
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 mt-0.5 w-5 h-5 rounded-full bg-surface-container flex items-center justify-center ring-4 ring-pure-surface text-muted-slate font-mono text-xs font-bold">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-night-navy">Owner Confirmation</span>
                  <span className="text-xs text-muted-slate mt-0.5 leading-relaxed">
                    Our team will verify payment and contact you by phone or WhatsApp to confirm parcel dispatch.
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 mt-0.5 w-5 h-5 rounded-full bg-surface-container flex items-center justify-center ring-4 ring-pure-surface text-muted-slate font-mono text-xs font-bold">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-night-navy">Dispatched &amp; Delivered</span>
                  <span className="text-xs text-muted-slate mt-0.5 leading-relaxed">
                    Carton packed in fire-safe 5-ply corrugated box and dispatched direct to your address.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => onNavigate('my-orders')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:translate-y-px text-sm"
            >
              <span>View Order in My Orders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pure-surface hover:bg-cream-canvas text-charcoal-ink font-semibold px-7 py-3.5 rounded-xl border border-soft-border shadow-sm transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Urgent WhatsApp Touchpoint */}
          <div className="mt-6 pt-4 border-t border-soft-border/60 w-full flex items-center justify-center gap-2 text-xs text-muted-slate">
            <MessageSquare className="w-4 h-4 text-success-green" />
            <span>
              Need urgent verification?{' '}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-night-navy font-bold underline decoration-diwali-gold hover:text-primary transition-colors"
              >
                Send Order Details to Sujith on WhatsApp
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
