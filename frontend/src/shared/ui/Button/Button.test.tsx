import { expect } from '@storybook/test';
import { render, screen } from '@testing-library/react';

import { Button } from '@/shared/ui/Button/index';

const mock = jest.fn();

describe('test', () => {
  test('my first test', () => {
    render(
      <Button onClick={mock} variant="fill">
        Test
      </Button>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
