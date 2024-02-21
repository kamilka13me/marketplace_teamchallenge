import { FC } from 'react';

import Flex, { FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>;

const VStack: FC<Props> = (props) => {
  const { children } = props;

  return (
    <Flex direction="row" {...props}>
      {children}
    </Flex>
  );
};

export default VStack;
