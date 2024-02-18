import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    empty: {
      type: 'boolean',
      description: 'Button with a blank background and no border',
    },
    fill: {
      type: 'boolean',
      description: 'Button with filled background and border',
    },
    outlined: {
      type: 'boolean',
      description: 'Outlined button with border and no background',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    empty: true,
    fill: false,
    outlined: false,
    className: '',
  },
};
export const Fill: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    empty: false,
    fill: true,
    outlined: false,
    className: '',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    empty: false,
    fill: false,
    outlined: true,
    className: '',
  },
};
