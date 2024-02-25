import { FC } from 'react';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import SidebarCategoryLink from '@/widgets/Sidebar/ui/SidebarCategoryLink';

interface Props {}

const Sidebar: FC<Props> = () => {
  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  if (isLoading) {
    return (
      <HStack gap="2" className="">
        {Array(11)
          .fill(null)
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <VStack key={i} gap="4" className="p-2">
              <Skeleton width={24} height={24} />
              <div className="">
                <Skeleton width={Math.random() * (200 - 100) + 100} height={24} />
              </div>
              <Skeleton width={24} height={24} />
            </VStack>
          ))}
      </HStack>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No Categories to display.</p>;
  }

  return (
    <aside className="max-w-[314px] w-full">
      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <SidebarCategoryLink key={item._id} category={item} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
