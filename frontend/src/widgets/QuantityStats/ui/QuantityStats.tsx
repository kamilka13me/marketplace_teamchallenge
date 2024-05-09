import attachment from '@/shared/assets/icons/attachment.svg?react';
import image from '@/shared/assets/icons/image.svg?react';
import { Icon } from '@/shared/ui/Icon';
import Percentage from '@/shared/ui/Percentage/ui/Percentage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export interface Props {
  stats: 'views' | 'clicks';
}

const QuantityStats = ({ stats }: Props) => {
  return (
    <HStack
      align="center"
      className="w-full p-0 lg:py-5 lg:px-6 lg:items-start rounded-2xl bg-dark-grey text-main-white"
    >
      <HStack align="center" className="lg:items-start max-w-[200px] w-full gap-[14px]">
        <div className="bg-main p-[7px] rounded-md">
          <Icon Svg={stats === 'views' ? image : attachment} width={16} height={16} />
        </div>
        <HStack align="center" gap="1" className="lg:items-start">
          <VStack gap="2">
            <Text Tag="p" size="2xl" text="500" color="white" className="font-semibold" />
            <Percentage currentNum={2} previousNum={12} />
          </VStack>
          <Text
            Tag="p"
            size="md"
            text={`Кількість ${stats === 'views' ? 'переглядів' : 'кліків'}`}
            color="white"
            className="mt-1"
          />
        </HStack>
        <VStack gap="1">
          <Text Tag="p" size="xs" text="Січень:" color="gray" />
          <Text Tag="span" size="xs" text="143" color="white" />
        </VStack>
      </HStack>
    </HStack>
  );
};

export default QuantityStats;
