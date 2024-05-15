import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import Comment from '../../../enteties/Comment/ui/Comment';

import { IComment } from '@/enteties/Comment';
import { Product } from '@/enteties/Product';
import { getUserAuthData } from '@/enteties/User';
import { useGetCommentsQuery } from '@/pages/ProductPage/model/services/commentsApi';
import { ApiProductResponse } from '@/pages/ProductPage/model/types';
import ProductComment from '@/pages/ProductPage/ui/components/ProductComment';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import useAxios from '@/shared/lib/hooks/useAxios';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { Button } from '@/shared/ui/Button';
import { Separator } from '@/shared/ui/Separator';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const ProductCommentPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [offset, setOffset] = useState(0);
  const [isCommentOpen, setIsCommentIsOpen] = useState(false);
  const [filledStars, setFilledStars] = useState(0);

  const { data: product, isLoading } = useAxios<ApiProductResponse>(
    `${ApiRoutes.PRODUCTS}/${id}`,
  );

  const { data, isFetching, refetch } = useGetCommentsQuery({
    offset: offset * 10,
    productId: id,
  });

  const user = useAppSelector(getUserAuthData);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: () => {
      if (!isFetching && data.comments.length <= 10) {
        setOffset((prevState) => prevState + 1);
      }
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleStarClick = (index: number) => {
    setFilledStars(index);
  };

  return (
    <div className="bg-main-dark min-h-[70vh] py-4 lg:py-10">
      <Container>
        <HStack className="w-full">
          <HStack align="center" gap="5" className="lg:items-start  lg:flex-row w-full">
            <HStack
              align="center"
              gap="5"
              className="lg:items-start max-w-[424px] w-full"
            >
              <HStack
                justify="center"
                align="center"
                className="w-full h-[336px] rounded-2xl bg-dark-grey"
              >
                {!isLoading && (
                  <img
                    src={`${process.env.BASE_URL}${product?.product?.images[0] || ''}`}
                    alt="slider-img"
                    className="!w-[380px] !h-[315px] !object-cover"
                  />
                )}
              </HStack>
              {!isLoading && (
                <ProductDescription
                  feedbackLength={data?.totalComments || 0}
                  rating={2}
                  size="medium"
                  product={product?.product as Product}
                />
              )}
            </HStack>

            <HStack className="w-full rounded-2xl bg-dark-grey p-4">
              <VStack justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <Text Tag="p" text={`Всі відгуки `} size="4xl" color="white" />
                  <Text
                    Tag="span"
                    text={`${data?.totalComments || 0}`}
                    size="2xl"
                    color="white"
                    className="bg-selected-dark px-3 py-2 rounded-lg mt-2"
                  />
                </VStack>
                {user && user._id !== product?.product?.sellerId && (
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
              <div className="mt-4 w-full">
                {isCommentOpen && (
                  <ProductComment
                    stars={filledStars}
                    setStars={handleStarClick}
                    product={product?.product || ({} as Product)}
                  />
                )}
              </div>

              <HStack
                ref={wrapperRef}
                gap="4"
                className="w-full h-full overflow-auto lg:gap-0 lg:h-[1000px]"
              >
                {data?.comments.map((item: IComment, idx: number) => (
                  <div key={item._id} className="w-full">
                    {idx !== 0 && (
                      <Separator className="bg-selected-dark h-0.5 lg:w-full lg:h-0.5" />
                    )}
                    <Comment
                      sellerId={product?.product?.sellerId as string}
                      comment={item}
                      alignItems="horizontal"
                    />
                  </div>
                ))}
                {/* TRIGGER SCROLL */}
                <div ref={triggerRef} className="h-5 w-10 m-5" />
              </HStack>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </div>
  );
};

export default ProductCommentPage;
