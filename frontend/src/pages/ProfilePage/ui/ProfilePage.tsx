import { FC, useState } from 'react';

import { Container } from '@/shared/layouts/Container';
import { VStack } from '@/shared/ui/Stack';
import ProfileSidebar from '@/widgets/ProfileSidebar/ui/ProfileSidebar';

const ProfilePage: FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

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
