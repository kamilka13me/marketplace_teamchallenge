import { FC } from 'react';

import apple from '@/shared/assets/icons/apple.svg';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {}

const Sidebar: FC<Props> = () => {
  return (
    <aside className="max-w-[314px] w-full">
      <HStack gap="2" className="">
        {Array(11)
          .fill(null)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <VStack key={i} justify="between" align="center" className="w-full">
              <VStack gap="2" align="center">
                <Image src={apple} width="24px" height="24px" alt="" className="mr-2" />
                <a className=" text-[18px] leading-[40px]" href="/">
                  Товари apple
                </a>
              </VStack>
              <div>
                <Icon Svg={arrowRight} />
              </div>
            </VStack>
          ))}
      </HStack>
    </aside>
  );
};

export default Sidebar;
