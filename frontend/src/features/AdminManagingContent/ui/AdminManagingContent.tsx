import { FC } from 'react';

import AdminManagingBanners from './AdminManagingBanners';

import { HStack } from '@/shared/ui/Stack';

const AdminManagingContent: FC = () => {
  return (
    <HStack gap="5" className="w-full">
      <AdminManagingBanners />
    </HStack>
  );
};

export default AdminManagingContent;
