import React, { FC, useEffect, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { sellerInfoHasError } from '@/enteties/Seller/model/selectors/sellerInfoSelectors';
import { setNewSeller } from '@/enteties/Seller/model/services/setNewSeller';
import { Seller } from '@/enteties/Seller/model/types/seller';
import GeneralBlockSellerForm from '@/features/userAuth/ui/SellerRegistrationForm/blocks/GeneralBlockSellerForm';
import PrivateBlockSellerForm from '@/features/userAuth/ui/SellerRegistrationForm/blocks/PrivateBlockSellerForm';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const SellerRegistrationForm: FC = () => {
  const errorServer = useAppSelector(sellerInfoHasError);

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [passShown, setPassShown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const methods = useForm<Seller>({
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
      descriptCompany: '',
      generalName: '',
      generalCommunication: [{ messenger: '', phone: '' }],
      emailAdvice: true,
      emailAdvertisement: false,
      emailMessage: false,
      conditions: false,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setError,
  } = methods;

  const onSubmit: SubmitHandler<Seller> = async (data) => {
    await dispatch(
      setNewSeller({
        username: data.generalName,
        surname: '',
        email: data.email,
        password: data.password,
        legalName: data.legalName,
        legalAddress: data.legalAddress,
        city: data.city,
        cityIndex: data.cityIndex,
        idStateRegister: data.idStateRegister,
        identificNumber: data.identificNumber,
        tax: data.tax,
        contacts: data.contacts,
        communication: data.communication,
        descriptCompany: data.descriptCompany,
        generalName: data.generalName,
        generalCommunication: data.generalCommunication,
        emailAdvice: data.emailAdvice,
        emailAdvertisement: data.emailAdvertisement,
        emailMessage: data.emailMessage,
        conditions: data.conditions,
      }),
    ).then((value) => {
      if (value.meta.requestStatus !== 'rejected') {
        reset();
        setShowModal(!showModal);
      }
    });
  };

  useEffect(() => {
    setError('email', {
      message: errorServer?.includes('409')
        ? t('За даним e-mail вже зареестрований користувач. Введіть інший e-mail')
        : '',
    });
  }, [setError, handleSubmit, errorServer, t]);

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
      <HStack align="start" gap="5" className="w-full sm:flex-row">
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
            maxLength: {
              value: 50,
              message: t('Ваш логін має бути не більше 50 символів'),
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
      </HStack>
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
          <GeneralBlockSellerForm />

          <Input
            variant="clear"
            value={t('Зберегти')}
            name="btnInput"
            type="submit"
            disabled={!isValid}
            className="outfit bg-main w-full sm:max-w-[360px] py-[4px] mt-6 rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
          />
        </form>
      </FormProvider>

      {showModal && (
        <ModalWindow
          onCloseFunc={() => {
            setShowModal(!showModal);
          }}
          className="max-w-[440px] bg-main-white pt-2 pb-5 px-5 md:px-4 md:py-4 rounded-2xl animate-open-forms-modal"
        >
          <VStack align="center" justify="end">
            <Icon
              clickable
              onClick={() => {
                setShowModal(!showModal);
              }}
              Svg={cancel}
              width={24}
              height={24}
              className="fill-selected-dark hover:transition hover:rotate-90 hover:duration-300 duration-300"
            />
          </VStack>
          <HStack align="center" className="max-w-[320px] mt-3 md:m-5 gap-3 md:gap-10">
            <Text
              Tag="p"
              text={t('Дякуємо за реєстрацію!')}
              size="xl"
              align="center"
              className="text-selected-dark text-nowrap !text-md md:!text-xl"
            />
            <Text
              Tag="p"
              text={t(
                'Очікуйте підтвердження реєстрації найближчим часом. Ми намагаємось обробити вашу заявку якомога швидше.',
              )}
              size="md"
              align="center"
              className="text-selected-dark !text-sm md:!text-md"
            />
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                setShowModal(false);
                navigate(getRouteMain());
              }}
            >
              {t('На головну')}
            </Button>
          </HStack>
        </ModalWindow>
      )}
    </div>
  );
};

export default SellerRegistrationForm;
