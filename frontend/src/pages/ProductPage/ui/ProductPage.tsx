import { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Product } from '@/enteties/Product';
import { calcAverage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import {
  ApiFeedbackResponse,
  ApiProductResponse,
  RatingResponse,
} from '@/pages/ProductPage/model/types';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import ProductFeedbacks from '@/pages/ProductPage/ui/components/ProductFeedbacks';
import ProductFeedbacksTab from '@/pages/ProductPage/ui/components/ProductFeedbacksTab';
import ProductSpecification from '@/pages/ProductPage/ui/components/ProductSpecification';
import SellerContacts from '@/pages/ProductPage/ui/components/SellerContacts';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import useAxios from '@/shared/lib/hooks/useAxios';
import { ReactHelmet } from '@/shared/SEO';
import NextArrow from '@/shared/ui/Slider/NextArrow';
import PrevArrow from '@/shared/ui/Slider/PrevArrow';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  const [isProductFeedbacksOpen, setIsProductFeedbacksOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading } = useAxios<ApiProductResponse>(`${ApiRoutes.PRODUCTS}/${id}`);

  const { data: productRating, isLoading: productRatingIsLoading } =
    useAxios<RatingResponse>(`${ApiRoutes.PRODUCT_RATINGS}?productId=${id}`);

  const { data: productFeedbacks, isLoading: productFeedbacksIsLoading } =
    useAxios<ApiFeedbackResponse>(`${ApiRoutes.PRODUCT_COMMENTS}?productId=${id}`);

  useEffect(() => {
    if (data && data.product) {
      setCurrentSlide(0);
    }
  }, [data]);

  const settingsSmall = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    initialSlide: currentSlide,
    focusOnSelect: true,
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

  const openProductFeedbacksHandler = () => {
    setIsProductFeedbacksOpen((prev) => !prev);
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
        {isProductFeedbacksOpen ? (
          !productFeedbacksIsLoading && (
            <ProductFeedbacksTab
              rating={productRating ? calcAverage(productRating.current) : 0}
              feedbacks={productFeedbacks || ({} as ApiFeedbackResponse)}
              product={data?.product || ({} as Product)}
            />
          )
        ) : (
          <>
            <VStack gap="5">
              <HStack gap="5" className="w-full max-w-[646px]">
                <div className="h-[514px] bg-dark-grey max-w-[646px] w-full rounded-2xl">
                  <Slider {...settingsBig}>
                    {data?.product.images.map((item) => (
                      <img
                        key={item} // Ensure each item has a unique key
                        src={`${process.env.BASE_URL}${item}`}
                        alt="slider-img"
                        className="!w-[646px] !h-[514px] rounded-2xl bg-dark-grey !object-cover"
                      />
                    ))}
                  </Slider>
                </div>
                <div className="h-[84px] w-full ">
                  <Slider {...settingsSmall}>
                    {data?.product.images.map((item) => (
                      <img
                        key={item} // Ensure each item has a unique key
                        src={`${process.env.BASE_URL}${item}`}
                        alt="slider-img"
                        className="!w-[82px] !h-[84px] rounded-2xl bg-dark-grey !object-cover"
                      />
                    ))}
                  </Slider>
                </div>
              </HStack>

              {/* DESCRIPTION */}
              <HStack gap="5">
                {!productRatingIsLoading && !productFeedbacksIsLoading && (
                  <ProductDescription
                    rating={productRating ? calcAverage(productRating.current) : 0}
                    feedbackLength={productFeedbacks?.totalComments || 0}
                    product={data?.product || ({} as Product)}
                  />
                )}

                <SellerContacts sellerId={data?.product.sellerId || ''} />
              </HStack>
            </VStack>

            <VStack gap="5" className="mt-5">
              <ProductSpecification product={data?.product || ({} as Product)} />
              {!productFeedbacksIsLoading && !productRatingIsLoading && (
                <ProductFeedbacks
                  product={data?.product || ({} as Product)}
                  feedbacks={productFeedbacks as ApiFeedbackResponse}
                  rating={productRating as RatingResponse}
                  openAllFeedbacksHandler={openProductFeedbacksHandler}
                />
              )}
            </VStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductPage;
