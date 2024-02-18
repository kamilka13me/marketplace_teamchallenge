import type { Meta, StoryObj } from '@storybook/react';

import svg from '../../../../.storybook/assets/icons/user.svg?react';

import Icon from './Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clickable: Story = {
  args: {
    Svg: svg,
    width: 64,
    height: 64,
    clickable: true,
    onClick: () => {},
    className: 'text-black',
  },
};

export const NonClickable: Story = {
  args: {
    Svg: svg,
    width: 64,
    height: 64,
  },
};
