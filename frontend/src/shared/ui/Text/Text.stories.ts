import type { Meta, StoryObj } from '@storybook/react';

import Text from './Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Text',
  component: Text,
  parameters: {},
  argTypes: {
    align: {
      options: ['right', 'left', 'center'],
      control: { type: 'select' },
    },
    Tag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'p'],
      control: { type: 'select' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    align: 'right',
    Tag: 'h1',
    bold: false,
    text: 'Text',
    className: '',
  },
};
