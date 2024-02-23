import type { Meta, StoryObj } from '@storybook/react';

import SliderWidget from './SliderWidget';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Widgets/SliderWidget',
  component: SliderWidget,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof SliderWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
