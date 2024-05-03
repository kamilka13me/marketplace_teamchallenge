import React, { FC, Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';

import { InputsSellerValues } from '@/features/userAuth/ui/SellerRegistrationForm/SellerRegistrationForm';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import checked from '@/shared/assets/icons/checked-thin.svg?react';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const PrivateBlockSellerForm: FC = () => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState<number>(0);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<InputsSellerValues>();

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

  const renderCompanyData = () => (
    <HStack gap="5" className="w-full">
      <Text
        Tag="p"
        text={t('Дані компанії')}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      <Input
        variant="basic"
        placeholder={t('Юридична назва компанії')}
        type="text"
        autoComplete="off"
        className="min-h-[48px] w-full"
        classNameBlockWrap="w-full"
        {...register('legalName', {
          required: t("Це поле є обов'язковим"),
        })}
        error={errors?.legalName && errors?.legalName.message}
      />
      <Input
        variant="basic"
        placeholder={t('Юридична адреса')}
        type="text"
        autoComplete="off"
        className="min-h-[48px] w-full"
        classNameBlockWrap="w-full"
        {...register('legalAddress', {
          required: t("Це поле є обов'язковим"),
        })}
        error={errors?.legalAddress && errors?.legalAddress.message}
      />
      <VStack align="start" gap="5" className="w-full">
        <Input
          variant="basic"
          placeholder={t('Місто, область')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('city', {
            required: t("Це поле є обов'язковим"),
          })}
          error={errors?.city && errors?.city.message}
        />
        <Input
          variant="basic"
          placeholder={t('Індекс')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('cityIndex', {
            required: t("Це поле є обов'язковим"),
            pattern: {
              value: /^\d+$/,
              message: t('Дозволені тільки числа'),
            },
          })}
          error={errors?.cityIndex && errors?.cityIndex.message}
        />
      </VStack>
      <VStack align="start" gap="5" className="w-full">
        <Input
          variant="basic"
          placeholder={t('ЄДРПОУ')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('idStateRegister', {
            required: t("Це поле є обов'язковим"),
            pattern: {
              value: /^\d+$/,
              message: t('Дозволені тільки числа'),
            },
          })}
          error={errors?.idStateRegister && errors?.idStateRegister.message}
        />
        <Input
          variant="basic"
          placeholder={t('ІПН')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          {...register('identificNumber', {
            required: t("Це поле є обов'язковим"),
            pattern: {
              value: /^\d+$/,
              message: t('Дозволені тільки числа'),
            },
          })}
          error={errors?.identificNumber && errors?.identificNumber.message}
        />
      </VStack>
      <Checkbox
        type="checkbox"
        classNameWrapper="gap-3"
        classNameLabel="text-selected-dark text-[14px] leading-[18px]"
        className="border-2 border-disabled rounded-[3px] hover:border-dark-grey checked:border-dark-grey checked:hover:border-dark-grey focus:outline-none"
        classNameIcon="w-4 ml-1"
        icon={checked}
        label={t('Платник ПДВ')}
        {...register('tax', {
          required: false,
        })}
      />
    </HStack>
  );

  const renderContacts = () => (
    <HStack gap="5" className="w-full">
      <Text
        Tag="p"
        text={t('Контакти')}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      <div className="w-full">
        {contactFields.map((field, index) => (
          <HStack key={field.id} gap="4" className="w-full">
            <VStack align="start" gap="5" className="w-full">
              {/* PHONE NUMBER */}
              <HStack gap="1" className="w-full">
                <Controller
                  name={`contacts.${index}.phone`}
                  control={control}
                  rules={{
                    required: t("Це поле є обов'язковим"),
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      defaultCountry="ua"
                      defaultMask=".........."
                      placeholder={t('Номер телефону')}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="border-b-[1px] border-gray-900 w-full"
                      inputClassName="!outfit !min-h-[48px] !min-w-[100px] !pl-4 !bg-transparent !placeholder:text-disabled !text-[16px] !text-main-dark !font-normal !border-none !focus:text-main-dark !outline-none"
                      countrySelectorStyleProps={{
                        className: '!hidden',
                        buttonClassName: '!bg-transparent !min-h-[48px] !border-none',
                      }}
                    />
                  )}
                />
                {errors?.contacts?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.contacts?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>

              {/* CONTACT PERSON */}
              <Input
                variant="basic"
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
            </VStack>
            <VStack align="center" justify="between" className="w-full">
              <Button
                disabled={contactFields.length === 3}
                variant="clear"
                className="outfit text-blue text-[14px] leading-[18px] font-semibold border-b-blue border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendCont}
              >
                {t('Додати  ще телефон')}
              </Button>
              <Button
                disabled={contactFields.length === 1}
                variant="clear"
                className="outfit text-selected-dark text-[14px] leading-[18px] font-semibold border-b-selected-dark border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={() => removeCont(index)}
              >
                {t('Видалити')}
              </Button>
            </VStack>
          </HStack>
        ))}
      </div>
    </HStack>
  );

  const renderCommunicationMethods = () => (
    <HStack gap="5" className="w-full">
      <Text
        Tag="p"
        text={t('Інші методи зв’язку')}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      <div className="w-full">
        {communicationFields.map((field, index) => (
          <HStack key={field.id} gap="4" className="w-full">
            <VStack align="start" gap="5" className="w-full">
              {/* MESSENGER LIST */}
              <div className="relative w-full">
                <Controller
                  name={`communication.${index}.messenger`}
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Listbox value={field.value} onChange={field.onChange}>
                      {({ open }) => (
                        <>
                          <Listbox.Button className="relative w-full rounded-t-lg border-b-[1px] border-gray-900 bg-transparent px-4 py-3">
                            <VStack align="center" gap="4">
                              <Text
                                className={
                                  field.value === ''
                                    ? '!text-disabled'
                                    : 'text-selected-dark'
                                }
                                Tag="p"
                                text={
                                  field.value === '' ? t('Обрати зі списку') : field.value
                                }
                                size="md"
                              />
                              <Icon
                                Svg={arrow}
                                className={`ml-auto fill-selected-dark ${open ? '-rotate-90' : 'rotate-90'}`}
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
                              className="absolute h-auto w-full overflow-auto rounded-b-lg border-x-[1px] border-b-[1px] border-gray-900 bg-main-white z-40"
                              static
                            >
                              {messengersList.map((value, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={value}
                                  className="relative flex px-4 py-3 outfit text-[16px] text-disabled font-normal leading-[24px] cursor-pointer hover:text-selected-dark hover:bg-disabled focus:text-selected-dark focus:bg-disabled"
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
                    <PhoneInput
                      defaultCountry="ua"
                      defaultMask=".........."
                      placeholder={t('Номер телефону')}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="border-b-[1px] border-gray-900 w-full"
                      inputClassName="!outfit !min-h-[48px] !min-w-[100px] !pl-4 !bg-transparent !placeholder:text-disabled !text-[16px] !text-main-dark !font-normal !border-none !focus:text-main-dark !outline-none"
                      countrySelectorStyleProps={{
                        className: '!hidden',
                        buttonClassName: '!bg-transparent !min-h-[48px] !border-none',
                      }}
                    />
                  )}
                />
                {errors?.communication?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.communication?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>
            </VStack>
            <VStack align="center" justify="between" className="w-full">
              <Button
                disabled={communicationFields.length === 3}
                variant="clear"
                className="outfit text-blue text-[14px] leading-[18px] font-semibold border-b-blue border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendCommunMethods}
              >
                {t('Додати')}
              </Button>
              <Button
                disabled={communicationFields.length === 1}
                variant="clear"
                className="outfit text-selected-dark text-[14px] leading-[18px] font-semibold border-b-selected-dark border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={() => removeCommunMethods(index)}
              >
                {t('Видалити')}
              </Button>
            </VStack>
          </HStack>
        ))}
      </div>
    </HStack>
  );

  return (
    <HStack justify="start" className="w-full gap-9">
      <Text
        Tag="p"
        text={t('Інформація про компанію')}
        bold
        size="2xl"
        className="leading-[30px] text-selected-dark"
      />

      {renderCompanyData()}
      {renderContacts()}
      {renderCommunicationMethods()}

      <HStack className="w-full">
        <Text
          Tag="p"
          text={t('Дані компанії')}
          size="xl"
          className="leading-[26px] text-selected-dark mb-5"
        />
        <Input
          variant="basic"
          placeholder={t('Опишіть діяльність та досягнення')}
          type="text"
          autoComplete="off"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full mb-2"
          {...register('descriptCompany', {
            required: true,
            minLength: 70,
            onChange: (e) => {
              setQuantity(e.target.value.length);
            },
          })}
          maxLength={200}
          error={errors?.descriptCompany && errors?.descriptCompany.message}
        />
        <VStack align="center" justify="between" className="w-full">
          <Text
            Tag="p"
            text={t('Введіть щонайменше 70 символів')}
            size="xs"
            className="!text-selected-dark"
          />
          <Text
            Tag="p"
            text={`${quantity}/200`}
            size="xs"
            className="!text-selected-dark"
          />
        </VStack>
      </HStack>
    </HStack>
  );
};

export default PrivateBlockSellerForm;
