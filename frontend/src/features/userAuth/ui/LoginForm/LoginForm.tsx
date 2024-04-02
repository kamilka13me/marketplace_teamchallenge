import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { loginHasError } from '@/features/userAuth';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { getRouteProfile } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { VStack } from '@/shared/ui/Stack';

interface LoginFormProps {
  onToggleForm?: () => void;
  onCloseModal?: () => void;
}

interface InputsValues {
  inputEmail: string;
  inputPassword: string;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const errorServer = useAppSelector(loginHasError);

  const { onToggleForm, onCloseModal } = props;

  const { t } = useTranslation();

  const [passShown, setPassShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<InputsValues>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<InputsValues> = async (data) => {
    await dispatch(
      getUserByCredentials({
        email: data.inputEmail,
        password: data.inputPassword,
      }),
    ).then((value) => {
      if (value.meta.requestStatus !== 'rejected') {
        reset();
        if (onCloseModal) {
          onCloseModal();
        }
        navigate(getRouteProfile());
      }
    });
  };

  useEffect(() => {
    setError('inputEmail', {
      // eslint-disable-next-line no-nested-ternary
      message: errorServer?.includes('403')
        ? t('E-mail або пароль введено не вірно')
        : // eslint-disable-next-line no-nested-ternary
          errorServer?.includes('422')
          ? t(
              'За даним e-mail не зареєстрований жоден користувач. Введіть вірний e-mail, або зареєструйтесь',
            )
          : errorServer?.includes('423')
            ? t('Ваш акаунт заблоковано! Спробуйте будь-ласка через 1 годину')
            : '',
    });
    setError('inputPassword', {
      message: errorServer?.includes('403')
        ? t('E-mail або пароль введено не вірно')
        : '',
    });
  }, [setError, handleSubmit, errorServer, t]);

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  const onClickChangeForm = () => {
    if (onToggleForm) {
      onToggleForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:max-w-[360px]">
      <Input
        variant="basic"
        placeholder="Email"
        type="text"
        {...register('inputEmail', {
          required: t("Це поле є обов'язковим"),
          minLength: { value: 6, message: t('Ваш логін має бути не менше 6 символів') },
          pattern: {
            value:
              /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
            message: t('Ваш логін має бути по шаблону xxxx@xxx.xx'),
          },
        })}
        error={errors?.inputEmail && errors?.inputEmail.message}
        className="mt-6"
      />
      <div className="relative mt-10">
        <Input
          variant="basic"
          placeholder={t('Ваш пароль')}
          type={passShown ? 'text' : 'password'}
          {...register('inputPassword', {
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
          error={errors?.inputPassword && errors?.inputPassword.message}
        />
        <Icon
          clickable
          onClick={onTogglePassVisibility}
          Svg={passShown ? privateEye : unPrivateEye}
          width={24}
          height={24}
          className="absolute top-[12px] right-[12px]"
        />
      </div>
      <div className="text-right">
        <Link
          to="/*" // how create page, update this routes
          onClick={onCloseModal}
          className="inline-block outfit text-gray-900 text-[14px] font-normal leading-[18px] mt-5 mb-6"
        >
          {t('Забули пароль?')}
        </Link>
      </div>
      <Input
        variant="clear"
        value={t('Увійти')}
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="cursor-pointer outfit bg-primary min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400"
      />
      <VStack align="center" className="mt-6" justify="between">
        <span className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px]">
          {t('Немає облікового запису?')}
        </span>
        <Button
          variant="clear"
          onClick={onClickChangeForm}
          className="outfit text-right text-black text-[14px] font-semibold decoration-solid decoration-black underline decoration-1"
        >
          {t('Зареєструватися')}
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
