import { Meta, StoryObj } from '@storybook/react';

import SupportCentre from '@/pages/SellerPage/ui/Tabs/SupportCentre/SupportCentre';

const meta = {
  title: 'Widgets/SupportCentre',
  component: SupportCentre,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SupportCentre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SupportCentreStory: Story = {
  args: {},
};
