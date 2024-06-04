import { FC, useEffect, useState } from 'react';

import { RangeKeyDict } from 'react-date-range';

import { adminOffersActions } from '@/features/managingOffers';
import { fetchAdminOffersList } from '@/features/managingOffers/model/services';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import CustomCalendar from '@/shared/ui/CustomCalendar/ui/CustomCalendar';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import DateSortWidget, { buttonData } from '@/widgets/DateSortWidget/ui/DateSortWidget';

export type RangeSortType = 'day' | 'week' | 'month' | 'year' | 'range';

export interface IRangeDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface Props {
  dateRange?: IRangeDate;
  setDateRange?: (range: IRangeDate) => void;
}

const adjustDate = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);

  return date;
};

const ListingSearchCalendar: FC<Props> = (props) => {
  const { dateRange, setDateRange } = props;

  const [state, setState] = useState<IRangeDate[]>([
    dateRange || {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [calendarIsOpened, setCalendarIsOpened] = useState(false);

  const dispatch = useAppDispatch();

  const startDate = state[0]?.startDate.toLocaleDateString('uk-UA');
  const endDate = state[0]?.endDate.toLocaleDateString('uk-UA');

  useEffect(() => {
    const endDate = adjustDate(new Date(state[0]?.endDate as unknown as Date), 2);

    dispatch(
      adminOffersActions.setEndDate(
        endDate.toISOString()?.slice(0, 10) as unknown as Date,
      ),
    );
  }, [dispatch, state]);

  useEffect(() => {
    const startDate = adjustDate(new Date(state[0]?.startDate as unknown as Date), 1);

    dispatch(
      adminOffersActions.setStartDate(
        startDate.toISOString()?.slice(0, 10) as unknown as Date,
      ),
    );
  }, [dispatch, state]);

  useEffect(() => {
    dispatch(fetchAdminOffersList({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state]);

  useEffect(() => {
    if (state[0] && setDateRange) {
      setDateRange(state[0]);
    }
  }, [state, setDateRange]);

  const handleOnChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    setState([selection as IRangeDate]);
  };

  return (
    <div className="flex items-center justify-center gap-[8px]">
      <div className="hidden xl:block">
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
              adminOffersActions.setStartDate(
                buttonData.find((btn) => btn.type === type)?.clb() || new Date(),
              ),
            );
            dispatch(adminOffersActions.setEndDate(endDate));
          }}
        />
      </div>
      <div className="flex items-center justify-center w-[22vw] xl:w-full">
        <div className="h-[24px] hidden md:block text-nowrap">
          <Text Tag="span" text={startDate} size="sm" font-normal color="white" />
          <Text Tag="span" text="-" size="sm" font-normal color="white" />
          <Text Tag="span" text={endDate} size="sm" font-normal color="white" />
        </div>
        <Button
          variant="clear"
          onClick={() => setCalendarIsOpened((prev) => !prev)}
          className="hover:cursor-pointer absolute left-14 md:static"
        >
          <Icon Svg={calendar} fill="white" className="w-[24px] h-[24px] ml-5 xl:ml-1" />
        </Button>
        <div className="relative top-0 right-[-1vw] hover:drop-shadow-custom-primary">
          <CustomCalendar
            calendarIsOpened={calendarIsOpened}
            dates={state}
            setDates={setState}
            handleOnChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingSearchCalendar;
