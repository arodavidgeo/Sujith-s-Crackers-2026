import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderReceivedPage } from './pages/OrderReceivedPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { Order } from './types';
import { useCart } from './context/CartContext';
import { generateCustomerSupportWhatsApp } from './lib/notifications';

export const AppContent: React.FC = () => {
  const { settings } = useCart();
  const [currentPath, setCurrentPath] = useState<string>('home');
  const [pathParam, setPathParam] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath, pathParam]);

  // Update document title dynamically
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "Sujith's Cracker - Diwali Crackers at Special Prices",
      products: "Crackers Catalog - Sujith's Cracker",
      'product-details': "Product Details - Sujith's Cracker",
      cart: "Your Cart Manifest - Sujith's Cracker",
      checkout: "Checkout - Sujith's Cracker",
      payment: "UPI Payment - Sujith's Cracker",
      'order-received': "Order Received - Sujith's Cracker",
      'my-orders': "My Orders - Sujith's Cracker",
      about: "About Us - Sujith's Cracker",
      contact: "Contact Help Desk - Sujith's Cracker",
      privacy: "Privacy Policy - Sujith's Cracker",
      terms: "Terms & Conditions - Sujith's Cracker",
      admin: "Owner Depot Admin - Sujith's Cracker",
    };
    document.title = titles[currentPath] || "Sujith's Cracker";
  }, [currentPath]);

  const handleNavigate = (path: string, param?: string) => {
    setCurrentPath(path);
    if (param !== undefined) {
      setPathParam(param);
    }
  };

  const handleViewProduct = (productId: string) => {
    setPathParam(productId);
    setCurrentPath('product-details');
  };

  const handleOrderCreated = (order: Order) => {
    setActiveOrder(order);
    setCurrentPath('payment');
  };

  const handlePaymentSubmitted = (updatedOrder: Order) => {
    setActiveOrder(updatedOrder);
    setCurrentPath('order-received');
  };

  const isCustomerPage = currentPath !== 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-cream-canvas text-charcoal-ink">
      {isCustomerPage && (
        <Navbar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Main Page Canvas */}
      <main
        className={`flex-1 w-full max-w-[1360px] mx-auto px-4 md:px-6 ${
          isCustomerPage ? 'pt-24 pb-12' : 'pt-20'
        }`}
      >
        {currentPath === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPath === 'products' && (
          <ProductsPage
            initialCategory={pathParam}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPath === 'product-details' && (
          <ProductDetailsPage
            productId={pathParam}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPath === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPath === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {currentPath === 'payment' && (
          <PaymentPage
            order={activeOrder}
            onNavigate={handleNavigate}
            onPaymentSubmitted={handlePaymentSubmitted}
          />
        )}

        {currentPath === 'order-received' && (
          <OrderReceivedPage
            order={activeOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === 'my-orders' && (
          <MyOrdersPage onNavigate={handleNavigate} />
        )}

        {currentPath === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPath === 'contact' && <ContactPage />}

        {currentPath === 'privacy' && <PrivacyPage />}

        {currentPath === 'terms' && <TermsPage />}

        {currentPath === 'admin' && (
          <AdminPage onNavigateToStore={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      {isCustomerPage && <Footer onNavigate={handleNavigate} />}

      {/* Floating Sticky WhatsApp Support Button (Section 20 & 22) */}
      {isCustomerPage && (
        <a
          href={generateCustomerSupportWhatsApp(settings)}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-[0_12px_32px_-8px_rgba(16,36,61,0.25)] hover:scale-105 active:translate-y-px transition-all"
          title="Direct WhatsApp Support"
          aria-label="Direct WhatsApp Support"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">
            WhatsApp Order Support
          </span>
        </a>
      )}
    </div>
  );
};
