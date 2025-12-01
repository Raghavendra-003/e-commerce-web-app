import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { apiFetch } from '../api.js';

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/orders', { token });
        setOrders(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token]);

  return (
    <div>
      <h2>My Orders</h2>
      {!orders.length && <div>No orders yet.</div>}
      {orders.map(o => (
        <div key={o._id} className="order">
          <div><strong>Order ID:</strong> {o._id}</div>
          <div><strong>Date:</strong> {new Date(o.orderDate).toLocaleString()}</div>
          <div><strong>Total:</strong> ₹{o.totalPrice}</div>
          <ul>
            {o.items.map((it, idx) => (
              <li key={idx}>
                {it.name} — {it.size} — Qty: {it.quantity} — ₹{it.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}