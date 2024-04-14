import { FC } from 'react';

//
// import { useSearchParams } from 'react-router-dom';
//
// import { getProductsPageIsLoading } from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
// import { fetchNextProductsPage } from '@/pages/ProductsPage/model/services/fetchNextProductsPage';
// import { getProducts } from '@/pages/ProductsPage/model/slices/productsPageSlice';
// import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
// import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

interface Props {}

const ProductsPage: FC<Props> = () => {
  // const dispatch = useAppDispatch();
  //
  // const products = useAppSelector(getProducts.selectAll);
  // const isLoading = useAppSelector(getProductsPageIsLoading);
  //
  // const [searchParams] = useSearchParams();
  //
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   dispatch(initProductsPage(searchParams));
  // }, []);
  //
  // const onLoadNextPart = () => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   dispatch(fetchNextProductsPage());
  // };

  return <div className="">ProductsPage</div>;
};

export default ProductsPage;
