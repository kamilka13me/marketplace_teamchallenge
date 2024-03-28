import { FC } from 'react';

import SidebarLoader from './SidebarLoader';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';

interface Props {}

const Sidebar: FC<Props> = () => {
  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  if (isLoading) {
    return <SidebarLoader sections={11} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No Categories to display.</p>;
  }

  return (
    <aside>
      <ul className="flex flex-col gap-2">
        {data.slice(0, 11).map((item) => (
          <li key={item._id}>
            <CategoryLink category={item} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
