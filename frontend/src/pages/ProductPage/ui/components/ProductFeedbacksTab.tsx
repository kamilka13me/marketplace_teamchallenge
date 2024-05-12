import { FC, useState } from 'react';

import Comment from '@/enteties/Comment/ui/Comment';
import { Product } from '@/enteties/Product';
import { ApiFeedbackResponse } from '@/pages/ProductPage/model/types';
import ProductComment from '@/pages/ProductPage/ui/components/ProductComment';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
  feedbacks: ApiFeedbackResponse;
  rating: number;
}

const ProductFeedbacksTab: FC<Props> = (props) => {
  const { product, rating, feedbacks } = props;

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
          <ProductDescription
            feedbackLength={feedbacks?.totalComments || 0}
            rating={rating}
            size="medium"
            product={product}
          />
        </HStack>
        <HStack className="w-full rounded-2xl bg-dark-grey p-4">
          <VStack justify="between" align="center" className="w-full">
            <Text
              Tag="p"
              text={`Всі відгуки ${feedbacks?.totalComments || 0}`}
              size="4xl"
              color="white"
            />
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

          <div className="h-[1000px] overflow-auto w-full">
            {feedbacks?.comments.map((item) => (
              <Comment
                key={item._id}
                sellerId={product?.sellerId}
                comment={item}
                alignItems="horizontal"
              />
            ))}
          </div>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ProductFeedbacksTab;
