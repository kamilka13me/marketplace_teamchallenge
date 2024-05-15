import React, { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Product, ProductSectionLayout } from '@/enteties/Product';
import { calcAverage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import { useGetCommentsQuery } from '@/pages/ProductPage/model/services/commentsApi';
import {
  ApiFeedbackResponse,
  ApiProductResponse,
  RatingResponse,
} from '@/pages/ProductPage/model/types';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import ProductFeedbacks from '@/pages/ProductPage/ui/components/ProductFeedbacks';
import ProductSpecification from '@/pages/ProductPage/ui/components/ProductSpecification';
import SellerContacts from '@/pages/ProductPage/ui/components/SellerContacts';
import { useGetPromotionsProductsQuery } from '@/pages/ProductsPage';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import useAxios from '@/shared/lib/hooks/useAxios';
import { ReactHelmet } from '@/shared/SEO';
import { Link } from '@/shared/ui/Link';
import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  const [, setCurrentSlide] = useState(0);

  const promotionsProduct = useGetPromotionsProductsQuery({});

  const dispatch = useAppDispatch();

  const { data, isLoading } = useAxios<ApiProductResponse>(`${ApiRoutes.PRODUCTS}/${id}`);

  const { data: comments, refetch: refetchComments } = useGetCommentsQuery({
    offset: 0,
    productId: id,
  });

  const {
    data: productRating,
    isLoading: productRatingIsLoading,
    refetch: refetchRating,
  } = useAxios<RatingResponse>(`${ApiRoutes.PRODUCT_RATINGS}?productId=${id}`);

  const refetchDataHandler = () => {
    refetchRating();
    refetchComments();
  };

  useEffect(() => {
    if (data && data.product) {
      setCurrentSlide(0);
    }
  }, [data]);

  const promotionsProductsSearchParamsHandler = () => {
    dispatch(productsPageActions.clearSortParams());
    dispatch(productsPageActions.setSortBy('views'));
    dispatch(productsPageActions.setSortDirection('-1'));
    dispatch(productsPageActions.setDiscount('1'));
  };

  const settingsSmall = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  const settingsBig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="bg-main-dark min-h-[70vh] py-4 lg:py-10">
      <ReactHelmet
        link={`/product/${id}`}
        title={data?.product.name || 'Peach market'}
        description={data?.product.description || ''}
      />
      <Container>
        <VStack gap="1" className="!text-main-white mb-5">
          <Link to="/">Товари Apple /</Link>
          <Link to="/">Mackbook /</Link>
          <Link to="/">Mackbook Air 1</Link>
        </VStack>
        <HStack gap="4" align="center" className="lg:gap-5 lg:flex-row">
          <HStack gap="5" className="w-full max-w-[646px]">
            <div className="relative w-full bg-dark-grey  rounded-2xl lg:h-[514px] lg:max-w-[646px]">
              <Slider {...settingsBig}>
                {data?.product?.images.map((item) => (
                  <img
                    key={item} // Ensure each item has a unique key
                    src={`${process.env.BASE_URL}${item}`}
                    alt="slider-img"
                    className="w-full h-[250px] sm:h-[350px] lg:!w-[646px] lg:!h-[514px] rounded-2xl bg-dark-grey !object-cover"
                  />
                ))}
              </Slider>
              {data?.product?.discount && (
                <HStack
                  align="center"
                  justify="center"
                  className="absolute top-6 left-6 w-[47px] h-[26px] bg-error-red rounded-lg"
                >
                  <Text Tag="span" text="Sale" size="md" color="white" />
                </HStack>
              )}
            </div>

            <div className="hidden lg:block h-[84px] w-full">
              <Slider {...settingsSmall}>
                {data?.product.images.map((item) => (
                  <img
                    key={item}
                    src={`${process.env.BASE_URL}${item}`}
                    alt="slider-img"
                    className="!w-[82px] !h-[84px] rounded-2xl bg-dark-grey !object-cover"
                  />
                ))}
              </Slider>
            </div>
          </HStack>
          {/* DESCRIPTION */}
          <HStack gap="4" className="lg:gap-5 w-full max-w-[646px]">
            <ProductDescription
              rating={productRating ? calcAverage(productRating.current) : 0}
              feedbackLength={comments?.totalComments}
              product={data?.product || ({} as Product)}
            />

            <SellerContacts sellerId={data?.product.sellerId || ''} />
          </HStack>
        </HStack>
        <HStack
          align="center"
          gap="4"
          className="lg:items-start mt-4 lg:flex-row lg:mt-5 lg:gap-5 "
        >
          <div className="w-full sm:w-[646px]">
            <ProductSpecification product={data?.product || ({} as Product)} />
          </div>

          {!productRatingIsLoading && (
            <ProductFeedbacks
              refetchFeedbacks={refetchDataHandler}
              product={data?.product || ({} as Product)}
              feedbacks={
                {
                  comments: comments?.comments,
                  totalComments: comments?.totalComments,
                } as ApiFeedbackResponse
              }
              rating={productRating as RatingResponse}
            />
          )}
        </HStack>
        <ProductSectionLayout
          isLoading={promotionsProduct.isLoading}
          title="Акційні пропозиції"
          dark
          products={promotionsProduct.data?.products}
          className="mt-5"
          setSearchParams={promotionsProductsSearchParamsHandler}
        />
      </Container>
    </div>
  );
};

export default ProductPage;
