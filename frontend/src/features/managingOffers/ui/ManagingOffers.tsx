import { FC, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  getAdminOffersIsLoading,
  getAdminOffersLimit,
  getAdminOffersOffset,
  getAdminOffersSellerId,
  getAdminOffersSortBy,
  getAdminOffersSortDirection,
  getAdminOffersStatus,
  getTotalAdminOffers,
} from '../model/selectors';
import {
  fetchAdminOffersList,
  fetchNextAdminOffers,
  fetchPrevAdminOffers,
  initAdminOffersTab,
} from '../model/services';
import { adminOffersActions, getAdminOffers } from '../model/slice';

import EditProductContainer from '@/features/managingProducts/ui/EditProductContainer';
import OfferController from '@/pages/AdminPage/ui/Tabs/ManagingOffers/OfferController';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import { IRangeDate } from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

const ManagingOffers: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });
  const [currentOfferIdForEditing, setCurrentOfferIdForEditing] = useState<null | string>(
    null,
  );

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const offers = useAppSelector(getAdminOffers.selectAll);
  const isLoading = useAppSelector(getAdminOffersIsLoading);
  const limit = useAppSelector(getAdminOffersLimit);
  const offset = useAppSelector(getAdminOffersOffset);
  const sellerId = useAppSelector(getAdminOffersSellerId);
  const status = useAppSelector(getAdminOffersStatus);
  const sortBy = useAppSelector(getAdminOffersSortBy);
  const sortDirection = useAppSelector(getAdminOffersSortDirection);
  const totalOffers = useAppSelector(getTotalAdminOffers);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(adminOffersActions.setOffset((pageNumber - 1) * limit));
  };

  useEffect(() => {
    dispatch(initAdminOffersTab(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchAdminOffersList({}));
  }, [dispatch, offset, sellerId, status, sortBy, sortDirection, dateRange]);

  useEffect(() => {
    dispatch(adminOffersActions.setStartDate(dateRange.startDate.toISOString()));
    dispatch(adminOffersActions.setEndDate(dateRange.endDate.toISOString()));
  }, [dispatch, dateRange]);

  const fetchNext = () => {
    setCurrentPage((prev) => prev + 1);

    dispatch(fetchNextAdminOffers());
  };

  const fetchPrev = () => {
    setCurrentPage((prev) => prev - 1);

    dispatch(fetchPrevAdminOffers());
  };

  const updateOfferStatus = (id: string, value: string) => {
    try {
      $api.put(`${ApiRoutes.PRODUCT_STATUS}/${id}`, {
        status: value,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      if (status && status !== value) {
        dispatch(fetchAdminOffersList({}));
      }
    }
  };

  return isFormOpen ? (
    <EditProductContainer
      productId={currentOfferIdForEditing || ''}
      closeForm={() => setIsFormOpen(false)}
    />
  ) : (
    <section className="lg:flex flex-col w-full lg:gap-4 bg-dark-grey lg:bg-transparent rounded-2xl hidden">
      <ListingSort />
      <HStack gap="4" className="p-4 bg-dark-grey rounded-2xl ">
        <ListingByDate dateRange={dateRange} setDateRange={setDateRange} />
        <table className="w-full border-separate border-spacing-0">
          <thead className="mb-1 bg-selected-dark rounded-2xl">
            <tr>
              <th aria-label="Дата" className="w-[125px] p-2.5 font-normal text-start">
                <Text Tag="span" text="Дата" size="lg" color="white" />
              </th>
              <th
                aria-label="ID Продавця"
                className="w-[140px] p-2.5 font-normal text-start"
              >
                <Text Tag="span" text="ID Продавця" size="lg" color="white" />
              </th>
              <th
                aria-label="Назва товару"
                className="w-[259px] font-normal p-2.5 text-start"
              >
                <Text
                  Tag="span"
                  text="Назва товару"
                  size="lg"
                  color="white"
                  className="max-w-[220px] max-h-12 overflow-hidden whitespace-nowrap overflow-ellipsis "
                />
              </th>
              <th
                aria-label="ID Товару"
                className="w-[120px] font-normal p-2.5 text-start"
              >
                <Text Tag="span" text="ID Товару" size="lg" color="white" />
              </th>
              <th aria-label="Ціна" className="w-[140px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Ціна" size="lg" color="white" />
              </th>
              <th aria-label="Дії" className="w-[70px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Дії" size="lg" color="white" />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td aria-label="Завантаження">
                  <Text Tag="p" text="Loading..." size="md" color="white" />
                </td>
              </tr>
            ) : (
              offers.map((elem) => (
                <tr
                  key={elem?._id}
                  className="h-[76px] w-full mb-1 even:bg-selected-dark odd:bg-transparent rounded-2xl"
                >
                  <td aria-label="Дата" className="pl-2.5 rounded-l-2xl">
                    <Text
                      Tag="p"
                      text={elem?.created_at.slice(0, 10).split('-').reverse().join('.')}
                      size="md"
                      color="white"
                    />
                  </td>
                  <td aria-label="ID Продавця" className="pl-2.5">
                    <Text Tag="p" text={elem?.sellerId} size="md" color="white" />
                  </td>
                  <td aria-label="Назва товару" className="pl-2.5">
                    <Text Tag="p" text={elem?.name} size="md" color="white" />
                  </td>
                  <td aria-label="ID Товару" className="pl-2.5">
                    <Text Tag="p" text={elem?._id} size="md" color="white" />
                  </td>
                  <td aria-label="Ціна" className="pl-2.5">
                    <Text Tag="p" text={`${elem?.price}грн`} size="md" color="white" />
                  </td>
                  <td aria-label="Дії" className="rounded-r-2xl">
                    <OfferController
                      editHandler={() => {
                        setIsFormOpen(true);
                        setCurrentOfferIdForEditing(elem._id);
                      }}
                      publishHandler={() => {
                        updateOfferStatus(elem._id, 'published');
                      }}
                      rejectHandler={() => {
                        updateOfferStatus(elem._id, 'canceled');
                      }}
                      blockHandler={() => {
                        updateOfferStatus(elem._id, 'blocked');
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </HStack>
      <Pagination
        dataLength={totalOffers}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClick}
        offset={offset}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
      />
    </section>
  );
};

export default ManagingOffers;
