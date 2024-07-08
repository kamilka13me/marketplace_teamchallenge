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
} from '@/features/managingOffers/model/selectors';
import {
  fetchAdminOffersList,
  fetchNextAdminOffers,
  fetchPrevAdminOffers,
  initAdminOffersTab,
} from '@/features/managingOffers/model/services';
import {
  adminOffersActions,
  getAdminOffers,
} from '@/features/managingOffers/model/slice';
import EditProductContainer from '@/features/managingProducts/ui/EditProductContainer';
import OfferController from '@/pages/AdminPage/ui/Tabs/ManagingOffers/OfferController';
import { $api } from '@/shared/api/api';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import user from '@/shared/assets/icons/person.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import { IRangeDate } from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

const ManagingOffersMobile: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [inputData, setInputData] = useState('');
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

  useEffect(() => {
    dispatch(adminOffersActions.setOffset(0));
    setCurrentPage(1);
  }, [dispatch, selectedFilter, inputData, dateRange]);

  const onSearchInput = (id: string) => {
    setInputData(id);
    dispatch(adminOffersActions.setSellerId(id));
  };

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

  return isListOpen ? (
    <EditProductContainer
      productId={currentOfferIdForEditing || ''}
      closeForm={() => setIsListOpen(false)}
    />
  ) : (
    <section className="flex flex-col w-full mt-[18px] gap-4 bg-dark-grey rounded-2xl lg:hidden">
      <ListingSort
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <HStack className="bg-dark-grey rounded-2xl gap-2">
        <ListingByDate
          setInputData={onSearchInput}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        {isLoading ? (
          <div>
            <Text Tag="p" text="Loading..." size="md" color="white" />
          </div>
        ) : (
          offers.map((elem) => (
            <HStack
              key={elem?._id}
              className="bg-selected-dark w-full rounded-2xl px-4 py-5 gap-5"
            >
              <VStack className="items-center gap-[6px]">
                <Icon Svg={calendar} width={16} height={16} className="fill-disabled" />
                <Text
                  Tag="p"
                  text={elem?.created_at.slice(0, 10).split('-').reverse().join('.')}
                  size="md"
                  className="!text-disabled"
                />
              </VStack>
              <VStack className="bg-disabled px-2 py-[3px] rounded-lg items-center gap-[6px] overflow-hidden">
                <Icon Svg={user} width={16} height={16} className="stroke-main-dark" />
                <Text
                  Tag="p"
                  text={elem?.sellerId}
                  size="md"
                  className="!text-main-dark"
                />
              </VStack>
              <VStack className="w-full items-center justify-between">
                <Text Tag="p" text={elem?.name} size="md" color="white" />
                <OfferController
                  editHandler={() => {
                    setIsListOpen(true);
                    setCurrentOfferIdForEditing(elem._id);
                  }}
                  publishHandler={() => {
                    updateOfferStatus(elem._id, 'published');
                  }}
                  rejectHandler={
                    elem.status === 'under-consideration'
                      ? () => {
                          updateOfferStatus(elem._id, 'canceled');
                        }
                      : undefined
                  }
                  blockHandler={() => {
                    updateOfferStatus(elem._id, 'blocked');
                  }}
                />
              </VStack>
            </HStack>
          ))
        )}
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

export default ManagingOffersMobile;
