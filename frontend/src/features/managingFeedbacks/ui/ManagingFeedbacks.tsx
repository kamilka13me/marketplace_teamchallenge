import React, { FC, useEffect, useState } from 'react';

import { RangeKeyDict } from 'react-date-range';

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
import calendar from '@/shared/assets/icons/calendar.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import CustomCalendar from '@/shared/ui/CustomCalendar/ui/CustomCalendar';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import DateSortWidget, { buttonData } from '@/widgets/DateSortWidget/ui/DateSortWidget';

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

const adjustDate = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);

  return date;
};

const ManagingFeedbacks: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsData, setRatingsData] = useState<SellerRatingResponse | null>(null);
  const [ratingDataIsLoading, setRatingDataIsLoading] = useState(true);
  const [calendarIsOpened, setCalendarIsOpened] = useState(false);

  const [state, setState] = useState<IRangeDate[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const feedbacks = useAppSelector(getSellerFeedbacks.selectAll);
  const totalFeedbacks = useAppSelector(getTotalSellerFeedbacks);
  const user = useAppSelector(getUserAuthData);
  const offset = useAppSelector(getSellerFeedbacksPageOffset);
  const limit = useAppSelector(getSellerFeedbacksPageLimit);
  const dispatch = useAppDispatch();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const endDate = adjustDate(new Date(state[0]?.endDate as unknown as Date), 2);

    dispatch(
      sellerFeedbackPageActions.setEndDate(
        endDate.toISOString()?.slice(0, 10) as unknown as Date,
      ),
    );
  }, [dispatch, state]);

  useEffect(() => {
    const startDate = adjustDate(new Date(state[0]?.startDate as unknown as Date), 1);

    dispatch(
      sellerFeedbackPageActions.setStartDate(
        startDate.toISOString()?.slice(0, 10) as unknown as Date,
      ),
    );
  }, [dispatch, state]);

  useEffect(() => {
    const fetchRatings = async () => {
      setRatingDataIsLoading(true);
      try {
        const startDate = adjustDate(new Date(state[0]?.startDate as unknown as Date), 1);

        const endDate = adjustDate(new Date(state[0]?.endDate as unknown as Date), 2);

        const response = await $api.get<SellerRatingResponse>(
          `${ApiRoutes.RATINGS}?sellerId=${user?._id}&startDate=${startDate.toISOString()?.slice(0, 10)}&endDate=${endDate.toISOString().slice(0, 10)}`,
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
  }, [user, state, dispatch]);

  useEffect(() => {
    dispatch(fetchSellerFeedbacksList({}));
  }, [dispatch, offset, state]);

  const handleOnChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    setState([selection as IRangeDate]);
  };

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
          <DateSortWidget
            onSelectRange={(type: RangeSortType) => {
              const endDate = new Date();

              endDate.setDate(endDate.getDate() + 1);
              setState((prevState) => {
                const updatedState = prevState.map((rangeDate, index) => {
                  if (index === 0) {
                    return {
                      ...rangeDate,
                      startDate:
                        buttonData.find((btn) => btn.type === type)?.clb() || new Date(),
                      endDate: new Date(),
                    };
                  }

                  return rangeDate;
                });

                return updatedState;
              });
              dispatch(
                sellerFeedbackPageActions.setStartDate(
                  buttonData.find((btn) => btn.type === type)?.clb() || new Date(),
                ),
              );
              dispatch(sellerFeedbackPageActions.setEndDate(endDate));
            }}
          />
          <div className="relative h-full">
            <VStack align="center" gap="4" className="h-full">
              {!isMobile && (
                <div className="py-[7px]">
                  <Text
                    Tag="span"
                    text={`${state[0]?.startDate.toISOString()?.slice(0, 10) || ''} - ${state[0]?.endDate.toISOString().slice(0, 10) || ''}`}
                    size="sm"
                    color="white"
                  />
                </div>
              )}
              <Button
                variant="clear"
                className=" py-1 px-2 md:p-0"
                onClick={() => setCalendarIsOpened((prev) => !prev)}
              >
                <Icon width={24} height={24} Svg={calendar} className="fill-main-white" />
              </Button>
            </VStack>

            <CustomCalendar
              calendarIsOpened={calendarIsOpened}
              dates={state}
              setDates={setState}
              handleOnChange={handleOnChange}
            />
          </div>
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
          <Comment key={comment?._id} sellerId={user?._id || ''} comment={comment} />
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
