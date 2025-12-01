import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Product from '../models/Product.js';

const products = [
  { name: 'Classic Cotton T-Shirt', description: 'Soft cotton tee', price: 499, imageUrl: 'https://picsum.photos/seed/t1/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Slim Fit Jeans', description: 'Denim for everyday', price: 1499, imageUrl: 'https://picsum.photos/seed/j1/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Casual Hoodie', description: 'Warm and cozy', price: 1299, imageUrl: 'https://picsum.photos/seed/h1/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Formal Shirt', description: 'Office wear', price: 999, imageUrl: 'https://picsum.photos/seed/s1/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Graphic Tee', description: 'Trendy print', price: 599, imageUrl: 'https://picsum.photos/seed/t2/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Summer Dress', description: 'Light and breezy', price: 1599, imageUrl: 'https://picsum.photos/seed/d1/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'High Waist Jeans', description: 'Flattering fit', price: 1799, imageUrl: 'https://picsum.photos/seed/j2/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Knit Cardigan', description: 'Layer up', price: 1399, imageUrl: 'https://picsum.photos/seed/c1/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Workout Leggings', description: 'Stretchy and durable', price: 1199, imageUrl: 'https://picsum.photos/seed/l1/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Silk Blouse', description: 'Premium feel', price: 1999, imageUrl: 'https://picsum.photos/seed/b1/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Kids T-Shirt', description: 'Fun print', price: 399, imageUrl: 'https://picsum.photos/seed/t3/400', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Joggers', description: 'Comfortable wear', price: 699, imageUrl: 'https://picsum.photos/seed/j3/400', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Hoodie', description: 'Warm hoodies', price: 899, imageUrl: 'https://picsum.photos/seed/h2/400', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Denim Shorts', description: 'Play ready', price: 499, imageUrl: 'https://picsum.photos/seed/s2/400', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Kids Raincoat', description: 'Stay dry', price: 1099, imageUrl: 'https://picsum.photos/seed/r1/400', category: 'Kids', sizes: ['S','M','L','XL'] },
  { name: 'Men Track Pants', description: 'Athleisure', price: 999, imageUrl: 'https://picsum.photos/seed/p1/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Women Track Jacket', description: 'Sport style', price: 1499, imageUrl: 'https://picsum.photos/seed/j4/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Men Polo Shirt', description: 'Casual smart', price: 899, imageUrl: 'https://picsum.photos/seed/p2/400', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Women Maxi Dress', description: 'Elegant flow', price: 1899, imageUrl: 'https://picsum.photos/seed/d2/400', category: 'Women', sizes: ['S','M','L','XL'] },
  { name: 'Kids Pajama Set', description: 'Comfy sleepwear', price: 799, imageUrl: 'https://picsum.photos/seed/p3/400', category: 'Kids', sizes: ['S','M','L','XL'] }
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