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
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'span'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'gray', 'orange', 'red', 'green'],
      control: { type: 'select' },
    },
    font: {
      options: ['ibm-plex-sans', 'outfit'],
      control: { type: 'select' },
    },
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      control: { type: 'select' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    align: 'center',
    color: 'primary',
    Tag: 'h1',
    size: 'sm',
    font: 'outfit',
    bold: false,
    text: 'Text',
    className: '',
  },
};
