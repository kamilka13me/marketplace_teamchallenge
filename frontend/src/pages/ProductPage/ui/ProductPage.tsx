import { FC, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Product } from '@/enteties/Product';
import ProductDescription from '@/pages/ProductPage/ui/components/ProductDescription';
import ProductFeedbacks from '@/pages/ProductPage/ui/components/ProductFeedbacks';
import ProductSpecification from '@/pages/ProductPage/ui/components/ProductSpecification';
import SellerContacts from '@/pages/ProductPage/ui/components/SellerContacts';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Container } from '@/shared/layouts/Container';
import useAxios from '@/shared/lib/hooks/useAxios';
import { ReactHelmet } from '@/shared/SEO';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {}

interface ApiResponse {
  product: Product;
}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  const [isProductFeedbacksOpen, setIsProductFeedbacksOpen] = useState(false);
  const { data, isLoading } = useAxios<ApiResponse>(`${ApiRoutes.PRODUCTS}/${id}`);

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 8,
  //   slidesToScroll: 1,
  //   draggable: true,
  //   adaptiveHeight: true,
  // };

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
        title={data?.product.name || id}
        description="Product"
        noIndex
      />
      <Container>
        {isProductFeedbacksOpen ? (
          <VStack gap="5">
            <HStack gap="5" className="max-w-[424px] w-full">
              <div className="w-full h-[336px] bg-dark-grey rounded-2xl" />
              <ProductDescription
                size="medium"
                product={data?.product || ({} as Product)}
              />
            </HStack>
            <HStack className="w-full rounded-2xl bg-dark-grey p-4">
              <Text Tag="p" text="Всі відгуки" size="4xl" color="white" />
            </HStack>
          </VStack>
        ) : (
          <>
            <VStack gap="5">
              {/* SLIDERS */}
              <HStack gap="5" className="w-full max-w-[646px]">
                <div className="h-[514px] bg-dark-grey max-w-[646px] w-full rounded-2xl">
                  {/* <CustomSlider images={data?.product.images} /> */}
                </div>
                <div className="h-[84px] bg-dark-grey w-full rounded-2xl">
                  {/* <Slider {...settings}> */}
                  {/*  {data?.product.images.map((item) => ( */}
                  {/*    <img */}
                  {/*      src={`${process.env.BASE_URL}${item}`} */}
                  {/*      alt="slider-img" */}
                  {/*      className="w-full h-full rounded-2xl object-cover" */}
                  {/*    /> */}
                  {/*  ))} */}
                  {/* </Slider> */}
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
