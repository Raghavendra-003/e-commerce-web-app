import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

const products = [
  // Men
  { name: 'Classic Cotton T-Shirt', description: 'Soft cotton tee', price: 499, imageUrl: 'https://images.unsplash.com/photo-1593032457867-dcd0092cf858', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Slim Fit Jeans', description: 'Denim for everyday', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1580910051071-1586c8b7e46c', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Casual Hoodie', description: 'Warm and cozy', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1602810310170-fb2f02f4428d', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Formal Shirt', description: 'Office wear', price: 999, imageUrl: 'https://images.unsplash.com/photo-1602810310171-3f0d6a8e1a0e', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Men Polo Shirt', description: 'Casual smart', price: 899, imageUrl: 'https://images.unsplash.com/photo-1618354692492-5820b39c364f', category: 'Men', sizes: ['S','M','L','XL'] },

  // Women
  { name: 'Summer Dress', description: 'Light and breezy', price: 1599, imageUrl: 'https://images.unsplash.com/photo-1542060748-10c28b62716f', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'High Waist Jeans', description: 'Flattering fit', price: 1799, imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Knit Cardigan', description: 'Layer up', price: 1399, imageUrl: 'https://images.unsplash.com/photo-1600180758897-7bc5e2a1e1e2', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Workout Leggings', description: 'Stretchy and durable', price: 1199, imageUrl: 'https://images.unsplash.com/photo-1618354692470-2810d57f2b5b', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Women Maxi Dress', description: 'Elegant flow', price: 1899, imageUrl: 'https://images.unsplash.com/photo-1618354692472-9b8f39e7c5b0', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Women Track Jacket', description: 'Sport style', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1618354692480-2f8f9c4a1d5a', category: 'Women', sizes: ['S','M','L','XL'] },

  // Kids
  { name: 'Kids T-Shirt', description: 'Fun print', price: 399, imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Joggers', description: 'Comfortable wear', price: 699, imageUrl: 'https://images.unsplash.com/photo-1589936240808-1b6487e1f8d0', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Hoodie', description: 'Warm hoodies', price: 899, imageUrl: 'https://images.unsplash.com/photo-1589936240797-4a0f1f8f9f9f', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Denim Shorts', description: 'Play ready', price: 499, imageUrl: 'https://images.unsplash.com/photo-1589936240790-2d7b6d8e9a7b', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Raincoat', description: 'Stay dry', price: 1099, imageUrl: 'https://images.unsplash.com/photo-1589936240800-7b6c0d1d3e0f', category: 'Kids', sizes: ['S','M','L','XL'] },

  // Extra men/women for variety
  { name: 'Men Track Pants', description: 'Athleisure', price: 999, imageUrl: 'https://images.unsplash.com/photo-1602810310172-6f8d9a1e2f5f', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Casual Sneakers', description: 'Comfortable daily wear', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1600180758895-5c5e2f2d3b3f', category: 'Men', sizes: ['8','9','10','11'] },
  { name: 'Women Blouse', description: 'Premium feel', price: 1999, imageUrl: 'https://images.unsplash.com/photo-1600180758885-4b5e2a3c1f5d', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Women Skirt', description: 'Elegant and stylish', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1600180758870-1a2b3c4d5e6f', category: 'Women', sizes: ['S','M','L'] }
];

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products:', products.length);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
