import type { Meta, StoryObj } from '@storybook/react';

import Text from './Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1Text: Story = {
  args: {
    text: 'H1 text',
    tag: 'h1',
  },
};

export const H2Text: Story = {
  args: {
    text: 'H2 text',
    tag: 'h2',
  },
};

export const H3Text: Story = {
  args: {
    text: 'H3 text',
    tag: 'h3',
  },
};

export const H4Text: Story = {
  args: {
    text: 'H4 text',
    tag: 'h4',
  },
};

export const PText: Story = {
  args: {
    text: 'p text',
    tag: 'p',
  },
};

export const SmallText: Story = {
  args: {
    text: 'small text',
    tag: 'small',
  },
};
