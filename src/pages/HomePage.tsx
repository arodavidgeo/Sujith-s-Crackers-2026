import React from 'react';
import { ArrowRight, Truck, ShieldCheck, Sparkles, Box, Flame, Volume2, Award, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { FreeDeliveryBar } from '../components/FreeDeliveryBar';
import { getStoredProducts } from '../lib/storage';

interface HomePageProps {
  onNavigate: (path: string, param?: string) => void;
  onViewProduct: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const { settings } = useCart();
  const products = getStoredProducts().filter(p => p.is_available);
  const featuredProducts = products.slice(0, 4);

  const categories = [
    { name: 'Ground Crackers', desc: 'Chakkars & Pots', icon: Flame },
    { name: 'Sparklers', desc: 'Zero-Dust Glow', icon: Sparkles },
    { name: 'Aerial Crackers', desc: 'Sky Shots', icon: Box },
    { name: 'Sound Crackers', desc: 'Garlands & Larries', icon: Volume2 },
    { name: 'Fancy Crackers', desc: 'Color Fountains', icon: Award },
    { name: 'Gift Boxes', desc: 'Festive Hampers', icon: Box },
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Asymmetric Hero Section Matching Stitch Design */}
      <section className="relative w-full pt-4 md:pt-8 pb-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Copy & Actions (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-diwali-gold/20 text-charcoal-ink mb-6 shadow-sm border border-diwali-gold/30">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                DIWALI SPECIAL FESTIVE DISPATCH
              </span>
            </div>

            <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-night-navy mb-6 tracking-tight font-extrabold leading-tight">
              Diwali Crackers at <span className="relative inline-block text-primary">Special Prices</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-slate mb-8 max-w-xl leading-relaxed">
              Shop crackers online and get them delivered to your home. Premium quality festive fireworks direct from Sivakasi workshops at honest wholesale rates.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-diwali-gold text-charcoal-ink font-semibold px-8 py-3.5 rounded-xl shadow-md hover:bg-diwali-gold/90 active:translate-y-px transition-all text-base"
              >
                <span>Shop Crackers</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pure-surface text-night-navy font-semibold px-7 py-3.5 rounded-xl shadow-sm border border-soft-border hover:bg-cream-canvas transition-all text-base"
              >
                <span>View Complete Catalog</span>
              </button>
            </div>

            {/* Micro value strip */}
            <div className="mt-8 pt-6 w-full flex items-center gap-6 sm:gap-10 border-t border-soft-border/70">
              <div>
                <p className="font-mono text-xl font-bold text-night-navy">Home Delivery</p>
                <p className="text-xs text-muted-slate">Direct to Your Doorstep</p>
              </div>
              <div className="w-px h-8 bg-soft-border"></div>
              <div>
                <p className="font-mono text-xl font-bold text-primary">₹0 Delivery Fee</p>
                <p className="text-xs text-muted-slate">Free Delivery Above ₹5,000</p>
              </div>
              <div className="w-px h-8 bg-soft-border"></div>
              <div>
                <p className="font-mono text-xl font-bold text-night-navy">Quality Tested</p>
                <p className="text-xs text-muted-slate">Moisture-Proof Sun Cured</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition (5 Columns) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative ambient aura */}
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-diwali-gold/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Main Imagery Showcase Card */}
              <div className="relative bg-pure-surface rounded-2xl overflow-hidden shadow-xl border border-soft-border">
                <div className="relative h-96 w-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_HnOoZ1f5MhPyXQWTCmckEqcyz4npXS-24h5ClLtyhBk_mV4J5KYhVSNu3Z2ewU2pEfJOpPeCCkVFWA7Y5Eok6KxyX--rZJ9fC1LAWFaw8lnzMdKVISpnsyMQAHzxcPdMO4Qh2WiGudkLhQo_kbCK7bmu1eLss4wc_ScaTMOipO4eMHbj5IrpaNV1HnKNRUOgo-WIniOkjjbTE2J8HCsGdp969BguUFsM2Nz-hGo-m-k1toEZJX6P6w"
                    alt="Authentic Diwali festive cracker boxes and sparklers"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-navy/90 via-night-navy/30 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5 text-pure-surface flex items-end justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded bg-diwali-gold text-charcoal-ink font-mono text-xs uppercase font-bold mb-2">
                        Festive Batch 2026
                      </span>
                      <p className="font-headline-sm text-lg font-bold text-white">Family Mega Hamper</p>
                      <p className="text-xs text-surface-variant">36 Assorted safe celebration fireworks</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold text-diwali-gold">₹2,850</span>
                      <span className="block line-through text-surface-variant/70 font-mono text-xs">₹4,200</span>
                    </div>
                  </div>
                </div>

                {/* Overlaid Trust Badge */}
                <div className="absolute top-4 left-4 bg-pure-surface/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-soft-border">
                  <ShieldCheck className="w-4 h-4 text-success-green" />
                  <span className="text-xs text-night-navy font-semibold">100% Genuine Sivakasi Crackers</span>
                </div>
              </div>

              {/* Overlapping Mini Floating Card */}
              <div className="absolute -bottom-5 -right-2 md:-right-4 bg-pure-surface rounded-xl p-3.5 shadow-lg border border-soft-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-night-navy leading-tight">Home Delivery Available</p>
                  <p className="text-[11px] text-muted-slate">Sturdy 5-Ply Fire-Safe Carton</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Pillar Value Proposition Strip */}
        <div className="mt-14 w-full bg-pure-surface rounded-2xl shadow-sm border border-soft-border p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-night-navy">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-night-navy">Home Delivery Available</h2>
              <p className="text-xs text-muted-slate mt-0.5">Reliable express delivery direct to your address</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-diwali-gold/20 flex items-center justify-center shrink-0 text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-night-navy">Free Delivery Above ₹5,000</h2>
              <p className="text-xs text-muted-slate mt-0.5">Unlocked automatically for qualifying family orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success-green/10 flex items-center justify-center shrink-0 text-success-green">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-night-navy">Authentic &amp; Fresh Batch</h2>
              <p className="text-xs text-muted-slate mt-0.5">Dry cured under Sivakasi sunshine with zero moisture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Delivery Reminder */}
      <FreeDeliveryBar />

      {/* Shop by Category */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-primary uppercase font-bold tracking-wider mb-1">
              <span>Curated Catalog</span>
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-night-navy font-bold">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-night-navy transition-colors self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => onNavigate('products', cat.name)}
                className="group bg-pure-surface rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-soft-border/70 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-cream-canvas flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-night-navy group-hover:text-primary">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="font-headline-sm text-sm font-bold text-night-navy mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-muted-slate">{cat.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-primary uppercase font-bold tracking-wider mb-1">
              <span>Featured Crackers</span>
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-night-navy font-bold">
              Popular Festive Crackers
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-night-navy transition-colors self-start md:self-auto"
          >
            <span>Explore Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Shop Location Callout */}
      <section className="w-full bg-pure-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-soft-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">
            Visit Our Shop
          </span>
          <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-night-navy">
            {settings.business_name} Physical Location
          </h3>
          <p className="text-sm text-muted-slate leading-relaxed">
            Locate our depot or contact us for direct festival pickups and bulk family carton inquiries.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={settings.location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-diwali-gold text-charcoal-ink font-semibold px-6 py-3 rounded-xl shadow-sm hover:bg-diwali-gold/90 transition-all text-sm"
          >
            <span>Get Directions on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-cream-canvas text-night-navy font-semibold px-6 py-3 rounded-xl border border-soft-border hover:bg-surface-container transition-all text-sm"
          >
            <span>Contact Shop</span>
          </button>
        </div>
      </section>
    </div>
  );
};
