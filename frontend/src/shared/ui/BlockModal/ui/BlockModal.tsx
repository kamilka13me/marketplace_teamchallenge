import { FC } from 'react';

import ModalWindow from '../../ModalWindow/ModalWindow';

import block from '@/shared/assets/icons/block.svg?react';
import close from '@/shared/assets/icons/cancel.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  title?: string;
  text: string;
  blockHandler: () => void;
  onClose: () => void;
}

const BlockModal: FC<Props> = (props) => {
  const { onClose, text, title, blockHandler } = props;

  return (
    <ModalWindow
      className="flex flex-col items-center !bg-selected-dark rounded-2xl w-[340px] lg:w-[400px]"
      onCloseFunc={onClose}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer"
        onClick={onClose}
      />
      <div className="max-w-[296px] w-full">
        <Icon
          Svg={block}
          width={30}
          height={30}
          className="stroke-error-red mx-auto mb-3"
        />
        {title && (
          <Text
            Tag="h5"
            align="center"
            text={title}
            size="xl"
            color="white"
            className="mb-[32px]"
          />
        )}
        <Text Tag="h5" align="center" text={text} size="md" color="gray-light" />
      </div>
      <VStack
        gap="4"
        justify="between"
        align="center"
        className="w-full max-w-[282px] mt-10 mb-6"
      >
        <Button
          onClick={onClose}
          className="text-sm w-full h-[38px]"
          variant="light-gray"
        >
          Відмінити
        </Button>
        <Button
          onClick={() => {
            blockHandler();
            onClose();
          }}
          className="text-sm w-full h-[38px]"
          variant="primary"
        >
          Заблокувати
        </Button>
      </VStack>
    </ModalWindow>
  );
};

export default BlockModal;
