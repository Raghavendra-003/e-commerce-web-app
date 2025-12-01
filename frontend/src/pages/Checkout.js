import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext.js';
import { apiFetch } from '../api.js';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { token } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!token) {
      setError('Please login to checkout.');
      return;
    }
    try {
      const res = await apiFetch('/orders/checkout', { method: 'POST', token });
      setMsg('Order placed successfully!');
      clearCart();
      setTimeout(() => navigate('/orders'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {!token && <div className="info">Mock checkout: login required.</div>}
      <div>
        <h3>Summary</h3>
        <ul>
          {cart.map(ci => (
            <li key={`${ci.product}-${ci.size}`}>
              {ci.name} — Size: {ci.size} — Qty: {ci.quantity} — ₹{ci.price}
            </li>
          ))}
        </ul>
        <h3>Total: ₹{total}</h3>
      </div>
      {msg && <div className="success">{msg}</div>}
      {error && <div className="error">{error}</div>}
      <button onClick={placeOrder} disabled={!token || cart.length === 0}>Place Order</button>
    </div>
  );
}