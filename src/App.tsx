import React from 'react';
import { CartProvider } from './context/CartContext';
import { AppContent } from './AppContent';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
