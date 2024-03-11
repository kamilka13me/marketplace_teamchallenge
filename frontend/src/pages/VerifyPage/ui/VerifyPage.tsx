import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { HStack } from '@/shared/ui/Stack';

const VerifyPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <HStack align="center" justify="center">
      VerifyPage {id}
    </HStack>
  );
};

export default VerifyPage;
