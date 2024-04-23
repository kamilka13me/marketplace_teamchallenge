import { Meta, StoryObj } from '@storybook/react';

import { RegistrationForm } from '@/features/userAuth/ui/RegistrationForm/index';

const meta = {
  title: 'Forms/RegistrationForm',
  component: RegistrationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
