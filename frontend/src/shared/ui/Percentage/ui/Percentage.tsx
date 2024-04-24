import React, { FC } from 'react';

import caretDown from '@/shared/assets/icons/caret-down.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  currentNum: number;
  previousNum: number;
}
const Percentage: FC<Props> = (props) => {
  const { currentNum, previousNum } = props;

  // Calculate the difference between current and previous numbers
  const difference = currentNum - previousNum;

  // Calculate the percentage difference
  let percentage;

  if (previousNum !== 0) {
    percentage = (difference / previousNum) * 100;
  } else {
    percentage = 100; // If previous number is 0, set percentage difference to 100%
  }

  if (currentNum === 0 && previousNum === 0) {
    return;
  }

  if (percentage > 0) {
    return (
      <VStack align="center" gap="1">
        <Icon Svg={caretDown} width={16} height={16} className="fill-green" />
        <Text
          Tag="span"
          size="sm"
          text={`${percentage.toFixed().toString()}%`}
          color="green"
        />
      </VStack>
    );
  }

  return (
    <VStack align="center" gap="1">
      <Icon
        Svg={caretDown}
        width={16}
        height={16}
        className="fill-error-red rotate-180"
      />
      <Text
        Tag="span"
        size="sm"
        text={`${percentage.toFixed().toString()}%`}
        color="red"
      />
    </VStack>
  );
};

export default Percentage;
