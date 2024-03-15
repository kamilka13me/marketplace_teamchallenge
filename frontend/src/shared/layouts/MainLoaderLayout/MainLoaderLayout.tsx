import React, { FC } from 'react';

import { ProductCardSkeleton } from '@/enteties/Product';
import { Container } from '@/shared/layouts/Container';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {
  withHeader?: boolean;
}

const MainLoaderLayout: FC<Props> = (props) => {
  const { withHeader = false } = props;

  return (
    <>
      {withHeader && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-white-500 h-[100px]">
          <Container className="flex flex-col justify-center h-full">
            <VStack justify="between" align="center">
              <Skeleton width={202} height={68} />
              <VStack justify="center" align="center">
                <VStack gap="6">
                  <Skeleton width={131} height={38} />
                  <Skeleton width={491} height={38} />
                </VStack>
                <VStack gap="1" justify="center">
                  <HStack gap="1" align="center" className="px-[17px]">
                    <Skeleton width={32} height={32} />
                    <Skeleton width={52} height={16} />
                  </HStack>
                  <HStack gap="1" align="center" className="px-[17px]">
                    <Skeleton width={32} height={32} />
                    <Skeleton width={52} height={16} />
                  </HStack>
                </VStack>
              </VStack>
              <Skeleton width={62} height={24} />
            </VStack>
          </Container>
        </div>
      )}

      <Container className={`${withHeader ? 'mt-[144px]' : ' mt-[44px]'} mb-[72px]`}>
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
    </>
  );
};

export default MainLoaderLayout;
