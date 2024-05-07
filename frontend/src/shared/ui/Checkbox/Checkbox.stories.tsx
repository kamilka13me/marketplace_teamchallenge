import { Meta, StoryObj } from '@storybook/react';

import svg from '../../assets/icons/checked-thin.svg?react';

import { Checkbox } from '@/shared/ui/Checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  argTypes: {
    label: {
      type: 'string',
      description: 'Label text of the checkbox',
    },
    type: {
      type: 'string',
      description: 'Checkbox types options',
    },
    name: {
      type: 'string',
      description: 'Name of the checkbox',
    },
    value: {
      type: 'string',
      description: 'Sets the value of the element',
    },
    readonly: {
      type: 'boolean',
      description: 'Indicates that the Checkbox field is read-only',
    },
    onChange: {
      type: 'function',
      description: 'Action function on checkbox',
    },
    onBlur: {
      type: 'function',
      description: 'Function when the element loses focus',
    },
    className: {
      type: 'string',
      description: 'Description of additional checkbox classes',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxBasic: Story = {
  args: {
    label: 'Some label to checkbox',
    type: 'checkbox',
    name: 'Name checkbox',
    icon: svg,
    onChange: () => {},
  },
  name: 'Basic',
};
