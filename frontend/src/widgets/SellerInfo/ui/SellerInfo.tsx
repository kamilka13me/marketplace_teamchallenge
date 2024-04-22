import Arrow from '@/shared/assets/icons/Arrow.svg?react';
import Star from '@/shared/assets/icons/Star.svg?react';
import StarFull from '@/shared/assets/icons/StarFull.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const SellerInfo = () => {
  return (
    <VStack className="p-4 rounded-2xl bg-dark-grey w-[962px] mb-10">
      <HStack className="py-6 border-r border-selected-dark mr-11">
        <Text Tag="span" text="Кількість оцінок" size="md" className="text-white mb-2" />
        <VStack gap="4" className="mb-[6px]">
          <Text Tag="span" text="65" size="2xl" className="text-white" />
          <VStack className="gap-[7px] items-center">
            <Icon Svg={Arrow} width={8} height={4} fill="green" />
            <Text Tag="span" text="20%" size="sm" color="green" />
          </VStack>
        </VStack>
        <Text
          Tag="span"
          text="поставлених оцінок"
          size="sm"
          className="mr-11 text-disabled"
        />
      </HStack>
      <HStack className="py-6 border-r border-selected-dark mr-11">
        <Text Tag="span" text="Рейтинг оцінок" size="md" className="text-white mb-2" />
        <VStack gap="4" className="mb-[6px]">
          <Text Tag="span" text="4.0" size="2xl" className="text-white" />
          <VStack className="gap-[7px] items-center mr-11">
            <Icon Svg={Arrow} width={8} height={4} fill="red" className="rotate-180" />
            <Text Tag="span" text="13%" size="sm" color="red" />
          </VStack>
        </VStack>
        <ul className="flex gap-[7px] mr-11">
          <li className="fill-secondary-yellow">
            <Icon Svg={StarFull} width={15} height={15} />
          </li>
          <li className="flex fill-secondary-yellow">
            <Icon Svg={StarFull} width={15} height={15} />
          </li>
          <li className="flex fill-secondary-yellow">
            <Icon Svg={StarFull} width={15} height={15} />
          </li>
          <li className="flex fill-secondary-yellow">
            <Icon Svg={StarFull} width={15} height={15} />
          </li>
          <li className="flex fill-secondary-yellow">
            <Icon Svg={Star} width={15} height={15} />
          </li>
        </ul>
      </HStack>
      <ul className="flex-col gap-[9px] py-2 mr-8">
        <li className="flex gap-2">
          <VStack gap="2">
            <VStack>
              <Icon
                Svg={StarFull}
                width={10}
                height={10}
                className="my-[3px] mx-[6px] fill-secondary-yellow"
              />
              <Text Tag="span" text="5" size="md" className="text-white" />
            </VStack>
            <div className="my-[9px] w-[165px] h-1 bg-green" />
          </VStack>
        </li>
        <li className="flex gap-2">
          <VStack>
            <Icon
              Svg={StarFull}
              width={10}
              height={10}
              className="my-[3px] mx-[6px] fill-secondary-yellow"
            />
            <Text Tag="span" text="4" size="md" className="text-white" />
          </VStack>
          <div className="my-[9px] w-[35px] h-1 bg-green" />
        </li>
        <li className="flex gap-2">
          <VStack>
            <Icon
              Svg={StarFull}
              width={10}
              height={10}
              className="my-[3px] mx-[6px] fill-secondary-yellow"
            />
            <Text Tag="span" text="3" size="md" className="text-white" />
          </VStack>
          <div className="my-[9px] w-[13px] h-1 bg-green" />
        </li>
        <li className="flex gap-2">
          <VStack>
            <Icon
              Svg={StarFull}
              width={10}
              height={10}
              className="my-[3px] mx-[6px] fill-secondary-yellow"
            />
            <Text Tag="span" text="2" size="md" className="text-white" />
          </VStack>
          <div className="my-[9px] w-[7px] h-1 bg-green" />
        </li>
        <li className="flex gap-2">
          <VStack>
            <Icon
              Svg={StarFull}
              width={10}
              height={10}
              className="my-[3px] mx-[6px] fill-secondary-yellow"
            />
            <Text Tag="span" text="1" size="md" className="text-white" />
          </VStack>
          <div className="my-[9px] w-[px] h-1 bg-green" />
        </li>
      </ul>
      <ul className="py-2">
        <li>
          <Text Tag="span" text="45" size="md" className="text-white" />
        </li>
        <li>
          <Text Tag="span" text="15" size="md" className="text-white" />
        </li>
        <li>
          <Text Tag="span" text="3" size="md" className="text-white" />
        </li>
        <li>
          <Text Tag="span" text="2" size="md" className="text-white" />
        </li>
        <li>
          <Text Tag="span" text="0" size="md" className="text-white" />
        </li>
      </ul>
    </VStack>
  );
};

export default SellerInfo;
