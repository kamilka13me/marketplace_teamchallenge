import { FC, useState } from 'react';

import block from '@/shared/assets/icons/block.svg?react';
import action from '@/shared/assets/icons/edit.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {}

const AdminManagingSellersController: FC<Props> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <VStack gap="2" className="relative w-full">
      <Icon
        Svg={action}
        width={40}
        height={59}
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
        className="rotate-90 cursor-pointer"
      />
      <HStack
        justify="center"
        className={`${showModal ? '' : 'hidden'} py-3 px-2 bg-shadow-footer absolute top-[42px] right-0 z-10 rounded-lg`}
      >
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
        >
          <Icon
            Svg={person}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="Переглянути"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none "
          />
        </Button>
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
        >
          <Icon Svg={block} width={30} height={30} className="stroke-error-red" />
          <Text
            Tag="span"
            text="Заблокувати"
            size="md"
            color="red"
            className="select-none"
          />
        </Button>
      </HStack>
    </VStack>
  );
};

export default AdminManagingSellersController;
