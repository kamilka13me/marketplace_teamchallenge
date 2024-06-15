import { FC, useState } from 'react';

import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { SellerStatus } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import block from '@/shared/assets/icons/block.svg?react';
import edit from '@/shared/assets/icons/edit-2.svg?react';
import action from '@/shared/assets/icons/edit.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import checked from '@/shared/assets/icons/tick-square.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  userId: string;
  openForm: () => void;
  openSellerActiveModal: () => void;
}

const AdminManagingSellersController: FC<Props> = (props) => {
  const { openForm, userId, openSellerActiveModal } = props;

  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const setStatus = async (status: SellerStatus) => {
    try {
      await $api.patch(`${ApiRoutes.USER}/${userId}/status`, {
        accountStatus: status,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      dispatch(fetchAllSellers({}));
      if (status === 'active') {
        openSellerActiveModal();
      }
    }
  };

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
          onClick={openForm}
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
          onClick={() => setStatus('close')}
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
        >
          <Icon
            Svg={reject}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="Відхилити"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none "
          />
        </Button>
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => setStatus('work')}
        >
          <Icon
            Svg={edit}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="На розгляді"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none "
          />
        </Button>
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => setStatus('active')}
        >
          <Icon
            Svg={checked}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="Активувати"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none "
          />
        </Button>
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => setStatus('blocked')}
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
