import { FC } from 'react';

import { User } from '@/enteties/User';
import AdminManagingUsersController from '@/features/adminManagingUsers/ui/AdminManagingUsersController';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  user: User;
  showBanModal: () => void;
  showRecoveryPasswordModal: () => void;
}

const MobileAdminManagingUsers: FC<Props> = (props) => {
  const { showRecoveryPasswordModal, showBanModal, user } = props;

  return (
    <HStack className="bg-selected-dark w-full px-4 py-3 rounded-2xl">
      <VStack justify="between" className="w-full">
        <Text Tag="h5" text="Дата взаємодії" size="md" color="white" />
        <Text Tag="h5" text="25.04.2024" size="md" color="gray-light" />
      </VStack>
      <VStack justify="between" align="center" className="mt-2 w-full">
        <HStack gap="1" className="max-w-[217px] overflow-hidden">
          <Text Tag="h5" text={user?._id || ''} size="md" color="white" />
          <Text Tag="h5" text={user?.phoneNumber || ''} size="md" color="white" />
          <Text Tag="h5" text={user?.email || ''} size="md" color="white" />
        </HStack>
        <div>
          <AdminManagingUsersController
            currentUser={user}
            showBanModal={showBanModal}
            showRecoveryPasswordModal={showRecoveryPasswordModal}
          />
        </div>
      </VStack>
    </HStack>
  );
};

export default MobileAdminManagingUsers;
