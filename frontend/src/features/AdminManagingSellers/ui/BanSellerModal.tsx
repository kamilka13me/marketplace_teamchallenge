import { FC } from 'react';

import close from '@/shared/assets/icons/cancel.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { Text } from '@/shared/ui/Text';

interface Props {
  sellerName: string;
  sellerId: string;
  onClose: () => void;
}
const BanSellerModal: FC<Props> = (props) => {
  const { onClose, sellerName, sellerId } = props;

  return (
    <ModalWindow
      className="flex flex-col items-center pb-[60px] !bg-selected-dark shadow-custom-hover rounded-2xl w-[340px] lg:w-[390px]"
      onCloseFunc={onClose}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer"
        onClick={onClose}
      />
      <div className="mt-[26px] text-center max-w-[263px] flex flex-col justify-center items-center">
        <Text Tag="h5" text="Користувача заблоковано" size="xl" color="white" />
        <Text
          Tag="h5"
          text={`Продавця “${sellerName}” ID ${sellerId} заблоковано`}
          size="md"
          className="mt-6 !text-center"
          color="white"
        />
      </div>
    </ModalWindow>
  );
};

export default BanSellerModal;
