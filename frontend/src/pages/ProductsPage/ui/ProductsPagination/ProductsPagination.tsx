/* eslint-disable no-console */
import { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import { getProductsCount } from '../../model/selectors/productsPageSelectors';

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import Pagination from '@/shared/ui/Pagination/Pagination';

interface Props {}

const ProductsPagination: FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productsCount = useAppSelector(getProductsCount);
  const productsLimit = useAppSelector((state) => state.products.limit);
  const offset = useAppSelector((state) => state.products.offset);
  const currentPage = offset + 1;

  const handleClickPage = (pageNumber: number) => {
    searchParams.set('offset', String(productsLimit * (pageNumber - 1)));
    setSearchParams(searchParams);
  };

  const fetchNext = () => {
    searchParams.set('offset', String(offset + productsLimit));
    setSearchParams(searchParams);
  };

  const fetchPrev = () => {
    searchParams.set('offset', String(offset - productsLimit));
    setSearchParams(searchParams);
  };

  return (
    <Pagination
      dataLength={productsCount}
      itemsPerPage={productsLimit}
      currentPage={currentPage}
      setPage={handleClickPage}
      offset={offset}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      className="text-black"
    />
  );
};

export default ProductsPagination;
