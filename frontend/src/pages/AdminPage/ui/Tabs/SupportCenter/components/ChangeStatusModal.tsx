/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC, useState } from 'react';

import { SupportMessage } from '../interfaces/SupportMessage';

import { $api } from '@/shared/api/api';
import close from '@/shared/assets/icons/cancel.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';

interface Props {
  changeStatusSelectedMessage: SupportMessage;
  setChangeStatusSelectedMessage: (message: SupportMessage | null) => void;
  refetchSupportData: () => void;
}

const ChangeStatusModal: FC<Props> = (props) => {
  const {
    changeStatusSelectedMessage,
    setChangeStatusSelectedMessage,
    refetchSupportData,
  } = props;

  const [selectedStatus, setSelectedStatus] = useState<
    'new' | 'consider' | 'work' | 'closed'
  >(changeStatusSelectedMessage.status);

  const submitNewStatus = async () => {
    try {
      await $api.put(`${ApiRoutes.SUPPORT}/${changeStatusSelectedMessage._id}`, {
        status: selectedStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      refetchSupportData();
      setChangeStatusSelectedMessage(null);
    }
  };

  return (
    <ModalWindow
      className="max-w-[350px] flex flex-row gap-[30px] justify-center items-center !bg-selected-dark rounded-2xl w-full p-[30px] pt-[30px] relative"
      onCloseFunc={() => setChangeStatusSelectedMessage(null)}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer absolute right-[30px] top-[30px] hover:rotate-90 hover:duration-300 duration-300"
        onClick={() => setChangeStatusSelectedMessage(null)}
      />

      <div className="w-full flex flex-col gap-[40px] h-[300px] text-main-white font-outfit font-[400] overflow-y-auto">
        <span className="text-[20px] text-outfit font-[600]">Змінити статус</span>

        <div className="flex flex-col justify-start items-start gap-[10px] font-[400] text-[18px]">
          <button
            onClick={() => setSelectedStatus('new')}
            type="button"
            className="w-full flex justify-start items-center"
          >
            <div className="flex justify-center items-center w-[20px] h-[20px] border-[2px] border-main rounded-full mr-[10px]">
              {selectedStatus === 'new' && (
                <div className="w-[10px] h-[10px] bg-main rounded-full" />
              )}
            </div>
            <span>Новий</span>
          </button>

          <button
            onClick={() => setSelectedStatus('consider')}
            type="button"
            className="w-full flex justify-start items-center"
          >
            <div className="flex justify-center items-center w-[20px] h-[20px] border-[2px] border-main rounded-full mr-[10px]">
              {selectedStatus === 'consider' && (
                <div className="w-[10px] h-[10px] bg-main rounded-full" />
              )}
            </div>
            <span>На розгляді</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('work')}
            className="w-full flex justify-start items-center"
          >
            <div className="flex justify-center items-center w-[20px] h-[20px] border-[2px] border-main rounded-full mr-[10px]">
              {selectedStatus === 'work' && (
                <div className="w-[10px] h-[10px] bg-main rounded-full" />
              )}
            </div>
            <span>В роботі</span>
          </button>

          <button
            onClick={() => setSelectedStatus('closed')}
            type="button"
            className="w-full flex justify-start items-center"
          >
            <div className="flex justify-center items-center w-[20px] h-[20px] border-[2px] border-main rounded-full mr-[10px]">
              {selectedStatus === 'closed' && (
                <div className="w-[10px] h-[10px] bg-main rounded-full" />
              )}
            </div>
            <span>Вирішено</span>
          </button>
        </div>

        <button
          type="button"
          onClick={submitNewStatus}
          className="w-full h-[48px] rounded-[8px] bg-main hover:bg-secondary-yellow text-main-dark font-outfit font-[600] text-[16px]"
        >
          Підтвердити
        </button>
      </div>
    </ModalWindow>
  );
};

export default ChangeStatusModal;
