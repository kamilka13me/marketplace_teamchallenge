import React, { FC, useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getSellerInfo } from '@/enteties/Seller/model/selectors/sellerInfoSelectors';
import { sellerInfoActions } from '@/enteties/Seller/model/slice/sellerSlice';
import { Seller } from '@/enteties/Seller/model/types/seller';
import { getUserAuthData } from '@/enteties/User';
import ChangePassBlockSellerForm from '@/pages/SellerPage/ui/Tabs/ProfileInfo/blocks/ChangePassBlockSellerForm';
import ContactBlockPersonalForm from '@/pages/SellerPage/ui/Tabs/ProfileInfo/blocks/ContactBlockPersonalForm';
import GeneralBlockPersonalForm from '@/pages/SellerPage/ui/Tabs/ProfileInfo/blocks/GeneralBlockPersonalForm';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const PersonalSellerForm: FC = () => {
  const user = useAppSelector(getUserAuthData);
  const sellerInfo = useAppSelector(getSellerInfo);

  const { t } = useTranslation();

  const [showChangePass, setShowChangePass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const methods = useForm<Seller>({
    mode: 'all',
    defaultValues: {
      email: user?.email,
      password: 'HardcorePassword',
      contacts: sellerInfo?.contacts,
      communication: sellerInfo?.communication,
      generalName: sellerInfo?.generalName,
      generalCommunication: sellerInfo?.generalCommunication,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<Seller> = () => {
    // console.log(data);
    reset();
    setShowModal(!showModal);
  };

  const onHandlePassForm = () => {
    setShowChangePass(!showChangePass);
    dispatch(sellerInfoActions.resetError());
  };

  const renderRegistrationData = () => (
    <HStack className="w-full bg-dark-grey rounded-2xl mt-6 lg:mt-0 lg:px-4 lg:py-6">
      <Text
        Tag="p"
        text={t('Ваші дані для входу в Маркетплейс')}
        size="xl"
        className="leading-[26px] text-main-white mb-6 lg:mb-5 text-wrap"
      />
      <HStack align="start" className="w-full lg:flex-row gap-3 lg:gap-4 mb-2">
        <HStack gap="2" className="w-full">
          <Text Tag="p" text="Email" size="md" color="white" />
          <Input
            variant="fill"
            placeholder="Email"
            type="text"
            autoComplete="off"
            className="min-h-[48px] w-full"
            classNameBlockWrap="w-full"
            {...register('email', {
              disabled: true,
            })}
          />
        </HStack>

        <HStack gap="2" className="w-full">
          <Text Tag="p" text={t('Пароль')} size="md" color="white" />
          <div className="relative w-full">
            <Input
              variant="fill"
              placeholder={t('Ваш пароль')}
              type="password"
              autoComplete="off"
              className="min-h-[48px] w-full"
              {...register('password', {
                disabled: true,
              })}
            />
            <Icon
              Svg={unPrivateEye}
              width={24}
              height={24}
              className="absolute top-[12px] right-[12px] fill-main-white"
            />
          </div>
        </HStack>
      </HStack>
      <VStack align="center" justify="end" className="w-full">
        <Button
          variant="clear"
          className="outfit text-main text-[14px] leading-[18px] font-normal border-b-main border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
          onClick={() => {
            setShowChangePass(!showChangePass);
          }}
        >
          {t('Змінити пароль')}
        </Button>
      </VStack>
    </HStack>
  );

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-6 lg:gap-5 mb-6 lg:mb-0"
        >
          {renderRegistrationData()}

          <ContactBlockPersonalForm />
          <GeneralBlockPersonalForm />

          <Input
            variant="clear"
            value={t('Зберегти зміни')}
            name="btnInput"
            type="submit"
            disabled={!isValid}
            classNameBlockWrap="items-end"
            className="outfit bg-main w-full lg:max-w-[360px] py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:text-main-white disabled:bg-disabled"
          />
        </form>
      </FormProvider>

      {showChangePass && (
        <ModalWindow
          onCloseFunc={onHandlePassForm}
          className="min-w-[299px] md:w-[424px] bg-selected-dark p-6 md:px-8 md:py-10 rounded-2xl animate-open-forms-modal"
        >
          <ChangePassBlockSellerForm onClose={onHandlePassForm} />
        </ModalWindow>
      )}

      {showModal && (
        <ModalWindow
          onCloseFunc={() => {
            setShowModal(!showModal);
          }}
          className="min-w-[233px] bg-selected-dark px-3 py-4 rounded-2xl animate-open-forms-modal"
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
              className="fill-main-white hover:transition hover:rotate-90 hover:duration-300 duration-300"
            />
          </VStack>
          <HStack align="center" className="mt-5 mx-3.5 mb-8 gap-3">
            <Text Tag="p" text="Вітаємо!" size="md" className="text-main-white" />
            <Text
              Tag="p"
              text={t('Дані успішно змінено')}
              size="sm"
              align="center"
              className="text-main-white"
            />
          </HStack>
        </ModalWindow>
      )}
    </div>
  );
};

export default PersonalSellerForm;
