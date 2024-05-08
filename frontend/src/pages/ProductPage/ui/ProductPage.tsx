import { FC, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Product } from '@/enteties/Product';
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

interface ApiResponse {
  product: Product;
}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  const [isProductFeedbacksOpen, setIsProductFeedbacksOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading } = useAxios<ApiResponse>(`${ApiRoutes.PRODUCTS}/${id}`);

  useEffect(() => {
    // Update the current slide index whenever data changes
    if (data && data.product) {
      setCurrentSlide(0); // Reset to the first slide
    }
  }, [data]);

  // Function to handle change in the small slider
  // const handleSmallSliderChange = (index: number) => {
  //   setCurrentSlide(index); // Update current slide state
  //   bigSliderRef.current?.slickGoTo(index); // Go to the selected slide in the big slider
  // };

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
          <ProductFeedbacksTab product={data?.product || ({} as Product)} />
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
                <ProductDescription product={data?.product || ({} as Product)} />
                <SellerContacts sellerId={data?.product.sellerId || ''} />
              </HStack>
            </VStack>

            <VStack gap="5" className="mt-5">
              <ProductSpecification product={data?.product || ({} as Product)} />
              <ProductFeedbacks
                product={data?.product || ({} as Product)}
                openAllFeedbacksHandler={openProductFeedbacksHandler}
              />
            </VStack>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductPage;
