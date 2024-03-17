import { ChangeEvent, FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<InputsInformationValues & InputsPasswordValues>({
    mode: 'all',
    defaultValues: {
      inputName: user?.username,
      inputSurname: user?.surname,
      inputDateBirth: user?.dob,
      inputEmail: user?.email,
      inputPhone: user?.phoneNumber,
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
        message: t('Пароль введено не вірно'), // translate
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
              placeholder={t('Прізвище')} // translate
              type="text"
              {...register('inputSurname', {
                required: false,
                minLength: {
                  value: 3,
                  message: t('Ваше прізвище має бути не менше 3 символів'), // translate
                },
                maxLength: {
                  value: 25,
                  message: t('Ваше прізвище має бути не більше 25 символів'), // translate
                },
                pattern: {
                  value: /^[A-Za-zҐґЄєІіЇїА-Яа-я]+$/,
                  message: t(
                    'Ваше прізвище може включати тільки українські або англійські літери', // translate
                  ),
                },
              })}
              error={errors?.inputSurname && errors?.inputSurname.message}
              className="mt-8"
            />
            <Input
              variant="personal"
              autoComplete="off"
              placeholder={t('Дата народження')} // translate
              type="text"
              {...register('inputDateBirth', {
                required: false,
                pattern: {
                  value: /^(0[1-9]|[12][0-9]|30|31)\.(0[1-9]|1[0-2])\.\d{4}$/,
                  message: t(
                    'Дата повинна містити цифри та бути по формату ХХ.ХХ.ХХХХ', // translate
                  ),
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
            <Input
              variant="personal"
              autoComplete="off"
              placeholder={t('Телефон')} // translate
              type="text"
              {...register('inputPhone', {
                required: false,
              })}
              error={errors?.inputPhone && errors?.inputPhone.message}
              className="mt-8"
            />
          </div>
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack align="end" className="min-h-[452px]" justify="between">
            <div className="max-w-[444px] p-[42px] bg-gray-950 rounded-2xl">
              <div className="relative mb-[34px]">
                <Input
                  variant="personal"
                  placeholder={t('Старий пароль')} // translate
                  type={passOldShown ? 'text' : 'password'}
                  {...register('inputOldPassword', {
                    required: false,
                    minLength: {
                      value: 8,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити 9 символів, з яких має бути одна велика літера',
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
                  placeholder={t('Новий пароль')} // translate
                  type={passNewShown ? 'text' : 'password'}
                  {...register('inputNewPassword', {
                    required: false,
                    minLength: {
                      value: 8,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити 9 символів, з яких має бути одна велика літера',
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
                  placeholder={t('Підтвердження пароля')} // translate
                  type={passConfirmShown ? 'text' : 'password'}
                  {...register('inputConfirmationPassword', {
                    required: false,
                    minLength: {
                      value: 8,
                      message: t('Ваш пароль має бути не менше 9 символів'),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/,
                      message: t(
                        'Пароль має містити 9 символів, з яких має бути одна велика літера',
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
                text={t('Ваші дані успішно змінено translate')}
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
              {t('Зберегти')} {/* translate */}
            </button>
          </HStack>
        </form>
      </VStack>
    </div>
  );
};

export default PersonalDataForms;
