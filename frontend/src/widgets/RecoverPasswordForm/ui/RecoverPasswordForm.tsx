import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { userActions } from '@/enteties/User';
import { userHasError } from '@/enteties/User/model/selectors/getUserAuthData';
import { setRecoverPasswordUser } from '@/enteties/User/model/services/setRecoverPasswordUser';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

interface ForgottenPasswordProps {
  token?: string;
}

interface InputsPasswordValues {
  inputNewPassword: string;
  inputConfirmationPassword: string;
}

const RecoverPasswordForm: FC<ForgottenPasswordProps> = (props) => {
  const { token } = props;
  const errorServer = useAppSelector(userHasError);

  const { t } = useTranslation();

  const [passNewShown, setPassNewShown] = useState(false);
  const [passConfirmShown, setPassConfirmShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<InputsPasswordValues>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<InputsPasswordValues> = async (data) => {
    if (data.inputNewPassword !== data.inputConfirmationPassword) {
      setError('inputConfirmationPassword', {
        message: t('Пароль введено не вірно'),
      });
    } else if (token) {
      await dispatch(
        setRecoverPasswordUser({
          confirmToken: token,
          newPassword: data.inputNewPassword,
        }),
      ).then((value) => {
        if (value.meta.requestStatus !== 'rejected') {
          reset();
          navigate(getRouteMain());
          dispatch(userActions.resetError());
        }
      });
    }
  };

  useEffect(() => {
    setError('inputNewPassword', {
      // eslint-disable-next-line no-nested-ternary
      message: errorServer?.includes('419')
        ? t('Посилання для відновлення пароля застаріле. Спробуйте знову')
        : errorServer?.includes('404')
          ? t('Користувач не знайдений')
          : '',
    });
  }, [setError, handleSubmit, errorServer, t]);

  const onPassNewVisibility = () => {
    setPassNewShown(!passNewShown);
  };

  const onPassConfirmVisibility = () => {
    setPassConfirmShown(!passConfirmShown);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[343px] md:w-[380px]">
      <Text
        Tag="p"
        text={t('Створити новий пароль')}
        size="2xl"
        bold
        className="!text-center leading-[30px] mb-8 md:mb-10"
      />
      <div className="relative mb-6 lg:mb-[34px]">
        <Input
          variant="basic"
          className="min-h-[48px] w-full"
          placeholder={t('Введіть новий пароль')}
          type={passNewShown ? 'text' : 'password'}
          {...register('inputNewPassword', {
            required: t("Це поле є обов'язковим"),
            minLength: {
              value: 9,
              message: t('Ваш пароль має бути не менше 9 символів'),
            },
            pattern: {
              value: /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
              message: t(
                'Пароль має містити мінімум 9 символів, включаючи велику латинську літеру',
              ),
            },
          })}
          error={errors?.inputNewPassword && errors?.inputNewPassword.message}
        />
        <Icon
          clickable
          onClick={onPassNewVisibility}
          Svg={passNewShown ? privateEye : unPrivateEye}
          width={24}
          height={24}
          className="absolute top-[12px] right-[12px]"
        />
      </div>
      <div className="relative mb-8 md:mb-10">
        <Input
          variant="basic"
          className="min-h-[48px] w-full"
          placeholder={t('Повторіть новий пароль')}
          type={passConfirmShown ? 'text' : 'password'}
          {...register('inputConfirmationPassword', {
            required: t("Це поле є обов'язковим"),
            minLength: {
              value: 9,
              message: t('Ваш пароль має бути не менше 9 символів'),
            },
            pattern: {
              value: /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
              message: t(
                'Пароль має містити мінімум 9 символів, включаючи велику латинську літеру',
              ),
            },
          })}
          error={
            errors?.inputConfirmationPassword && errors?.inputConfirmationPassword.message
          }
        />
        <Icon
          clickable
          onClick={onPassConfirmVisibility}
          Svg={passConfirmShown ? privateEye : unPrivateEye}
          width={24}
          height={24}
          className="absolute top-[12px] right-[12px]"
        />
      </div>
      <Input
        variant="clear"
        value={t('Зберегти')}
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
      />
    </form>
  );
};

export default RecoverPasswordForm;
