import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      type: 'string',
      description: 'Element or text in link',
    },
    className: {
      type: 'string',
      description: 'Description of additional button classes',
    },
    href: {
      type: 'string',
      description: 'URL of the page',
    },
    target: {
      type: 'string',
      description: 'The name of the window where the browser will load the document',
      options: ['_self', '_blank', '_parent', '_top'],
      control: { type: 'select' },
    },
    referrerPolicy: {
      type: 'string',
      description:
        'This attribute tells what information to pass to the resource via the link',
      options: [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ],
      control: { type: 'select' },
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
    href: 'https://www.google.com',
  },
};
