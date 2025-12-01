import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, guestCart = [] } = req.body;
    const user = await User.findOne({ email }).populate('cart.product');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Merge guest cart into user cart
    if (Array.isArray(guestCart) && guestCart.length) {
      const mapKey = (p, s) => `${p}:${s}`;
      const existingMap = new Map();
      user.cart.forEach(ci => existingMap.set(mapKey(ci.product._id.toString(), ci.size), ci.quantity));

      guestCart.forEach(ci => {
        const key = mapKey(ci.product, ci.size);
        const prev = existingMap.get(key) || 0;
        existingMap.set(key, prev + ci.quantity);
      });

      // rebuild cart
      const merged = [];
      for (const [key, qty] of existingMap.entries()) {
        const [productId, size] = key.split(':');
        merged.push({ product: productId, size, quantity: qty });
      }
      user.cart = merged;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email }, cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;