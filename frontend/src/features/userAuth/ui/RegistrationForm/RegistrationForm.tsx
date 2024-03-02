import React, { FC, useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';

interface RegistrationFormProps {
  onToggleForm?: () => void;
  onCloseModal?: () => void;
}

interface InputsValues {
  inputName: string;
  inputEmail: string;
  inputPhone: string;
  inputPassword: string;
  personalTerms: string;
}

const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const { onToggleForm, onCloseModal } = props;

  const { t, i18n } = useTranslation();

  const [passShown, setPassShown] = useState(false);
  const [reCaphaValue, setReCaphaValue] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InputsValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<InputsValues> = () => {
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
        placeholder={t("Ім'я")}
        type="text"
        {...register('inputName', {
          required: t("Це поле є обов'язковим"),
          minLength: { value: 3, message: t("Ваше ім'я має бути не менше 3 символів") },
          maxLength: {
            value: 15,
            message: t("Ваше ім'я має бути не більше 15 символів"),
          },
        })}
        error={errors?.inputName && errors?.inputName.message}
        className="mt-6"
      />
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
        className="mt-10"
      />
      <div className="relative mt-10 mb-10">
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
      <div className="hidden">{JSON.stringify(process.env)}</div>
      <div className="hidden">{process.env.RECAPTCHA_API_SITE_KEY}</div>
      <div className="mb-4">
        <ReCAPTCHA
          hl={i18n.language === 'ua' ? 'uk' : 'en'}
          sitekey="6LdYgYIpAAAAAFDJp2xk2nhsce03BxuaOdiW5yQm"
          onChange={(value) => {
            setReCaphaValue(value);
          }}
        />
      </div>
      <Checkbox
        type="checkbox"
        variant="basic"
        label={t('Надання згоди про обробку персональних даних')}
        {...register('personalTerms', {
          required: true,
        })}
      />
      <Input
        variant="clear"
        value={t('Зареєструватись')}
        name="btnInput"
        type="submit"
        disabled={!isValid || !reCaphaValue}
        className="outfit bg-primary min-w-full py-[4px] mt-6 rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400"
      />
      <VStack align="center" className="mt-6" justify="between">
        <span className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px]">
          {t('Є обліковий запис?')}
        </span>
        <Button
          variant="clear"
          onClick={onClickChangeForm}
          className="outfit text-right text-black text-[14px] font-semibold decoration-solid decoration-black underline decoration-1"
        >
          {t('Увійти')}
        </Button>
      </VStack>
    </form>
  );
};

export default RegistrationForm;
