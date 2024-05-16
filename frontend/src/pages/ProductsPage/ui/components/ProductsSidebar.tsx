/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import { Disclosure } from '@headlessui/react';

import { Category } from '@/enteties/Category';
import arrowDown from '@/shared/assets/icons/arrow_down.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductsSidebar: FC<Props> = () => {
  const { data: categoryData, isLoading: categoryIsLoading } = useAxios<Category[]>(
    ApiRoutes.CATEGORY,
  );

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null);

  console.log(categoryData);
  console.log(selectedCategory);
  console.log(selectedSubcategory);

  return (
    <aside className="w-full flex flex-col gap-3">
      <div className="w-full px-4 py-2 shadow-custom-base rounded-2xl">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          {/* --------------------Категорія----------------------- */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Категорія"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <ul className="flex flex-col gap-2">
                    {categoryIsLoading && (
                      <span className="text-center">Завантаження...</span>
                    )}
                    {categoryData &&
                      categoryData.slice(0, 11).map((item) => (
                        <li key={item._id}>
                          <button type="button" onClick={() => setSelectedCategory(item)}>
                            <Text
                              Tag="span"
                              text={item.name}
                              size="sm"
                              color="primary"
                              className={`${item._id === selectedCategory?._id && 'font-bold'}`}
                            />
                          </button>
                        </li>
                      ))}
                  </ul>

                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Підкатегорія----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Підкатегорія"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <ul className="flex flex-col gap-2">
                    {!selectedCategory && <span>Виберіть категорію</span>}
                    {selectedCategory?.subcategories.length === 0 && (
                      <span>Немає підкатегорій</span>
                    )}
                    {selectedCategory &&
                      selectedCategory.subcategories.map((item) => (
                        <li key={item._id}>
                          <button
                            type="button"
                            onClick={() => setSelectedSubcategory(item)}
                          >
                            <Text
                              Tag="span"
                              text={item.name}
                              size="sm"
                              color="primary"
                              className={`${item._id === selectedSubcategory?._id && 'font-bold'}`}
                            />
                          </button>
                        </li>
                      ))}
                  </ul>

                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Розділ----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Розділ"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Продавець----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Продавець"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Ціна----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Ціна"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* --------------------Рейтинг----------------------- */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <Text
                    Tag="span"
                    text="Рейтинг"
                    size="md"
                    color="primary"
                    className="font-semibold"
                  />
                  <Icon
                    aria-hidden="true"
                    Svg={arrowDown}
                    className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  No.
                  <Disclosure.Button className="w-full flex content-center justify-center">
                    <Text
                      Tag="span"
                      text="Показати менше"
                      size="xs"
                      color="primary"
                      className="mt-2 underline underline-offset-8"
                      bold
                    />
                  </Disclosure.Button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>

      <Button
        id="all-category-button"
        aria-controls="all-category-modal"
        variant="primary"
        aria-haspopup
        className="hidden lg:block all-products-button py-[5px] w-full bg-secondary-yellow"
        onClick={() => console.log('Застосувати')}
      >
        <Text Tag="span" text="Застосувати" size="lg" color="primary" />
      </Button>
      <button
        type="button"
        className="w-full flex content-center justify-center"
        onClick={() => console.log('Відмінити')}
      >
        <Text
          Tag="span"
          text="Відмінити"
          size="sm"
          color="primary"
          className="mt-2 underline underline-offset-8"
          bold
        />
      </button>
    </aside>
  );
};

export default ProductsSidebar;
