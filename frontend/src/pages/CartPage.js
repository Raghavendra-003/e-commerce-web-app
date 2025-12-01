import React from 'react';
import { useCart } from '../context/CartContext.js';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, total } = useCart();

  if (!cart.length) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(ci => (
        <div key={`${ci.product}-${ci.size}`} className="cart-item">
          <img src={ci.imageUrl} alt={ci.name} />
          <div className="ci-info">
            <h4>{ci.name}</h4>
            <p>Size: {ci.size}</p>
            <p>₹{ci.price}</p>
            <input type="number" min="1" value={ci.quantity} onChange={e => updateQuantity(ci.product, ci.size, Number(e.target.value))} />
            <button onClick={() => removeItem(ci.product, ci.size)}>Remove</button>
          </div>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <Link className="btn" to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}