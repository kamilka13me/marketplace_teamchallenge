import { FC } from 'react';

import Errorr from '@/shared/assets/img/Error404vector.png';
import Image from '@/shared/assets/img/Mask3.png';
import { Link } from '@/shared/ui/Link';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const Error404: FC = () => {
  return (
    <VStack gap="1" className="h-full w-1166 bg-cover rounded-lg items-center">
      <VStack>
        <img src={Image} alt="Персик" className="h-full" />
      </VStack>
      <VStack className="absolute top-619 left-[64px]">
        <HStack gap="8">
          <img className="mb-8" src={Errorr} alt="404" />
          <Text
            Tag="p"
            size="md"
            text="Ми знайшли для вас все, крім цієї сторінки"
            font="ibm-plex-sans"
            className=" w-[374px] text-3xl text-[32px]"
            color="white"
          />
          <Link
            className="bg-gradient-to-r from-secondary-200 to-salmon-100 text-white h-[48px] w-[282px] rounded-lg pt-[10px] pl-[105px] pr-[105px] font-outfit font-semibold text-base leading-[22.4px]"
            to="/"
          >
            Головна
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Error404;
