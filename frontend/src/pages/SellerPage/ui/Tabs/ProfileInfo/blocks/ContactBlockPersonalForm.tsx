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

const ContactBlockPersonalForm: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Seller>();

  const {
    fields: contactFields,
    remove: removeContact,
    append: appendContact,
  } = useFieldArray({
    control,
    name: `contacts`,
  });

  const {
    fields: communicationFields,
    remove: removeMethods,
    append: appendMethods,
  } = useFieldArray({
    control,
    name: `communication`,
  });

  const messengersList: string[] = ['Telegram', 'Viber', 'WhatsUp'];

  const appendCont = () => {
    appendContact({ phone: '', person: '' });
  };

  const removeCont = (indexToRemove: number) => {
    removeContact(indexToRemove);
  };

  const appendCommunMethods = () => {
    appendMethods({ messenger: '', phone: '' });
  };

  const removeCommunMethods = (indexToRemove: number) => {
    removeMethods(indexToRemove);
  };

  const renderContacts = () => (
    <HStack className="w-full gap-6 lg:gap-5">
      <Text
        Tag="p"
        text={t('Контакти')}
        size="xl"
        className="leading-[26px] text-main-white"
      />
      <HStack className="w-full gap-6 lg:gap-5">
        {contactFields.map((field, index) => (
          <HStack key={field.id} gap="2" className="w-full">
            <HStack align="start" className="w-full lg:flex-row gap-3 lg:gap-4">
              {/* PHONE NUMBER */}
              <HStack gap="1" className="w-full">
                <Controller
                  name={`contacts.${index}.phone`}
                  control={control}
                  rules={{
                    required: t("Це поле є обов'язковим"),
                  }}
                  render={({ field }) => (
                    <HStack className="w-full gap-1 lg:gap-2">
                      <Text Tag="p" text={t('Teлефон')} size="md" color="white" />
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
                    </HStack>
                  )}
                />
                {errors?.contacts?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.contacts?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>

              {/* CONTACT PERSON */}
              <HStack className="w-full gap-1 lg:gap-2">
                <Text Tag="p" text={t('Контактна особа')} size="md" color="white" />
                <VStack align="center" gap="4" justify="start" className="w-full">
                  <Input
                    variant="fill"
                    placeholder={t('Контактна особа ПІБ')}
                    type="text"
                    autoComplete="off"
                    className="min-h-[48px] w-full"
                    classNameBlockWrap="w-full"
                    {...register(`contacts.${index}.person`, {
                      required: t("Це поле є обов'язковим"),
                    })}
                    error={
                      errors?.contacts?.[index]?.person &&
                      errors?.contacts?.[index]?.person?.message
                    }
                  />
                  <Button
                    disabled={contactFields.length === 1}
                    variant="clear"
                    className="stroke-main disabled:stroke-disabled"
                    onClick={() => removeCont(index)}
                  >
                    <Icon Svg={trash} width={24} height={24} />
                  </Button>
                </VStack>
              </HStack>
            </HStack>
            <VStack align="center" justify="start" className="w-full">
              <Button
                disabled={contactFields.length === 3}
                variant="clear"
                className="outfit text-main text-[14px] leading-[18px] font-normal border-b-main border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendCont}
              >
                {t('Додати телефон')}
              </Button>
            </VStack>
          </HStack>
        ))}
      </HStack>
    </HStack>
  );

  const renderCommunicationMethods = () => (
    <HStack className="w-full gap-6 lg:gap-5">
      <Text
        Tag="p"
        text={t('Інші методи зв’язку')}
        size="xl"
        className="leading-[26px] text-main-white"
      />
      <HStack className="w-full gap-6 lg:gap-5">
        {communicationFields.map((field, index) => (
          <HStack key={field.id} gap="2" className="w-full">
            <HStack align="start" className="w-full sm:flex-row gap-3 lg:gap-4">
              {/* MESSENGER LIST */}
              <div className="relative w-full">
                <Controller
                  name={`communication.${index}.messenger`}
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
                  name={`communication.${index}.phone`}
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
                        disabled={communicationFields.length === 1}
                        variant="clear"
                        className="stroke-main disabled:stroke-disabled"
                        onClick={() => removeCommunMethods(index)}
                      >
                        <Icon Svg={trash} width={24} height={24} />
                      </Button>
                    </VStack>
                  )}
                />
                {errors?.communication?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.communication?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>
            </HStack>
            <VStack align="center" justify="start" className="w-full">
              <Button
                disabled={communicationFields.length === 3}
                variant="clear"
                className="outfit text-main text-[14px] leading-[18px] font-normal border-b-main border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendCommunMethods}
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
      className="w-full bg-dark-grey rounded-2xl lg:px-4 lg:py-6 gap-9"
    >
      {renderContacts()}
      {renderCommunicationMethods()}
    </HStack>
  );
};

export default ContactBlockPersonalForm;
