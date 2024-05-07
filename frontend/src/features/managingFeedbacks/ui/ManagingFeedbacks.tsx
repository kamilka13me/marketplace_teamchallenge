import React, { FC, useEffect, useState } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';

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
import DisputeFeedbackModal from '@/features/managingFeedbacks/ui/DisputeFeedbackModal';
import SellerRatings from '@/features/managingFeedbacks/ui/SellerRatings';
import { $api } from '@/shared/api/api';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import plane from '@/shared/assets/icons/plane.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type RangeSortType = 'day' | 'week' | 'month' | 'year' | 'range';

export interface SellerRatingResponse {
  current: NumbersMap;
  previous: NumbersMap;
}

interface NumbersMap {
  [key: string]: number;
}

const buttonData: { type: RangeSortType; label: string; clb: () => Date }[] = [
  {
    type: 'day',
    label: 'день',
    clb: () => {
      return new Date();
    },
  },
  {
    type: 'week',
    label: 'тиждень',
    clb: () => {
      const date = new Date();

      return new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    },
  },
  {
    type: 'month',
    label: 'місяць',
    clb: () => {
      const date = new Date();

      return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    },
  },
  {
    type: 'year',
    label: 'рік',
    clb: () => {
      const date = new Date();

      return new Date(date.getFullYear() - 1, 0, 1);
    },
  },
];

interface IRangeDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

const ManagingFeedbacks: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRange, setCurrentRange] = useState<RangeSortType | null>(null);
  const [ratingsData, setRatingsData] = useState<SellerRatingResponse | null>(null);
  const [ratingDataIsLoading, setRatingDataIsLoading] = useState(true);
  const [calendarIsOpened, setCalendarIsOpened] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [state, setState] = useState<IRangeDate[]>([
    {
      startDate: new Date(2024, 0, 1),
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

  const adjustDate = (date: Date, days: number) => {
    date.setDate(date.getDate() + days);

    return date;
  };

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
        const startDate = adjustDate(new Date(state[0]?.startDate as unknown as Date), 1); // Adjust start date

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

  const handleCurrentRange = (type: RangeSortType) => {
    setCurrentRange(type);
  };

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

  const setDisputeModalOpenHandler = () => {
    setIsDisputeModalOpen((prev) => !prev);
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
          {buttonData.map((button) => (
            <Button
              key={button.type}
              variant="clear"
              className={`px-3 py-[7px] rounded-lg md:px-2 ${currentRange === button.type ? 'bg-selected-dark' : ''}`}
              onClick={() => {
                const endDate = new Date();

                endDate.setDate(endDate.getDate() + 1);

                handleCurrentRange(button.type);

                setState((prevState) => {
                  const updatedState = prevState.map((rangeDate, index) => {
                    if (index === 0) {
                      return {
                        ...rangeDate,
                        startDate: button.clb(),
                        endDate: new Date(),
                      };
                    }

                    return rangeDate;
                  });

                  return updatedState;
                });
                dispatch(sellerFeedbackPageActions.setStartDate(button.clb()));
                dispatch(sellerFeedbackPageActions.setEndDate(endDate));
              }}
            >
              <Text Tag="span" text={button.label} size="sm" color="white" />
            </Button>
          ))}
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

            {calendarIsOpened && (
              <div className="absolute top-10 right-0 z-20">
                <div>
                  <VStack className="p-6 bg-selected-dark border-b-[1px] border-disabled rounded-t-2xl">
                    <Text
                      Tag="span"
                      text={`${state[0]?.startDate.toString()?.slice(0, 10) || ''} - ${state[0]?.endDate.toString().slice(0, 10) || ''}`}
                      size="md"
                      color="gray"
                    />
                  </VStack>
                  <DateRange
                    date={new Date()}
                    editableDateInputs={false}
                    showMonthArrow={false}
                    showPreview={false}
                    showDateDisplay={false}
                    ranges={state}
                    onChange={handleOnChange}
                    rangeColors={['#D9C01B']}
                  />
                  <VStack className="p-6 bg-selected-dark border-t-[1px] border-disabled rounded-b-2xl">
                    <Button
                      variant="grey-outlined"
                      className="text-main-white py-1 px-3 !rounded-full !border-light-grey"
                      onClick={() => {
                        setState([
                          {
                            startDate: new Date(2024, 0, 1),
                            endDate: new Date(),
                            key: 'selection',
                          },
                        ]);
                        setCurrentRange(null);
                      }}
                    >
                      Reset
                    </Button>
                  </VStack>
                </div>
              </div>
            )}
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
          <div key={comment?._id} className="rounded-2xl bg-dark-grey md:p-4">
            <Comment comment={comment} />
            <div className="flex flex-col justify-between gap-4 w-full md:flex-row">
              <div className="w-full relative">
                <Input
                  name="comment"
                  type="text"
                  variant="clear"
                  maxLength={250}
                  placeholder="Відповісти на відгук"
                  autoComplete="off"
                  className=" bg-selected-dark rounded-lg p-4 w-full placeholder:text-disabled focus:outline-none text-white"
                />
                <HStack
                  align="center"
                  justify="center"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-lg bg-main cursor-pointer"
                >
                  <Icon width={18} height={15} Svg={plane} className="fill-main-dark" />
                </HStack>
              </div>
              <Button
                variant="primary"
                className="w-[319px] h-[52px]"
                onClick={setDisputeModalOpenHandler}
              >
                Оскаржити відгук
              </Button>
            </div>
            {isDisputeModalOpen && (
              <DisputeFeedbackModal onCloseFunc={setDisputeModalOpenHandler} />
            )}
          </div>
        ))}
      </HStack>

      {feedbacks.length > 2 && (
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
      )}
    </div>
  );
};

export default ManagingFeedbacks;
