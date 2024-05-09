/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import initProductsPage from '../model/services/initProductsPage';

import { ProductCard } from '@/enteties/Product';
import { getProductsPageIsLoading } from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import { getProducts } from '@/pages/ProductsPage/model/slices/productsPageSlice';
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

  useEffect(() => {
    dispatch(initProductsPage(searchParams));
  }, [searchParams]);

  console.log('products', products);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center my-20">
        <span>Loading...</span>
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
              <span>Знайдено {products.length} результатів пошуку</span>

              <span className="flex items-center gap-1">
                <span>Сортувати за:</span>
                <select id="cars" name="cars" defaultValue="nosort">
                  <option value="nosort" disabled hidden>
                    Обрати опцію
                  </option>
                  <option value="rating">Рейтингом</option>
                  <option value="price">Ціною</option>
                </select>
              </span>
            </div>

            <div className="productsContent w-full flex flex-wrap gap-5 justify-around">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="pagination w-full flex justify-center gap-4">
              <button
                type="button"
                className="border-black border-[1px] h-8 px-2 flex justify-center items-center rounded-lg"
                onClick={() => {}}
              >
                Попередня
              </button>

              <div className="flex gap-1">
                <button
                  type="button"
                  className="border-grey border-[1px] h-8 w-8 flex justify-center items-center rounded-lg"
                >
                  1
                </button>
                <button
                  type="button"
                  className="border-grey border-[1px] h-8 w-8 flex justify-center items-center rounded-lg"
                >
                  2
                </button>
                <button
                  type="button"
                  className="border-grey border-[1px] h-8 w-8 flex justify-center items-center rounded-lg"
                >
                  3
                </button>
              </div>

              <button
                type="button"
                className="border-black border-[1px] h-8 px-2 flex justify-center items-center rounded-lg"
                onClick={() => {}}
              >
                Наступна
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
