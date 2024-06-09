/* eslint-disable no-console */
import { FC, useState } from 'react';

import { Complaint } from '../interfaces/Complaints';

import save from '@/shared/assets/icons/save.svg?react';
import trash from '@/shared/assets/icons/trash2.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {
  complaint: Complaint;
  refetch: () => void;
}

const FeedbackActionModal: FC<Props> = (props) => {
  const { complaint, refetch } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSave = async () => {
    try {
      console.log(`Save ${complaint._id}`);
      // await $api.delete(`${ApiRoutes.COMPLAINTS}/${complaint._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
      refetch();
    }
  };

  const handleClickDelete = async () => {
    try {
      console.log(`Delete ${complaint._id}`);
      // await $api.delete(`${ApiRoutes.COMPLAINTS}/${complaint._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
      refetch();
    }
  };

  return (
    <div className="flex items-center justify-center rounded-[16px] relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[32px] flex justify-center items-center gap-[4px]"
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-[4px] h-[4px] bg-white rounded-full" />
        ))}
      </button>

      {isOpen && (
        <div className="py-3 px-2 bg-shadow-footer absolute right-[-10px] top-[35px] z-10 rounded-[8px] hover:drop-shadow-custom-primary">
          <Button
            variant="clear"
            className="group flex items-center gap-2 w-[180px] p-2.5 pl-[13px] hover:bg-secondary-yellow rounded-lg"
            onClick={handleClickSave}
          >
            <Icon
              Svg={save}
              width={25}
              height={25}
              className="fill-disabled group-hover:fill-main-dark"
            />
            <Text
              Tag="span"
              text="Зберегти"
              size="md"
              color="gray-light"
              className="group-hover:text-main-dark select-none"
            />
          </Button>

          <Button
            variant="clear"
            className="group flex items-center gap-2 w-[180px] p-2.5 hover:bg-secondary-yellow rounded-lg"
            onClick={handleClickDelete}
          >
            <Icon
              Svg={trash}
              width={30}
              height={30}
              className="stroke-disabled group-hover:stroke-main-dark"
            />
            <Text
              Tag="span"
              text="Видалити"
              size="md"
              color="gray-light"
              className="group-hover:text-main-dark select-none "
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedbackActionModal;
