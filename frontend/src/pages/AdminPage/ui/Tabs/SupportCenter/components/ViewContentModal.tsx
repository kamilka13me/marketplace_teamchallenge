/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC } from 'react';

import { SupportMessage } from '../interfaces/SupportMessage';

import close from '@/shared/assets/icons/cancel.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';

interface Props {
  viewContentSelectedMessage: SupportMessage;
  setViewContentSelectedMessage: (message: SupportMessage | null) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};

const ViewContentModal: FC<Props> = (props) => {
  const { viewContentSelectedMessage, setViewContentSelectedMessage } = props;

  const isImage = viewContentSelectedMessage.images.length > 0;

  return (
    <ModalWindow
      className={`${isImage ? 'max-w-[900px]' : 'max-w-[450px]'} flex flex-row gap-[50px] items-start !bg-selected-dark rounded-2xl w-full px-[50px] pt-[50px] pb-[20px] relative`}
      onCloseFunc={() => setViewContentSelectedMessage(null)}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer absolute right-[20px] top-[20px]"
        onClick={() => setViewContentSelectedMessage(null)}
      />

      {isImage && (
        <div className="w-full h-[150px] rounded-2xl overflow-hidden">
          <img
            src={viewContentSelectedMessage?.images[0]}
            alt="support"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="w-full flex flex-col gap-[20px] h-[350px] text-main-white font-outfit font-[400]">
        <span className="text-[16px] font-[600]">
          {viewContentSelectedMessage?.topic}
        </span>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[14px]">
            {formatDate(viewContentSelectedMessage?.date)}
          </span>
          <div className="flex flex-row gap-[10px]">
            <span className="text-[16px]">{viewContentSelectedMessage?.userMail}</span>
            <span>
              <span className="text-[16px]">ID: </span>
              <span className="text-[16px]">{viewContentSelectedMessage?.userId}</span>
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
