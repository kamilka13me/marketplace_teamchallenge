import { FC, useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import SellerDashboard from '@/pages/SellerPage/ui/Tabs/SellerDashboard/SellerDashboard';
import dashboard from '@/shared/assets/icons/dashboard.svg?react';
import manageProducts from '@/shared/assets/icons/manage-products.svg?react';
import reviews from '@/shared/assets/icons/reviews.svg?react';
import settings from '@/shared/assets/icons/settings.svg?react';
import subscribe from '@/shared/assets/icons/subscribe.svg?react';
import support from '@/shared/assets/icons/support.svg?react';
import { getSellerProfile } from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { VStack } from '@/shared/ui/Stack';
import { ProfileSidebar } from '@/widgets/ProfileSidebar';
import { ITab } from '@/widgets/ProfileSidebar/ui/ProfileSidebar';

const tabs: ITab[] = [
  {
    id: 0,
    title: 'Dashboard',
    urlId: getSellerProfile('dashboard'),
    icon: dashboard,
  },
  {
    id: 1,
    title: 'Управління продуктами',
    urlId: getSellerProfile('manage-products'),
    icon: manageProducts,
  },
  {
    id: 2,
    title: 'Підписка на продукти',
    urlId: getSellerProfile('product-subscribes'),
    icon: subscribe,
  },
  {
    id: 3,
    title: 'Відгуки та рейтинги',
    urlId: getSellerProfile('ratings'),
    icon: reviews,
  },
  {
    id: 4,
    title: 'Центр підтримки',
    urlId: getSellerProfile('support'),
    icon: support,
  },
  {
    id: 5,
    title: 'Персональні дані',
    urlId: getSellerProfile('info'),
    icon: settings,
  },
];

const SellerPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currentTab, setCurrentTab] = useState(0);

  useLayoutEffect(() => {
    if (id === 'dashboard') {
      setCurrentTab(0);
    } else if (id === 'manage-products') {
      setCurrentTab(1);
    } else if (id === 'product-subscribes') {
      setCurrentTab(2);
    } else if (id === 'ratings') {
      setCurrentTab(3);
    } else if (id === 'support') {
      setCurrentTab(4);
    } else if (id === 'info') {
      setCurrentTab(5);
    } else {
      setCurrentTab(0);
    }
  }, [id]);

  const setCurrentTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div
      data-testid="ProfilePage"
      className="bg-main-dark min-h-[100vh_-_20%] pt-[44px] pb-[72px]"
    >
      <Container className="">
        <VStack className={`${currentTab === 0 ? 'gap-[64px]' : 'gap-5'}`}>
          <ProfileSidebar tabs={tabs} tab={currentTab} setTab={setCurrentTabHandler} />

          {currentTab === 0 && <SellerDashboard />}
        </VStack>
      </Container>
    </div>
  );
};

export default SellerPage;
