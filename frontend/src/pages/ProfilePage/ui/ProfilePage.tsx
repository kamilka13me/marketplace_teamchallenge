import { FC, useLayoutEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Container } from '@/shared/layouts/Container';
import { VStack } from '@/shared/ui/Stack';
import ProfileSidebar from '@/widgets/ProfileSidebar/ui/ProfileSidebar';

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
      className="bg-gray-900 min-h-[100vh_-_20%] pt-[44px] pb-[72px]"
    >
      <Container>
        <VStack gap="5">
          <ProfileSidebar tab={currentTab} setTab={setCurrentTabHandler} />

          {/* JUST EXAMPLE */}
          <div className="flex-1 bg-gray-400 h-[600px] rounded-2xl p-5">
            {currentTab === 0 ? <div>{currentTab}</div> : <div>{currentTab}</div>}
          </div>
        </VStack>
      </Container>
    </div>
  );
};

export default ProfilePage;
