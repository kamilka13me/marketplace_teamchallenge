import { FC, useState } from 'react';

import { Rating } from '@/enteties/Rating';
import { getUserAuthData, User } from '@/enteties/User';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ApiResponse {
  user: User;
}

interface Props {
  sellerId: string;
}

const SellerContacts: FC<Props> = ({ sellerId }) => {
  const user = useAppSelector(getUserAuthData);

  const { data, isLoading } = useAxios<ApiResponse>(`${ApiRoutes.USER}/${sellerId}`);

  const [sellerContacts, setSellerContacts] = useState('');
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const getSellerContactsHandler = () => {
    if (!user) {
      setIsAlertOpen(true);
    } else if (!user.isAccountConfirm) {
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
    } else if (user.isAccountConfirm) {
      setIsContactsOpen(true);
      setSellerContacts('');
    }
  };

  return (
    <VStack
      justify="between"
      align="center"
      className="bg-dark-grey w-full h-[84px] p-4 rounded-2xl"
    >
      <div>
        <VStack gap="4" align="center">
          <Text Tag="p" text="Продавець" size="2xl" color="white" />
          {!isLoading && (
            <Text
              Tag="p"
              text={`${data?.user.username || ''} ${data?.user.surname || ''}`}
              size="md"
              color="white"
            />
          )}
        </VStack>
        <VStack gap="5" align="center" className="mt-1">
          <Rating rating={4} />
          <Text
            Tag="span"
            text="36 оцінок"
            size="xs"
            color="gray-light"
            className="mt-2"
          />
          <Text
            Tag="span"
            text="16 відгуків"
            size="xs"
            color="gray-light"
            className="mt-2"
          />
        </VStack>
      </div>
      {isContactsOpen ? (
        <div>{sellerContacts}</div>
      ) : (
        <div className="relative">
          <Button
            variant="outlined"
            onClick={getSellerContactsHandler}
            disabled={isAlertOpen}
            className="text-main-white h-[52px] w-[226px] hover:bg-main hover:border-main hover:text-main-dark duration-300"
          >
            Відкрити контакти
          </Button>
          {isAlertOpen && (
            <div className="absolute w-[212px] top-[64px] right-[19px] px-[10px] py-5 bg-selected-dark rounded-lg">
              <Text
                Tag="span"
                text="Щоб переглянути контакти, необхідно підтвердити Email"
                size="sm"
                color="white"
              />
            </div>
          )}
        </div>
      )}
    </VStack>
  );
};

export default SellerContacts;
