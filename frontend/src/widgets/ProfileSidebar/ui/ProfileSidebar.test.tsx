import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';
import ProfileSidebar from '@/widgets/ProfileSidebar/ui/ProfileSidebar';

describe('ProfileSidebar component', () => {
  test('renders correctly', () => {
    componentRender(<ProfileSidebar tab={0} setTab={() => {}} />);

    expect(screen.getByTestId('ProfileSidebar')).toBeInTheDocument();
  });
  test('Персональні дані select correctly', () => {
    componentRender(<ProfileSidebar tab={0} setTab={() => {}} />);

    expect(screen.getByText('Персональні дані')).toHaveClass('text-white');
  });
  test('Список бажань select correctly', () => {
    componentRender(<ProfileSidebar tab={1} setTab={() => {}} />);

    expect(screen.getByText('Список бажань')).toHaveClass('text-white');
  });
});
