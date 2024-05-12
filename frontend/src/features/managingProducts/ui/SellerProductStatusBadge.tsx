import { FC, useEffect, useState } from 'react';

import infoCircle from '@/shared/assets/icons/info-circle.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export type Statuses = 'published' | 'canceled' | 'under-consideration' | 'blocked';

const productStatus: Record<Statuses, string> = {
  published: 'Опубліковано',
  blocked: 'Заблоковано',
  canceled: 'Відхилено',
  'under-consideration': 'На розгляді',
};

const productStatusStyle: Record<Statuses, string> = {
  published: 'bg-main',
  canceled: 'bg-light-grey',
  blocked: 'bg-dark-grey',
  'under-consideration': 'bg-main',
};

interface Props {
  status: Statuses;
}

const SellerProductStatusBadge: FC<Props> = (props) => {
  const [isSupTextVisible, setIsSupTextVisible] = useState(false);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const { status } = props;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentStatus = productStatus[status];
  const currentStyle = productStatusStyle[status];

  return (
    <VStack
      justify="center"
      align="center"
      gap="2"
      className={`py-0.5 px-2.5 !text-main-white rounded-lg text-center lg:py-1 lg:w-[128px] ${currentStyle}`}
    >
      <Text
        Tag="span"
        text={currentStatus}
        size="sm"
        className={`${status === 'blocked' && '!text-main-white'} ${windowWidth < 1024 ? 'text-[8px] leading-[10px]' : ''}`}
      />

      {(status === 'blocked' || status === 'canceled') && (
        <div
          className="relative"
          onMouseEnter={() => {
            setIsSupTextVisible(true);
          }}
          onMouseLeave={() => {
            setIsSupTextVisible(false);
          }}
        >
          <Icon
            Svg={infoCircle}
            width={windowWidth >= 1024 ? 14 : 10}
            height={windowWidth >= 1024 ? 14 : 10}
            className={`${status === 'blocked' ? '!stroke-white' : '!stroke-selected-dark'} cursor-pointer`}
          />
          <div
            className={`absolute top-6 right-0 w-[240px] px-[10px] py-4 ${!isSupTextVisible && 'hidden'} bg-dark-grey z-10 rounded-lg`}
          >
            <Text
              Tag="p"
              text="Відсутність або невідповідність документів, що підтверджують якість товару"
              size="sm"
              color="white"
            />
          </div>
        </div>
      )}
    </VStack>
  );
};

export default SellerProductStatusBadge;
