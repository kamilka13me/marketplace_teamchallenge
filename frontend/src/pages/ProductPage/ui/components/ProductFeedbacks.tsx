import { FC, useState } from 'react';

import { Comment, IComment } from '@/enteties/Comment';
import { Product } from '@/enteties/Product';
import { Rating } from '@/enteties/Rating';
import { calcRatingInPercentage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import star from '@/shared/assets/icons/star-2.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Textarea } from '@/shared/ui/Textarea';

const current = {
  '1': 0,
  '2': 1,
  '3': 3,
  '4': 7,
  '5': 10,
};

const comment: IComment = {
  _id: '6624ea33fa02a0f7fdc0c488',
  authorId: '660161581233bf9ce6cb00b8',
  sellerId: '660161581233bf9ce6cb00b8',
  productId: null,
  ratingId: {
    authorId: '660161581233bf9ce6cb00b8',
    sellerId: '660161581233bf9ce6cb00b8',
    productId: '661fa56efd0eda1f2b1b2ee2',
    rating: 3,
    created_at: '2024-04-21T10:28:03.818Z',
  },
  parentId: null,
  comment:
    'Я дуже задоволена своїм новим ноутбуком Apple MacBook Air M1 2022. Його потужний процесор дозволяє швидко виконувати завдання, а роздільна здатність екрану забезпечує чудову якість зображення',
  images: [],
  created_at: '2024-04-21T10:28:03.860Z',
};

interface Props {
  product: Product;
  openAllFeedbacksHandler: () => void;
}

const ProductFeedbacks: FC<Props> = (props) => {
  const { openAllFeedbacksHandler, product } = props;

  const [isCommentOpen, setIsCommentIsOpen] = useState(false);

  const [filledStars, setFilledStars] = useState(0);

  const currentValues = calcRatingInPercentage(current);
  const totalValue = Object.values(currentValues).reduce((acc, curr) => acc + curr, 0);

  // const sendFeedbackHandler = () => {
  //   try {
  //     const res = $api.post(ApiRoutes.SELLER_FEEDBACKS, {
  //       sellerId: product.sellerId,
  //       productId: product._id,
  //       rating: filledStars + 1,
  //       comment: '',
  //       images: [''],
  //       parentId: null,
  //     });
  //   } catch (e) {
  //
  //   }
  // };

  const handleStarClick = (index: number) => {
    setFilledStars(index);
  };

  return (
    <HStack className=" bg-dark-grey max-w-[646px] w-full rounded-2xl p-4">
      <VStack justify="between" align="center" className="w-full mb-8">
        <Text Tag="h4" text="Відгуки" size="4xl" color="white" font="ibm-plex-sans" />
        <Button
          variant="border-bottom"
          className={`${isCommentOpen ? '!border-b-disabled !text-disabled' : ''} duration-300 text-sm`}
          onClick={() => {
            setIsCommentIsOpen((prev) => !prev);
          }}
        >
          {isCommentOpen ? 'Відмінити' : 'Залишити відгук'}
        </Button>
      </VStack>

      {isCommentOpen && (
        <HStack gap="4" className="w-full mb-8">
          <VStack gap="2" className="">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Icon
                  key={i}
                  width={20}
                  height={20}
                  Svg={star}
                  onClick={() => handleStarClick(i)}
                  className={`${i <= filledStars ? '!fill-main' : '!stroke-main'} duration-300 cursor-pointer !stroke-[2px] `}
                />
              ))}
          </VStack>
          <form className="w-full">
            <Textarea
              name="comment"
              variant="clear"
              placeholder="Напишіть коментар"
              className="resize-y !h-[126px] w-full bg-transparent border-[2px] border-disabled p-2"
            />

            <HStack className="w-full mt-4" align="end">
              <Text
                Tag="span"
                text="Файли з форматів: png, jpg, pdf, doc, docx"
                size="sm"
                color="gray-light"
              />
              <VStack gap="4" className="mt-2 w-full" justify="end">
                <Button variant="grey-outlined">Обрати файл</Button>
                <Button variant="primary" className="w-[226px]">
                  Надіслати {product._id}
                </Button>
              </VStack>
            </HStack>
          </form>
        </HStack>
      )}

      <VStack gap="8" className="mb-4">
        <HStack>
          <Text Tag="p" text="4.0" size="4xl" color="white" />
          <Rating rating={4} />
          <Text Tag="p" text="16 відгуків" size="md" color="gray-light" />
        </HStack>
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
                {/* <Text */}
                {/*    Tag="p" */}
                {/*    text={data?.current?.[key]?.toString() ?? ''} */}
                {/*    size="md" */}
                {/*    color="white" */}
                {/* /> */}
              </VStack>
            ))}
        </HStack>
      </VStack>

      <Button
        variant="clear"
        className="self-end text-light-grey mb-4"
        onClick={openAllFeedbacksHandler}
      >
        Показати всі відгуки
      </Button>

      <Comment alignItems="horizontal" comment={comment} />
    </HStack>
  );
};

export default ProductFeedbacks;
