import type { Meta, StoryObj } from '@storybook/react';

import ModalCategory from './ModalCategory';

const meta = {
  title: 'Widgets/ModalCategory',
  component: ModalCategory,
  parameters: {},
  argTypes: {
    setIsOpen: () => {},
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    setIsOpen: () => {},
  },
};
