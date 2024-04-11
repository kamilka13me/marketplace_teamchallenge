import { FC } from 'react';

import CallsClickChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/CallsClickChart';
import ContactOpeningChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/ContactOpeningChart';
import { VStack } from '@/shared/ui/Stack';

const SellerDashboard: FC = () => {
  return (
    <section className="w-full">
      <VStack justify="between">
        <ContactOpeningChart />
        <CallsClickChart />
      </VStack>
    </section>
  );
};

// <CallsClickChart />
export default SellerDashboard;
