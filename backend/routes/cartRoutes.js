import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user cart
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    res.json(user.cart || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update item in cart
router.post('/add', protect, async (req, res) => {
  try {
    const { product, size, quantity = 1 } = req.body;
    if (!product || !size) return res.status(400).json({ message: 'Product and size required' });

    const user = await User.findById(req.user.id);
    const idx = user.cart.findIndex(ci => ci.product.toString() === product && ci.size === size);

    if (idx >= 0) {
      user.cart[idx].quantity += quantity;
    } else {
      user.cart.push({ product, size, quantity });
    }
    await user.save();
    const populated = await User.findById(req.user.id).populate('cart.product');
    res.json(populated.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { product, size, quantity } = req.body;
    const user = await User.findById(req.user.id);
    const idx = user.cart.findIndex(ci => ci.product.toString() === product && ci.size === size);
    if (idx < 0) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity <= 0) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].quantity = quantity;
    }
    await user.save();
    const populated = await User.findById(req.user.id).populate('cart.product');
    res.json(populated.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item
router.delete('/remove', protect, async (req, res) => {
  try {
    const { product, size } = req.body;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(ci => !(ci.product.toString() === product && ci.size === size));
    await user.save();
    const populated = await User.findById(req.user.id).populate('cart.product');
    res.json(populated.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;