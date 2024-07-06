import { forwardRef } from 'react';

import Flex, { FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>;

const HStack = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children } = props;

  return (
    <Flex ref={ref} direction="col" {...props}>
      {children}
    </Flex>
  );
});

export default HStack;
