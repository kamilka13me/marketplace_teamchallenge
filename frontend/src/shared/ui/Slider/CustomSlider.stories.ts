import type { Meta, StoryObj } from '@storybook/react';

import img from '../../../../.storybook/assets/img/scratching_post.png';

import CustomSlider from './CustomSlider';

const images = [
  {
    _id: '1',
    image: img,
  },
  {
    _id: '2',
    image: img,
  },
  {
    _id: '3',
    image: img,
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/CustomSlider',
  component: CustomSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images,
    className: 'max-w-[600px]',
  },
};
