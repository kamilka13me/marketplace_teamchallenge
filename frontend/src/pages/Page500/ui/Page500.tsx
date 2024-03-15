import { FC } from 'react';

import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const Page500: FC = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = '/';
  };

  return (
    <HStack justify="center" gap="4" align="center" className="h-screen">
      <Text Tag="h1" text="Server Error" size="4xl" />
      <Button onClick={reloadPage} variant="fill">
        Home
      </Button>
    </HStack>
  );
};

export default Page500;
