import { FC, useEffect, useRef, useState } from 'react';

import publish from '@/shared/assets/icons/approve.svg?react';
import block from '@/shared/assets/icons/block.svg?react';
import edit from '@/shared/assets/icons/edit-3.svg?react';
import action from '@/shared/assets/icons/edit.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  editHandler: () => void;
  publishHandler: () => void;
  rejectHandler?: () => void;
  blockHandler: () => void;
}

const OfferController: FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const actionBoxRef = useRef<HTMLDivElement | null>(null);
  const actionBtnRef = useRef<HTMLButtonElement | null>(null);

  const { editHandler, publishHandler, rejectHandler, blockHandler } = props;

  useEffect(() => {
    const onClickOutside = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node;

      if (
        !actionBoxRef.current?.contains(targetNode) &&
        !actionBtnRef.current?.contains(targetNode)
      ) {
        setShowModal(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('touchstart', onClickOutside);
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('touchstart', onClickOutside);
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showModal]);

  return (
    <VStack gap="2" className="relative">
      <Button variant="clear" ref={actionBtnRef} onClick={() => setShowModal(!showModal)}>
        <Icon
          Svg={action}
          width={40}
          height={59}
          className="lg:rotate-90 cursor-pointer"
        />
      </Button>

      <HStack
        ref={actionBoxRef}
        justify="center"
        className={`${showModal ? '' : 'hidden'} py-3 px-2 bg-shadow-footer absolute top-[42px] right-0 z-10 rounded-lg`}
      >
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => {
            editHandler();
            setShowModal(false);
          }}
        >
          <Icon
            Svg={edit}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="Редагувати"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none "
          />
        </Button>
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => {
            publishHandler();
            setShowModal(false);
          }}
        >
          <Icon
            Svg={publish}
            width={30}
            height={30}
            className="stroke-disabled group-hover:stroke-main-dark"
          />
          <Text
            Tag="span"
            text="Опублікувати"
            size="md"
            color="gray-light"
            className="group-hover:text-main-dark select-none"
          />
        </Button>
        {rejectHandler && (
          <Button
            variant="clear"
            className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
            onClick={() => {
              rejectHandler();
              setShowModal(false);
            }}
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
              className="group-hover:text-main-dark select-none"
            />
          </Button>
        )}
        <Button
          variant="clear"
          className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
          onClick={() => {
            blockHandler();
            setShowModal(false);
          }}
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

export default OfferController;
