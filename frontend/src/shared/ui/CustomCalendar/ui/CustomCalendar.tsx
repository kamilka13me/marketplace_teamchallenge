import React, { FC } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';

import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface IRangeDate {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface Props {
  calendarIsOpened: boolean;
  dates: IRangeDate[];
  setDates: (dates: IRangeDate[]) => void;
  handleOnChange: (ranges: RangeKeyDict) => void;
}

const CustomCalendar: FC<Props> = ({
  dates,
  calendarIsOpened,
  setDates,
  handleOnChange,
}) => {
  const startDate = dates[0]?.startDate.toString().slice(0, 10);

  const endDate = dates[0]?.endDate.toString().slice(0, 10);

  return (
    <div>
      {calendarIsOpened && (
        <div className="absolute top-10 w-[319px] lg:w-[382px] lg:right-0 z-20 hover:drop-shadow-custom-primary">
          <div>
            <VStack className="p-6 bg-selected-dark border-b-[1px] border-disabled rounded-t-2xl">
              <Text
                Tag="span"
                text={`${startDate} - ${endDate}`}
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
              ranges={dates}
              onChange={handleOnChange}
              rangeColors={['#D9C01B']}
            />
            <VStack className="p-6 bg-selected-dark border-t-[1px] border-disabled rounded-b-2xl">
              <Button
                variant="grey-outlined"
                className="text-main-white py-1 px-3 !rounded-full !border-light-grey"
                onClick={() => {
                  setDates([
                    {
                      startDate: new Date(0),
                      endDate: new Date(),
                      key: 'selection',
                    },
                  ]);
                }}
              >
                Reset
              </Button>
            </VStack>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
