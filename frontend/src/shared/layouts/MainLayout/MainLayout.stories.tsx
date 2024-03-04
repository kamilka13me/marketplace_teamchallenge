import { Meta, StoryObj } from '@storybook/react';

import MainLayout from './MainLayout';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'center',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainLayoutStory: Story = {
  args: {
    header: <Header />,
    content: <>Content</>,
    footer: <Footer />,
  },
  name: 'MainLayout',
};
