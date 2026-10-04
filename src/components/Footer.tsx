import React from 'react';
import { Phone, MapPin, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onNavigate: (path: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings } = useCart();

  return (
    <footer className="w-full bg-night-navy text-cream-canvas pt-12 pb-8 mt-16 shadow-[0_-8px_24px_-4px_rgba(16,36,61,0.06)]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              alt="Sujith's Cracker Brand Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V_AeblyAJbFpEZuUAWXlxGu9B3UTPIrU2-H_SKBwaVk_nZ3VQ2-dM_SJhKXi5s3sdaRczHFQGP-Kq8ldtFKx04HvvxCDOh1_o3JNNfR5J71It9RcgH0MmEAfxgXOPYNhdSVs_qGiL8yG4QzdAHXySvayEfBcdg90JwdQ_rMq9MTs5vIuKMyu-Kf6q2GUTxsSYhSD3NHJp6iOP9_GWH6jaW-FV4lmAew6Ix0i_bbpLkM7AWFRzrkg4bBnXU"
            />
            <span className="font-headline-sm text-xl text-cream-canvas font-bold">
              {settings.business_name}
            </span>
          </div>
          <p className="text-sm text-surface-variant leading-relaxed">
            Quality festive crackers direct to your doorstep. Safe celebration, honest prices, and personalized customer care.
          </p>
          <div className="flex items-center gap-2 text-diwali-gold font-mono text-xs pt-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Verified Genuine Sivakasi Crackers</span>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-col gap-2">
          <span className="font-headline-sm text-base text-diwali-gold font-bold mb-1">
            Product Categories
          </span>
          <button
            onClick={() => onNavigate('products', 'Ground Crackers')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Ground Crackers &amp; Flower Pots
          </button>
          <button
            onClick={() => onNavigate('products', 'Sparklers')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Sparklers
          </button>
          <button
            onClick={() => onNavigate('products', 'Aerial Crackers')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Aerial Sky Shots
          </button>
          <button
            onClick={() => onNavigate('products', 'Sound Crackers')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Sound Crackers &amp; Garlands
          </button>
          <button
            onClick={() => onNavigate('products', 'Fancy Crackers')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Fancy Crackers
          </button>
          <button
            onClick={() => onNavigate('products', 'Gift Boxes')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Festive Gift Boxes
          </button>
        </div>

        {/* Safety & Store Policies */}
        <div className="flex flex-col gap-2">
          <span className="font-headline-sm text-base text-diwali-gold font-bold mb-1">
            Safety &amp; Assurances
          </span>
          <button
            onClick={() => onNavigate('about')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            About Our Shop
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Customer Support &amp; Enquiries
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left"
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="text-sm text-surface-variant hover:text-diwali-gold transition-colors text-left pt-2 font-mono text-xs"
          >
            Owner Depot Portal Access →
          </button>
        </div>

        {/* Physical Store & Location */}
        <div className="flex flex-col gap-3">
          <span className="font-headline-sm text-base text-diwali-gold font-bold mb-1">
            Store &amp; Contact
          </span>
          <div className="text-sm text-surface-variant flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-diwali-gold shrink-0 mt-0.5" />
            <a href={`tel:${settings.phone}`} className="hover:text-diwali-gold font-mono font-semibold">
              +91 {settings.phone}
            </a>
          </div>
          <div className="text-sm text-surface-variant flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-diwali-gold shrink-0 mt-0.5" />
            <span>{settings.opening_hours}</span>
          </div>
          <div className="text-sm text-surface-variant flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-diwali-gold shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span>Shop Location on Google Maps</span>
              <a
                href={settings.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-diwali-gold font-semibold underline underline-offset-4 hover:opacity-90 mt-0.5"
              >
                <span>View Google Maps Location</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1360px] mx-auto px-4 md:px-6 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-variant/80">
        <p>© {new Date().getFullYear()} {settings.business_name}. All rights reserved.</p>
        <div className="flex items-center gap-4 font-mono">
          <span>UPI: {settings.upi_id}</span>
          <span>•</span>
          <span>GPay / PhonePe / Paytm</span>
        </div>
      </div>
    </footer>
  );
};
