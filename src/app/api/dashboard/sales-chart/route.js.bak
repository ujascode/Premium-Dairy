import connectDB from '@/lib/db';
import Sale from '@/models/Sale';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30days';
    const end = new Date();
    let start = new Date();

    switch (range) {
      case '7days':
        start.setDate(end.getDate() - 6);
        break;
      case '30days':
        start.setDate(end.getDate() - 29);
        break;
      case '90days':
        start.setDate(end.getDate() - 89);
        break;
      default:
        start.setDate(end.getDate() - 29);
    }

    // Set to start of day
    start.setHours(0, 0, 0, 0);
    // Set to end of day
    end.setHours(23, 59, 59, 999);

    const sales = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          totalSales: { $sum: '$total' },
        },
      },
      {
        $sort: { '_id': 1 },
      },
    ]);

    // Fill in missing dates with zero
    const result = [];
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const found = sales.find((sale) => sale._id === dateStr);
      result.push({
        name: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales: found ? parseFloat(found.totalSales.toFixed(2)) : 0,
      });
      current.setDate(current.getDate() + 1);
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
