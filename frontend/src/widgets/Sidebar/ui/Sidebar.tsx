import { FC } from 'react';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

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
              <div className="w-[260px]">
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
