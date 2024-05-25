import { useState } from 'react';

import { RangeKeyDict } from 'react-date-range';

import calendar from '@/shared/assets/icons/calendar.svg?react';
import { Button } from '@/shared/ui/Button';
import CustomCalendar from '@/shared/ui/CustomCalendar/ui/CustomCalendar';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import DateSortWidget, { buttonData } from '@/widgets/DateSortWidget/ui/DateSortWidget';

export type RangeSortType = 'day' | 'week' | 'month' | 'year' | 'range';

interface IRangeDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

const ListingSearchCalendar = () => {
  const [state, setState] = useState<IRangeDate[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [calendarIsOpened, setCalendarIsOpened] = useState(false);

  const startDate = state[0]?.startDate.toLocaleDateString('uk-UA');
  const endDate = state[0]?.endDate.toLocaleDateString('uk-UA');

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
