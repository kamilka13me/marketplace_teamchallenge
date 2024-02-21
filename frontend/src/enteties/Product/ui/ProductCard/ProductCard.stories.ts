import type { Meta, StoryObj } from '@storybook/react';

import ProductCard from './ProductCard';

import { Product } from '@/enteties/Product';

const mockProduct: Product = {
  _id: '65d4696167951eade2b23df1',
  name: 'product copy',
  description: 'Product copy description',
  price: 100,
  discount: null,
  views: 0,
  category: 'copy',
  quantity: 12,
  images: [
    '/static/products/1fde076e-829c-4ca6-854b-6dec7deb9666.png',
    '/static/products/e246f064-db53-4d40-8ba4-762d0fdcd8b6.png',
  ],
  created_at: '2024-02-20T08:57:05.787Z',
};

const mockProductLessFive: Product = {
  ...mockProduct,
  quantity: 3,
};

const mockZeroQuantity: Product = {
  ...mockProduct,
  quantity: 0,
};

const mockHasDiscount: Product = {
  ...mockProduct,
  discount: 30,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Cards/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const LessThanFiveQuantity: Story = {
  args: {
    product: mockProductLessFive,
  },
};

export const ZeroQuantity: Story = {
  args: {
    product: mockZeroQuantity,
  },
};

export const HasDiscount: Story = {
  args: {
    product: mockHasDiscount,
  },
};
