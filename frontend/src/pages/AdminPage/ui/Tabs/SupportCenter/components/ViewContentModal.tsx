/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC } from 'react';

import { SupportMessage } from '../interfaces/SupportMessage';
import { formatDate } from '../utils/formatDate';

import SupportImagesSlider from './SupportImagesSlider';

import close from '@/shared/assets/icons/cancel.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';

interface Props {
  viewContentSelectedMessage: SupportMessage;
  setViewContentSelectedMessage: (message: SupportMessage | null) => void;
}

const ViewContentModal: FC<Props> = (props) => {
  const { viewContentSelectedMessage, setViewContentSelectedMessage } = props;

  const isImage = viewContentSelectedMessage.images.length > 0;

  return (
    <ModalWindow
      className={`${isImage ? 'max-w-[900px]' : 'max-w-[450px]'} flex flex-row gap-[30px] justify-center items-center !bg-selected-dark rounded-2xl w-full p-[30px] pt-[60px] relative`}
      onCloseFunc={() => setViewContentSelectedMessage(null)}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer absolute right-[20px] top-[20px]"
        onClick={() => setViewContentSelectedMessage(null)}
      />

      {isImage && <SupportImagesSlider images={viewContentSelectedMessage.images} />}

      <div className="w-full flex flex-col gap-[20px] h-[400px] text-main-white font-outfit font-[400] overflow-y-auto pr-[10px]">
        <span className="text-[16px] font-[600]">
          {viewContentSelectedMessage?.topic}
        </span>
        <div className="flex flex-col gap-[5px]">
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
        <span className="text-[16px] text-disabled">
          {viewContentSelectedMessage?.content}
        </span>
      </div>
    </ModalWindow>
  );
};

export default ViewContentModal;
