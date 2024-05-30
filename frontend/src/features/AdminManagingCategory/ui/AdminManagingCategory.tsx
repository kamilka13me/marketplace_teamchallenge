/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC, useEffect, useState } from 'react';

import AddCategoryModal from './components/AddCategoryModal';
import CategorySelector from './components/CategorySelector';
import DeleteModal from './components/DeleteModal';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Text } from '@/shared/ui/Text';

const AdminManagingCategory: FC = () => {
  const {
    data: categoryData,
    isLoading,
    refetch: refetchCategoryData,
  } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<Category | null>(
    null,
  );

  const [subcategoryClick, setSubcategoryClick] = useState<boolean>(false);
  const [subsubcategoryClick, setSubsubcategoryClick] = useState<boolean>(false);

  const [addCategory, setAddCategory] = useState<{
    name: string;
    icon: File | null;
    parentCategory: string | undefined;
    type: 'category' | 'subcategory' | 'subsubcategory' | null;
  }>({
    name: '',
    icon: null,
    parentCategory: undefined,
    type: null,
  });

  const [selectedDeleteCategoryID, setSelectedDeleteCategoryID] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setSelectedSubcategory(null);
    setSelectedSubSubcategory(null);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedSubSubcategory(null);
  }, [selectedSubcategory]);

  const refetchCategoryDataHandler = () => {
    if (selectedCategory?._id === selectedDeleteCategoryID) setSelectedCategory(null);
    if (selectedSubcategory?._id === selectedDeleteCategoryID)
      setSelectedSubcategory(null);
    if (selectedSubSubcategory?._id === selectedDeleteCategoryID)
      setSelectedSubSubcategory(null);

    refetchCategoryData();
  };

  const addNewCategory = () => setAddCategory({ ...addCategory, type: 'category' });
  const addNewSubCategory = () =>
    setAddCategory({
      ...addCategory,
      type: 'subcategory',
      parentCategory: selectedCategory?._id,
    });
  const addNewSubSubCategory = () =>
    setAddCategory({
      ...addCategory,
      type: 'subsubcategory',
      parentCategory: selectedSubcategory?._id,
    });

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
            categoryArr={categoryData}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            addButton={{ text: 'Додати нову категорію', open: addNewCategory }}
            categoryLimit={11}
          />
          <button
            type="button"
            onClick={() => setSelectedDeleteCategoryID(selectedCategory!._id)}
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
                categoryData?.find((item) => item._id === selectedCategory?._id)
                  ?.subcategories || null
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
            onClick={() => setSelectedDeleteCategoryID(selectedSubcategory!._id)}
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
                categoryData
                  ?.find((item: Category) => item._id === selectedCategory?._id)
                  ?.subcategories?.find(
                    (item: Category) => item._id === selectedSubcategory?._id,
                  )?.subcategories || null
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
            onClick={() => setSelectedDeleteCategoryID(selectedSubSubcategory!._id)}
            className="mt-[8px]"
            disabled={!selectedSubSubcategory}
          >
            <span className="text-main text-[14px] font-outfit underline underline-offset-[6px]">
              Видалити
            </span>
          </button>
        </div>
      </div>

      {/* --------------Видалення-категорії----------------- */}
      {selectedDeleteCategoryID && (
        <DeleteModal
          selectedDeleteCategoryID={selectedDeleteCategoryID}
          setSelectedDeleteCategoryID={setSelectedDeleteCategoryID}
          refetchCategoryDataHandler={refetchCategoryDataHandler}
        />
      )}

      {/* --------------Додавання-категорії----------------- */}
      {addCategory.type && (
        <AddCategoryModal
          addCategory={addCategory}
          setAddCategory={setAddCategory}
          refetchCategoryData={refetchCategoryData}
        />
      )}
    </div>
  );
};

export default AdminManagingCategory;
