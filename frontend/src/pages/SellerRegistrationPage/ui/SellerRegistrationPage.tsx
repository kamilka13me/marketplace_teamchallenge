import { FC } from 'react';

import { Container } from '@/shared/layouts/Container';
import { HStack } from '@/shared/ui/Stack';

const SellerRegistrationPage: FC = () => {
  return (
    <Container className="h-full">
      <HStack align="center" justify="center" className="h-full py-[60px] md:py-[140px]">
        <div>Seller Registration Page</div>
      </HStack>
    </Container>
  );
};

export default SellerRegistrationPage;
