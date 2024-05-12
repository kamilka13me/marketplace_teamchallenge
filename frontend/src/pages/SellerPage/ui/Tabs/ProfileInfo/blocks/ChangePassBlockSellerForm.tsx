import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { sellerInfoHasError } from '@/enteties/Seller/model/selectors/sellerInfoSelectors';
import { sellerInfoActions } from '@/enteties/Seller/model/slice/sellerSlice';
import { setPasswordUser } from '@/enteties/User';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ChangePassFormProps {
  onClose?: () => void;
}

interface PassChangeValue {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

const ChangePassBlockSellerForm: FC<ChangePassFormProps> = (props) => {
  const { onClose } = props;
  const errorServer = useAppSelector(sellerInfoHasError);

  const { t } = useTranslation();

  const [passOldShown, setPassOldShown] = useState(false);
  const [passNewShown, setPassNewShown] = useState(false);
  const [passConfirmShown, setPassConfirmShown] = useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<PassChangeValue>({
    mode: 'all',
  });

  const onSubmitChangePass: SubmitHandler<PassChangeValue> = async (data) => {
    if (data.newPassword !== data.confirmationPassword) {
      setError('confirmationPassword', {
        message: t('Пароль введено не вірно'),
      });
    } else {
      await dispatch(
        setPasswordUser({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      ).then((value) => {
        if (value.meta.requestStatus !== 'rejected') {
          reset();
          if (onClose) {
            onClose();
          }
          dispatch(sellerInfoActions.resetError());
        }
      });
    }
  };

  useEffect(() => {
    setError('oldPassword', {
      message: errorServer?.includes('400') ? 'Пароль введено не вірно' : '',
    });
  }, [setError, handleSubmit, errorServer, t]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitChangePass)}
      className="flex flex-col gap-6 md:gap-9 w-full"
    >
      <VStack align="center" justify="between">
        <Text
          Tag="p"
          text={t('Змінити пароль')}
          size="2xl"
          bold
          className="leading-[30px] md:leading-[24px] md:text-[32px] text-main-white"
        />
        <Icon
          clickable
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          Svg={cancel}
          width={24}
          height={24}
          className="fill-main-white hover:transition hover:rotate-90 hover:duration-300 duration-300"
        />
      </VStack>
      <HStack className="w-full gap-[18px] md:gap-6">
        <div className="relative w-full">
          <Input
            variant="personal"
            className="min-h-[48px] w-full"
            placeholder={t('Старий пароль')}
            type={passOldShown ? 'text' : 'password'}
            {...register('oldPassword', {
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
            error={errors?.oldPassword && errors?.oldPassword.message}
          />
          <Icon
            clickable
            onClick={() => {
              setPassOldShown(!passOldShown);
            }}
            Svg={passOldShown ? privateEye : unPrivateEye}
            width={24}
            height={24}
            className="absolute top-[12px] right-[12px] fill-main-white"
          />
        </div>
        <div className="relative w-full">
          <Input
            variant="personal"
            className="min-h-[48px] w-full"
            placeholder={t('Новий пароль')}
            type={passNewShown ? 'text' : 'password'}
            {...register('newPassword', {
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
            error={errors?.newPassword && errors?.newPassword.message}
          />
          <Icon
            clickable
            onClick={() => {
              setPassNewShown(!passNewShown);
            }}
            Svg={passNewShown ? privateEye : unPrivateEye}
            width={24}
            height={24}
            className="absolute top-[12px] right-[12px] fill-main-white"
          />
        </div>
        <div className="relative w-full">
          <Input
            variant="personal"
            className="min-h-[48px] w-full"
            placeholder={t('Підтвердження пароля')}
            type={passConfirmShown ? 'text' : 'password'}
            {...register('confirmationPassword', {
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
            error={errors?.confirmationPassword && errors?.confirmationPassword.message}
          />
          <Icon
            clickable
            onClick={() => {
              setPassConfirmShown(!passConfirmShown);
            }}
            Svg={passConfirmShown ? privateEye : unPrivateEye}
            width={24}
            height={24}
            className="absolute top-[12px] right-[12px] fill-main-white"
          />
        </div>
      </HStack>
      <Input
        variant="clear"
        value={t('Зберегти')}
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="cursor-pointer outfit bg-main min-w-full py-[4px] rounded-lg font-normal text-[18px] leading-[40px] text-main-dark duration-300 hover:bg-secondary-yellow active:bg-main disabled:cursor-default disabled:text-main-white disabled:bg-disabled"
      />
    </form>
  );
};

export default ChangePassBlockSellerForm;
