import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SelectDateCalendar from './blocks/first/SelectSateCalendar';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Textarea } from '@/shared/ui/Textarea';

interface Props {
  hasDiscount: boolean;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  discountValidationMessage: string;
}

const FormMiddleBlock: FC<Props> = (props) => {
  const {
    hasDiscount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    discountValidationMessage,
  } = props;

  const { t } = useTranslation();

  const [descriptionLetters, setDescriptionLetters] = useState(0);
  const [productHasDiscount, setProductHasDiscount] = useState(hasDiscount);
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

  useEffect(() => {
    const values = getValues();

    if (productHasDiscount) {
      const decimalPercentage = Number(values.discount) / 100;

      const percentageAmount = values.price * decimalPercentage;

      setPriceWithDiscount(values.price - percentageAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendSpec = () => {
    appendSpecification({ specification: '', specificationDescription: '' });
  };

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
    <HStack className="w-full bg-dark-grey lg:px-4 lg:py-6 rounded-2xl">
      {/* PRICE */}
      <HStack gap="4" justify="between" className="lg:flex lg:flex-row w-full">
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
                checked={productHasDiscount}
                type="checkbox"
                className="peer relative appearance-none cursor-pointer w-6 h-6 border-[2px] border-light-grey rounded focus:outline-none"
                onChange={(event) => {
                  setValue('discount', '0');
                  setValue('discountStart', '');
                  setValue('discountEnd', '');
                  setPriceWithDiscount(0);
                  setProductHasDiscount(event.target.checked);
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
        <div className="order-first lg:order-last w-full">
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
      </HStack>

      {/* DISCOUNT */}
      {productHasDiscount && (
        <HStack className="w-full">
          <HStack
            gap="4"
            justify="between"
            className="lg:flex lg:flex-row w-full mt-4 lg:mt-5"
          >
            <div className="w-full">
              <Text Tag="p" text="Відсоток знижки" size="md" color="white" />
              <div className="w-full mt-2 relative">
                <Input
                  variant="fill"
                  placeholder="Введіть відсоток знижки"
                  type="number"
                  autoComplete="off"
                  error={errors?.discount && (errors?.discount.message as string)}
                  {...register('discount', {
                    required: hasDiscount,
                    min: {
                      value: 1,
                      message: 'Знижка не може бути менше 1%',
                    },
                    max: {
                      value: 99,
                      message: 'Знижка не може бути більше 99%',
                    },
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
          </HStack>

          <VStack
            gap="4"
            justify="between"
            className="max-w-[467px] w-full mt-5 relative"
          >
            <div className="w-full">
              <Text Tag="p" text="Дата початку" size="md" color="white" />
              <SelectDateCalendar date={startDate} setDate={setStartDate} />
            </div>
            <div className="w-full">
              <Text Tag="p" text="Дата завершення" size="md" color="white" />
              <SelectDateCalendar date={endDate} setDate={setEndDate} />
            </div>
          </VStack>
          <div className="w-full text-[12px] text-error-red">
            {discountValidationMessage}
          </div>
        </HStack>
      )}

      {/* DESCRIPTION */}
      <div className="w-full mt-4 lg:mt-5">
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

      <div className="w-full">
        {fields.map((field, index) => (
          <div key={field.id} className="w-full mt-4 lg:mt-5">
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
                  className="min-w-[108px] text-disabled border-b-[1px] border-b-disabled"
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
        disabled={fields.length === 15}
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
