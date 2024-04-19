import { FC, useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import PersonalDataForms from '@/pages/ProfilePage/ui/Tabs/ProfileInfo/PersonalDataForms';
import like from '@/shared/assets/icons/like.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import { getRouteProfile } from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { VStack } from '@/shared/ui/Stack';
import { ProfileSidebar } from '@/widgets/ProfileSidebar';
import { ITab } from '@/widgets/ProfileSidebar/ui/ProfileSidebar';
import ProfileSidebarMobile from '@/widgets/ProfileSidebar/ui/ProfileSidebarMobile';
import { WishlistProfileTab } from '@/widgets/WishlistProfileTab';

const tabs: ITab[] = [
  {
    id: 0,
    title: 'Персональні дані',
    urlId: getRouteProfile('info'),
    icon: person,
  },
  {
    id: 1,
    title: 'Список бажань',
    urlId: getRouteProfile('wishlist'),
    icon: like,
  },
];

const components: FC[] = [PersonalDataForms, WishlistProfileTab];

const ProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currentTab, setCurrentTab] = useState(0);

  useLayoutEffect(() => {
    if (id === 'info') {
      setCurrentTab(0);
    } else if (id === 'wishlist') {
      setCurrentTab(1);
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
      className="bg-main-dark min-h-[100vh_-_20%] py-4 lg:py-10"
    >
      <Container>
        <VStack className={`hidden lg:flex ${currentTab === 0 ? 'gap-12' : 'gap-5'}`}>
          <ProfileSidebar tabs={tabs} tab={currentTab} setTab={setCurrentTabHandler} />

          {currentTab === 0 ? <PersonalDataForms /> : <WishlistProfileTab />}
        </VStack>

        <ProfileSidebarMobile
          tabs={tabs}
          tab={currentTab}
          setTab={setCurrentTabHandler}
          renderContent={components}
        />
      </Container>
    </div>
  );
};

export default ProfilePage;
