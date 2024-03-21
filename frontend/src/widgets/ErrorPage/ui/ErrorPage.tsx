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
      <VStack>
        <img src={Image} alt="Персик" className="h-full" />
      </VStack>
      <VStack className="absolute top-619 left-[64px]">
        <HStack gap="8">
          <img className="mb-8" src={Error} alt="404" />
          <Text
            Tag="p"
            size="3xl"
            text="Ми знайшли для вас все, крім цієї сторінки"
            font="ibm-plex-sans"
            className="w-[374px] leading-8"
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
