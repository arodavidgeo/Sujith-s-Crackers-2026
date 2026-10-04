import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, Home, SlidersHorizontal } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { FreeDeliveryBar } from '../components/FreeDeliveryBar';
import { INITIAL_CATEGORIES, getStoredProducts } from '../lib/storage';

interface ProductsPageProps {
  initialCategory?: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (path: string, param?: string) => void;
  onViewProduct: (productId: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory,
  searchQuery,
  onSearchChange,
  onNavigate,
  onViewProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'discount-high'>('featured');

  const allProducts = getStoredProducts();

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.offer_price - b.offer_price;
      }
      if (sortBy === 'price-high') {
        return b.offer_price - a.offer_price;
      }
      if (sortBy === 'discount-high') {
        const discountA = (a.original_price - a.offer_price) / a.original_price;
        const discountB = (b.original_price - b.offer_price) / b.original_price;
        return discountB - discountA;
      }
      return 0; // default featured
    });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Free Delivery Bar */}
      <FreeDeliveryBar />

      {/* Catalog Main Header & Interactive Controls */}
      <section className="flex flex-col gap-4">
        {/* Breadcrumbs & Meta Counts */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-slate">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-night-navy transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-charcoal-ink font-semibold">Crackers Catalog</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-primary font-bold">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 bg-pure-surface px-3 py-1 rounded-full shadow-sm border border-soft-border/70">
            <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
            <span className="font-mono text-xs text-charcoal-ink font-semibold">
              Showing {filteredProducts.length} Available Products
            </span>
          </div>
        </div>

        {/* Title and Search Strip */}
        <div className="bg-pure-surface rounded-2xl p-5 shadow-sm border border-soft-border flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-lg text-2xl md:text-3xl text-charcoal-ink tracking-tight font-bold">
                Crackers Catalog
              </h1>
              <p className="text-xs text-muted-slate mt-1">
                Authentic Sivakasi festive fireworks direct from workshop inventory. Safe packaging and doorstep delivery.
              </p>
            </div>

            {/* Search Bar with Live Clear */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search sparklers, chakkars, gift hampers..."
                className="w-full bg-cream-canvas text-charcoal-ink placeholder:text-muted-slate text-sm pl-10 pr-9 py-2.5 rounded-xl border border-soft-border focus:outline-none focus:border-diwali-gold transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-slate hover:text-charcoal-ink"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips & Sorter Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-soft-border/50">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-diwali-gold text-charcoal-ink shadow-sm'
                    : 'bg-cream-canvas hover:bg-surface-container text-charcoal-ink border border-soft-border/70'
                }`}
              >
                All Categories
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? 'bg-night-navy text-white shadow-sm'
                      : 'bg-cream-canvas hover:bg-surface-container text-charcoal-ink border border-soft-border/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-muted-slate" />
              <label htmlFor="sortSelect" className="text-xs text-muted-slate font-medium">
                Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-cream-canvas text-charcoal-ink text-xs font-semibold px-3 py-2 rounded-lg border border-soft-border focus:outline-none focus:border-diwali-gold cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount-high">Discount: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="w-full bg-pure-surface rounded-2xl p-12 text-center border border-soft-border shadow-sm flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-muted-slate mb-3 stroke-1" />
            <h3 className="font-headline-sm text-lg font-bold text-night-navy mb-1">
              No Crackers Found
            </h3>
            <p className="text-sm text-muted-slate max-w-sm mb-6">
              We couldn't find any products matching your current search or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                onSearchChange('');
              }}
              className="bg-diwali-gold text-charcoal-ink font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:bg-diwali-gold/90 transition-all text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
