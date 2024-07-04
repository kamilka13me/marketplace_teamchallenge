import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Calendar } from 'react-date-range';

import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';

interface Props {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const SelectDateCalendar: FC<Props> = (props) => {
  const { date, setDate } = props;

  const [isOpen, setIsOpen] = useState(false);

  const dateString = formatDate(String(date));

  const handleClick = (date: Date) => {
    date.setHours(3, 0, 0, 0);
    setDate(date);
    setIsOpen(false);
  };

  return (
    <div className="sm:relative">
      <button
        type="button"
        className="min-h-[48px] w-full mt-1 pl-4 bg-selected-dark rounded-lg text-white flex items-center justify-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {dateString}
      </button>
      {isOpen && (
        <div className="absolute top-[80px] sm:top-[60px] left-[50%] sm:left-0 translate-x-[-50%] sm:translate-x-0 w-[319px] lg:w-[382px] z-20 hover:drop-shadow-custom-primary">
          <div>
            <VStack className="p-6 bg-selected-dark border-b-[1px] border-disabled rounded-t-2xl">
              <Text Tag="span" text={dateString} size="md" color="gray" />
            </VStack>

            <Calendar
              date={date}
              editableDateInputs={false}
              showMonthArrow={false}
              showPreview={false}
              showDateDisplay={false}
              onChange={handleClick}
              rangeColors={['#D9C01B']}
            />

            <VStack className="p-6 bg-selected-dark border-t-[1px] border-disabled rounded-b-2xl">
              <Button
                variant="grey-outlined"
                className="text-main-white py-1 px-3 !rounded-full !border-light-grey"
                onClick={() => {
                  setDate(new Date());
                  setIsOpen(false);
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

export default SelectDateCalendar;
