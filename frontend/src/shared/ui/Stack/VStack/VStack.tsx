import { forwardRef } from 'react';

import Flex, { FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>;

const VStack = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children } = props;

  return (
    <Flex ref={ref} direction="row" {...props}>
      {children}
    </Flex>
  );
});

export default VStack;
