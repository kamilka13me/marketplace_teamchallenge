import { FC } from 'react';

import AdminManagingBanners from './AdminManagingBanners';
import AdminManagingCategories from './AdminManagingCategories';

import { HStack } from '@/shared/ui/Stack';

const AdminManagingContent: FC = () => {
  return (
    <HStack gap="5" className="w-full">
      <AdminManagingCategories />
      <AdminManagingBanners />
    </HStack>
  );
};

export default AdminManagingContent;
