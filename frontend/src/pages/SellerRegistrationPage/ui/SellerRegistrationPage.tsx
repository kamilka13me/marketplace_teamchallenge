import { FC } from 'react';

import { SellerRegistrationForm } from '@/features/userAuth/ui/SellerRegistrationForm';
import { Container } from '@/shared/layouts/Container';

const SellerRegistrationPage: FC = () => {
  return (
    <Container className="h-full">
      <SellerRegistrationForm />
    </Container>
  );
};

export default SellerRegistrationPage;
