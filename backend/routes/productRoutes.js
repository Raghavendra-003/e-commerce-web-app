import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// List products with search, filters, pagination
router.get('/', async (req, res) => {
  try {
    const {
      q,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12
    } = req.query;

    const filter = {};

    // Search by name/description (text index)
    if (q) filter.$text = { $search: q };

    // Category filter
    if (category) filter.category = category;

    // Size filter
    if (size) filter.sizes = size;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      products,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Product detail
router.get('/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;