import { Meta, StoryObj } from '@storybook/react';

import { ForgottenPasswordForm } from '@/features/userAuth/ui/ForgottenPasswordForm/index';

const meta = {
  title: 'UI/ForgottenPasswordForm',
  component: ForgottenPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgottenPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  decorators: [(Story) => <Story />],
};
