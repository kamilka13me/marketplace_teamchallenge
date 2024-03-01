import { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/shared/ui/Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    nextAuthMock: {
      session: 'unknown',
    },
  },
  argTypes: {
    error: {
      type: 'string',
      description: 'Error text at the bottom of the input',
    },
    label: {
      type: 'string',
      description: 'Label text at the top of the input',
    },
    type: {
      type: 'string',
      description: 'Input types options',
      options: [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      control: { type: 'select' },
    },
    placeholder: {
      type: 'string',
      description: 'A short hint in the input',
    },
    name: {
      type: 'string',
      description: 'Name of the input',
    },
    value: {
      type: 'string',
      description: 'Sets the value of the element',
    },
    readonly: {
      type: 'boolean',
      description: 'Indicates that the input field is read-only',
    },
    onChange: {
      type: 'function',
      description: 'Action function for on input',
    },
    onBlur: {
      type: 'function',
      description: 'Function when the element loses focus',
    },
    variant: {
      type: 'string',
      description: 'Styling options',
      options: ['basic', 'search'],
      control: { type: 'select' },
    },
    className: {
      type: 'string',
      description: 'Description of additional input classes',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputBasic: Story = {
  args: {
    label: 'Some label',
    error: 'Some error',
    type: 'text',
    name: 'Name',
    value: '',
    variant: 'basic',
    onChange: () => {},
    placeholder: 'Test input',
  },
  name: 'Basic',
};

export const InputSearch: Story = {
  args: {
    type: 'text',
    name: 'Name',
    value: '',
    variant: 'search',
    onChange: () => {},
    placeholder: 'Test input',
  },
  name: 'Search',
};
