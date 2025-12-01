import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  quantity: { type: Number, min: 1, default: 1 }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  cart: { type: [cartItemSchema], default: [] }
}, { timestamps: true });

export default mongoose.model('User', userSchema);