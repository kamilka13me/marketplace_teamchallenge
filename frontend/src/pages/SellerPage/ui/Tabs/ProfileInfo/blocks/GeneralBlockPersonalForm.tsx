import React, { FC, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';

import { Seller } from '@/enteties/Seller/model/types/seller';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import trash from '@/shared/assets/icons/trash.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const GeneralBlockPersonalForm: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Seller>();

  const {
    fields: generalCommunFields,
    remove: removeGeneralMethods,
    append: appendGeneralMethods,
  } = useFieldArray({
    control,
    name: `generalCommunication`,
  });

  const messengersList: string[] = ['Telegram', 'Viber', 'WhatsUp'];

  const appendGenMethods = () => {
    appendGeneralMethods({ messenger: '', phone: '' });
  };

  const removeGenMethods = (indexToRemove: number) => {
    removeGeneralMethods(indexToRemove);
  };

  const renderCommunicationMethods = () => (
    <HStack className="w-full gap-6 lg:gap-5">
      <Text
        Tag="p"
        text={t("Контакти для зв'язку з клієнтами")}
        size="xl"
        className="leading-[26px] text-main-white"
      />
      <HStack className="w-full gap-6 lg:gap-5">
        {generalCommunFields.map((field, index) => (
          <HStack key={field.id} gap="2" className="w-full">
            <HStack align="start" className="w-full sm:flex-row gap-3 lg:gap-4">
              {/* MESSENGER LIST */}
              <div className="relative w-full">
                <Controller
                  name={`generalCommunication.${index}.messenger`}
                  control={control}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Listbox value={field.value} onChange={field.onChange}>
                      {({ open }) => (
                        <>
                          <Listbox.Button
                            className={`relative w-full ${open ? 'rounded-t-lg' : 'rounded-lg'}  bg-selected-dark px-4 py-3`}
                          >
                            <VStack align="center" gap="4">
                              <Text
                                className="!text-disabled"
                                Tag="p"
                                text={
                                  field.value === '' ? t('Обрати зі списку') : field.value
                                }
                                size="sm"
                              />
                              <Icon
                                Svg={arrow}
                                className={`ml-auto fill-disabled ${open ? '-rotate-90' : 'rotate-90'}`}
                                width={24}
                                height={24}
                              />
                            </VStack>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-in duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                          >
                            <Listbox.Options
                              className="absolute h-auto w-full overflow-auto rounded-b-lg bg-selected-dark z-40"
                              static
                            >
                              {messengersList.map((value, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={value}
                                  className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer hover:text-selected-dark hover:bg-main focus:text-selected-dark focus:bg-main"
                                >
                                  {value}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </>
                      )}
                    </Listbox>
                  )}
                />
              </div>

              {/* PHONE NUMBER */}
              <HStack gap="1" className="w-full">
                <Controller
                  name={`generalCommunication.${index}.phone`}
                  control={control}
                  rules={{
                    required: t("Це поле є обов'язковим"),
                  }}
                  render={({ field }) => (
                    <VStack align="center" gap="4" justify="start" className="w-full">
                      <PhoneInput
                        defaultCountry="ua"
                        defaultMask=".........."
                        placeholder={t('Номер телефону')}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="border-none w-full"
                        inputClassName="!outfit !w-full !min-h-[48px] !min-w-[100px] !pl-4 !bg-selected-dark !placeholder:text-disabled !text-[14px] !text-disabled !font-normal !border-none !rounded-lg !focus:text-disabled !outline-none"
                        countrySelectorStyleProps={{
                          className: '!hidden',
                          buttonClassName: '!bg-transparent !min-h-[48px] !border-none',
                        }}
                      />
                      <Button
                        disabled={generalCommunFields.length === 1}
                        variant="clear"
                        className="stroke-main disabled:stroke-disabled"
                        onClick={() => removeGenMethods(index)}
                      >
                        <Icon Svg={trash} width={24} height={24} />
                      </Button>
                    </VStack>
                  )}
                />
                {errors?.generalCommunication?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.generalCommunication?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>
            </HStack>
            <VStack align="center" justify="start" className="w-full">
              <Button
                disabled={generalCommunFields.length === 3}
                variant="clear"
                className="outfit text-main text-[14px] leading-[18px] font-normal border-b-main border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendGenMethods}
              >
                {t('Додати')}
              </Button>
            </VStack>
          </HStack>
        ))}
      </HStack>
    </HStack>
  );

  return (
    <HStack
      justify="start"
      className="w-full bg-dark-grey rounded-2xl lg:px-4 lg:py-6 gap-6 lg:gap-5"
    >
      <Text
        Tag="p"
        text={t('Інформація про компанію, доступна на сайті для всіх користувачів')}
        bold
        size="2xl"
        className="leading-[30px] text-main-white text-wrap"
      />

      <HStack className="w-full gap-1 lg:gap-2">
        <Text Tag="p" text={t('Назва компанії')} size="md" color="white" />
        <Input
          variant="fill"
          placeholder={t('Введіть назву компанії')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('generalName', {
            disabled: true,
          })}
        />
      </HStack>

      {renderCommunicationMethods()}
    </HStack>
  );
};

export default GeneralBlockPersonalForm;
