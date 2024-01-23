import { FC } from 'react';

import BugButton from '@/app/providers/ErrorBoundary/ui/BugButton';
import { useAxios } from '@/shared/lib/hooks/useAxios';

interface Props {}

interface User {
  id: string;
  name: string;
}

const MainPage: FC<Props> = () => {
  const { data, error, loading } = useAxios<User[]>('/users');

  if (loading || !data) return 'Loading...';
  if (error) return 'Error!';

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {item.id} {item.name}
        </div>
      ))}
      <BugButton />
    </div>
  );
};

export default MainPage;
