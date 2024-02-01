import { Meta, StoryObj } from '@storybook/react';

import { RegistrationForm } from '@/features/userAuth/ui/RegistrationForm/index';

const meta = {
  title: 'UI/RegistrationForm',
  component: RegistrationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormStory: Story = {
  args: {},
};
