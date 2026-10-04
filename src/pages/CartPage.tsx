import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FreeDeliveryBar } from '../components/FreeDeliveryBar';

interface CartPageProps {
  onNavigate: (path: string, param?: string) => void;
  onViewProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onViewProduct }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    freeDeliveryRemaining,
  } = useCart();

  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  if (items.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-cream-canvas border border-soft-border flex items-center justify-center text-muted-slate mb-4 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-headline-lg text-2xl font-bold text-night-navy mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-muted-slate text-center max-w-sm mb-6">
          You haven't added any crackers to your cart yet. Explore our fresh Sivakasi festival batches.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 bg-diwali-gold text-charcoal-ink font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-diwali-gold/90 transition-all text-sm"
        >
          <span>Browse Crackers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-slate hover:text-night-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fireworks Catalog</span>
        </button>
        <div className="flex items-center gap-1.5 text-success-green font-mono text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Direct Sivakasi Stock</span>
        </div>
      </div>

      {/* Free Delivery Bar */}
      <FreeDeliveryBar />

      {/* Two-Column Order Sheet Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-pure-surface rounded-2xl p-5 shadow-sm border border-soft-border">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-soft-border/60">
              <h1 className="font-headline-md text-xl font-bold text-night-navy">
                Your Diwali Order Items
              </h1>
              <span className="font-mono text-xs font-bold bg-cream-canvas text-charcoal-ink px-2.5 py-1 rounded-full border border-soft-border">
                {items.length} Unique {items.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {/* Items List */}
            <div className="flex flex-col divide-y divide-soft-border/60">
              {items.map(({ product, quantity }) => {
                const itemTotal = product.offer_price * quantity;
                return (
                  <article
                    key={product.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        onClick={() => onViewProduct(product.id)}
                        className="relative w-20 h-20 shrink-0 bg-cream-canvas rounded-xl overflow-hidden border border-soft-border/70 flex items-center justify-center cursor-pointer group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h2
                          onClick={() => onViewProduct(product.id)}
                          className="font-headline-sm text-sm sm:text-base font-bold text-charcoal-ink hover:text-primary transition-colors cursor-pointer truncate"
                        >
                          {product.name}
                        </h2>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs text-muted-slate">Price:</span>
                          <span className="font-mono text-sm font-bold text-night-navy">
                            ₹{product.offer_price.toLocaleString('en-IN')}
                          </span>
                          {product.original_price > product.offer_price && (
                            <span className="font-mono text-xs text-muted-slate line-through">
                              ₹{product.original_price.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0">
                      {/* Stepper */}
                      <div className="flex items-center bg-cream-canvas rounded-lg border border-soft-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal-ink hover:bg-surface-container rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono text-sm font-bold text-night-navy select-none">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal-ink hover:bg-surface-container rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="flex items-center gap-3 min-w-[100px] justify-end">
                        <span className="font-mono text-base font-bold text-night-navy">
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-muted-slate hover:text-alert-red hover:bg-error-container/40 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-24">
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border">
            <h2 className="font-headline-sm text-lg font-bold text-night-navy pb-3 mb-4 border-b border-soft-border/60">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-center text-muted-slate">
                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-mono text-charcoal-ink font-semibold">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-muted-slate">
                <div className="flex flex-col">
                  <span>Home Delivery Fee</span>
                  {isFreeDelivery ? (
                    <span className="text-[11px] text-success-green font-semibold">
                      Free Home Delivery Applied
                    </span>
                  ) : (
                    <span className="text-[11px] text-primary font-medium">
                      Add ₹{freeDeliveryRemaining.toLocaleString('en-IN')} more for free delivery
                    </span>
                  )}
                </div>
                <span className={`font-mono font-bold ${isFreeDelivery ? 'text-success-green' : 'text-charcoal-ink'}`}>
                  {isFreeDelivery ? 'FREE' : `₹${deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="pt-4 border-t border-soft-border/70 flex justify-between items-baseline">
                <span className="font-headline-sm text-base font-bold text-night-navy">
                  Total Payable
                </span>
                <span className="font-mono text-2xl font-bold text-night-navy">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full mt-6 py-3.5 px-4 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink rounded-xl font-bold text-sm shadow-md transition-all active:translate-y-px flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
