import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Sale from '@/models/Sale';

export async function GET(request) {
  try {
    await connectDB();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const [
      totalProducts,
      todaySales,
      todayRevenue,
      lowStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Sale.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } }),
      Sale.aggregate([
        {
          $match: {
            createdAt: { $gte: todayStart, $lte: todayEnd },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
          },
        },
      ]),
      Product.find({ stock: { $lt: 10 } })
        .sort({ stock: 1 })
        .limit(5)
        .select('name stock'),
    ]);

    const revenue = todayRevenue.length > 0 ? todayRevenue[0].total : 0;

    return new Response(
      JSON.stringify({
        totalProducts,
        todaySales,
        todayRevenue: revenue,
        todayOrders: todaySales, // assuming each sale is an order
        lowStockProducts: lowStockProducts.map((p) => ({
          _id: p._id,
          name: p.name,
          stock: p.stock,
        })),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
