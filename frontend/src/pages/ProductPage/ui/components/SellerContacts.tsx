import { FC, useEffect, useState } from 'react';

import { Rating } from '@/enteties/Rating';
import { SellerContact } from '@/enteties/Seller/model/types/seller';
import { getUserAuthData, User } from '@/enteties/User';
import { calcAverage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import { ApiFeedbackResponse, RatingResponse } from '@/pages/ProductPage/model/types';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ApiResponse {
  user: User;
}
interface SellerResponse {
  contacts: SellerContact[];
}

interface Props {
  sellerId: string;
}

const SellerContacts: FC<Props> = ({ sellerId }) => {
  const user = useAppSelector(getUserAuthData);

  const { data, isLoading } = useAxios<ApiResponse>(`${ApiRoutes.USER}/${sellerId}`);

  const { data: feedbacks, isLoading: loadingFeedbacks } = useAxios<ApiFeedbackResponse>(
    `${ApiRoutes.SELLER_FEEDBACKS}?sellerId=${sellerId}`,
  );

  const { data: ratings, isLoading: loadingRatings } = useAxios<RatingResponse>(
    `${ApiRoutes.RATINGS}?sellerId=${sellerId}`,
  );

  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [sellerContacts, setSellerContacts] = useState<SellerContact[]>([]);
  const [sellerContactsIsLoading, setSellerContactsIsLoading] = useState(false);

  const getSellerContactsHandler = () => {
    if (!user) {
      setIsAlertOpen(true);
    } else if (!user.isAccountConfirm) {
      setIsAlertOpen(true);
    } else if (user.isAccountConfirm) {
      setSellerContactsIsLoading(true);

      try {
        $api
          .get<SellerResponse[]>(`${ApiRoutes.SELLER_CONTACTS}?sellerId=${sellerId}`)
          .then((res) => {
            setSellerContacts(res.data[0]?.contacts || ({} as SellerContact[]));
          });
      } catch (error) {
        // eslint-disable-next-line
        console.error('Error: ', error);
      } finally {
        setIsContactsOpen(true);
        setSellerContactsIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isAlertOpen) {
      timer = setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isAlertOpen]);

  return (
    <HStack
      justify="between"
      gap="4"
      className="bg-dark-grey w-full p-4 rounded-2xl lg:flex-row lg:items-center lg:h-[84px] lg:gap-0"
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
          {!loadingRatings && (
            <Rating rating={ratings ? calcAverage(ratings.current) : 0} />
          )}

          {!loadingFeedbacks && (
            <Text
              Tag="span"
              text={`${feedbacks?.totalComments || 0} відгуків`}
              size="xs"
              color="gray-light"
              className="mt-2"
            />
          )}
        </VStack>
      </div>
      {isContactsOpen && !sellerContactsIsLoading ? (
        <div>
          {sellerContacts?.map((contact, index) => (
            <div key={index}>
              <Text
                Tag="p"
                text={`${contact?.messenger}: ${contact?.phone}`}
                size="md"
                color="white"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full lg:w-auto">
          <Button
            variant="outlined"
            onClick={getSellerContactsHandler}
            disabled={isAlertOpen}
            className="text-main-white h-[52px] w-full lg:w-[226px] hover:bg-main hover:!border-main hover:!text-main-dark duration-300"
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
    </HStack>
  );
};

export default SellerContacts;
