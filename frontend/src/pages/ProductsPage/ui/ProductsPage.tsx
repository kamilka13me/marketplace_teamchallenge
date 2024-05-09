/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import initProductsPage from '../model/services/initProductsPage';

import { getProductsPageIsLoading } from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import { getProducts } from '@/pages/ProductsPage/model/slices/productsPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const products = useAppSelector(getProducts.selectAll);
  const isLoading = useAppSelector(getProductsPageIsLoading);

  useEffect(() => {
    dispatch(initProductsPage(searchParams));
  }, [searchParams]);

  console.log('products', products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full border border-red-500">
      <span>ProductsPage {category}</span>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
