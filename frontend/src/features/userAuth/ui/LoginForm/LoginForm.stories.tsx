import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { LoginForm } from '@/features/userAuth/ui/LoginForm/index';

const meta = {
  title: 'UI/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const reduxStore = createReduxStore();

export const LoginFormStory: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Provider store={reduxStore}>
        <Story />
      </Provider>
    ),
  ],
};
