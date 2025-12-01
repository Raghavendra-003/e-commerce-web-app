import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext.js';

export default function Header() {
  const { token, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="brand">Pasovit Clothing</Link>
      <nav className="nav">
        <Link to="/products">Shop</Link>
        <Link to="/cart">Cart ({cart.reduce((s, c) => s + c.quantity, 0)})</Link>
        {token ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span className="user">Hi, {user.name}</span>
            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}