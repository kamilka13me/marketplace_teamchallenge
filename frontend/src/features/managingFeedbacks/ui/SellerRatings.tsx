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
import Percentage from '@/shared/ui/Percentage/ui/Percentage';
import { Separator } from '@/shared/ui/Separator';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  data: SellerRatingResponse;
  isLoading: boolean;
}

const SellerRatings: FC<Props> = (props) => {
  const { data, isLoading } = props;

  const isMobile = window.innerWidth < 768;

  const currentValues = calcRatingInPercentage(data?.current);
  const totalValue = Object.values(currentValues).reduce((acc, curr) => acc + curr, 0);

  const mainBody = () =>
    !isLoading && (
      <>
        <div>
          <Text
            Tag="h3"
            text="Кількість оцінок"
            size="md"
            color="white"
            className="mb-2 md:mb-3"
          />
          <VStack gap="4">
            <Text
              Tag="span"
              text={totalRatingCountHelper(data?.current).toString()}
              size="2xl"
              color="white"
              className="mb-2"
            />
            <Percentage
              currentNum={totalRatingCountHelper(data?.current)}
              previousNum={totalRatingCountHelper(data?.previous)}
            />
          </VStack>
          <Text Tag="p" text="поставлених оцінок" size="sm" color="gray" />
        </div>
        <Separator />
        <div>
          <Text Tag="h3" text="Рейтинг оцінок" size="md" color="white" className="mb-2" />
          <VStack gap="4">
            <Text
              Tag="span"
              text={calcAverage(data?.current).toFixed(1).toString()}
              size="2xl"
              color="white"
              className="mb-1"
            />
            <Percentage
              currentNum={calcAverage(data?.current)}
              previousNum={calcAverage(data?.previous)}
            />
          </VStack>
          <Rating rating={Math.round(calcAverage(data?.current))} />
        </div>
        <Separator />

        <HStack>
          {Object.entries(currentValues)
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
                      // eslint-disable-next-line no-restricted-globals
                      width: isNaN(totalValue) ? '0%' : `${(value / totalValue) * 100}%`,
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

        {isMobile && <Separator />}
      </>
    );

  return (
    <VStack
      align="center"
      justify="start"
      className="w-full gap-[44px] bg-dark-grey mb-12 rounded-2xl md:h-[158px] md:px-4 md:mb-5"
    >
      {!isLoading && isMobile ? (
        <div className="flex flex-col gap-6 w-full md:block ">{mainBody()}</div>
      ) : (
        <>{mainBody()}</>
      )}
    </VStack>
  );
};

export default SellerRatings;
