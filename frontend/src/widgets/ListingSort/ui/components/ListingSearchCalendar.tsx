import { FC, useEffect, useState } from 'react';

import { RangeKeyDict } from 'react-date-range';

import calendar from '@/shared/assets/icons/calendar.svg?react';
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
  dateRange: IRangeDate;
  setDateRange: (range: IRangeDate) => void;
}

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

  const startDate = state[0]?.startDate.toLocaleDateString('uk-UA');
  const endDate = state[0]?.endDate.toLocaleDateString('uk-UA');

  useEffect(() => {
    if (state[0] && setDateRange) {
      const startDayDate = new Date(state[0]?.startDate);

      startDayDate.setHours(0, 0, 0, 0);

      const endDayDate = new Date(state[0]?.endDate);

      endDayDate.setHours(23, 59, 59, 999);

      setDateRange({
        startDate: startDayDate,
        endDate: endDayDate,
        key: 'selection',
      });
    }
  }, [state, setDateRange]);

  const handleOnChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    setState([selection as IRangeDate]);
  };

  return (
    <div className="order-first lg:order-last flex items-center justify-center gap-[8px]">
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
          }}
        />
      </div>
      <div className="flex items-center justify-center w-full lg:w-[22vw] xl:w-full">
        <div className="h-[24px] hidden md:block text-nowrap">
          <Text Tag="span" text={startDate} size="sm" font-normal color="white" />
          <Text Tag="span" text="-" size="sm" font-normal color="white" />
          <Text Tag="span" text={endDate} size="sm" font-normal color="white" />
        </div>
        <Button
          variant="clear"
          onClick={() => setCalendarIsOpened((prev) => !prev)}
          className="hover:cursor-pointer"
        >
          <Icon
            Svg={calendar}
            fill="white"
            className="w-[24px] h-[24px] ml-2 lg:ml-5 xl:ml-1"
          />
        </Button>
        <div className="relative top-0 right-[32px] lg:right-[-1vw]">
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
