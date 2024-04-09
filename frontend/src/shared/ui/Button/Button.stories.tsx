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
      description: 'Function for click actions',
    },
    variant: {
      type: 'string',
      description: 'Button styling options',
      options: ['search', 'fill', 'notFound', 'login', 'outlined'],
      control: { type: 'select' },
    },
    className: {
      type: 'string',
      description: 'Description of additional button classes',
    },
    disabled: {
      type: 'boolean',
      description: 'The attribute disables or enables the button',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    children: 'Save',
    onClick: () => {},
    variant: 'outlined',
    className: '',
    disabled: false,
  },
  name: 'Outlined',
};
