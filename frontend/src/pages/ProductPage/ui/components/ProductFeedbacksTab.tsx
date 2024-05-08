import { FC, useState } from 'react';

import { Product } from '@/enteties/Product';
import ProductComment from '@/pages/ProductPage/ui/components/ProductComment';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

// const comment: IComment = {
//   _id: '6624ea33fa02a0f7fdc0c488',
//   authorId: '660161581233bf9ce6cb00b8',
//   sellerId: '660161581233bf9ce6cb00b8',
//   productId: null,
//   ratingId: {
//     authorId: '660161581233bf9ce6cb00b8',
//     sellerId: '660161581233bf9ce6cb00b8',
//     productId: '661fa56efd0eda1f2b1b2ee2',
//     rating: 3,
//     created_at: '2024-04-21T10:28:03.818Z',
//   },
//   parentId: null,
//   comment:
//     'Я дуже задоволена своїм новим ноутбуком Apple MacBook Air M1 2022. Його потужний процесор дозволяє швидко виконувати завдання, а роздільна здатність екрану забезпечує чудову якість зображення',
//   images: [],
//   created_at: '2024-04-21T10:28:03.860Z',
// };

interface Props {
  product: Product;
}

const ProductFeedbacksTab: FC<Props> = (props) => {
  const { product } = props;

  const [isCommentOpen, setIsCommentIsOpen] = useState(false);
  const [filledStars, setFilledStars] = useState(0);
  const handleStarClick = (index: number) => {
    setFilledStars(index);
  };

  return (
    <HStack className="w-full">
      <VStack gap="5" className="w-full">
        <HStack gap="5" className="max-w-[424px] w-full">
          <HStack
            justify="center"
            align="center"
            className="w-[424px] h-[336px] rounded-2xl bg-dark-grey"
          >
            <img
              src={`${process.env.BASE_URL}${product?.images[0] || ''}`}
              alt="slider-img"
              className="!w-[380px] !h-[315px] !object-cover"
            />
          </HStack>
          <ProductDescription size="medium" product={product} />
        </HStack>
        <HStack className="w-full rounded-2xl bg-dark-grey p-4">
          <VStack justify="between" align="center" className="w-full">
            <Text Tag="p" text="Всі відгуки" size="4xl" color="white" />
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
          <div className="mt-4 w-full">
            {isCommentOpen && (
              <ProductComment
                stars={filledStars}
                setStars={handleStarClick}
                product={product}
              />
            )}
          </div>

          {/* <div className="h-[1000px] overflow-auto w-full"> */}
          {/*  {Array(10) */}
          {/*    .fill(5) */}
          {/*    .map((item) => ( */}
          {/*      <Comment alignItems="horizontal" comment={comment} /> */}
          {/*    ))} */}
          {/* </div> */}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ProductFeedbacksTab;
