import { FC, useEffect, useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Analytics from './Tabs/Analytics/Analytics';
import Finances from './Tabs/Finances/Finances';
import ManagingContent from './Tabs/ManagingContent/ManagingContent';
import ManagingFeedback from './Tabs/ManagingFeedback/ManagingFeedback';
import SupportCenter from './Tabs/SupportCenter/SupportCenter';

import { AdminManagingSellers } from '@/features/AdminManagingSellers';
import { AdminManagingUsers } from '@/features/adminManagingUsers';
import { ManagingOffers } from '@/features/managingOffers';
import ManagingOffersMobile from '@/pages/AdminPage/ui/Tabs/ManagingOffers/ManagingOffersMobile';
import analytics from '@/shared/assets/icons/analytics.svg?react';
import content from '@/shared/assets/icons/content.svg?react';
import finances from '@/shared/assets/icons/finances.svg?react';
import support from '@/shared/assets/icons/message.svg?react';
import offers from '@/shared/assets/icons/offers.svg?react';
import sellers from '@/shared/assets/icons/people.svg?react';
import reviews from '@/shared/assets/icons/reviews.svg?react';
import users from '@/shared/assets/icons/users.svg?react';
import { getAdminProfile } from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { VStack } from '@/shared/ui/Stack';
import { ProfileSidebar } from '@/widgets/ProfileSidebar';
import { ITab } from '@/widgets/ProfileSidebar/ui/ProfileSidebar';
import ProfileSidebarMobile from '@/widgets/ProfileSidebar/ui/ProfileSidebarMobile';
import { WishlistProfileTab } from '@/widgets/WishlistProfileTab';

const tabs: ITab[] = [
  {
    id: 0,
    title: 'Користувачі',
    urlId: getAdminProfile('users'),
    icon: users,
  },
  {
    id: 1,
    title: 'Продавці',
    urlId: getAdminProfile('sellers'),
    icon: sellers,
  },
  {
    id: 2,
    title: 'Оголошення',
    urlId: getAdminProfile('offers'),
    icon: offers,
  },
  {
    id: 3,
    title: 'Відгуки та рейтинги',
    urlId: getAdminProfile('ratings'),
    icon: reviews,
  },
  {
    id: 4,
    title: 'Контент',
    urlId: getAdminProfile('content'),
    icon: content,
  },
  {
    id: 5,
    title: 'Аналітика',
    urlId: getAdminProfile('analytics'),
    icon: analytics,
  },
  {
    id: 6,
    title: 'Фінанси',
    urlId: getAdminProfile('finances'),
    icon: finances,
  },
  {
    id: 7,
    title: 'Центр підтримки',
    urlId: getAdminProfile('support'),
    icon: support,
  },
];

const components: FC[] = [
  AdminManagingUsers,
  WishlistProfileTab,
  ManagingOffersMobile,
  ManagingFeedback,
  ManagingContent,
  Analytics,
  Finances,
  SupportCenter,
];

const AdminPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (id === 'users') {
      setCurrentTab(0);
    } else if (id === 'sellers') {
      setCurrentTab(1);
    } else if (id === 'offers') {
      setCurrentTab(2);
    } else if (id === 'ratings') {
      setCurrentTab(3);
    } else if (id === 'content') {
      setCurrentTab(4);
    } else if (id === 'analytics') {
      setCurrentTab(5);
    } else if (id === 'finances') {
      setCurrentTab(6);
    } else if (id === 'support') {
      setCurrentTab(7);
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
      className="bg-main-dark min-h-[100vh_-_20%] py-[10px] lg:pt-[44px] lg:pb-[72px]"
    >
      <Container>
        {windowWidth >= 1024 ? (
          <VStack className="gap-12">
            <VStack
              className={`hidden lg:flex ${currentTab === 0 ? 'gap-12' : 'gap-5'} w-full`}
            >
              <ProfileSidebar
                tabs={tabs}
                tab={currentTab}
                setTab={setCurrentTabHandler}
              />
              {currentTab === 0 && <AdminManagingUsers />}
              {currentTab === 1 && <AdminManagingSellers />}
              {currentTab === 2 && <ManagingOffers />}
              {currentTab === 3 && <ManagingFeedback />}
              {currentTab === 4 && <ManagingContent />}
              {currentTab === 5 && <Analytics />}
              {currentTab === 6 && <Finances />}
              {currentTab === 7 && <SupportCenter />}
            </VStack>
          </VStack>
        ) : (
          <ProfileSidebarMobile
            tabs={tabs}
            tab={currentTab}
            setTab={setCurrentTabHandler}
            renderContent={components}
          />
        )}
      </Container>
    </div>
  );
};

export default AdminPage;
