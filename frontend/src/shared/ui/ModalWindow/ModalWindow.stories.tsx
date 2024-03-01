import { Meta, StoryObj } from '@storybook/react';

import { ModalWindow } from '@/shared/ui/ModalWindow';

const meta = {
  title: 'UI/ModalWindow',
  component: ModalWindow,
  parameters: {
    layout: 'centered',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  argTypes: {
    children: {
      type: 'string',
      description: 'Element or text in modal window',
    },
    onCloseFunc: {
      type: 'function',
      description: 'Action function on checkbox',
    },
    className: {
      type: 'string',
      description: 'Description of additional modal window classes',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Modal Window',
  },
};
