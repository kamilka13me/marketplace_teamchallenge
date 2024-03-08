import { FC } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const Page500: FC = () => {
  return (
    <HStack justify="center" align="center" className="h-screen">
      <Text Tag="h1" text="Server Error" size="4xl" />
    </HStack>
  );
};

export default Page500;
