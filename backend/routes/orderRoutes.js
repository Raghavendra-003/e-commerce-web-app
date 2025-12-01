import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { sendOrderEmail } from '../utils/sendEmail.js';

const router = express.Router();

// Mock checkout: create order and clear cart
router.post('/checkout', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user.cart.length) return res.status(400).json({ message: 'Cart is empty' });

    // Build order items from user cart
    const items = user.cart.map(ci => ({
      product: ci.product._id,
      name: ci.product.name,
      size: ci.size,
      quantity: ci.quantity,
      price: ci.product.price
    }));

    const totalPrice = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    const order = await Order.create({
      user: user._id,
      items,
      totalPrice
    });

    // Clear cart
    user.cart = [];
    await user.save();

    // Send email
    const itemLines = items.map(it =>
      `<li>${it.name} — Size: ${it.size} — Qty: ${it.quantity} — Price: ₹${it.price}</li>`
    ).join('');

    const html = `
      <h2>Order Confirmation</h2>
      <p>Order ID: ${order._id}</p>
      <p>Order Date: ${new Date(order.orderDate).toLocaleString()}</p>
      <h3>Summary</h3>
      <ul>${itemLines}</ul>
      <p><strong>Total:</strong> ₹${totalPrice}</p>
      <p>Thank you for shopping with Pasovit Clothing.</p>
    `;

    await sendOrderEmail({
      to: user.email,
      subject: `Your Order ${order._id} Confirmation`,
      html
    });

    res.json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;