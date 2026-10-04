import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FreeDeliveryBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { subtotal, freeDeliveryThreshold, freeDeliveryRemaining, freeDeliveryProgress } = useCart();

  const isEligible = subtotal >= freeDeliveryThreshold;

  return (
    <div className={`w-full bg-pure-surface rounded-xl p-4 md:p-5 shadow-sm border border-soft-border/70 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            isEligible ? 'bg-success-green/15 text-success-green' : 'bg-diwali-gold/20 text-primary'
          }`}>
            {isEligible ? <CheckCircle2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-sm text-base md:text-lg font-bold text-night-navy">
                {isEligible ? 'Free Home Delivery Applied!' : `Add ₹${freeDeliveryRemaining.toLocaleString('en-IN')} more for Free Delivery`}
              </span>
              <span className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${
                isEligible ? 'bg-success-green/15 text-success-green' : 'bg-diwali-gold/20 text-primary'
              }`}>
                {isEligible ? 'QUALIFIED' : `THRESHOLD: ₹${freeDeliveryThreshold.toLocaleString('en-IN')}`}
              </span>
            </div>
            <p className="text-xs text-muted-slate mt-0.5">
              {isEligible
                ? 'Your order qualifies for complimentary doorstep delivery!'
                : `Orders of ₹${freeDeliveryThreshold.toLocaleString('en-IN')} or above receive free doorstep delivery.`}
            </p>
          </div>
        </div>

        {/* Progress Percentage Badge */}
        <div className="w-full md:w-64 flex flex-col gap-1.5 shrink-0">
          <div className="flex justify-between font-mono text-xs text-charcoal-ink">
            <span>Cart: ₹{subtotal.toLocaleString('en-IN')}</span>
            <span className="text-primary font-bold">{Math.round(freeDeliveryProgress)}%</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isEligible ? 'bg-success-green' : 'bg-diwali-gold'
              }`}
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
