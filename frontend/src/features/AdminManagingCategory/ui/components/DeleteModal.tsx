/* eslint-disable no-console */
import { FC } from 'react';

import { $api } from '@/shared/api/api';
import close from '@/shared/assets/icons/cancel.svg?react';
import exclamation from '@/shared/assets/icons/exclamation.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  selectedDeleteCategoryID: string | null;
  setSelectedDeleteCategoryID: (type: string | null) => void;
  refetchCategoryDataHandler: () => void;
}

const DeleteModal: FC<Props> = (props) => {
  const {
    selectedDeleteCategoryID,
    setSelectedDeleteCategoryID,
    refetchCategoryDataHandler,
  } = props;

  const deleteCategory = async () => {
    if (!selectedDeleteCategoryID) return;
    try {
      await $api.delete(`${ApiRoutes.CATEGORY}/${selectedDeleteCategoryID}`);
    } catch (error) {
      console.error(error);
    } finally {
      refetchCategoryDataHandler();
      setSelectedDeleteCategoryID(null);
    }
  };

  return (
    <div>
      <ModalWindow
        className="flex flex-col items-center !bg-selected-dark rounded-2xl max-w-[404px] !pb-[60px] w-full drop-shadow-custom-dark-modal"
        onCloseFunc={() => setSelectedDeleteCategoryID(null)}
      >
        <Icon
          Svg={close}
          width={24}
          height={24}
          className="fill-main-white self-end cursor-pointer"
          onClick={() => setSelectedDeleteCategoryID(null)}
        />
        <HStack className="max-w-[350px] w-full">
          <Icon
            width={36}
            height={36}
            Svg={exclamation}
            className="fill-error-red self-center mt-5"
          />
          <Text
            Tag="h5"
            text="Ви впевнені?"
            size="xl"
            color="white"
            className="self-center mt-3 "
          />
          <HStack gap="5" className="mt-8 px-2 flex items-center">
            <Text
              Tag="h5"
              text="Ви дійсно хочете видалити елемент? Разом автоматично видалються повʼязані елементи (категорія, підкатегорія, розділ).
              Цю дію неможливо буде відмінити."
              align="center"
              size="md"
              color="gray-light"
            />
            <VStack gap="4" justify="between" className="w-[285px]">
              <Button
                variant="light-gray"
                className="!w-full"
                onClick={() => setSelectedDeleteCategoryID(null)}
              >
                Відмінити
              </Button>
              <Button
                onClick={() => deleteCategory()}
                variant="primary"
                className="!w-full"
              >
                Видалити
              </Button>
            </VStack>
          </HStack>
        </HStack>
      </ModalWindow>
    </div>
  );
};

export default DeleteModal;
