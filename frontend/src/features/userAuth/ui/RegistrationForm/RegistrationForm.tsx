import React, { FC, useEffect, useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { setNewUser } from '@/enteties/User';
import { userHasError } from '@/enteties/User/model/selectors/getUserAuthData';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';

interface RegistrationFormProps {
  onToggleForm?: (index: number) => void;
  onCloseModal?: () => void;
}

interface InputsValues {
  inputName: string;
  inputEmail: string;
  inputPassword: string;
  personalTerms: string;
}

const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const errorServer = useAppSelector(userHasError);

  const { onToggleForm, onCloseModal } = props;

  const { t, i18n } = useTranslation();

  const [passShown, setPassShown] = useState(false);
  const [reCaphaValue, setReCaphaValue] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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
      setNewUser({
        username: data.inputName,
        email: data.inputEmail,
        password: data.inputPassword,
      }),
    ).then((value) => {
      if (value.meta.requestStatus !== 'rejected') {
        reset();
        if (onCloseModal) {
          onCloseModal();
        }
      }
    });
  };

  useEffect(() => {
    setError('inputEmail', {
      message: errorServer?.includes('409')
        ? t('За даним e-mail вже зареестрований користувач. Введіть інший e-mail')
        : '',
    });
  }, [setError, handleSubmit, errorServer, t]);

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  const onClickChangeForm = () => {
    if (onToggleForm) {
      onToggleForm(0);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:max-w-[360px]">
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
          pattern: {
            value: /^[A-Za-zҐґЄєІіЇїА-Яа-я]+$/,
            message: t("Ваше ім'я може включати тільки українські або англійські літери"),
          },
        })}
        error={errors?.inputName && errors?.inputName.message}
        className="min-h-[48px] w-full md:min-w-[360px] mt-6"
      />
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
        className="min-h-[48px] w-full md:min-w-[360px] mt-10"
      />
      <div className="relative mt-10 mb-10">
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
          className="min-h-[48px] w-full md:min-w-[360px]"
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
      <div className="mb-4">
        <ReCAPTCHA
          hl={i18n.language === 'ua' ? 'uk' : 'en'}
          sitekey={process.env.RECAPTCHA_API_SITE_KEY || ''}
          onChange={(value) => {
            setReCaphaValue(value);
          }}
        />
      </div>
      <VStack align="center" className="gap-[4px]">
        <Checkbox
          type="checkbox"
          variant="basic"
          label={t('Ви надаєте згоду на')}
          {...register('personalTerms', {
            required: true,
          })}
        />
        <a
          href="src/shared/assets/img/Error404vector.png" // test file, later to change to real document.
          download="User-agreement"
          className="outfit font-normal text-[14px] text-[#0F62FE] underline"
        >
          {t('Користувацьку угоду')}
        </a>
      </VStack>
      <Input
        variant="clear"
        value={t('Зареєструватись')}
        name="btnInput"
        type="submit"
        disabled={!isValid || !reCaphaValue}
        className="outfit bg-main min-w-full py-[4px] mt-6 rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
      />
      <VStack align="center" className="mt-6" justify="between">
        <span className="outfit text-right text-main-dark text-[14px] font-normal leading-[18px]">
          {t('Є обліковий запис?')}
        </span>
        <Button
          variant="clear"
          onClick={onClickChangeForm}
          className="outfit text-right text-main-dark text-[14px] font-semibold decoration-solid decoration-main-dark underline decoration-1"
        >
          {t('Увійти')}
        </Button>
      </VStack>
    </form>
  );
};

export default RegistrationForm;
