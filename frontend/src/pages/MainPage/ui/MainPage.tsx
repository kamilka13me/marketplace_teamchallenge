import React, { FC, useState } from 'react';

import SliderWidget from '../../../widgets/Slider/ui/SliderWidget';

import { ProductSectionLayout } from '@/enteties/Product';
import {
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/pages/ProductsPage';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';
import allProducts from '@/shared/assets/icons/allProducts.svg?react';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ReactHelmet } from '@/shared/SEO';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import ModalCategoryMobile from '@/widgets/ModalCategory/ui/ModalCategoryMobile';
import { Sidebar } from '@/widgets/Sidebar';

const MainPage: FC = () => {
  const [mobileAllCategories, setMobileAllCategories] = useState(false);

  const newProduct = useGetNewProductsQuery({});
  const popularProduct = useGetPopularProductsQuery({});
  const promotionsProduct = useGetPromotionsProductsQuery({});

  const dispatch = useAppDispatch();

  const openMobileAllCategoriesHandler = () => {
    setMobileAllCategories(false);
  };

  const newProductsSearchParamsHandler = () => {
    dispatch(productsPageActions.clearSortParams());
    dispatch(productsPageActions.setSortDirection('1'));
  };

  const popularProductsSearchParamsHandler = () => {
    dispatch(productsPageActions.clearSortParams());
    dispatch(productsPageActions.setSortDirection('-1'));
    dispatch(productsPageActions.setSortBy('views'));
  };

  const promotionsProductsSearchParamsHandler = () => {
    dispatch(productsPageActions.clearSortParams());
    dispatch(productsPageActions.setSortBy('views'));
    dispatch(productsPageActions.setSortDirection('-1'));
    dispatch(productsPageActions.setDiscount('1'));
  };

  return (
    <div data-testid="MainPage" className="mt-9 mb-[56px] lg:mb-[72px]">
      <ReactHelmet link="/" />

      <Container>
        <HStack justify="between" align="center" className="lg:flex-row">
          <div className="hidden lg:block max-w-[314px] w-full">
            <Sidebar />
          </div>
          <SliderWidget />
          <Button
            variant="primary"
            className="relative lg:hidden w-full mt-4 h-[38px]"
            onClick={() => setMobileAllCategories(true)}
          >
            <Icon
              aria-hidden="true"
              Svg={allProducts}
              width={24}
              height={24}
              className="absolute top-[7px] left-[19px]"
            />
            <Text
              Tag="span"
              text="Всі товари"
              size="sm"
              className="font-semibold"
              font="ibm-plex-sans"
            />
          </Button>
        </HStack>
        <HStack gap="6" className="mt-6 md:mt-10">
          <ProductSectionLayout
            isLoading={newProduct.isLoading}
            title="Новинки"
            products={newProduct.data}
            setSearchParams={newProductsSearchParamsHandler}
          />
          <ProductSectionLayout
            isLoading={promotionsProduct.isLoading}
            title="Акційні пропозиції"
            products={promotionsProduct.data}
            setSearchParams={popularProductsSearchParamsHandler}
          />
          <ProductSectionLayout
            isLoading={popularProduct.isLoading}
            title="Популярні товари"
            products={popularProduct.data}
            setSearchParams={promotionsProductsSearchParamsHandler}
          />
        </HStack>
        <div className="lg:hidden">
          <ModalCategoryMobile
            isOpen={mobileAllCategories}
            setIsOpen={openMobileAllCategoriesHandler}
          />
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
