/* eslint-disable import/order */
import { FC, useEffect, useState } from 'react';

import Comment from '../../../enteties/Comment/ui/Comment';

import { getUserAuthData } from '@/enteties/User';
import {
  getSellerFeedbacksPageLimit,
  getSellerFeedbacksPageOffset,
  getTotalSellerFeedbacks,
} from '@/features/managingFeedbacks/model/selectors/feedbacksSelectors';
import { fetchNextSellerFeedbacksPage } from '@/features/managingFeedbacks/model/services/fetchNextSellerFeedbacksPage';
import { fetchPrevSellerFeedbacksPage } from '@/features/managingFeedbacks/model/services/fetchPrevSellerFeedbacksPage';
import { fetchSellerFeedbacksList } from '@/features/managingFeedbacks/model/services/getFeedbacks';
import {
  getSellerFeedbacks,
  sellerFeedbackPageActions,
} from '@/features/managingFeedbacks/model/slice/commentsSlice';
import SellerRatings from '@/features/managingFeedbacks/ui/SellerRatings';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import ListingSearchCalendar from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export type RangeSortType = 'day' | 'week' | 'month' | 'year' | 'range';

export interface SellerRatingResponse {
  current: NumbersMap;
  previous: NumbersMap;
}

interface NumbersMap {
  [key: string]: number;
}

interface IRangeDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

const ManagingFeedbacks: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsData, setRatingsData] = useState<SellerRatingResponse | null>(null);
  const [ratingDataIsLoading, setRatingDataIsLoading] = useState(true);

  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });

  const feedbacks = useAppSelector(getSellerFeedbacks.selectAll);
  const totalFeedbacks = useAppSelector(getTotalSellerFeedbacks);
  const user = useAppSelector(getUserAuthData);
  const offset = useAppSelector(getSellerFeedbacksPageOffset);
  const limit = useAppSelector(getSellerFeedbacksPageLimit);
  const dispatch = useAppDispatch();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    dispatch(sellerFeedbackPageActions.setEndDate(dateRange.endDate.toISOString()));
    dispatch(sellerFeedbackPageActions.setStartDate(dateRange.startDate.toISOString()));
  }, [dispatch, dateRange]);

  useEffect(() => {
    const fetchRatings = async () => {
      setRatingDataIsLoading(true);
      try {
        const response = await $api.get<SellerRatingResponse>(
          `${ApiRoutes.RATINGS}?sellerId=${user?._id}&startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}`,
        );

        setRatingsData(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching ratings:', error);
      } finally {
        setRatingDataIsLoading(false);
      }
    };

    fetchRatings();
  }, [user, dateRange, dispatch]);

  const refetchSellerFeedbacksHandler = () => {
    dispatch(fetchSellerFeedbacksList({}));
  };

  useEffect(() => {
    refetchSellerFeedbacksHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset, dateRange]);

  const fetchNext = () => {
    setCurrentPage((prev) => prev + 1);

    dispatch(fetchNextSellerFeedbacksPage());
  };

  const fetchPrev = () => {
    setCurrentPage((prev) => prev - 1);

    dispatch(fetchPrevSellerFeedbacksPage());
  };

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(sellerFeedbackPageActions.setOffset((pageNumber - 1) * limit));
  };

  return (
    <div className="w-full mt-9 ">
      <VStack
        justify="between"
        align="center"
        className="mb-5 pt-2 bg-dark-grey rounded-2xl md:px-4 md:py-2 "
      >
        {!isMobile && (
          <VStack align="center" gap="1">
            <Text Tag="p" text="Всі відгуки" size="md" color="white" />

            <HStack
              align="center"
              justify="center"
              className="w-8 h-8 bg-selected-dark rounded-lg"
            >
              <Text Tag="span" text={totalFeedbacks.toString()} size="sm" color="white" />
            </HStack>
          </VStack>
        )}

        <VStack gap="2" className="items-center md:items-start">
          <ListingSearchCalendar
            dateRange={dateRange}
            setDateRange={setDateRange}
            classNameCalendar="right-[305px]"
          />
        </VStack>
      </VStack>
      {isMobile && (
        <VStack align="center" gap="1" className="mb-12">
          <Text Tag="p" text="Всі відгуки" size="md" color="white" />

          <HStack
            align="center"
            justify="center"
            className="w-[22px] h-[22px] bg-selected-dark rounded-[4px] md:w-8 md:h-8 md:rounded-lg"
          >
            <Text Tag="span" text={totalFeedbacks.toString()} size="sm" color="white" />
          </HStack>
        </VStack>
      )}

      <SellerRatings
        isLoading={ratingDataIsLoading}
        data={ratingsData as SellerRatingResponse}
      />

      {/* COMMENTS */}
      <HStack gap="4">
        {feedbacks?.map((comment) => (
          <Comment
            refetch={refetchSellerFeedbacksHandler}
            key={comment?._id}
            sellerId={user?._id || ''}
            comment={comment}
          />
        ))}
      </HStack>

      <VStack justify="center" gap="2" className="my-6">
        <Pagination
          dataLength={totalFeedbacks}
          itemsPerPage={limit}
          currentPage={currentPage}
          setPage={handleClickPage}
          offset={offset}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
        />
      </VStack>
    </div>
  );
};

export default ManagingFeedbacks;
