import attachment from '@/shared/assets/icons/attachment.svg?react';
import caretDown from '@/shared/assets/icons/caret-down.svg?react';
import image from '@/shared/assets/icons/image.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export interface Props {
  stats: 'views' | 'clicks';
}

const QuantityStats = ({ stats }: Props) => {
  return (
    <div className=" py-5 px-6 rounded-2xl bg-dark-grey text-main-white">
      <HStack className="w-[200px] gap-[14px]">
        <div className="bg-main p-[7px] rounded-md">
          <Icon Svg={stats === 'views' ? image : attachment} width={16} height={16} />
        </div>
        <HStack gap="1">
          <VStack gap="2">
            <Text Tag="p" size="2xl" text="500" color="white" className="font-semibold" />
            <VStack align="center" gap="1">
              <Icon Svg={caretDown} width={16} height={16} />
              <Text Tag="span" size="sm" text="2.8%" className="!text-[#24a148]" />
            </VStack>
          </VStack>
          <Text
            Tag="p"
            size="md"
            text={`Кількість ${stats === 'views' ? 'переглядів' : 'кліків'}`}
            color="white"
          />
        </HStack>
        <VStack gap="1">
          <Text Tag="p" size="xs" text="Січень:" color="gray" />
          <Text Tag="span" size="xs" text="143" color="white" />
        </VStack>
      </HStack>
    </div>
  );
};

export default QuantityStats;
