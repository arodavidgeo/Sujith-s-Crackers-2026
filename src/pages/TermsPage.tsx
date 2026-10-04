import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const TermsPage: React.FC = () => {
  const { settings } = useCart();

  return (
    <div className="w-full max-w-4xl mx-auto py-6 flex flex-col gap-6">
      <div className="bg-pure-surface rounded-2xl p-6 sm:p-10 shadow-sm border border-soft-border">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-soft-border">
          <div className="w-10 h-10 rounded-xl bg-diwali-gold/20 flex items-center justify-center text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-night-navy">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-muted-slate mt-0.5">
              Operating Guidelines • {settings.business_name}
            </p>
          </div>
        </div>

        <div className="p-4 bg-cream-canvas rounded-xl border border-soft-border mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-charcoal-ink leading-relaxed">
            <strong>Important Legal Notice:</strong> Because this store lists fireworks and celebration crackers, final statutory compliance terms and shipping restrictions should be periodically reviewed by the shop owner before festive seasons in accordance with local municipal and state regulations.
          </p>
        </div>

        <div className="space-y-6 text-sm text-charcoal-ink leading-relaxed">
          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              1. Website Usage &amp; Catalog
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              By placing an order on this website, you confirm that you are at least 18 years of age. All products listed in our catalog represent genuine Sivakasi formulations manufactured in accordance with established safety standards.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              2. Pricing &amp; Offers
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              All prices are listed in Indian Rupees (₹) and include applicable taxes and standard depot packaging. Discounts and offer prices are seasonal and subject to change based on raw material availability and festival rush.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              3. Order Placement &amp; Payment Verification
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              Order submission creates an order record in our verification queue. Orders are not considered confirmed until payment receipt is verified by {settings.business_name} through your submitted UPI transaction reference (UTR) number.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              4. Delivery Policy
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              Orders below ₹{settings.free_delivery_threshold.toLocaleString('en-IN')} incur a standard delivery fee of ₹{settings.standard_delivery_fee}. Orders meeting or exceeding ₹{settings.free_delivery_threshold.toLocaleString('en-IN')} qualify for free home delivery across our designated service zones ({settings.delivery_zones}). Transit times vary by location, typically ranging between 2 to 4 business days.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              5. Cancellation &amp; Returns
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              Due to the sensitive nature of pyrotechnic goods, orders cannot be cancelled or returned once handed over to the courier dispatch team. If an order is cancelled prior to physical packing, refunds are processed via the original UPI method.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              6. Customer Responsibility &amp; Product Safety
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              Customers assume full responsibility for the safe storage and handling of purchased fireworks:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-muted-slate mt-2 space-y-1">
              <li>Store boxes in a cool, dry area away from heat sources, open flames, and direct sunlight.</li>
              <li>Always light fireworks outdoors under adult supervision with adequate clearance.</li>
              <li>Keep a bucket of water or sand nearby for safety.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
