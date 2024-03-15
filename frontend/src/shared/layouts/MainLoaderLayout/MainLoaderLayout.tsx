import { FC } from 'react';

import { ProductCardSkeleton } from '@/enteties/Product';
import { Container } from '@/shared/layouts/Container';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {}

const MainLoaderLayout: FC<Props> = () => {
  return (
    <Container className="mt-9">
      <VStack justify="between" className="mb-10">
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
        <Skeleton width="979px" height="504px" className="!rounded-2xl" />
      </VStack>
      <HStack gap="5">
        <Skeleton height={30} width={156} />
        <VStack gap="5">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ProductCardSkeleton key={i} />
            ))}
        </VStack>
      </HStack>
    </Container>
  );
};

export default MainLoaderLayout;
