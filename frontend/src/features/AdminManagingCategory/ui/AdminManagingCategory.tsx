/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';

import CategorySelector from './components/CategorySelector';
import DeleteModal from './components/DeleteModal';

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

  const [deleteModalType, setDeleteModalType] = useState<
    'category' | 'subcategory' | 'subsubcategory' | null
  >(null);

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [deleteCategoryArr, setDeleteCategoryArr] = useState<string[]>([]);

  const [subcategoryClick, setSubcategoryClick] = useState<boolean>(false);
  const [subsubcategoryClick, setSubsubcategoryClick] = useState<boolean>(false);

  console.log(categoryData);
  console.log('deleteCategoryArr:', deleteCategoryArr);

  useEffect(() => {
    if (deleteCategoryArr.length > 0) setIsSaveActive(true);
    else setIsSaveActive(false);
  }, [deleteCategoryArr]);

  const deleteCategory = () => {
    if (deleteModalType === 'category' && selectedCategory) {
      setDeleteCategoryArr((prev) => [...prev, selectedCategory?._id]);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSelectedSubSubcategory(null);
    }
    if (deleteModalType === 'subcategory' && selectedSubcategory) {
      setDeleteCategoryArr((prev) => [...prev, selectedSubcategory?._id]);
      setSelectedSubcategory(null);
      setSelectedSubSubcategory(null);
    }
    if (deleteModalType === 'subsubcategory' && selectedSubSubcategory) {
      setDeleteCategoryArr((prev) => [...prev, selectedSubSubcategory?._id]);
      setSelectedSubSubcategory(null);
    }

    setDeleteModalType(null);
    setSubcategoryClick(false);
    setSubsubcategoryClick(false);
  };

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

    setDeleteCategoryArr([]);
    setIsSaveActive(false);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedSubSubcategory(null);
  };

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
        <div className="flex flex-row items-start justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Категорія"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />
          <CategorySelector
            categoryArr={
              categoryData?.filter((item) => !deleteCategoryArr.includes(item._id)) ||
              null
            }
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            addButton={{ text: 'Додати нову категорію', open: addNewCategory }}
            categoryLimit={11}
          />
          <button
            type="button"
            onClick={() => setDeleteModalType('category')}
            className="mt-[8px]"
            disabled={!selectedCategory}
          >
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        {/* --------------Підкатегорія----------------- */}
        <div className="flex flex-row items-start justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Підкатегорія"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />

          <div
            className="flex flex-col items-start justify-between"
            onClick={() => setSubcategoryClick(true)}
          >
            <CategorySelector
              categoryArr={
                selectedCategory?.subcategories?.filter(
                  (item) => !deleteCategoryArr.includes(item._id),
                ) || null
              }
              selected={selectedSubcategory}
              setSelected={setSelectedSubcategory}
              addButton={{ text: 'Додати нову підкатегорію', open: addNewSubCategory }}
              categoryLimit={12}
              disabled={!selectedCategory && subcategoryClick}
            />

            {!selectedCategory && subcategoryClick && (
              <span className="text-error-red text-[10px] font-outfit">
                Оберіть спочатку категорію.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setDeleteModalType('subcategory')}
            className="mt-[8px]"
            disabled={!selectedSubcategory}
          >
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        {/* --------------Розділ----------------- */}
        <div className="flex flex-row items-start justify-start w-full gap-[16px]">
          <Text
            Tag="span"
            text="Розділ"
            color="white"
            size="lg"
            className="font-semibold w-[120px]"
          />

          <div
            className="flex flex-col items-start justify-between"
            onClick={() => setSubsubcategoryClick(true)}
          >
            <CategorySelector
              categoryArr={
                selectedSubcategory?.subcategories?.filter(
                  (item) => !deleteCategoryArr.includes(item._id),
                ) || null
              }
              selected={selectedSubSubcategory}
              setSelected={setSelectedSubSubcategory}
              addButton={{ text: 'Додати новий розділ', open: addNewSubSubCategory }}
              categoryLimit={7}
              disabled={!selectedSubcategory && subsubcategoryClick}
            />

            {!selectedSubcategory && subsubcategoryClick && (
              <span className="text-error-red text-[10px] font-outfit">
                Оберіть спочатку категорію, підкатегорію.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setDeleteModalType('subsubcategory')}
            className="mt-[8px]"
            disabled={!selectedSubSubcategory}
          >
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>

        {/* --------------Зберегти----------------- */}
        <Button
          onClick={handleSave}
          className="h-12 max-w-[282px] w-full justify-self-end"
          variant="primary"
          disabled={!isSaveActive}
        >
          Зберегти
        </Button>
      </div>

      {/* --------------Видалення-категорії----------------- */}
      {deleteModalType && (
        <DeleteModal
          setDeleteModalType={setDeleteModalType}
          deleteCategory={deleteCategory}
        />
      )}
    </div>
  );
};

export default AdminManagingCategory;
