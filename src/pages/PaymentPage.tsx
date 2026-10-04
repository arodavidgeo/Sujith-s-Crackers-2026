import React, { useState, useEffect } from 'react';
import { Copy, Check, QrCode, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import QRCode from 'qrcode';
import { Order } from '../types';
import { useCart } from '../context/CartContext';
import { updateStoredOrderStatus, saveStoredOrder } from '../lib/storage';

interface PaymentPageProps {
  order: Order | null;
  onNavigate: (path: string, param?: string) => void;
  onPaymentSubmitted: (updatedOrder: Order) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  order,
  onNavigate,
  onPaymentSubmitted,
}) => {
  const { settings, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [error, setError] = useState('');

  if (!order) {
    return (
      <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border">
        <p className="text-muted-slate mb-4">No active order to process payment for.</p>
        <button
          onClick={() => onNavigate('home')}
          className="bg-diwali-gold text-charcoal-ink font-semibold px-6 py-2.5 rounded-xl"
        >
          Return to Store
        </button>
      </div>
    );
  }

  // Generate UPI QR Code URL
  useEffect(() => {
    const upiUri = `upi://pay?pa=${settings.upi_id}&pn=${encodeURIComponent(
      settings.business_name
    )}&am=${order.total}&cu=INR&tn=${encodeURIComponent(`Order ${order.id}`)}`;

    QRCode.toDataURL(upiUri, {
      width: 250,
      margin: 2,
      color: {
        dark: '#10243D',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR:', err));
  }, [settings.upi_id, settings.business_name, order.total, order.id]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(settings.upi_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      setError('Please enter the 12-digit UPI UTR / Transaction Reference Number.');
      return;
    }

    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 6) {
      setError('Please enter a valid Transaction Reference or UTR number.');
      return;
    }

    // Update order with UTR and status
    const updatedOrder: Order = {
      ...order,
      utr_number: cleanUtr,
      payment_status: 'Payment Verification',
      order_status: 'Payment Verification',
      updated_at: new Date().toISOString(),
    };

    saveStoredOrder(updatedOrder);
    clearCart();
    onPaymentSubmitted(updatedOrder);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Progress Stepper Indicator */}
      <div className="w-full bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-5 mb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Step 1: Completed */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-full bg-success-green flex items-center justify-center text-white shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-slate uppercase tracking-wider">Step 1</span>
              <span className="text-sm font-semibold text-charcoal-ink">Customer &amp; Delivery</span>
            </div>
          </div>
          <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-diwali-gold/40"></div>

          {/* Step 2: Active */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-full bg-diwali-gold flex items-center justify-center text-charcoal-ink font-bold font-mono text-sm shrink-0">
              02
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-primary font-bold uppercase tracking-wider">Step 2 (Active)</span>
              <span className="text-sm font-bold text-night-navy">UPI Payment Verification</span>
            </div>
          </div>
          <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-surface-variant"></div>

          {/* Step 3: Upcoming */}
          <div className="flex items-center gap-3 w-full sm:w-auto opacity-60">
            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-muted-slate font-bold font-mono text-sm shrink-0">
              03
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-slate uppercase tracking-wider">Step 3</span>
              <span className="text-sm text-muted-slate font-medium">Receipt &amp; Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Primary UPI Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-pure-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-soft-border">
            {/* Status & Order Ref */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-soft-border/60">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-charcoal-ink font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-diwali-gold animate-pulse" />
                <span>Status: Payment Pending Verification</span>
              </div>
              <div className="font-mono text-xs font-bold text-night-navy bg-cream-canvas px-3 py-1 rounded-full border border-soft-border">
                Order Ref: {order.id}
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-night-navy font-bold tracking-tight mb-2">
              Complete Payment via UPI
            </h1>
            <p className="text-xs sm:text-sm text-muted-slate mb-6">
              Scan the official merchant QR code using any UPI app (GPay, PhonePe, Paytm, BHIM) or pay directly to the verified merchant UPI ID below.
            </p>

            {/* Amount Zone */}
            <div className="bg-cream-canvas rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border border-soft-border">
              <div className="flex flex-col">
                <span className="text-xs text-muted-slate uppercase tracking-wider">Payable Balance</span>
                <span className="text-xs text-charcoal-ink font-medium">
                  Inclusive of all GST, festive discounts &amp; packaging
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-extrabold text-night-navy">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* QR Box & Copy UPI Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center p-4 bg-surface-container-low rounded-xl border border-soft-border/70 mb-6">
              {/* QR Container */}
              <div className="flex flex-col items-center bg-pure-surface rounded-xl p-4 border border-soft-border text-center shadow-sm">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-cream-canvas rounded-lg">
                      <QrCode className="w-12 h-12 text-muted-slate animate-pulse" />
                    </div>
                  )}
                </div>
                <span className="font-mono text-[11px] font-bold text-night-navy mt-2.5">
                  BHIM UPI QR • {settings.business_name}
                </span>
                <span className="text-[11px] text-muted-slate">Direct merchant transfer</span>
              </div>

              {/* Direct UPI ID & Quick Copy */}
              <div className="flex flex-col justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-slate">
                  Merchant UPI ID / VPA
                </span>
                <div className="bg-pure-surface rounded-xl p-3.5 border border-soft-border shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-night-navy select-all break-all">
                      {settings.upi_id}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="p-2 rounded-lg bg-cream-canvas hover:bg-diwali-gold/30 text-night-navy transition-all active:translate-y-px shrink-0 border border-soft-border"
                      title="Copy UPI ID"
                      aria-label="Copy UPI ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-success-green" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-xs text-success-green font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      UPI ID copied to clipboard
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-slate space-y-1">
                  <p>1. Open Google Pay, PhonePe, Paytm, or BHIM.</p>
                  <p>2. Scan QR or transfer exactly ₹{order.total.toLocaleString('en-IN')}.</p>
                  <p>3. Enter your 12-digit UTR below.</p>
                </div>
              </div>
            </div>

            {/* UTR Input Form */}
            <form onSubmit={handleCompletePayment} className="space-y-4 pt-2">
              <div>
                <label htmlFor="utr" className="block text-xs uppercase tracking-wider font-bold text-charcoal-ink mb-1.5">
                  12-Digit UPI Reference / UTR Number <span className="text-alert-red">*</span>
                </label>
                <input
                  id="utr"
                  type="text"
                  value={utrNumber}
                  onChange={(e) => {
                    setUtrNumber(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. 428910834920"
                  className="w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink font-mono text-sm border border-soft-border focus:outline-none focus:border-diwali-gold"
                />
                {error && <p className="text-xs text-alert-red mt-1">{error}</p>}
                <p className="text-[11px] text-muted-slate mt-1">
                  You can find this in your payment app's transaction history under "UPI Ref No" or "UTR".
                </p>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink rounded-xl flex items-center justify-center gap-2 font-bold text-base shadow-md transition-all active:translate-y-px cursor-pointer"
              >
                <span>I Have Completed Payment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Order Reference Slip (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
          <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-6">
            <h2 className="font-headline-sm text-base font-bold text-night-navy pb-3 mb-4 border-b border-soft-border/60">
              Order Details
            </h2>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-slate">Order ID:</span>
                <span className="font-mono font-bold text-night-navy">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-slate">Customer Name:</span>
                <span className="font-semibold text-charcoal-ink">{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-slate">Contact Phone:</span>
                <span className="font-mono text-charcoal-ink">+91 {order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-slate">Destination:</span>
                <span className="text-right text-charcoal-ink max-w-[200px] truncate">
                  {order.city} - {order.pincode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-slate">Items:</span>
                <span className="font-mono">{order.items.length} Varieties</span>
              </div>

              <div className="pt-3 border-t border-soft-border/60 flex justify-between items-baseline">
                <span className="font-bold text-sm text-night-navy">Amount Due</span>
                <span className="font-mono text-xl font-bold text-night-navy">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-cream-canvas rounded-xl border border-soft-border flex items-start gap-2.5 text-xs text-muted-slate">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-night-navy">Owner Verification:</strong> Once submitted, Sujith will verify this payment against bank records and confirm your parcel dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
