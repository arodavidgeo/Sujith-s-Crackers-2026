import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateCustomerSupportWhatsApp } from '../lib/notifications';

export const ContactPage: React.FC = () => {
  const { settings } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const whatsappDirectUrl = generateCustomerSupportWhatsApp(
    settings,
    message ? `Hello Sujith, I am ${name} (+91 ${phone}). ${message}` : undefined
  );

  return (
    <div className="w-full flex flex-col gap-8 py-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wider uppercase font-bold">
          <span className="w-2 h-2 rounded-full bg-diwali-gold animate-pulse" />
          <span>Direct Shop Help Desk</span>
        </div>
        <h1 className="font-headline-lg text-3xl font-extrabold text-night-navy tracking-tight">
          Contact {settings.business_name}
        </h1>
        <p className="text-sm text-muted-slate leading-relaxed">
          Have questions about festive stock, bulk orders, or doorstep deliveries? Reach out to us directly through phone, WhatsApp, or the enquiry form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Channels & Location (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="bg-pure-surface rounded-2xl p-6 shadow-sm border border-soft-border flex flex-col gap-4">
            <h2 className="font-headline-sm text-lg font-bold text-night-navy">
              Direct Contact Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <a
                href={`tel:${settings.phone}`}
                className="p-4 rounded-xl bg-cream-canvas hover:bg-surface-container transition-all border border-soft-border flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-night-navy group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-slate group-hover:text-night-navy transition-colors" />
                </div>
                <div className="mt-4">
                  <span className="text-[11px] uppercase tracking-wider text-muted-slate font-bold block">
                    Phone Hotline
                  </span>
                  <span className="font-mono text-base font-bold text-night-navy block mt-0.5">
                    +91 {settings.phone}
                  </span>
                  <span className="text-xs text-muted-slate mt-1 block">
                    {settings.opening_hours}
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-cream-canvas hover:bg-surface-container transition-all border border-soft-border flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-success-green/15 flex items-center justify-center text-success-green">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-success-green bg-success-green/15 px-2 py-0.5 rounded">
                    Direct
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-[11px] uppercase tracking-wider text-muted-slate font-bold block">
                    WhatsApp Chat
                  </span>
                  <span className="font-mono text-base font-bold text-night-navy block mt-0.5">
                    +91 {settings.phone}
                  </span>
                  <span className="text-xs text-success-green font-semibold mt-1 block">
                    Message directly on WhatsApp →
                  </span>
                </div>
              </a>
            </div>

            {/* Location Box */}
            <div className="p-4 rounded-xl bg-cream-canvas border border-soft-border flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-night-navy shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-slate font-bold">
                    Shop Location
                  </span>
                  <p className="text-xs text-muted-slate mt-1">
                    Click below to open our official location pin on Google Maps.
                  </p>
                  <a
                    href={settings.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-bold underline mt-2 hover:text-night-navy transition-colors"
                  >
                    <span>View Shop on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-pure-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-soft-border flex flex-col">
            <h2 className="font-headline-sm text-lg font-bold text-night-navy mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-muted-slate mb-6">
              Leave your details and query, and our shop owner will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-6 bg-cream-canvas rounded-xl border border-soft-border text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-success-green" />
                <h3 className="font-headline-sm text-base font-bold text-night-navy">
                  Thank You, {name}!
                </h3>
                <p className="text-xs text-muted-slate max-w-sm">
                  Your message has been noted. We will contact you at +91 {phone} shortly.
                </p>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:opacity-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp as well</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="c-name" className="block text-xs uppercase tracking-wider font-bold text-charcoal-ink mb-1.5">
                    Your Name <span className="text-alert-red">*</span>
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full h-11 px-4 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border border-soft-border focus:outline-none focus:border-diwali-gold"
                  />
                </div>

                <div>
                  <label htmlFor="c-phone" className="block text-xs uppercase tracking-wider font-bold text-charcoal-ink mb-1.5">
                    Mobile Number <span className="text-alert-red">*</span>
                  </label>
                  <div className="flex rounded-xl bg-cream-canvas border border-soft-border overflow-hidden h-11">
                    <span className="inline-flex items-center px-3.5 bg-surface-container font-mono text-xs text-night-navy font-bold select-none border-r border-soft-border">
                      +91
                    </span>
                    <input
                      id="c-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9842177340"
                      className="w-full px-3.5 text-charcoal-ink font-mono text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-msg" className="block text-xs uppercase tracking-wider font-bold text-charcoal-ink mb-1.5">
                    Message / Inquiry <span className="text-alert-red">*</span>
                  </label>
                  <textarea
                    id="c-msg"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what crackers you're looking for or ask about delivery areas..."
                    className="w-full p-3.5 rounded-xl bg-cream-canvas text-charcoal-ink text-sm border border-soft-border focus:outline-none focus:border-diwali-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-diwali-gold hover:bg-diwali-gold/90 text-charcoal-ink font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:translate-y-px"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
