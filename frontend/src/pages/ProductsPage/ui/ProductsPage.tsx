import { FC, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import initProductsPage from '../model/services/initProductsPage';

import ProductsPagination from './components/ProductsPagination';
import ProductsSidebar from './components/ProductsSidebar';
import ProductsSortSelector from './components/ProductsSortSelector';

import { ProductCard } from '@/enteties/Product';
import {
  getProductsCount,
  getProductsPageIsLoading,
} from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import {
  getProducts,
  productsPageActions,
} from '@/pages/ProductsPage/model/slices/productsPageSlice';
import ProductMobileFilterModal from '@/pages/ProductsPage/ui/components/ProductMobileFilterModal';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { ReactHelmet } from '@/shared/SEO';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useAppSelector(getProducts.selectAll);
  const isLoading = useAppSelector(getProductsPageIsLoading);
  const productsCount = useAppSelector(getProductsCount);

  useEffect(() => {
    dispatch(initProductsPage(searchParams));

    return () => {
      dispatch(productsPageActions.clearSortParams());
    };
  }, [dispatch, searchParams]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center my-20">
        <span>Завантаження...</span>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="flex justify-center items-center my-20">
        <span>По Вашому запиту нічого не знайдено. Уточніть свій запит.</span>
      </Container>
    );
  }

  return (
    <div data-testid="ProductsPage" className="mt-9 mb-[56px] lg:mb-[72px]">
      <ReactHelmet link="/products" />

      <Container className="container">
        <div className="contentBox flex gap-6">
          <div className="sidebarRow hidden lg:block max-w-[300px] w-full pt-14">
            <div className="siderbarBox w-full">
              <ProductsSidebar />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 -mt-4">
            <div className="topRow w-full flex flex-col lg:flex-row lg:items-center justify-between">
              <Text
                Tag="span"
                text={`Знайдено ${productsCount} результатів пошуку`}
                size="lg"
                color="primary"
                className="self-center lg:self-start"
              />
              <ProductsSortSelector openFilterModal={() => setIsModalOpen(true)} />
            </div>

            <div className="productsContent w-full grid justify-center grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <ProductsPagination />
          </div>
        </div>
      </Container>
      {isModalOpen && <ProductMobileFilterModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ProductsPage;
