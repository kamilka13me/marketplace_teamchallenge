import { FC, useState } from 'react';

import { Product } from '@/enteties/Product';
import editDots from '@/shared/assets/icons/edit.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
  editHandler: () => void;
  deleteHandler: (ids: string[]) => void;
}

const MobileProductController: FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { product, editHandler, deleteHandler } = props;

  return (
    <VStack gap="2" className="relative">
      <Icon
        Svg={editDots}
        width={40}
        height={59}
        onClick={() => setShowModal(!showModal)}
        className="cursor-pointer"
      />
      <HStack
        justify="center"
        className={`${showModal ? '' : 'hidden'} absolute top-12 right-5 z-10 w-40 rounded-2xl bg-selected-dark `}
      >
        <Button
          variant="clear"
          className="w-full p-2.5  bg-secondary-yellow rounded-t-2xl"
          onClick={editHandler}
        >
          <Text Tag="span" text="Редагувати" size="xs" className="text-selected-dark" />
        </Button>
        <Button
          variant="clear"
          className="w-full p-2.5 "
          onClick={() => deleteHandler([product?._id])}
        >
          <Text Tag="span" text="Дублювати" size="xs" color="white" className="" />
        </Button>
        <Button
          variant="clear"
          className="w-full p-2.5  rounded-b-2xl"
          onClick={() => deleteHandler([product?._id])}
        >
          <Text Tag="span" text="Видалити" size="xs" color="red" className="" />
        </Button>
      </HStack>
    </VStack>
  );
};

export default MobileProductController;
