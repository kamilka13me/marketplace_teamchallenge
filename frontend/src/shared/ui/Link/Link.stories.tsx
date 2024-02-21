import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    to: {
      type: 'string',
      description: 'The path to the resource or page',
    },
    children: {
      type: 'string',
      description: 'Element or text in link',
    },
    className: {
      type: 'string',
      description: 'Description of additional button classes',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Link',
    className: '',
    to: 'https://www.google.com',
  },
};
