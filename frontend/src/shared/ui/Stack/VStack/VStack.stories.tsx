import { Meta, StoryObj } from '@storybook/react';

import VStack from './VStack';

const meta = {
  title: 'UI/Stacks/VStack',
  component: VStack,
  parameters: {
    layout: 'center',
  },
  argTypes: {
    justify: {
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      control: { type: 'select' },
    },
    align: {
      options: ['start', 'center', 'end', 'stretch'],
      control: { type: 'select' },
    },
    wrap: {
      options: ['wrap', 'no-wrap'],
      control: { type: 'select' },
    },
    gap: {
      options: ['0', '1', '2', '4', '5', '6', '8', '10', '14', '20'],
      control: { type: 'select' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VStackStory: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </>
    ),
  },
  name: 'VStack',
};
