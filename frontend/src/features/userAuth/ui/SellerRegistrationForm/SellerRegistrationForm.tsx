import React, { FC, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import PrivateBlockSellerForm from '@/features/userAuth/ui/SellerRegistrationForm/blocks/PrivateBlockSellerForm';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export interface InputsSellerValues {
  email: string;
  password: string;
  legalName: string;
  legalAddress: string;
  city: string;
  cityIndex: string;
  idStateRegister: string;
  identificNumber: string;
  tax: boolean;
  contacts: {
    phone: string;
    person: string;
  }[];
  communication: {
    messenger: string;
    phone: string;
  }[];
  descriptCompany: string;
}

const SellerRegistrationForm: FC = () => {
  const { t } = useTranslation();

  const [passShown, setPassShown] = useState(false);

  const methods = useForm<InputsSellerValues>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      legalName: '',
      legalAddress: '',
      city: '',
      cityIndex: '',
      idStateRegister: '',
      identificNumber: '',
      tax: false,
      contacts: [{ phone: '', person: '' }],
      communication: [{ messenger: '', phone: '' }],
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<InputsSellerValues> = () => {
    // console.log(data);
    reset();
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  const renderRegistrationData = () => (
    <HStack gap="5">
      <Text
        Tag="p"
        text={t('Ваші дані для входу в Маркетплейс')}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      <VStack align="start" gap="5" className="w-full">
        <Input
          variant="basic"
          placeholder="Email"
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('email', {
            required: t("Це поле є обов'язковим"),
            minLength: {
              value: 6,
              message: t('Ваш логін має бути не менше 6 символів'),
            },
            pattern: {
              value:
                /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
              message: t('Ваш логін має бути по шаблону xxxx@xxx.xx'),
            },
          })}
          error={errors?.email && errors?.email.message}
        />
        <div className="relative w-full">
          <Input
            variant="basic"
            placeholder={t('Ваш пароль')}
            type={passShown ? 'text' : 'password'}
            autoComplete="off"
            className="min-h-[48px] w-full"
            {...register('password', {
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
            error={errors?.password && errors?.password.message}
          />
          <Icon
            clickable
            onClick={onTogglePassVisibility}
            Svg={passShown ? privateEye : unPrivateEye}
            width={24}
            height={24}
            className="absolute top-[12px] right-[12px] fill-selected-dark"
          />
        </div>
      </VStack>
    </HStack>
  );

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start max-w-[868px] py-4 md:py-10 gap-9"
        >
          {renderRegistrationData()}

          <PrivateBlockSellerForm />

          <Input
            variant="clear"
            value={t('Зберегти')}
            name="btnInput"
            type="submit"
            disabled={!isValid}
            className="outfit bg-main min-w-[360px] py-[4px] mt-6 rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default SellerRegistrationForm;
