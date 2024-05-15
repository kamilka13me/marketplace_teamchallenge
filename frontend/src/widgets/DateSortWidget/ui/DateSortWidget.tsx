import React, { FC, useState } from 'react';

import { RangeSortType } from '@/features/managingFeedbacks/ui/ManagingFeedbacks';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  onSelectRange: (type: RangeSortType) => void;
}

export const buttonData: { type: RangeSortType; label: string; clb: () => Date }[] = [
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

      return new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
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

const DateSortWidget: FC<Props> = (props) => {
  const { onSelectRange } = props;

  const [selectedType, setSelectedType] = useState<RangeSortType | null>(null);

  const handleRangeSelection = (type: RangeSortType) => {
    setSelectedType(type);
    onSelectRange(type);
  };

  return (
    <VStack gap="2" className="items-center md:items-start">
      {buttonData.map((button) => (
        <Button
          key={button.type}
          variant="clear"
          className={`px-3 py-[4px] rounded-lg md:px-2 ${selectedType === button.type ? 'bg-selected-dark' : ''}`}
          onClick={() => handleRangeSelection(button.type)}
        >
          <Text Tag="span" text={button.label} size="sm" color="white" />
        </Button>
      ))}
    </VStack>
  );
};

export default DateSortWidget;
