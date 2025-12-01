import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Welcome to Pasovit Clothing</h2>
      <p>Browse trendy apparel for Men, Women, and Kids.</p>
      <Link className="btn" to="/products">Start Shopping</Link>
    </div>
  );
}