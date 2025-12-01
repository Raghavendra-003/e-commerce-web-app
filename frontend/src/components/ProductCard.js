import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <img src={p.imageUrl} alt={p.name} />
      <div className="card-body">
        <h4>{p.name}</h4>
        <p>₹{p.price}</p>
        <Link to={`/products/${p._id}`}>View</Link>
      </div>
    </div>
  );
}