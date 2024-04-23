import { FC } from 'react';

import { Rating } from '@/enteties/Rating';
import {
  calcAverage,
  calcRatingInPercentage,
  totalRatingCountHelper,
} from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import { SellerRatingResponse } from '@/features/managingFeedbacks/ui/ManagingFeedbacks';
import star from '@/shared/assets/icons/star-2.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  data: SellerRatingResponse;
  isLoading: boolean;
}

const SellerRatings: FC<Props> = (props) => {
  const { data, isLoading } = props;

  return (
    <VStack
      align="center"
      justify="between"
      className="w-full bg-dark-grey px-4 h-[158px] mb-5 rounded-2xl"
    >
      {!isLoading && (
        <>
          <div>
            <Text Tag="h3" text="Кількість оцінок" size="md" color="white" />
            <VStack>
              <Text
                Tag="span"
                text={totalRatingCountHelper(data).toString()}
                size="2xl"
                color="white"
              />
            </VStack>
            <Text Tag="p" text="поставлених оцінок" size="sm" color="gray" />
          </div>

          <div>
            <Text Tag="h3" text="Рейтинг оцінок" size="md" color="white" />
            <VStack>
              <Text
                Tag="span"
                text={calcAverage(data).toFixed(1).toString()}
                size="2xl"
                color="white"
              />
            </VStack>
            <Rating rating={Math.round(calcAverage(data))} />
          </div>

          <HStack>
            {Object.entries(calcRatingInPercentage(data))
              ?.reverse()
              .map(([key, value]) => (
                <VStack key={key} align="center" gap="2">
                  <VStack gap="1" justify="center" align="center" className="w-[25px]">
                    <Icon width={12} height={12} Svg={star} className="fill-main" />
                    <Text Tag="p" text={key} size="md" color="white" />
                  </VStack>
                  <div className="w-[186px] h-1">
                    <div
                      style={{
                        width: `${value}%`,
                      }}
                      className="h-full bg-green rounded-lg"
                    />
                  </div>
                  <Text
                    Tag="p"
                    text={data?.current?.[key]?.toString() ?? ''}
                    size="md"
                    color="white"
                  />
                </VStack>
              ))}
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default SellerRatings;
