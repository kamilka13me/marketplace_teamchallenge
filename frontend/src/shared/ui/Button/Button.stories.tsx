import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      type: 'string',
      description: 'Element or text in button',
    },
    onClick: {
      type: 'function',
      description: 'Function for hovering actions',
    },
    variant: {
      type: 'string',
      description: 'Button styling options',
      options: ['empty', 'fill', 'outlined'],
      control: { type: 'select' },
    },
    className: {
      type: 'string',
      description: 'Description of additional button classes',
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
    variant: 'empty',
    className: '',
  },
};
export const Fill: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    variant: 'fill',
    className: '',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    onClick: () => {},
    variant: 'outlined',
    className: '',
  },
};
