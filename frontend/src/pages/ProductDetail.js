import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../api.js';
import { useCart } from '../context/CartContext.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => { (async () => setP(await apiFetch(`/products/${id}`)))(); }, [id]);

  if (!p) return <div>Loading...</div>;

  return (
    <div className="detail">
      <img src={p.imageUrl} alt={p.name} />
      <div>
        <h2>{p.name}</h2>
        <p>₹{p.price}</p>
        <p>{p.description}</p>
        <div>
          <label>Size:</label>
          <select value={size} onChange={e => setSize(e.target.value)}>
            {p.sizes.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} />
        </div>
        <button onClick={() => addToCart({ product: p._id, name: p.name, price: p.price, imageUrl: p.imageUrl, size, quantity: qty })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}