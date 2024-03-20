import { ChangeEvent, FC, useEffect, useState } from 'react';
import 'react-international-phone/style.css';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';

import { setInformationUser, setPasswordUser, userActions } from '@/enteties/User';
import {
  getUserAuthData,
  userHasError,
} from '@/enteties/User/model/selectors/getUserAuthData';
import privateEye from '@/shared/assets/icons/private-eye-white.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye-white.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface InputsInformationValues {
  inputName: string;
  inputSurname: string;
  inputDateBirth: string;
  inputEmail: string;
  inputPhone: string;
}

interface InputsPasswordValues {
  inputOldPassword: string;
  inputNewPassword: string;
  inputConfirmationPassword: string;
}

const PersonalDataForms: FC = () => {
  const user = useAppSelector(getUserAuthData);
  const errorServer = useAppSelector(userHasError);

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [dateValue, setDateValue] = useState<string>('');
  const [passOldShown, setPassOldShown] = useState(false);
  const [passNewShown, setPassNewShown] = useState(false);
  const [passConfirmShown, setPassConfirmShown] = useState(false);
  const [sendChangePassForm, setSendChangePassForm] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
    control,
  } = useForm<InputsInformationValues & InputsPasswordValues>({
    mode: 'all',
    defaultValues: {
      inputName: user?.username,
      inputSurname: user?.surname,
      inputDateBirth: user?.dob,
      inputEmail: user?.email,
      inputPhone: user?.phoneNumber || '',
      inputOldPassword: '',
      inputNewPassword: '',
      inputConfirmationPassword: '',
    },
  });

  const onSubmit: SubmitHandler<InputsInformationValues & InputsPasswordValues> = async (
    data,
  ) => {
    if (
      data.inputConfirmationPassword === '' ||
      data.inputNewPassword === '' ||
      data.inputOldPassword === ''
    ) {
      await dispatch(
        setInformationUser({
          username: data.inputName,
          surname: data.inputSurname,
          dob: data.inputDateBirth,
          phoneNumber: data.inputPhone,
        }),
      ).then((value) => {
        if (value.meta.requestStatus !== 'rejected') {
          setShowModal(!showModal);
        }
      });
    } else if (data.inputNewPassword !== data.inputConfirmationPassword) {
      setError('inputConfirmationPassword', {
        message: t('Пароль введено не вірно'),
      });
    } else {
      await dispatch(
        setPasswordUser({
          oldPassword: data.inputOldPassword,
          newPassword: data.inputNewPassword,
        }),
      ).then((value) => {
        if (value.meta.requestStatus !== 'rejected') {
          reset({
            inputOldPassword: '',
            inputNewPassword: '',
            inputConfirmationPassword: '',
          });
          setShowModal(!showModal);
          setSendChangePassForm(true);
          dispatch(userActions.resetError());
        }
      });
    }
  };

  useEffect(() => {
    setError('inputOldPassword', {
      message: errorServer?.includes('400') ? 'Пароль введено не вірно' : '',
    });

    let timeout: NodeJS.Timeout;

    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [setError, handleSubmit, errorServer, t, showModal]);

  const addDots = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (value.length === 2 && value.length > dateValue.length) {
      value += '.';
    } else if (value.length === 5 && value.length > dateValue.length) {
      value += '.';
    } else if (value.length === 3 && value.length < dateValue.length) {
      value = value.slice(0, 2);
    } else if (value.length === 7 && value.length < dateValue.length) {
      value = value.slice(0, 5);
    }

    // eslint-disable-next-line no-param-reassign
    e.target.value = value;
    setDateValue(value);
  };

  const onPassOldVisibility = () => {
    setPassOldShown(!passOldShown);
  };

  const onPassNewVisibility = () => {
    setPassNewShown(!passNewShown);
  };

  const onPassConfirmVisibility = () => {
    setPassConfirmShown(!passConfirmShown);
  };

  return (
    <div className="bg-gray-400 rounded-2xl px-[38px] pb-[38px] pt-[72px] min-h-[568px] overflow-hidden relative z-10">
      <div className="w-[370px] h-[370px] bg-primary opacity-40 blur-[100px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-20" />
      <VStack className="gap-[48px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[414px] py-[42px] px-12 bg-gray-950 rounded-2xl">
            <Input
              variant="personal"
              autoComplete="off"
              placeholder={t("Ім'я")}
              type="text"
              {...register('inputName', {
                required: t("Це поле є обов'язковим"),
                minLength: {
                  value: 3,
                  message: t("Ваше ім'я має бути не менше 3 символів"),
                },
                maxLength: {
                  value: 15,
                  message: t("Ваше ім'я має бути не більше 15 символів"),
                },
                pattern: {
                  value: /^[A-Za-zҐґЄєІіЇїА-Яа-я]+$/,
                  message: t(
                    "Ваше ім'я може включати тільки українські або англійські літери",
                  ),
                },
              })}
              error={errors?.inputName && errors?.inputName.message}
            />
            <Input
              variant="personal"
              autoComplete="off"
              placeholder={t('Прізвище')}
              type="text"
              {...register('inputSurname', {
                required: false,
                minLength: {
                  value: 3,
                  message: t('Ваше прізвище має бути не менше 3 символів'),
                },
                maxLength: {
                  value: 25,
                  message: t('Ваше прізвище має бути не більше 25 символів'),
                },
                pattern: {
                  value: /^[A-Za-zҐґЄєІіЇїА-Яа-я]+$/,
                  message: t(
                    'Ваше прізвище може включати тільки українські або англійські літери',
                  ),
                },
              })}
              error={errors?.inputSurname && errors?.inputSurname.message}
              className="mt-8"
            />
            <Input
              variant="personal"
              autoComplete="off"
              placeholder={t('Дата народження')}
              type="text"
              {...register('inputDateBirth', {
                required: false,
                pattern: {
                  value: /^(0[1-9]|[12][0-9]|30|31)\.(0[1-9]|1[0-2])\.\d{4}$/,
                  message: t('Дата повинна містити цифри та бути по формату ХХ.ХХ.ХХХХ'),
                },
                onChange: addDots,
              })}
              error={errors?.inputDateBirth && errors?.inputDateBirth.message}
              className="mt-8"
            />
            <Input
              variant="personal"
              placeholder="Email"
              type="text"
              {...register('inputEmail', {
                disabled: true,
              })}
              error={errors?.inputEmail && errors?.inputEmail.message}
              className="mt-8"
            />
            <HStack gap="1">
              <Controller
                name="inputPhone"
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="ua"
                    defaultMask=".........."
                    placeholder={t('Телефон')}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    className="mt-8 border-b-[1px] border-white-transparent-70"
                    inputClassName="!outfit !min-h-[48px] !min-w-[275px] !pl-4 !bg-transparent !placeholder:white-transparent-70 !text-[16px] !text-white-transparent-70 !font-normal !border-none !focus:text-white-transparent-70 !outline-none"
                    countrySelectorStyleProps={{
                      buttonClassName: '!bg-transparent !min-h-[48px] !border-none',
                      dropdownStyleProps: {
                        className: '!max-h-[84px] !bg-gray-400 !border-none',
                        listItemClassName: 'focus:!bg-gray-950 hover:!bg-gray-950',
                        listItemCountryNameClassName: 'text-white-transparent-70',
                        listItemStyle: {
                          '--react-international-phone-selected-dropdown-item-background-color':
                            '#1D1D1D',
                        } as never,
                      },
                    }}
                  />
                )}
              />
              {errors?.inputPhone && (
                <p className="outfit font-normal text-[12px] text-red-200">
                  {errors?.inputPhone.message}
                </p>
              )}
            </HStack>
          </div>
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack align="end" className="min-h-[452px]" justify="between">
            <div className="max-w-[444px] p-[42px] bg-gray-950 rounded-2xl">
              <div className="relative mb-[34px]">
                <Input
                  variant="personal"
                  placeholder={t('Старий пароль')}
                  type={passOldShown ? 'text' : 'password'}
                  {...register('inputOldPassword', {
                    required: false,
                    minLength: {
                      value: 9,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити мінімум 9 символів, включаючи велику латинську літеру',
                      ),
                    },
                  })}
                  error={errors?.inputOldPassword && errors?.inputOldPassword.message}
                  className="min-w-[360px]"
                />
                <Icon
                  clickable
                  onClick={onPassOldVisibility}
                  Svg={passOldShown ? privateEye : unPrivateEye}
                  width={24}
                  height={24}
                  className="opacity-70 absolute top-[12px] right-[12px]"
                />
              </div>
              <div className="relative mb-[34px]">
                <Input
                  variant="personal"
                  placeholder={t('Новий пароль')}
                  type={passNewShown ? 'text' : 'password'}
                  {...register('inputNewPassword', {
                    required: false,
                    minLength: {
                      value: 9,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити мінімум 9 символів, включаючи велику латинську літеру',
                      ),
                    },
                  })}
                  error={errors?.inputNewPassword && errors?.inputNewPassword.message}
                  className="min-w-[360px]"
                />
                <Icon
                  clickable
                  onClick={onPassNewVisibility}
                  Svg={passNewShown ? privateEye : unPrivateEye}
                  width={24}
                  height={24}
                  className="opacity-70 absolute top-[12px] right-[12px]"
                />
              </div>
              <div className="relative">
                <Input
                  variant="personal"
                  placeholder={t('Підтвердження пароля')}
                  type={passConfirmShown ? 'text' : 'password'}
                  {...register('inputConfirmationPassword', {
                    required: false,
                    minLength: {
                      value: 9,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити мінімум 9 символів, включаючи велику латинську літеру',
                      ),
                    },
                  })}
                  error={
                    errors?.inputConfirmationPassword &&
                    errors?.inputConfirmationPassword.message
                  }
                  className="min-w-[360px]"
                />
                <Icon
                  clickable
                  onClick={onPassConfirmVisibility}
                  Svg={passConfirmShown ? privateEye : unPrivateEye}
                  width={24}
                  height={24}
                  className="opacity-70 absolute top-[12px] right-[12px]"
                />
              </div>
            </div>

            <div
              className={
                showModal
                  ? 'block bg-gray-400 py-[21px] px-3 rounded-lg drop-shadow-custom-user-info relative animate-open-info-modal'
                  : 'opacity-0 duration-500'
              }
            >
              <Text
                Tag="p"
                text={
                  sendChangePassForm
                    ? t('Ваш пароль успішно змінено')
                    : t('Дані успішно змінено')
                }
                size="sm"
                className="leading-[18px] text-white"
              />
              <div className="absolute bottom-0 right-[10px] transform -translate-x-0 translate-y-[8px] border-x-8 border-t-8 border-transparent border-t-gray-400" />
            </div>

            <button
              className="outfit bg-primary px-[124px] py-[15px] rounded-lg font-normal leading-[22px] text-[16px] text-gray-900 duration-300 hover:bg-secondary active:bg-primary disabled:opacity-40"
              type="submit"
              disabled={!isValid}
            >
              {t('Зберегти')}
            </button>
          </HStack>
        </form>
      </VStack>
    </div>
  );
};

export default PersonalDataForms;
