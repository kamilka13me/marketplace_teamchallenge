import { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import initProductsPage from '../model/services/initProductsPage';

import ProductsPagination from './ProductsPagination/ProductsPagination';
import ProductsSortSelector from './ProductsSortSelector/ProductsSortSelector';

import { ProductCard } from '@/enteties/Product';
import {
  getProductsCount,
  getProductsPageIsLoading,
} from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import {
  getProducts,
  productsPageActions,
} from '@/pages/ProductsPage/model/slices/productsPageSlice';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { ReactHelmet } from '@/shared/SEO';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

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
          <div className="sidebar hidden lg:block max-w-[300px] w-full pt-11">
            <div className="siderbarBox w-full">
              <Sidebar />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="topRow w-full flex items-center justify-between">
              <span className="text-lg">Знайдено {productsCount} результатів пошуку</span>
              <ProductsSortSelector />
            </div>

            <div className="productsContent w-full flex flex-wrap gap-5 justify-around">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <ProductsPagination />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
