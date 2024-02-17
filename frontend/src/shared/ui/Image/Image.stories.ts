import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';

import img from '@/shared/assets/img/scratching_post.png';

const meta = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: img,
    alt: 'img',
    width: '200',
    height: '200',
    objectFit: 'cover',
    className: '',
  },
};
