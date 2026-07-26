import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { Types } from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
    }

    const data = await request.json();
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
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
      return new Response(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
