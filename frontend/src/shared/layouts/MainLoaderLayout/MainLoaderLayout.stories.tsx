import { Meta, StoryObj } from '@storybook/react';

import MainLoaderLayout from './MainLoaderLayout';

const meta = {
  title: 'Layouts/MainLoaderLayout',
  component: MainLoaderLayout,
  parameters: {
    layout: 'center',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainLoaderLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainLoaderLayoutStory: Story = {
  args: {},
  name: 'MainLoaderLayout',
};
