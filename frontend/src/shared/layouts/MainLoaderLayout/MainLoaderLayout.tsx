import React, { FC } from 'react';

import { ProductCardSkeleton } from '@/enteties/Product';
import { Container } from '@/shared/layouts/Container';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { SidebarLoader } from '@/widgets/Sidebar';
import SliderWidgetLoader from '@/widgets/Slider/ui/SliderWidgetLoader';

interface Props {
  withHeader?: boolean;
}

const MainLoaderLayout: FC<Props> = (props) => {
  const { withHeader = true } = props;

  return (
    <>
      {withHeader && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-white-500 h-[100px]">
          <Container className="flex flex-col justify-center h-full">
            {/* MOBILE HEADER */}
            <HStack gap="4" className="pt-4 pb-2 lg:hidden">
              <VStack justify="between" align="center" className="w-full">
                <VStack gap="4" align="center">
                  <Skeleton width={24} height={24} />
                  <Skeleton width={110} height={38} />
                </VStack>
                <Skeleton width={24} height={24} />
              </VStack>
              <Skeleton width="100%" height="38px" />
            </HStack>

            {/* DESKTOP HEADER */}
            <VStack justify="between" align="center" className="hidden lg:flex">
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

      <Container
        className={`${withHeader ? 'mt-[120px] lg:mt-[144px]' : 'mt-[44px]'} mb-[72px]`}
      >
        {/* MOBILE HERO */}
        <HStack gap="4" className="mb-6 lg:hidden">
          <SliderWidgetLoader />
          <Skeleton width="100%" height="38px" />
        </HStack>

        {/* DESKTOP HERO */}
        <VStack justify="between" className="hidden lg:flex mb-10">
          <SidebarLoader sections={11} />
          <SliderWidgetLoader />
        </VStack>

        <HStack gap="5">
          <Skeleton
            height="100%"
            width="100%"
            className="!h-[24px] !w-[100px] lg:!h-[30px] lg:!w-[156px]"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[7px] w-full ">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ProductCardSkeleton key={i} />
              ))}
          </div>
        </HStack>
      </Container>
    </>
  );
};

export default MainLoaderLayout;
