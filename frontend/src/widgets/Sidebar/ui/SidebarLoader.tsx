import React, { FC } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {
  sections: number;
}

const SidebarLoader: FC<Props> = (props) => {
  const { sections } = props;

  return (
    <HStack gap="2" className="">
      {Array(sections)
        .fill(null)
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <VStack key={i} gap="4" justify="between" className="p-2 w-full max-w-[313px]">
            <VStack gap="4">
              <Skeleton width={24} height={24} />
              <div className="">
                <Skeleton width={Math.random() * (200 - 100) + 100} height={24} />
              </div>
            </VStack>
            <Skeleton width={24} height={24} />
          </VStack>
        ))}
    </HStack>
  );
};

export default SidebarLoader;
