'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const saleSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().optional(),
  paymentMethod: z.enum(['Cash', 'Credit Card', 'Debit Card', 'Mobile Money'], {
    required_error: 'Payment method is required',
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product is required'),
      productName: z.string(),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Price must be greater than or equal to 0'),
    })
  ).min(1, 'At least one item is required'),
});

export default function NewSalePage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch, // Added watch
  } = useForm({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      paymentMethod: 'Cash',
      items: [{ productId: '', productName: '', quantity: 1, unitPrice: 0 }],
    },
    mode: 'onChange',
  });

  const items = useWatch({ control, name: 'items' });
  const itemCount = items.length;
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
  }, [items]);

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addItem = () => {
    setValue('items', [
      ...items,
      { productId: '', productName: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (index) => {
    if (items.length <= 1) return;
    setValue(
      'items',
      items.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      // In a real app, we would send this data to the API
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form and show success
      reset({
        customerName: '',
        customerPhone: '',
        paymentMethod: 'Cash',
        items: [{ productId: '', productName: '', quantity: 1, unitPrice: 0 }],
      });

      alert('Sale created successfully!');
      router.push('/sales');
    } catch (err) {
      console.error('Failed to create sale:', err);
      alert('Failed to create sale. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="h-6 w-6 rounded-full animate-pulse bg-primary/50 mb-2"></div>
          <div className="h-6 w-6 rounded-full animate-pulse bg-primary/50 mb-2"></div>
          <div className="h-6 w-6 rounded-full animate-pulse bg-primary/50"></div>
          <p className="text-sm text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">New Sale</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new sales transaction
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border/20 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Information */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Customer Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    {...register('customerName')}
                    className="w-full"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="customerPhone">Phone Number (Optional)</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="Enter phone number"
                    {...register('customerPhone')}
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            {/* Items */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Items
              </h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-border/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-foreground">
                        Item {index + 1}
                      </h3>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="p-1"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[200px_1fr_1fr_1fr]">
                      <div>
                        <Label htmlFor={`product-${index}`}>Product</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product">
                              {item.productName || 'Select a product'}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem
                                key={product._id}
                                value={product._id}
                                onSelect={() => {
                                  setValue(`items[${index}].productId`, product._id);
                                  setValue(`items[${index}].productName`, product.name);
                                }}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.items && errors.items[index] && errors.items[index].productId && (
                          <p className="mt-1 text-sm text-red-600">
                            Product is required
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity || ''}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setValue(`items[${index}].quantity`, Math.max(1, value));
                          }}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                        <Input
                          id={`unitPrice-${index}`}
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setValue(`items[${index}].unitPrice`, Math.max(0, value));
                          }}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-end">
                        <div className="text-right">
                          <p className="text-sm font-medium text-muted-foreground">
                            Total
                          </p>
                          <p className="text-lg font-semibold text-foreground">
                            ${(
                              (item.quantity || 0) *
                              (item.unitPrice || 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={addItem}
                    className="flex items-center space-x-2"
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Payment Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method">
                        {watch('paymentMethod') || 'Select payment method'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-medium text-foreground">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </section>

            {/* Form Actions */}
            <div className="mt-6 flex items-center justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/sales')}
                className="flex items-center space-x-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="flex w-48 justify-center"
              >
                {saving ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" opacity="0.2"></circle>
                      <circle cx="12" cy="12" r="7" strokeOpacity="0.7"></circle>
                      <path d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  'Create Sale'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}