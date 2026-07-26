"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Milk', 'Ice Cream', 'Butter', 'Paneer', 'Curd', 'Ghee']),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  image: z.string().url('Invalid URL').optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: 'Milk',
      price: 0,
      stock: 0,
      image: '',
      description: '',
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const product = await response.json();
        router.push(`/products/${product._id}`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create product');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter product name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              {...register('category')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Milk',
                  'Ice Cream',
                  'Butter',
                  'Paneer',
                  'Curd',
                  'Ghee',
                ].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              {...register('price')}
              placeholder="0.00"
              className={errors.price ? 'input-error' : ''}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register('stock')}
              placeholder="0"
              className={errors.stock ? 'input-error' : ''}
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input
            id="image"
            type="url"
            {...register('image')}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter product description"
            className="h-32"
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="status"
              type="checkbox"
              {...register('status')}
              checked={true}
            />
          </div>
          <div className="ml-3">
            <Label htmlFor="status" className="text-sm text-muted-foreground">
              Active
            </Label>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <Button type="submit" form="product-form" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}