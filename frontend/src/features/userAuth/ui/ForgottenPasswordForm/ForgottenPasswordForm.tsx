import React, { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

interface LoginFormProps {
  onToggleForm?: (index: number) => void;
  onCloseModal?: () => void;
}

interface InputsValues {
  inputEmail: string;
}

const ForgottenPasswordForm: FC<LoginFormProps> = (props) => {
  const { onToggleForm, onCloseModal } = props;

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // reset,
    // setError,
  } = useForm<InputsValues>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<InputsValues> = () => {
    if (onCloseModal) {
      onCloseModal();
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
        classNameBlockWrap="mt-6 mb-10"
        className="min-h-[48px] w-full md:min-w-[360px]"
      />
      <Input
        variant="clear"
        value={t('Отримати пароль')}
        name="btnInput"
        type="submit"
        disabled={!isValid}
        classNameBlockWrap="mb-10"
        className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
      />
      <div className="text-center">
        <Button
          variant="clear"
          onClick={() => {
            if (onToggleForm) {
              onToggleForm(0);
            }
          }}
          className="outfit text-right text-main-dark text-[14px] font-semibold decoration-solid decoration-main-dark underline decoration-1"
        >
          {t('Я згадав свій пароль')}
        </Button>
      </div>
    </form>
  );
};

export default ForgottenPasswordForm;
