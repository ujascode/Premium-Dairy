import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // price at time of sale
      },
    ],
    paymentMethod: { type: String, required: true, enum: ['Cash', 'Card', 'UPI'] },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema);
export default Sale;
