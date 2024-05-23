import { FC } from 'react';

import { AdminManagingBanners } from '@/features/AdminManagingBanners';
import { AdminManagingCategory } from '@/features/AdminManagingCategory';

const ManagingContent: FC = () => {
  return (
    <div className="SupportCenter flex flex-col gap-4 w-full text-white">
      <AdminManagingCategory />
      <AdminManagingBanners />
    </div>
  );
};

export default ManagingContent;
