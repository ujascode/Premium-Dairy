'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';

export default function ReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        setReportData(data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-[200px]">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {!reportData ? (
            <p className="text-center text-muted-foreground">No report data available.</p>
          ) : (
            <div className="space-y-4">
              {/* We'll display some key metrics from the report data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Sales</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-4xl font-bold">{reportData.totalSales?.count ?? 0}</p>
                    <p className="text-sm text-muted-foreground">Sales Transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-4xl font-bold">{`$${reportData.totalSales?.amount ?? 0}`}</p>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Product</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-lg font-bold">{reportData.topProduct?.name ?? 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Units Sold: {reportData.topProduct?.quantity ?? 0}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional reports can be added here */}
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
                {reportData.recentSales && reportData.recentSales.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Invoice</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Customer</th>
                          <th className="text-left px-4 px-3 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {reportData.recentSales.map((sale) => (
                          <tr key={sale._id} className="hover:bg-muted/50">
                            <td className="px-4 py-3 text-sm">{sale.invoiceNumber}</td>
                            <td className="px-4 py-3 text-sm">{sale.customerName || 'Walk-in'}</td>
                            <td className="px-4 py-3 text-sm">
                              {new Date(sale.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-md font-semibold">{`$${sale.total}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No recent sales data.</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}