import { Meta, StoryObj } from '@storybook/react';

import Container from './Container';

const meta = {
  title: 'Layouts/Container',
  component: Container,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainerStory: Story = {
  args: {
    children: <div>Hello</div>,
  },
  name: 'Container with auto width and 1440px is max',
};
