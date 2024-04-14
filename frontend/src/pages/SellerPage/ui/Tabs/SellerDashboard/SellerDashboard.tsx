import { FC } from 'react';

import CallsClickChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/CallsClickChart';
import ContactOpeningChart from '@/pages/SellerPage/ui/Tabs/SellerDashboard/ContactOpeningChart';
import { QuantityStats } from '@/widgets/QuantityStats';

const SellerDashboard: FC = () => {
  return (
    <section className="w-full grid gap-4 [grid-template-areas:'views_clicks_calls''contact_contact_calls']">
      <div className="[grid-area:views]">
        <QuantityStats stats="views" />
      </div>
      <div className="[grid-area:clicks]">
        <QuantityStats stats="clicks" />
      </div>
      <div className="[grid-area:contact]">
        <ContactOpeningChart />
      </div>
      <div className="[grid-area:calls]">
        <CallsClickChart />
      </div>
    </section>
  );
};

// <CallsClickChart />
export default SellerDashboard;
