import React, { useState } from 'react';
import { Truck, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';
import { generateNextOrderId, saveStoredOrder, saveStoredActivePhone } from '../lib/storage';

interface CheckoutPageProps {
  onNavigate: (path: string, param?: string) => void;
  onOrderCreated: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderCreated }) => {
  const { items, subtotal, deliveryFee, total } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [safetyChecked, setSafetyChecked] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border">
        <p className="text-muted-slate mb-4">Your cart is empty. Please add items before checking out.</p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-diwali-gold text-charcoal-ink font-semibold px-6 py-2.5 rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!address.trim()) {
      errs.address = 'Delivery address is required.';
    }

    if (!city.trim()) {
      errs.city = 'City / Town is required.';
    }

    const cleanPincode = pincode.replace(/\D/g, '');
    if (!cleanPincode || cleanPincode.length !== 6) {
      errs.pincode = 'Please enter a valid 6-digit Indian postal code.';
    }

    if (!safetyChecked) {
      errs.safety = 'Please confirm safe storage guidelines.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = generateNextOrderId();
    const cleanPhone = phone.replace(/\D/g, '');

    const newOrder: Order = {
      id: orderId,
      customer_name: fullName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      landmark: landmark.trim() || undefined,
      notes: notes.trim() || undefined,
      items: items.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        category: item.product.category,
        price: item.product.offer_price,
        original_price: item.product.original_price,
        quantity: item.quantity
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
      payment_status: 'Payment Pending',
      order_status: 'Payment Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    saveStoredOrder(newOrder);
    saveStoredActivePhone(cleanPhone);
    onOrderCreated(newOrder);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Stepper Header Section from Stitch */}
      <div className="w-full bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-5 mb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Step 1: Active */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-diwali-gold text-charcoal-ink flex items-center justify-center font-mono text-sm font-bold shadow-sm shrink-0">
              01
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-primary font-bold">Step 1 (Active)</span>
              <span className="text-sm font-bold text-charcoal-ink">Customer &amp; Delivery</span>
            </div>
          </div>
          <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-soft-border"></div>

          {/* Step 2: Upcoming */}
          <div className="flex items-center gap-3 w-full sm:w-auto opacity-60">
            <div className="w-10 h-10 rounded-full bg-surface-container text-muted-slate flex items-center justify-center font-mono text-sm font-semibold shrink-0">
              02
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-muted-slate font-medium">Step 2</span>
              <span className="text-sm font-medium text-muted-slate">UPI Payment</span>
            </div>
          </div>
          <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-surface-container"></div>

          {/* Step 3: Upcoming */}
          <div className="flex items-center gap-3 w-full sm:w-auto opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container text-muted-slate flex items-center justify-center font-mono text-sm font-semibold shrink-0">
              03
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-muted-slate font-medium">Step 3</span>
              <span className="text-sm font-medium text-muted-slate">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-soft-border/60">
            <div className="p-2.5 rounded-xl bg-cream-canvas text-primary border border-soft-border/60">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-headline-md text-xl font-bold text-night-navy leading-tight">
                Delivery &amp; Contact Details
              </h1>
              <p className="text-xs text-muted-slate mt-0.5">
                Please enter your active phone number for order verification and delivery updates.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="fullName">
                Full Name <span className="text-alert-red">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Karthik Subramanian"
                className={`w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border focus:outline-none transition-all ${
                  errors.fullName ? 'border-alert-red focus:border-alert-red' : 'border-soft-border focus:border-diwali-gold'
                }`}
              />
              {errors.fullName && <p className="text-xs text-alert-red mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile Number with +91 fixed badge */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="phone">
                Mobile Number (WhatsApp Enabled) <span className="text-alert-red">*</span>
              </label>
              <div className="flex rounded-xl bg-cream-canvas border border-soft-border overflow-hidden h-12">
                <span className="inline-flex items-center px-4 bg-surface-container font-mono text-sm text-night-navy font-bold select-none border-r border-soft-border">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9842177340"
                  className="w-full px-4 text-charcoal-ink font-mono text-sm bg-transparent focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-xs text-alert-red mt-1">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="address">
                Delivery Address (Door/Flat No, Street, Area) <span className="text-alert-red">*</span>
              </label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No. 42, 2nd Street, Gandhi Nagar"
                className={`w-full p-3.5 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border focus:outline-none resize-none transition-all ${
                  errors.address ? 'border-alert-red focus:border-alert-red' : 'border-soft-border focus:border-diwali-gold'
                }`}
              />
              {errors.address && <p className="text-xs text-alert-red mt-1">{errors.address}</p>}
            </div>

            {/* City & Pincode in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="city">
                  City / Town <span className="text-alert-red">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Coimbatore"
                  className={`w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border focus:outline-none transition-all ${
                    errors.city ? 'border-alert-red focus:border-alert-red' : 'border-soft-border focus:border-diwali-gold'
                  }`}
                />
                {errors.city && <p className="text-xs text-alert-red mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="pincode">
                  Pincode <span className="text-alert-red">*</span>
                </label>
                <input
                  id="pincode"
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="641002"
                  className={`w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink font-mono text-sm border focus:outline-none transition-all ${
                    errors.pincode ? 'border-alert-red focus:border-alert-red' : 'border-soft-border focus:border-diwali-gold'
                  }`}
                />
                {errors.pincode && <p className="text-xs text-alert-red mt-1">{errors.pincode}</p>}
              </div>
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="landmark">
                Nearest Landmark <span className="text-muted-slate font-normal">(Optional)</span>
              </label>
              <input
                id="landmark"
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Near Post Office / Opp. Bus Stand"
                className="w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border border-soft-border focus:outline-none focus:border-diwali-gold"
              />
            </div>

            {/* Delivery Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal-ink font-bold mb-1.5" htmlFor="notes">
                Delivery Notes / Special Instructions <span className="text-muted-slate font-normal">(Optional)</span>
              </label>
              <input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Call before delivery"
                className="w-full h-12 px-4 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border border-soft-border focus:outline-none focus:border-diwali-gold"
              />
            </div>

            {/* Safety Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={safetyChecked}
                  onChange={(e) => setSafetyChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-0 cursor-pointer accent-[#F4B51B]"
                />
                <span className="text-xs text-charcoal-ink leading-relaxed">
                  I confirm that fireworks will be stored safely away from flames, heat, and moisture, and handled only by adults under safe conditions.
                </span>
              </label>
              {errors.safety && <p className="text-xs text-alert-red mt-1">{errors.safety}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-14 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink rounded-xl flex items-center justify-center gap-3 shadow-md active:translate-y-px transition-all font-bold text-base cursor-pointer"
              >
                <span>Continue to UPI Payment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
          <div className="bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-6">
            <h2 className="font-headline-sm text-base font-bold text-night-navy pb-3 mb-4 border-b border-soft-border/60">
              Order Manifest Summary
            </h2>

            {/* Items Mini List */}
            <div className="flex flex-col divide-y divide-soft-border/40 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover shrink-0 bg-cream-canvas"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-charcoal-ink truncate">{product.name}</p>
                      <p className="text-muted-slate font-mono">x{quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-night-navy shrink-0">
                    ₹{(product.offer_price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary Totals */}
            <div className="pt-4 mt-2 border-t border-soft-border/60 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-muted-slate">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-charcoal-ink">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-muted-slate">
                <span>Delivery Fee</span>
                <span className={`font-mono font-bold ${deliveryFee === 0 ? 'text-success-green' : 'text-charcoal-ink'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-3 border-t border-soft-border/60 flex justify-between items-baseline">
                <span className="font-bold text-sm text-night-navy">Total Payable</span>
                <span className="font-mono text-xl font-bold text-night-navy">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-cream-canvas rounded-xl border border-soft-border flex items-center gap-2 text-xs text-muted-slate">
              <ShieldCheck className="w-4 h-4 text-success-green shrink-0" />
              <span>Payment will be verified before parcel dispatch.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
