import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { Container } from '@/shared/layouts/Container';
import { HStack } from '@/shared/ui/Stack';
import { RecoverPasswordForm } from '@/widgets/RecoverPasswordForm';

const RecoverPasswordPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="h-full">
      <HStack align="center" justify="center" className="h-full py-[60px] md:py-[140px]">
        <RecoverPasswordForm token={id} />
      </HStack>
    </Container>
  );
};

export default RecoverPasswordPage;
