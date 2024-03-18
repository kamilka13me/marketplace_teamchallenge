import { FC } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';

interface Props {
  dark?: boolean;
}

const ProductCardSkeleton: FC<Props> = (props) => {
  const { dark } = props;

  return (
    <div className={`w-[313px] h-[445px] rounded-2xl p-4 ${dark && 'bg-gray-400'}`}>
      <Skeleton height="252px" width="281px" border="16px" className="mb-2" />
      <HStack gap="2" className="mb-[49px]">
        <Skeleton height="16px" width="281px" border="4px" />
        <Skeleton height="16px" width="150px" border="4px" />
      </HStack>
      <HStack gap="2" className="mb-[49px]">
        <Skeleton height="40px" width="147px" border="4px" />
        <Skeleton height="18px" width="197px" border="4px" />
      </HStack>
    </div>
  );
};

export default ProductCardSkeleton;
