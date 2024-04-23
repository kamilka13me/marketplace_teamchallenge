import { Meta, StoryObj } from '@storybook/react';

import { LoginForm } from '@/features/userAuth/ui/LoginForm/index';

const meta = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  decorators: [(Story) => <Story />],
};
