/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import CategorySelector from './components/CategorySelector';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const AdminManagingCategory: FC = () => {
  const { data: categoryData } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<Category | null>(
    null,
  );
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);

  const addNewCategory = () => {
    console.log('addNewCategory');
  };

  const addNewSubCategory = () => {
    console.log('addNewSubCategory');
  };

  const addNewSubSubCategory = () => {
    console.log('addNewSubSubCategory');
  };

  const handleSave = () => {
    console.log('handleSave');
  };

  console.log(categoryData);

  return (
    <div className="flex flex-col gap-[16px] items-start justify-between w-full bg-dark-grey rounded-2xl p-[16px]">
      <Text
        Tag="span"
        text="Додавання категорій, підкатегорій та розділів"
        color="white"
        size="xl"
        className="font-semibold"
      />

      <Text
        Tag="span"
        text="Для створення нового розділу або категорію, зробіть вибір."
        color="gray-light"
        size="lg"
        className="font-normal"
      />

      <div className="flex flex-col gap-[8px] items-start justify-between">
        {/* --------------Категорія----------------- */}
        <div className="flex flex-row items-center justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Категорія"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />
          <CategorySelector
            categoryArr={categoryData}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            addButton={{ text: 'Додати нову категорію', open: addNewCategory }}
            categoryLimit={11}
          />
          <button type="button" onClick={() => {}}>
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        {/* --------------Підкатегорія----------------- */}
        <div className="flex flex-row items-center justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Підкатегорія"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />
          <CategorySelector
            categoryArr={selectedCategory?.subcategories || null}
            selected={selectedSubcategory}
            setSelected={setSelectedSubcategory}
            addButton={{ text: 'Додати нову підкатегорію', open: addNewSubCategory }}
            categoryLimit={12}
          />
          <button type="button" onClick={() => {}}>
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        {/* --------------Розділ----------------- */}
        <div className="flex flex-row items-center justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Розділ"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />
          <CategorySelector
            categoryArr={selectedSubcategory?.subcategories || null}
            selected={selectedSubSubcategory}
            setSelected={setSelectedSubSubcategory}
            addButton={{ text: 'Додати новий розділ', open: addNewSubSubCategory }}
            categoryLimit={7}
          />
          <button type="button" onClick={() => {}}>
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        <Button
          onClick={handleSave}
          className="h-12 max-w-[282px] w-full justify-self-end"
          variant="primary"
          disabled={!isSaveActive}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );
};

export default AdminManagingCategory;
