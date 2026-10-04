import React from 'react';
import { ShieldCheck, Truck, Sparkles, MapPin, ExternalLink, Phone, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings } = useCart();

  return (
    <div className="w-full flex flex-col gap-10 py-4">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-pure-surface shadow-sm border border-soft-border p-6 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start bg-cream-canvas px-3.5 py-1.5 rounded-full border border-soft-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-charcoal-ink font-bold tracking-wider uppercase">
                Direct Sivakasi Stockist
              </span>
            </div>

            <h1 className="font-headline-lg text-3xl sm:text-4xl text-night-navy font-extrabold leading-tight">
              About {settings.business_name}
            </h1>

            <p className="text-base text-charcoal-ink/80 leading-relaxed">
              Sujith's Cracker provides authentic festive crackers directly from trusted Sivakasi workshops to families and businesses. Our focus is honest wholesale pricing, reliable home delivery, and safe festive celebrations.
            </p>

            <p className="text-sm text-muted-slate leading-relaxed">
              We stock quality celebration fireworks including sparklers, ground chakkars, flower pots, aerial sky shots, sound crackers, and complete family gift boxes. All products are stored in humidity-controlled conditions to ensure dependable performance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-7 py-3 rounded-xl shadow-sm transition-all text-sm"
              >
                Browse Our Crackers
              </button>
              <a
                href={settings.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cream-canvas hover:bg-surface-container text-night-navy font-semibold px-6 py-3 rounded-xl border border-soft-border text-sm"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-soft-border">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2zRP0KTMcFdvLTpkke5BkkJCQoOROpHvleb8H7V74y5GOng29enLD7eeNDkbRMdII4OV10FRzzhavo_d4DjF7O9tuTqJS9bTHvn9ifE7nZyZeVs3vk9zoMjYT9kVW8pQV-XK0c7SCFD2ZQqImqnzgGyvT-7S-cWl2a6J__uGrGbaa8toMCS7YMnkicQbo1PDVst9eqN_Z59PiD_2Zh2T18QUC8MzVv-Z8MlpRw9RrhNubKN72M69Hfg"
                alt="Sujith's Cracker Depot"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-navy/85 via-night-navy/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="font-mono text-xs text-diwali-gold uppercase tracking-wider font-bold">
                  Quality Depot Storage
                </span>
                <p className="text-sm font-bold text-white mt-1">
                  Inspected &amp; packaged in heavy-grade cartons
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
            What We Stand For
          </span>
          <h2 className="font-headline-lg text-2xl font-bold text-night-navy mt-1">
            Our Core Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-diwali-gold/20 text-primary flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-headline-sm text-base font-bold text-night-navy mb-2">
                Quality Products
              </h3>
              <p className="text-xs text-charcoal-ink/80 leading-relaxed">
                Directly sourced from established Sivakasi manufacturers. Tested formulations with reliable ignition and vibrant festive colors.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-night-navy/10 text-night-navy flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-headline-sm text-base font-bold text-night-navy mb-2">
                Home Delivery
              </h3>
              <p className="text-xs text-charcoal-ink/80 leading-relaxed">
                Dedicated parcel dispatch network delivering safely to your home in heavy 5-ply cartons.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-success-green/10 text-success-green flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-headline-sm text-base font-bold text-night-navy mb-2">
                Free Delivery Above ₹5,000
              </h3>
              <p className="text-xs text-charcoal-ink/80 leading-relaxed">
                Every festive order reaching ₹5,000 automatically unlocks complimentary doorstep delivery across our service zones.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cream-canvas text-night-navy flex items-center justify-center mb-4 border border-soft-border">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-headline-sm text-base font-bold text-night-navy mb-2">
                Customer Support
              </h3>
              <p className="text-xs text-charcoal-ink/80 leading-relaxed">
                Direct phone and WhatsApp assistance from the shop owner to answer your inquiries and coordinate delivery timing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Location & Directions */}
      <section className="bg-pure-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-soft-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold">
            <MapPin className="w-4 h-4" />
            <span>Store Location</span>
          </div>
          <h2 className="font-headline-sm text-xl font-bold text-night-navy">
            Visit Our Shop Location
          </h2>
          <p className="text-sm text-muted-slate max-w-lg">
            Find Sujith's Cracker on Google Maps for in-person consultations, bulk orders, or depot visits.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <a
            href={settings.location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};
