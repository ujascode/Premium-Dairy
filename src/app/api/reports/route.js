import connectDB from '@/lib/db';
import Sale from '@/models/Sale';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'daily';
    const now = new Date();

    let matchStage = {};
    let groupStage = {};

    switch (type) {
      case 'daily': {
        const dateStr = searchParams.get('date') || now.toISOString().split('T')[0];
        const start = new Date(dateStr);
        const end = new Date(dateStr);
        end.setHours(23, 59, 59, 999);
        matchStage = { createdAt: { $gte: start, $lte: end } };
        break;
      }
      case 'monthly': {
        const year = parseInt(searchParams.get('year')) || now.getFullYear();
        const month = parseInt(searchParams.get('month')) || now.getMonth() + 1;
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        matchStage = { createdAt: { $gte: start, $lte: end } };
        break;
      }
      case 'yearly': {
        const year = parseInt(searchParams.get('year')) || now.getFullYear();
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31, 23, 59, 59, 999);
        matchStage = { createdAt: { $gte: start, $lte: end } };
        break;
      }
      case 'productwise': {
        // Aggregate total quantity sold per product
        const pipeline = [
          { $unwind: '$products' },
          {
            $group: {
              _id: '$products.product',
              totalQuantity: { $sum: '$products.quantity' },
              totalRevenue: { $sum: { $multiply: ['$products.quantity', '$products.price'] } },
            },
          },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          { $unwind: '$productDetails' },
          {
            $project: {
              _id: 0,
              productId: '$_id',
              productName: '$productDetails.name',
              totalQuantity: 1,
              totalRevenue: 1,
            },
          },
        ];

        const results = await Sale.aggregate(pipeline);
        return new Response(JSON.stringify({ report: results }), { status: 200 });
      }
      default:
        return new Response(JSON.stringify({ message: 'Invalid report type' }), { status: 400 });
    }

    if (type !== 'productwise') {
      // For daily, monthly, yearly, we return summary statistics
      const pipeline = [
        { $match: matchState },
        {
          $group: {
            _id: null,
            totalSales: { $sum: 1 },
            totalRevenue: { $sum: '$total' },
            totalTax: { $sum: '$tax' },
            totalDiscount: { $sum: '$discount' },
          },
        },
      ];

      const result = await Sale.aggregate(pipeline);
      const summary = result[0] || {
        totalSales: 0,
        totalRevenue: 0,
        totalTax: 0,
        totalDiscount: 0,
      };

      return new Response(JSON.stringify({ report: summary }), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
