import React from 'react';

import { waitFor } from '@storybook/test';
import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';
import SliderWidget, { ImageData } from '@/widgets/Slider/ui/SliderWidget';

jest.mock('@/shared/lib/hooks/useAxios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SliderWidget component', () => {
  const useAxiosMock = jest.requireMock('@/shared/lib/hooks/useAxios').default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupUseAxiosMock = ({
    data = null,
    isLoading = false,
    error = null,
  }: {
    data?: ImageData[] | null;
    isLoading?: boolean;
    error?: Error | null;
  }) => {
    useAxiosMock.mockReturnValueOnce({ data, isLoading, error });
  };

  test('should render loading state', () => {
    setupUseAxiosMock({ isLoading: true });

    componentRender(<SliderWidget />);

    expect(screen.getByTestId('loading-slider-widget')).toBeInTheDocument();
  });

  test('should render error state', async () => {
    const errorMessage = 'Error fetching data';

    setupUseAxiosMock({ error: new Error(errorMessage) });

    componentRender(<SliderWidget />);

    await waitFor(() =>
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument(),
    );
  });

  test('should render slider with data', async () => {
    const mockData = [
      { _id: '1', image: 'image1.jpg' },
      { _id: '2', image: 'image2.jpg' },
    ];

    setupUseAxiosMock({ data: mockData });

    componentRender(<SliderWidget />);

    await waitFor(() => {
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });
});
