import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import Error from '@/shared/assets/img/Error404vector.png';
import Image from '@/shared/assets/img/Mask3.png';
import { getRouteMain } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const Error404: FC = () => {
  const navigate = useNavigate();

  return (
    <VStack gap="1" className="h-full w-1166 bg-cover rounded-lg items-center">
      <VStack className="hidden md:block">
        <img src={Image} alt="Персик" className="h-full" />
      </VStack>
      <VStack
        justify="center"
        className="w-full pb-8 bg-gradient-to-bl from-[#b58473] to-[#cea996] md:w-fit md:bg-none md:absolute md:top-619 md:left-[64px] "
      >
        <HStack align="center" className="gap-10 md:gap-8">
          <img className="pt-20 pb-10 md:mb-8 md:py-0 " src={Error} alt="404" />
          <Text
            Tag="p"
            size="2xl"
            text="Ми знайшли для вас все, крім цієї сторінки"
            font="ibm-plex-sans"
            align="center"
            className="w-[374px] leading-8 md:text-3xl md:text-left"
            color="white"
          />
          <Button
            variant="notFound"
            onClick={() => {
              navigate(getRouteMain());
            }}
          >
            Головна
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Error404;
