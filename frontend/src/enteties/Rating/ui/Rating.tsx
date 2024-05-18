import { FC } from 'react';

import star from '@/shared/assets/icons/star-2.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

interface Props {
  rating: number;
  isProducts?: boolean;
}

const Rating: FC<Props> = (props) => {
  const { rating, isProducts } = props;

  const active = isProducts ? 'fill-secondary-yellow' : 'fill-main';
  const noActive = isProducts ? 'fill-disabled' : 'stroke-main';

  return (
    <VStack gap="1" className="mt-1">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <Icon
            key={i}
            width={15}
            height={15}
            Svg={star}
            className={i + 1 <= rating ? active : noActive}
          />
        ))}
    </VStack>
  );
};

export default Rating;
