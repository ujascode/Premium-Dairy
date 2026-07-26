import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Milk', 'Ice Cream', 'Butter', 'Paneer', 'Curd', 'Ghee'],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String }, // base64 or URL
    description: { type: String },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
