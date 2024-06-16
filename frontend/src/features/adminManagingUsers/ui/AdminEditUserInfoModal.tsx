import { FC } from 'react';

import { User } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import close from '@/shared/assets/icons/cancel.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  user: User;
  sendRecoveryPassword: () => void;
  onClose: () => void;
}

const AdminEditUserInfoModal: FC<Props> = (props) => {
  const { onClose, sendRecoveryPassword, user } = props;

  const recoveryPasswordHandler = async () => {
    try {
      await $api.post(`${ApiRoutes.USER}/recover-password`, {
        email: user.email,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      onClose();
      sendRecoveryPassword();
    }
  };

  return (
    <ModalWindow
      className="flex flex-col items-center !bg-selected-dark rounded-2xl max-w-[380px] lg:max-w-[414px] !p-6 w-full"
      onCloseFunc={onClose}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer"
        onClick={onClose}
      />
      <HStack gap="2" className="max-w-[318px] w-full">
        <div className="border-b-main-white border-b-[1px] w-full py-3 px-4">
          <Text
            Tag="h5"
            text={user?.username || 'Ім`я відсутнє'}
            size="md"
            color="white"
          />
        </div>
        <div className="border-b-main-white border-b-[1px] w-full py-3 px-4">
          <Text
            Tag="h5"
            text={user?.surname || 'Прізвище відсутнє'}
            size="md"
            color="white"
          />
        </div>
        <div className="border-b-main-white border-b-[1px] w-full py-3 px-4">
          <Text
            Tag="h5"
            text={user?.dob || 'Дата народження відсутня'}
            size="md"
            color="white"
          />
        </div>
        <div className="border-b-main-white border-b-[1px] w-full py-3 px-4">
          <Text
            Tag="h5"
            text={user?.email || 'Email відсутній'}
            size="md"
            color="white"
          />
        </div>
        <div className="border-b-main-white border-b-[1px] w-full py-3 px-4">
          <Text
            Tag="h5"
            text={user?.phoneNumber || 'Номер телефону відсутній'}
            size="md"
            color="white"
          />
        </div>
      </HStack>
      <Button
        onClick={recoveryPasswordHandler}
        className="max-w-[318px] w-full h-[48px] mt-8 mb-[18px] text-lg leading-[0px]"
        variant="primary"
      >
        Відновити пароль
      </Button>
    </ModalWindow>
  );
};

export default AdminEditUserInfoModal;
