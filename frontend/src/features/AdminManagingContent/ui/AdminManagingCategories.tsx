import { FC } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const AdminManagingCategories: FC = () => {
  return (
    <section className="p-4 rounded-lg bg-dark-grey w-full">
      <HStack className="gap-3">
        <Text
          Tag="h3"
          text="Додавання категорій, підкатегорій та розділів"
          size="xl"
          color="white"
        />
        <Text
          Tag="h4"
          text="Для створення нового розділу або категорію, зробіть вибір."
          size="lg"
          color="gray-light"
        />
      </HStack>
    </section>
  );
};

export default AdminManagingCategories;
