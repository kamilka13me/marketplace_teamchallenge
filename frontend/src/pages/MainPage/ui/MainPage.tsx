import { FC } from 'react';

import SliderWidget from '../../../widgets/Slider/ui/SliderWidget';

import { ProductSectionLayout } from '@/enteties/Product';
import {
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/pages/ProductsPage';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ReactHelmet } from '@/shared/SEO';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Sidebar } from '@/widgets/Sidebar';

const MainPage: FC = () => {
  const newProduct = useGetNewProductsQuery({});
  const popularProduct = useGetPopularProductsQuery({});
  const promotionsProduct = useGetPromotionsProductsQuery({});

  const dispatch = useAppDispatch();

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
    <div data-testid="MainPage" className="mt-9 mb-[72px]">
      <ReactHelmet link="/" />

      <Container>
        <VStack justify="between" align="center">
          <Sidebar />
          <SliderWidget />
        </VStack>
        <HStack gap="6" className="mt-10">
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
      </Container>
    </div>
  );
};

export default MainPage;
