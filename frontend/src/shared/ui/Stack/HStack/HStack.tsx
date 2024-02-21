import { FC } from 'react';

import Flex, { FlexProps } from '../Flex/Flex';

type Props = Omit<FlexProps, 'direction'>;

const HStack: FC<Props> = (props) => {
  const { children } = props;

  return (
    <Flex direction="col" {...props}>
      {children}
    </Flex>
  );
};

export default HStack;
