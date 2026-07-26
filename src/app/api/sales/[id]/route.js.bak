import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import { Types } from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid sale ID' }), { status: 400 });
    }

    const sale = await Sale.findById(id).populate('products.product');
    if (!sale) {
      return new Response(JSON.stringify({ message: 'Sale not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(sale), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid sale ID' }), { status: 400 });
    }

    const sale = await Sale.findById(id);
    if (!sale) {
      return new Response(JSON.stringify({ message: 'Sale not found' }), { status: 404 });
    }

    // Restore stock
    for (const item of sale.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await sale.deleteOne();

    return new Response(JSON.stringify({ message: 'Sale deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
