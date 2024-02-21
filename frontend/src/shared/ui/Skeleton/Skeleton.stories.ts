import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: '100px',
    width: '100px',
    border: '30px',
    className: '',
  },
};
