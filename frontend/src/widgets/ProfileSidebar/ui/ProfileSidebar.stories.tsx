import { Meta, StoryObj } from '@storybook/react';

import ProfileSidebar from './ProfileSidebar';

const meta = {
  title: 'Widgets/ProfileSidebar',
  component: ProfileSidebar,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileSidebarStory: Story = {
  args: {
    tab: 0,
  },
  name: 'ProfileSidebar',
};
