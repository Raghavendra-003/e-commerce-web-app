import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
  category: { type: String, enum: ['Men', 'Women', 'Kids'], required: true },
  sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] }
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);