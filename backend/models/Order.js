import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  quantity: { type: Number, min: 1, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);