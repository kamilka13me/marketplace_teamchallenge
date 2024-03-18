import React from 'react';

import { waitFor } from '@storybook/test';
import { screen } from '@testing-library/react';

import { Category } from '@/enteties/Category';
import { componentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';
import { Sidebar } from '@/widgets/Sidebar';

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
    data?: Category[] | null;
    isLoading?: boolean;
    error?: Error | null;
  }) => {
    useAxiosMock.mockReturnValueOnce({ data, isLoading, error });
  };

  test('should render loading state', () => {
    setupUseAxiosMock({ isLoading: true });

    componentRender(<Sidebar />);

    expect(screen.getByTestId('loading-sidebar')).toBeInTheDocument();
  });

  test('should render error state', async () => {
    const errorMessage = 'Error fetching data';

    setupUseAxiosMock({ error: new Error(errorMessage) });

    componentRender(<Sidebar />);

    await waitFor(() =>
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument(),
    );
  });
  test('should render slider with data', async () => {
    const mockData: Category[] = [
      {
        _id: '65d90b6dc01a63f97000e02e',
        name: 'Товари Apple',
        image: '/static/category/apple.svg',
        description: '',
        parentId: null,
        subcategories: [
          {
            _id: '65d90c3fc01a63f97010e002',
            name: 'iPad',
            image: '/static/category/apple.svg',
            description: 'Discover the world with iPad',
            parentId: '65d90b6dc01a63f97000e02e',
            subcategories: [],
          },
        ],
      },
    ];

    setupUseAxiosMock({ data: mockData });

    componentRender(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });
});
