import { FC } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';

interface Props {
  dark?: boolean;
}

const ProductCardSkeleton: FC<Props> = (props) => {
  const { dark } = props;

  return (
    <div
      className={`max-w-[313px] h-[248px] lg:h-[445px] rounded-2xl lg:p-4 ${dark && 'bg-dark-grey'}`}
    >
      <Skeleton height="248px" width="100%" className="min-w-[168px] lg:hidden" />
      <div className="hidden lg:block">
        <Skeleton
          height="252px"
          width="100%"
          border="16px"
          className="mb-2 lg:!w-[281px]"
        />
        <HStack gap="2" className="mb-[49px]">
          <Skeleton height="16px" width="100%" border="4px" />
          <Skeleton height="16px" width="100%" border="4px" />
        </HStack>
        <HStack gap="2" className="mb-[49px]">
          <Skeleton height="40px" width="147px" border="4px" />
          <Skeleton height="18px" width="197px" border="4px" />
        </HStack>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
