import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, param?: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const { totalCount, subtotal, settings } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: 'home' },
    { label: 'Crackers', path: 'products' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
    { label: 'My Orders', path: 'my-orders' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPath !== 'products') {
      onNavigate('products');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pure-surface shadow-[0_8px_24px_-4px_rgba(16,36,61,0.06)] border-b border-soft-border/50">
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 shrink-0 text-left focus:outline-none"
          >
            <img
              alt="Sujith's Cracker Brand Logo"
              className="h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V_AeblyAJbFpEZuUAWXlxGu9B3UTPIrU2-H_SKBwaVk_nZ3VQ2-dM_SJhKXi5s3sdaRczHFQGP-Kq8ldtFKx04HvvxCDOh1_o3JNNfR5J71It9RcgH0MmEAfxgXOPYNhdSVs_qGiL8yG4QzdAHXySvayEfBcdg90JwdQ_rMq9MTs5vIuKMyu-Kf6q2GUTxsSYhSD3NHJp6iOP9_GWH6jaW-FV4lmAew6Ix0i_bbpLkM7AWFRzrkg4bBnXU"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg md:text-xl text-night-navy leading-none tracking-tight font-bold">
                {settings.business_name}
              </span>
              <span className="font-label-md text-xs text-primary font-medium tracking-wide mt-1">
                Light up your Diwali
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors font-label-lg px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-charcoal-ink hover:bg-cream-canvas'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Search, Cart & Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search Box (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center bg-cream-canvas rounded-lg px-3 py-2 w-52 lg:w-64 border border-soft-border/60 focus-within:border-diwali-gold transition-colors"
          >
            <Search className="w-4 h-4 text-muted-slate mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sparklers, gift boxes..."
              className="bg-transparent w-full text-charcoal-ink placeholder:text-muted-slate text-sm focus:outline-none"
            />
          </form>

          {/* Cart Button */}
          <button
            onClick={() => handleLinkClick('cart')}
            className="flex items-center gap-2.5 bg-cream-canvas hover:bg-surface-container-high transition-colors px-3 py-2 rounded-lg border border-soft-border/50 text-left"
            aria-label="View shopping cart"
          >
            <div className="relative flex items-center">
              <ShoppingBag className="w-5 h-5 text-night-navy" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-alert-red text-white font-mono text-[11px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] text-muted-slate leading-none">Total</span>
              <span className="font-mono text-xs font-bold text-night-navy leading-tight mt-0.5">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
          </button>

          {/* User / My Orders Icon */}
          <button
            onClick={() => handleLinkClick('my-orders')}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity shadow-sm"
            title="My Orders & Account"
            aria-label="My Orders"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-night-navy hover:bg-cream-canvas transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-pure-surface border-t border-soft-border px-4 py-4 shadow-lg animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-cream-canvas rounded-lg px-3 py-2.5 mb-4 border border-soft-border">
            <Search className="w-4 h-4 text-muted-slate mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sparklers, gift boxes..."
              className="bg-transparent w-full text-charcoal-ink placeholder:text-muted-slate text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                type="submit"
                className="text-xs bg-diwali-gold font-bold px-2 py-1 rounded text-charcoal-ink ml-1"
              >
                Go
              </button>
            )}
          </form>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base font-semibold flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-charcoal-ink hover:bg-cream-canvas'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-slate" />
                </button>
              );
            })}
            <div className="pt-2 border-t border-soft-border/60 mt-2">
              <button
                onClick={() => handleLinkClick('admin')}
                className="w-full text-left px-3 py-2 text-xs font-mono text-muted-slate hover:text-charcoal-ink"
              >
                Shop Owner Admin Portal →
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
