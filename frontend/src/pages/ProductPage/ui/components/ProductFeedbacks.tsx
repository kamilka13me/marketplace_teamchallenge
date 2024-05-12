import { FC, useState } from 'react';

import { Comment, IComment } from '@/enteties/Comment';
import { Product } from '@/enteties/Product';
import { Rating } from '@/enteties/Rating';
import { getUserAuthData } from '@/enteties/User';
import {
  calcAverage,
  calcRatingInPercentage,
} from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import { ApiFeedbackResponse, RatingResponse } from '@/pages/ProductPage/model/types';
import ProductComment from '@/pages/ProductPage/ui/components/ProductComment';
import star from '@/shared/assets/icons/star-2.svg?react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
  feedbacks: ApiFeedbackResponse;
  rating: RatingResponse;
  openAllFeedbacksHandler: () => void;
}

const ProductFeedbacks: FC<Props> = (props) => {
  const { openAllFeedbacksHandler, product, feedbacks, rating } = props;

  const [isCommentOpen, setIsCommentIsOpen] = useState(false);
  const [filledStars, setFilledStars] = useState(0);

  const user = useAppSelector(getUserAuthData);

  const currentValues = calcRatingInPercentage(rating?.current);
  const totalValue = Object.values(currentValues).reduce((acc, curr) => acc + curr, 0);

  const handleStarClick = (index: number) => {
    setFilledStars(index);
  };

  return (
    <HStack className=" bg-dark-grey max-w-[646px] w-full rounded-2xl p-4">
      <VStack justify="between" align="center" className="w-full mb-12 lg:mb-8">
        <Text Tag="h4" text="Відгуки" size="4xl" color="white" font="ibm-plex-sans" />
        {user && (
          <Button
            variant="border-bottom"
            className={`${isCommentOpen ? '!border-b-disabled !text-disabled' : ''} duration-300 text-sm`}
            onClick={() => {
              setIsCommentIsOpen((prev) => !prev);
            }}
          >
            {isCommentOpen ? 'Відмінити' : 'Залишити відгук'}
          </Button>
        )}
      </VStack>

      {isCommentOpen && (
        <ProductComment
          product={product}
          stars={filledStars}
          setStars={handleStarClick}
        />
      )}

      <HStack gap="8" className="mb-8 lg:flex-row lg:mb-4 ">
        <HStack>
          <Text
            Tag="p"
            text={calcAverage(rating?.current).toFixed(1)}
            size="4xl"
            color="white"
          />

          <Rating rating={calcAverage(rating?.current)} />

          <Text
            Tag="p"
            text={`${feedbacks.totalComments} відгуків`}
            size="md"
            color="gray-light"
            className="mt-1"
          />
        </HStack>

        <HStack>
          {Object.entries(currentValues)
            ?.reverse()
            .map(([key, value]) => (
              <VStack key={key} align="center" gap="2">
                <VStack gap="1" justify="start" align="center" className="w-[25px]">
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
                  text={rating.current?.[key]?.toString() ?? ''}
                  size="md"
                  color="white"
                />
              </VStack>
            ))}
        </HStack>
      </HStack>

      {feedbacks.totalComments > 0 ? (
        <>
          <Button
            variant="clear"
            className="self-end text-light-grey mb-4"
            onClick={openAllFeedbacksHandler}
          >
            Показати всі відгуки
          </Button>
          <Comment
            alignItems="horizontal"
            sellerId={product?.sellerId}
            comment={
              feedbacks.comments ? (feedbacks.comments[0] as IComment) : ({} as IComment)
            }
          />
        </>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
    </HStack>
  );
};

export default ProductFeedbacks;
