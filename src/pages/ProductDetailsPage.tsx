import React, { useState } from 'react';
import { 
  ChevronRight, 
  Home, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Factory,
  ArrowLeft
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { getStoredProducts } from '../lib/storage';

interface ProductDetailsPageProps {
  productId: string;
  onNavigate: (path: string, param?: string) => void;
  onViewProduct: (productId: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productId,
  onNavigate,
  onViewProduct,
}) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const allProducts = getStoredProducts();
  const product = allProducts.find((p) => p.id === productId) || allProducts[0];

  const inCartItem = items.find((item) => item.product.id === product?.id);

  if (!product) {
    return (
      <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border">
        <p className="text-muted-slate mb-4">Product not found.</p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-diwali-gold text-charcoal-ink font-semibold px-6 py-2 rounded-lg"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((product.original_price - product.offer_price) / product.original_price) * 100
  );
  const savings = product.original_price - product.offer_price;
  const isOutOfStock = product.stock <= 0 || !product.is_available;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-muted-slate text-xs font-semibold">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-night-navy transition-colors flex items-center gap-1"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate('products')}
          className="hover:text-night-navy transition-colors"
        >
          Crackers
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate('products', product.category)}
          className="hover:text-night-navy transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal-ink truncate">{product.name}</span>
      </nav>

      {/* Product Core Grid (Asymmetric Split from Stitch) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Visual Studio */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Primary Viewer Card */}
          <div className="relative bg-pure-surface rounded-2xl overflow-hidden shadow-sm border border-soft-border aspect-square flex items-center justify-center p-6 group">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 bg-success-green text-white px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider shadow-sm font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Genuine Batch</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-night-navy text-diwali-gold px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider shadow-sm font-semibold">
                <span>{product.category}</span>
              </span>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain relative z-0 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Direct Merchant Guarantee Card */}
          <div className="bg-pure-surface rounded-xl p-4 border border-soft-border flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cream-canvas text-primary flex items-center justify-center shrink-0 shadow-sm border border-soft-border/50">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-night-navy">Direct Sivakasi Workshop Pack</h4>
                <p className="text-[11px] text-muted-slate">Stored in humidity-controlled depot. Zero dud guarantee.</p>
              </div>
            </div>
            <span className="font-mono text-xs text-success-green font-bold uppercase shrink-0">
              100% Tested
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Commerce Block & Selection */}
        <div className="lg:col-span-7 flex flex-col gap-5 bg-pure-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-soft-border">
          {/* Category & Stock Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-soft-border/50">
            <div className="flex items-center gap-2">
              <span className="bg-cream-canvas text-night-navy px-3 py-1 rounded-full text-xs font-bold border border-soft-border/60">
                {product.category}
              </span>
              {product.unit_info && (
                <>
                  <span className="text-muted-slate text-xs">•</span>
                  <span className="font-mono text-xs text-muted-slate">{product.unit_info}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-alert-red' : 'bg-success-green animate-pulse'}`} />
              <span className={`font-bold ${isOutOfStock ? 'text-alert-red' : 'text-success-green'}`}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock} Units)`}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-1">
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-charcoal-ink font-bold leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-muted-slate leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Pricing Deck */}
          <div className="bg-cream-canvas rounded-xl p-4 sm:p-5 flex flex-wrap items-baseline justify-between gap-4 border border-soft-border/70">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-night-navy">
                ₹{product.offer_price.toLocaleString('en-IN')}
              </span>
              {product.original_price > product.offer_price && (
                <span className="text-muted-slate line-through font-mono text-base">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
              {savings > 0 && (
                <span className="bg-alert-red/10 text-alert-red px-2 py-0.5 rounded font-mono text-xs font-bold">
                  SAVE ₹{savings} ({discountPercentage}% OFF)
                </span>
              )}
            </div>
            <div className="text-xs text-muted-slate font-medium text-right">
              <span>Inclusive of all GST &amp; Packaging</span>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-pure-surface border border-soft-border rounded-xl h-12 shadow-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock || quantity <= 1}
                className="w-12 h-full flex items-center justify-center text-charcoal-ink hover:bg-cream-canvas rounded-l-xl transition-colors disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-mono text-base font-bold text-night-navy select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                disabled={isOutOfStock}
                className="w-12 h-full flex items-center justify-center text-charcoal-ink hover:bg-cream-canvas rounded-r-xl transition-colors disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 h-12 w-full rounded-xl flex items-center justify-center gap-2.5 font-bold text-sm shadow-md transition-all active:translate-y-px ${
                isOutOfStock
                  ? 'bg-surface-container text-muted-slate cursor-not-allowed'
                  : 'bg-diwali-gold text-charcoal-ink hover:bg-diwali-gold/90'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>
                {isOutOfStock
                  ? 'Sold Out'
                  : inCartItem
                  ? `Add More (Cart Has ${inCartItem.quantity})`
                  : 'Add to Cart'}
              </span>
            </button>
          </div>

          {/* Logistics & Dispatch Notice */}
          <div className="bg-cream-canvas/60 rounded-xl p-4 border border-soft-border space-y-2 mt-2">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-success-green shrink-0 mt-0.5" />
              <div className="text-xs text-charcoal-ink leading-relaxed">
                <span className="font-bold text-night-navy">Doorstep Dispatch:</span> Direct dispatch across Tamil Nadu, Bangalore and nearby regions. Free delivery above ₹5,000.
              </div>
            </div>
          </div>

          {/* Safety Information */}
          {product.safety_info && (
            <div className="bg-pure-surface rounded-xl p-4 border border-soft-border/80 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-alert-red shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-night-navy">Safety Directions</span>
                <p className="text-xs text-muted-slate leading-relaxed">
                  {product.safety_info}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="w-full mt-4">
          <h3 className="font-headline-lg text-xl font-bold text-night-navy mb-4">
            More in {product.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
