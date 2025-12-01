import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import ProductList from './pages/ProductList.js';
import ProductDetail from './pages/ProductDetail.js';
import CartPage from './pages/CartPage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Checkout from './pages/Checkout.js';
import Orders from './pages/Orders.js';
import { useAuth } from './context/AuthContext.js';


export default function App() {
  const { token } = useAuth();
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}