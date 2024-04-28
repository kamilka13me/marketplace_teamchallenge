import type { Meta, StoryObj } from '@storybook/react';

import ProductSectionLayout from './ProductSectionLayout';

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
  discountStart: '12.12.2022',
  specifications: [],
  discountEnd: '12.12.2022',
  condition: '',
  brand: '',
  status: '',
  images: [
    '/static/products/1fde076e-829c-4ca6-854b-6dec7deb9666.png',
    '/static/products/e246f064-db53-4d40-8ba4-762d0fdcd8b6.png',
  ],
  created_at: '2024-02-20T08:57:05.787Z',
};

const mockProducts = [mockProduct, mockProduct, mockProduct, mockProduct];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Sections/ProductSectionLayout',
  component: ProductSectionLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductSectionLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    title: 'Новинки',
    products: mockProducts,
  },
};

export const isLoading: Story = {
  args: {
    isLoading: true,
    title: 'Новинки',
    products: mockProducts,
  },
};
