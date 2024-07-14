import React, { FC, Fragment, useEffect, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Category } from '@/enteties/Category';
import CategoryItem from '@/features/createProduct/ui/blocks/first/CategoryItem';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ICondition {
  title: string;
}

interface Props {
  setCategory: (id: string) => void;
  initialCategoryId: string | null;
}

const FirstBlockProductForm: FC<Props> = (props) => {
  const { setCategory, initialCategoryId } = props;

  const {
    register,
    control,
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const { t } = useTranslation();
  const { data } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  const conditions: ICondition[] = [
    { title: t('Новий') },
    { title: t('Вживаний') },
    { title: t('Відновлений') },
  ];

  const [quantity, setQuantity] = useState<number>(0);
  const [currentSub, setCurrentSub] = useState<number | null>(null);
  const [currentSubSub, setCurrentSubSub] = useState<number | null>(null);
  const [categoryMap, setCategoryMap] = useState<Map<string, Category>>(new Map());

  useEffect(() => {
    if (data) {
      const map = new Map<string, Category>();

      data.forEach((category) => {
        map.set(category._id, category);
        category.subcategories.forEach((sub) => {
          map.set(sub._id, sub);
          sub.subcategories.forEach((subSub) => {
            map.set(subSub._id, subSub);
          });
        });
      });
      setCategoryMap(map);
    }
  }, [data]);

  useEffect(() => {
    if (initialCategoryId) {
      const currentCategory = categoryMap.get(initialCategoryId);

      setCategory(initialCategoryId);
      if (currentCategory) {
        setValue('selectSubSubCategory', currentCategory.name);

        if (currentCategory.parentId) {
          const parentCategory = categoryMap.get(currentCategory.parentId);

          if (parentCategory) {
            setValue('selectSubCategory', parentCategory.name);

            if (parentCategory.parentId) {
              const grandParentCategory = categoryMap.get(parentCategory.parentId);

              if (grandParentCategory) {
                setValue('selectCategory', grandParentCategory.name);
              }
            } else {
              setValue('selectCategory', parentCategory.name);
              setValue('selectSubCategory', currentCategory.name);
              setValue('selectSubSubCategory', '');
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategoryId, categoryMap, data, setValue]);

  useEffect(() => {
    if (isSubmitted) {
      setCurrentSub(null);
      setCurrentSubSub(null);
    }
  }, [isSubmitted]);

  const isEmptySub = data && data[currentSub!]?.subcategories.length;

  const isEmptySubSub =
    data && data[currentSub!]?.subcategories[currentSubSub!]?.subcategories.length;

  const renderSelectCategory = () => (
    <HStack gap="2" className="w-full">
      <Text Tag="p" text={t('Категорія')} size="md" color="white" />

      <div className="relative w-full">
        <Controller
          name="selectCategory"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Listbox
              value={field.value}
              onChange={(value) => {
                field.onChange(value.name);
                setCategory(value._id);
                setValue('selectSubCategory', '');
                setValue('selectSubSubCategory', '');
                setCurrentSubSub(null);
              }}
            >
              {({ open }) => (
                <>
                  <Listbox.Button
                    className={`relative w-full ${open ? 'rounded-t-lg' : 'rounded-lg'} bg-selected-dark px-4 py-3`}
                  >
                    <VStack align="center" gap="4">
                      <Text
                        className="!text-disabled"
                        Tag="p"
                        text={field.value === '' ? t('Виберіть категорію') : field.value}
                        size="sm"
                      />
                      <Icon
                        Svg={arrow}
                        className={`ml-auto fill-main-white ${open ? '-rotate-90' : 'rotate-90'}`}
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
                      className="absolute max-h-[528px] w-full overflow-auto rounded-b-lg bg-selected-dark z-40"
                      static
                    >
                      {data?.map((item, index) => (
                        <Listbox.Option
                          key={item._id}
                          value={item}
                          onClick={() => {
                            setCurrentSub(index);
                          }}
                          className="group relative flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-main focus:bg-main"
                        >
                          <CategoryItem category={item} />
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
    </HStack>
  );

  const renderSelectSubCategory = () => (
    <HStack gap="2" className="w-full">
      <Text Tag="p" text={t('Підкатегорія')} size="md" color="white" />

      <div className="relative w-full">
        <Controller
          name="selectSubCategory"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Listbox
              value={field.value}
              onChange={(value) => {
                field.onChange(value.name);
                setCategory(value._id);
                setValue('selectSubSubCategory', '');
              }}
              disabled={currentSub === null}
            >
              {({ open }) => (
                <>
                  <Listbox.Button
                    className={`relative w-full ${open ? 'rounded-t-lg' : 'rounded-lg'}  bg-selected-dark px-4 py-3 disabled:opacity-60`}
                  >
                    <VStack align="center" gap="4">
                      <Text
                        className="!text-disabled"
                        Tag="p"
                        text={
                          field.value === '' ? t('Виберіть підкатегорію') : field.value
                        }
                        size="sm"
                      />
                      <Icon
                        Svg={arrow}
                        className={`ml-auto fill-main-white ${open ? '-rotate-90' : 'rotate-90'}`}
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
                      className="absolute max-h-[528px] w-full overflow-auto rounded-b-lg bg-selected-dark z-40"
                      static
                    >
                      {isEmptySub === 0 ? (
                        <li className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer">
                          Тут поки нічого немає.
                        </li>
                      ) : (
                        data &&
                        data[currentSub!]?.subcategories.map((item, index) => (
                          <Listbox.Option
                            key={item._id}
                            value={item}
                            onClick={() => {
                              setCurrentSubSub(index);
                            }}
                            className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer hover:text-selected-dark hover:bg-main focus:text-selected-dark focus:bg-main"
                          >
                            {item.name}
                          </Listbox.Option>
                        ))
                      )}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
          )}
        />
      </div>
    </HStack>
  );

  const renderSelectSubSubCategory = () => (
    <HStack gap="2" className="w-full">
      <Text Tag="p" text={t('Розділ')} size="md" color="white" />

      <div className="relative w-full">
        <Controller
          name="selectSubSubCategory"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Listbox
              value={field.value}
              onChange={(value) => {
                field.onChange(value.name);
                setCategory(value._id);
              }}
              disabled={currentSubSub === null}
            >
              {({ open }) => (
                <>
                  <Listbox.Button
                    className={`relative w-full ${open ? 'rounded-t-lg' : 'rounded-lg'}  bg-selected-dark px-4 py-3 disabled:opacity-60`}
                  >
                    <VStack align="center" gap="4">
                      <Text
                        className="!text-disabled"
                        Tag="p"
                        text={field.value === '' ? t('Виберіть розділ') : field.value}
                        size="sm"
                      />
                      <Icon
                        Svg={arrow}
                        className={`ml-auto fill-main-white ${open ? '-rotate-90' : 'rotate-90'}`}
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
                      className="absolute max-h-[528px] w-full overflow-auto rounded-b-lg bg-selected-dark z-40"
                      static
                    >
                      {isEmptySubSub === 0 ? (
                        <li className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer">
                          Тут поки нічого немає.
                        </li>
                      ) : (
                        data &&
                        data[currentSub!]?.subcategories[
                          currentSubSub!
                        ]?.subcategories.map((item) => (
                          <Listbox.Option
                            key={item._id}
                            value={item}
                            className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer hover:text-selected-dark hover:bg-main focus:text-selected-dark focus:bg-main"
                          >
                            {item.name}
                          </Listbox.Option>
                        ))
                      )}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
          )}
        />
      </div>
    </HStack>
  );

  const renderSelectConditions = () => (
    <HStack gap="2" className="w-full">
      <Text Tag="p" text={t('Стан товару')} size="md" color="white" />

      <div className="relative w-full">
        <Controller
          name="condition"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Listbox
              value={field.value}
              onChange={(value) => field.onChange(value.title)}
            >
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
                          field.value === '' ? t('Виберіть стан товару') : field.value
                        }
                        size="sm"
                      />
                      <Icon
                        Svg={arrow}
                        className={`ml-auto fill-main-white ${open ? '-rotate-90' : 'rotate-90'}`}
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
                      {conditions.map((value, index) => (
                        <Listbox.Option
                          key={index}
                          value={value}
                          className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] rounded-lg cursor-pointer hover:text-selected-dark hover:bg-main focus:text-selected-dark focus:bg-main"
                        >
                          {value.title}
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
    </HStack>
  );

  return (
    <div className="w-full bg-dark-grey rounded-2xl lg:px-4 lg:py-6 ">
      <HStack gap="2" className="mb-4 lg:mb-5">
        <Text Tag="p" text={t('Назва товару')} size="md" color="white" />
        <Input
          variant="fill"
          className="min-h-[48px] w-full"
          classNameBlockWrap="w-full"
          autoComplete="off"
          placeholder={t('Введіть назву товару')}
          type="text"
          {...register('name', {
            required: t("Це поле є обов'язковим"),
            minLength: {
              value: 16,
              message: t('Ваша назва товару має бути не менше 16 символів'),
            },
            onChange: (e) => {
              setQuantity(e.target.value.length);
            },
          })}
          maxLength={70}
          error={errors?.name && (errors?.name?.message as string)}
        />
        <VStack align="center" justify="between" className="w-full">
          <Text
            Tag="p"
            text={t('Введіть щонайменше 16 символів')}
            size="xs"
            className="!text-light-grey"
          />
          <Text Tag="p" text={`${quantity}/70`} size="xs" className="!text-light-grey" />
        </VStack>
      </HStack>

      <HStack align="center" gap="4" className="lg:flex lg:flex-row w-full mb-4 lg:mb-5">
        {renderSelectCategory()}
        {renderSelectSubCategory()}
        {renderSelectSubSubCategory()}
      </HStack>

      <HStack align="start" gap="4" className="lg:flex lg:flex-row w-full">
        {renderSelectConditions()}
        <HStack gap="2" className="w-full">
          <Text Tag="p" text={t('Бренд')} size="md" color="white" />
          <Input
            variant="fill"
            className="min-h-[48px] w-full"
            classNameBlockWrap="w-full"
            autoComplete="off"
            placeholder={t('Введіть назву')}
            type="text"
            {...register('brand', {
              required: false,
              maxLength: {
                value: 30,
                message: t('Ваша назва бренду не повинна перевищувати 30 символів'),
              },
            })}
            error={errors?.brand && (errors?.brand?.message as string)}
          />
        </HStack>
      </HStack>
    </div>
  );
};

export default FirstBlockProductForm;
