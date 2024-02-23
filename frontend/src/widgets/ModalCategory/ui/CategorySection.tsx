import { FC } from 'react';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  title: string;
  className?: string;
}

const CategorySection: FC<Props> = (props) => {
  const { title, className } = props;

  return (
    <HStack gap="2" className={className}>
      <Text Tag="p" text={title} className="font-semibold size text-[18px]" />
      {Array(10)
        .fill(null)
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <VStack key={i} justify="between" align="center" className="w-full">
            <VStack gap="2" align="center">
              <a className=" text-[18px] leading-[40px]" href="/">
                Lorem ipsum dolor
              </a>
            </VStack>
          </VStack>
        ))}
    </HStack>
  );
};

export default CategorySection;
