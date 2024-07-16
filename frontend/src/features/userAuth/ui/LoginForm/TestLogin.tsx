import { useState } from 'react';

import { Switch } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import {
  getAdminProfile,
  getRouteProfile,
  getSellerProfile,
} from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface Props {
  onCloseModal?: () => void;
}

const TestLogin = (props: Props) => {
  const { onCloseModal } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isTestMode, setIsTestMode] = useState(false);

  const onTestSubmit = async (inputEmail: string, inputPassword: string) => {
    await dispatch(
      getUserByCredentials({
        email: inputEmail,
        password: inputPassword,
      }),
    ).then((value) => {
      if (value.meta.requestStatus !== 'rejected') {
        if (onCloseModal) {
          onCloseModal();
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { role } = value.payload.user;

        if (role === 'user') {
          navigate(getRouteProfile('info'));
        } else if (role === 'seller') {
          navigate(getSellerProfile('dashboard'));
        } else if (role === 'admin') {
          navigate(getAdminProfile('users'));
        }
      }
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-5">
        <Switch
          checked={isTestMode}
          onChange={() => setIsTestMode(!isTestMode)}
          className={`${
            isTestMode ? 'bg-secondary-yellow' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full my-5`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              isTestMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className="text-[16px] text-main-dark font-[600]">Увійти як</span>
      </div>

      {isTestMode && (
        <div className="flex flex-col gap-2">
          <button
            name="btnInput"
            type="button"
            onClick={() => onTestSubmit('PeachUser@peach.com', 'PeachUser1')}
            className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main"
          >
            Покупець
          </button>
          <button
            name="btnInput"
            type="button"
            onClick={() => onTestSubmit('PeachSeller@peach.com', 'PeachSeller1')}
            className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main"
          >
            Продавець
          </button>
          <button
            name="btnInput"
            type="button"
            onClick={() => onTestSubmit('PeachAdmin@peach.com', 'PeachAdmin1')}
            className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main"
          >
            Адміністратор
          </button>
        </div>
      )}
    </div>
  );
};

export default TestLogin;
