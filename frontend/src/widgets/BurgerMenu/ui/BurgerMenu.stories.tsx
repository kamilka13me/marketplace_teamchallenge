import { Meta, StoryObj } from '@storybook/react';

import { BurgerMenu } from '@/widgets/BurgerMenu';

const meta = {
  title: 'Widgets/BurgerMenu',
  component: BurgerMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    setClose: () => {},
    setModalLoginForm: () => {},
    setModalRegistrationForm: () => {},
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BurgerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BurgerMenuStory: Story = {
  args: {
    burgerButtonRef: null,
    isOpen: true,
    setClose: () => {},
    setModalLoginForm: () => {},
    setModalRegistrationForm: () => {},
  },
};
