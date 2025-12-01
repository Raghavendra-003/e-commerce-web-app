import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.js';
import { apiFetch } from '../api.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  // Sync user cart from server when logged in
  useEffect(() => {
    const load = async () => {
      if (token) {
        try {
          const serverCart = await apiFetch('/cart', { token });
          setCart(serverCart.map(ci => ({
            product: ci.product._id || ci.product,
            name: ci.product.name,
            price: ci.product.price,
            imageUrl: ci.product.imageUrl,
            size: ci.size,
            quantity: ci.quantity
          })));
        } catch (e) {}
      }
    };
    load();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (item) => {
    if (token) {
      const updated = await apiFetch('/cart/add', { method: 'POST', token, body: { product: item.product, size: item.size, quantity: item.quantity || 1 } });
      setCart(updated.map(ci => ({
        product: ci.product._id || ci.product,
        name: ci.product.name,
        price: ci.product.price,
        imageUrl: ci.product.imageUrl,
        size: ci.size,
        quantity: ci.quantity
      })));
    } else {
      // Guest cart
      const idx = cart.findIndex(ci => ci.product === item.product && ci.size === item.size);
      if (idx >= 0) {
        const next = [...cart];
        next[idx].quantity += item.quantity || 1;
        setCart(next);
      } else {
        setCart([...cart, { ...item, quantity: item.quantity || 1 }]);
      }
    }
  };

  const updateQuantity = async (product, size, quantity) => {
    if (token) {
      const updated = await apiFetch('/cart/update', { method: 'PUT', token, body: { product, size, quantity } });
      setCart(updated.map(ci => ({
        product: ci.product._id || ci.product,
        name: ci.product.name,
        price: ci.product.price,
        imageUrl: ci.product.imageUrl,
        size: ci.size,
        quantity: ci.quantity
      })));
    } else {
      const next = cart.map(ci => ci.product === product && ci.size === size ? { ...ci, quantity } : ci).filter(ci => ci.quantity > 0);
      setCart(next);
    }
  };

  const removeItem = async (product, size) => {
    if (token) {
      const updated = await apiFetch('/cart/remove', { method: 'DELETE', token, body: { product, size } });
      setCart(updated.map(ci => ({
        product: ci.product._id || ci.product,
        name: ci.product.name,
        price: ci.product.price,
        imageUrl: ci.product.imageUrl,
        size: ci.size,
        quantity: ci.quantity
      })));
    } else {
      setCart(cart.filter(ci => !(ci.product === product && ci.size === size)));
    }
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

  return <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, total }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);