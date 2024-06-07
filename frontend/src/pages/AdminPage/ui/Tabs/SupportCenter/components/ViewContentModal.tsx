/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC } from 'react';

import { formatDate } from '../../../../../../shared/utils/formatDate';
import { SupportMessage } from '../interfaces/SupportMessage';

import SupportImagesSlider from './SupportImagesSlider';

import close from '@/shared/assets/icons/cancel.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { Text } from '@/shared/ui/Text';

interface Props {
  viewContentSelectedMessage: SupportMessage;
  setViewContentSelectedMessage: (message: SupportMessage | null) => void;
}

const ViewContentModal: FC<Props> = (props) => {
  const { viewContentSelectedMessage, setViewContentSelectedMessage } = props;

  const isImage = viewContentSelectedMessage.images.length > 0;

  return (
    <ModalWindow
      className="flex flex-col lg:flex-row gap-5 lg:gap-11 justify-center items-center !bg-selected-dark rounded-2xl p-6 lg:p-10 lg:pt-[60px]"
      onCloseFunc={() => setViewContentSelectedMessage(null)}
    >
      {isImage && <SupportImagesSlider images={viewContentSelectedMessage.images} />}

      <div className="order-first flex flex-row w-full justify-between items-center lg:hidden">
        <Text Tag="span" text="Звернення" size="xl" font-normal color="white" />
        <Icon
          Svg={close}
          width={24}
          height={24}
          className="fill-main-white self-end"
          onClick={() => setViewContentSelectedMessage(null)}
        />
      </div>

      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer hidden lg:block lg:absolute lg:right-[20px] lg:top-[20px] hover:rotate-90 hover:duration-300 duration-300"
        onClick={() => setViewContentSelectedMessage(null)}
      />

      <div
        className={`-order-2 lg:order-last min-w-[292px] lg:min-w-[364px] max-w-[364px] flex flex-col w-full ${isImage ? 'lg:h-[400px]' : 'h-auto'} gap-[20px] text-main-white font-outfit font-[400] overflow-y-auto`}
      >
        <span className="text-[16px] font-[600]">
          {viewContentSelectedMessage?.topic}
        </span>
        <div className="flex flex-row-reverse justify-between lg:flex-col gap-[5px]">
          <span className="text-[14px]">
            {formatDate(viewContentSelectedMessage?.date)}
          </span>
          <div className="flex flex-col">
            <span className="text-[16px]">{viewContentSelectedMessage?.userMail}</span>
            <span>
              <span className="text-[16px]">ID: </span>
              <span className="text-[16px]">{viewContentSelectedMessage?._id}</span>
            </span>
          </div>
        </div>
        <span className="text-[16px] text-disabled text-wrap">
          {viewContentSelectedMessage?.content}
        </span>
      </div>
    </ModalWindow>
  );
};

export default ViewContentModal;
