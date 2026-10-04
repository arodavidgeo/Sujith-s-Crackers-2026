import React from 'react';
import { ShoppingBag, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, items } = useCart();
  const cartItem = items.find(item => item.product.id === product.id);
  const inCart = Boolean(cartItem);

  const discountPercentage = Math.round(
    ((product.original_price - product.offer_price) / product.original_price) * 100
  );

  const savings = product.original_price - product.offer_price;

  const isOutOfStock = product.stock <= 0 || !product.is_available;

  return (
    <article className="product-card group bg-pure-surface rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-soft-border/70 flex flex-col justify-between">
      <div>
        {/* Visual Image Stage */}
        <div 
          onClick={() => onViewDetails(product.id)}
          className="relative w-full aspect-square rounded-xl bg-cream-canvas overflow-hidden mb-3.5 flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-alert-red text-white font-mono text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
              {discountPercentage}% OFF
            </span>
          )}
          <span className="absolute top-2.5 right-2.5 bg-pure-surface/90 text-charcoal-ink text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm font-medium">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-alert-red' : 'bg-success-green'}`} />
            <span className={`font-mono ${isOutOfStock ? 'text-alert-red font-semibold' : 'text-success-green'}`}>
              {isOutOfStock ? 'Out of Stock' : 'In Stock • Available'}
            </span>
          </div>

          <h2
            onClick={() => onViewDetails(product.id)}
            className="font-headline-sm text-base text-charcoal-ink font-bold leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h2>

          <p className="text-xs text-muted-slate line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-soft-border/50 flex flex-col gap-3">
        {/* Pricing Block */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl text-charcoal-ink font-bold">
              ₹{product.offer_price.toLocaleString('en-IN')}
            </span>
            {product.original_price > product.offer_price && (
              <span className="font-mono text-xs text-muted-slate line-through">
                ₹{product.original_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="text-xs text-success-green font-medium font-mono">
              Save ₹{savings}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => addToCart(product, 1)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-sm active:translate-y-px ${
            isOutOfStock
              ? 'bg-surface-container text-muted-slate cursor-not-allowed'
              : inCart
              ? 'bg-night-navy text-white hover:bg-secondary'
              : 'bg-diwali-gold text-charcoal-ink hover:bg-diwali-gold/90'
          }`}
        >
          {isOutOfStock ? (
            <span>Sold Out</span>
          ) : inCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added ({cartItem?.quantity})</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
