import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { invoiceNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const [sales, total] = await Promise.all([
      Sale.find(query)
        .populate('products.product')
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Sale.countDocuments(query),
    ]);

    return new Response(
      JSON.stringify({
        sales,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function POST(request) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectDB();
    const data = await request.json();
    const { customerName, products, paymentMethod } = data;

    if (!customerName || !products || !paymentMethod) {
      await session.abortTransaction();
      session.endSession();
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    let subtotal = 0;
    const saleProducts = [];

    // Validate products and stock
    for (const item of products) {
      const { productId, quantity } = item;
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        await session.abortTransaction();
        session.endSession();
        return new Response(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
      }

      const product = await Product.findById(productId).session(session);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
      }

      if (product.stock < quantity) {
        await session.abortTransaction();
        session.endSession();
        return new Response(JSON.stringify({ message: `Insufficient stock for ${product.name}` }), { status: 400 });
      }

      const price = product.price;
      const itemTotal = price * quantity;
      subtotal += itemTotal;

      saleProducts.push({
        product: productId,
        quantity,
        price,
      });

      // Deduct stock
      product.stock -= quantity;
      await product.save({ session });
    }

    const tax = 0;
    const discount = 0;
    const total = subtotal + tax - discount;

    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const sale = new Sale({
      invoiceNumber,
      customerName,
      products: saleProducts,
      paymentMethod,
      subtotal,
      tax,
      discount,
      total,
    });

    const savedSale = await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    return new Response(JSON.stringify(savedSale), { status: 201 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
