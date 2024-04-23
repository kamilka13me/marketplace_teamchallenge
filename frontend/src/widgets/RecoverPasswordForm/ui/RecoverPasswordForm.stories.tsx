import { Meta, StoryObj } from '@storybook/react';

import { RecoverPasswordForm } from '@/widgets/RecoverPasswordForm/index';

const meta = {
  title: 'Forms/RecoverPasswordForm',
  component: RecoverPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecoverPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    token: 'email-recovery-token-test',
  },
  decorators: [(Story) => <Story />],
};
