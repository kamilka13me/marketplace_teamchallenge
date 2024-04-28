import React, { FC, useEffect, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Textarea } from '@/shared/ui/Textarea';

const FormMiddleBlock: FC = () => {
  const { t } = useTranslation();

  const [descriptionLetters, setDescriptionLetters] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [specificationLengths, setSpecificationLengths] = useState<number[]>([]);

  const {
    getValues,
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields,
    remove,
    append: appendSpecification,
  } = useFieldArray({
    control,
    name: `specifications`,
  });

  const appendSpec = () => {
    appendSpecification({ specification: '', specificationDescription: '' });
  };

  useEffect(() => {
    register('discountStart', {
      validate: {
        startDateValidation: (value) => {
          const startDate = new Date(value);
          const today = new Date();

          today.setHours(0, 0, 0, 0); // Set today's date to midnight
          if (startDate < today) {
            return 'Start date must be today or later';
          }

          return true;
        },
        endDateValidation: (value, allValues) => {
          const startDate = new Date(allValues.discountStart);
          const endDate = new Date(value);

          if (endDate < startDate) {
            return 'End date cannot be before start date';
          }

          return true;
        },
      },
    });
  }, [register]);

  const updateSpecificationLength = (index: number, length: number) => {
    const updatedLengths = [...specificationLengths];

    updatedLengths[index] = length;
    setSpecificationLengths(updatedLengths);
  };

  const removeSpec = (indexToRemove: number) => {
    remove(indexToRemove);
    setSpecificationLengths((prevLengths) =>
      prevLengths.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <HStack className="w-full bg-dark-grey px-4 py-6 rounded-2xl">
      {/* PRICE */}
      <VStack gap="4" justify="between" className="w-full">
        <div className="w-full">
          <Text Tag="p" text="Ціна товару" size="md" color="white" />
          <div className="w-full relative">
            <Input
              variant="fill"
              placeholder="Введіть ціну товару"
              type="number"
              autoComplete="off"
              {...register('price', {
                required: true,
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: t('Ціна може бути в форматі 100.00 або 100'),
                },
              })}
              error={errors?.price && (errors?.price.message as string)}
              className="min-h-[48px] w-full pr-14 mt-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Text
              Tag="span"
              text="UAH"
              size="md"
              color="white"
              className="absolute top-[20px] right-4"
            />
          </div>
          <VStack gap="2" align="center" className="mt-2">
            <label htmlFor="all selector" className="relative" aria-label="checkbox">
              <input
                checked={hasDiscount}
                type="checkbox"
                className="peer relative appearance-none cursor-pointer w-6 h-6 border-[2px] border-light-grey rounded focus:outline-none"
                onChange={(event) => {
                  setValue('discount', '0');
                  setValue('discountStart', '');
                  setValue('discountEnd', '');
                  setPriceWithDiscount(0);
                  setHasDiscount(event.target.checked);
                }}
              />
              <span className="absolute text-main-white transition-opacity opacity-0 left-[2px] top-[2px] pointer-events-none peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-[0.1px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <Text
              Tag="span"
              text="Встановити знижку"
              size="md"
              color="white"
              className="-mt-1"
            />
          </VStack>
        </div>
        <div className="w-full">
          <Text Tag="p" text="Кількість товару" size="md" color="white" />
          <div className="w-full relative">
            <Input
              variant="fill"
              placeholder="Введіть кількість товару"
              type="number"
              autoComplete="off"
              {...register('quantity', {
                required: true,
                pattern: {
                  value: /^\d+$/,
                  message: t('Може містити тільки цифри'),
                },
              })}
              className="min-h-[48px] w-full pr-12 mt-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Text
              Tag="span"
              text="од."
              size="md"
              color="white"
              className="absolute top-[20px] right-4"
            />
          </div>
        </div>
      </VStack>

      {/* DISCOUNT */}
      {hasDiscount && (
        <HStack className="w-full">
          <VStack gap="4" justify="between" className="w-full mt-5">
            <div className="w-full">
              <Text Tag="p" text="Відсоток знижки" size="md" color="white" />
              <div className="w-full mt-2 relative">
                <Input
                  variant="fill"
                  placeholder="Введіть відсоток знижки"
                  type="number"
                  autoComplete="off"
                  {...register('discount', {
                    required: hasDiscount,
                  })}
                  onChange={(e) => {
                    const { price } = getValues();

                    const decimalPercentage = Number(e.target.value) / 100;

                    const percentageAmount = price * decimalPercentage;

                    setPriceWithDiscount(price - percentageAmount);
                  }}
                  className="min-h-[48px] w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <Text
                  Tag="span"
                  text="%"
                  size="md"
                  color="white"
                  className="absolute top-[14px] right-4"
                />
              </div>
            </div>
            <div className="w-full">
              <Text Tag="p" text="Нова ціна" size="md" color="white" />
              <div className="w-full mt-2 relative">
                <div className="min-h-[48px] pr-14 w-full flex items-center pl-4 bg-selected-dark rounded-lg">
                  <Text
                    Tag="span"
                    text={priceWithDiscount.toFixed(2).toString()}
                    size="md"
                    color="white"
                  />
                </div>
                <Text
                  Tag="span"
                  text="UAH"
                  size="md"
                  color="white"
                  className="absolute top-[14px] right-4"
                />
              </div>
            </div>
          </VStack>

          <VStack gap="4" justify="between" className="max-w-[467px] w-full mt-5">
            <div className="w-full">
              <Text Tag="p" text="Дата початку" size="md" color="white" />
              <Input
                variant="fill"
                placeholder="ДД/ММ/РРРР"
                type="text"
                autoComplete="off"
                error={errors?.discountStart && (errors?.discountStart.message as string)}
                {...register('discountStart', {
                  required: hasDiscount,
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|30|31)\.(0[1-9]|1[0-2])\.\d{4}$/,
                    message: t(
                      'Дата повинна містити цифри та бути по формату ХХ.ХХ.ХХХХ',
                    ),
                  },
                  validate: {
                    startDateValidation: (value) => {
                      const startDate = new Date(value);
                      const today = new Date();

                      today.setHours(0, 0, 0, 0);
                      if (startDate < today) {
                        return 'Start date must be today or later';
                      }

                      const endDate = new Date(getValues('discountEnd'));

                      if (endDate < startDate) {
                        return 'Кінцева дата не можу бути менша початкової';
                      }

                      return true;
                    },
                  },
                })}
                className="min-h-[48px] w-full mt-1"
              />
            </div>
            <div className="w-full">
              <Text Tag="p" text="Дата завершення" size="md" color="white" />
              <Input
                variant="fill"
                placeholder="ДД/ММ/РРРР"
                type="text"
                autoComplete="off"
                error={errors?.discountEnd && (errors?.discountEnd.message as string)}
                {...register('discountEnd', {
                  required: hasDiscount,
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|30|31)\.(0[1-9]|1[0-2])\.\d{4}$/,
                    message: t(
                      'Дата повинна містити цифри та бути по формату ХХ.ХХ.ХХХХ',
                    ),
                  },
                  validate: {
                    endDateValidation: (value) => {
                      const endDate = new Date(value);
                      const startDate = new Date(getValues('discountStart'));

                      if (endDate < startDate) {
                        return 'Кінцева дата не можу бути менша початкової';
                      }

                      return true;
                    },
                  },
                })}
                className="min-h-[48px] w-full mt-1"
              />
            </div>
          </VStack>
        </HStack>
      )}

      {/* DESCRIPTION */}
      <div className="w-full mt-5">
        <Text Tag="p" text="Опис товару" size="md" color="white" />
        <Textarea
          variant="fill"
          maxLength={200}
          placeholder="Опишіть товар"
          {...register('description', {
            minLength: 16,
            onChange: (e) => {
              setDescriptionLetters(e.target.value.length);
            },
          })}
          className="mt-2 pl-4 pt-2 rounded-lg text-main-white focus:outline-none"
        />
        <VStack align="center" justify="between" className="w-full mt-2">
          <Text
            Tag="p"
            text={t('Введіть щонайменше 16 символів')}
            size="xs"
            className="!text-light-grey"
          />
          <Text
            Tag="p"
            text={`${descriptionLetters}/200`}
            size="xs"
            className="!text-light-grey"
          />
        </VStack>
      </div>

      <div className="w-full mt-5">
        {fields.map((field, index) => (
          <div key={field.id} className="w-full mt-5">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <VStack justify="between" className="mb-2">
                <Text
                  Tag="p"
                  text="Назва характеристики товару"
                  size="md"
                  color="white"
                />

                <Button
                  variant="clear"
                  onClick={() => removeSpec(index)}
                  className="text-disabled border-b-[1px] border-b-disabled"
                >
                  Видалити поле
                </Button>
              </VStack>
              <Input
                variant="fill"
                placeholder="Введіть назву поля"
                type="text"
                maxLength={30}
                {...register(`specifications.${index}.specification`, {
                  required: true,
                  minLength: 16,
                })}
                className="min-h-[48px] w-full"
                onChange={(e) => updateSpecificationLength(index, e.target.value.length)}
              />
              <VStack align="center" justify="between" className="w-full mt-2">
                <Text
                  Tag="p"
                  text={t('Введіть щонайменше 16 символів')}
                  size="xs"
                  className="!text-light-grey"
                />
                <Text
                  Tag="p"
                  text={`${specificationLengths[index] || 0}/30`}
                  size="xs"
                  className="!text-light-grey"
                />
              </VStack>
            </label>
            <div className="mt-3">
              <Text Tag="p" text="Опис характеристики товару" size="md" color="white" />
              <Textarea
                variant="fill"
                placeholder="Опишіть товар"
                {...register(`specifications.${index}.specificationDescription`)}
                className="mt-2 pl-4 pt-2 rounded-lg text-main-white focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="clear"
        className="text-main border-b-[1px] border-main mt-2"
        onClick={appendSpec}
      >
        Додати поле
      </Button>
    </HStack>
  );
};

export default FormMiddleBlock;
