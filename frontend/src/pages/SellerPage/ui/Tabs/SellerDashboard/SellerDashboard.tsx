import { FC } from 'react';

import { getUserAuthData } from '@/enteties/User';
import CallsClickChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/CallsClickChart';
import ContactOpeningChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/ContactOpeningChart';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { HStack } from '@/shared/ui/Stack';
import { EmailConfirmation } from '@/widgets/EmailConfirmation';
import { QuantityStats } from '@/widgets/QuantityStats';

const SellerDashboard: FC = () => {
  const user = useAppSelector(getUserAuthData);

  const isAccountConfirmed = user && user.isAccountConfirm;

  return (
    <HStack>
      {!isAccountConfirmed && <EmailConfirmation />}
      <section className="w-full grid gap-12 lg:gap-5 mb-12 lg:mb-0 [grid-template-areas:'calls''contact''quantity'] lg:[grid-template-areas:'quantity_quantity_calls''contact_contact_calls']">
        <div className="[grid-area:quantity] flex w-full justify-between gap-5">
          <QuantityStats stats="views" />
          <QuantityStats stats="clicks" />
        </div>
        <div className="[grid-area:contact]">
          <ContactOpeningChart />
        </div>
        <div className="[grid-area:calls]">
          <CallsClickChart />
        </div>
      </section>
    </HStack>
  );
};

// <CallsClickChart />
export default SellerDashboard;
