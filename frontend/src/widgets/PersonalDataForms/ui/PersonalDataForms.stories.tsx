import { Meta, StoryObj } from '@storybook/react';

import { PersonalDataForms } from '@/widgets/PersonalDataForms';

const meta = {
  title: 'Widgets/PersonalDataForms',
  component: PersonalDataForms,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalDataForms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormStory: Story = {
  args: {},
};
