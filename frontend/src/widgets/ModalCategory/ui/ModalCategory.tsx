import { FC } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { CategorySection } from '@/widgets/ModalCategory';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  activeModal: boolean;
}

const ModalCategory: FC<Props> = (props: Props) => {
  const { activeModal } = props;

  return (
    <div
      className={
        activeModal
          ? 'absolute top-[100px] z-[100] left-0 right-0 h-screen bg-black-transparent-50'
          : 'hidden'
      }
    >
      <div
        className={
          activeModal
            ? 'absolute z-[900] left-0 right-0 max-w-[1328px] pl-2 pt-9 pb-6 mx-auto rounded-b-2xl bg-white-200'
            : 'hidden'
        }
      >
        <VStack>
          <Sidebar />

          <CategorySection title="Популярні товари" className="ml-5 mr-[73px]" />
          <CategorySection title="Ноутбуки" className="mr-[73px]" />
          <CategorySection title="Телефони" className="mr-[73px]" />
          <CategorySection title="Аксесуари" />
        </VStack>
      </div>
    </div>
  );
};

export default ModalCategory;
