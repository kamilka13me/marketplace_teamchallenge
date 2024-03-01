import React, { FC, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { actionReducer } from '@/features/userAuth';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
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
  const { onToggleForm, onCloseModal } = props;

  const { t } = useTranslation();

  const [passShown, setPassShown] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InputsValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<InputsValues> = (data) => {
    dispatch(actionReducer.setEmail(data.inputEmail));
    dispatch(actionReducer.setPassword(data.inputPassword));
    reset();
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  const onClickChangeForm = () => {
    if (onToggleForm) {
      onToggleForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        variant="basic"
        placeholder={t('Пошта')}
        type="text"
        {...register('inputEmail', {
          required: t("Це поле є обов'язковим"),
          minLength: { value: 5, message: t('Ваш логін має бути не менше 6 символів') },
          pattern: {
            value:
              /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
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
              value: 5,
              message: t('Ваш пароль має бути не менше 6 символів'),
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
      <Link to="/">
        <p className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px] mt-5 mb-6">
          {t('Забули пароль?')}
        </p>
      </Link>
      <Input
        variant="clear"
        value={t('Увійти')}
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="outfit bg-primary min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400"
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
          {t('Зареєструватись')}
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
