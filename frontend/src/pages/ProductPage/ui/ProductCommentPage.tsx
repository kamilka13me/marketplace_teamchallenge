import React, {
  FC,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import Comment from '../../../enteties/Comment/ui/Comment';

import ProductCategoriesLinkTree from './components/ProductCategoriesLinkTree';

import { IComment } from '@/enteties/Comment';
import { Product } from '@/enteties/Product';
import { getUserAuthData } from '@/enteties/User';
import { calcAverage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import {
  getProductCommentsPageIsLoading,
  getProductCommentsPageOffset,
  getTotalProductFeedbacks,
} from '@/pages/ProductPage/model/selectors/ProductCommentsListSelector';
import { fetchNextProductComments } from '@/pages/ProductPage/model/services/fetchNextProductComments';
import { fetchProductCommentsList } from '@/pages/ProductPage/model/services/fetchProductComments';
import {
  getProductComments,
  productCommentsActions,
} from '@/pages/ProductPage/model/slices/productCommentsSlice';
import { ApiProductResponse, RatingResponse } from '@/pages/ProductPage/model/types';
import ProductComment from '@/pages/ProductPage/ui/components/ProductComment';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
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

  const [isCommentOpen, setIsCommentIsOpen] = useState(false);
  const [filledStars, setFilledStars] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const productComments = useAppSelector(getProductComments.selectAll);
  const totalProductComments = useAppSelector(getTotalProductFeedbacks);
  const productCommentsISLoading = useAppSelector(getProductCommentsPageIsLoading);
  const offset = useAppSelector(getProductCommentsPageOffset);

  const dispatch = useAppDispatch();

  const { data: product, isLoading } = useAxios<ApiProductResponse>(
    `${ApiRoutes.PRODUCTS}/${id}`,
  );

  const { data: productRating, refetch: productRatingRefetch } = useAxios<RatingResponse>(
    `${ApiRoutes.PRODUCT_RATINGS}?productId=${id}`,
  );

  const user = useAppSelector(getUserAuthData);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: () => {
      if (!productCommentsISLoading && offset <= totalProductComments) {
        dispatch(fetchNextProductComments({ productId: id || '' }));
      }
    },
  });

  const refetchInfo = () => {
    productRatingRefetch();
    dispatch(productCommentsActions.resetState());
  };

  useLayoutEffect(() => {
    dispatch(productCommentsActions.resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchProductCommentsList({ productId: id || '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleStarClick = (index: number) => {
    setFilledStars(index);
  };

  return (
    <div className="bg-main-dark min-h-[70vh] py-4 lg:py-10">
      <Container>
        <HStack className="w-full">
          {!isLoading && (
            <ProductCategoriesLinkTree
              categoryId={product?.product.category || ''}
              className="mb-4 lg:mb-6"
            />
          )}
          <HStack align="center" gap="5" className="lg:items-start  lg:flex-row w-full">
            {windowWidth >= 1024 && (
              <HStack
                align="center"
                gap="5"
                className="lg:items-start max-w-[424px] w-full"
              >
                <HStack
                  justify="center"
                  align="center"
                  className="relative w-full h-[336px] rounded-2xl bg-dark-grey"
                >
                  {!isLoading && (
                    <img
                      src={`${process.env.BASE_URL}${product?.product?.images[0] || ''}`}
                      alt="slider-img"
                      className="!w-[380px] !h-[315px] !object-cover"
                    />
                  )}

                  {product?.product.discount ? (
                    <HStack
                      align="center"
                      justify="center"
                      className="absolute top-4 left-4 w-[47px] h-[26px] bg-error-red rounded-lg"
                    >
                      <Text Tag="span" text="Sale" size="md" color="white" />
                    </HStack>
                  ) : (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <></>
                  )}
                </HStack>
                {!isLoading && (
                  <ProductDescription
                    feedbackLength={totalProductComments || 0}
                    rating={productRating ? calcAverage(productRating.current) : 0}
                    size="medium"
                    product={product?.product as Product}
                  />
                )}
              </HStack>
            )}

            <HStack className="w-full rounded-2xl bg-dark-grey p-4">
              <VStack justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <Text
                    Tag="p"
                    text={`Всі відгуки `}
                    size="2xl"
                    color="white"
                    className="lg:text-4xl"
                  />
                  <Text
                    Tag="span"
                    text={`${totalProductComments || 0}`}
                    size="sm"
                    color="white"
                    className="bg-selected-dark px-2 py-1 lg:px-3 lg:py-2 rounded-xl lg:rounded-lg lg:mt-2 lg:text-2xl"
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
                    refetchFeedbacks={refetchInfo}
                    stars={filledStars}
                    setStars={handleStarClick}
                    product={product?.product || ({} as Product)}
                  />
                )}
              </div>

              <div
                ref={wrapperRef}
                className="flex flex-col gap-4 w-full h-full overflow-auto lg:gap-0 lg:h-[1000px]"
              >
                {productComments?.map((item: IComment, idx: number) => (
                  <div key={item._id} className="w-full">
                    {idx !== 0 && (
                      <Separator className="bg-selected-dark !h-0.5 lg:w-full lg:h-0.5 mb-4 lg:mb-0" />
                    )}

                    <Comment
                      refetch={() => {
                        dispatch(productCommentsActions.resetState());
                      }}
                      sellerId={product?.product?.sellerId as string}
                      comment={item}
                      alignItems="horizontal"
                    />
                  </div>
                ))}
                {/* TRIGGER SCROLL */}
                <div ref={triggerRef} className="h-5 w-10 m-5" />
              </div>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </div>
  );
};

export default ProductCommentPage;
