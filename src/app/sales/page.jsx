'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch('/api/sales');
        const data = await res.json();
        setSales(data);
      } catch (err) {
        console.error('Failed to fetch sales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-[200px]">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Button onClick={() => router.push('/sales/new')}>New Sale</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales List</CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <p className="text-center text-muted-foreground">No sales found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y border-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Payment Method</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sales.map((sale) => (
                    <tr key={sale._id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">{sale.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm">{sale.customerName || 'Walk-in'}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-md font-semibold">{`$${sale.total}`}</td>
                      <td className="px-4 py-3 text-sm">{sale.paymentMethod}</td>
                      <td className="text-center px-4 py-3 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/sales/${sale._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this sale?')) {
                              // TODO: implement delete
                              alert('Delete not implemented yet');
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}