import React from 'react';
import { ShieldCheck, Lock, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PrivacyPage: React.FC = () => {
  const { settings } = useCart();

  return (
    <div className="w-full max-w-4xl mx-auto py-6 flex flex-col gap-6">
      <div className="bg-pure-surface rounded-2xl p-6 sm:p-10 shadow-sm border border-soft-border">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-soft-border">
          <div className="w-10 h-10 rounded-xl bg-diwali-gold/20 flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-night-navy">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-slate mt-0.5">
              Effective Date: {new Date().getFullYear()} • {settings.business_name}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-charcoal-ink leading-relaxed">
          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              1. Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              When you place an order or contact {settings.business_name}, we collect only necessary fulfillment information:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-muted-slate mt-2 space-y-1">
              <li>Full Name</li>
              <li>Mobile Telephone Number (used for WhatsApp delivery updates and call verification)</li>
              <li>Physical Delivery Address, City, and Postal Pincode</li>
              <li>Order items, quantities, and transaction reference (UTR) numbers</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              2. Why We Collect This Information
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              Your information is exclusively utilized for:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-muted-slate mt-2 space-y-1">
              <li>Processing and packaging your selected crackers</li>
              <li>Verifying bank credit match for UPI transfers</li>
              <li>Coordinating delivery schedules to your destination address</li>
              <li>Direct customer service through phone (+91 {settings.phone}) and WhatsApp</li>
              <li>Providing you with your order status and invoice records</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              3. Data Security &amp; Storage
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              We do not sell, rent, or trade your personal data to any marketing agencies or third-party advertisers. Order records are stored securely and accessed strictly by our store management for dispatch operations.
            </p>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              4. Third-Party Services
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              The services actively utilized are:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-muted-slate mt-2 space-y-1">
              <li><strong>UPI Payment Applications:</strong> Payments occur directly between your UPI provider (GPay, PhonePe, Paytm, BHIM) and the merchant account ({settings.upi_id}). We never store your bank passwords, PINs, or card credentials.</li>
              <li><strong>WhatsApp:</strong> Used optionally for order receipts, tracking confirmations, and live customer communication.</li>
              <li><strong>Local Couriers / Transport Depots:</strong> Delivery addresses are shared solely with logistics personnel responsible for physical parcel transit.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline-sm text-base font-bold text-night-navy mb-2">
              5. Customer Rights &amp; Contact
            </h2>
            <p className="text-xs sm:text-sm text-muted-slate leading-relaxed">
              If you wish to review, update, or request removal of your contact details from our records after order completion, contact us at +91 {settings.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
