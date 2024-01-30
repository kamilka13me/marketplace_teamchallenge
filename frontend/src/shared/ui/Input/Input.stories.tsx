import { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/shared/ui/Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'center',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
  args: {
    error: 'some error',
    label: 'Test Input',
    type: 'text',
    name: 'Name',
    value: '',
    onChange: () => {},
    placeholder: 'Test input',
  },
  name: 'Default',
};
